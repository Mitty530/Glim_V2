'use client'

import React from 'react'
import { Navbar } from '@/components/ui/navbar'
import { Footer } from '@/components/ui/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { ValueProposition } from '@/components/sections/value-proposition'
import { HowItWorks } from '@/components/sections/how-it-works'
import { AiDemo } from '@/components/sections/ai-demo'
import WaitlistForm from '@/components/waitlist-form'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <ValueProposition />
        <HowItWorks />
        <AiDemo />
        
        <section id="waitlist" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Get Early Access
            </h2>
            <p className="text-lg text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
              Join our waiting list to be among the first to try Glim and transform the way you capture and organize information.
            </p>
            
            <WaitlistForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 