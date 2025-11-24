import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { GoogleMap, InfoBoxF, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useState } from "react";

type LocationItem = {
  id: string;
  name: string;
  address?: string;
  lat: number;
  lng: number;
};

const locations: LocationItem[] = [
  {
    id: "broward-mall",
    name: "Broward Mall",
    address: "8000 W Broward Blvd, Plantation, FL 33388",
    lat: 26.1196,
    lng: -80.2610,
  },
  {
    id: "pembroke-lakes-mall",
    name: "Pembroke Lakes Mall",
    address: "11401 Pines Blvd, Pembroke Pines, FL 33026",
    lat: 26.0089,
    lng: -80.2992,
  },
];

const containerStyle = { width: "100%", height: "500px" } as const;

export default function Locations() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markersById, setMarkersById] = useState<Record<string, google.maps.Marker | null>>({});

  const center = useMemo(() => {
    if (locations.length === 1) return { lat: locations[0].lat, lng: locations[0].lng };
    return { lat: 26.065, lng: -80.28 };
  }, []);

  const onLoad = useCallback((m: google.maps.Map) => {
    setMap(m);
  }, []);

  useEffect(() => {
    if (!map || !isLoaded || locations.length === 0) return;
    const bounds = new google.maps.LatLngBounds();
    locations.forEach((loc) => bounds.extend({ lat: loc.lat, lng: loc.lng }));
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, 64);
    }
  }, [map, isLoaded]);

  const handleSelect = (loc: LocationItem) => {
    setActiveId(loc.id);
    if (map) {
      map.panTo({ lat: loc.lat, lng: loc.lng });
      map.setZoom(14);
    }
  };

  return (
    <div className="bg-[#2166fc] min-h-screen">
      <Header />
      <section className="px-6 md:px-10 py-8">
        <h1 className="text-white playball text-5xl mb-6 text-center">Locations</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3 w-full bg-white shadow">
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={11}
                onLoad={onLoad}
                options={{ mapTypeControl: false, streetViewControl: false, fullscreenControl: false }}
              >
                {locations.map((loc) => (
                  <MarkerF
                    key={loc.id}
                    position={{ lat: loc.lat, lng: loc.lng }}
                    title={loc.name}
                    onLoad={(marker) =>
                      setMarkersById((prev) => ({ ...prev, [loc.id]: marker }))
                    }
                    onClick={() => setActiveId(loc.id)}
                  />
                ))}
                {locations.map(
                  (loc) =>
                    activeId === loc.id && (
                      <InfoBoxF
                        key={`info-${loc.id}`}
                        anchor={markersById[loc.id] ?? undefined}
                        options={{
                          pixelOffset: new google.maps.Size(0, -36),
                          closeBoxURL: "",
                          disableAutoPan: true,
                        }}
                      >
                        <div className="bg-white shadow rounded p-3">
                          <div className="flex items-center justify-between gap-3 mb-1">
                            <div className="font-semibold text-xl md:text-2xl playball">{loc.name}</div>
                            <button
                              type="button"
                              aria-label="Close"
                              onClick={() => setActiveId(null)}
                              className="inline-flex items-center justify-center size-6 rounded hover:bg-gray-100"
                            >
                              ✕
                            </button>
                          </div>
                          {loc.address && <div className="text-sm md:text-base text-gray-600">{loc.address}</div>}
                        </div>
                      </InfoBoxF>
                    )
                )}
              </GoogleMap>
            )}
          </div>

          <div className="md:w-1/3 w-full bg-white shadow p-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 playball">Our Locations</h2>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 playball">U Krooze of Ft. Lauderdale</h3>
            <ul className="space-y-3">
              {locations.map((loc) => (
                <li key={loc.id}>
                  <button type="button" className="text-left w-full p-3 rounded border hover:bg-gray-50" onClick={() => handleSelect(loc)}>
                    <div className="font-medium text-base md:text-lg">{loc.name}</div>
                    {loc.address && <div className="text-sm md:text-base text-gray-600">{loc.address}</div>}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 playball">U Krooze of Orlando</h3>
              <p className="text-base text-gray-600">Coming Soon!</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}


