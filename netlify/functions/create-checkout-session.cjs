const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-02-25.clover",
});

const US_ONLY = ["US"];
const FREE_RADIUS_MILES = Number(process.env.FREE_DELIVERY_RADIUS_MILES || 30);
const FEDEX_TIMEOUT_MS = Number(process.env.FEDEX_TIMEOUT_MS || 15000);
const FEDEX_TOKEN_BUFFER_SECONDS = 60;

const SCOOTER_WEIGHT_LBS_BY_SLUG = {
  px4: 351.4,
  "pursuit-2": 242.6,
  "victory-10-4-wheel": 185,
};

let fedexTokenCache = {
  accessToken: null,
  expiresAtEpochMs: 0,
};

function json(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
    body: JSON.stringify(payload),
  };
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function haversineMiles(lat1, lon1, lat2, lon2) {
  const earthRadiusMiles = 3958.8;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(a));
}

async function geocodeZipToCoords(address) {
  const apiKey = process.env.GEOCODIO_API_KEY;
  if (!apiKey) {
    return null;
  }

  const zip = String(address.postalCode || "").trim();
  const country = String(address.country || "US").trim();
  if (!zip) {
    return null;
  }

  const query = encodeURIComponent(`${zip} ${country}`);
  const url = `https://api.geocod.io/v1.11/geocode?q=${query}&api_key=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    console.warn("Geocodio geocoding request failed", response.status);
    return null;
  }

  const data = await response.json();
  const firstResult = data && data.results && data.results[0];
  const location = firstResult && firstResult.location;
  if (!location) {
    return null;
  }

  const { lat, lng } = location;
  if (typeof lat !== "number" || typeof lng !== "number") {
    return null;
  }

  return { lat, lng };
}

function isLower48State(stateCode) {
  const state = String(stateCode || "").toUpperCase();
  if (!state || state.length !== 2) return false;
  return !["AK", "HI", "PR", "VI", "GU", "AS", "MP"].includes(state);
}

async function isWithinFreeDeliveryRadius(address) {
  const homeLat = Number(process.env.ERIC_HOME_LAT);
  const homeLng = Number(process.env.ERIC_HOME_LONG);
  const hasHomeCoords = Number.isFinite(homeLat) && Number.isFinite(homeLng);

  if (hasHomeCoords) {
    try {
      const destination = await geocodeZipToCoords(address);
      if (destination) {
        const miles = haversineMiles(homeLat, homeLng, destination.lat, destination.lng);
        if (miles <= FREE_RADIUS_MILES) {
          return true;
        }
      } else {
        console.warn("No destination coordinates found; skipping free-radius rule.");
      }
    } catch (error) {
      console.warn("Failed distance-based shipping lookup; skipping free-radius rule.", error);
    }
  } else {
    console.warn("ERIC_HOME_LAT/ERIC_HOME_LONG not configured; skipping free-radius rule.");
  }

  return false;
}

function getFedexOriginAddress() {
  const line1 = String(process.env.ERIC_HOME_ADDRESS || "").trim();
  const city = String(process.env.ERIC_HOME_CITY || "").trim();
  const stateOrProvinceCode = String(process.env.ERIC_HOME_STATE || "").trim().toUpperCase();
  const postalCode = String(process.env.ERIC_HOME_POSTAL_CODE || "").trim();
  const countryCode = "US";

  if (!line1 || !city || !stateOrProvinceCode || !postalCode) {
    throw new Error("FedEx origin address env variables are incomplete.");
  }

  return {
    line1,
    city,
    stateOrProvinceCode,
    postalCode,
    countryCode,
  };
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function getFedexAccessToken() {
  const now = Date.now();
  if (fedexTokenCache.accessToken && fedexTokenCache.expiresAtEpochMs > now) {
    return fedexTokenCache.accessToken;
  }

  const baseUrl = String(process.env.FEDEX_BASE_URL || "").trim();
  const apiKey = String(process.env.FEDEX_API_KEY || "").trim();
  const secretKey = String(process.env.FEDEX_SECRET_KEY || "").trim();
  if (!baseUrl || !apiKey || !secretKey) {
    throw new Error("FedEx credentials are missing. Check FEDEX_BASE_URL/API/SECRET.");
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: apiKey,
    client_secret: secretKey,
  });

  const response = await fetchWithTimeout(
    `${baseUrl.replace(/\/$/, "")}/oauth/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    },
    FEDEX_TIMEOUT_MS
  );

  const rawText = await response.text();
  if (!response.ok) {
    throw new Error(`FedEx auth failed (${response.status}): ${rawText}`);
  }

  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error("FedEx auth returned non-JSON response.");
  }

  const accessToken = parsed && parsed.access_token;
  const expiresIn = Number(parsed && parsed.expires_in);
  if (!accessToken || !Number.isFinite(expiresIn)) {
    throw new Error("FedEx auth response missing access_token/expires_in.");
  }

  fedexTokenCache = {
    accessToken,
    expiresAtEpochMs:
      now + Math.max(0, expiresIn - FEDEX_TOKEN_BUFFER_SECONDS) * 1000,
  };

  return accessToken;
}

