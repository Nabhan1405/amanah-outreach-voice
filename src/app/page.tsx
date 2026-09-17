import Hero from "@/components/sections/Hero";
import FeaturedCampaign from "@/components/sections/FeaturedCampaign";
import Philosophy from "@/components/sections/Philosophy";
import Impact from "@/components/sections/Impact";
import AreasOfWork from "@/components/sections/AreasOfWork";
import Stories from "@/components/sections/Stories";
import Verification from "@/components/sections/Verification";
import EmotiveBand from "@/components/sections/EmotiveBand";
import Transparency from "@/components/sections/Transparency";
import GetInvolved from "@/components/sections/GetInvolved";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCampaign />
      <Philosophy />
      <Impact />
      <AreasOfWork />
      <Stories />
      <Verification />
      <EmotiveBand />
      <Transparency />
      <GetInvolved />
    </>
  );
}
