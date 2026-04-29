/**
 * Single source of truth for marketing copy, nav, inventory, and zones.
 * When the business plan is final: edit this file (or swap to CMS) — layout components stay stable.
 */

export type ZoneId = "north_oc" | "central_oc" | "south_oc";

export interface Zone {
  id: ZoneId;
  label: string;
  shortLabel: string;
  description: string;
  cities: string[];
}

export interface BounceHouse {
  id: string;
  name: string;
  shortDescription: string;
  specs: string[];
  /** Placeholder image — swap for real photography */
  imageUrl: string;
  imageAlt: string;
  /** Example all-in rental price by zone (USD). Replace with real pricing. */
  priceByZone: Record<ZoneId, number>;
  featured?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const siteConfig = {
  name: "OC Bounce Co.",
  tagline:
    "Delivered, insured bounce houses for backyard birthdays, church gatherings, school parties, and neighborhood celebrations across Orange County.",
  contact: {
    email: "hello@ocbounco.example",
    phone: "(714) 555-0199",
    responseTime: "We reply within one business day.",
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  /** Primary CTA in header — scrolls to #book */
  bookCta: { label: "Check availability", href: "/#book" },
} as const;

/** Homepage anchor nav (single-page scroll layout) */
export const navItems: NavItem[] = [
  { label: "Rentals", href: "/#rentals" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Service areas", href: "/#service-areas" },
  { label: "Contact", href: "/#contact" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Explore",
    links: [
      { label: "Rentals", href: "/#rentals" },
      { label: "Book", href: "/#book" },
      { label: "How it works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Service areas", href: "/#service-areas" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy (placeholder)", href: "#" },
      { label: "Terms (placeholder)", href: "#" },
    ],
  },
];

export const zones: Zone[] = [
  {
    id: "north_oc",
    shortLabel: "North OC",
    label: "North Orange County",
    description:
      "Full setup and strike for communities from La Habra to Anaheim Hills. Travel is included in zone pricing.",
    cities: ["Brea", "Placentia", "Yorba Linda", "Anaheim", "Orange"],
  },
  {
    id: "central_oc",
    shortLabel: "Central OC",
    label: "Central Orange County",
    description:
      "Our core service band covering Irvine, Santa Ana, and surrounding neighborhoods with predictable delivery windows.",
    cities: ["Irvine", "Tustin", "Santa Ana", "Costa Mesa", "Newport Beach"],
  },
  {
    id: "south_oc",
    shortLabel: "South OC",
    label: "South Orange County",
    description:
      "Coastal and canyon deliveries from Laguna through San Clemente. Slightly higher rates reflect mileage and time on the road.",
    cities: ["Laguna Beach", "Mission Viejo", "San Juan Capistrano", "San Clemente"],
  },
];

export const bounceHouses: BounceHouse[] = [
  {
    id: "classic-castle",
    name: "Classic Castle",
    shortDescription: "Timeless castle silhouette — fits most backyards and driveways.",
    specs: ["Up to 8 kids at a time", "Approx. 15′ × 15′ footprint", "Shaded mesh windows"],
    imageUrl:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&h=675&fit=crop",
    imageAlt: "Colorful inflatable bounce house at an outdoor party",
    priceByZone: { north_oc: 279, central_oc: 299, south_oc: 329 },
    featured: true,
  },
  {
    id: "rainbow-combo",
    name: "Rainbow Combo",
    shortDescription: "Bounce plus slide — extra energy burn for bigger parties.",
    specs: ["Single-lane slide", "Basketball hoop inside", "Recommended ages 3–10"],
    imageUrl:
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=900&h=675&fit=crop",
    imageAlt: "Kids playing outdoors near party decorations",
    priceByZone: { north_oc: 349, central_oc: 369, south_oc: 399 },
    featured: true,
  },
  {
    id: "toddler-petite",
    name: "Toddler Petite",
    shortDescription: "Lower walls and softer bounce for the littlest guests.",
    specs: ["Ages 2–5 recommended", "Compact footprint", "Parent sightlines"],
    imageUrl:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&h=675&fit=crop",
    imageAlt: "Young child smiling at a birthday celebration",
    priceByZone: { north_oc: 229, central_oc: 249, south_oc: 269 },
  },
  {
    id: "princess-palace",
    name: "Princess Palace",
    shortDescription: "Pastel palette and photo-friendly backdrop.",
    specs: ["Pastel panels", "Optional banner add-on later", "Indoor/outdoor capable"],
    imageUrl:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=900&h=675&fit=crop",
    imageAlt: "Festive balloons and party setup outdoors",
    priceByZone: { north_oc: 319, central_oc: 339, south_oc: 369 },
    featured: true,
  },
  {
    id: "community-xl",
    name: "Community XL",
    shortDescription: "Higher capacity for church picnics and school field days.",
    specs: ["Higher weight capacity", "Staffed setup recommended", "Requires flat grass or pavement"],
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&h=675&fit=crop",
    imageAlt: "Group of friends celebrating outdoors together",
    priceByZone: { north_oc: 429, central_oc: 449, south_oc: 489 },
  },
];

export const howItWorksSteps = [
  {
    title: "Pick your date & unit",
    body:
      "Choose a bounce house and your event window — whether it is a Saturday birthday, a Sunday church picnic, or a weekday school celebration. Calendar hints on the site are a preview; final confirmation comes after we review your address.",
  },
  {
    title: "We confirm your zone",
    body:
      "Greater Orange County is split into three delivery zones (north, central, south). Your quote reflects the unit plus fair travel for your area — no surprise mileage fees after the fact.",
  },
  {
    title: "Setup & safety walkthrough",
    body:
      "We deliver, inflate, and secure the unit per manufacturer guidance, then walk your on-site contact through rules and capacity — so parents, pastors, and PTO leads know what to expect.",
  },
  {
    title: "Strike & pickup",
    body:
      "We return in the agreed window to pack up. Need a longer window for a carnival or field day? Ask during booking — extensions may be available.",
  },
];

export const featureHighlights = [
  {
    title: "Insured, pro setup",
    body:
      "Commercial-grade units and a checklist-driven setup — whether we are in a backyard, a church lot, or a school blacktop. Details are finalized in your rental agreement.",
  },
  {
    title: "Built for OC traffic",
    body:
      "Three delivery zones keep pricing predictable: closer routes stay leaner; longer coastal or canyon runs reflect real drive time — so your quote matches the map.",
  },
  {
    title: "Made for real gatherings",
    body:
      "Birthdays, baptisms, VBS weekends, block parties, and school fairs — we are used to working with families, volunteers, and event coordinators.",
  },
];

/** Short FAQ blocks for layout polish — replace with legal-reviewed copy later. */
export const faqPlaceholders = [
  {
    q: "Do you deliver to parks?",
    a: "Placeholder — outline your park permit rules, generator policy, and staking constraints here.",
  },
  {
    q: "What if it rains?",
    a: "Placeholder — describe weather cancellations, rescheduling, and how deposits work.",
  },
  {
    q: "How far in advance should we book?",
    a: "Placeholder — peak weekends vs weekday availability. Connect to real inventory later.",
  },
];

export const testimonialPlaceholders = [
  {
    quote:
      "Placeholder testimonial — swap when you have real reviews. Setup was on time and the kids lived in the combo all afternoon.",
    name: "Jamie R.",
    context: "Birthday party, Central OC",
  },
  {
    quote:
      "Second placeholder quote for churches or schools. Great communication and the team was patient with our parking lot constraints.",
    name: "Pastor M.",
    context: "Church gathering, North OC",
  },
];
