"use client";

import { useState } from "react";
import { Heart, ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import StarRating from "@/components/ui/StarRating";
import Button from "@/components/ui/Button";
import { whatsappLink } from "@/lib/whatsapp";

export default function BuyBox({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));

  const [color, setColor] = useState(product.colors[0]?.name);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const onSale = product.salePrice != null && product.salePrice < product.price;

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted">
        {product.tags[0]}
      </p>
      <h1 className="mt-1 font-serif-display text-3xl text-ink sm:text-4xl">
        {product.name}
      </h1>

      <div className="mt-3 flex items-center gap-3">
        <StarRating rating={product.rating} showValue />
        <span className="text-sm text-muted">
          ({product.reviewCount} reviews)
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-2xl font-medium text-ink">
          {formatPrice(product.salePrice ?? product.price)}
        </span>
        {onSale && (
          <span className="text-lg text-muted line-through">
            {formatPrice(product.price)}
          </span>
        )}
      </div>

      <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-soft">
        {product.description}
      </p>

      {product.colors.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Color: {color}
          </p>
          <div className="flex gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColor(c.name)}
                aria-label={c.name}
                className={cn(
                  "h-8 w-8 rounded-full border-2 transition",
                  color === c.name ? "border-terracotta" : "border-transparent"
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center gap-2">
        <div className="flex items-center rounded-full border border-line">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-2.5 text-ink-soft"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center text-sm">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="px-4 py-2.5 text-ink-soft"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <p className="text-xs text-muted">
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          className="flex-1"
          disabled={product.stock === 0}
          onClick={() => {
            addItem(product.id, qty, color);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
          }}
        >
          {added ? <Check size={18} /> : <ShoppingBag size={18} />}
          {added ? "Added to Cart" : "Add to Cart"}
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart
            size={18}
            className={isWishlisted ? "fill-terracotta text-terracotta" : ""}
          />
          {isWishlisted ? "Wishlisted" : "Wishlist"}
        </Button>
      </div>

      <a
        href={whatsappLink(`Hi! I'm interested in the ${product.name}.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:underline"
      >
        Ask a question on WhatsApp →
      </a>

      <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-2 border-t border-line pt-6 text-sm sm:grid-cols-2">
        <div className="flex justify-between sm:block">
          <dt className="text-muted">Material</dt>
          <dd className="text-ink-soft sm:mt-0.5">{product.material}</dd>
        </div>
        <div className="flex justify-between sm:block">
          <dt className="text-muted">Dimensions</dt>
          <dd className="text-ink-soft sm:mt-0.5">{product.dimensions}</dd>
        </div>
      </dl>
    </div>
  );
}
