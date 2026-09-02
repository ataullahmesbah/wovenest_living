import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StarRating({
  rating,
  size = 14,
  showValue = false,
  className,
}: {
  rating: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.round(rating);
          return (
            <Star
              key={i}
              size={size}
              className={filled ? "fill-gold text-gold" : "fill-none text-line"}
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      <span className="sr-only">{rating} out of 5 stars</span>
      {showValue && (
        <span className="text-xs font-medium text-ink-soft">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
