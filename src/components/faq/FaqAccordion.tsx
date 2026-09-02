"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";

export default function FaqAccordion() {
  const categories = Array.from(new Set(faqItems.map((f) => f.category)));
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <div key={category}>
          <h2 className="mb-4 font-serif-display text-xl text-ink">{category}</h2>
          <div className="divide-y divide-line border-y border-line">
            {faqItems
              .filter((f) => f.category === category)
              .map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id}>
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span className="font-medium text-ink">{item.question}</span>
                      <ChevronDown
                        size={18}
                        className={cn(
                          "shrink-0 text-muted transition-transform",
                          isOpen && "rotate-180 text-terracotta"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid overflow-hidden transition-all duration-300",
                        isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <p className="min-h-0 text-sm leading-relaxed text-ink-soft">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
