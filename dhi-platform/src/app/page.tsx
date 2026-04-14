import { HeroSection } from "@/components/sections/HeroSection"
import { StatsSection } from "@/components/sections/StatsSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { VisionSection } from "@/components/sections/VisionSection"
import { InitiativesSection } from "@/components/sections/InitiativesSection"
import { ImpulseSection } from "@/components/sections/ImpulseSection"
import { EventsSection } from "@/components/sections/EventsSection"
import { PlansSection } from "@/components/sections/PlansSection"
import { ArticlesSection } from "@/components/sections/ArticlesSection"
import { CTASection } from "@/components/sections/CTASection"

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <VisionSection />
      <InitiativesSection />
      <ImpulseSection />
      <EventsSection />
      <PlansSection />
      <ArticlesSection />
      <CTASection />
    </>
  )
}
