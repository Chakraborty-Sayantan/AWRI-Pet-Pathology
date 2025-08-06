import { StickyHoursBanner } from "@/components/sticky-hours-banner"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { NavigationBar } from "@/components/navigation-bar"
import { TypewriterText } from "@/components/typewriter-text"
import { HeroSection } from "@/components/hero-section"
import { SymptomsTestSection } from "@/components/symptoms-tests"
import { WorkflowSection } from "@/components/workflow-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { FooterSection } from "@/components/footer-section"
import { ContactForm } from "@/components/contact-form"
import { SearchSection } from "@/components/search-section"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function PathologicalLabPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <StickyHoursBanner />
      <NavigationBar />

      {/* Typewriter Text Section */}
      <section className="bg-transparent py-8">
        <div className="container mx-auto px-4 text-center">
          <TypewriterText
            text="Designed for Pets, Loved By Pet Parents."
            speed={80}
            className="text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-[#439CFB] to-[#F187FB] bg-clip-text text-transparent px-4 py-2"
          />
        </div>
      </section>
      <Analytics/>
      <SpeedInsights />
      <HeroSection />
      <SymptomsTestSection />
      <WorkflowSection />
      <TestimonialsSection />
      <FAQSection />
      <FooterSection />
      <ScrollToTop />
    </div>
  )
}
