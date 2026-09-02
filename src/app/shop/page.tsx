import { Suspense } from "react";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ShopClient from "@/components/shop/ShopClient";
import Skeleton from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "Shop All Furniture",
  description:
    "Browse the full Wovenest Living catalog — sofas, chairs, tables, beds, lighting and decor.",
};

export default function ShopPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <div className="mb-10">
          <p className="text-xs uppercase tracking-wide text-muted">Shop</p>
          <h1 className="mt-1 font-serif-display text-4xl text-ink">
            All Products
          </h1>
        </div>
        <Suspense fallback={<ShopSkeleton />}>
          <ShopClient />
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
