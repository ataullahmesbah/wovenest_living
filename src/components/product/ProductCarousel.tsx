"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import QuickViewModal from "@/components/product/QuickViewModal";

export default function ProductCarousel({ products }: { products: Product[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Sync initial prev/next button state from the embla instance, then
    // keep listening for changes — required once on mount since embla's
    // scroll state isn't available until after the carousel initializes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-5 flex">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-0 shrink-0 grow-0 basis-[70%] pl-5 sm:basis-[42%] lg:basis-[26%]"
            >
              <ProductCard product={product} onQuickView={setQuickViewProduct} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Previous"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:bg-sand/60 disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="Next"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:bg-sand/60 disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
