"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SmartImage from "@/components/ui/SmartImage";
import { formatPrice, cn } from "@/lib/utils";
import { getProductBySlug } from "@/data/products";

const hotspots = [
  { top: "38%", left: "24%", slug: "aalto-curved-sofa" },
  { top: "62%", left: "68%", slug: "terra-coffee-table" },
  { top: "22%", left: "80%", slug: "ember-arc-floor-lamp" },
];

export default function RoomShowcase() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Get the Look"
            title="Interior Inspiration"
            description="Tap the markers to shop everything in this room."
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="relative mt-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-sand">
            <SmartImage
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=2000&q=80&auto=format&fit=crop"
              alt="Living room styled with Wovenest Living furniture"
              label="Room Showcase"
              fill
              sizes="100vw"
              className="object-cover"
            />

            {hotspots.map((spot) => {
              const product = getProductBySlug(spot.slug);
              if (!product) return null;
              const isOpen = openSlug === spot.slug;
              return (
                <div
                  key={spot.slug}
                  className="absolute z-10"
                  style={{ top: spot.top, left: spot.left }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenSlug(isOpen ? null : spot.slug)}
                    aria-label={`Shop ${product.name}`}
                    className={cn(
                      "flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-ink shadow-md ring-4 ring-cream/30 transition",
                      isOpen && "rotate-45 bg-terracotta text-cream"
                    )}
                  >
                    <Plus size={18} />
                  </button>

                  {isOpen && (
                    <Link
                      href={`/product/${product.slug}`}
                      className="absolute left-1/2 top-full mt-2 flex w-52 -translate-x-1/2 items-center gap-3 rounded-xl bg-white p-3 shadow-xl transition hover:shadow-2xl"
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-sand">
                        <SmartImage
                          src={product.images[0]}
                          alt={product.name}
                          label={product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-ink">
                          {product.name}
                        </p>
                        <p className="text-xs text-terracotta">
                          {formatPrice(product.salePrice ?? product.price)}
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
