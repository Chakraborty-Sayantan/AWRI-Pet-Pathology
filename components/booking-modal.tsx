"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingSpinner } from "./loading-spinner"
import { CalendarIcon, CheckCircle, TestTube } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface BookingModalProps {
  trigger?: React.ReactNode
}

export function BookingModal({ trigger }: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",


    // Test Selection
    selectedTests: [] as string[],
    testPackage: "",

    // Appointment Details
    appointmentType: "lab-visit",
    timeSlot: "",
    specialInstructions: "",

    // Address (for home collection)
    address: "",
    city: "",
    zipCode: "",

    // Payment
    paymentMethod: "card",
    agreeToTerms: false,
  })

  const testPackages = [
    { id: "basic", name: "Basic Health Checkup", price: 99, tests: ["CBC", "Blood Sugar", "Urine Analysis"] },
    {
      id: "comprehensive",
      name: "Comprehensive Panel",
      price: 199,
      tests: ["CBC", "Lipid Profile", "Liver Function", "Kidney Function"],
    },
    {
      id: "executive",
      name: "Executive Health Package",
      price: 299,
      tests: ["All Basic Tests", "Thyroid", "Vitamin D", "ECG"],
    },
    { id: "custom", name: "Custom Selection", price: 0, tests: [] },
  ]

  const timeSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTestSelection = (testId: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        selectedTests: [...prev.selectedTests, testId],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        selectedTests: prev.selectedTests.filter((id) => id !== testId),
      }))
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsBooked(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setIsBooked(false)
      setCurrentStep(1)
      setIsOpen(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        selectedTests: [],
        testPackage: "",
        appointmentType: "lab-visit",
        timeSlot: "",
        specialInstructions: "",
        address: "",
        city: "",
        zipCode: "",
        paymentMethod: "card",
        agreeToTerms: false,
      })
    }, 3000)
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const getSelectedPackage = () => {
    return testPackages.find((pkg) => pkg.id === formData.testPackage)
  }

  if (isBooked) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {trigger || <Button className="bg-blue-600 hover:bg-blue-700">Book Test</Button>}
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-4">
              Your appointment has been scheduled successfully. You'll receive a confirmation email shortly.
            </p>
            <Badge className="bg-blue-100 text-blue-800">
              Booking ID: #BK{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </Badge>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button className="bg-blue-600 hover:bg-blue-700">Book Test</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-blue-600" />
            Book Your Test Appointment
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600",
                )}
              >
                {step}
              </div>
              {step < 4 && <div className={cn("w-16 h-1 mx-2", currentStep > step ? "bg-blue-600" : "bg-gray-200")} />}
            </div>
          ))}
        </div>

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Test Selection */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Select Test Package</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {testPackages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={cn(
                    "cursor-pointer transition-all",
                    formData.testPackage === pkg.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md",
                  )}
                  onClick={() => handleInputChange("testPackage", pkg.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{pkg.name}</h4>
                      <span className="text-lg font-bold text-blue-600">
                        {pkg.price > 0 ? `$${pkg.price}` : "Custom"}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {pkg.tests.map((test, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          • {test}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Appointment Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Appointment Details</h3>

            <div className="space-y-4">
              <Label>Appointment Type</Label>
              <RadioGroup
                value={formData.appointmentType}
                onValueChange={(value) => handleInputChange("appointmentType", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lab-visit" id="lab-visit" />
                  <Label htmlFor="lab-visit">Visit Lab</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="home-collection" id="home-collection" />
                  <Label htmlFor="home-collection">Home Collection (+$20)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Time Slot</Label>
                <Select onValueChange={(value) => handleInputChange("timeSlot", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.appointmentType === "home-collection" && (
              <div className="space-y-4">
                <h4 className="font-medium">Collection Address</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="instructions">Special Instructions</Label>
              <Textarea
                id="instructions"
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                placeholder="Any special requirements or instructions..."
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Step 4: Payment & Confirmation */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Payment & Confirmation</h3>

            {/* Booking Summary */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Package:</span>
                    <span>{getSelectedPackage()?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{selectedDate ? format(selectedDate, "PPP") : "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>{formData.timeSlot || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span>{formData.appointmentType === "lab-visit" ? "Lab Visit" : "Home Collection"}</span>
                  </div>
                  {formData.appointmentType === "home-collection" && (
                    <div className="flex justify-between">
                      <span>Collection Fee:</span>
                      <span>$20</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>
                      ${(getSelectedPackage()?.price || 0) + (formData.appointmentType === "home-collection" ? 20 : 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Label>Payment Method</Label>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => handleInputChange("paymentMethod", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Credit/Debit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Pay at Lab/Cash on Collection</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the terms and conditions and privacy policy
              </Label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!formData.agreeToTerms || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner className="mr-2" size="sm" />
                  Booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
