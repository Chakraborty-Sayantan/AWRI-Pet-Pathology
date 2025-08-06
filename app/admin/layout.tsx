"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "@/components/admin/sidebar"
import { Header } from "@/components/admin/header"
import { cn } from "@/lib/utils"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar isCollapsed={isSidebarCollapsed} />
      
      <div className={cn(
          "flex flex-col flex-1 transition-all duration-300 ease-in-out",
          isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
      )}>
        <Header toggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
