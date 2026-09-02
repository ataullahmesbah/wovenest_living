import Link from "next/link";
import type { BlogPost } from "@/types";
import SmartImage from "@/components/ui/SmartImage";
import Badge from "@/components/ui/Badge";

export default function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand">
        <SmartImage
          src={post.coverImage}
          alt={post.title}
          label={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3">
          <Badge tone="ink">{post.tags[0]}</Badge>
        </div>
      </div>
      <p className="mt-4 text-xs uppercase tracking-wide text-muted">
        {date} · {post.readingTime} min read
      </p>
      <h3 className="mt-2 font-serif-display text-xl leading-snug text-ink transition group-hover:text-terracotta">
        {post.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft line-clamp-2">
        {post.excerpt}
      </p>
    </Link>
  );
}
