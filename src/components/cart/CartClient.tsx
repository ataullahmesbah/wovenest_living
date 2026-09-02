"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore, cartLineDetails } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function CartClient() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const lines = items.map(cartLineDetails).filter(Boolean) as NonNullable<
    ReturnType<typeof cartLineDetails>
  >[];
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 25;
  const total = subtotal + shipping;

  if (lines.length === 0) {
    return (
      <Container className="flex flex-col items-center py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sand text-muted">
          <ShoppingBag size={26} />
        </span>
        <h1 className="mt-6 font-serif-display text-3xl text-ink">
          Your cart is empty
        </h1>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">
          Looks like you haven&apos;t added anything yet. Explore the
          collection to find your next favorite piece.
        </p>
        <Button href="/shop" className="mt-6">
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-14 sm:py-20">
      <h1 className="font-serif-display text-3xl text-ink sm:text-4xl">
        Your Cart
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-line">
          {lines.map((line) => (
            <div
              key={`${line.product.id}-${line.product.colors[0]?.name}`}
              className="flex gap-4 py-6"
            >
              <Link
                href={`/product/${line.product.slug}`}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-sand sm:h-28 sm:w-28"
              >
                <SmartImage
                  src={line.product.images[0]}
                  alt={line.product.name}
                  label={line.product.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/product/${line.product.slug}`}
                      className="font-medium text-ink hover:text-terracotta"
                    >
                      {line.product.name}
                    </Link>
                    <p className="mt-1 text-xs text-muted">
                      {formatPrice(line.unitPrice)} each
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      removeItem(line.product.id, line.product.colors[0]?.name)
                    }
                    aria-label="Remove item"
                    className="p-1 text-muted transition hover:text-terracotta"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-line">
                    <button
                      type="button"
                      onClick={() => {
                        const qty =
                          items.find((i) => i.productId === line.product.id)
                            ?.quantity ?? 1;
                        updateQuantity(
                          line.product.id,
                          qty - 1,
                          line.product.colors[0]?.name
                        );
                      }}
                      className="px-3 py-1.5 text-ink-soft"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-7 text-center text-sm">
                      {
                        items.find((i) => i.productId === line.product.id)
                          ?.quantity
                      }
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const qty =
                          items.find((i) => i.productId === line.product.id)
                            ?.quantity ?? 1;
                        updateQuantity(
                          line.product.id,
                          qty + 1,
                          line.product.colors[0]?.name
                        );
                      }}
                      className="px-3 py-1.5 text-ink-soft"
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <p className="font-medium text-ink">
                    {formatPrice(line.lineTotal)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl bg-sand/40 p-6 sm:p-8">
          <h2 className="font-serif-display text-xl text-ink">Order Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Subtotal</dt>
              <dd className="text-ink">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Shipping</dt>
              <dd className="text-ink">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-medium">
              <dt className="text-ink">Total</dt>
              <dd className="text-ink">{formatPrice(total)}</dd>
            </div>
          </dl>
          <Button href="/checkout" size="lg" className="mt-6 w-full">
            Proceed to Checkout
          </Button>
          <p className="mt-3 text-center text-xs text-muted">
            Demo checkout — no real payment will be processed.
          </p>
        </div>
      </div>
    </Container>
  );
}
