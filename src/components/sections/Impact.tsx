"use client";

/**
 * Impact statistics.
 * A bordered four-up module. Figures count up once, slowly, and sit
 * in tabular figures so the columns stay aligned while they run.
 */

import { impactStats } from "@/content/site";
import { Counter, Eyebrow, PlaceholderNote } from "@/components/ui/Kit";
import { MaskedLines, Stagger, StaggerItem } from "@/components/motion/primitives";
import { PatternField } from "@/components/ui/Pattern";

export default function Impact() {
  return (
    <section
      id="impact"
      className="relative overflow-hidden bg-[var(--color-ivory)] py-20 md:py-28"
    >
      <PatternField tile="03" tint="navy" opacity={0.04} size={520} drift={40} />

      <div className="shell-wide relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow>Where things stand</Eyebrow>
            <MaskedLines
              lines={["The work, in figures."]}
              as="h2"
              className="t-h2 mt-6 text-[var(--color-navy)]"
            />
          </div>
          <PlaceholderNote className="md:max-w-[30ch] md:text-right">
            Sample figures. Replace with audited numbers before publishing.
          </PlaceholderNote>
        </div>

        <Stagger
          className="mt-14 grid grid-cols-1 border-t border-[rgba(14,42,67,0.18)] sm:grid-cols-2 lg:grid-cols-4"
          step={0.1}
        >
          {impactStats.map((s, i) => (
            <StaggerItem key={s.label}>
              <div
                className={[
                  "group relative h-full border-b border-[rgba(14,42,67,0.18)] px-0 py-9 sm:px-7",
                  i > 0 ? "lg:border-l lg:border-l-[rgba(14,42,67,0.18)]" : "",
                  i === 1 ? "sm:border-l sm:border-l-[rgba(14,42,67,0.18)]" : "",
                  i === 3 ? "sm:border-l sm:border-l-[rgba(14,42,67,0.18)]" : "",
                  i === 0 ? "lg:pl-0" : "",
                ].join(" ")}
              >
                {/* A gold rule that draws in on hover. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-[-1px] block h-px origin-left scale-x-0 bg-[var(--color-gold)] transition-transform duration-[800ms] [transition-timing-function:var(--ease-amanah)] group-hover:scale-x-100"
                />
                <p className="font-display text-[clamp(3rem,6vw,4.75rem)] leading-[0.92] font-light text-[var(--color-navy)]">
                  <Counter
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                  />
                </p>
                <h3 className="t-label mt-6 text-[var(--color-navy)]">
                  {s.label}
                </h3>
                <p className="t-small mt-2.5 max-w-[28ch] text-[rgba(14,42,67,0.7)]">
                  {s.note}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
