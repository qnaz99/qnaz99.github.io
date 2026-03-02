import Link from "next/link";
import { scooters } from "../../data/products";

export default function BuyScooterPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Buy a Scooter</h1>
        <p className="text-gray-700 max-w-2xl">
          U Krooze is an authorized dealer for leading mobility brands. Browse
          our selection of mobility scooters and click any model to see full
          details and specifications.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {scooters.map((scooter) => (
          <article
            key={scooter.id}
            className="border rounded-2xl shadow-sm overflow-hidden flex flex-col"
          >
            <div className="bg-gray-50 flex items-center justify-center">
              <img
                src={scooter.thumbnailImage}
                alt={scooter.name}
                className="w-full h-56 object-contain"
                loading="lazy"
              />
            </div>
            <div className="flex-1 flex flex-col px-4 pb-4 pt-3">
              <h2 className="text-lg font-semibold text-gray-900">
                {scooter.name}
              </h2>
              <p className="text-xs text-gray-500 mb-1">{scooter.brand}</p>
              <p className="text-sm text-gray-700 mb-4">
                {scooter.shortDescription}
              </p>
              <div className="mt-auto">
                <Link
                  href={`/scooters/${scooter.slug}`}
                  className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  View details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}




