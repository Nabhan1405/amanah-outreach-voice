"use client";

/**
 * Transparency and trust.
 * A split module: an allocation bar that draws itself, against four
 * ruled commitments. Deliberately plain — trust is communicated by
 * restraint, not by badges.
 */

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { financials, trustPoints } from "@/content/site";
import { Counter, Eyebrow, PlaceholderNote } from "@/components/ui/Kit";
import { Button, ArrowGlyph } from "@/components/ui/Button";
import {
  MaskedLines,
  Stagger,
  StaggerItem,
  EASE,
  VIEWPORT,
} from "@/components/motion/primitives";
import { PatternField } from "@/components/ui/Pattern";

export default function Transparency() {
  const reduced = useReducedMotion();

  return (
    <section
      id="transparency"
      className="relative overflow-hidden bg-[var(--color-ivory-deep)] py-24 md:py-36"
    >
      <PatternField tile="01" tint="navy" opacity={0.028} size={760} drift={45} />

      <div className="shell-wide relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---- Allocation ---- */}
          <div className="lg:col-span-6">
            <Eyebrow>Transparency</Eyebrow>
            <MaskedLines
              lines={["Where the money", "actually goes."]}
              as="h2"
              className="t-h2 mt-6 text-[var(--color-navy)]"
            />

            <div className="mt-12 space-y-8">
              {financials.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={reduced ? undefined : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
                >
                  <div className="flex items-baseline justify-between gap-6">
                    <p className="t-label text-[var(--color-navy)]">{f.label}</p>
                    <p className="font-display text-[1.6rem] leading-none font-light text-[var(--color-navy)] md:text-[2rem]">
                      <Counter value={f.value} suffix="%" duration={1600} />
                    </p>
                  </div>
                  <div className="mt-3.5 h-[3px] w-full bg-[rgba(14,42,67,0.14)]">
                    <motion.div
                      className={`h-full ${
                        i === 0
                          ? "bg-[var(--color-gold)]"
                          : "bg-[rgba(14,42,67,0.45)]"
                      }`}
                      initial={reduced ? { width: `${f.value}%` } : { width: 0 }}
                      whileInView={{ width: `${f.value}%` }}
                      viewport={{ once: true, margin: "-15% 0px" }}
                      transition={{
                        duration: 1.5,
                        delay: 0.25 + i * 0.12,
                        ease: EASE,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <PlaceholderNote className="mt-10">
              Allocation shown is sample data. Replace with the figures from your
              audited annual statement.
            </PlaceholderNote>

            <div className="mt-10">
              <Button href="/transparency" variant="primary">
                Read our accounts
                <ArrowGlyph />
              </Button>
            </div>
          </div>

          {/* ---- Commitments ---- */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Stagger className="border-t border-[rgba(14,42,67,0.2)]" step={0.1}>
              {trustPoints.map((t) => (
                <StaggerItem key={t.title}>
                  <div className="group border-b border-[rgba(14,42,67,0.2)] py-8 transition-colors duration-700 hover:border-[var(--color-gold)]">
                    <h3 className="t-h3 flex items-baseline gap-3 text-[var(--color-navy)]">
                      <span
                        aria-hidden
                        className="block h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--color-gold)] transition-transform duration-[700ms] [transition-timing-function:var(--ease-amanah)] group-hover:rotate-[135deg]"
                      />
                      {t.title}
                    </h3>
                    <p className="t-body mt-3 pl-[1.4rem] text-[rgba(14,42,67,0.7)]">
                      {t.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
