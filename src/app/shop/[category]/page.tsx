import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import ShopClient from "@/components/shop/ShopClient";
import SmartImage from "@/components/ui/SmartImage";
import Skeleton from "@/components/ui/Skeleton";
import { categories, getCategoryBySlug } from "@/data/categories";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  return (
    <div className="pb-20">
      <div className="relative flex h-64 items-end overflow-hidden bg-ink sm:h-80">
        <SmartImage
          src={cat.image}
          alt={cat.name}
          label={cat.name}
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <Container className="relative z-10 pb-8">
          <p className="text-xs uppercase tracking-wide text-cream/70">Shop</p>
          <h1 className="mt-1 font-serif-display text-4xl text-cream">
            {cat.name}
          </h1>
          <p className="mt-2 max-w-lg text-sm text-cream/80">{cat.description}</p>
        </Container>
      </div>

      <Container className="pt-14">
        <Suspense fallback={<ShopSkeleton />}>
          <ShopClient categorySlug={cat.slug} />
        </Suspense>
      </Container>
    </div>
  );
}

function ShopSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-[4/5] w-full" />
          <Skeleton className="mt-3 h-4 w-3/4" />
          <Skeleton className="mt-2 h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
