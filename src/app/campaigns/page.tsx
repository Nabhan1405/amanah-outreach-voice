import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/layout/PageHero";
import CampaignIndex from "@/components/sections/CampaignIndex";
import GetInvolved from "@/components/sections/GetInvolved";

export const metadata: Metadata = {
  title: "Campaigns",
  description:
    "Open campaigns from Amanah Outreach Voice — education, health, elderly care, inclusion, animal welfare and emergency livelihood support.",
};

export default function CampaignsPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Open campaigns"
        lines={["Named costs,", "for named people."]}
        standfirst="Each campaign funds a specific, verified set of costs. Every one has been through a home visit and a committee decision before it appeared here."
      />
      {/* useSearchParams needs a Suspense boundary during prerender. */}
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <CampaignIndex />
      </Suspense>
      <GetInvolved />
    </>
  );
}
