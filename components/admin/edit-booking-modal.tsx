"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Booking, Test } from "./bookings-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

// Interface for a test object that can be added or removed
interface EditableTest {
    id: string;
    name: string;
    price: string;
    code: string; // Keep original properties
}
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


interface EditBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking;
    onSave: () => void;
}

export function EditBookingModal({ isOpen, onClose, booking, onSave }: EditBookingModalProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        appointmentDate: '',
        timeSlot: '',
    });
    const [selectedTests, setSelectedTests] = useState<Test[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedTest, setSelectedTest] = useState("");

    useEffect(() => {
        if (booking) {
            setFormData({
                fullName: booking.full_name,
                phone: booking.phone,
                appointmentDate: new Date(booking.appointment_date).toISOString().split('T')[0],
                timeSlot: booking.time_slot,
            });
            setSelectedTests(booking.tests || []);
        }
    }, [booking]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleAddTest = () => {
        if (selectedTest && selectedCategory) {
            const categoryTests = selectedCategory === "All Categories" ? allTests : testCategories[selectedCategory as keyof typeof testCategories];
            const testToAdd = categoryTests.find((t) => t.id === selectedTest);
            if (testToAdd && !selectedTests.find((t) => t.id === testToAdd.id)) {
                const newTest: Test = { ...testToAdd, code: testToAdd.id, price: String(testToAdd.price) };
                setSelectedTests(prev => [...prev, newTest]);
            }
            setSelectedTest("");
        }
    };

    const handleRemoveTest = (testId: string) => {
        setSelectedTests(prev => prev.filter(test => test.id !== testId));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('admin-token');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const testIds = selectedTests.map(t => t.id);

        try {
            const response = await fetch(`${apiUrl}/api/bookings/${booking.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token || '',
                },
                body: JSON.stringify({ ...formData, tests: testIds }),
            });
            if (!response.ok) throw new Error('Failed to update booking');
            onSave();
            onClose();
        } catch (error) {
            console.error(error);
            alert('An error occurred while updating the booking.');
        }
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Booking #{booking.id}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" value={formData.fullName} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="appointmentDate">Appointment Date</Label>
                        <Input id="appointmentDate" type="date" value={formData.appointmentDate} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="timeSlot">Time Slot</Label>
                        <Input id="timeSlot" value={formData.timeSlot} onChange={handleChange} required />
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <h4 className="font-medium">Manage Tests</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Test Category</Label>
                                <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(testCategories).map((category) => (<SelectItem key={category} value={category}>{category}</SelectItem>))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Select Test</Label>
                                <Select onValueChange={setSelectedTest} value={selectedTest} disabled={!selectedCategory}>
                                    <SelectTrigger><SelectValue placeholder="Select test" /></SelectTrigger>
                                    <SelectContent>
                                        {(selectedCategory === "All Categories" ? allTests : testCategories[selectedCategory as keyof typeof testCategories]).map((test) => (
                                            <SelectItem key={test.id} value={test.id}>{test.name} - ₹{test.price}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button type="button" onClick={handleAddTest} disabled={!selectedTest} className="w-full md:w-auto">Add Test</Button>
                        
                        {selectedTests.length > 0 && (
                            <Card>
                                <CardContent className="p-4">
                                <h4 className="font-semibold mb-3">Selected Tests</h4>
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {selectedTests.map((test) => (
                                    <div key={test.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                        <div className="flex-1">
                                            <span className="text-sm font-medium">{test.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold">₹{test.price}</span>
                                            <Button variant="outline" size="sm" onClick={() => handleRemoveTest(test.id)} className="h-6 w-6 p-0">-</Button>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}