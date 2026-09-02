import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ProductCarousel from "@/components/product/ProductCarousel";
import { products } from "@/data/products";

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.isFeatured);

  return (
    <section className="bg-sand/30 py-20 sm:py-28">
      <Container>
        <RevealOnScroll className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Handpicked"
            title="Best Sellers"
            description="The pieces our customers keep coming back for."
          />
          <Link
            href="/shop"
            className="link-underline text-sm font-medium text-ink"
          >
            View all products →
          </Link>
        </RevealOnScroll>

        <div className="mt-12">
          <ProductCarousel products={featured} />
        </div>
      </Container>
    </section>
  );
}
