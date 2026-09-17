import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { stories } from "@/content/site";
import PageHero from "@/components/layout/PageHero";
import {
  Section,
  ParallaxImage,
  PlaceholderNote,
} from "@/components/ui/Kit";
import { Button, ArrowGlyph } from "@/components/ui/Button";
import { Reveal, DrawRule } from "@/components/motion/primitives";
import { PatternField } from "@/components/ui/Pattern";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = stories.find((x) => x.slug === slug);
  if (!s) return { title: "Story not found" };
  return { title: s.title, description: s.excerpt };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const s = stories.find((x) => x.slug === slug);
  if (!s) notFound();

  const idx = stories.findIndex((x) => x.slug === s.slug);
  const next = stories[(idx + 1) % stories.length];

  const formatted = new Date(s.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <PageHero
        compact
        eyebrow={`${s.kicker} — ${formatted} — ${s.readTime} read`}
        lines={[s.title]}
        standfirst={s.excerpt}
      />

      <Section tone="paper" pad="md">
        <PatternField tile="07" tint="navy" opacity={0.03} size={700} drift={40} />
        <div className="shell-wide relative">
          <ParallaxImage
            src={s.image}
            alt={s.imageAlt}
            className="aspect-[16/9] w-full"
            sizes="100vw"
            travel={7}
            priority
          />

          {/* Narrow measure — this is a reading column, not a layout. */}
          <article className="mx-auto mt-16 max-w-[38rem]">
            {s.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p
                  className={`${
                    i === 0
                      ? "t-lead text-[rgba(14,42,67,0.8)]"
                      : "t-body text-[rgba(14,42,67,0.7)]"
                  } ${i > 0 ? "mt-6" : ""}`}
                >
                  {p}
                </p>
              </Reveal>
            ))}

            <DrawRule className="mt-14" color="bg-[rgba(14,42,67,0.25)]" />

            <Reveal delay={0.1}>
              <PlaceholderNote className="mt-8">
                Sample editorial content, written to demonstrate the design.
              </PlaceholderNote>
            </Reveal>
          </article>
        </div>
      </Section>

      {/* ---- Next ---- */}
      <Section tone="navy" pad="md">
        <PatternField tile="05" tint="gold" opacity={0.05} size={560} drift={40} />
        <div className="shell-wide relative">
          <Link href={`/stories/${next.slug}`} className="group block">
            <p className="t-label text-[rgba(249,245,233,0.58)]">Next</p>
            <h2 className="t-h2 mt-5 max-w-[20ch] text-[var(--color-ivory)] transition-transform duration-[900ms] [transition-timing-function:var(--ease-amanah)] group-hover:translate-x-2">
              {next.title}
            </h2>
            <p className="t-label mt-8 flex items-center gap-2.5 text-[var(--color-gold)]">
              Read
              <ArrowGlyph />
            </p>
          </Link>

          <div className="mt-14 border-t border-[rgba(249,245,233,0.16)] pt-10">
            <Button href="/stories" variant="onNavy">
              All stories
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
