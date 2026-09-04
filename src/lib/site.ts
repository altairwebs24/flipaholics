import logo from "@/assets/logo-mark.png.asset.json";
import displayCabinet from "@/assets/display-cabinet.jpg.asset.json";
import wineCabinet from "@/assets/wine-cabinet.jpg.asset.json";
import diningBlue from "@/assets/dining-blue.jpg.asset.json";
import loungeMono from "@/assets/lounge-mono.jpg.asset.json";
import tour1 from "@/assets/tour-1.mp4.asset.json";
import tour2 from "@/assets/tour-2.mp4.asset.json";
import tour3 from "@/assets/tour-3.mp4.asset.json";

export const site = {
  name: "Flipaholics SA",
  tagline: "Addicted to flipping homes",
  blurb:
    "Flipaholics SA specialises in flipping space for luxury living throughout South Africa.",
  category: "Kitchen & Bath Contractor",
  address: "Rooihuiskraal North, Centurion, Gauteng 0157",
  phoneDisplay: "+27 65 860 6236",
  phoneTel: "+27658606236",
  whatsapp: "https://wa.me/27658606236",
  email: "flipaholicssa@gmail.com",
  instagram: "https://instagram.com/flipaholicssa",
  instagramHandle: "@flipaholicssa",
} as const;

export const logoUrl = logo.url;

export const heroVideo = tour1.url;

export type GalleryItem = {
  type: "video" | "image";
  src: string;
  title: string;
  caption: string;
  wide?: boolean;
};

export const gallery: GalleryItem[] = [
  {
    type: "video",
    src: tour2.url,
    title: "Walkthrough",
    caption: "A finished flip, room by room",
    wide: true,
  },
  {
    type: "image",
    src: displayCabinet.url,
    title: "Illuminated display",
    caption: "Backlit glass cabinetry with bespoke shelving",
  },
  {
    type: "image",
    src: wineCabinet.url,
    title: "Wine cellar drawer",
    caption: "Solid oak racking with warm concealed lighting",
  },
  {
    type: "video",
    src: tour3.url,
    title: "Detail work",
    caption: "Finishes, joinery and lighting up close",
  },
  {
    type: "image",
    src: diningBlue.url,
    title: "Dining & lounge",
    caption: "Layered ceiling coves and mood lighting",
  },
  {
    type: "image",
    src: loungeMono.url,
    title: "Monochrome living",
    caption: "Wall panelling, statement art and glass",
    wide: true,
  },
];

export const services = [
  "Kitchens",
  "Bathrooms",
  "Walk-in closets",
  "Built-in cabinetry",
  "Full home renovations",
  "Lighting & finishes",
] as const;
