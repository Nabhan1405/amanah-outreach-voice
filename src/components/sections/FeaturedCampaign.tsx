"use client";

/**
 * The current campaign.
 * A split, asymmetric module: image bleeding off the left edge, a
 * bordered institutional panel on the right carrying the figures.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { featuredCampaign as c } from "@/content/site";
import {
  Eyebrow,
  ParallaxImage,
  Progress,
  VerifiedMark,
  PlaceholderNote,
  } from "@/components/ui/Kit";
import { formatINR } from "@/lib/format";
import { Button, ArrowGlyph } from "@/components/ui/Button";
import { MaskedLines, EASE, VIEWPORT } from "@/components/motion/primitives";
import { PatternField } from "@/components/ui/Pattern";

export default function FeaturedCampaign() {
  const reduced = useReducedMotion();

  return (
    <section
      id="featured"
      className="relative overflow-hidden bg-[var(--color-paper)] py-20 md:py-28"
    >
      <PatternField tile="07" tint="navy" opacity={0.035} size={680} drift={50} />

      <div className="shell-wide relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* ---- Image ---- */}
          <div className="lg:col-span-6">
            <div className="relative">
              <ParallaxImage
                src={c.image}
                alt={c.imageAlt}
                className="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                travel={9}
              />
              {/* Gold hairline frame, offset — architectural, not a shadow. */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -right-3 -bottom-3 hidden h-full w-full border border-[var(--color-gold)] md:block"
                initial={reduced ? undefined : { opacity: 0, x: -12, y: -12 }}
                whileInView={{ opacity: 0.55, x: 0, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
              />
            </div>
          </div>

          {/* ---- Panel ---- */}
          <div className="lg:col-span-6 lg:pl-6">
            <Eyebrow>Current campaign</Eyebrow>

            <MaskedLines
              lines={[c.title]}
              as="h2"
              className="t-h2 mt-6 text-[var(--color-navy)]"
            />

            <motion.p
              className="t-lead measure mt-6 text-[rgba(14,42,67,0.72)]"
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            >
              {c.summary}
            </motion.p>

            {/* Figures panel */}
            <motion.div
              className="mt-10 border border-[rgba(14,42,67,0.16)] bg-[var(--color-ivory)]"
              initial={reduced ? undefined : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            >
              <div className="px-6 pt-6 pb-5 md:px-8 md:pt-8">
                <Progress raised={c.raised} goal={c.goal} />
              </div>

              <dl className="grid grid-cols-3 border-t border-[rgba(14,42,67,0.14)]">
                {[
                  { k: "Supporters", v: c.supporters.toLocaleString("en-IN") },
                  { k: "Days left", v: String(c.daysLeft) },
                  { k: "Still needed", v: formatINR(c.goal - c.raised) },
                ].map((row, i) => (
                  <div
                    key={row.k}
                    className={`px-5 py-5 md:px-8 md:py-6 ${
                      i > 0 ? "border-l border-[rgba(14,42,67,0.14)]" : ""
                    }`}
                  >
                    <dt className="t-label text-[rgba(14,42,67,0.7)]">{row.k}</dt>
                    <dd className="t-num mt-2.5 font-display text-[1.35rem] leading-none text-[var(--color-navy)] md:text-[1.6rem]">
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap items-center gap-4 border-t border-[rgba(14,42,67,0.14)] px-6 py-6 md:px-8">
                <Button href={`/campaigns/${c.slug}`} variant="primary">
                  Support this campaign
                  <ArrowGlyph />
                </Button>
                <VerifiedMark />
              </div>
            </motion.div>

            <div className="mt-7 flex flex-col gap-4">
              <PlaceholderNote>
                Campaign figures shown here are sample data.
              </PlaceholderNote>
              <Link
                href="/campaigns"
                className="link-gold t-label group w-fit text-[var(--color-navy)]"
              >
                All campaigns
                <ArrowGlyph className="ml-2 inline-block" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
