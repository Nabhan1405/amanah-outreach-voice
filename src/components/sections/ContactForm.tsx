"use client";

/**
 * Contact form.
 * Underlined fields with a gold focus rule — the same design
 * language as the rest of the site. No backend is connected; the
 * form validates, then states plainly that nothing was transmitted.
 */

import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion-mode";
import { useId, useState, type FormEvent } from "react";
import { Button, ArrowGlyph } from "@/components/ui/Button";
import { PlaceholderNote } from "@/components/ui/Kit";
import { EASE } from "@/components/motion/primitives";

const SUBJECTS = [
  "Refer a case",
  "Volunteer",
  "Partner or sponsor",
  "Ask about a campaign",
  "Something else",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const reduced = useReducedMotion();
  const ids = {
    name: useId(),
    email: useId(),
    subject: useId(),
    message: useId(),
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};

    if (!String(data.get("name") ?? "").trim()) next.name = "Please tell us your name.";
    const email = String(data.get("email") ?? "").trim();
    if (!email) next.email = "We need an address to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "That does not look like an email address.";
    if (String(data.get("message") ?? "").trim().length < 10)
      next.message = "A sentence or two would help.";

    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      e.currentTarget.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="grid gap-9 md:grid-cols-2">
        <Field
          id={ids.name}
          name="name"
          label="Your name"
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id={ids.email}
          name="email"
          type="email"
          label="Email"
          error={errors.email}
          autoComplete="email"
        />
      </div>

      {/* Subject */}
      <div className="mt-9">
        <label htmlFor={ids.subject} className="t-label text-[rgba(14,42,67,0.7)]">
          What is this about?
        </label>
        <div className="relative mt-3">
          <select
            id={ids.subject}
            name="subject"
            defaultValue={SUBJECTS[0]}
            className="t-body w-full appearance-none border-b border-[rgba(14,42,67,0.28)] bg-transparent py-3 pr-8 text-[var(--color-navy)] outline-none transition-colors duration-500 focus:border-[var(--color-gold)]"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-1 block h-1.5 w-1.5 -translate-y-1/2 rotate-45 border-r border-b border-[rgba(14,42,67,0.5)]"
          />
        </div>
      </div>

      {/* Message */}
      <div className="mt-9">
        <label htmlFor={ids.message} className="t-label text-[rgba(14,42,67,0.7)]">
          Message
        </label>
        <textarea
          id={ids.message}
          name="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${ids.message}-err` : undefined}
          className="t-body mt-3 w-full resize-y border-b border-[rgba(14,42,67,0.28)] bg-transparent py-3 text-[var(--color-navy)] outline-none transition-colors duration-500 focus:border-[var(--color-gold)]"
        />
        {errors.message && (
          <p
            id={`${ids.message}-err`}
            role="alert"
            className="t-small mt-2.5 text-[var(--color-gold-deep)]"
          >
            {errors.message}
          </p>
        )}
      </div>

      <div className="mt-11 flex flex-wrap items-center gap-6">
        <Button type="submit" variant="primary" size="lg">
          Send message
          <ArrowGlyph />
        </Button>

        <AnimatePresence>
          {sent && (
            <motion.p
              role="status"
              className="t-small max-w-[34ch] border-l-2 border-[var(--color-gold)] pl-4 text-[var(--color-navy)]"
              initial={reduced ? undefined : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              Thank you. This form is a demonstration — nothing was transmitted.
              Connect a mail handler to receive messages.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <PlaceholderNote className="mt-8">
        No form backend is connected. Wire this to your mail service or a route
        handler before publishing.
      </PlaceholderNote>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  error,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="t-label text-[rgba(14,42,67,0.7)]">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className="t-body mt-3 w-full border-b border-[rgba(14,42,67,0.28)] bg-transparent py-3 text-[var(--color-navy)] outline-none transition-colors duration-500 focus:border-[var(--color-gold)]"
      />
      {error && (
        <p
          id={`${id}-err`}
          role="alert"
          className="t-small mt-2.5 text-[var(--color-gold-deep)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}
