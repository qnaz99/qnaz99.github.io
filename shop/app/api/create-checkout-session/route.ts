import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getScooterBySlug } from "../../../data/products";
import {
  calculateShippingAmountCents,
  type ShippingAddress,
} from "../../../lib/shipping";

type CreateSessionPayload = {
  slug: string;
  address: ShippingAddress;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-02-25.clover",
});

async function resolvePriceIdForScooter(
  scooter: ReturnType<typeof getScooterBySlug>
) {
  if (!scooter) return undefined;

  if (scooter.stripePriceId) {
    return scooter.stripePriceId;
  }

  if (!scooter.stripeProductId) {
    return undefined;
  }

  const product = await stripe.products.retrieve(scooter.stripeProductId, {
    expand: ["default_price"],
  });

  if (!product.default_price) {
    return undefined;
  }

  if (typeof product.default_price === "string") {
    return product.default_price;
  }

  return product.default_price.id;
}

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Missing STRIPE_SECRET_KEY environment variable." },
        { status: 500 }
      );
    }

    const body = (await req.json()) as CreateSessionPayload;
    const scooter = getScooterBySlug(body.slug);

    if (!scooter) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    if (!body.address || !body.address.country || !body.address.state) {
      return NextResponse.json(
        { error: "Shipping country and state are required." },
        { status: 400 }
      );
    }

    const origin = new URL(req.url).origin;

    const priceId = await resolvePriceIdForScooter(scooter);

    if (!priceId) {
      if (scooter.checkoutUrl) {
        return NextResponse.json({ url: scooter.checkoutUrl }, { status: 200 });
      }
      return NextResponse.json(
        {
          error:
            "Missing Stripe price/default_price configuration for this product.",
        },
        { status: 400 }
      );
    }

    const shippingAmountCents = calculateShippingAmountCents(scooter, body.address);

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
              name: `Shipping - ${scooter.name}`,
            },
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      metadata: {
        scooter_slug: scooter.slug,
        shipping_state: body.address.state ?? "",
        shipping_postal_code: body.address.postalCode ?? "",
      },
      success_url: `${origin}/buy-scooter?checkout=success`,
      cancel_url: `${origin}/scooters/${scooter.slug}?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error("create-checkout-session failed", error);
    return NextResponse.json(
      { error: "Unable to create checkout session." },
      { status: 500 }
    );
  }
}

