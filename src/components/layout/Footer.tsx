import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import NewsletterForm from "@/components/layout/NewsletterForm";
import { categories } from "@/data/categories";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";

const quickLinks = [
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Wishlist", href: "/wishlist" },
];

const socials = [
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
  { icon: FacebookIcon, label: "Facebook", href: "https://facebook.com" },
  { icon: XIcon, label: "Twitter / X", href: "https://twitter.com" },
  { icon: YoutubeIcon, label: "YouTube", href: "https://youtube.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-cream/80">
      <Container className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" className="font-serif-display text-2xl text-cream">
            Wovenest <span className="text-terracotta">Living</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Furniture for a warmer home — a demo showcase of premium sofas,
            chairs, tables and decor, designed for slow, comfortable living.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5">
              <MapPin size={16} className="shrink-0 text-terracotta" />
              123 Maple Street, Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-terracotta" />
              +8801571-083401
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-terracotta" />
              hello@wovenestliving.com
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-cream">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-underline hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-cream">
            Categories
          </h3>
          <ul className="space-y-2.5 text-sm">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/shop/${cat.slug}`}
                  className="link-underline hover:text-cream"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-cream">
            Stay in the loop
          </h3>
          <p className="mb-4 text-sm">
            Subscribe for new arrivals, restocks and interior tips.
          </p>
          <NewsletterForm dark />
          <div className="mt-6 flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition hover:border-terracotta hover:text-terracotta"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-cream/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-cream/60 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Wovenest Living. Demo showcase
            website — all products are for illustration only.
          </p>
          <div className="flex items-center gap-3 text-cream/50">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </Container>
      </div>

      <div className="border-t border-cream/10 bg-ink/80">
        <Container className="py-4 text-center text-xs text-cream/60">
          Design by{" "}
          <a
            href="https://www.ataullahmesbah.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-terracotta hover:underline"
          >
            Ataullah Mesbah
          </a>{" "}
          — www.ataullahmesbah.com
        </Container>
      </div>
    </footer>
  );
}
