"use client";

/**
 * Selected stories.
 * A horizontally-scrolling rail on desktop, driven by vertical scroll
 * through a sticky viewport. Below `lg` it becomes an honest swipe
 * rail with snap points, which is better on a phone than a hijack.
 */

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { useRef } from "react";
import { stories } from "@/content/site";
import { Eyebrow } from "@/components/ui/Kit";
import { ArrowGlyph } from "@/components/ui/Button";
import { MaskedLines } from "@/components/motion/primitives";

export default function Stories() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Four panels: travel three panel-widths across the sticky frame.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-64%"]);

  return (
    <section id="stories" className="relative bg-[var(--color-ivory)]">
      {/* ---- Heading ---- */}
      <div className="shell-wide pt-24 pb-14 md:pt-36 md:pb-16">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <MaskedLines
              lines={["Stories from", "the register."]}
              as="h2"
              className="t-h2 mt-6 text-[var(--color-navy)]"
            />
          </div>
          <Link
            href="/stories"
            className="link-gold t-label group w-fit text-[var(--color-navy)]"
          >
            All stories
            <ArrowGlyph className="ml-2 inline-block" />
          </Link>
        </div>
      </div>

      {/* ---- Desktop: sticky horizontal rail ---- */}
      {!reduced && (
        <div ref={ref} className="relative hidden h-[300vh] lg:block">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <motion.div className="flex gap-8 pl-[max(var(--gutter),calc((100vw-1760px)/2+var(--gutter)))]" style={{ x }}>
              {stories.map((s, i) => (
                <StoryPanel key={s.slug} story={s} index={i} />
              ))}
              {/* Tail card so the last story clears the viewport. */}
              <div className="flex w-[42vw] shrink-0 items-center">
                <div>
                  <p className="t-h3 font-display max-w-[20ch] text-[var(--color-navy)]">
                    Every case on this list began with a visit.
                  </p>
                  <Link
                    href="/how-it-works"
                    className="link-gold t-label group mt-7 inline-block text-[var(--color-navy)]"
                  >
                    How we verify
                    <ArrowGlyph className="ml-2 inline-block" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* ---- Reduced motion: a plain four-up grid, no hijack, no rail ---- */}
      {reduced && (
        <div className="shell-wide hidden pb-24 lg:block">
          <ul className="grid grid-cols-4 gap-8">
            {stories.map((s, i) => (
              <li key={s.slug}>
                <StoryPanel story={s} index={i} compact />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ---- Small screens: an honest swipe rail.
             `scroll-pl` keeps the first card off the gutter — without it the
             snap target pulls the rail flush to the viewport edge. ---- */}
      <div
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-24 [scroll-padding-left:var(--gutter)] lg:hidden"
      >
        {stories.map((s, i) => (
          <div key={s.slug} className="w-[78vw] max-w-[380px] shrink-0 snap-start">
            <StoryPanel story={s} index={i} compact />
          </div>
        ))}
      </div>
    </section>
  );
}

function StoryPanel({
  story: s,
  index,
  compact = false,
}: {
  story: (typeof stories)[number];
  index: number;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/stories/${s.slug}`}
      className={`group block shrink-0 ${compact ? "w-full" : "w-[34vw] max-w-[460px]"}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-navy)]">
        <Image
          src={s.image}
          alt={s.imageAlt}
          fill
          sizes={compact ? "78vw" : "34vw"}
          loading={index < 2 ? undefined : "lazy"}
          className="img-warm object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-amanah)] group-hover:scale-[1.045]"
        />
        {/* A gold rule that wipes across the foot of the frame. */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 block h-[2px] origin-left scale-x-0 bg-[var(--color-gold)] transition-transform duration-[900ms] [transition-timing-function:var(--ease-amanah)] group-hover:scale-x-100"
        />
      </div>

      <div className="pt-6">
        <p className="t-label text-[rgba(14,42,67,0.7)]">{s.kicker}</p>
        <h3 className="t-h3 mt-3.5 text-[var(--color-navy)]">{s.title}</h3>
        <p className="t-body mt-3 max-w-[38ch] text-[rgba(14,42,67,0.7)]">
          {s.excerpt}
        </p>
        <p className="t-label mt-5 flex items-center gap-2 text-[var(--color-gold-deep)]">
          Read
          <ArrowGlyph />
        </p>
      </div>
    </Link>
  );
}
