"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import StarRating from "@/components/ui/StarRating";
import SmartImage from "@/components/ui/SmartImage";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Loved by Customers"
            title="What People Are Saying"
            align="center"
          />
        </RevealOnScroll>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <StarRating rating={t.rating} size={18} className="justify-center" />
              <p className="mt-5 font-serif-display text-xl leading-relaxed text-ink sm:text-2xl">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-full bg-sand">
                  <SmartImage
                    src={t.avatar}
                    alt={t.name}
                    label={t.name.charAt(0)}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-terracotta" : "w-1.5 bg-line"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
