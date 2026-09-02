import type { Metadata } from "next";
import CartClient from "@/components/cart/CartClient";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the items in your Wovenest Living cart.",
};

export default function CartPage() {
  return <CartClient />;
}
