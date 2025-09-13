import { Card, CardContent } from "@/components/ui/card"
import { ClipboardList, TestTube, Microscope, FileText } from "lucide-react"
import { FadeInSection } from "./fade-in-section"

export function WorkflowSection() {
  const workflowSteps = [
    {
      icon: ClipboardList,
      title: "1. Book Test",
      description: "Schedule your test online or visit our lab. Choose from our comprehensive test packages.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: TestTube,
      title: "2. Sample Collection",
      description: "Professional sample collection at our lab or convenient home collection service.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Microscope,
      title: "3. Analysis",
      description: "Advanced testing with state-of-the-art equipment and expert pathologist review.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: FileText,
      title: "4. Results",
      description: "Receive accurate results digitally with detailed explanations and recommendations.",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Streamlined Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From sample collection to result delivery, we ensure a seamless experience with the highest standards of
            accuracy and efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {workflowSteps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <FadeInSection key={index} delay={index * 200}>
                <Card className="bg-transparent text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                  <CardContent className="space-y-4">
                    <div className={`${step.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                      <IconComponent className={`h-8 w-8 ${step.iconColor} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`} />
                    </div>
                    <h3 className="text-xl text-gray-900 font-semibold">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </FadeInSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
