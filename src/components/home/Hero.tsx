"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";

const headline = "Furniture for a warmer home.";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const word = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[86vh] items-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <SmartImage
          src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=2000&q=80&auto=format&fit=crop"
          alt="Warm, sunlit living room styled with Wovenest Living furniture"
          label="Living Room"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
      </div>

      <div className="container-wide relative z-10 pb-20 pt-40 sm:pb-28">
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl font-serif-display text-4xl leading-[1.1] text-cream text-balance sm:text-6xl lg:text-7xl"
        >
          {headline.split(" ").map((w, i) => (
            <span key={i} className="mr-4 inline-block overflow-hidden align-bottom">
              <motion.span variants={word} className="inline-block">
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 max-w-md text-base leading-relaxed text-cream/80 sm:text-lg"
        >
          Thoughtfully designed sofas, tables and decor — built from honest
          materials, for a home that feels slower and softer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Button href="/shop" variant="secondary" size="lg">
            Shop the Collection
          </Button>
          <Link
            href="/about"
            className="link-underline text-sm font-medium text-cream/90"
          >
            Our Story →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
