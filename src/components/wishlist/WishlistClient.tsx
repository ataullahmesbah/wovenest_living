"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist";
import { products } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function WishlistClient() {
  const productIds = useWishlistStore((s) => s.productIds);
  const items = products.filter((p) => productIds.includes(p.id));

  if (items.length === 0) {
    return (
      <Container className="flex flex-col items-center py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sand text-muted">
          <Heart size={26} />
        </span>
        <h1 className="mt-6 font-serif-display text-3xl text-ink">
          Your wishlist is empty
        </h1>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">
          Tap the heart on any product to save it here for later.
        </p>
        <Button href="/shop" className="mt-6">
          Explore Products
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-14 sm:py-20">
      <h1 className="font-serif-display text-3xl text-ink sm:text-4xl">
        Your Wishlist
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        {items.length} saved item{items.length !== 1 && "s"}
      </p>
      <div className="mt-10">
        <ProductGrid products={items} />
      </div>
    </Container>
  );
}
