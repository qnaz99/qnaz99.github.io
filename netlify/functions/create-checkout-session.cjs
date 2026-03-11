const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-02-25.clover",
});

const US_ONLY = ["US"];

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

function calculateShippingAmountCents(address) {
  const state = (address.state || "").toUpperCase();

  if (address.country !== "US") {
    return 39900;
  }

  if (state === "AK" || state === "HI") {
    return 34900;
  }

  return 24900;
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

    if (!address || !address.country || !address.state) {
      return json(400, { error: "Shipping country and state are required." });
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

    const shippingAmountCents = calculateShippingAmountCents(address);
    const origin = event.headers.origin || `https://${event.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
        {
          price_data: {
            currency: "usd",
            unit_amount: shippingAmountCents,
            product_data: {
              name: `Shipping - ${slug}`,
            },
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: {
        allowed_countries: US_ONLY,
      },
      metadata: {
        scooter_slug: slug,
        shipping_state: address.state || "",
        shipping_postal_code: address.postalCode || "",
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

