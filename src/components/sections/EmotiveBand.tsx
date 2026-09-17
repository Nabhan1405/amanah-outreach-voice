"use client";

/**
 * The large emotional visual.
 * A full-bleed pinned frame: the photograph scales slowly behind a
 * masked serif statement, with the brand keywords passing once,
 * slowly, beneath it.
 */

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { useRef } from "react";
import { brandQuotes, marqueeWords } from "@/content/site";
import { MaskedLines } from "@/components/motion/primitives";
import { PatternMask } from "@/components/ui/Pattern";

export default function EmotiveBand() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.22, 1.02]);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      id="quote"
      className="on-navy relative flex min-h-[86svh] items-center overflow-hidden bg-[var(--color-navy)] py-28 text-[var(--color-ivory)] md:min-h-[100svh]"
    >
      {/* ---- Plate ---- */}
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { scale, y }}
      >
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/images/emotive-band-portrait.jpg"
            width={1100}
            height={1500}
          />
          <img
            src="/images/emotive-band.jpg"
            alt="Children walking together down a narrow, brightly painted street."
            width={2400}
            height={1200}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center [filter:saturate(0.78)_contrast(1.06)_brightness(0.92)]"
          />
        </picture>
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 bg-[var(--color-navy-deep)] opacity-[0.58] mix-blend-multiply"
      />
      {/* A directional floor so the statement always has contrast beneath it,
          heaviest at the left where the type sits. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[rgba(9,29,47,0.88)] via-[rgba(9,29,47,0.5)] to-[rgba(9,29,47,0.25)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[rgba(9,29,47,0.45)] via-transparent to-[rgba(9,29,47,0.8)]"
      />

      {/* The brand pattern as embossed light — a faint gold relief, not a wash. */}
      <PatternMask
        tile="04"
        size={460}
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
      >
        <div className="h-full w-full bg-[var(--color-gold-light)]" />
      </PatternMask>

      <div className="shell-wide relative w-full">
        <div className="max-w-[24ch]">
          <MaskedLines
            lines={[
              "A better world",
              "begins with a heart",
              "willing to help.",
            ]}
            as="blockquote"
            className="t-display text-[var(--color-ivory)]"
            step={0.13}
            duration={1.2}
          />
          <motion.p
            className="t-label mt-10 text-[rgba(249,245,233,0.58)]"
            initial={reduced ? undefined : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            — {brandQuotes[1]}
          </motion.p>
        </div>
      </div>

      {/* ---- Keyword marquee, used once on the page ---- */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-[rgba(249,245,233,0.14)] py-5 backdrop-blur-[2px]"
      >
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {marqueeWords.map((w) => (
                <span key={`${dup}-${w}`} className="flex items-center">
                  <span className="font-display px-7 text-[1.4rem] font-light tracking-tight text-[rgba(249,245,233,0.58)] md:px-10 md:text-[1.9rem]">
                    {w}
                  </span>
                  <span className="block h-1 w-1 rotate-45 bg-[var(--color-gold)]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
