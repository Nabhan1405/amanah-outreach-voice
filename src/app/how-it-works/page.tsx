import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Verification from "@/components/sections/Verification";
import Transparency from "@/components/sections/Transparency";
import { Section, Eyebrow, ParallaxImage, PlaceholderNote } from "@/components/ui/Kit";
import { Button, ArrowGlyph } from "@/components/ui/Button";
import {
  MaskedLines,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion/primitives";
import { PatternField } from "@/components/ui/Pattern";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How Amanah Outreach Voice verifies a case, approves it, disburses funds directly and follows up afterwards.",
};

const principles = [
  {
    q: "Who can refer a case?",
    a: "Anyone. Partner schools, clinics and places of worship refer most of what reaches us, but self-referrals and referrals from neighbours are accepted and follow exactly the same process.",
  },
  {
    q: "How long does it take?",
    a: "A straightforward case takes around two weeks from referral to disbursement. Genuine emergencies are escalated the same day, but they still pass through a visit and a committee decision — urgency changes the pace, never the steps.",
  },
  {
    q: "What happens to a case you decline?",
    a: "The household is given a written reason and, where we can, a referral to another organisation or a government scheme better suited to the need. Declines are recorded and reviewed.",
  },
  {
    q: "Why pay institutions rather than families?",
    a: "Because it is easier to account for, and because it removes any suggestion that a family must justify how they spent a gift. Where a direct transfer is the only sensible route, it is documented as an exception.",
  },
  {
    q: "What do you do with photographs?",
    a: "We do not photograph distress, and we do not publish identifying images or circumstances to raise money. Where a story is told on this site, it is told with permission and at the level of the programme rather than the person.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Our process"
        lines={["A visit, a file,", "a decision,", "a receipt."]}
        standfirst="Every case that reaches a campaign page has been through the same six steps, in the same order, whatever the circumstances."
      />

      {/* ---- Opening ---- */}
      <Section tone="paper" pad="md">
        <PatternField tile="01" tint="navy" opacity={0.035} size={700} drift={40} />
        <div className="shell-wide relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <ParallaxImage
                src="/images/verify-classroom.jpg"
                alt="Children raising their hands in a busy classroom."
                className="aspect-[4/3] w-full"
                sizes="(max-width: 1024px) 100vw, 40vw"
                travel={8}
              />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Eyebrow>Why it is written down</Eyebrow>
              <MaskedLines
                lines={["A process is a promise", "you can be held to."]}
                as="h2"
                className="t-h2 mt-6 text-[var(--color-navy)]"
              />
              <Reveal delay={0.25} className="mt-8 space-y-6">
                <p className="t-lead measure text-[rgba(14,42,67,0.72)]">
                  Charitable giving runs on trust, and trust is easiest to give
                  when the mechanism is visible. So we publish ours.
                </p>
                <p className="t-body measure text-[rgba(14,42,67,0.7)]">
                  What follows is not an aspiration. It is the sequence a case
                  actually moves through, and the point at which a supporter’s
                  money enters it.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <Verification />

      {/* ---- Questions ---- */}
      <Section tone="ivory" pad="lg">
        <div className="shell-wide relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <Eyebrow>Questions we are asked</Eyebrow>
                <MaskedLines
                  lines={["The things", "worth asking."]}
                  as="h2"
                  className="t-h2 mt-6 text-[var(--color-navy)]"
                />
              </div>
            </div>

            <Stagger className="lg:col-span-7 lg:col-start-6" step={0.09}>
              <dl className="border-t border-[rgba(14,42,67,0.2)]">
                {principles.map((p) => (
                  <StaggerItem key={p.q}>
                    <div className="group border-b border-[rgba(14,42,67,0.2)] py-8 transition-colors duration-700 hover:border-[var(--color-gold)]">
                      <dt className="t-h3 text-[var(--color-navy)]">{p.q}</dt>
                      <dd className="t-body measure-wide mt-3.5 text-[rgba(14,42,67,0.7)]">
                        {p.a}
                      </dd>
                    </div>
                  </StaggerItem>
                ))}
              </dl>
            </Stagger>
          </div>
        </div>
      </Section>

      <Transparency />

      {/* ---- Close ---- */}
      <Section tone="navy" pad="md">
        <PatternField tile="06" tint="gold" opacity={0.05} size={600} drift={40} />
        <div className="shell-wide relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <MaskedLines
                lines={["Refer a case."]}
                as="h2"
                className="t-h2 text-[var(--color-ivory)]"
              />
              <Reveal delay={0.2}>
                <p className="t-lead measure mt-6 text-[rgba(249,245,233,0.72)]">
                  If you know a household that needs support, tell us. The first
                  step is a conversation, not a form.
                </p>
              </Reveal>
              <PlaceholderNote invert className="mt-8">
                Referral intake is handled by email until a secure form is
                connected.
              </PlaceholderNote>
            </div>
            <div className="flex flex-wrap gap-4 lg:col-span-5 lg:col-start-8 lg:justify-end">
              <Button href="/contact" variant="onNavy" size="lg">
                Refer someone
                <ArrowGlyph />
              </Button>
              <Button href="/campaigns" variant="onNavy" size="lg">
                See campaigns
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
