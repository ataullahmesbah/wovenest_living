import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import { Leaf, Hammer, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind Wovenest Living — a demo furniture showcase built around craftsmanship, honest materials, and slow living.",
};

const stats = [
  { icon: Hammer, value: "12+", label: "Years of Craft" },
  { icon: Users, value: "24,000+", label: "Happy Homes" },
  { icon: Leaf, value: "100%", label: "Responsibly Sourced Wood" },
  { icon: Award, value: "5-Year", label: "Structural Warranty" },
];

export default function AboutPage() {
  return (
    <div className="pb-24">
      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden bg-ink">
        <SmartImage
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=2000&q=80&auto=format&fit=crop"
          alt="Wovenest Living workshop"
          label="Our Story"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <Container className="relative z-10 pb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-cream/70">
            About Us
          </p>
          <h1 className="mt-2 max-w-2xl font-serif-display text-4xl text-cream sm:text-5xl">
            Furniture built for a slower kind of home.
          </h1>
        </Container>
      </section>

      <Container>
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-2">
          <RevealOnScroll>
            <h2 className="font-serif-display text-2xl text-ink">
              Where it started
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Wovenest Living began as a simple frustration: too much
              furniture was designed to be replaced, not lived with. We
              wanted to build pieces that earned their place in a home —
              solid enough to pass down, simple enough to never go out of
              style.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="font-serif-display text-2xl text-ink">
              What we believe
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Good design should feel unhurried. Every collection we release
              starts with the material first — solid woods, natural fibers,
              and fabrics that soften with age — and the silhouette follows.
              Nothing is designed to chase a trend.
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll className="mt-20 grid grid-cols-2 gap-6 rounded-3xl bg-sand/40 p-8 sm:grid-cols-4 sm:p-12">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cream text-terracotta">
                <Icon size={20} />
              </span>
              <p className="mt-3 font-serif-display text-2xl text-ink">{value}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted">
                {label}
              </p>
            </div>
          ))}
        </RevealOnScroll>

        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=900&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1449247526201-f4b0d7276c60?w=900&q=80&auto=format&fit=crop",
          ].map((src, i) => (
            <RevealOnScroll key={src} delay={i * 0.1}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
                <SmartImage
                  src={src}
                  alt="Wovenest Living craftsmanship"
                  label="Craft"
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mt-20 flex flex-col items-center rounded-3xl bg-ink px-6 py-16 text-center text-cream sm:px-16">
          <h2 className="max-w-lg font-serif-display text-3xl text-balance sm:text-4xl">
            Ready to find your next favorite piece?
          </h2>
          <Button href="/shop" variant="secondary" size="lg" className="mt-7">
            Explore the Collection
          </Button>
        </RevealOnScroll>
      </Container>
    </div>
  );
}
