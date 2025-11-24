export type ScooterSpec = Record<string, string>;

export type ScooterProduct = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  thumbnailImage: string;
  heroImage?: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  specs: ScooterSpec;
};

export const scooters: ScooterProduct[] = [
  {
    id: "px4",
    slug: "px4",
    name: "PX4",
    brand: "Pride Mobility",
    thumbnailImage:
      "https://www.pridemobility.com/pride-mobility-scooters/px4/images/color-selector/px4-black-camo.jpg",
    heroImage:
      "https://www.pridemobility.com/pride-mobility-scooters/px4/images/color-selector/px4-collage-black-camo.jpg",
    shortDescription: "Feature-rich outdoor mobility scooter from Pride Mobility.",
    description:
      "The PX4 sets a new standard of performance and comfort and is designed to guide you through new trails and adventures.",
    highlights: [
      "500 lb. weight capacity",
      "Top speed up to 9.3 mph",
      "Range up to 23.4 miles per charge",
      "NFC key fob for enhanced security",
      "Full LED lighting package",
      "Full suspension for a smooth ride over uneven terrain",
    ],
    specs: {
      WeightCapacity: "500 lbs",
      TopSpeed: "Up to 9.3 mph",
      BatteryRange: "Up to 23.4 miles per charge",
      ModelNumber: "SC134",
      GroundClearance: "3.5\" to motor",
      TurningRadius: "82.28\"",
      OverallDimensions: "Length: 55.9\", Width: 27.83\"",
      Tires: "13\" pneumatic (front and rear)",
      Battery: "(2) 12V, 75Ah sealed lead-acid",
      BatteryCharger: "8 amp off-board",
      Suspension: "Full suspension",
      ColorOptions:
        "White Camo, Black Camo, Desert Camo, Jungle Camo, Satin Aluminum, Dark Violet, Red, Peacock Blue, Sunflower",
    },
  },
  {
    id: "pursuit-2",
    slug: "pursuit-2",
    name: "Pursuit 2",
    brand: "Pride Mobility",
    thumbnailImage:
      "https://www.pridemobility.com/pride-mobility-scooters/pursuit-2/images/color-selector/pursuit-2-black.jpg",
    heroImage:
      "https://www.pridemobility.com/pride-mobility-scooters/pursuit-2/images/color-selector/pursuit-2-collage-black.jpg",
    shortDescription: "Scooter built to handle adventures and outdoor terrain.",
    description:
      "The Pursuit 2 is built to handle adventures and outdoor terrain, offering a fast cruising speed and a long per-charge range.",
    highlights: [
      "400 lb. weight capacity",
      "Top speed up to 9.3 mph",
      "Range up to 40 miles with upgradable dual lithium battery",
      "Memory foam seat with 6\" slider",
      "Enhanced LED lighting system",
      "Optional Hard Top Canopy and accessories",
    ],
    specs: {
      WeightCapacity: "400 lbs",
      TopSpeed: "Up to 9.3 mph",
      BatteryRange: "Up to 40 miles per charge (with dual lithium battery)",
      ModelNumber: "SC7132",
      GroundClearance: "3.8\" at axle",
      TurningRadius: "69.3\"",
      OverallDimensions: "Length: 57.5\", Width: 29.7\"",
      Tires: "13\" pneumatic (front and rear)",
      Battery: "25 volt, 50Ah lithium-ion",
      BatteryCharger: "8 amp off-board",
      Suspension: "Front and rear (CTS Suspension)",
      ColorOptions: "Gray (Matte), Orange, Black",
    },
  },
  {
    id: "zero-turn-10",
    slug: "zero-turn-10",
    name: "Zero Turn 10",
    brand: "Pride Mobility",
    thumbnailImage:
      "https://www.pridemobility.com/pride-mobility-scooters/zero-turn-10/images/color-selector/zero-turn-10-candy-apple-red.jpg",
    heroImage:
      "https://www.pridemobility.com/pride-mobility-scooters/zero-turn-10/images/color-selector/zero-turn-10-collage-candy-apple-red.jpg",
    shortDescription: "Powerful scooter with a tight 43\" turning radius.",
    description:
      "The Zero Turn 10 combines powerful dual motors and two-wheel drive with EZ Turn technology, giving you a 43\" turning radius to easily navigate your environment.",
    highlights: [
      "Up to 400 lb. weight capacity",
      "Top speed up to 7.3 mph",
      "43\" turning radius",
      "Range up to 15.9 miles (400 lbs) / 21.2 miles (200 lbs)",
      "EZ Turn Technology for 4-wheel stability with 3-wheel maneuverability",
      "Full LED light package with sequential turn signals and puddle light",
    ],
    specs: {
      WeightCapacity: "400 lbs",
      TopSpeed: "Up to 7.3 mph",
      BatteryRange:
        "Up to 15.9 miles (400 lbs); up to 21.2 miles (200 lbs) per charge",
      TurningRadius: "43\"",
      OverallDimensions: "Length: 48\", Width: 24.25\"",
      Tires: "9\" solid (front), 10.75\" solid (rear)",
      Battery: "(2) 12V, 40Ah sealed lead-acid",
      BatteryCharger: "3.5 amp off-board",
      Suspension: "CTS Suspension",
      ColorOptions: "Candy Apple Red, Ocean Blue",
    },
  },
];

export function getScooterBySlug(slug: string): ScooterProduct | undefined {
  return scooters.find((scooter) => scooter.slug === slug);
}


