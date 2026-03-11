"use client";

import { useState } from "react";

type BuyNowFormProps = {
  slug: string;
};

export default function BuyNowForm({ slug }: BuyNowFormProps) {
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          address: {
            country: "US",
            state: state.toUpperCase(),
            postalCode,
          },
        }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Checkout could not be started.");
      }

      window.location.href = data.url;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Checkout could not be started.";
      setError(message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State (e.g. FL)"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          maxLength={2}
          required
        />
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="ZIP Code"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {isLoading ? "Redirecting..." : "Buy this scooter"}
      </button>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <p className="text-xs text-gray-500">
        Shipping cost is calculated from your shipping location and added at
        checkout.
      </p>
    </form>
  );
}

