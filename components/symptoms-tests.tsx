"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookingModal } from "./booking-modal"
import { FadeInSection } from "./fade-in-section"

interface Symptom {
  id: string
  name: string
  selected: boolean
}

interface TestRecommendation {
  id: string
  name: string
  code: string
  price: number
}

const symptoms: Symptom[] = [
  { id: "fatigue", name: "Fatigue", selected: false },
  { id: "loss-appetite", name: "Loss of Appetite", selected: false },
  { id: "fever", name: "Fever", selected: false },
  { id: "weakness", name: "Weakness", selected: false },
  { id: "weight-loss", name: "Weight Loss", selected: false },
  { id: "weight-gain", name: "Weight Gain", selected: false },
  { id: "blood-urine", name: "Blood in Urine", selected: false },
  { id: "blood-fecal", name: "Blood in Fecal", selected: false },
]

const testRecommendations: Record<string, TestRecommendation[]> = {
  fatigue: [
    { id: "cbc", name: "Complete Blood Count", code: "AWRI 02", price: 400 },
    { id: "thyroid", name: "Thyroid Profile", code: "AWRI 108", price: 400 },
    { id: "iron", name: "Iron Studies", code: "AWRI 11", price: 1200 },
  ],
  "loss-appetite": [
    { id: "lft", name: "Liver Function Test", code: "AWRI 48", price: 700 },
    { id: "kft", name: "Kidney Function Test", code: "AWRI 47", price: 700 },
    { id: "glucose", name: "Glucose Fasting", code: "AWRI 26", price: 120 },
  ],
  fever: [
    { id: "cbc", name: "Complete Blood Count", code: "AWRI 02", price: 400 },
    { id: "blood-culture", name: "Blood Culture", code: "AWRI 96", price: 950 },
    { id: "crp", name: "C-Reactive Protein", code: "AWRI 124", price: 350 },
  ],
  weakness: [
    { id: "cbc", name: "Complete Blood Count", code: "AWRI 02", price: 400 },
    { id: "electrolytes", name: "Electrolytes Panel", code: "AWRI 46", price: 360 },
    { id: "vitamin-b12", name: "Vitamin B12", code: "AWRI 44", price: 1300 },
  ],
  "weight-loss": [
    { id: "thyroid", name: "Thyroid Profile", code: "AWRI 108", price: 400 },
    { id: "glucose", name: "Glucose Fasting", code: "AWRI 26", price: 120 },
    { id: "lipid", name: "Lipid Profile", code: "AWRI 45", price: 880 },
  ],
  "weight-gain": [
    { id: "thyroid", name: "Thyroid Profile", code: "AWRI 108", price: 400 },
    { id: "cortisol", name: "Cortisol", code: "AWRI 111", price: 500 },
    { id: "glucose", name: "Glucose Fasting", code: "AWRI 26", price: 120 },
  ],
  "blood-urine": [
    { id: "urine-re", name: "Urine Routine Examination", code: "AWRI 54", price: 150 },
    { id: "kft", name: "Kidney Function Test", code: "AWRI 47", price: 700 },
    { id: "urine-culture", name: "Urine Culture", code: "AWRI 102", price: 750 },
  ],
  "blood-fecal": [
    { id: "stool-occult", name: "Stool Occult Blood", code: "AWRI 61", price: 200 },
    { id: "stool-re", name: "Stool Routine Examination", code: "AWRI 62", price: 150 },
    { id: "cbc", name: "Complete Blood Count", code: "AWRI 02", price: 400 },
  ],
}

export function SymptomsTestSection() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId) ? prev.filter((id) => id !== symptomId) : [...prev, symptomId],
    )
  }

  const getRecommendedTests = () => {
    const allTests = new Map<string, TestRecommendation>()

    selectedSymptoms.forEach((symptomId) => {
      const tests = testRecommendations[symptomId] || []
      tests.forEach((test) => {
        allTests.set(test.id, test)
      })
    })

    return Array.from(allTests.values())
  }

  const recommendedTests = getRecommendedTests()

  return (
    <FadeInSection>
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Symptoms Related Test Recommendation
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Use our Dynamic table to find what test is recommended for your Pet's Symptoms
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Symptoms Section */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-6 py-3 rounded-full font-semibold text-lg">
                  Symptoms
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {symptoms.map((symptom) => (
                  <Card
                    key={symptom.id}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedSymptoms.includes(symptom.id)
                        ? "bg-gray-800 text-white border-gray-800"
                        : "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                    }`}
                    onClick={() => toggleSymptom(symptom.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <span className="font-medium">{symptom.name}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Test Recommendations Section */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-6 py-3 rounded-full font-semibold text-lg">
                  Test Recommendations
                </div>
              </div>

              <div className="space-y-4 min-h-[300px]">
                {recommendedTests.length > 0 ? (
                  recommendedTests.map((test) => (
                    <Card
                      key={test.id}
                      className="bg-blue-500 text-white border-blue-500 hover:bg-blue-600 transition-all duration-300 hover:scale-105"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold">{test.name}</h4>
                            <p className="text-sm opacity-90">{test.code}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-bold">₹{test.price}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                    <p className="text-lg">Select symptoms to see test recommendations</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Book Test Button */}
          <div className="text-center mt-12">
            <Button
              onClick={() => setIsBookingModalOpen(true)}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
            >
              Book Test
            </Button>
          </div>
        </div>

        <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
      </section>
    </FadeInSection>
  )
}
