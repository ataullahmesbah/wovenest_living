import type { Testimonial } from "@/types";

const avatar = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=200&q=80&auto=format&fit=crop&fm=jpg`;

export const testimonials: Testimonial[] = [
  {
    id: "t-01",
    name: "Priya Sharma",
    role: "Verified Buyer — Aalto Curved Sofa",
    avatar: avatar("1544005313-94ddf0286df2"),
    rating: 5,
    review:
      "The sofa arrived exactly as pictured — genuinely better in person. Delivery team was careful and the assembly took ten minutes. This is the first furniture purchase I haven't second-guessed.",
  },
  {
    id: "t-02",
    name: "James Whitfield",
    role: "Verified Buyer — Solstice Oak Dining Table",
    avatar: avatar("1500648767791-00dcc994a43e"),
    rating: 5,
    review:
      "Solid, heavy, beautifully finished. We've hosted three dinners on it already and every guest asks where it's from. Worth every penny.",
  },
  {
    id: "t-03",
    name: "Amara Okafor",
    role: "Verified Buyer — Fenn Lounge Chair",
    avatar: avatar("1531123897727-8f129e1688ce"),
    rating: 4,
    review:
      "Beautiful chair, exactly the mid-century look I wanted for my reading corner. Shipping took a little longer than expected but the quality made up for it.",
  },
  {
    id: "t-04",
    name: "Daniel Kim",
    role: "Verified Buyer — Linen Platform Bed",
    avatar: avatar("1507003211169-0a1dd7228f2d"),
    rating: 5,
    review:
      "The headboard alone changed the whole feel of our bedroom. Customer support was also fantastic when I had questions about assembly.",
  },
  {
    id: "t-05",
    name: "Sofia Marchetti",
    role: "Verified Buyer — Terra Coffee Table",
    avatar: avatar("1544723795-3fb6469f5b39"),
    rating: 5,
    review:
      "I was nervous ordering a stone-top table online but it's stunning — no chips, no cracks, perfectly packaged. Already planning my next order.",
  },
  {
    id: "t-06",
    name: "Marcus Bell",
    role: "Verified Buyer — Nordic Modular Sectional",
    avatar: avatar("1519085360753-af0119f7cbe7"),
    rating: 4,
    review:
      "Loved being able to rearrange the modules when we moved apartments. Genuinely flexible furniture, not just a marketing term.",
  },
];
