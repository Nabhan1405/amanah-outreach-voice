import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { campaigns } from "@/content/site";
import DonatePanel from "@/components/sections/DonatePanel";
import Verification from "@/components/sections/Verification";
import {
  Section,
  Eyebrow,
  ParallaxImage,
  Progress,
  VerifiedMark,
  PlaceholderNote,
} from "@/components/ui/Kit";
import { ArrowGlyph } from "@/components/ui/Button";
import { formatINR } from "@/lib/format";
import { MaskedLines, Reveal } from "@/components/motion/primitives";
import { PatternField } from "@/components/ui/Pattern";
import PageHero from "@/components/layout/PageHero";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = campaigns.find((x) => x.slug === slug);
  if (!c) return { title: "Campaign not found" };
  return { title: c.title, description: c.summary };
}

export default async function CampaignPage({ params }: Props) {
  const { slug } = await params;
  const c = campaigns.find((x) => x.slug === slug);
  if (!c) notFound();

  const others = campaigns.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <>
      <PageHero
        compact
        eyebrow={`${c.category} — ${c.location}`}
        lines={[c.title]}
        standfirst={c.summary}
      />

      {/* ---- Plate + donation panel ---- */}
      <Section tone="paper" pad="md">
        <PatternField tile="07" tint="navy" opacity={0.035} size={700} drift={40} />
        <div className="shell-wide relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <ParallaxImage
                src={c.image}
                alt={c.imageAlt}
                className="aspect-[3/2] w-full"
                sizes="(max-width: 1024px) 100vw, 58vw"
                travel={8}
                priority
              />

              <Reveal delay={0.15} className="mt-12">
                <Eyebrow>About this campaign</Eyebrow>
                <div className="measure-wide mt-7 space-y-6">
                  {c.body.map((p, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? "t-lead text-[rgba(14,42,67,0.78)]"
                          : "t-body text-[rgba(14,42,67,0.7)]"
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.2} className="mt-12">
                <div className="flex flex-wrap items-center gap-4 border-t border-[rgba(14,42,67,0.18)] pt-8">
                  <VerifiedMark />
                  <p className="t-small text-[rgba(14,42,67,0.7)]">
                    Home visit completed · Committee approved · Disbursed directly
                    to the institution
                  </p>
                </div>
              </Reveal>
            </div>

            {/* ---- Sticky giving panel ---- */}
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="lg:sticky lg:top-28">
                <div className="border border-[rgba(14,42,67,0.18)] bg-[var(--color-ivory)]">
                  <div className="px-6 pt-7 pb-6 md:px-8">
                    <Progress raised={c.raised} goal={c.goal} />
                  </div>
                  <dl className="grid grid-cols-3 border-t border-[rgba(14,42,67,0.14)]">
                    {[
                      { k: "Supporters", v: c.supporters.toLocaleString("en-IN") },
                      { k: "Days left", v: String(c.daysLeft) },
                      { k: "Needed", v: formatINR(c.goal - c.raised) },
                    ].map((row, i) => (
                      <div
                        key={row.k}
                        className={`px-4 py-5 md:px-6 ${
                          i > 0 ? "border-l border-[rgba(14,42,67,0.14)]" : ""
                        }`}
                      >
                        <dt className="t-label text-[rgba(14,42,67,0.7)]">
                          {row.k}
                        </dt>
                        <dd className="t-num font-display mt-2 text-[1.15rem] leading-none text-[var(--color-navy)] md:text-[1.35rem]">
                          {row.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="border-t border-[rgba(14,42,67,0.14)] px-6 py-7 md:px-8">
                    <DonatePanel campaign={c.title} compact />
                  </div>
                </div>

                <PlaceholderNote className="mt-6">
                  Sample campaign record. Figures are illustrative and no payment
                  gateway is connected.
                </PlaceholderNote>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Verification />

      {/* ---- Other campaigns ---- */}
      <Section tone="ivory" pad="md">
        <div className="shell-wide relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <MaskedLines
              lines={["Other open campaigns."]}
              as="h2"
              className="t-h2 text-[var(--color-navy)]"
            />
            <Link
              href="/campaigns"
              className="link-gold t-label group w-fit text-[var(--color-navy)]"
            >
              All campaigns
              <ArrowGlyph className="ml-2 inline-block" />
            </Link>
          </div>

          <ul className="mt-12 grid gap-x-8 gap-y-12 border-t border-[rgba(14,42,67,0.2)] pt-10 md:grid-cols-3">
            {others.map((o, i) => (
              <li key={o.slug}>
                <Reveal delay={i * 0.08}>
                  <Link href={`/campaigns/${o.slug}`} className="group block">
                    <p className="t-label text-[rgba(14,42,67,0.7)]">
                      {o.category}
                    </p>
                    <h3 className="t-h3 mt-3 text-[var(--color-navy)] transition-transform duration-[800ms] [transition-timing-function:var(--ease-amanah)] group-hover:translate-x-1">
                      {o.title}
                    </h3>
                    <p className="t-body mt-3 text-[rgba(14,42,67,0.7)]">
                      {o.summary}
                    </p>
                    <div className="mt-5">
                      <Progress raised={o.raised} goal={o.goal} showLabels={false} />
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
