"use client";

/**
 * Areas of work.
 * An index rather than a card grid: six ruled rows, each revealing
 * its photograph as the pointer moves down the list. On touch the
 * image is shown inline instead, so nothing depends on hover.
 */

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { useState } from "react";
import { areas } from "@/content/site";
import { Eyebrow } from "@/components/ui/Kit";
import { ArrowGlyph } from "@/components/ui/Button";
import { MaskedLines, EASE, VIEWPORT } from "@/components/motion/primitives";
import { PatternCrop } from "@/components/ui/Pattern";

export default function AreasOfWork() {
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion();

  return (
    <section
      id="areas"
      className="relative overflow-hidden bg-[var(--color-paper)] py-24 md:py-36"
    >
      <PatternCrop
        tile="06"
        tint="navy"
        opacity={0.045}
        className="-top-[20%] -right-[18%] h-[90%] w-[55%] md:w-[38%]"
      />

      <div className="shell-wide relative">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Areas of work</Eyebrow>
            <MaskedLines
              lines={["Six kinds", "of need."]}
              as="h2"
              className="t-h2 mt-6 text-[var(--color-navy)]"
            />
          </div>
          <motion.p
            className="t-lead measure self-end lg:col-span-5 lg:col-start-8"
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            <span className="text-[rgba(14,42,67,0.72)]">
              The categories are broad because need is. What they share is the
              same process — a visit, a file, a committee, a direct payment.
            </span>
          </motion.p>
        </div>

        {/* ---- Index ---- */}
        <div
          className="relative mt-16 border-t border-[rgba(14,42,67,0.18)]"
          onMouseLeave={() => setActive(null)}
        >
          {/* Floating preview, desktop only. */}
          {!reduced && (
            <div className="pointer-events-none absolute top-0 right-0 hidden h-full w-[38%] lg:block">
              <div className="sticky top-1/3 h-[330px] w-full">
                <AnimatePresence mode="wait">
                  {active !== null && (
                    <motion.div
                      key={active}
                      className="relative h-full w-full overflow-hidden"
                      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                      exit={{ opacity: 0, transition: { duration: 0.35 } }}
                      transition={{ duration: 0.75, ease: EASE }}
                    >
                      <Image
                        src={areas[active].image}
                        alt=""
                        fill
                        sizes="38vw"
                        className="object-cover"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-[var(--color-navy)] opacity-15"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          <ul className="relative lg:pr-[42%]">
            {areas.map((a, i) => (
              <motion.li
                key={a.slug}
                className="border-b border-[rgba(14,42,67,0.18)]"
                initial={reduced ? undefined : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.8, delay: i * 0.06, ease: EASE }}
                onMouseEnter={() => setActive(i)}
              >
                <Link
                  href={`/campaigns?area=${a.slug}`}
                  className="group relative block py-8 md:py-10"
                  onFocus={() => setActive(i)}
                >
                  {/* Gold wipe on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-[-1px] block h-px origin-left scale-x-0 bg-[var(--color-gold)] transition-transform duration-[900ms] [transition-timing-function:var(--ease-amanah)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />

                  <div className="grid grid-cols-[2.25rem_1fr] items-baseline gap-4 md:grid-cols-[4rem_1fr_auto] md:gap-8">
                    <span className="t-label t-num text-[rgba(14,42,67,0.7)] transition-colors duration-500 group-hover:text-[var(--color-gold-deep)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0">
                      <h3 className="t-h3 text-[var(--color-navy)] transition-transform duration-[800ms] [transition-timing-function:var(--ease-amanah)] group-hover:translate-x-1.5 md:group-hover:translate-x-2.5">
                        {a.title}
                      </h3>
                      <p className="t-body measure mt-2.5 text-[rgba(14,42,67,0.7)]">
                        {a.summary}
                      </p>

                      {/* Touch/small-screen image, since hover cannot be relied on. */}
                      <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden lg:hidden">
                        <Image
                          src={a.image}
                          alt={a.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 0px"
                          loading="lazy"
                          className="img-warm object-cover"
                        />
                      </div>
                    </div>

                    <span className="col-start-2 mt-5 text-[var(--color-navy)] transition-transform duration-[800ms] [transition-timing-function:var(--ease-amanah)] group-hover:translate-x-1.5 md:col-start-3 md:mt-0 md:self-center">
                      <ArrowGlyph className="h-3 text-[var(--color-gold-deep)]" />
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
