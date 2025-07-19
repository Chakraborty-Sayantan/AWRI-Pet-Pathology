import { StickyHoursBanner } from "@/components/sticky-hours-banner"
import { NavigationBar } from "@/components/navigation-bar"
import { HeroSection } from "@/components/hero-section"
import { WorkflowSection } from "@/components/workflow-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { FooterSection } from "@/components/footer-section"
import { ContactForm } from "@/components/contact-form"
import { SearchSection } from "@/components/search-section"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function PathologicalLabPage() {
  return (
    
    <div className="min-h-screen">
      <StickyHoursBanner />
      <NavigationBar />
      <HeroSection />
      <WorkflowSection />
      <TestimonialsSection />
      <FAQSection />
      <FooterSection />
      <ScrollToTop />
    </div>
  )
}