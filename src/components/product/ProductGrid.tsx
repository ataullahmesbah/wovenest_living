"use client";

import { useState } from "react";
import type { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import QuickViewModal from "@/components/product/QuickViewModal";
import { cn } from "@/lib/utils";

export default function ProductGrid({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4",
          className
        )}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={setQuickViewProduct}
          />
        ))}
      </div>
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}