function buildFedexFreightRatePayload({ slug, address }) {
  const accountNumber = String(process.env.FEDEX_ACCOUNT_NUMBER || "").trim();
  const lengthInches = Number(process.env.SCOOTER_LENGTH_INCHES || 0);
  const widthInches = Number(process.env.SCOOTER_WIDTH_INCHES || 0);
  const heightInches = Number(process.env.SCOOTER_HEIGHT_INCHES || 0);
  const weightLbs = Number(SCOOTER_WEIGHT_LBS_BY_SLUG[slug]);

  if (!accountNumber) {
    throw new Error("FEDEX_ACCOUNT_NUMBER is missing.");
  }
  if (
    !Number.isFinite(lengthInches) ||
    !Number.isFinite(widthInches) ||
    !Number.isFinite(heightInches) ||
    lengthInches <= 0 ||
    widthInches <= 0 ||
    heightInches <= 0
  ) {
    throw new Error(
      "SCOOTER_LENGTH_INCHES/SCOOTER_WIDTH_INCHES/SCOOTER_HEIGHT_INCHES must be positive numbers."
    );
  }
  if (!Number.isFinite(weightLbs) || weightLbs <= 0) {
    throw new Error(`No valid weight configured for slug '${slug}'.`);
  }

  const origin = getFedexOriginAddress();

  const destination = {
    line1: String(address.line1 || "").trim(),
    line2: String(address.line2 || "").trim(),
    city: String(address.city || "").trim(),
    stateOrProvinceCode: String(address.state || "").trim().toUpperCase(),
    postalCode: String(address.postalCode || "").trim(),
    countryCode: "US",
  };

  return {
    accountNumber: { value: accountNumber },
    rateRequestControlParameters: {
      returnTransitTimes: true,
    },
    freightRequestedShipment: {
      serviceType: "FEDEX_FREIGHT_ECONOMY",
      shipper: {
        address: {
          streetLines: [origin.line1],
          city: origin.city,
          stateOrProvinceCode: origin.stateOrProvinceCode,
          postalCode: origin.postalCode,
          countryCode: origin.countryCode,
        },
      },
      recipient: {
        address: {
          streetLines: destination.line2
            ? [destination.line1, destination.line2]
            : [destination.line1],
          city: destination.city,
          stateOrProvinceCode: destination.stateOrProvinceCode,
          postalCode: destination.postalCode,
          countryCode: destination.countryCode,
          residential: true,
        },
      },
      shippingChargesPayment: {
        paymentType: "SENDER",
      },
      freightShipmentDetail: {
        role: "SHIPPER",
        accountNumber: { value: accountNumber },
        fedExFreightBillingContactAndAddress: {
          address: {
            streetLines: [origin.line1],
            city: origin.city,
            stateOrProvinceCode: origin.stateOrProvinceCode,
            postalCode: origin.postalCode,
            countryCode: origin.countryCode,
          },
        },
        lineItem: [
          {
            freightClass: "CLASS_125",
            handlingUnits: 1,
            pieces: 1,
            packaging: "PALLET",
            weight: {
              units: "LB",
              value: weightLbs,
            },
            dimensions: {
              length: Math.ceil(lengthInches),
              width: Math.ceil(widthInches),
              height: Math.ceil(heightInches),
              units: "IN",
            },
          },
        ],
      },
      requestedPackageLineItems: [
        {
          weight: {
            units: "LB",
            value: weightLbs,
          },
        },
      ],
      totalWeight: {
        units: "LB",
        value: weightLbs,
      },
    },
  };
}

function extractFedexRateCents(rateResponse) {
  const details = rateResponse?.output?.rateReplyDetails || [];
  if (!Array.isArray(details) || details.length === 0) {
    throw new Error("FedEx rate response had no rateReplyDetails.");
  }

  let bestUsdAmount = Number.POSITIVE_INFINITY;

  for (const detail of details) {
    const candidates = [
      detail?.ratedShipmentDetails?.[0]?.totalNetCharge,
      detail?.ratedShipmentDetails?.[0]?.totalBaseCharge,
      detail?.ratedShipmentDetails?.[0]?.totalNetFedExCharge,
      detail?.ratedShipmentDetails?.[0]?.totalFreightDiscounts,
      detail?.totalNetCharge,
    ];

    for (const candidate of candidates) {
      const amount = Number(candidate?.amount);
      const currency = candidate?.currency;
      if (Number.isFinite(amount) && amount >= 0 && currency === "USD") {
        bestUsdAmount = Math.min(bestUsdAmount, amount);
      }
    }
  }

  if (!Number.isFinite(bestUsdAmount) || bestUsdAmount === Number.POSITIVE_INFINITY) {
    throw new Error("FedEx rate response did not contain a USD total charge.");
  }

  return Math.round(bestUsdAmount * 100);
}

