import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function PromoBanner() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2">
      <div className="relative flex min-h-[420px] flex-col justify-end overflow-hidden bg-forest p-10 sm:p-14">
        <SmartImage
          src="https://images.unsplash.com/photo-1449247526201-f4b0d7276c60?w=1400&q=80&auto=format&fit=crop"
          alt="New arrivals lifestyle shot"
          label="New Arrivals"
          fill
          sizes="50vw"
          className="object-cover opacity-40"
        />
        <RevealOnScroll className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">
            Just Landed
          </p>
          <h3 className="mt-3 max-w-xs font-serif-display text-3xl text-cream sm:text-4xl">
            New Arrivals for Autumn
          </h3>
          <Button href="/shop?filter=new" variant="secondary" className="mt-6">
            Shop New In
          </Button>
        </RevealOnScroll>
      </div>

      <div className="relative flex min-h-[420px] flex-col justify-end overflow-hidden bg-terracotta p-10 sm:p-14">
        <SmartImage
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=80&auto=format&fit=crop"
          alt="Seasonal sale lifestyle shot"
          label="Up to 40% Off"
          fill
          sizes="50vw"
          className="object-cover opacity-35"
        />
        <RevealOnScroll delay={0.1} className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/80">
            Limited Time
          </p>
          <h3 className="mt-3 max-w-xs font-serif-display text-3xl text-cream sm:text-4xl">
            Up to 40% Off Select Pieces
          </h3>
          <Button
            href="/shop?filter=sale"
            variant="primary"
            className="mt-6 bg-cream text-ink hover:bg-white"
          >
            Shop the Sale
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
