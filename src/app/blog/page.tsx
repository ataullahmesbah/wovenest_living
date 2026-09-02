import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import BlogListClient from "@/components/blog/BlogListClient";

export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Notes on materials, styling and living well at home — the Wovenest Living journal.",
};

export default function BlogPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <div className="mb-10">
          <p className="text-xs uppercase tracking-wide text-muted">Journal</p>
          <h1 className="mt-1 font-serif-display text-4xl text-ink">
            The Wovenest Journal
          </h1>
          <p className="mt-3 max-w-xl text-sm text-ink-soft">
            Notes on materials, styling, and living well at home.
          </p>
        </div>
        <BlogListClient />
      </Container>
    </div>
  );
}
