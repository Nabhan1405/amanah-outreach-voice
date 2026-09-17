"use client";

/**
 * AMANAH — shared UI kit.
 * One design language for every module on the site: hairline rules,
 * small-caps labels, editorial serif headings, gold used as accent
 * rather than surface.
 */

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { EASE, VIEWPORT, MaskedLines, DrawRule } from "@/components/motion/primitives";
import { formatINR } from "@/lib/format";

/* ------------------------------------------------------------------
   Eyebrow label with a gold tick
   ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  className = "",
  invert = false,
}: {
  children: ReactNode;
  className?: string;
  invert?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.p
      className={`t-label flex items-center gap-3 ${
        invert ? "text-[rgba(249,245,233,0.62)]" : "text-[rgba(14,42,67,0.7)]"
      } ${className}`}
      initial={reduced ? undefined : { opacity: 0, y: 10 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <span
        aria-hidden
        className="inline-block h-px w-8 bg-[var(--color-gold)] md:w-12"
      />
      {children}
    </motion.p>
  );
}

/* ------------------------------------------------------------------
   Section heading block
   ------------------------------------------------------------------ */

export function SectionHead({
  eyebrow,
  lines,
  intro,
  invert = false,
  align = "left",
  className = "",
  size = "h2",
}: {
  eyebrow?: string;
  lines: string[];
  intro?: string;
  invert?: boolean;
  align?: "left" | "center";
  className?: string;
  size?: "h1" | "h2";
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <Eyebrow
          invert={invert}
          className={align === "center" ? "justify-center" : ""}
        >
          {eyebrow}
        </Eyebrow>
      )}
      <MaskedLines
        lines={lines}
        as="h2"
        className={`mt-6 ${size === "h1" ? "t-h1" : "t-h2"} ${
          invert ? "text-[var(--color-ivory)]" : "text-[var(--color-navy)]"
        }`}
      />
      {intro && (
        <motion.p
          className={`t-lead mt-7 ${align === "center" ? "mx-auto" : ""} measure-wide ${
            invert
              ? "text-[rgba(249,245,233,0.72)]"
              : "text-[rgba(14,42,67,0.72)]"
          }`}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.9, delay: 0.24, ease: EASE }}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
   Parallax image — slow drift plus a slow scale, clipped on entry
   ------------------------------------------------------------------ */

export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  travel = 12,
  zoom = true,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  reveal = true,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Parallax travel as a percentage of the element height. */
  travel?: number;
  zoom?: boolean;
  priority?: boolean;
  sizes?: string;
  reveal?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.16, 1.08, 1.16]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-[var(--color-navy)] ${className}`}
      initial={reduced || !reveal ? undefined : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={reduced || !reveal ? undefined : { clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={VIEWPORT}
      transition={{ duration: 1.3, ease: EASE }}
    >
      <motion.div
        className="absolute inset-0"
        style={
          reduced
            ? undefined
            : { y, scale: zoom ? scale : 1.12 }
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`img-warm object-cover ${imgClassName}`}
        />
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Animated statistic
   ------------------------------------------------------------------ */

export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1900,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Matches the site easing curve so counts settle rather than stop.
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={`t-num ${className}`}>
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------
   Campaign progress — institutional, not ecommerce
   ------------------------------------------------------------------ */

export function Progress({
  raised,
  goal,
  invert = false,
  showLabels = true,
}: {
  raised: number;
  goal: number;
  invert?: boolean;
  showLabels?: boolean;
}) {
  const pct = Math.min(100, Math.round((raised / goal) * 100));
  const reduced = useReducedMotion();

  return (
    <div className="w-full">
      {showLabels && (
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <p
            className={`t-num text-[0.95rem] font-medium ${
              invert ? "text-[var(--color-ivory)]" : "text-[var(--color-navy)]"
            }`}
          >
            {formatINR(raised)}
            <span
              className={`ml-2 text-[0.78rem] font-normal ${
                invert
                  ? "text-[rgba(249,245,233,0.58)]"
                  : "text-[rgba(14,42,67,0.7)]"
              }`}
            >
              of {formatINR(goal)}
            </span>
          </p>
          <p className="t-label t-num text-[var(--color-gold-deep)]">{pct}%</p>
        </div>
      )}
      <div
        className={`relative h-[3px] w-full ${
          invert ? "bg-[rgba(249,245,233,0.18)]" : "bg-[rgba(14,42,67,0.14)]"
        }`}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${pct}% of the goal raised`}
      >
        <motion.div
          className="absolute inset-y-0 left-0 bg-[var(--color-gold)]"
          initial={reduced ? { width: `${pct}%` } : { width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.5, ease: EASE, delay: 0.2 }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Verified badge
   ------------------------------------------------------------------ */

export function VerifiedMark({ invert = false }: { invert?: boolean }) {
  return (
    <span
      className={`t-label inline-flex items-center gap-2 border px-3 py-1.5 ${
        invert
          ? "border-[rgba(249,245,233,0.28)] text-[rgba(249,245,233,0.78)]"
          : "border-[rgba(14,42,67,0.2)] text-[rgba(14,42,67,0.7)]"
      }`}
    >
      <svg viewBox="0 0 12 12" aria-hidden className="h-2.5 w-2.5">
        <path
          d="M1 6.3 4.3 9.6 11 2.9"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1.8"
        />
      </svg>
      Case verified
    </span>
  );
}

/* ------------------------------------------------------------------
   Placeholder-data notice — kept visible and honest
   ------------------------------------------------------------------ */

export function PlaceholderNote({
  children,
  invert = false,
  className = "",
}: {
  children: ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`t-small flex items-start gap-2.5 ${
        invert ? "text-[rgba(249,245,233,0.58)]" : "text-[rgba(14,42,67,0.7)]"
      } ${className}`}
    >
      <span aria-hidden className="mt-[0.55em] block h-px w-4 shrink-0 bg-current" />
      <span className="max-w-[46ch] text-[0.78rem] leading-relaxed">{children}</span>
    </p>
  );
}

/* ------------------------------------------------------------------
   Section wrapper — consistent vertical rhythm
   ------------------------------------------------------------------ */

export function Section({
  children,
  className = "",
  id,
  tone = "ivory",
  pad = "lg",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "ivory" | "navy" | "paper" | "none";
  pad?: "sm" | "md" | "lg" | "xl";
}) {
  const tones = {
    ivory: "bg-[var(--color-ivory)] text-[var(--color-navy)]",
    paper: "bg-[var(--color-paper)] text-[var(--color-navy)]",
    navy: "on-navy bg-[var(--color-navy)] text-[var(--color-ivory)]",
    none: "",
  };
  const pads = {
    sm: "py-16 md:py-20",
    md: "py-20 md:py-28",
    lg: "py-24 md:py-36",
    xl: "py-28 md:py-44",
  };
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${tones[tone]} ${pads[pad]} ${className}`}
    >
      {children}
    </section>
  );
}

export { DrawRule, formatINR };
