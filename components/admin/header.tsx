"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Bell, LogOut, PanelLeft } from "lucide-react"
import { DarkModeToggle } from "../dark-mode-toggle"
import { useRouter } from "next/navigation"
import {   DropdownMenu,   DropdownMenuContent,   DropdownMenuItem,   DropdownMenuLabel,   DropdownMenuSeparator,   DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"


export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("admin-token")
    router.push("/admin/login")
  }

  return (
    <header className="flex items-center justify-between h-20 px-4 md:px-8 bg-white border-b">
      <div className="flex items-center gap-4">
        {/* --- SIDEBAR TOGGLE BUTTON --- */}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:flex">
            <PanelLeft className="h-5 w-5" />
        </Button>
        {/* <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search..." className="pl-10 w-64" />
        </div> */}
      </div>
      <div className="flex items-center gap-4">
        {/* <DarkModeToggle /> */}
        {/* <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@awri.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
