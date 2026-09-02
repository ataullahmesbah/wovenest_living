import { Truck, RotateCcw, ShieldCheck, Headset } from "lucide-react";
import Container from "@/components/ui/Container";

const items = [
  { icon: Truck, title: "Free Delivery", desc: "On orders over $200" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day return window" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "100% protected checkout" },
  { icon: Headset, title: "24/7 Support", desc: "We're here when you need us" },
];

export default function TrustBar() {
  return (
    <section className="border-b border-line bg-sand/40 py-8">
      <Container className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-terracotta">
              <Icon size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{title}</p>
              <p className="text-xs text-ink-soft">{desc}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
