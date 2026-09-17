"use client";

/**
 * AMANAH buttons.
 * ------------------------------------------------------------------
 * Squared, hairline-ruled, institutional. No pills, no gradients, no
 * drop shadows. The primary action fills from the left on hover; the
 * secondary reveals a gold rule. Both are gently magnetic on a fine
 * pointer, and completely still on touch or reduced motion.
 * ------------------------------------------------------------------
 */

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { useRef, type ReactNode, type MouseEvent } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onNavy";
type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[0.7rem]",
  md: "px-7 py-3.5 text-[0.75rem]",
  lg: "px-9 py-4.5 text-[0.78rem]",
};

const variants: Record<Variant, string> = {
  primary:
    "border border-[var(--color-navy)] text-[var(--color-navy)] hover:text-[var(--color-ivory)]",
  secondary:
    "border border-[rgba(14,42,67,0.28)] text-[var(--color-navy)] hover:border-[var(--color-gold)]",
  onNavy:
    "border border-[rgba(249,245,233,0.32)] text-[var(--color-ivory)] hover:text-[var(--color-navy)] hover:border-[var(--color-gold)]",
  ghost: "text-[var(--color-navy)] hover:text-[var(--color-gold-deep)]",
};

/** The sliding fill layer, per variant. */
const fills: Record<Variant, string> = {
  primary: "bg-[var(--color-navy)]",
  secondary: "bg-[rgba(214,170,41,0.12)]",
  onNavy: "bg-[var(--color-gold)]",
  ghost: "bg-transparent",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled,
  magnetic = true,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  magnetic?: boolean;
  "aria-label"?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 22, mass: 0.4 });

  const enabled = magnetic && !reduced;

  function handleMove(e: MouseEvent) {
    if (!enabled || !ref.current) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const r = ref.current.getBoundingClientRect();
    // A restrained pull — at most a few pixels.
    mx.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 10);
    my.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 7);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  const inner = (
    <motion.span
      ref={ref}
      style={enabled ? { x, y } : undefined}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={[
        "group/btn relative inline-flex items-center justify-center overflow-hidden",
        "t-label whitespace-nowrap transition-colors duration-500",
        "[transition-timing-function:var(--ease-amanah)]",
        sizes[size],
        variants[variant],
        disabled ? "pointer-events-none opacity-45" : "",
        className,
      ].join(" ")}
    >
      {variant !== "ghost" && (
        <span
          aria-hidden
          className={[
            "absolute inset-0 origin-left scale-x-0 transition-transform duration-[650ms]",
            "[transition-timing-function:var(--ease-amanah)]",
            "group-hover/btn:scale-x-100 group-focus-visible/btn:scale-x-100",
            fills[variant],
          ].join(" ")}
        />
      )}
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </motion.span>
  );

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a
          href={href}
          aria-label={ariaLabel}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex"
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className="inline-flex">
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="inline-flex"
    >
      {inner}
    </button>
  );
}

/** A small arrow that eases forward on hover of its parent `.group`. */
export function ArrowGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 10"
      aria-hidden
      className={`h-[0.6em] w-auto overflow-visible ${className}`}
      fill="none"
    >
      <path
        d="M0 5h22M17.5 0.5 22 5l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.2"
        className="transition-transform duration-[600ms] [transition-timing-function:var(--ease-amanah)] group-hover:translate-x-[3px] group-hover/btn:translate-x-[3px]"
      />
    </svg>
  );
}
