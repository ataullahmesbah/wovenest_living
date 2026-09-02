"use client";

import { useMemo, useState } from "react";
import { blogPosts } from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

export default function BlogListClient() {
  const allTags = useMemo(
    () => Array.from(new Set(blogPosts.flatMap((p) => p.tags))),
    []
  );
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const posts = activeTag
    ? blogPosts.filter((p) => p.tags.includes(activeTag))
    : blogPosts;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition",
            activeTag === null
              ? "border-ink bg-ink text-cream"
              : "border-line text-ink-soft hover:border-ink"
          )}
        >
          All Posts
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition",
              activeTag === tag
                ? "border-ink bg-ink text-cream"
                : "border-line text-ink-soft hover:border-ink"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <RevealOnScroll key={post.id} delay={(i % 3) * 0.08}>
            <BlogCard post={post} />
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
