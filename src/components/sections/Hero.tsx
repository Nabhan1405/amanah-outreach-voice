"use client";

/**
 * Homepage hero.
 * A full-bleed documentary frame under a slow cinematic push-in, a
 * drawn brand lattice, and a headline that rises line by line out of
 * its own mask. The whole composition lifts and dims as the reader
 * scrolls past it.
 */

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { useRef } from "react";
import { org } from "@/content/site";
import { Button, ArrowGlyph } from "@/components/ui/Button";
import { EASE } from "@/components/motion/primitives";
import { PatternDraw } from "@/components/ui/Pattern";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-32%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0]);
  const veil = useTransform(scrollYProgress, [0, 1], [0.4, 0.72]);

  const headline = ["Be the reason", "someone smiles."];

  return (
    <section
      ref={ref}
      className="on-navy relative flex h-[100svh] min-h-[620px] w-full items-end overflow-hidden bg-[var(--color-navy)]"
    >
      {/* ---- Cinematic plate ---- */}
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y: imageY, scale: imageScale }}
      >
        <motion.div
          className="relative h-full w-full"
          initial={reduced ? undefined : { scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: EASE }}
        >
          {/*
            Art-directed rather than merely responsive: a phone gets a
            portrait crop composed for it, not a letterbox frame cropped
            down to a sliver. `<picture>` so only one file is ever fetched.
          */}
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="/images/hero-coast-portrait.jpg"
              width={1100}
              height={1650}
            />
            <img
              src="/images/hero-coast.jpg"
              alt="A woman standing on the rocks at the coast, looking out to sea at first light."
              width={2400}
              height={1350}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[56%_center]"
            />
          </picture>
        </motion.div>
      </motion.div>

      {/* ---- Veils: navy grade + a floor gradient for legibility ---- */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[var(--color-navy)] mix-blend-multiply"
        style={{ opacity: reduced ? 0.48 : veil }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[rgba(9,29,47,0.92)] via-[rgba(9,29,47,0.3)] to-[rgba(9,29,47,0.45)]"
      />

      {/* ---- Drawn brand lattice, upper right ---- */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[6%] -right-[14%] hidden h-[62vh] w-[62vh] md:block"
      >
        <PatternDraw
          className="h-full w-full"
          stroke="var(--color-gold)"
          opacity={0.26}
          strokeWidth={0.9}
          duration={3.2}
        />
      </div>

      {/* ---- Content ---- */}
      <motion.div
        className="shell-wide relative w-full pb-16 md:pb-24"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            {/* Eyebrow */}
            <motion.p
              className="t-label flex items-center gap-3 text-[rgba(249,245,233,0.7)]"
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            >
              <span aria-hidden className="block h-px w-10 bg-[var(--color-gold)]" />
              {org.city}, {org.state}
            </motion.p>

            {/* Headline — masked line reveal */}
            <h1 className="t-display mt-6 text-[var(--color-ivory)] md:mt-8">
              {headline.map((line, i) => (
                <span
                  key={i}
                  className="block overflow-hidden"
                  style={{ paddingBottom: "0.07em", marginBottom: "-0.07em" }}
                >
                  <motion.span
                    className="block"
                    initial={reduced ? undefined : { y: "108%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 1.25,
                      delay: 0.85 + i * 0.13,
                      ease: EASE,
                    }}
                  >
                    {/* The second line carries the gold emphasis. */}
                    {i === 1 ? (
                      <>
                        someone{" "}
                        <em className="font-display text-[var(--color-gold)] not-italic">
                          smiles.
                        </em>
                      </>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pb-3">
            <motion.p
              className="t-body max-w-[42ch] text-[rgba(249,245,233,0.78)]"
              initial={reduced ? undefined : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.35, ease: EASE }}
            >
              {org.description}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4"
              initial={reduced ? undefined : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5, ease: EASE }}
            >
              <Button href="/campaigns" variant="onNavy" size="lg">
                See campaigns
                <ArrowGlyph />
              </Button>
              <Button href="/donate" variant="onNavy" size="lg">
                Donate
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ---- Scroll cue ---- */}
      <motion.div
        aria-hidden
        className="absolute right-[var(--gutter)] bottom-8 hidden flex-col items-center gap-3 md:flex"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        style={reduced ? undefined : { opacity: contentOpacity }}
      >
        <span className="t-label text-[rgba(249,245,233,0.58)]">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-[rgba(249,245,233,0.22)]">
          <motion.span
            className="absolute inset-x-0 top-0 block h-1/2 bg-[var(--color-gold)]"
            animate={reduced ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
