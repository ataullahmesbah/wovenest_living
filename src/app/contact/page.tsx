import type { Metadata } from "next";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import SmartImage from "@/components/ui/SmartImage";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Wovenest Living — send a message or chat with us directly on WhatsApp.",
};

const contactDetails = [
  { icon: MapPin, label: "123 Maple Street, Dhaka, Bangladesh" },
  { icon: Phone, label: "+8801571-083401" },
  { icon: Mail, label: "hello@wovenestliving.com" },
];

export default function ContactPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <div className="mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-wide text-muted">Contact</p>
          <h1 className="mt-1 font-serif-display text-4xl text-ink">
            We&apos;d love to hear from you
          </h1>
          <p className="mt-3 text-sm text-ink-soft">
            Questions about a product, an order, or just want to say hello?
            Send us a message or chat with us on WhatsApp for the fastest
            response.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
          <div className="order-2 lg:order-1">
            <ContactForm />
          </div>

          <div className="order-1 space-y-6 lg:order-2">
            <a
              href={whatsappLink("Hi Wovenest Living! I have a question.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-[#25D366] p-5 text-white transition hover:brightness-95"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
                <MessageCircle size={22} />
              </span>
              <div>
                <p className="font-semibold">Chat with us on WhatsApp</p>
                <p className="text-sm text-white/80">Usually replies within minutes</p>
              </div>
            </a>

            <div className="rounded-2xl bg-sand/40 p-6">
              <h2 className="font-serif-display text-lg text-ink">
                Visit or reach us
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-ink-soft">
                {contactDetails.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <Icon size={16} className="shrink-0 text-terracotta" />
                    {label}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted">
                Mon–Fri, 9:00 AM – 6:00 PM
              </p>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand">
              <SmartImage
                src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=900&q=80&auto=format&fit=crop"
                alt="Wovenest Living showroom"
                label="Find Us Here"
                fill
                sizes="380px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
