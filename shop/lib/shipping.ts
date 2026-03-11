import type { ScooterProduct } from "../data/products";

export type ShippingAddress = {
  country: string;
  state?: string;
  postalCode?: string;
};

// Shipping is intentionally simple for MVP and can be replaced later
// with carrier API quoting once volume increases.
export function calculateShippingAmountCents(
  _product: ScooterProduct,
  address: ShippingAddress
): number {
  if (address.country !== "US") {
    return 39900;
  }

  const highCostStates = new Set(["AK", "HI"]);
  if (address.state && highCostStates.has(address.state.toUpperCase())) {
    return 34900;
  }

  return 24900;
}

