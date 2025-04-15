'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Navbar } from '@/components/ui/navbar'
import { Footer } from '@/components/ui/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { WhyGlimSection } from '@/components/sections/why-glim-section'
import { ValueProposition } from '@/components/sections/value-proposition'
import { StatsTimeline } from '@/components/sections/stats-timeline'
import ContactForm from '@/components/contact-form'

// Dynamically import components with SSR disabled to prevent hydration issues
const HowGlimWorks = dynamic(
  () => import('@/components/sections/how-glim-works'),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        
        {/* Why Glim Section */}
        <WhyGlimSection />
        
        {/* Value Proposition Section */}
        <ValueProposition />
        
        {/* Stats Timeline section with enhanced background */}
        <StatsTimeline />
        
        {/* How Glim Works Section */}
        <HowGlimWorks />
        
        {/* Contact Section updated with green theme */}
        <section id="contact-section" className="py-20 relative bg-noise">
          <div className="absolute inset-0 bg-gradient-to-br from-[#052e16] via-[#064e3b] to-[#065f46] -z-10"></div>
          
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/10 z-0"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Left Column: Contact Info */}
              <div className="lg:w-1/3">
                <div className="inline-flex items-center bg-white/95 py-1 px-3 rounded-full mb-4 shadow-md backdrop-blur-sm">
                  <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                  <span className="text-sm font-bold text-gray-800">Contact Form</span>
              </div>
                
                <div className="bg-black/5 backdrop-blur-sm p-6 rounded-xl">
                  <h2 className="text-4xl md:text-5xl font-bold mb-5 text-white drop-shadow-md">
                    Connect With the Memory Engine
                  </h2>
                  <p className="text-white/90 text-lg mb-8 drop-shadow-sm">
                    Your brain was never meant to be a CRM. Reach out to discover how Glim can transform your relationship memory into momentum.
                  </p>
                  
                  <div className="bg-white/95 p-4 rounded-lg mb-6 flex items-center shadow-md backdrop-blur-sm">
                    <svg className="w-5 h-5 mr-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-800 font-medium">aiglimcard@gmail.com</span>
                  </div>
                  
                  <a href="mailto:aiglimcard@gmail.com" className="inline-block bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-lg">
                    Start the Conversation
                  </a>
                </div>
              </div>
              
              {/* Right Column: Contact Form */}
              <div className="lg:w-2/3">
                <ContactForm />
              </div>
              
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}