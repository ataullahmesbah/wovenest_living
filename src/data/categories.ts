import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "cat-sofa",
    name: "Sofas & Couches",
    slug: "sofas",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80&auto=format&fit=crop",
    description:
      "Deep-seated, upholstered comfort built to anchor your living room.",
  },
  {
    id: "cat-chair",
    name: "Chairs & Armchairs",
    slug: "chairs",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=80&auto=format&fit=crop",
    description: "Statement seating for reading nooks and quiet corners.",
  },
  {
    id: "cat-table",
    name: "Tables",
    slug: "tables",
    image:
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200&q=80&auto=format&fit=crop",
    description: "Dining and coffee tables in solid wood and stone.",
  },
  {
    id: "cat-bed",
    name: "Beds & Bedroom",
    slug: "beds",
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200&q=80&auto=format&fit=crop",
    description: "Restful bedroom foundations, from frames to headboards.",
  },
  {
    id: "cat-lighting",
    name: "Lighting",
    slug: "lighting",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80&auto=format&fit=crop",
    description: "Warm ambient lighting — pendants, floor and table lamps.",
  },
  {
    id: "cat-decor",
    name: "Decor & Accessories",
    slug: "decor",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80&auto=format&fit=crop",
    description: "The finishing layer — vases, textiles, mirrors and more.",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
