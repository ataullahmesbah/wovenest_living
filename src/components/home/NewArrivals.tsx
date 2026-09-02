"use client";

import { useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ProductGrid from "@/components/product/ProductGrid";
import { cn } from "@/lib/utils";
import { products } from "@/data/products";

const tabs = [
  { key: "new", label: "New" },
  { key: "trending", label: "Trending" },
  { key: "sale", label: "Sale" },
] as const;

export default function NewArrivals() {
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("new");

  const list = useMemo(() => {
    if (active === "new") return products.filter((p) => p.isNew).slice(0, 8);
    if (active === "trending")
      return products.filter((p) => p.isBestSeller).slice(0, 8);
    return products.filter((p) => p.salePrice != null).slice(0, 8);
  }, [active]);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <RevealOnScroll className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Fresh In" title="New Arrivals" />
          <div className="flex gap-1 rounded-full border border-line p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(tab.key)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  active === tab.key
                    ? "bg-ink text-cream"
                    : "text-ink-soft hover:text-ink"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        <div className="mt-12">
          <ProductGrid products={list} />
        </div>
      </Container>
    </section>
  );
}
