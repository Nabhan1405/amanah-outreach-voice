"use client";

/**
 * Shared interior-page masthead.
 * A navy band carrying the brand pattern, an eyebrow, a masked
 * headline and an optional standfirst. Every route below the
 * homepage opens with this, so the site has one front door.
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { useRef, type ReactNode } from "react";
import { MaskedLines, EASE } from "@/components/motion/primitives";
import { PatternField, PatternDraw } from "@/components/ui/Pattern";

export default function PageHero({
  eyebrow,
  lines,
  standfirst,
  children,
  compact = false,
}: {
  eyebrow: string;
  lines: string[];
  standfirst?: string;
  children?: ReactNode;
  compact?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  return (
    <section
      ref={ref}
      className={`on-navy relative flex overflow-hidden bg-[var(--color-navy)] text-[var(--color-ivory)] ${
        compact
          ? "min-h-[54svh] items-end pt-[120px] pb-16"
          : "min-h-[72svh] items-end pt-[140px] pb-20 md:pb-24"
      }`}
    >
      <PatternField tile="03" tint="gold" opacity={0.038} size={820} drift={50} />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-[16%] -bottom-[30%] hidden h-[70vh] w-[70vh] md:block"
      >
        <PatternDraw
          className="h-full w-full"
          stroke="var(--color-gold)"
          opacity={0.18}
          strokeWidth={0.9}
          duration={2.8}
        />
      </div>

      <motion.div
        className="shell-wide relative w-full"
        style={reduced ? undefined : { y, opacity }}
      >
        <motion.p
          className="t-label flex items-center gap-3 text-[rgba(249,245,233,0.65)]"
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
        >
          <span aria-hidden className="block h-px w-10 bg-[var(--color-gold)]" />
          {eyebrow}
        </motion.p>

        <div className="mt-7 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <MaskedLines
            lines={lines}
            as="h1"
            className="t-h1 text-[var(--color-ivory)] lg:col-span-7"
            delay={0.45}
          />
          {standfirst && (
            <motion.p
              className="t-lead measure text-[rgba(249,245,233,0.74)] lg:col-span-5 lg:pb-2"
              initial={reduced ? undefined : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.85, ease: EASE }}
            >
              {standfirst}
            </motion.p>
          )}
        </div>

        {children && <div className="mt-12">{children}</div>}
      </motion.div>
    </section>
  );
}
