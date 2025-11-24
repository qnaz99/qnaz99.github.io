import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { getScooterBySlug } from "../data/products";

const ScooterDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const scooter = slug ? getScooterBySlug(slug) : undefined;

  useEffect(() => {
    if (scooter) {
      document.title = `${scooter.name} | U Krooze`;
    }
  }, [scooter]);

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
      <main className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-10 pt-10 pb-24">
        <div className="mb-6 text-sm text-white/80">
          <Link to="/buy-scooter" className="underline">
            All scooters
          </Link>{" "}
          / <span>{scooter.name}</span>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="bg-gray-50 flex items-center justify-center p-0">
              <img
                src={scooter.heroImage ?? scooter.thumbnailImage}
                alt={scooter.name}
                className="h-[70%] object-contain justify-self-center"
              />
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {scooter.name}
                </h1>
                <p className="text-sm text-gray-500">{scooter.brand}</p>
              </div>

              <p className="text-sm text-gray-700">{scooter.description}</p>

              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-1">
                  Key features
                </h2>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  {scooter.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-1">
                  At a glance
                </h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 text-sm text-gray-700">
                  {Object.entries(scooter.specs).map(([label, value]) => (
                    <div
                      key={label}
                      className="py-1 border-b border-gray-100 last:border-b-0"
                    >
                      <dt className="font-medium text-gray-600">
                        {label.replace(/([A-Z])/g, " $1").trim()}
                      </dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-2 flex flex-col gap-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-[#2166fc] px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#1a56d4] transition-colors cursor-pointer"
                >
                  Buy this scooter
                </button>
                <p className="text-xs text-gray-500">
                  Specifications and features are based on manufacturer-provided
                  information and may vary by configuration. Once you place an order, 
                  U Krooze will contact you to confirm the details and arrange shipment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ScooterDetail;


