import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductGallery from "@/components/product/ProductGallery";
import BuyBox from "@/components/product/BuyBox";
import ProductTabs from "@/components/product/ProductTabs";
import ProductGrid from "@/components/product/ProductGrid";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  products,
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.categorySlug);
  const related = getRelatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.salePrice ?? product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            ...(category
              ? [{ label: category.name, href: `/shop/${category.slug}` }]
              : []),
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ProductGallery images={product.images} name={product.name} />
          <BuyBox product={product} />
        </div>

        <ProductTabs product={product} />

        {related.length > 0 && (
          <div className="mt-20">
            <SectionHeading eyebrow="You May Also Like" title="Related Products" />
            <div className="mt-10">
              <ProductGrid products={related} />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
