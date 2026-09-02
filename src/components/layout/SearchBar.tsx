"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import SmartImage from "@/components/ui/SmartImage";

export default function SearchBar({
  onNavigate,
  autoFocus,
}: {
  onNavigate?: () => void;
  autoFocus?: boolean;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 5);
  }, [query]);

  function goToResults() {
    if (!query.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
    onNavigate?.();
  }

  return (
    <div className="relative mx-auto max-w-xl">
      <div className="flex items-center gap-3 rounded-full border border-line bg-white px-4 py-2.5">
        <Search size={18} className="shrink-0 text-muted" />
        <input
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && goToResults()}
          placeholder="Search sofas, chairs, tables..."
          className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
        />
      </div>

      {results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-line bg-white p-2 shadow-lg">
          {results.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-sand/50"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-sand">
                <SmartImage
                  src={p.images[0]}
                  alt={p.name}
                  label={p.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{p.name}</p>
                <p className="text-xs text-muted">
                  {formatPrice(p.salePrice ?? p.price)}
                </p>
              </div>
            </Link>
          ))}
          <button
            type="button"
            onClick={goToResults}
            className="mt-1 w-full rounded-lg p-2 text-center text-xs font-semibold uppercase tracking-wide text-terracotta hover:bg-sand/50"
          >
            View all results for &ldquo;{query}&rdquo;
          </button>
        </div>
      )}
    </div>
  );
}
