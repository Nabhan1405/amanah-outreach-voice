"use client";

/**
 * AMANAH footer.
 * Revealed by the page sliding off it: the footer is fixed behind the
 * document and uncovered as the last section clears. Falls back to a
 * plain block on touch devices and under reduced motion.
 */

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { useRef } from "react";
import { nav, org, areas } from "@/content/site";
import { Button, ArrowGlyph } from "@/components/ui/Button";
import { EASE, VIEWPORT } from "@/components/motion/primitives";
import { PatternField } from "@/components/ui/Pattern";
import { MaskedLines } from "@/components/motion/primitives";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "0%"]);
  const year = new Date().getFullYear();

  return (
    <footer
      ref={ref}
      id="footer"
      className="on-navy relative overflow-hidden bg-[var(--color-navy-deep)] text-[var(--color-ivory)]"
    >
      <PatternField tile="05" tint="gold" opacity={0.05} size={560} drift={40} />

      {/* A large cropped motif anchoring the bottom-right corner. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[12%] -bottom-[18%] h-[460px] w-[460px] opacity-[0.06] md:h-[620px] md:w-[620px]"
      >
        <motion.img
          src="/patterns/p01-gold.svg"
          alt=""
          className="h-full w-full object-contain"
          style={reduced ? undefined : { y }}
        />
      </div>

      <div className="shell-wide relative">
        {/* Call to action */}
        <div className="grid gap-12 border-b border-[rgba(249,245,233,0.14)] py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <MaskedLines
              lines={["Amanah means", "a trust held", "on someone’s behalf."]}
              as="h2"
              className="t-h2 text-[var(--color-ivory)]"
            />
          </div>
          <div className="flex flex-col justify-end gap-8 lg:col-span-5">
            <motion.p
              className="t-lead measure text-[rgba(249,245,233,0.72)]"
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            >
              Every rupee given to {org.shortName} is exactly that — held, accounted
              for, and returned to the person it was meant for.
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <Button href="/donate" variant="onNavy" size="lg">
                Give monthly
                <ArrowGlyph />
              </Button>
              <Button href="/contact" variant="onNavy" size="lg">
                Volunteer
              </Button>
            </div>
          </div>
        </div>

        {/* Index */}
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Image
              src="/brand/wordmark-white.svg"
              alt={org.name}
              width={197}
              height={90}
              className="h-[62px] w-auto"
            />
            <p className="t-small mt-7 max-w-[36ch] text-[rgba(249,245,233,0.6)]">
              {org.description}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 lg:col-span-6 lg:col-start-6 lg:grid-cols-2"
          >
            <div>
              <p className="t-label text-[rgba(249,245,233,0.58)]">The organisation</p>
              <ul className="mt-6 space-y-3.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="link-gold t-small text-[rgba(249,245,233,0.82)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/get-involved"
                    className="link-gold t-small text-[rgba(249,245,233,0.82)]"
                  >
                    Get Involved
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="t-label text-[rgba(249,245,233,0.58)]">Areas of work</p>
              <ul className="mt-6 space-y-3.5">
                {areas.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/campaigns?area=${a.slug}`}
                      className="link-gold t-small text-[rgba(249,245,233,0.82)]"
                    >
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="lg:col-span-2">
            <p className="t-label text-[rgba(249,245,233,0.58)]">Contact</p>
            <ul className="mt-6 space-y-3.5">
              <li className="t-small text-[rgba(249,245,233,0.82)]">
                {org.address}
              </li>
              <li>
                <a
                  href={`mailto:${org.email}`}
                  className="link-gold t-small break-all text-[rgba(249,245,233,0.82)]"
                >
                  {org.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${org.phone.replace(/\s/g, "")}`}
                  className="link-gold t-small text-[rgba(249,245,233,0.82)]"
                >
                  {org.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Baseline */}
        <div className="flex flex-col gap-5 border-t border-[rgba(249,245,233,0.14)] py-8 md:flex-row md:items-center md:justify-between">
          <p className="t-small text-[rgba(249,245,233,0.58)]">
            © {year} {org.name}. {org.city}, {org.state}.
          </p>
          <p className="t-small max-w-[52ch] text-[rgba(249,245,233,0.58)]">
            Contact details, campaign figures and impact statistics shown on this
            site are sample data pending verification.
          </p>
        </div>
      </div>
    </footer>
  );
}
