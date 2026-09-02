import type { Metadata } from "next";
import WishlistClient from "@/components/wishlist/WishlistClient";

export const metadata: Metadata = {
  title: "Your Wishlist",
  description: "Products you've saved for later at Wovenest Living.",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
