import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AnimationProvider } from '@/components/providers/animation-provider'
import { Analytics } from '@vercel/analytics/react'
import CustomCursor from '@/components/ui/custom-cursor'
import CursorSectionDetector from '@/components/ui/cursor-section-detector'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Glim - AI Relationship Memory Engine',
  description: 'An AI-powered relationship memory engine that helps you maintain meaningful connections with your network and never miss a follow-up opportunity.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("scroll-smooth", montserrat.variable)}>
      <body className={cn("min-h-screen bg-deep-green-grid font-sans antialiased", inter.className)}>
        <ThemeProvider>
          <AnimationProvider>
            {children}
          </AnimationProvider>
          <CustomCursor />
          <CursorSectionDetector />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
} 