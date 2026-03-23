import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { getScooterBySlug } from "../data/products";

type CheckoutFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
};

const Checkout = () => {
  const { slug } = useParams<{ slug: string }>();
  const scooter = slug ? getScooterBySlug(slug) : undefined;

  const [form, setForm] = useState<CheckoutFormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const checkoutApiUrl =
    import.meta.env.VITE_CHECKOUT_API_URL ||
    "/.netlify/functions/create-checkout-session";

  useEffect(() => {
    document.title = scooter
      ? `Checkout - ${scooter.name} | U Krooze`
      : "Checkout | U Krooze";
  }, [scooter]);

  const productWeight = useMemo(() => {
    if (!scooter) return "";
    return `${scooter.weightInLbs} lbs`;
  }, [scooter]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!scooter) return;

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(checkoutApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: scooter.slug,
          customer: {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
          },
          address: {
            line1: form.line1.trim(),
            line2: form.line2.trim(),
            city: form.city.trim(),
            state: form.state.trim().toUpperCase(),
            postalCode: form.postalCode.trim(),
            country: "US",
          },
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      let data: { url?: string; error?: string } = {};

      if (contentType.includes("application/json")) {
        data = (await response.json()) as { url?: string; error?: string };
      } else {
        const raw = await response.text();
        if (!response.ok) {
          console.error("Checkout returned non-JSON error response", {
            status: response.status,
            body: raw,
          });
          throw new Error(
            "We couldn't start checkout right now. Please try again in a moment."
          );
        }
      }

      if (!response.ok || !data.url) {
        if (!response.ok) {
          console.error("Checkout API error", {
            status: response.status,
            payload: data,
          });
        }
        throw new Error(
          data.error ?? "We couldn't start checkout right now. Please try again."
        );
      }

      window.location.href = data.url;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to start checkout.";
      setError(message);
      setIsLoading(false);
    }
  };

  if (!scooter) {
    return (
      <div className="bg-[#2166fc] min-h-screen">
        <Header />
        <main className="max-w-4xl mx-auto px-6 py-16 text-white">
          <h1 className="text-3xl font-semibold mb-4">Scooter not found</h1>
          <p className="mb-6">
            We couldn&apos;t find that scooter. It may have been moved or is no
            longer available.
          </p>
          <Link
            to="/buy-scooter"
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#2166fc]"
          >
            Back to all scooters
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#2166fc] min-h-screen">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 py-10">
        <div className="mb-6 text-sm text-white/80">
          <Link to="/buy-scooter" className="underline">
            All scooters
          </Link>{" "}
          /{" "}
          <Link to={`/scooters/${scooter.slug}`} className="underline">
            {scooter.name}
          </Link>{" "}
          / <span>Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <section className="lg:col-span-3 bg-white rounded-3xl shadow-2xl p-6 md:p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Shipping details
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              Enter your shipping details to generate your checkout total and
              continue securely to payment.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  required
                />
                <input
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  required
                />
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  required
                />
              </div>

              <input
                name="line1"
                type="text"
                value={form.line1}
                onChange={handleChange}
                placeholder="Street address"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                required
              />

              <input
                name="line2"
                type="text"
                value={form.line2}
                onChange={handleChange}
                placeholder="Apt, suite, unit (optional)"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  name="city"
                  type="text"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  required
                />
                <input
                  name="state"
                  type="text"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State (e.g. FL)"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm uppercase"
                  maxLength={2}
                  required
                />
                <input
                  name="postalCode"
                  type="text"
                  value={form.postalCode}
                  onChange={handleChange}
                  placeholder="ZIP Code"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  required
                />
              </div>

              <div className="text-sm text-gray-600">Country: United States</div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center rounded-full bg-[#2166fc] px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#1a56d4] transition-colors disabled:opacity-60"
              >
                {isLoading ? "Redirecting..." : "Continue to secure checkout"}
              </button>

              {error && <p className="text-xs text-red-600">{error}</p>}
            </form>
          </section>

          <aside className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-6 md:p-8 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Order summary
            </h2>
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
              <img
                src={scooter.thumbnailImage}
                alt={scooter.name}
                className="w-24 h-24 object-contain bg-gray-50 rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{scooter.name}</h3>
                <p className="text-sm text-gray-500">{scooter.brand}</p>
                <p className="text-sm text-gray-600">Weight: {productWeight}</p>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              We offer shipping to the lower 48 states. Free delivery is offered
              to central Fort Lauderdale.
            </p>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;

