import { Hammer, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const features = [
  {
    icon: Hammer,
    title: "Real Craftsmanship",
    desc: "Every piece is built by hand from solid materials, not mass-stamped from particleboard.",
  },
  {
    icon: Leaf,
    title: "Honest Materials",
    desc: "FSC-certified wood, natural fibers, and CertiPUR-US foams — nothing hidden.",
  },
  {
    icon: ShieldCheck,
    title: "5-Year Structural Warranty",
    desc: "We stand behind every frame we build, for years of everyday living.",
  },
  {
    icon: Sparkles,
    title: "Designed to Last",
    desc: "Timeless silhouettes over trend-chasing — furniture you won't want to replace.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-forest py-20 text-cream sm:py-28">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Our Promise"
            title="Why Choose Wovenest Living"
            align="center"
            className="mx-auto [&_h2]:text-cream [&_p]:text-cream/70"
          />
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <RevealOnScroll key={title} delay={i * 0.08} className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cream/25 text-cream">
                <Icon size={24} />
              </span>
              <h3 className="mt-5 font-serif-display text-lg text-cream">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">{desc}</p>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
