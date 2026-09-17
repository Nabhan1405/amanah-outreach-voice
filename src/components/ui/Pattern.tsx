"use client";

/**
 * AMANAH brand pattern surfaces.
 * ------------------------------------------------------------------
 * The patterns are the official brand tiles. They are used as
 * architecture — embossing, masks, borders, drawn line-work — never
 * as decorative wallpaper. Opacity stays inside 3–8% on any surface
 * that carries text.
 * ------------------------------------------------------------------
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { useRef } from "react";
import { latticePaths } from "@/lib/pattern-paths";

type Tint = "gold" | "navy" | "ivory";

/**
 * A tiled texture laid behind a section. Drifts very slowly with
 * scroll so the surface feels alive rather than printed on.
 */
export function PatternField({
  tile = "03",
  tint = "navy",
  opacity = 0.05,
  size = 620,
  drift = 60,
  className = "",
}: {
  tile?: "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08";
  tint?: Tint;
  opacity?: number;
  size?: number;
  /** Vertical parallax travel in px across the section. */
  drift?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-drift, drift]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute -inset-y-[18%] inset-x-0"
        style={{
          y: reduced ? 0 : y,
          opacity,
          backgroundImage: `url(/patterns/p${tile}-${tint}.svg)`,
          backgroundRepeat: "repeat",
          backgroundSize: `${size}px ${size}px`,
        }}
      />
    </div>
  );
}

/**
 * A single oversized, cropped pattern motif — used as a large
 * geometric composition bleeding off one edge of a section.
 */
export function PatternCrop({
  tile = "05",
  tint = "gold",
  opacity = 0.07,
  className = "",
  rotate = 0,
}: {
  tile?: "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08";
  tint?: Tint;
  opacity?: number;
  className?: string;
  rotate?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute overflow-hidden ${className}`}
    >
      <motion.img
        src={`/patterns/p${tile}-${tint}.svg`}
        alt=""
        className="h-full w-full object-cover"
        style={{
          opacity,
          rotate,
          y: reduced ? 0 : y,
          scale: reduced ? 1.06 : scale,
        }}
      />
    </div>
  );
}

/**
 * The brand lattice drawn as line-work: every path strokes itself on
 * as the section arrives. This is the one place the pattern becomes
 * the subject rather than the texture.
 */
export function PatternDraw({
  className = "",
  stroke = "var(--color-gold)",
  strokeWidth = 1.1,
  opacity = 0.5,
  duration = 2.4,
}: {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 1000"
      className={className}
      fill="none"
      style={{ opacity }}
    >
      {latticePaths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{
            pathLength: {
              duration,
              delay: (i % 12) * 0.05,
              ease: [0.33, 1, 0.68, 1],
            },
            opacity: { duration: 0.4, delay: (i % 12) * 0.05 },
          }}
        />
      ))}
    </svg>
  );
}

/**
 * A pattern used as a mask: the tile becomes the visible area of
 * whatever sits behind it. Reads as embossed rather than applied.
 */
export function PatternMask({
  tile = "03",
  className = "",
  children,
  size = 480,
}: {
  tile?: "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08";
  className?: string;
  children?: React.ReactNode;
  size?: number;
}) {
  const mask = {
    maskImage: `url(/patterns/p${tile}.svg)`,
    WebkitMaskImage: `url(/patterns/p${tile}.svg)`,
    maskSize: `${size}px ${size}px`,
    WebkitMaskSize: `${size}px ${size}px`,
    maskRepeat: "repeat",
    WebkitMaskRepeat: "repeat",
  } as React.CSSProperties;

  return (
    <div aria-hidden className={className} style={mask}>
      {children}
    </div>
  );
}
