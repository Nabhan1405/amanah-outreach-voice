# Amanah Outreach Voice

The website for Amanah Outreach Voice — a non-profit charity organisation
operating in Mangalore, Karnataka, bridging gaps in resources and livelihood
for children, the differently-abled, the elderly and animals.

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis.

```bash
npm install
npm run dev     # development
npm run build   # production build — 23 static routes
npm start       # serve the production build
```

---

## ⚠️ Before publishing

Everything below is **editable sample data**, not verified fact. It is marked
in the UI with a visible note wherever it appears, and in the source with
`placeholder: true`.

| What | Where | Note |
|---|---|---|
| Contact email, phone, address | `src/content/site.ts` → `org` | `placeholderContact: true` |
| Impact statistics | `src/content/site.ts` → `impactStats` | Replace with audited figures |
| Campaign figures, goals, supporters, days left | `src/content/site.ts` → `campaigns` | All six records are samples |
| Fund allocation (92 / 6 / 2) | `src/content/site.ts` → `financials` | Take from your audited statement |
| Stories | `src/content/site.ts` → `stories` | Written to demonstrate the design |
| Transparency documents | `src/app/transparency/page.tsx` → `documents` | Currently "Not yet uploaded" |

Two forms validate and respond but **transmit nothing**:

- `DonatePanel` / `DonateScreen` — no payment gateway is connected. Wire a
  hosted provider before accepting real donations. Never collect card details
  outside a hosted gateway.
- `ContactForm` — connect a mail service or a route handler to receive messages.

Facts taken from the supplied brand presentation and left intact: the
organisation's description, city, the six programme categories, the brand
quotes, and the colour and logo system.

---

## Brand

From the official identity, unchanged:

| Token | Value |
|---|---|
| Deep Navy | `#0E2A43` (deep `#091D2F`) |
| Foundation Gold | `#D6AA29` |
| Warm Ivory | `#F9F5E9` |
| Paper | `#FFFFFF` |

Typography — display is **Cormorant Garamond**, body and UI are **Inter**, the
typeface named in the brand presentation. Both are self-hosted via `next/font`.

Assets in `public/`:

- `brand/` — the official wordmark and icon, in gold, navy, white and black.
- `patterns/` — the eight brand pattern tiles, 1000×1000, generated in gold and
  navy tints plus a `currentColor` master used for `mask-image`. Regenerate the
  tints from the source SVGs rather than editing them by hand.
- `src/lib/pattern-paths.ts` is generated from `Pattern Amanah-03.svg` and drives
  the inline SVG stroke-draw animation. Regenerate it from the source asset.

The patterns are used as architecture — embossed texture at 3–5%, masks,
section borders, large cropped compositions and drawn line-work. Never as
wallpaper.

---

## Structure

```
src/
  app/                    routes — /, about, how-it-works, campaigns[/slug],
                          stories[/slug], transparency, get-involved,
                          contact, donate, 404
  content/site.ts         all copy, campaigns, stories and figures
  components/
    motion/primitives     Reveal, Stagger, MaskedLines, MaskedWords,
                          ClipReveal, DrawRule — the shared motion vocabulary
    ui/                   Button, Kit (SectionHead, ParallaxImage, Counter,
                          Progress, Section…), Pattern
    layout/               Nav, Footer, PageHero
    sections/             the homepage and page-level compositions
  lib/
    motion-mode.ts        the single seam for the reduced-motion policy
    format.ts             currency formatting, shared server/client
```

---

## Motion

One rhythm throughout: 400–1000 ms on `cubic-bezier(0.16, 1, 0.3, 1)`, animating
only `transform`, `opacity` and `clip-path`. Smooth scrolling (Lenis) is enabled
on fine pointers only — coarse pointers keep native momentum scrolling.

**Reduced motion** is honoured end to end. Every component takes
`useReducedMotion` from `src/lib/motion-mode.ts`; under `prefers-reduced-motion:
reduce` the entrances, parallax, counters, marquee and the sticky horizontal
story rail all collapse to a plain static render — the rail becomes a four-up
grid rather than a scroll hijack.

Entrance animations render their "before" state into the HTML, so a
`<noscript>` stylesheet in `src/app/layout.tsx` reveals everything when
scripting is off. Decorative pattern layers are `aria-hidden` and excluded from
that override so they keep their low opacity.

### A note on `globals.css`

Tailwind v4 emits its output inside cascade layers. Hand-written CSS left
**unlayered beats every utility**, regardless of specificity — which silently
overrode border colours and type sizes across the site until it was fixed. Base
element styles live in `@layer base` and the named design classes (`.t-*`,
`.shell`, `.link-gold`) in `@layer components`, so utilities stay the final
word. Keep new rules inside a layer.

---

## Accessibility

- Semantic landmarks, one `<h1>` per route, skip link, labelled form fields with
  `role="alert"` errors, `aria-pressed` on the filter and amount toggles, and an
  `aria-live` count on the campaign index.
- All body and label colours meet WCAG AA (4.5:1) against their actual surfaces.
- Focus is a gold hairline ring, never removed.
- Hover is never the only route to content — the areas-of-work index shows its
  photographs inline below `lg`.

## Photography

Documentary photographs in South Asian contexts, sourced from Unsplash under the
Unsplash License. The hero and the large emotional band are art-directed: a
`<picture>` element serves a portrait crop below 768px rather than cropping a
letterbox frame down to a sliver.
