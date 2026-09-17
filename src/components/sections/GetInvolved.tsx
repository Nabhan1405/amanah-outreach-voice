"use client";

/**
 * Get involved / recurring support.
 * Three ruled columns plus a recurring-gift module. The amount
 * selector is institutional rather than ecommerce: hairline boxes,
 * no baskets, no urgency.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { useState } from "react";
import { givingTiers, involvement } from "@/content/site";
import { Eyebrow, ParallaxImage, PlaceholderNote, } from "@/components/ui/Kit";
import { formatINR } from "@/lib/format";
import { Button, ArrowGlyph } from "@/components/ui/Button";
import {
  MaskedLines,
  Stagger,
  StaggerItem,
  EASE,
  VIEWPORT,
} from "@/components/motion/primitives";

export default function GetInvolved() {
  const [tier, setTier] = useState(1);
  const reduced = useReducedMotion();
  const selected = givingTiers[tier];

  return (
    <section
      id="get-involved"
      className="relative overflow-hidden bg-[var(--color-paper)] py-24 md:py-36"
    >
      <div className="shell-wide relative">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>Get involved</Eyebrow>
            <MaskedLines
              lines={["Three ways", "to be useful."]}
              as="h2"
              className="t-h2 mt-6 text-[var(--color-navy)]"
            />
          </div>
        </div>

        {/* ---- Three routes ---- */}
        <Stagger
          className="mt-16 grid gap-px border-t border-[rgba(14,42,67,0.2)] md:grid-cols-3"
          step={0.1}
        >
          {involvement.map((item, i) => (
            <StaggerItem key={item.title}>
              <div
                className={`group flex h-full flex-col justify-between border-b border-[rgba(14,42,67,0.2)] py-9 md:py-10 ${
                  i > 0
                    ? "md:border-l md:border-l-[rgba(14,42,67,0.2)] md:pl-8"
                    : ""
                } ${i < 2 ? "md:pr-8" : ""}`}
              >
                <div>
                  <span
                    aria-hidden
                    className="mb-6 block h-px w-10 origin-left bg-[var(--color-gold)] transition-transform duration-[800ms] [transition-timing-function:var(--ease-amanah)] group-hover:scale-x-[2.4]"
                  />
                  <h3 className="t-h3 text-[var(--color-navy)]">{item.title}</h3>
                  <p className="t-body mt-4 text-[rgba(14,42,67,0.7)]">
                    {item.body}
                  </p>
                </div>
                <Link
                  href={item.cta.href}
                  className="link-gold t-label group/link mt-8 w-fit text-[var(--color-navy)]"
                >
                  {item.cta.label}
                  <ArrowGlyph className="ml-2 inline-block" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* ---- Recurring support module ---- */}
        <div className="mt-20 grid gap-0 border border-[rgba(14,42,67,0.18)] lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ParallaxImage
              src="/images/portrait-girl.jpg"
              alt="A young girl held in her father's arms, looking towards the camera."
              className="h-full min-h-[320px] w-full"
              sizes="(max-width: 1024px) 100vw, 40vw"
              travel={7}
            />
          </div>

          <div className="p-7 md:p-12 lg:col-span-7">
            <Eyebrow>Monthly giving</Eyebrow>
            <motion.h3
              className="t-h3 mt-6 max-w-[26ch] text-[var(--color-navy)]"
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.85, ease: EASE }}
            >
              A standing gift is what lets us promise a family a year rather than
              a month.
            </motion.h3>

            {/* Amount selector */}
            <fieldset className="mt-9">
              <legend className="t-label text-[rgba(14,42,67,0.7)]">
                Choose a monthly amount
              </legend>
              <div className="mt-5 grid gap-px sm:grid-cols-3">
                {givingTiers.map((t, i) => {
                  const active = i === tier;
                  return (
                    <button
                      key={t.amount}
                      type="button"
                      onClick={() => setTier(i)}
                      aria-pressed={active}
                      className={[
                        "relative border px-5 py-6 text-left transition-colors duration-500",
                        "[transition-timing-function:var(--ease-amanah)]",
                        active
                          ? "border-[var(--color-gold)] bg-[rgba(214,170,41,0.08)]"
                          : "border-[rgba(14,42,67,0.18)] hover:border-[rgba(14,42,67,0.4)]",
                      ].join(" ")}
                    >
                      <span className="t-num font-display block text-[1.6rem] leading-none font-light text-[var(--color-navy)]">
                        {formatINR(t.amount)}
                      </span>
                      <span className="t-small mt-2.5 block text-[rgba(14,42,67,0.7)]">
                        {t.title}
                      </span>
                      {active && (
                        <motion.span
                          layoutId="tier-mark"
                          aria-hidden
                          className="absolute top-3 right-3 block h-1.5 w-1.5 rotate-45 bg-[var(--color-gold)]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <motion.p
              key={selected.amount}
              className="t-body mt-7 max-w-[46ch] text-[rgba(14,42,67,0.7)]"
              initial={reduced ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              {selected.body}
            </motion.p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                href={`/donate?amount=${selected.amount}&frequency=monthly`}
                variant="primary"
                size="lg"
              >
                Give {formatINR(selected.amount)} monthly
                <ArrowGlyph />
              </Button>
              <Button href="/donate" variant="secondary" size="lg">
                Give once
              </Button>
            </div>

            <PlaceholderNote className="mt-8">
              No payment gateway is connected yet. Amounts and tiers are editable
              sample values.
            </PlaceholderNote>
          </div>
        </div>
      </div>
    </section>
  );
}
