"use client";

/**
 * The Amanah philosophy.
 * A sticky editorial column against a tall portrait plate, with the
 * meaning of the word itself given as an oversized serif statement.
 */

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { Eyebrow, ParallaxImage } from "@/components/ui/Kit";
import {
  MaskedLines,
  MaskedWords,
  DrawRule,
  EASE,
  VIEWPORT,
  Stagger,
  StaggerItem,
} from "@/components/motion/primitives";
import { PatternCrop } from "@/components/ui/Pattern";

const principles = [
  {
    n: "I",
    title: "Held, not handled",
    body: "A gift is a trust. It is accounted for from the moment it arrives to the moment it reaches the person it was meant for.",
  },
  {
    n: "II",
    title: "The person, not the case",
    body: "Nobody on our register is a photograph or a file number. Support is arranged around a household, in conversation with it.",
  },
  {
    n: "III",
    title: "Long enough to matter",
    body: "We would rather commit to forty families for a year than four hundred for a fortnight. Permanence is the point.",
  },
];

export default function Philosophy() {
  const reduced = useReducedMotion();

  return (
    <section
      id="philosophy"
      className="on-navy relative overflow-hidden bg-[var(--color-navy)] py-24 text-[var(--color-ivory)] md:py-36"
    >
      {/* A large cropped geometric composition off the left edge. */}
      <PatternCrop
        tile="02"
        tint="gold"
        opacity={0.07}
        className="-top-[10%] -left-[22%] h-[130%] w-[62%] md:-left-[14%] md:w-[46%]"
      />

      <div className="shell-wide relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---- Sticky portrait ---- */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <ParallaxImage
                src="/images/mission-portrait.jpg"
                alt="A girl walking her bicycle past a blue-painted village wall."
                className="aspect-[4/5] w-full"
                sizes="(max-width: 1024px) 100vw, 40vw"
                travel={8}
              />
              <motion.p
                className="t-small mt-5 max-w-[34ch] text-[rgba(249,245,233,0.58)]"
                initial={reduced ? undefined : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Coastal Karnataka. Most of the households we work with are within
                an hour of our office.
              </motion.p>
            </div>
          </div>

          {/* ---- Text column ---- */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow invert>The word itself</Eyebrow>

            <MaskedLines
              lines={["أَمَانَة"]}
              as="p"
              className="mt-8 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-[var(--color-gold)]"
            />

            <MaskedWords
              text="Amanah is the Arabic word for something entrusted to your care — a thing you hold for another, and are answerable for returning intact."
              className="t-statement mt-8 text-[var(--color-ivory)]"
            />

            <DrawRule
              className="mt-12"
              color="bg-[rgba(249,245,233,0.22)]"
            />

            <motion.p
              className="t-lead measure-wide mt-12 text-[rgba(249,245,233,0.74)]"
              initial={reduced ? undefined : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.95, delay: 0.15, ease: EASE }}
            >
              It is an unusually demanding word to take as a name. It commits us
              to a standard of care before it commits us to a cause — and it is
              the reason our work is organised around verification, direct
              payment and follow-up rather than appeal and volume.
            </motion.p>

            {/* Principles */}
            <Stagger className="mt-16 space-y-px" step={0.1}>
              {principles.map((p) => (
                <StaggerItem key={p.n}>
                  <div className="group grid grid-cols-[2.5rem_1fr] gap-5 border-t border-[rgba(249,245,233,0.16)] py-7 transition-colors duration-700 hover:border-[var(--color-gold)] md:grid-cols-[4rem_1fr] md:gap-8">
                    <span className="font-display text-[1.05rem] text-[var(--color-gold)] transition-transform duration-[700ms] [transition-timing-function:var(--ease-amanah)] group-hover:translate-x-1">
                      {p.n}
                    </span>
                    <div>
                      <h3 className="t-h3 text-[var(--color-ivory)]">{p.title}</h3>
                      <p className="t-body measure mt-3 text-[rgba(249,245,233,0.66)]">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
              <span className="block border-t border-[rgba(249,245,233,0.16)]" />
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
