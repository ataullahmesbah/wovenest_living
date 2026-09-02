"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import SmartImage from "@/components/ui/SmartImage";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";

export default function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));

  const onSale = product.salePrice != null && product.salePrice < product.price;

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <SmartImage
            src={product.images[0]}
            alt={product.name}
            label={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className={cn(
              "object-cover transition-opacity duration-500",
              hovered && product.images[1] ? "opacity-0" : "opacity-100"
            )}
          />
          {product.images[1] && (
            <SmartImage
              src={product.images[1]}
              alt=""
              label={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className={cn(
                "object-cover transition-opacity duration-500",
                hovered ? "opacity-100" : "opacity-0"
              )}
            />
          )}
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && <Badge tone="forest">New</Badge>}
          {onSale && <Badge tone="terracotta">Sale</Badge>}
          {product.isBestSeller && <Badge tone="gold">Bestseller</Badge>}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition hover:bg-white"
        >
          <Heart
            size={17}
            className={isWishlisted ? "fill-terracotta text-terracotta" : ""}
          />
        </button>

        <div
          className={cn(
            "absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300",
            "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
          )}
        >
          <button
            type="button"
            onClick={() => addItem(product.id, 1, product.colors[0]?.name)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream transition hover:bg-terracotta-dark"
          >
            <ShoppingBag size={14} /> Add
          </button>
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              aria-label="Quick view"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink transition hover:bg-cream"
            >
              <Eye size={16} />
            </button>
          )}
        </div>
      </div>

      <Link href={`/product/${product.slug}`} className="mt-3.5">
        <p className="text-xs uppercase tracking-wide text-muted">
          {product.tags[0]}
        </p>
        <h3 className="mt-1 font-medium text-ink transition group-hover:text-terracotta">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-center gap-2">
          <StarRating rating={product.rating} size={12} />
          <span className="text-xs text-muted">({product.reviewCount})</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="font-medium text-ink">
            {formatPrice(product.salePrice ?? product.price)}
          </span>
          {onSale && (
            <span className="text-sm text-muted line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
