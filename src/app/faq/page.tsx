import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import FaqAccordion from "@/components/faq/FaqAccordion";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about orders, shipping, returns, materials and support at Wovenest Living.",
};

export default function FaqPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-wide text-muted">
            Support
          </p>
          <h1 className="mt-1 font-serif-display text-4xl text-ink">
            Frequently Asked Questions
          </h1>
        </div>

        <FaqAccordion />

        <div className="mt-16 flex flex-col items-center rounded-2xl bg-sand/40 p-10 text-center">
          <h2 className="font-serif-display text-xl text-ink">
            Still have questions?
          </h2>
          <p className="mt-2 max-w-sm text-sm text-ink-soft">
            Our team is happy to help — reach out any time.
          </p>
          <Button href="/contact" className="mt-5">
            Contact Us
          </Button>
        </div>
      </Container>
    </div>
  );
}
