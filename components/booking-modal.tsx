"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle, Search, TestTube, X } from "lucide-react"
import { LoadingSpinner } from "./loading-spinner"


export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTests?: { id: string; name: string; price: number; category: string }[];
}

export function BookingModal({ isOpen, onClose, preselectedTests = [] }: BookingModalProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [confirmedBookingId, setConfirmedBookingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    selectedTests: [] as Array<{ id: string; name: string; price: number; category: string }>,
    testPackage: "",
    appointmentType: "home-collection",
    timeSlot: "",
    specialInstructions: "",
    address: "",
    city: "",
    locality: "",
    zipCode: "",
    paymentMethod: "cash",
    agreeToTerms: false,
    discount: 0,
  })

  // New state for search and filter functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedTest, setSelectedTest] = useState("");
  const [testAdded, setTestAdded] = useState(false);


  useEffect(() => {
    if (preselectedTests.length > 0) {
      setFormData((prev) => ({
        ...prev,
        selectedTests: preselectedTests,
      }));
      if (preselectedTests.length > 0) {
        setTestAdded(true);
      }
    }
  }, [preselectedTests, isOpen]);


  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    locality: "",
    zipCode: "",
    timeSlot: "",
    selectedDate: "",
    discount: "",
  });

const testCategories: Record<string, { id: string; name: string; price: number }[]> = {
    "All Categories": [],
    "HEMATOLOGY & COAGULATION": [
      { id: "AWRI01", name: "HEMOGLOBIN; HB", price: 150 },
      { id: "AWRI02", name: "COMPLETE BLOOD COUNT; CBC", price: 400 },
      { id: "AWRI03", name: "HEMOGRAM *CBC * ESR", price: 450 },
      { id: "AWRI04", name: "DLC (DIFFERENTIAL LEUCOCYTE COUNT)", price: 150 },
      { id: "AWRI05", name: "TLC ( TOTAL LEUCOCYTE COUNT)", price: 170 },
      { id: "AWRI06", name: "PLATELET COUNT", price: 150 },
      { id: "AWRI07", name: "BLOOD SMEAR -HEAMOPROTOZOAN", price: 300 },
      { id: "AWRI08", name: "KNOTT'S HEARTWORM TEST", price: 400 },
      { id: "AWRI09", name: "PROTHROMBIN TIME STUDIES", price: 500 },
      { id: "AWRI10", name: "PARTIAL THROMBOPLASTIN TIME, ACTIVATED; PTT; APTT", price: 600 },
      {
        id: "AWRI11",
        name: "IRON STUDIES ( SERUM IRON, TOTAL IRON BINDING CAPACITY & TRANSFERRIN SATURATION",
        price: 1200,
      },
      { id: "AWRI12", name: "RETICULOCYTE COUNT", price: 350 },
    ],
    BIOCHEMISTRY: [
      { id: "AWRI13", name: "PROTEIN, TOTAL, SERUM *TOTAL PROTEIN *ALBUMIN *A : G RATIO", price: 150 },
      { id: "AWRI14", name: "ALBUMIN, SERUM", price: 130 },
      { id: "AWRI15", name: "AMYLASE, SERUM", price: 400 },
      { id: "AWRI16", name: "LIPASE, SERUM", price: 580 },
      { id: "AWRI17", name: "BICARBONATE", price: 550 },
      { id: "AWRI18", name: "BILIRUBIN, DIRECT", price: 140 },
      { id: "AWRI19", name: "BILIRUBIN TOTAL", price: 150 },
      { id: "AWRI20", name: "BILIRUBIN TOTAL, DIRECT & INDIRECT", price: 250 },
      { id: "AWRI21", name: "ALKALINE PHOSPHATASE; ALP", price: 150 },
      { id: "AWRI22", name: "AMMONIA, BLOOD", price: 950 },
      { id: "AWRI23", name: "SGOT", price: 150 },
      { id: "AWRI24", name: "SGPT", price: 150 },
      { id: "AWRI25", name: "GGTP; GGT; GAMMA GT; GAMMA GLUTAMYL TRANSPEPTIDASE", price: 250 },
      { id: "AWRI26", name: "GLUCOSE FASTING (F)", price: 120 },
      { id: "AWRI27", name: "GLUCOSE, RANDOM", price: 120 },
      { id: "AWRI28", name: "GLUCOSE, POSTPRANDIAL (PP), 2 HOURS", price: 120 },
      { id: "AWRI29", name: "CHOLESTEROL, TOTAL", price: 180 },
      { id: "AWRI30", name: "CHOLESTEROL, HDL, DIRECT", price: 220 },
      { id: "AWRI31", name: "CHOLESTEROL, LDL, DIRECT", price: 220 },
      { id: "AWRI32", name: "TRIGLYCERIDES, SERUM", price: 260 },
      { id: "AWRI33", name: "MAGNESIUM, SERUM", price: 450 },
      { id: "AWRI34", name: "CALCIUM, SERUM", price: 150 },
      { id: "AWRI35", name: "CHLORIDE, SERUM", price: 150 },
      { id: "AWRI36", name: "PHOSPHORUS, SERUM", price: 150 },
      { id: "AWRI37", name: "POTASSIUM, SERUM", price: 150 },
      { id: "AWRI38", name: "SODIUM, SERUM", price: 150 },
      { id: "AWRI39", name: "UREA , SERUM", price: 150 },
      { id: "AWRI40", name: "BUN; BLOOD UREA NITROGEN", price: 150 },
      { id: "AWRI41", name: "CREATININE, SERUM", price: 150 },
      { id: "AWRI42", name: "URIC ACID, SERUM", price: 150 },
      { id: "AWRI43", name: "Vitamin D, 25 - Hydroxy", price: 1500 },
      { id: "AWRI44", name: "VITAMIN B12; CYANOCOBALAMIN", price: 1300 },
      { id: "AWRI45", name: "LIPID PROFILE, BASIC", price: 880 },
      { id: "AWRI46", name: "ELECTROLYTES, SERUM *SODIUM * POTASSIUM * CHLORIDE", price: 360 },
      { id: "AWRI47", name: "KIDNEY PANEL; KFT", price: 700 },
      { id: "AWRI48", name: "LIVER PANEL 1; LFT", price: 700 },
      { id: "AWRI49", name: "PHENOBARBITONE", price: 880 },
      { id: "AWRI50", name: "LDH; LACTIC DEHYDROGENASE", price: 320 },
      { id: "AWRI51", name: "CPK (CREATININE KINASE)", price: 350 },
      { id: "AWRI52", name: "FRUCTOSAMINE", price: 470 },
      { id: "AWRI53", name: "VITAMIN D 1, 25 DIHYDROXY", price: 3200 },
    ],
    "CLINICAL PATH & URINE BIOCHEMISTRY": [
      { id: "AWRI54", name: "URINE EXAMINATION, ROUTINE; URINE, R/E", price: 150 },
      { id: "AWRI55", name: "SPECIFIC GRAVITY, URINE (By species specific Refractometer)", price: 150 },
      { id: "AWRI56", name: "PROTEIN, TOTAL, RANDOM URINE", price: 150 },
      { id: "AWRI57", name: "URINE, GLUCOSE", price: 150 },
      { id: "AWRI58", name: "MICROALBUMIN 1ST MORNING/RANDOM URINE", price: 500 },
      { id: "AWRI59", name: "MICROALBUMIN CREATININE RATIO,URINE", price: 500 },
      { id: "AWRI60", name: "PROTEIN CREATININE RATIO,URINE (UP/C)", price: 420 },
      { id: "AWRI61", name: "STOOL EXAMINATION, OCCULT BLOOD", price: 200 },
      { id: "AWRI62", name: "STOOL EXAMINATION, ROUTINE; STOOL, R/E", price: 150 },
      { id: "AWRI63", name: "STOOL EXAMINATION; FLOTATION", price: 200 },
      { id: "AWRI64", name: "SKIN SCRAPPING TEST", price: 400 },
      { id: "AWRI65", name: "CYTOLOGY, VAGINAL", price: 350 },
      { id: "AWRI66", name: "SEMEN ANALYSIS; SEMINOGRAM", price: 400 },
    ],
    "KIT BASED TEST": [
      { id: "AWRI67", name: "CANINE PARVO VIRUS", price: 700 },
      { id: "AWRI68", name: "CANINE HEART WORM", price: 700 },
      { id: "AWRI69", name: "CANINE DISTEMPER VIRUS", price: 700 },
      { id: "AWRI70", name: "CANINE LEISHMANIA AB TEST", price: 700 },
      { id: "AWRI71", name: "CANINE LEPTOSPIROSIS", price: 1200 },
      { id: "AWRI72", name: "CANINE EHRLICHIA TEST", price: 700 },
      {
        id: "AWRI73",
        name: "FELINE IMMUNODEFICIENCY VIRUS AB, FELINE LEUKEMIA VIRUS AG AND FELINE HEARTWORM AB TEST",
        price: 2000,
      },
      { id: "AWRI74", name: "SNAP 4DX PLUS TEST", price: 2000 },
      { id: "AWRI75", name: "CANINE PANCREATIC LIPASE (CPL)", price: 2500 },
      { id: "AWRI76", name: "CANINE BRUCELLOSIS AB TEST", price: 800 },
    ],
    SEROLOGY: [
      { id: "AWRI77", name: "BRUCELLA ANTIBODY, IgM", price: 1000 },
      { id: "AWRI78", name: "BRUCELLA ANTIBODY, IgG", price: 1000 },
      { id: "AWRI79", name: "IMMUNOGLOBULIN IgM, SERUM", price: 400 },
      { id: "AWRI80", name: "IMMUNOGLOBULIN IgA, SERUM", price: 350 },
      { id: "AWRI81", name: "IMMUNOGLOBULIN IgE, SERUM", price: 690 },
      { id: "AWRI82", name: "IMMUNOGLOBULIN IgG, SERUM", price: 350 },
      { id: "AWRI83", name: "BRUCELLA AGGLUTINATION TEST", price: 700 },
      { id: "AWRI84", name: "LEISHMANIA ANTIBODY, IgG", price: 1600 },
    ],
    "CYTOLOGY & HISTOPATHOLOGY": [
      { id: "AWRI85", name: "CYTOLOGY, FINE NEEDLE ASPIRATION; FNAC", price: 750 },
      { id: "AWRI86", name: "CYTOLOGY, BODY FLUIDS FOR MALIGNANT CELLS", price: 500 },
      { id: "AWRI87", name: "HISTOPATHOLOGY, BIOPSY, SOFT TISSUE (SMALL SPECIMEN)", price: 750 },
      { id: "AWRI88", name: "HISTOPATHOLOGY, BIOPSY, LARGE SPECIMEN", price: 1190 },
      { id: "AWRI89", name: "HISTOPATHOLOGY, BIOPSY, BONE", price: 1100 },
      { id: "AWRI90", name: "HISTOPATHOLOGY, BIOPSY- SECOND OPINION", price: 600 },
      { id: "AWRI91", name: "HISTOPATHOLOGY, SPECIAL STAIN, MUCICARMINEPERIODIC ACID SCHIFF (PAS)", price: 450 },
      { id: "AWRI92", name: "HISTOPATHOLOGY, SPECIAL STAIN, MASSON TRICHROME", price: 450 },
      { id: "AWRI93", name: "FLUID EXAMINATION, ROUTINE, BODY FLUIDS", price: 750 },
      { id: "AWRI94", name: "IMMUNOHISTOCHEMISTRY (IHC)", price: 1570 },
      { id: "AWRI95", name: "BODY FLUID EXAMINATION ROUTINE", price: 1500 },
    ],
    MICROBIOLOGY: [
      { id: "AWRI96", name: "CULTURE, AEROBIC, BLOOD, RAPID INCLUDES ANTIBIOTIC SENSITIVITY", price: 950 },
      { id: "AWRI97", name: "CULTURE, ANAEROBIC, BLOOD, RAPID INCLUDES ANTIBIOTIC SENSITIVITY", price: 1200 },
      { id: "AWRI98", name: "CULTURE, AEROBIC, BODY FLUIDS, RAPID INCLUDES ANTIBIOTIC SENSITIVITY", price: 1000 },
      { id: "AWRI99", name: "CULTURE, AEROBIC, MISCELLANEOUS INCLUDES ANTIBIOTIC SENSITIVITY", price: 750 },
      { id: "AWRI100", name: "CULTURE, ANAEROBIC, MISCELLANEOUS INCLUDES ANTIBIOTIC SENSITIVITY", price: 1200 },
      { id: "AWRI101", name: "CULTURE, STOOL INCLUDES ANTIBIOTIC SENSITIVITY IF INDICATED", price: 750 },
      { id: "AWRI102", name: "CULTURE, URINE INCLUDES ANTIBIOTIC SENSITIVITY IF INDICATED", price: 750 },
      { id: "AWRI103", name: "BOVINE MILK CULTURE AND SENSITIVITY", price: 500 },
      { id: "AWRI104", name: "MILK CULTURE AND SENSITIVITY (Rapid Automated)", price: 1000 },
      { id: "AWRI105", name: "CULTURED FUNGUS IDENTIFICATION", price: 750 },
      { id: "AWRI106", name: "CULTURE, FUNGUS INCLUDES ANTIFUNGAL SENSITIVITY", price: 1000 },
      { id: "AWRI107", name: "FUNGUS EXAMINATION, ROUTINE, KOH CALCOFLUOR WHITE PREPARATION", price: 300 },
    ],
    "HORMONE ANALYSIS": [
      { id: "AWRI108", name: "T4, TOTAL (CANINE SPECIFIC)", price: 400 },
      { id: "AWRI109", name: "T4, FREE; FT4", price: 500 },
      { id: "AWRI110", name: "ACTH", price: 1350 },
      { id: "AWRI111", name: "CORTISOL", price: 500 },
      { id: "AWRI112", name: "ESTRADIOL (E2) SERUM", price: 540 },
      { id: "AWRI113", name: "FSH; FOLLICULAR STIMULATING HORMONE", price: 500 },
      { id: "AWRI114", name: "PROLACTIN SERUM", price: 500 },
      { id: "AWRI115", name: "TESTOSTERONE, TOTAL", price: 570 },
      { id: "AWRI116", name: "PROGESTERONE, SERUM", price: 600 },
      { id: "AWRI117", name: "PTH (PARATHYROID HORMONE), INTACT", price: 1500 },
    ],
    "SPECIALISED TEST": [
      { id: "AWRI118", name: "TROPONIN - I", price: 1500 },
      { id: "AWRI119", name: "TROPONIN - T", price: 1500 },
      { id: "AWRI120", name: "FAVN TEST (RABIES ANTIBODY TITER FOR EXPORT ANIMALS)", price: 16500 },
      { id: "AWRI121", name: "BABESIA DETECTION, (PCR ARRAY)", price: 1500 },
      { id: "AWRI122", name: "CANINE TICK BORNE DISEASE PCR PANEL", price: 2000 },
      { id: "AWRI123", name: "CANINE EHRLICHIA DETECTION PCR", price: 900 },
      { id: "AWRI124", name: "C-REACTIVE PROTEIN; CRP", price: 350 },
      { id: "AWRI125", name: "STONE ANALYSIS WITH PICTURE", price: 1500 },
    ],
    PANELS: [
      { id: "AWRI126", name: "LFT*KFT PANELS", price: 1320 },
      { id: "AWRI127", name: "PREANESTHETIC PANEL", price: 1250 },
      { id: "AWRI128", name: "ANEMIA PANEL", price: 1220 },
      { id: "AWRI129", name: "Immunoglobulin Profile", price: 1000 },
      { id: "AWRI130", name: "GLUCOSE FASTING (FBS) & GLUCOSE POSTPRANDIAL (PPBS)", price: 180 },
    ],
    "EXPORT TESTING SERVICES": [
      { id: "AWRI131", name: "CANINE TICK BORNE DISEASE PCR PANEL (Export)", price: 2000 },
      { id: "AWRI132", name: "BLOOD SMEAR EXAMINATION FOR BLOOD PARASITES", price: 300 },
      { id: "AWRI133", name: "LEISHMANIA ANTIBODY, IgG (Export)", price: 1600 },
      { id: "AWRI134", name: "KNOTT'S HEARTWORM TEST FOR MICROFILARIA", price: 400 },
      { id: "AWRI135", name: "HEARTWORM ANTIGEN TEST", price: 700 },
      { id: "AWRI136", name: "RABIES SEROLOGICAL TESTING (FAVN)", price: 16500 },
    ],
  }

  const allTests = Object.values(testCategories).flat();
  testCategories["All Categories"] = allTests;

  // Filter tests based on category and search term
  const filteredTests = useMemo(() => {
    let testsToFilter = selectedCategory === "All Categories" ? allTests : testCategories[selectedCategory];
    if (searchTerm) {
        testsToFilter = testsToFilter.filter(test =>
            test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            test.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    return testsToFilter;
  }, [searchTerm, selectedCategory]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field as keyof typeof formErrors]) {
        setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  }

  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];

    const day = selectedDate.getDay();

    if (day === 0) {
        return ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
    } else if (day === 6) {
        return ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"];
    } else {
        return ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"];
    }
  }, [selectedDate]);

    const validateStep1 = () => {
      const errors = { ...formErrors };
      let isValid = true;
      const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const indianPhoneRegex = /^[6-9]\d{9}$/;

      if (!formData.fullName.trim()) {
          errors.fullName = "Full name is required.";
          isValid = false;
      } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
          errors.fullName = "Full name can only contain letters and spaces.";
          isValid = false;
      }

      if (formData.email && !strictEmailRegex.test(formData.email)) {
          errors.email = "Please enter a valid email address.";
          isValid = false;
      }

      if (!formData.phone.trim()) {
          errors.phone = "Phone number is required.";
          isValid = false;
      } else if (!indianPhoneRegex.test(formData.phone)) {
          errors.phone = "Please enter a valid 10-digit Indian mobile number.";
          isValid = false;
      }

      setFormErrors(errors);
      return isValid;
    };

    const validateStep3 = () => {
        const errors = { ...formErrors };
        let isValid = true;
        const indianZipRegex = /^\d{6}$/;

        if (formData.appointmentType === 'home-collection') {
            if (!formData.address.trim()) {
                errors.address = "Street address is required for home collection.";
                isValid = false;
            }
            if (!formData.city.trim()) {
                errors.city = "City is required for home collection.";
                isValid = false;
            }
            if (!formData.locality.trim()) {
                errors.locality = "Locality is required for home collection.";
                isValid = false;
            }
            if (!formData.zipCode.trim()) {
                errors.zipCode = "ZIP code is required for home collection.";
                isValid = false;
            } else if (!indianZipRegex.test(formData.zipCode.trim())) {
                errors.zipCode = "Please enter a valid 6-digit Indian ZIP code.";
                isValid = false;
            }
        }

        if (!selectedDate) {
            errors.selectedDate = "Please select an appointment date.";
            isValid = false;
        }

        if (!formData.timeSlot) {
            errors.timeSlot = "Please select a time slot.";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
      }

      const validateStep4 = () => {
        const errors = { ...formErrors };
        let isValid = true;
        if (formData.discount === 0) {
            errors.discount = "Please select a discount option.";
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
      }

    const nextStep = () => {
      if (currentStep === 1 && !validateStep1()) return;
      if (currentStep === 2 && !testAdded) return;
      if (currentStep === 3 && !validateStep3()) return;
      if (currentStep === 4 && !validateStep4()) return;

      setCurrentStep((prev) => Math.min(prev + 1, 4));
    };

    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));


  const handleAddTest = () => {
    if (selectedTest && selectedCategory) {
      const categoryTests = selectedCategory === "All Categories" ? allTests : testCategories[selectedCategory as keyof typeof testCategories];
      const test = categoryTests.find((t) => t.id === selectedTest);
      if (test && !formData.selectedTests.find((t) => t.id === test.id)) {
        setFormData((prev) => ({
          ...prev,
          selectedTests: [...prev.selectedTests, { ...test, category: selectedCategory }],
        }));
        setTestAdded(true);
      }
      setSelectedTest("");
    }
  }

  const handleRemoveTest = (testId: string) => {
    const updatedTests = formData.selectedTests.filter((test) => test.id !== testId);
    setFormData((prev) => ({
      ...prev,
      selectedTests: updatedTests,
    }));
    if (updatedTests.length === 0) {
        setTestAdded(false);
    }
  }

  const getTotalPrice = () => {
    const testsTotal = formData.selectedTests.reduce((total, test) => total + test.price, 0)
    const discountedTotal = testsTotal * (1 - formData.discount);
    const collectionFee = formData.appointmentType === "home-collection" ? 200 : 0
    return discountedTotal + collectionFee
  }

  const handleSubmit = async () => {
    if(!validateStep4()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: "+91" + formData.phone, 
          appointmentDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
          total_price: getTotalPrice()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Booking failed:", errorData);
        alert(`Booking failed: ${errorData.errors.map((e: any) => e.msg).join(', ')}`);
        return;
      }

      const successData = await response.json();
      router.push(`/booking-confirmed?id=${successData.bookingId}&name=${encodeURIComponent(formData.fullName)}`);

      setTimeout(() => {
        setIsBooked(false);
        setConfirmedBookingId(null);
        setCurrentStep(1);
        onClose();
      setFormData({
        fullName: "", email: "", phone: "", selectedTests: [], testPackage: "",
        appointmentType: "home-collection", timeSlot: "", specialInstructions: "",
        address: "", city: "", locality: "", zipCode: "", paymentMethod: "cash", agreeToTerms: false, discount: 0
      });
      setSelectedDate(undefined);
      setCurrentStep(1);
        setSelectedCategory("");
        setSelectedTest("");
      }, 15000);

    } catch (error) {
      console.error("An error occurred:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
};

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      {isBooked ? (
    <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
        <p className="text-gray-600 mb-4">
            Your appointment has been scheduled successfully. You can now track your booking. 
        </p>
        {confirmedBookingId && (
            <Badge className="bg-blue-100 text-blue-800">
                Booking ID: #{confirmedBookingId}
            </Badge>
        )}
    </div>
) : (
        <>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5 text-blue-600" />
                    Book Your Test Appointment
                </DialogTitle>
            </DialogHeader>

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

            {currentStep === 1 && (
              <div className="space-y-6 ">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                 <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input id="fullName" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} required />

                      {formErrors.fullName && <p className="text-sm text-red-500 mt-1">{formErrors.fullName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />

                      {formErrors.email && <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>

                      <div className="flex items-center gap-2">
                          <div className="flex h-10 w-[70px] items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm">
                              +91
                          </div>
                          <div className="flex-1 space-y-2">
                              <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} required placeholder="9876543210" />
                              {formErrors.phone && <p className="text-sm text-red-500">{formErrors.phone}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
            {currentStep === 2 && (
            <div className="space-y-6">
                <h3 className="text-lg font-semibold">Select Individual Tests</h3>
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search tests by name or code..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSearchTerm("")}
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                    <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(testCategories).map((category) => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4 max-h-80 overflow-y-auto">
                    {filteredTests.map((test) => (
                        <Card
                            key={test.id}
                            className={cn(
                                "cursor-pointer transition-all duration-300 hover:scale-105",
                                formData.selectedTests.some((t) => t.id === test.id)
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
                            )}
                            onClick={() => {
                                const isSelected = formData.selectedTests.some((t) => t.id === test.id);
                                if (isSelected) {
                                    handleRemoveTest(test.id);
                                } else {
                                    const category = Object.keys(testCategories).find(key => 
                                        testCategories[key as keyof typeof testCategories].some(t => t.id === test.id)
                                    ) || "Unknown";
                                    setFormData((prev) => ({
                                        ...prev,
                                        selectedTests: [...prev.selectedTests, { ...test, category }],
                                    }));
                                    setTestAdded(true);
                                }
                            }}
                        >
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="flex-1">
                                        <h4 className="font-semibold">{test.name}</h4>
                                        <p className="text-sm opacity-90">{test.id}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold">₹{test.price}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {formData.selectedTests.length > 0 && (
                <Card>
                    <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Selected Tests</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {formData.selectedTests.map((test) => (
                        <div key={test.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex-1">
                            <span className="text-sm font-medium">{test.name}</span>
                            <span className="text-xs text-gray-500 block">{test.category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">₹{test.price}</span>
                            <Button variant="outline" size="sm" onClick={() => handleRemoveTest(test.id)} className="h-6 w-6 p-0">-</Button>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="border-t pt-2 mt-3 flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>₹{formData.selectedTests.reduce((total, test) => total + test.price, 0)}</span>
                    </div>
                    </CardContent>
                </Card>
                )}
            </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Appointment Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Select Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar selected={selectedDate} onSelect={setSelectedDate} disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))} />
                      </PopoverContent>
                    </Popover>
                    {formErrors.selectedDate && <p className="text-sm text-red-500 mt-1">{formErrors.selectedDate}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Time Slot *</Label>
                    <Select onValueChange={(value) => handleInputChange("timeSlot", value)} disabled={!selectedDate}>
                      <SelectTrigger><SelectValue placeholder="Select a time" /></SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (<SelectItem key={time} value={time}>{time}</SelectItem>))}
                      </SelectContent>
                    </Select>
                    {formErrors.timeSlot && <p className="text-sm text-red-500 mt-1">{formErrors.timeSlot}</p>}
                  </div>
                </div>
                {formData.appointmentType === "home-collection" && (
                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium">Collection Address</h4>
                    <div className="space-y-2">
                        <Label htmlFor="address">Street Address *</Label>
                        <Input id="address" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} />
                        {formErrors.address && <p className="text-sm text-red-500 mt-1">{formErrors.address}</p>}
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} />
                        {formErrors.city && <p className="text-sm text-red-500 mt-1">{formErrors.city}</p>}
                      </div>
                       <div className="space-y-2">
                        <Label htmlFor="locality">Locality *</Label>
                        <Input id="locality" value={formData.locality} onChange={(e) => handleInputChange("locality", e.target.value)} />
                        {formErrors.locality && <p className="text-sm text-red-500 mt-1">{formErrors.locality}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input id="zipCode" value={formData.zipCode} onChange={(e) => handleInputChange("zipCode", e.target.value)} />
                        {formErrors.zipCode && <p className="text-sm text-red-500 mt-1">{formErrors.zipCode}</p>}
                      </div>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                    <Label htmlFor="instructions">Special Instructions</Label>
                    <Textarea id="instructions" value={formData.specialInstructions} onChange={(e) => handleInputChange("specialInstructions", e.target.value)} placeholder="Any special requirements..." rows={3} />
                </div>
              </div>
            )}
            {currentStep === 4 && (
            <div className="space-y-6">
                <h3 className="text-lg font-semibold">Payment & Confirmation</h3>

                <div className="space-y-4">
                    <Label>Discount *</Label>
                    <RadioGroup onValueChange={(value) => handleInputChange("discount", parseFloat(value))}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="0.2" id="dog-cat-discount" />
                            <Label htmlFor="dog-cat-discount">For your Loved Dog/Cat - Flat 20% off*</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="0.3" id="indie-discount" />
                            <Label htmlFor="indie-discount">For your Loved Indie Dog - Flat 30% off*</Label>
                        </div>
                    </RadioGroup>
                    <p className="text-xs text-gray-500">Because your pet deserves the best care without breaking the Bank.</p>
                    {formErrors.discount && <p className="text-sm text-red-500 mt-1">{formErrors.discount}</p>}
                </div>

                <Card>
                <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Booking Summary</h4>
                    <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Name:</span><span>{formData.fullName}</span></div>
                    <div className="flex justify-between"><span>Email:</span><span>{formData.email || "Not provided"}</span></div>
                    <div className="flex justify-between"><span>Phone:</span><span>{formData.phone}</span></div>
                    <div className="flex justify-between"><span>Tests:</span><span>{formData.selectedTests.length}</span></div>
                    <div className="flex justify-between"><span>Date:</span><span>{selectedDate ? format(selectedDate, "PPP") : "Not selected"}</span></div>
                    <div className="flex justify-between"><span>Time:</span><span>{formData.timeSlot || "Not selected"}</span></div>
                    <div className="flex justify-between"><span>Subtotal:</span><span>₹{formData.selectedTests.reduce((total, test) => total + test.price, 0)}</span></div>
                    <div className="flex justify-between text-green-600"><span>Discount:</span><span>-₹{(formData.selectedTests.reduce((total, test) => total + test.price, 0) * formData.discount).toFixed(2)}</span></div>
                    <div className="flex justify-between border-t pt-2 font-semibold">
                        <span>Total:</span>
                        <span>₹{getTotalPrice().toFixed(2)}</span>
                    </div>
                    </div>
                </CardContent>
                </Card>
                <div className="space-y-4">
                <Label>Payment Method</Label>
                <RadioGroup value={formData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)}>
                    <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash on Collection*</Label>
                    </div>
                </RadioGroup>
                 <p className="text-xs text-gray-500">*Collection charges as applicable</p>
                </div>
                <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={formData.agreeToTerms} onCheckedChange={(checked) => handleInputChange("agreeToTerms", !!checked)} />
                <Label htmlFor="terms" className="text-sm">I agree to the terms and conditions</Label>
                </div>
            </div>
            )}

            <div className="flex justify-between pt-6 border-t">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>Previous</Button>
                {currentStep < 4 ? (
                    <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700" disabled={currentStep === 2 && !testAdded}>Next</Button>
                ) : (
                    <Button onClick={handleSubmit} disabled={!formData.agreeToTerms || isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                    {isSubmitting ? <><LoadingSpinner className="mr-2" size="sm" />Booking...</> : "Confirm Booking"}
                    </Button>
                )}
            </div>
        </>
        )}
      </DialogContent>
    </Dialog>
  )
}