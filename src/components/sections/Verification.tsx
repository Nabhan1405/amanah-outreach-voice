"use client";

/**
 * How Amanah verifies and supports a case.
 * A sticky two-column narrative: the heading holds while the six
 * steps pass it. The drawn brand lattice strokes itself on behind.
 */

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { verificationSteps } from "@/content/site";
import { Eyebrow } from "@/components/ui/Kit";
import { Button, ArrowGlyph } from "@/components/ui/Button";
import { MaskedLines, EASE, VIEWPORT } from "@/components/motion/primitives";
import { PatternDraw } from "@/components/ui/Pattern";

export default function Verification() {
  const reduced = useReducedMotion();

  return (
    <section
      id="verification"
      className="on-navy relative overflow-hidden bg-[var(--color-navy-deep)] py-24 text-[var(--color-ivory)] md:py-36"
    >
      {/* Drawn lattice, bleeding off the right. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] bottom-[-10%] hidden h-[80vh] w-[80vh] md:block"
      >
        <PatternDraw
          className="h-full w-full"
          stroke="var(--color-gold)"
          opacity={0.2}
          strokeWidth={0.9}
          duration={3}
        />
      </div>

      <div className="shell-wide relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---- Sticky heading ---- */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Eyebrow invert>How it works</Eyebrow>
              <MaskedLines
                lines={["Nothing is listed", "on the strength", "of a photograph."]}
                as="h2"
                className="t-h2 mt-6 text-[var(--color-ivory)]"
              />
              <motion.p
                className="t-lead measure mt-8 text-[rgba(249,245,233,0.7)]"
                initial={reduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
              >
                Every case follows the same six steps in the same order,
                regardless of how urgent it appeared when it reached us. Urgency
                changes the pace, never the process.
              </motion.p>
              <div className="mt-10">
                <Button href="/how-it-works" variant="onNavy">
                  Read the full process
                  <ArrowGlyph />
                </Button>
              </div>
            </div>
          </div>

          {/* ---- Steps ---- */}
          <ol className="lg:col-span-6 lg:col-start-7">
            {verificationSteps.map((s, i) => (
              <motion.li
                key={s.n}
                className="group relative border-t border-[rgba(249,245,233,0.16)] py-8 last:border-b md:py-10"
                initial={reduced ? undefined : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.85, delay: (i % 3) * 0.08, ease: EASE }}
              >
                {/* The rule turns gold as each step arrives. */}
                <motion.span
                  aria-hidden
                  className="absolute inset-x-0 top-[-1px] block h-px origin-left bg-[var(--color-gold)]"
                  initial={reduced ? undefined : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-25% 0px" }}
                  transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
                />
                <div className="grid grid-cols-[2.75rem_1fr] gap-5 md:grid-cols-[4.5rem_1fr] md:gap-8">
                  <span className="t-num font-display text-[1.5rem] leading-none text-[var(--color-gold)] md:text-[1.9rem]">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="t-h3 text-[var(--color-ivory)]">{s.title}</h3>
                    <p className="t-body measure mt-3 text-[rgba(249,245,233,0.66)]">
                      {s.body}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
