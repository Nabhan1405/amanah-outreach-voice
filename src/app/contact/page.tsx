import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import { Section, Eyebrow, ParallaxImage, PlaceholderNote } from "@/components/ui/Kit";
import { MaskedLines, Reveal } from "@/components/motion/primitives";
import { PatternField } from "@/components/ui/Pattern";
import { org } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Amanah Outreach Voice in ${org.city}, ${org.state} — refer a case, volunteer, or ask about a campaign.`,
};

const routes = [
  {
    label: "Refer a case",
    body: "Tell us about a household that needs support. The first step is a conversation, not a form.",
  },
  {
    label: "Volunteer",
    body: "Home visits, documentation, tuition, distribution and veterinary support. Volunteers are trained and matched to a standing role.",
  },
  {
    label: "Partner or sponsor",
    body: "Schools, clinics, employers and institutions who can refer cases, absorb costs or open a route into work.",
  },
  {
    label: "Ask about a campaign",
    body: "If you funded something and want to know what happened, ask. We will tell you.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow={`${org.city}, ${org.state}`}
        lines={["Start with", "a conversation."]}
        standfirst="Whether you are referring a household, offering time, or asking what happened to a case you funded — write to us."
      />

      <Section tone="paper" pad="md">
        <PatternField tile="07" tint="navy" opacity={0.035} size={700} drift={40} />
        <div className="shell-wide relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* ---- Form ---- */}
            <div className="lg:col-span-7">
              <Eyebrow>Write to us</Eyebrow>
              <MaskedLines
                lines={["Tell us what", "you have in mind."]}
                as="h2"
                className="t-h2 mt-6 text-[var(--color-navy)]"
              />
              <div className="mt-12">
                <ContactForm />
              </div>
            </div>

            {/* ---- Details ---- */}
            <aside className="lg:col-span-4 lg:col-start-9">
              <ParallaxImage
                src="/images/work-livelihood.jpg"
                alt="Volunteers handing provisions to families at a neighbourhood distribution."
                className="aspect-[4/3] w-full"
                sizes="(max-width: 1024px) 100vw, 33vw"
                travel={7}
              />

              <Reveal delay={0.15}>
                <div className="mt-10">
                  <p className="t-label text-[rgba(14,42,67,0.7)]">Details</p>
                  <ul className="mt-5 space-y-4">
                    <li className="t-body text-[var(--color-navy)]">
                      {org.address}
                    </li>
                    <li>
                      <a
                        href={`mailto:${org.email}`}
                        className="link-gold t-body break-all text-[var(--color-navy)]"
                      >
                        {org.email}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${org.phone.replace(/\s/g, "")}`}
                        className="link-gold t-body text-[var(--color-navy)]"
                      >
                        {org.phone}
                      </a>
                    </li>
                  </ul>
                  <PlaceholderNote className="mt-6">
                    Contact details are placeholders. Replace them in
                    <code className="mx-1 font-mono text-[0.72rem]">
                      src/content/site.ts
                    </code>
                    before publishing.
                  </PlaceholderNote>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-12 border-t border-[rgba(14,42,67,0.2)]">
                  {routes.map((r) => (
                    <div
                      key={r.label}
                      className="border-b border-[rgba(14,42,67,0.2)] py-6"
                    >
                      <h3 className="t-label flex items-center gap-2.5 text-[var(--color-navy)]">
                        <span
                          aria-hidden
                          className="block h-1 w-1 rotate-45 bg-[var(--color-gold)]"
                        />
                        {r.label}
                      </h3>
                      <p className="t-small mt-2.5 text-[rgba(14,42,67,0.7)]">
                        {r.body}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </Section>
    </>
  );
}
