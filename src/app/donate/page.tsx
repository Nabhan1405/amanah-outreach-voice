import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/layout/PageHero";
import DonateScreen from "@/components/sections/DonateScreen";
import Transparency from "@/components/sections/Transparency";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support the work of Amanah Outreach Voice — monthly or one-off, directed to a campaign or to wherever it is needed most.",
};

export default function DonatePage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Give"
        lines={["A gift is", "a trust."]}
        standfirst="Every rupee is accounted for from the moment it arrives to the moment it reaches the person it was meant for."
      />
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <DonateScreen />
      </Suspense>
      <Transparency />
    </>
  );
}
