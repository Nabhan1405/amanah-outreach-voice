import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Transparency from "@/components/sections/Transparency";
import { Section, Eyebrow, PlaceholderNote } from "@/components/ui/Kit";
import { Button, ArrowGlyph } from "@/components/ui/Button";
import {
  MaskedLines,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion/primitives";
import { PatternField } from "@/components/ui/Pattern";

export const metadata: Metadata = {
  title: "Transparency",
  description:
    "How Amanah Outreach Voice accounts for what it receives — allocation, governance, and published accounts.",
};

const documents = [
  {
    title: "Annual report",
    period: "FY 2025–26",
    note: "Programme activity, case volumes and outcomes by area of work.",
  },
  {
    title: "Audited accounts",
    period: "FY 2025–26",
    note: "Income, expenditure and balance sheet with the independent auditor’s report.",
  },
  {
    title: "Registration & compliance",
    period: "Current",
    note: "Registration certificate and tax-exemption status.",
  },
  {
    title: "Governance policy",
    period: "Current",
    note: "Committee composition, conflict-of-interest policy and safeguarding.",
  },
];

const governance = [
  {
    title: "Who decides",
    body: "A standing review committee, not a single officer. Every approval and every decline carries more than one signature.",
  },
  {
    title: "Who checks",
    body: "Accounts are examined annually by an independent auditor whose report is published alongside them, unedited.",
  },
  {
    title: "Who is accountable",
    body: "Supporters. Any donor may ask what happened to a case they funded, and receive an answer within the limits of the household’s privacy.",
  },
];

export default function TransparencyPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Accountability"
        lines={["Held, and", "accounted for."]}
        standfirst="Amanah means something entrusted to your care. The obligation that follows is documentary as much as moral."
      />

      <Transparency />

      {/* ---- Governance ---- */}
      <Section tone="paper" pad="lg">
        <PatternField tile="06" tint="navy" opacity={0.035} size={700} drift={40} />
        <div className="shell-wide relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <Eyebrow>Governance</Eyebrow>
                <MaskedLines
                  lines={["Decisions with", "a name on them."]}
                  as="h2"
                  className="t-h2 mt-6 text-[var(--color-navy)]"
                />
              </div>
            </div>
            <Stagger className="lg:col-span-7 lg:col-start-6" step={0.1}>
              <div className="border-t border-[rgba(14,42,67,0.2)]">
                {governance.map((g) => (
                  <StaggerItem key={g.title}>
                    <div className="group border-b border-[rgba(14,42,67,0.2)] py-9 transition-colors duration-700 hover:border-[var(--color-gold)]">
                      <h3 className="t-h3 text-[var(--color-navy)]">{g.title}</h3>
                      <p className="t-body measure-wide mt-3.5 text-[rgba(14,42,67,0.7)]">
                        {g.body}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </Stagger>
          </div>
        </div>
      </Section>

      {/* ---- Documents ---- */}
      <Section tone="ivory" pad="lg">
        <div className="shell-wide relative">
          <Eyebrow>Published documents</Eyebrow>
          <MaskedLines
            lines={["On the record."]}
            as="h2"
            className="t-h2 mt-6 text-[var(--color-navy)]"
          />

          <Stagger className="mt-14 border-t border-[rgba(14,42,67,0.2)]" step={0.08}>
            {documents.map((d) => (
              <StaggerItem key={d.title}>
                <div className="group relative flex flex-col gap-4 border-b border-[rgba(14,42,67,0.2)] py-8 md:flex-row md:items-center md:justify-between md:gap-10">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-[-1px] block h-px origin-left scale-x-0 bg-[var(--color-gold)] transition-transform duration-[900ms] [transition-timing-function:var(--ease-amanah)] group-hover:scale-x-100"
                  />
                  <div className="md:flex-1">
                    <h3 className="t-h3 text-[var(--color-navy)]">{d.title}</h3>
                    <p className="t-body mt-2 max-w-[52ch] text-[rgba(14,42,67,0.7)]">
                      {d.note}
                    </p>
                  </div>
                  <p className="t-label shrink-0 text-[rgba(14,42,67,0.7)] md:w-40">
                    {d.period}
                  </p>
                  <p className="t-label shrink-0 text-[rgba(14,42,67,0.7)]">
                    Not yet uploaded
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <PlaceholderNote className="mt-12">
            Document links are placeholders. Upload your audited accounts,
            registration certificate and governance policy, then link them here.
          </PlaceholderNote>
        </div>
      </Section>

      <Section tone="navy" pad="md">
        <PatternField tile="03" tint="gold" opacity={0.05} size={560} drift={40} />
        <div className="shell-wide relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <MaskedLines
                lines={["Ask us anything", "about a case."]}
                as="h2"
                className="t-h2 text-[var(--color-ivory)]"
              />
              <Reveal delay={0.2}>
                <p className="t-lead measure mt-6 text-[rgba(249,245,233,0.72)]">
                  If you have funded something and want to know what happened, ask.
                  We will tell you, within the limits of the household’s privacy.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:justify-self-end">
              <Button href="/contact" variant="onNavy" size="lg">
                Contact us
                <ArrowGlyph />
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
