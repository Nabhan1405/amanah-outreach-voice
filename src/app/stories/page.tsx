import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import { Section, Eyebrow, PlaceholderNote } from "@/components/ui/Kit";
import { ArrowGlyph } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/primitives";
import { PatternField } from "@/components/ui/Pattern";
import { stories } from "@/content/site";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Notes from the register — how the work of Amanah Outreach Voice actually proceeds, told at the level of the programme rather than the person.",
};

export default function StoriesPage() {
  const [lead, ...rest] = stories;

  return (
    <>
      <PageHero
        compact
        eyebrow="Selected work"
        lines={["Notes from", "the register."]}
        standfirst="We write about the programme rather than the person. Nobody on our register is asked to trade their circumstances for support."
      />

      <Section tone="paper" pad="md">
        <PatternField tile="01" tint="navy" opacity={0.03} size={700} drift={40} />
        <div className="shell-wide relative">
          {/* ---- Lead story ---- */}
          <Reveal>
            <Link href={`/stories/${lead.slug}`} className="group block">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-navy)] lg:col-span-7">
                  <Image
                    src={lead.image}
                    alt={lead.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="img-warm object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-amanah)] group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 block h-[2px] origin-left scale-x-0 bg-[var(--color-gold)] transition-transform duration-[900ms] [transition-timing-function:var(--ease-amanah)] group-hover:scale-x-100"
                  />
                </div>
                <div className="lg:col-span-5">
                  <Eyebrow>{lead.kicker}</Eyebrow>
                  <h2 className="t-h2 mt-6 text-[var(--color-navy)] transition-transform duration-[800ms] [transition-timing-function:var(--ease-amanah)] group-hover:translate-x-1">
                    {lead.title}
                  </h2>
                  <p className="t-lead measure mt-5 text-[rgba(14,42,67,0.7)]">
                    {lead.excerpt}
                  </p>
                  <p className="t-label mt-7 flex items-center gap-2 text-[var(--color-gold-deep)]">
                    Read the note
                    <ArrowGlyph />
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* ---- The rest ---- */}
          <ul className="mt-20 grid gap-x-8 gap-y-14 border-t border-[rgba(14,42,67,0.2)] pt-14 md:grid-cols-3">
            {rest.map((s, i) => (
              <li key={s.slug}>
                <Reveal delay={i * 0.08}>
                  <Link href={`/stories/${s.slug}`} className="group block">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-navy)]">
                      <Image
                        src={s.image}
                        alt={s.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                        className="img-warm object-cover transition-transform duration-[1300ms] [transition-timing-function:var(--ease-amanah)] group-hover:scale-[1.05]"
                      />
                    </div>
                    <p className="t-label mt-6 text-[rgba(14,42,67,0.7)]">
                      {s.kicker}
                    </p>
                    <h3 className="t-h3 mt-3 text-[var(--color-navy)]">
                      {s.title}
                    </h3>
                    <p className="t-body mt-3 text-[rgba(14,42,67,0.7)]">
                      {s.excerpt}
                    </p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          <PlaceholderNote className="mt-16">
            These notes are sample editorial content written for the design.
            Replace them with your own before publishing.
          </PlaceholderNote>
        </div>
      </Section>
    </>
  );
}
