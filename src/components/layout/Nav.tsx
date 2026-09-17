"use client";

/**
 * AMANAH navigation.
 * Minimal over the hero; on scroll it condenses into an ivory bar
 * with a hairline rule and a tightened logo. The mobile panel is a
 * full-screen editorial index, not a stacked desktop menu.
 */

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { useEffect, useState } from "react";
import { nav, org } from "@/content/site";
import { Button, ArrowGlyph } from "@/components/ui/Button";
import { EASE } from "@/components/motion/primitives";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  // Close the panel on navigation, and lock the page behind it.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /** Every route opens on a navy masthead — the homepage hero or the
   *  interior PageHero — so until the ivory bar fades in, the navigation
   *  must be rendered in ivory or it is navy-on-navy. */
  const overMasthead = !scrolled;
  const light = overMasthead || open;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={reduced ? undefined : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: EASE }}
      >
        {/* The bar surface fades in only once the page has moved. */}
        <motion.div
          aria-hidden
          className="absolute inset-0 border-b border-[rgba(14,42,67,0.12)] bg-[rgba(249,245,233,0.92)] backdrop-blur-xl"
          initial={false}
          animate={{ opacity: scrolled && !open ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        />

        <div className="shell-wide relative">
          <div
            className={`flex items-center justify-between transition-[height] duration-[700ms] [transition-timing-function:var(--ease-amanah)] ${
              scrolled ? "h-[72px]" : "h-[96px] md:h-[112px]"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label={`${org.name} — home`}
              className="group relative z-10 flex items-center"
            >
              <motion.span
                className="block"
                animate={{ scale: scrolled ? 0.88 : 1 }}
                style={{ transformOrigin: "left center" }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <Image
                  src={light ? "/brand/wordmark-white.svg" : "/brand/wordmark-navy.svg"}
                  alt={org.name}
                  width={197}
                  height={90}
                  // Above the fold on every route, so it is worth preloading.
                  priority
                  className="h-[46px] w-auto md:h-[54px]"
                />
              </motion.span>
            </Link>

            {/* Desktop links */}
            <nav
              aria-label="Primary"
              className="hidden items-center gap-9 lg:flex"
            >
              {nav.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`link-gold t-label transition-colors duration-500 ${
                      light
                        ? "text-[rgba(249,245,233,0.86)] hover:text-[var(--color-ivory)]"
                        : "text-[rgba(14,42,67,0.72)] hover:text-[var(--color-navy)]"
                    } ${active ? "!text-[var(--color-gold)]" : ""}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <Button
                  href="/donate"
                  size="sm"
                  variant={light ? "onNavy" : "primary"}
                >
                  Donate
                  <ArrowGlyph />
                </Button>
              </div>

              {/* Menu toggle */}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="amanah-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative z-10 -mr-1 flex h-11 w-11 items-center justify-center lg:hidden"
              >
                <span className="relative block h-[9px] w-[26px]">
                  {[0, 1].map((i) => (
                    <motion.span
                      key={i}
                      className={`absolute left-0 block h-px w-full ${
                        light ? "bg-[var(--color-ivory)]" : "bg-[var(--color-navy)]"
                      }`}
                      animate={
                        open
                          ? { top: 4, rotate: i === 0 ? 45 : -45 }
                          : { top: i === 0 ? 0 : 8, rotate: 0 }
                      }
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  ))}
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile / condensed menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="amanah-menu"
            className="fixed inset-0 z-40 bg-[var(--color-navy)]"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: "url(/patterns/p03-gold.svg)",
                backgroundSize: "380px 380px",
              }}
            />
            <div className="shell-wide relative flex h-full flex-col justify-between pt-[120px] pb-12">
              <nav aria-label="Menu">
                <ul>
                  {nav.map((item, i) => (
                    <motion.li
                      key={item.href}
                      className="overflow-hidden border-b border-[rgba(249,245,233,0.14)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.18 + i * 0.05, duration: 0.5 }}
                    >
                      <motion.span
                        className="block"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{
                          delay: 0.2 + i * 0.055,
                          duration: 0.8,
                          ease: EASE,
                        }}
                      >
                        <Link
                          href={item.href}
                          className="group flex items-baseline justify-between py-4 text-[var(--color-ivory)] md:py-5"
                        >
                          <span className="t-h3 font-display">{item.label}</span>
                          <span className="t-label text-[rgba(249,245,233,0.58)]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </Link>
                      </motion.span>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                className="flex flex-col gap-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
              >
                <Button href="/donate" variant="onNavy" size="lg">
                  Donate
                  <ArrowGlyph />
                </Button>
                <p className="t-small max-w-[34ch] text-[rgba(249,245,233,0.58)]">
                  {org.city}, {org.state} — {org.microTagline}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
