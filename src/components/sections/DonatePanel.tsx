"use client";

/**
 * Donation module.
 * Institutional rather than ecommerce: hairline boxes, tabular
 * figures, no urgency devices, no basket. It is a form for a
 * commitment, not a checkout.
 *
 * No payment gateway is connected. Submitting records the intent in
 * component state and tells the visitor plainly what will happen.
 */

import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { useId, useState, type FormEvent } from "react";
import { Button, ArrowGlyph } from "@/components/ui/Button";
import { PlaceholderNote } from "@/components/ui/Kit";
import { formatINR } from "@/lib/format";
import { EASE } from "@/components/motion/primitives";

const AMOUNTS = [500, 1500, 5000, 10000];

export default function DonatePanel({
  campaign,
  compact = false,
  defaultFrequency = "monthly",
  defaultAmount = 1500,
}: {
  campaign?: string;
  compact?: boolean;
  defaultFrequency?: "once" | "monthly";
  defaultAmount?: number;
}) {
  const [frequency, setFrequency] = useState<"once" | "monthly">(defaultFrequency);
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [custom, setCustom] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();
  const customId = useId();

  const effective = custom ? Number(custom) || 0 : amount;
  const valid = effective >= 100;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* ---- Frequency ---- */}
      <fieldset>
        <legend className="t-label text-[rgba(14,42,67,0.7)]">Frequency</legend>
        <div className="mt-4 grid grid-cols-2 border border-[rgba(14,42,67,0.18)]">
          {(["monthly", "once"] as const).map((f) => {
            const active = frequency === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFrequency(f)}
                aria-pressed={active}
                className={`relative px-4 py-3.5 transition-colors duration-500 [transition-timing-function:var(--ease-amanah)] ${
                  f === "once" ? "border-l border-[rgba(14,42,67,0.18)]" : ""
                } ${active ? "text-[var(--color-navy)]" : "text-[rgba(14,42,67,0.7)] hover:text-[var(--color-navy)]"}`}
              >
                {active && (
                  <motion.span
                    layoutId={`freq-${compact ? "c" : "f"}`}
                    aria-hidden
                    className="absolute inset-0 bg-[rgba(214,170,41,0.14)]"
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                )}
                <span className="t-label relative">
                  {f === "monthly" ? "Monthly" : "One-off"}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* ---- Amount ---- */}
      <fieldset className="mt-7">
        <legend className="t-label text-[rgba(14,42,67,0.7)]">Amount</legend>
        <div
          className={`mt-4 grid gap-px ${compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"}`}
        >
          {AMOUNTS.map((a) => {
            const active = !custom && amount === a;
            return (
              <button
                key={a}
                type="button"
                onClick={() => {
                  setAmount(a);
                  setCustom("");
                }}
                aria-pressed={active}
                className={[
                  "t-num font-display border px-4 py-4 text-left text-[1.15rem] leading-none",
                  "transition-colors duration-500 [transition-timing-function:var(--ease-amanah)]",
                  active
                    ? "border-[var(--color-gold)] bg-[rgba(214,170,41,0.1)] text-[var(--color-navy)]"
                    : "border-[rgba(14,42,67,0.18)] text-[rgba(14,42,67,0.72)] hover:border-[rgba(14,42,67,0.45)]",
                ].join(" ")}
              >
                {formatINR(a)}
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          <label htmlFor={customId} className="t-label sr-only">
            Other amount in rupees
          </label>
          <div className="flex items-center border border-[rgba(14,42,67,0.18)] focus-within:border-[var(--color-gold)]">
            <span className="t-label border-r border-[rgba(14,42,67,0.18)] px-4 py-4 text-[rgba(14,42,67,0.7)]">
              ₹
            </span>
            <input
              id={customId}
              type="number"
              min={100}
              step={100}
              inputMode="numeric"
              placeholder="Other amount"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              className="t-num w-full bg-transparent px-4 py-4 text-[0.95rem] text-[var(--color-navy)] outline-none placeholder:text-[rgba(14,42,67,0.7)] placeholder:font-normal"
            />
          </div>
          {custom && !valid && (
            <p className="t-small mt-2.5 text-[var(--color-gold-deep)]" role="alert">
              Please enter ₹100 or more.
            </p>
          )}
        </div>
      </fieldset>

      {/* ---- Summary + submit ---- */}
      <div className="mt-8 border-t border-[rgba(14,42,67,0.18)] pt-7">
        <p className="t-body text-[rgba(14,42,67,0.7)]">
          {valid ? (
            <>
              <span className="t-num font-medium text-[var(--color-navy)]">
                {formatINR(effective)}
              </span>{" "}
              {frequency === "monthly" ? "every month" : "as a one-off gift"}
              {campaign ? (
                <>
                  , towards{" "}
                  <span className="text-[var(--color-navy)]">{campaign}</span>.
                </>
              ) : (
                ", to wherever it is needed most."
              )}
            </>
          ) : (
            "Choose an amount to continue."
          )}
        </p>

        <div className="mt-6">
          <Button type="submit" variant="primary" size="lg" disabled={!valid}>
            Continue
            <ArrowGlyph />
          </Button>
        </div>

        <AnimatePresence>
          {submitted && (
            <motion.div
              role="status"
              className="mt-6 border-l-2 border-[var(--color-gold)] bg-[rgba(214,170,41,0.08)] px-5 py-4"
              initial={reduced ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="t-small text-[var(--color-navy)]">
                Thank you — your intent to give {formatINR(effective)}{" "}
                {frequency === "monthly" ? "monthly" : "once"} has been recorded
                in this demo. No payment has been taken and no card details were
                requested.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!compact && (
          <PlaceholderNote className="mt-7">
            This form is a demonstration. Connect a payment provider before
            accepting real donations, and never collect card details outside a
            hosted gateway.
          </PlaceholderNote>
        )}
      </div>
    </form>
  );
}
