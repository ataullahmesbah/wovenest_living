"use client";

import { useState } from "react";
import SmartImage from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-sand">
        <SmartImage
          src={images[active]}
          alt={name}
          label={name}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl bg-sand ring-2 transition",
                active === i ? "ring-terracotta" : "ring-transparent"
              )}
            >
              <SmartImage
                src={img}
                alt=""
                label={name}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
