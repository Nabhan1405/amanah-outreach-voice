"use client";

/**
 * The single seam through which the whole site asks "should this move?".
 *
 * Every component imports the hook from here rather than from
 * framer-motion directly, so the motion policy lives in one place: if
 * the visitor has asked their system for reduced motion, every
 * entrance, parallax, counter and marquee on the site collapses to a
 * plain static render.
 */

export { useReducedMotion } from "framer-motion";
