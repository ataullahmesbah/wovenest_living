import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { blogPosts } from "@/data/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/about",
    "/blog",
    "/contact",
    "/faq",
    "/cart",
    "/wishlist",
    "/checkout",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${siteUrl}/shop/${c.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${siteUrl}/product/${p.slug}`,
    lastModified: p.createdAt,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: p.publishedAt,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
}
