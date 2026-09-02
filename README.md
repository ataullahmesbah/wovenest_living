# Wovenest Living

A demo/portfolio furniture e-commerce showcase built with **Next.js 16 (App
Router)**, **Tailwind CSS v4**, **Framer Motion**, and **Prisma**. All
products, prices, blog posts and reviews are demo content — this is a design
and engineering showcase, not a live store.

Design & Development by **Ataullah Mesbah** — [www.ataullahmesbah.com](https://www.ataullahmesbah.com)

## What's included

- Full storefront: home, shop (with filters/sort/search), category pages,
  product detail pages, cart, wishlist, demo checkout
- Content pages: About, Blog (listing + single post), Contact, FAQ, custom 404
- Mega-menu navigation, quick-view modal, product carousels, shoppable room
  hotspots, testimonials carousel, newsletter signup
- Floating WhatsApp chat button on every page
- Scroll-triggered animations (Framer Motion) + smooth scrolling (Lenis)
- SEO: per-page metadata, Open Graph tags, JSON-LD product schema,
  sitemap.xml, robots.txt
- Working Contact form and Newsletter signup, backed by PostgreSQL via Prisma

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The whole storefront —
products, categories, blog — works immediately with **no database required**,
since that content ships as static demo data in `src/data/`.

### Environment variables

Copy `.env.example` to `.env` (a working `.env` with safe defaults is already
included) and adjust as needed:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string for the Contact form and Newsletter signup |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Number used by the floating WhatsApp button and Contact page CTA (digits only, with country code) |
| `NEXT_PUBLIC_SITE_URL` | Used for metadata, sitemap and JSON-LD |

### Enabling the Contact form & Newsletter (optional)

These two features write to PostgreSQL through Prisma. Everything else on
the site works without a database. To enable them:

1. Provision a Postgres database (local via Docker/Postgres.app, or a free
   hosted option like [Neon](https://neon.tech) or [Supabase](https://supabase.com)).
2. Set `DATABASE_URL` in `.env`.
3. Run:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Restart the dev server.

Without a configured database, both forms fail gracefully with a friendly
message instead of crashing — the rest of the site is unaffected.

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build (static-generates every page)
npm run start    # run the production build
npm run lint     # ESLint
```

## Project structure

```
src/
  app/            Routes (App Router) — pages, layouts, API routes, sitemap/robots
  components/
    layout/       Navbar, Footer, WhatsApp button, announcement bar, smooth scroll
    home/         Homepage sections (hero, categories, featured, testimonials...)
    product/      Product card, gallery, quick view, carousel, buy box
    shop/         Shop filters/sort client component
    blog/         Blog card, blog list filter
    cart/         Cart page client component
    wishlist/     Wishlist page client component
    checkout/     Demo checkout form
    contact/      Contact form
    faq/          FAQ accordion
    ui/           Reusable primitives (Button, Badge, SectionHeading, SmartImage...)
  data/           Demo content: products, categories, blog posts, testimonials, FAQ
  store/          Zustand stores (cart, wishlist) — persisted to localStorage
  lib/            Prisma client, utils, WhatsApp link helper
  types/          Shared TypeScript types
prisma/
  schema.prisma   Full data model (Product, Category, BlogPost, Testimonial,
                   ContactMessage, NewsletterSubscriber, CartItem) — ready to
                   move off demo data whenever you want a real backend
```

### About the demo images

Product, category and blog imagery is hotlinked from Unsplash. Every image
goes through a `SmartImage` component that falls back to a themed gradient
placeholder if a photo ever fails to load, so the site never shows a broken
image icon. Swap in real product photography any time by editing
`src/data/*.ts`.

## Deploying

The app is a standard Next.js app and deploys cleanly to **Vercel**:

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the environment variables from `.env.example` (at minimum
   `NEXT_PUBLIC_WHATSAPP_NUMBER` and `NEXT_PUBLIC_SITE_URL`; add
   `DATABASE_URL` if you want the Contact/Newsletter forms to persist data).
4. Deploy.

It also runs anywhere Node.js does — build with `npm run build`, then
`npm run start`.

## Customizing

- **WhatsApp number** — set `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env`.
- **Colors & fonts** — edit the theme tokens in `src/app/globals.css`
  (`--color-terracotta`, `--color-forest`, etc.) and the font imports in
  `src/app/layout.tsx`.
- **Products / categories / blog / testimonials / FAQ** — edit the files in
  `src/data/`.
- **Footer credit** — the "Design by Ataullah Mesbah" line lives in
  `src/components/layout/Footer.tsx`.

---

Design by [Ataullah Mesbah](https://www.ataullahmesbah.com)
# wovenest_living
