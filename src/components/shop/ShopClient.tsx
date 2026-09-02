"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { products as allProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { allColors } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";
import { cn } from "@/lib/utils";

const priceBuckets = [
  { label: "Under $200", min: 0, max: 200 },
  { label: "$200 – $500", min: 200, max: 500 },
  { label: "$500 – $1000", min: 500, max: 1000 },
  { label: "$1000+", min: 1000, max: Infinity },
];

const sortOptions = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "newest", label: "Newest" },
  { key: "rating", label: "Top Rated" },
] as const;

export default function ShopClient({
  categorySlug,
}: {
  categorySlug?: string;
}) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() ?? "";
  const filterParam = searchParams.get("filter");

  const [category, setCategory] = useState(categorySlug ?? "all");
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sort, setSort] = useState<(typeof sortOptions)[number]["key"]>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...allProducts];

    if (category !== "all") {
      list = list.filter((p) => p.categorySlug === category);
    }
    if (searchQuery) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery))
      );
    }
    if (filterParam === "new") list = list.filter((p) => p.isNew);
    if (filterParam === "sale") list = list.filter((p) => p.salePrice != null);

    if (priceRange) {
      const bucket = priceBuckets.find((b) => b.label === priceRange);
      if (bucket) {
        list = list.filter((p) => {
          const price = p.salePrice ?? p.price;
          return price >= bucket.min && price < bucket.max;
        });
      }
    }
    if (selectedColors.length > 0) {
      list = list.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "price-desc":
        list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case "newest":
        list.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }

    return list;
  }, [category, searchQuery, filterParam, priceRange, selectedColors, sort]);

  function toggleColor(name: string) {
    setSelectedColors((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  }

  function clearFilters() {
    setCategory(categorySlug ?? "all");
    setPriceRange(null);
    setSelectedColors([]);
  }

  const filtersActive = priceRange || selectedColors.length > 0 || category !== (categorySlug ?? "all");

  const filterPanel = (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
          Category
        </h3>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={cn(
              "block text-sm transition",
              category === "all" ? "font-semibold text-terracotta" : "text-ink-soft hover:text-ink"
            )}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setCategory(cat.slug)}
              className={cn(
                "block text-sm transition",
                category === cat.slug
                  ? "font-semibold text-terracotta"
                  : "text-ink-soft hover:text-ink"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
          Price
        </h3>
        <div className="space-y-2">
          {priceBuckets.map((b) => (
            <label key={b.label} className="flex items-center gap-2.5 text-sm text-ink-soft">
              <input
                type="radio"
                name="price"
                checked={priceRange === b.label}
                onChange={() =>
                  setPriceRange(priceRange === b.label ? null : b.label)
                }
                className="h-4 w-4 accent-terracotta"
              />
              {b.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
          Color
        </h3>
        <div className="flex flex-wrap gap-2">
          {allColors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => toggleColor(c.name)}
              aria-label={c.name}
              aria-pressed={selectedColors.includes(c.name)}
              className={cn(
                "h-8 w-8 rounded-full border-2 transition",
                selectedColors.includes(c.name) ? "border-terracotta" : "border-transparent"
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {filtersActive && (
        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-semibold uppercase tracking-wide text-terracotta hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
      <aside className="hidden lg:block">{filterPanel}</aside>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-ink-soft">
            {filtered.length} product{filtered.length !== 1 && "s"}
            {searchQuery && <> for &ldquo;{searchQuery}&rdquo;</>}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm lg:hidden"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm text-ink focus:outline-none"
            >
              {sortOptions.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  Sort: {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <div className="rounded-2xl border border-dashed border-line py-24 text-center">
            <p className="text-ink-soft">No products match your filters.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-3 text-sm font-semibold text-terracotta hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[70] flex lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-[85%] max-w-xs flex-col overflow-y-auto bg-cream p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-serif-display text-lg">Filters</span>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="rounded-full p-2 hover:bg-sand/60"
              >
                <X size={20} />
              </button>
            </div>
            {filterPanel}
          </div>
        </div>
      )}
    </div>
  );
}
