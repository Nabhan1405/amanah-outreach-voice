import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import GetInvolved from "@/components/sections/GetInvolved";
import EmotiveBand from "@/components/sections/EmotiveBand";
import Impact from "@/components/sections/Impact";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Give monthly, volunteer, or partner with Amanah Outreach Voice in Mangalore, Karnataka.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Get involved"
        lines={["Useful is better", "than generous."]}
        standfirst="The most valuable thing a supporter can give us is predictability — a standing gift, a standing role, or a standing referral."
      />
      <GetInvolved />
      <Impact />
      <EmotiveBand />
    </>
  );
}
