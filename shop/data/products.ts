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
  checkoutUrl?: string;
  stripePriceId?: string;
  stripeProductId?: string;
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
    stripeProductId: "prod_TnpIlIIj12PaqH",
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
    checkoutUrl: "https://buy.stripe.com/14A00igr3fAb07mekX2wU07",
    stripeProductId: "prod_TnpJZG1THoAgtM",
  },
  {
    id: "victory-10-4-wheel",
    slug: "victory-10-4-wheel",
    name: "Victory 10 4-Wheel",
    brand: "Pride Mobility",
    thumbnailImage:
      "https://www.pridemobility.com/pride-mobility-scooters/victory-10-4-wheel/images/color-selector/victory-10-4w-candy-apple-red.jpg",
    heroImage:
      "https://www.pridemobility.com/pride-mobility-scooters/victory-10-4-wheel/images/color-selector/victory-10-4w-collage-candy-apple-red.jpg",
    shortDescription:
      "Time-tested 4-wheel mobility scooter with EZ Turn technology.",
    description:
      "The Victory 10 4-Wheel is a time-tested, industry-leading mobility scooter that combines 4-wheel stability with the tight turning ability of a 3-wheel scooter, helping you cruise through the day with confidence.",
    highlights: [
      "400 lbs. weight capacity",
      "Up to 5.3 mph maximum speed",
      "Up to 15.5 miles per charge",
      "45.5\" turning radius with EZ Turn technology",
      "18\" x 17\" pinchless hinge, molded plastic, black vinyl seat with swivel and sliders",
      "Exclusive lightweight, non-scuffing, low-profile tires",
      "Standard front basket",
      "Feather-touch one-hand disassembly",
      "Delta tiller with wraparound handles",
      "Long-lasting LED headlight for pathway illumination",
    ],
    specs: {
      WeightCapacity: "400 lbs",
      TopSpeed: "Up to 5.3 mph",
      BatteryRange: "Up to 15.5 miles per charge",
      TurningRadius: "45.5\"",
      Seat:
        "18\" x 17\" pinchless hinge, molded plastic, black vinyl seat with swivel and sliders",
      Tires: "Exclusive lightweight, non-scuffing, low-profile tires",
      Basket: "Standard front basket",
      Disassembly: "Feather-touch one-hand disassembly system",
      Tiller: "Delta tiller with wraparound handles",
      Voltmeter: "Easy-to-read ambient voltmeter",
      Headlight: "Long-lasting, maximum-intensity LED headlight",
      ChargerPort: "Easy access tiller-mounted charger port",
      Harness: "Auto-connecting front-to-rear harness",
      HCPCSCode: "K0801 - Group 1 Heavy Duty",
    },
    checkoutUrl: "https://buy.stripe.com/fZu14mcaNbjV9HWccP2wU06",
    stripeProductId: "prod_TnpO29UZFQUz0u",
  },
];

export function getScooterBySlug(slug: string): ScooterProduct | undefined {
  return scooters.find((scooter) => scooter.slug === slug);
}


