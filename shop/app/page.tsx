import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">U Krooze Shop</h1>
      <p className="mb-6 text-gray-700">
        Explore our selection of mobility scooters. Start with the catalog
        below.
      </p>
      <Link
        href="/buy-scooter"
        className="inline-flex items-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
      >
        Browse scooters
      </Link>
    </main>
  );
}




