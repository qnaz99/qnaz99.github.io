import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { scooters } from "../data/products";

const BuyScooter = () => {
  useEffect(() => {
    document.title = "Buy a Scooter | U Krooze";
  }, []);

  return (
    <div className="bg-[#2166fc] min-h-screen">
      <Header />

      <main className="px-4 sm:px-8 lg:px-10 pt-10 pb-24">
        <section className="max-w-6xl mx-auto text-white">
          <div className="text-center mb-10">
            <h1 className="playball text-5xl mb-4">Buy a Scooter</h1>
            <p className="text-white/90 max-w-3xl mx-auto text-lg">
              U Krooze is an authorized dealer for Pride Mobility®. Browse a
              curated selection of their most popular scooters below. 
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {scooters.map((scooter) => (
              <article
                key={scooter.id}
                className="bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
              >
                <div className="bg-gray-50">
                  <img
                    src={scooter.thumbnailImage}
                    alt={scooter.name}
                    className="w-full h-56 object-contain p-6"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 flex flex-col px-6 pb-6 pt-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {scooter.name}
                  </h2>
                  <p className="text-xs text-gray-500 mb-1">
                    {scooter.brand}
                  </p>
                  <p className="text-sm text-gray-700 mb-4">
                    {scooter.shortDescription}
                  </p>

                  <div className="mt-auto">
                    <Link
                      to={`/scooters/${scooter.slug}`}
                      className="inline-flex items-center justify-center rounded-full bg-[#2166fc] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#1a56d4] transition-colors"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BuyScooter;


