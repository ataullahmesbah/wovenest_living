import type { Metadata } from "next";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Demo checkout for Wovenest Living — no real payment is processed.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
