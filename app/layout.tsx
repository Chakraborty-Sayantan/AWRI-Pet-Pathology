import type React from "react"
import type { Metadata } from "next"
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "AWRI",
  description: "Pet Pathology Lab - AWRI (Animal Wellness Research Institute)",
  icons: [
    { rel: "icon", url: "/logo.png" },
    { rel: "shortcut icon", url: "/logo.png" },
    { rel: "apple-touch-icon", url: "/logo.png" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
         </ThemeProvider>
         <Analytics/>
         <SpeedInsights />
      </body>
    </html>
  )
}
