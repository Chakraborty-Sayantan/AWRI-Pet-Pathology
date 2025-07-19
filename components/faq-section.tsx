import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "How long does it take to get test results?",
      answer:
        "Most routine tests are completed within 24-48 hours. Complex tests may take 3-5 business days. Emergency tests can be processed within 2-4 hours with additional charges.",
    },
    {
      question: "Do you offer home collection services?",
      answer:
        "Yes, we provide convenient home collection services for most tests. Our trained phlebotomists will visit your location at your preferred time. Additional charges may apply based on location.",
    },
    {
      question: "What is included in the 30% off indie dogs promotion?",
      answer:
        "The promotion includes comprehensive health panels for independent/mixed breed dogs including blood work, parasite screening, and basic wellness checks. Valid for new customers only.",
    },
    {
      question: "Are your tests covered by insurance?",
      answer:
        "We accept most major insurance plans. We recommend checking with your insurance provider for specific coverage details. We also offer competitive self-pay rates.",
    },
    {
      question: "How can I access my test results?",
      answer:
        "Results are available through our secure online portal, mobile app, or can be sent via email. You'll receive a notification when your results are ready. Physical copies are also available upon request.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Get answers to common questions about our services and processes.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`} className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
