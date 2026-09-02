"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, ShoppingBag, X } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import SmartImage from "@/components/ui/SmartImage";
import StarRating from "@/components/ui/StarRating";
import Button from "@/components/ui/Button";

export default function QuickViewModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => (product ? s.has(product.id) : false));
  const [color, setColor] = useState<string | undefined>(product?.colors[0]?.name);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const activeProduct = product;

  return (
    <AnimatePresence
      onExitComplete={() => {
        setQty(1);
        setAdded(false);
      }}
    >
      {activeProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="grid max-h-[90vh] w-full max-w-3xl grid-cols-1 overflow-y-auto rounded-2xl bg-cream shadow-2xl sm:grid-cols-2"
          >
            <div className="relative aspect-square sm:aspect-auto">
              <SmartImage
                src={activeProduct.images[0]}
                alt={activeProduct.name}
                label={activeProduct.name}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close quick view"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink sm:hidden"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative flex flex-col p-6 sm:p-8">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close quick view"
                className="absolute right-5 top-5 hidden h-9 w-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-sand/60 sm:flex"
              >
                <X size={18} />
              </button>

              <p className="text-xs uppercase tracking-wide text-muted">
                {activeProduct.tags[0]}
              </p>
              <h2 className="mt-1 font-serif-display text-2xl text-ink">
                {activeProduct.name}
              </h2>
              <div className="mt-2 flex items-center gap-2">
                <StarRating rating={activeProduct.rating} />
                <span className="text-xs text-muted">
                  ({activeProduct.reviewCount} reviews)
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xl font-medium text-ink">
                  {formatPrice(activeProduct.salePrice ?? activeProduct.price)}
                </span>
                {activeProduct.salePrice && (
                  <span className="text-sm text-muted line-through">
                    {formatPrice(activeProduct.price)}
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                {activeProduct.shortDescription}
              </p>

              {activeProduct.colors.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                    Color: {color}
                  </p>
                  <div className="flex gap-2">
                    {activeProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setColor(c.name)}
                        aria-label={c.name}
                        className={cn(
                          "h-7 w-7 rounded-full border-2 transition",
                          color === c.name ? "border-terracotta" : "border-transparent"
                        )}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 flex items-center gap-2">
                <div className="flex items-center rounded-full border border-line">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-ink-soft"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="px-3 py-2 text-ink-soft"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <Button
                  onClick={() => {
                    addItem(activeProduct.id, qty, color);
                    setAdded(true);
                  }}
                  className="flex-1"
                >
                  <ShoppingBag size={16} />
                  {added ? "Added to cart" : "Add to cart"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toggleWishlist(activeProduct.id)}
                >
                  <Heart
                    size={16}
                    className={isWishlisted ? "fill-terracotta text-terracotta" : ""}
                  />
                </Button>
              </div>

              <Link
                href={`/product/${activeProduct.slug}`}
                className="mt-4 text-center text-sm font-medium text-terracotta hover:underline sm:text-left"
              >
                View full details →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
