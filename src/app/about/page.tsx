import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Philosophy from "@/components/sections/Philosophy";
import Impact from "@/components/sections/Impact";
import AreasOfWork from "@/components/sections/AreasOfWork";
import { Section, Eyebrow, ParallaxImage } from "@/components/ui/Kit";
import { Button, ArrowGlyph } from "@/components/ui/Button";
import {
  MaskedLines,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion/primitives";
import { PatternField } from "@/components/ui/Pattern";
import { org } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description: org.description,
};

const beliefs = [
  {
    title: "Proximity",
    body: "Almost every household on our register is within an hour of the office. We can visit, and we do — before a case is listed, and again after it closes.",
  },
  {
    title: "Specificity",
    body: "We fund named costs, not general need: this fee, this prescription, this repair. It is slower to organise and far easier to account for.",
  },
  {
    title: "Continuity",
    body: "The same volunteer returns to the same household. Relationships are what let us notice a change before it becomes an emergency.",
  },
  {
    title: "Restraint",
    body: "We do not photograph distress for an appeal, and we do not publish a family’s circumstances to raise money from them.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`${org.city}, ${org.state}`}
        lines={["A trust held", "on someone’s behalf."]}
        standfirst={org.description}
      />

      {/* ---- Opening statement ---- */}
      <Section tone="paper" pad="lg">
        <PatternField tile="07" tint="navy" opacity={0.035} size={700} drift={45} />
        <div className="shell-wide relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>What we are</Eyebrow>
              <MaskedLines
                lines={[
                  "We are a small organisation",
                  "that has chosen to stay small.",
                ]}
                as="h2"
                className="t-h2 mt-6 text-[var(--color-navy)]"
              />
              <Reveal delay={0.25} className="mt-8 space-y-6">
                <p className="t-lead measure-wide text-[rgba(14,42,67,0.72)]">
                  Amanah Outreach Voice was founded on a straightforward belief:
                  that meaningful change begins with compassion and a willingness
                  to serve. In practice, that means working close to the ground
                  in one city rather than thinly across many.
                </p>
                <p className="t-body measure-wide text-[rgba(14,42,67,0.7)]">
                  Our work is organised around four groups whose needs are
                  persistent rather than seasonal — children, the
                  differently-abled, the elderly, and the animals who share the
                  street. Around those, we run emergency relief and livelihood
                  support when a household is knocked off its feet.
                </p>
                <p className="t-body measure-wide text-[rgba(14,42,67,0.7)]">
                  We are deliberate about the limits of what we do. We are not a
                  hospital, a school or a shelter. We are the mechanism that pays
                  for the thing a family cannot, verified before it is funded and
                  followed up after.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <ParallaxImage
                src="/images/coast-aerial.jpg"
                alt="The coastline of Karnataka seen from above, with fishing boats drawn up on the sand."
                className="aspect-[3/4] w-full"
                sizes="(max-width: 1024px) 100vw, 33vw"
                travel={8}
              />
              <Reveal delay={0.3}>
                <p className="t-small mt-5 max-w-[32ch] text-[rgba(14,42,67,0.7)]">
                  Coastal Karnataka. Our register is drawn from the neighbourhoods
                  around {org.city}.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Beliefs ---- */}
      <Section tone="ivory" pad="lg">
        <div className="shell-wide relative">
          <Eyebrow>How we hold ourselves</Eyebrow>
          <MaskedLines
            lines={["Four commitments."]}
            as="h2"
            className="t-h2 mt-6 text-[var(--color-navy)]"
          />
          <Stagger
            className="mt-14 grid gap-px border-t border-[rgba(14,42,67,0.2)] md:grid-cols-2"
            step={0.1}
          >
            {beliefs.map((b, i) => (
              <StaggerItem key={b.title}>
                <div
                  className={`group h-full border-b border-[rgba(14,42,67,0.2)] py-9 transition-colors duration-700 hover:border-[var(--color-gold)] ${
                    i % 2 === 1 ? "md:border-l md:border-l-[rgba(14,42,67,0.2)] md:pl-10" : "md:pr-10"
                  }`}
                >
                  <span
                    aria-hidden
                    className="mb-6 block h-px w-10 origin-left bg-[var(--color-gold)] transition-transform duration-[800ms] [transition-timing-function:var(--ease-amanah)] group-hover:scale-x-[2.4]"
                  />
                  <h3 className="t-h3 text-[var(--color-navy)]">{b.title}</h3>
                  <p className="t-body measure mt-3.5 text-[rgba(14,42,67,0.7)]">
                    {b.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Philosophy />
      <Impact />
      <AreasOfWork />

      {/* ---- Close ---- */}
      <Section tone="navy" pad="lg">
        <PatternField tile="05" tint="gold" opacity={0.05} size={560} drift={40} />
        <div className="shell-wide relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <MaskedLines
              lines={["Come and see", "how it works."]}
              as="h2"
              className="t-h2 text-[var(--color-ivory)] lg:col-span-6"
            />
            <div className="flex flex-wrap gap-4 lg:col-span-5 lg:col-start-8 lg:justify-end">
              <Button href="/how-it-works" variant="onNavy" size="lg">
                Our process
                <ArrowGlyph />
              </Button>
              <Button href="/contact" variant="onNavy" size="lg">
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
