"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, ClipboardList, MessageSquare, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { href: "/admin", icon: Home, label: "Dashboard" },
    { href: "/admin/bookings", icon: ClipboardList, label: "Bookings" },
    { href: "/admin/contacts", icon: MessageSquare, label: "Messages" },
  ]

  const handleLogout = () => {
    localStorage.removeItem("admin-token")
    router.push("/admin/login")
  }

  return (
    <TooltipProvider delayDuration={0}>
      <aside className={cn(
        "hidden md:flex flex-col bg-white dark:bg-gray-800 border-r dark:border-gray-700 transition-all duration-300 ease-in-out",
        "fixed h-full z-10", 
        isCollapsed ? "w-20" : "w-64"
      )}>
        <div className="flex items-center justify-center h-20 border-b dark:border-gray-700">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white shadow mr-2">
              <img
              src="/logo.png"
              alt="AWRI Logo"
              className="h-12 w-12 object-contain transition-transform duration-300 hover:scale-110 hover:rotate-0"
              />
            </div>
            
          <span className={cn(
            "ml-2 text-xl font-bold text-gray-800 dark:text-white whitespace-nowrap overflow-hidden transition-all duration-200",
            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}>AWRI Admin</span>
        </div>
        <nav className="flex-1 p-2 space-y-2">
          {navItems.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center p-3 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                    isCollapsed && "justify-center",
                    pathname === item.href && "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-semibold"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className={cn(
                    "ml-3 whitespace-nowrap overflow-hidden transition-all duration-200",
                    isCollapsed && "w-0 opacity-0"
                  )}>{item.label}</span>
                </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  {item.label}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>
        <div className="p-2 border-t dark:border-gray-700">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className={cn("w-full p-3", isCollapsed ? "justify-center" : "justify-start")} onClick={handleLogout}>
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    <span className={cn("ml-3 whitespace-nowrap overflow-hidden transition-all duration-200", isCollapsed && "w-0 opacity-0")}>Logout</span>
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  Logout
                </TooltipContent>
              )}
            </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  )
}
