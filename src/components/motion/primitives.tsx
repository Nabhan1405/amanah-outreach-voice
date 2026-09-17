"use client";

/**
 * AMANAH — motion primitives
 * ------------------------------------------------------------------
 * Every entrance on the site is composed from this small set, so the
 * whole page shares one rhythm: slow, weighted, 400–1000ms, on the
 * `amanah` easing curve. Nothing animates a property other than
 * `transform`, `opacity` or `clip-path`.
 *
 * All of it collapses to a plain static render under
 * `prefers-reduced-motion: reduce`.
 * ------------------------------------------------------------------
 */

import {
  motion,
  useInView,
  type Variants,
  type HTMLMotionProps,
} from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { useRef, type ReactNode, type ElementType } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_SOFT = [0.33, 1, 0.68, 1] as const;

/** Standard viewport trigger: fires once, a little before the element lands. */
export const VIEWPORT = { once: true, margin: "-12% 0px -12% 0px" } as const;

/* ------------------------------------------------------------------
   Fade + rise
   ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.9,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------
   Stagger group — children animate in sequence
   ------------------------------------------------------------------ */

export function Stagger({
  children,
  className,
  delay = 0,
  step = 0.09,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  step?: number;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

export function StaggerItem({
  children,
  className,
  ...rest
}: { children: ReactNode; className?: string } & HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={staggerItem} {...rest}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Masked line reveal — each line rises out of its own clipping box.
   The editorial signature of the site; used on every major heading.
   ------------------------------------------------------------------ */

export function MaskedLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  step = 0.11,
  duration = 1.05,
  as: Tag = "h2",
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  step?: number;
  duration?: number;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <Tag className={className} ref={ref}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="block overflow-hidden"
          // The clipping box must not crop descenders or accents.
          style={{ paddingBottom: "0.08em", marginBottom: "-0.08em" }}
        >
          {reduced ? (
            <span className={`block ${lineClassName ?? ""}`}>{line}</span>
          ) : (
            <motion.span
              className={`block ${lineClassName ?? ""}`}
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : { y: "110%" }}
              transition={{ duration, delay: delay + i * step, ease: EASE }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Word-by-word reveal — for a single emphatic paragraph
   ------------------------------------------------------------------ */

export function MaskedWords({
  text,
  className,
  delay = 0,
  step = 0.028,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const words = text.split(" ");

  if (reduced) {
    return (
      <p className={className} ref={ref}>
        {text}
      </p>
    );
  }

  return (
    <p className={className} ref={ref} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "105%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: delay + i * step, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </p>
  );
}

/* ------------------------------------------------------------------
   Clip-path wipe — an image or panel uncovers itself
   ------------------------------------------------------------------ */

export function ClipReveal({
  children,
  className,
  delay = 0,
  duration = 1.25,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "left" | "right";
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  const from =
    direction === "up"
      ? "inset(100% 0% 0% 0%)"
      : direction === "left"
        ? "inset(0% 100% 0% 0%)"
        : "inset(0% 0% 0% 100%)";

  return (
    <motion.div
      className={className}
      initial={{ clipPath: from }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   A hairline gold rule that draws itself across
   ------------------------------------------------------------------ */

export function DrawRule({
  className = "",
  delay = 0,
  color = "bg-[var(--color-gold)]",
}: {
  className?: string;
  delay?: number;
  color?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={`block h-px w-full overflow-hidden ${className}`}>
      <motion.span
        className={`block h-px w-full origin-left ${color}`}
        initial={reduced ? undefined : { scaleX: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.1, delay, ease: EASE }}
      />
    </span>
  );
}
