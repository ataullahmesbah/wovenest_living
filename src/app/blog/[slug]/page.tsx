import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import SmartImage from "@/components/ui/SmartImage";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Badge from "@/components/ui/Badge";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts, getPostBySlug } from "@/data/blog";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const more = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <article className="py-10 sm:py-14">
      <Container className="max-w-3xl">
        <Breadcrumbs
          items={[{ label: "Journal", href: "/blog" }, { label: post.title }]}
        />

        <div className="mt-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} tone="ink">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="mt-4 font-serif-display text-3xl leading-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-muted">
            By {post.author} · {date} · {post.readingTime} min read
          </p>
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-sand">
          <SmartImage
            src={post.coverImage}
            alt={post.title}
            label={post.title}
            fill
            priority
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="prose-content mt-10 space-y-6 text-base leading-relaxed text-ink-soft">
          {post.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Container>

      {more.length > 0 && (
        <Container className="mt-20">
          <h2 className="font-serif-display text-2xl text-ink">
            More from the Journal
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {more.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </Container>
      )}
    </article>
  );
}
