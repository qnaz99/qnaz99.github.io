const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-02-25.clover",
});

const US_ONLY = ["US"];
const SHIPPING_OUTSIDE_US_CENTS = 39900;
const SHIPPING_AK_HI_CENTS = 34900;
const SHIPPING_STANDARD_US_CENTS = 24900;
const FREE_RADIUS_MILES = Number(process.env.FREE_DELIVERY_RADIUS_MILES || 30);

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

async function calculateShippingAmountCents(address) {
  const state = (address.state || "").toUpperCase();

  if (address.country !== "US") {
    return SHIPPING_OUTSIDE_US_CENTS;
  }

  if (state === "AK" || state === "HI") {
    return SHIPPING_AK_HI_CENTS;
  }

  const homeLat = Number(process.env.ERIC_HOME_LAT);
  const homeLng = Number(process.env.ERIC_HOME_LONG);
  const hasHomeCoords = Number.isFinite(homeLat) && Number.isFinite(homeLng);

  if (hasHomeCoords) {
    try {
      const destination = await geocodeZipToCoords(address);
      if (destination) {
        const miles = haversineMiles(homeLat, homeLng, destination.lat, destination.lng);
        if (miles <= FREE_RADIUS_MILES) {
          return 0;
        }
      } else {
        console.warn("No destination coordinates found; using standard shipping.");
      }
    } catch (error) {
      console.warn("Failed distance-based shipping lookup; using standard shipping.", error);
    }
  } else {
    console.warn("ERIC_HOME_LAT/ERIC_HOME_LONG not configured; using standard shipping.");
  }

  return SHIPPING_STANDARD_US_CENTS;
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
    const { slug, address } = JSON.parse(event.body || "{}");

    if (!slug) {
      return json(400, { error: "Missing product slug." });
    }

    if (!address || !address.country || !address.state || !address.postalCode) {
      return json(400, { error: "Shipping country, state, and ZIP are required." });
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

    const shippingAmountCents = await calculateShippingAmountCents(address);
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

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: US_ONLY,
      },
      metadata: {
        scooter_slug: slug,
        shipping_state: address.state || "",
        shipping_postal_code: address.postalCode || "",
        shipping_amount_cents: String(shippingAmountCents),
      },
      success_url: `${origin}/buy-scooter?checkout=success`,
      cancel_url: `${origin}/scooters/${slug}?checkout=cancelled`,
    });

    return json(200, { url: session.url });
  } catch (error) {
    console.error("create-checkout-session failed", error);
    return json(500, { error: "Unable to create checkout session." });
  }
};

