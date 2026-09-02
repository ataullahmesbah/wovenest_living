"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { categories } from "@/data/categories";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import SearchBar from "@/components/layout/SearchBar";
import SmartImage from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const wishlistCount = useWishlistStore((s) => s.productIds.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setMegaOpen(false);
    setSearchOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-line bg-cream/90 shadow-sm backdrop-blur-md"
          : "border-transparent bg-cream/60 backdrop-blur-sm"
      )}
      onMouseLeave={() => setMegaOpen(false)}
    >
      <div className="container-wide flex h-20 items-center justify-between gap-6 py-3">
        <Link
          href="/"
          className="font-serif-display text-2xl tracking-tight text-ink shrink-0"
        >
          Wovenest <span className="text-terracotta">Living</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) =>
            link.label === "Shop" ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "link-underline text-sm font-medium text-ink-soft transition hover:text-ink",
                    pathname.startsWith("/shop") && "text-ink"
                  )}
                >
                  Shop
                </Link>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "link-underline text-sm font-medium text-ink-soft transition hover:text-ink",
                  pathname === link.href && "text-ink"
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search"
            className="rounded-full p-2.5 text-ink-soft transition hover:bg-sand/60 hover:text-ink"
          >
            <Search size={20} />
          </button>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative rounded-full p-2.5 text-ink-soft transition hover:bg-sand/60 hover:text-ink"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-semibold text-cream">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative rounded-full p-2.5 text-ink-soft transition hover:bg-sand/60 hover:text-ink"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-semibold text-cream">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="rounded-full p-2.5 text-ink-soft transition hover:bg-sand/60 hover:text-ink lg:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-line bg-cream"
          >
            <div className="container-wide py-4">
              <SearchBar onNavigate={() => setSearchOpen(false)} autoFocus />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="hidden border-t border-line bg-cream lg:block"
          >
            <div className="container-wide grid grid-cols-6 gap-4 py-8">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-sand">
                    <SmartImage
                      src={cat.image}
                      alt={cat.name}
                      label={cat.name}
                      fill
                      sizes="200px"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-ink group-hover:text-terracotta">
                    {cat.name}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="ml-auto flex h-full w-[85%] max-w-sm flex-col bg-cream p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif-display text-xl">Menu</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full p-2 hover:bg-sand/60"
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="mt-8 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-3 text-lg font-medium text-ink hover:bg-sand/60"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 border-t border-line pt-6">
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-muted">
                  Categories
                </p>
                <div className="flex flex-col gap-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/shop/${cat.slug}`}
                      className="rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-sand/60 hover:text-ink"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
