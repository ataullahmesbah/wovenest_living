import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SmartImage from "@/components/ui/SmartImage";
import { InstagramIcon } from "@/components/ui/SocialIcons";

const images = [
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80&auto=format&fit=crop",
];

export default function InstagramGallery() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Follow Along"
            title="@wovenestliving"
            align="center"
          />
        </RevealOnScroll>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {images.map((src, i) => (
            <a
              key={src}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-xl bg-sand"
            >
              <SmartImage
                src={src}
                alt="Wovenest Living on Instagram"
                label={`Post ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 16vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition group-hover:bg-ink/40">
                <InstagramIcon
                  size={22}
                  className="text-cream opacity-0 transition group-hover:opacity-100"
                />
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