async function getFedexFreightShippingAmountCents({ slug, address }) {
  const accessToken = await getFedexAccessToken();
  const baseUrl = String(process.env.FEDEX_BASE_URL || "").trim().replace(/\/$/, "");
  const path = String(
    process.env.FEDEX_FREIGHT_RATE_PATH || "/rate/v1/freight/rates/quotes"
  ).trim();
  const payload = buildFedexFreightRatePayload({ slug, address });

  const response = await fetchWithTimeout(
    `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    },
    FEDEX_TIMEOUT_MS
  );

  const rawText = await response.text();
  if (!response.ok) {
    throw new Error(`FedEx rate quote failed (${response.status}): ${rawText}`);
  }

  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error("FedEx rate quote returned non-JSON response.");
  }

  return extractFedexRateCents(parsed);
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return json(200, { ok: true });
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return json(500, { error: "Missing STRIPE_SECRET_KEY environment variable." });
  }

  if (!process.env.STRIPE_PRODUCTS_JSON) {
    return json(500, {
      error: "Missing STRIPE_PRODUCTS_JSON environment variable.",
    });
  }

  try {
    const { slug, address, customer } = JSON.parse(event.body || "{}");

    if (!slug) {
      return json(400, { error: "Missing product slug." });
    }

    if (
      !address ||
      !address.country ||
      !address.state ||
      !address.postalCode ||
      !address.line1 ||
      !address.city
    ) {
      return json(400, {
        error:
          "Shipping address, city, state, postal code, and country are required.",
      });
    }

    const productMap = JSON.parse(process.env.STRIPE_PRODUCTS_JSON);
    const stripeProductId = productMap[slug];

    if (!stripeProductId) {
      return json(400, { error: "No Stripe product mapping found for this slug." });
    }

    const product = await stripe.products.retrieve(stripeProductId, {
      expand: ["default_price"],
    });

    const defaultPrice = product.default_price;
    const priceId =
      typeof defaultPrice === "string" ? defaultPrice : defaultPrice && defaultPrice.id;

    if (!priceId) {
      return json(400, {
        error: "This Stripe product has no default price configured.",
      });
    }

    const normalizedCountry = String(address.country || "").toUpperCase();
    const normalizedState = String(address.state || "").toUpperCase();
    if (normalizedCountry !== "US" || !isLower48State(normalizedState)) {
      return json(400, {
        error:
          "We currently offer shipping only to addresses in the lower 48 states.",
      });
    }

    const isFreeDelivery = await isWithinFreeDeliveryRadius({
      ...address,
      state: normalizedState,
      country: normalizedCountry,
    });
    const shippingAmountCents = isFreeDelivery
      ? 0
      : await getFedexFreightShippingAmountCents({
          slug,
          address: {
            ...address,
            state: normalizedState,
            country: normalizedCountry,
          },
        });
    const origin = event.headers.origin || `https://${event.headers.host}`;
    const lineItems = [
      {
        price: priceId,
        quantity: 1,
      },
    ];

    if (shippingAmountCents > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          unit_amount: shippingAmountCents,
          product_data: {
            name: `Shipping - ${slug}`,
          },
        },
        quantity: 1,
      });
    }

    const firstName = (customer && customer.firstName ? customer.firstName : "").trim();
    const lastName = (customer && customer.lastName ? customer.lastName : "").trim();
    const fullName = `${firstName} ${lastName}`.trim();
    const customerEmail = customer && customer.email ? String(customer.email).trim() : "";
    const customerPhone = customer && customer.phone ? String(customer.phone).trim() : "";

    let customerId = null;
    if (customerEmail || customerPhone || fullName) {
      const createdCustomer = await stripe.customers.create({
        name: fullName || undefined,
        email: customerEmail || undefined,
        phone: customerPhone || undefined,
        address: {
          line1: String(address.line1),
          line2: address.line2 ? String(address.line2) : undefined,
          city: String(address.city),
          state: String(address.state),
          postal_code: String(address.postalCode),
          country: String(address.country).toUpperCase(),
        },
        shipping: {
          name: fullName || undefined,
          address: {
            line1: String(address.line1),
            line2: address.line2 ? String(address.line2) : undefined,
            city: String(address.city),
            state: String(address.state),
            postal_code: String(address.postalCode),
            country: String(address.country).toUpperCase(),
          },
          phone: customerPhone || undefined,
        },
      });
      customerId = createdCustomer.id;
    }

    const sessionParams = {
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: US_ONLY,
      },
      customer: customerId || undefined,
      customer_email: !customerId && customerEmail ? customerEmail : undefined,
      metadata: {
        scooter_slug: slug,
        shipping_state: address.state || "",
        shipping_postal_code: address.postalCode || "",
        shipping_amount_cents: String(shippingAmountCents),
        shipping_city: address.city || "",
        shipping_line1: address.line1 || "",
      },
      success_url: `${origin}/buy-scooter?checkout=success`,
      cancel_url: `${origin}/scooters/${slug}?checkout=cancelled`,
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return json(200, { url: session.url });
  } catch (error) {
    console.error("create-checkout-session failed", error);
    return json(500, { error: "Unable to create checkout session." });
  }
};

