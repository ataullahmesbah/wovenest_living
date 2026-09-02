import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blog";

export default function BlogPreview() {
  const latest = blogPosts.slice(0, 3);

  return (
    <section className="bg-sand/30 py-20 sm:py-28">
      <Container>
        <RevealOnScroll className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="The Journal"
            title="From the Blog"
            description="Notes on materials, styling and living well at home."
          />
          <Link href="/blog" className="link-underline text-sm font-medium text-ink">
            Read the Journal →
          </Link>
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, i) => (
            <RevealOnScroll key={post.id} delay={i * 0.1}>
              <BlogCard post={post} />
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
