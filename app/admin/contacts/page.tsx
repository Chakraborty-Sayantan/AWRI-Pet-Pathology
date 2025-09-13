"use client"

import useAuth from '@/components/hooks/useAuth';
import { ContactsTable } from "@/components/admin/contacts-table"
import { FadeInSection } from "@/components/fade-in-section"

export default function ContactsPage() {
  useAuth();
  return (
    <div className="space-y-8">
      <FadeInSection>
        <h1 className="text-3xl font-bold text-gray-800">Contact Messages</h1>
        <p className="text-gray-500">View all submissions from the contact form.</p>
      </FadeInSection>
      <FadeInSection delay={100}>
        <ContactsTable />
      </FadeInSection>
    </div>
  )
}
