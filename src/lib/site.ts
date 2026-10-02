// All site media lives in the public "site-media" storage bucket so it is
// visible on any external deployment. Add new files there and list them here.
const MEDIA_BASE =
  "https://jknvxqspdkxlvdsjocxk.supabase.co/storage/v1/object/public/site-media";

export const mediaUrl = (file: string) => `${MEDIA_BASE}/${file}`;

const logo = { url: mediaUrl("logo-icon.png") };
const displayCabinet = { url: mediaUrl("display-cabinet.jpg") };
const wineCabinet = { url: mediaUrl("wine-cabinet.jpg") };
const diningBlue = { url: mediaUrl("dining-blue.jpg") };
const loungeMono = { url: mediaUrl("lounge-mono.jpg") };
const tour1 = { url: mediaUrl("tour-1.mp4") };
const tour2 = { url: mediaUrl("tour-2.mp4") };
const tour3 = { url: mediaUrl("tour-3.mp4") };

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
  tiktok: "https://www.tiktok.com/@flipaholics.sa?_r=1&_t=ZS-9ABb6Cyer5B",
  tiktokHandle: "@flipaholics.sa",
} as const;

export const logoUrl = logo.url;

export const heroVideo = tour1.url;

export type GalleryItem = {
  type: "video" | "image";
  src: string;
  title: string;
  caption: string;
  wide?: boolean;
  category?: string | undefined;
};

export const gallery: GalleryItem[] = [
  {
    type: "video",
    src: tour2.url,
    title: "Walkthrough",
    caption: "A finished flip, room by room",
    category: "Full home renovations",
    wide: true,
  },
  {
    type: "image",
    src: displayCabinet.url,
    title: "Illuminated display",
    caption: "Backlit glass cabinetry with bespoke shelving",
    category: "Built-in cabinetry",
  },
  {
    type: "image",
    src: wineCabinet.url,
    title: "Wine cellar drawer",
    caption: "Solid oak racking with warm concealed lighting",
    category: "Built-in cabinetry",
  },
  {
    type: "video",
    src: tour3.url,
    title: "Detail work",
    caption: "Finishes, joinery and lighting up close",
    category: "Lighting & finishes",
  },
  {
    type: "image",
    src: diningBlue.url,
    title: "Dining & lounge",
    caption: "Layered ceiling coves and mood lighting",
    category: "Lighting & finishes",
  },
  {
    type: "image",
    src: loungeMono.url,
    title: "Monochrome living",
    caption: "Wall panelling, statement art and glass",
    category: "Full home renovations",
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
