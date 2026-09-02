import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SmartImage from "@/components/ui/SmartImage";
import { categories } from "@/data/categories";

export default function ShopByCategory() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Explore"
            title="Shop by Category"
            description="From anchor sofas to the smallest finishing touches — find the piece your room is missing."
          />
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, i) => (
            <RevealOnScroll key={cat.slug} delay={i * 0.06}>
              <Link href={`/shop/${cat.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-sand">
                  <SmartImage
                    src={cat.image}
                    alt={cat.name}
                    label={cat.name}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                  <p className="absolute bottom-4 left-4 right-4 font-serif-display text-lg text-cream">
                    {cat.name}
                  </p>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
