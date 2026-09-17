"use client";

/**
 * Campaign index with area filtering.
 * The filter is driven by the `?area=` query so that links from the
 * footer and the areas-of-work index land pre-filtered, and so a
 * filtered view can be shared as a URL.
 */

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { useMemo } from "react";
import { campaigns, areas } from "@/content/site";
import { Progress, PlaceholderNote } from "@/components/ui/Kit";
import { ArrowGlyph } from "@/components/ui/Button";
import { EASE, VIEWPORT } from "@/components/motion/primitives";

export default function CampaignIndex() {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("area");
  const reduced = useReducedMotion();

  const areaTitle = useMemo(
    () => areas.find((a) => a.slug === active)?.title ?? null,
    [active],
  );

  const visible = useMemo(
    () => (areaTitle ? campaigns.filter((c) => c.category === areaTitle) : campaigns),
    [areaTitle],
  );

  function setArea(slug: string | null) {
    router.replace(slug ? `/campaigns?area=${slug}` : "/campaigns", {
      scroll: false,
    });
  }

  return (
    <section className="relative bg-[var(--color-ivory)] py-16 md:py-24">
      <div className="shell-wide relative">
        {/* ---- Filter ---- */}
        <div className="flex flex-col gap-6 border-b border-[rgba(14,42,67,0.2)] pb-7 md:flex-row md:items-end md:justify-between">
          <div
            role="group"
            aria-label="Filter campaigns by area of work"
            className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] md:mx-0 md:flex-wrap md:px-0"
          >
            <FilterChip
              label="All"
              active={!active}
              onClick={() => setArea(null)}
            />
            {areas.map((a) => (
              <FilterChip
                key={a.slug}
                label={a.title}
                active={active === a.slug}
                onClick={() => setArea(a.slug)}
              />
            ))}
          </div>
          <p
            className="t-label t-num shrink-0 text-[rgba(14,42,67,0.7)]"
            aria-live="polite"
          >
            {visible.length} {visible.length === 1 ? "campaign" : "campaigns"}
          </p>
        </div>

        {/* ---- Grid ---- */}
        <motion.ul
          layout={!reduced}
          className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((c, i) => (
              <motion.li
                key={c.slug}
                layout={!reduced}
                initial={reduced ? undefined : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -12 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.7, delay: (i % 3) * 0.07, ease: EASE }}
              >
                <Link href={`/campaigns/${c.slug}`} className="group block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-navy)]">
                    <Image
                      src={c.image}
                      alt={c.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading={i < 3 ? undefined : "lazy"}
                      className="img-warm object-cover transition-transform duration-[1300ms] [transition-timing-function:var(--ease-amanah)] group-hover:scale-[1.05]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 block h-[2px] origin-left scale-x-0 bg-[var(--color-gold)] transition-transform duration-[900ms] [transition-timing-function:var(--ease-amanah)] group-hover:scale-x-100"
                    />
                  </div>

                  <div className="pt-6">
                    <p className="t-label text-[rgba(14,42,67,0.7)]">
                      {c.category}
                    </p>
                    <h3 className="t-h3 mt-3.5 text-[var(--color-navy)] transition-transform duration-[800ms] [transition-timing-function:var(--ease-amanah)] group-hover:translate-x-1">
                      {c.title}
                    </h3>
                    <p className="t-body mt-3 text-[rgba(14,42,67,0.7)]">
                      {c.summary}
                    </p>

                    <div className="mt-6">
                      <Progress raised={c.raised} goal={c.goal} />
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4">
                      <p className="t-small t-num text-[rgba(14,42,67,0.7)]">
                        {c.supporters} supporters · {c.daysLeft} days left
                      </p>
                      <ArrowGlyph className="h-3 shrink-0 text-[var(--color-gold-deep)]" />
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && (
          <div className="border-b border-[rgba(14,42,67,0.2)] py-20 text-center">
            <p className="t-h3 text-[var(--color-navy)]">
              No open campaign in this area right now.
            </p>
            <button
              type="button"
              onClick={() => setArea(null)}
              className="link-gold t-label mt-6 text-[var(--color-navy)]"
            >
              Show all campaigns
            </button>
          </div>
        )}

        <PlaceholderNote className="mt-14">
          All campaign titles, figures and progress shown here are editable
          sample records. Replace them with live campaign data before publishing.
        </PlaceholderNote>
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "t-label relative shrink-0 border px-4 py-2.5 whitespace-nowrap transition-colors duration-500",
        "[transition-timing-function:var(--ease-amanah)]",
        active
          ? "border-[var(--color-gold)] bg-[rgba(214,170,41,0.12)] text-[var(--color-navy)]"
          : "border-[rgba(14,42,67,0.18)] text-[rgba(14,42,67,0.7)] hover:border-[rgba(14,42,67,0.45)] hover:text-[var(--color-navy)]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}


