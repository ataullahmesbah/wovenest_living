"use client";

import { useState } from "react";
import type { Product } from "@/types";
import StarRating from "@/components/ui/StarRating";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

const tabs = ["Description", "Shipping & Returns", "Reviews"] as const;

export default function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<(typeof tabs)[number]>("Description");
  const reviews = testimonials.slice(0, 3);

  return (
    <div className="mt-16">
      <div className="flex gap-8 border-b border-line">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={cn(
              "-mb-px border-b-2 pb-4 text-sm font-medium transition",
              active === tab
                ? "border-terracotta text-ink"
                : "border-transparent text-muted hover:text-ink"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="max-w-2xl py-8 text-sm leading-relaxed text-ink-soft">
        {active === "Description" && <p>{product.description}</p>}

        {active === "Shipping & Returns" && (
          <div className="space-y-3">
            <p>
              In-stock items ship within 3–5 business days. White-glove
              delivery with room placement is available at checkout for large
              furniture.
            </p>
            <p>
              We offer a 30-day return window on most items in original
              condition — see our FAQ for full details.
            </p>
          </div>
        )}

        {active === "Reviews" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} showValue size={18} />
              <span>· {product.reviewCount} reviews</span>
            </div>
            {reviews.map((r) => (
              <div key={r.id} className="border-t border-line pt-6">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-ink">{r.name}</p>
                  <StarRating rating={r.rating} size={12} />
                </div>
                <p className="mt-2">{r.review}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
