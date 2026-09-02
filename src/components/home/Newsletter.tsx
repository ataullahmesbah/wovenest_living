import Container from "@/components/ui/Container";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import NewsletterForm from "@/components/layout/NewsletterForm";
import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <RevealOnScroll className="flex flex-col items-center rounded-3xl bg-terracotta px-6 py-16 text-center sm:px-16">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/15 text-cream">
            <Mail size={24} />
          </span>
          <h2 className="mt-6 max-w-lg font-serif-display text-3xl text-cream text-balance sm:text-4xl">
            Join our list for new arrivals & interior tips
          </h2>
          <p className="mt-3 max-w-md text-sm text-cream/80">
            One email a week, no spam — unsubscribe anytime.
          </p>
          <div className="mt-8 flex justify-center">
            <NewsletterForm dark />
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
