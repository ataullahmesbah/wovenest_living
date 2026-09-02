import type { BlogPost } from "@/types";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1400&q=80&auto=format&fit=crop`;

export const blogPosts: BlogPost[] = [
  {
    id: "b-01",
    title: "5 Ways to Style a Neutral Living Room Without It Feeling Flat",
    slug: "style-neutral-living-room",
    excerpt:
      "Neutral doesn't have to mean boring. Here's how to layer texture, warmth, and one bold accent to keep a calm palette from falling flat.",
    coverImage: img("1449247526201-f4b0d7276c60"),
    tags: ["Styling", "Living Room"],
    author: "Wovenest Editorial",
    publishedAt: "2026-08-12",
    readingTime: 5,
    content: [
      "A neutral living room is a wonderful foundation — but foundations need layers. The most common mistake is matching every tone too closely, which flattens the whole room into one visual note.",
      "Start with texture. Bouclé, linen, rattan, and raw wood all read as 'neutral' but behave completely differently under light. Mixing at least three textures keeps a beige-on-beige room feeling rich instead of flat.",
      "Next, commit to one accent that repeats. Whether it's a terracotta vase, a forest-green throw, or a set of brass sconces, repeating a single accent color three times across a room creates rhythm without overwhelming the palette.",
      "Finally, don't forget scale. A room full of only small objects feels cluttered; anchor it with one or two larger sculptural pieces — a curved sofa, an oversized mirror — so the eye has somewhere to rest.",
    ],
  },
  {
    id: "b-02",
    title: "Solid Wood vs. Engineered Wood: What Actually Matters",
    slug: "solid-wood-vs-engineered-wood",
    excerpt:
      "Not every piece needs to be solid hardwood — and not every 'engineered' label means lower quality. Here's how to actually evaluate furniture construction.",
    coverImage: img("1533090161767-e6ffed986c88"),
    tags: ["Materials", "Buying Guide"],
    author: "Wovenest Editorial",
    publishedAt: "2026-07-22",
    readingTime: 6,
    content: [
      "Solid wood is prized for longevity and the ability to be refinished, but it also moves with humidity and tends to cost more. Engineered wood — plywood or MDF with a veneer — is more dimensionally stable and often more sustainable, since it uses timber more efficiently.",
      "The real question isn't 'solid or engineered' but 'is it well made.' Look at joinery: dovetails and mortise-and-tenon joints outlast staples and glue alone, regardless of material.",
      "For tabletops and structural frames, we lean solid wood. For large flat panels — cabinet sides, bed platforms — a quality engineered core with a real wood veneer is often the smarter, more stable choice.",
    ],
  },
  {
    id: "b-03",
    title: "How to Measure a Sofa for Doorways, Stairwells, and Elevators",
    slug: "how-to-measure-sofa-for-delivery",
    excerpt:
      "The single most common furniture-return reason isn't the sofa itself — it's that it never made it through the front door. Here's the measuring checklist we send every customer.",
    coverImage: img("1550254478-ead40cc54513"),
    tags: ["Buying Guide"],
    author: "Wovenest Editorial",
    publishedAt: "2026-06-30",
    readingTime: 4,
    content: [
      "Before you fall in love with a sofa, grab a tape measure and check three points: your widest doorway, any stairwell turns, and the elevator interior if you have one.",
      "Measure the diagonal depth of your doorway opening — most sofas travel through on an angle, not straight on, so the usable clearance is usually larger than the doorway width alone.",
      "If you're on a tight stairwell, ask about modular or knock-down frame options — many of our sectionals ship in separate pieces specifically to solve this problem.",
    ],
  },
  {
    id: "b-04",
    title: "The Case for a Statement Lighting Piece in Every Room",
    slug: "statement-lighting-every-room",
    excerpt:
      "Overhead lighting is often the last thing people budget for — and the first thing guests notice. A few thoughts on where to spend and where to save.",
    coverImage: img("1543198126-a8ad8e739729"),
    tags: ["Lighting", "Styling"],
    author: "Wovenest Editorial",
    publishedAt: "2026-05-18",
    readingTime: 4,
    content: [
      "Lighting does double duty as function and jewelry. A single well-chosen pendant or arc lamp can carry the personality of an entire room, letting the rest of the furniture stay quiet.",
      "We recommend layering three light sources per room: ambient (overhead), task (a reading or desk lamp), and accent (a sconce or small table lamp). Warm color temperature — around 2700K — keeps a home feeling inviting rather than clinical.",
    ],
  },
  {
    id: "b-05",
    title: "Small Space, Big Comfort: Furnishing a Studio Apartment",
    slug: "furnishing-a-studio-apartment",
    excerpt:
      "Square footage is fixed, but flexibility isn't. Our favorite tricks for making a studio feel like a full home.",
    coverImage: img("1618221195710-dd6b41faaea6"),
    tags: ["Small Spaces", "Styling"],
    author: "Wovenest Editorial",
    publishedAt: "2026-04-09",
    readingTime: 5,
    content: [
      "In a studio, every piece needs to work harder. A storage bed, a console that doubles as a desk, or a loveseat instead of a full sofa can reclaim square footage without sacrificing comfort.",
      "Rugs are the most underrated small-space tool — defining a 'living area' and a 'sleeping area' with a rug boundary does more visual work than any wall ever could.",
    ],
  },
  {
    id: "b-06",
    title: "Caring for Bouclé, Linen, and Performance Fabrics",
    slug: "caring-for-boucle-linen-performance-fabrics",
    excerpt:
      "Different upholstery fabrics need different care. A quick reference so your furniture looks new for years, not months.",
    coverImage: img("1586105251261-72a756497a11"),
    tags: ["Materials", "Care Guide"],
    author: "Wovenest Editorial",
    publishedAt: "2026-03-15",
    readingTime: 3,
    content: [
      "Bouclé loves a gentle vacuum brush and hates direct sun exposure, which can flatten its texture over time. Rotate cushions regularly to even out wear.",
      "Linen softens beautifully with age but wrinkles easily — that's part of its charm, not a flaw. Spot clean with cold water and avoid the dryer.",
      "Performance fabrics are engineered for real life: most spills wipe clean with just water. Still, always test any cleaner on a hidden patch first.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
