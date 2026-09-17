import { Button, ArrowGlyph } from "@/components/ui/Button";
import { PatternField } from "@/components/ui/Pattern";
import { MaskedLines } from "@/components/motion/primitives";

export default function NotFound() {
  return (
    <section className="on-navy relative flex min-h-[90svh] items-center overflow-hidden bg-[var(--color-navy)] pt-[120px] pb-20 text-[var(--color-ivory)]">
      <PatternField tile="03" tint="gold" opacity={0.038} size={820} drift={40} />
      <div className="shell-wide relative">
        <p className="t-label flex items-center gap-3 text-[rgba(249,245,233,0.6)]">
          <span aria-hidden className="block h-px w-10 bg-[var(--color-gold)]" />
          404
        </p>
        <MaskedLines
          lines={["This page is not", "where it was."]}
          as="h1"
          className="t-h1 mt-7 text-[var(--color-ivory)]"
        />
        <p className="t-lead measure mt-7 text-[rgba(249,245,233,0.72)]">
          The link may be old, or the campaign it pointed to may have closed.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/" variant="onNavy" size="lg">
            Back to the homepage
            <ArrowGlyph />
          </Button>
          <Button href="/campaigns" variant="onNavy" size="lg">
            Open campaigns
          </Button>
        </div>
      </div>
    </section>
  );
}
