import { cn } from "@/lib/utils";

type Tone = "terracotta" | "forest" | "ink" | "gold";

const toneClasses: Record<Tone, string> = {
  terracotta: "bg-terracotta text-cream",
  forest: "bg-forest text-cream",
  ink: "bg-ink text-cream",
  gold: "bg-gold text-ink",
};

export default function Badge({
  children,
  tone = "terracotta",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
