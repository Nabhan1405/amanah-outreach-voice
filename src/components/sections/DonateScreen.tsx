"use client";

/**
 * Donation screen.
 * Reads `?amount=` and `?frequency=` so that the giving tiers
 * elsewhere on the site can hand off a pre-filled choice.
 */

import { useSearchParams } from "next/navigation";
import DonatePanel from "./DonatePanel";
import { Section, Eyebrow, ParallaxImage } from "@/components/ui/Kit";
import { MaskedLines, Reveal } from "@/components/motion/primitives";
import { PatternField } from "@/components/ui/Pattern";
import { trustPoints } from "@/content/site";

export default function DonateScreen() {
  const params = useSearchParams();
  const amountParam = Number(params.get("amount"));
  const freqParam = params.get("frequency");

  const defaultAmount =
    Number.isFinite(amountParam) && amountParam >= 100 ? amountParam : 1500;
  const defaultFrequency = freqParam === "once" ? "once" : "monthly";

  return (
    <Section tone="paper" pad="md">
      <PatternField tile="01" tint="navy" opacity={0.035} size={700} drift={40} />
      <div className="shell-wide relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---- Form ---- */}
          <div className="lg:col-span-7">
            <Eyebrow>Your gift</Eyebrow>
            <MaskedLines
              lines={["Choose how", "you would like to give."]}
              as="h2"
              className="t-h2 mt-6 text-[var(--color-navy)]"
            />
            <Reveal delay={0.2}>
              <p className="t-lead measure-wide mt-7 text-[rgba(14,42,67,0.7)]">
                A monthly gift is worth more to us than a larger one-off amount,
                because it is what lets us commit to a household for a full year
                rather than a single month.
              </p>
            </Reveal>

            <div className="mt-12 border border-[rgba(14,42,67,0.18)] bg-[var(--color-ivory)] p-7 md:p-10">
              <DonatePanel
                defaultAmount={defaultAmount}
                defaultFrequency={defaultFrequency}
              />
            </div>
          </div>

          {/* ---- Reassurance ---- */}
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <ParallaxImage
                src="/images/story-boy.jpg"
                alt="A boy smiling directly at the camera in warm afternoon light."
                className="aspect-[4/5] w-full"
                sizes="(max-width: 1024px) 100vw, 33vw"
                travel={7}
              />
              <div className="mt-10 border-t border-[rgba(14,42,67,0.2)]">
                {trustPoints.map((t) => (
                  <div
                    key={t.title}
                    className="border-b border-[rgba(14,42,67,0.2)] py-6"
                  >
                    <h3 className="t-label flex items-center gap-2.5 text-[var(--color-navy)]">
                      <span
                        aria-hidden
                        className="block h-1 w-1 rotate-45 bg-[var(--color-gold)]"
                      />
                      {t.title}
                    </h3>
                    <p className="t-small mt-2.5 text-[rgba(14,42,67,0.7)]">
                      {t.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}
