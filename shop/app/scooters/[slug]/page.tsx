import { notFound } from "next/navigation";
import Link from "next/link";
import { scooters, getScooterBySlug } from "../../../data/products";
import BuyNowForm from "./BuyNowForm";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return scooters.map((scooter) => ({ slug: scooter.slug }));
}

export async function generateMetadata({ params }: Props) {
  const scooter = getScooterBySlug(params.slug);
  if (!scooter) return {};

  return {
    title: `${scooter.name} | U Krooze`,
    description: scooter.shortDescription,
    openGraph: {
      title: `${scooter.name} | U Krooze`,
      description: scooter.shortDescription,
      images: scooter.heroImage ? [scooter.heroImage] : [],
    },
  };
}

export default function ScooterDetailPage({ params }: Props) {
  const scooter = getScooterBySlug(params.slug);
  if (!scooter) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: scooter.name,
    brand: {
      "@type": "Brand",
      name: scooter.brand,
    },
    description: scooter.description,
    image: scooter.heroImage ?? scooter.thumbnailImage,
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="mb-4 text-sm text-gray-600">
        <Link href="/buy-scooter" className="underline">
          All scooters
        </Link>{" "}
        / <span>{scooter.name}</span>
      </div>

      <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-gray-50 flex items-center justify-center p-4">
            <img
              src={scooter.heroImage ?? scooter.thumbnailImage}
              alt={scooter.name}
              className="w-full max-h-[480px] object-contain"
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
              <BuyNowForm slug={scooter.slug} />
              <p className="text-xs text-gray-500">
                Specifications and features are based on manufacturer-provided
                information and may vary by configuration. Once you place an
                order, U Krooze will contact you to confirm the details and
                arrange shipment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}




