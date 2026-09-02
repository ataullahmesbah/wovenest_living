"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "@/types";
import { products } from "@/data/products";

type CartState = {
  items: CartLine[];
  addItem: (productId: string, quantity?: number, color?: string) => void;
  removeItem: (productId: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (productId, quantity = 1, color) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === productId && i.color === color
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === productId && i.color === color
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { productId, quantity, color }] };
        }),
      removeItem: (productId, color) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.color === color)
          ),
        })),
      updateQuantity: (productId, quantity, color) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.productId === productId && i.color === color
                ? { ...i, quantity: Math.max(1, quantity) }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "wovenest-cart" }
  )
);

export function cartLineDetails(line: CartLine) {
  const product = products.find((p) => p.id === line.productId);
  if (!product) return null;
  const unitPrice = product.salePrice ?? product.price;
  return { product, unitPrice, lineTotal: unitPrice * line.quantity };
}

export function useCartSummary() {
  const items = useCartStore((s) => s.items);
  const lines = items.map(cartLineDetails).filter(Boolean) as NonNullable<
    ReturnType<typeof cartLineDetails>
  >[];
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  return { lines, count, subtotal };
}
