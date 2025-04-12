'use client'

import React from 'react'
import { Navbar } from '@/components/ui/navbar'
import { Footer } from '@/components/ui/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { WhyGlimSection } from '@/components/sections/why-glim-section'
import { ValueProposition } from '@/components/sections/value-proposition'
// import { HowItWorks } from '@/components/sections/how-it-works' // Commented out as you're not using it
import AiDemoSection from '@/components/sections/ai-demo-section'
import { StatsTimeline } from '@/components/sections/stats-timeline'
import WaitlistForm from '@/components/waitlist-form'
import dynamic from 'next/dynamic'

// Use dynamic import with ssr: false for components causing hydration issues
const HowGlimWorks = dynamic(() => import('../components/sections/how-glim-works'), { 
  ssr: false 
})

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        
        {/* Why Glim Comparison Section */}
        <section className="relative bg-noise">
          <div className="absolute inset-0 bg-gradient-green -z-10"></div>
          <div className="absolute inset-0 leaf-pattern opacity-20 -z-10"></div>
          <WhyGlimSection />
        </section>
        
        <section id="value-prop" className="relative bg-noise">
          <div className="absolute inset-0 bg-gradient-nature -z-10"></div>
          <div className="absolute inset-0 leaf-pattern opacity-15 -z-10"></div>
          <ValueProposition />
        </section>
        <section id="how-it-works" className="relative bg-noise">
          <div className="absolute inset-0 bg-gradient-blue -z-10"></div>
          {/* <HowItWorks /> */}
          <HowGlimWorks />
        </section>
        
        {/* Stats Timeline - Key Metrics */}
        <section id="stats-timeline" className="relative bg-noise">
          <div className="absolute inset-0 bg-gradient-green -z-10"></div>
          <div className="absolute inset-0 leaf-pattern opacity-10 -z-10"></div>
          <StatsTimeline />
        </section>
        
        <section id="ai-demo" className="relative bg-noise">
          <div className="absolute inset-0 bg-gradient-purple -z-10"></div>
          <AiDemoSection />
        </section>
        <section id="how-glim-works" className="relative bg-noise">
          <div className="absolute inset-0 bg-gradient-beige -z-10"></div>
        </section>
        
        {/* Contact Section updated with green theme */}
        <section id="contact" className="py-20 relative bg-noise">
          <div className="absolute inset-0 bg-gradient-nature -z-10"></div>
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Left Column: Contact Info */}
              <div className="lg:w-1/3">
                <div className="inline-flex items-center bg-white/90 py-1 px-3 rounded-full mb-4 shadow-sm backdrop-blur-sm">
                  <svg className="w-4 h-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                  <span className="text-sm font-medium text-gray-700">Contact Form</span>
              </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-5 text-[#0a2a1f]">
                  We'd Love to Hear From You
            </h2>
                <p className="text-gray-700 mb-8">
                  Contact us for inquiries, support, or feedback. We're here to assist you every step of the way.
                </p>
                
                <div className="bg-white/90 p-4 rounded-lg mb-6 flex items-center shadow-sm backdrop-blur-sm">
                  <svg className="w-5 h-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">founders@glim.ai</span> {/* Placeholder Email */}
                </div>
                
                <a href="mailto:founders@glim.ai" className="inline-block bg-[#16543a] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#0d3826] transition-colors duration-300 shadow-md">
                  Email Us
                </a>
              </div>
              
              {/* Right Column: Contact Form */}
              <div className="lg:w-2/3">
                <div className="p-8 rounded-xl shadow-lg bg-white/90 backdrop-blur-sm" 
                     style={{
                       borderImage: 'linear-gradient(to right, #16a34a, #059669) 1', // Green gradient border
                       borderWidth: '2px', 
                       borderStyle: 'solid'
                     }}>
                  <h3 className="text-2xl font-semibold mb-6 text-[#0a2a1f]">Send us your query</h3>
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" id="name" name="name" placeholder="Enter your name" className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input type="text" id="subject" name="subject" placeholder="Enter your subject" className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                      <input type="email" id="email" name="email" placeholder="Enter your email" className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea id="message" name="message" rows={4} placeholder="Enter your message" className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none"></textarea>
                    </div>
                    <div>
                      <button type="submit" className="w-full bg-[#16543a] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#0d3826] transition-colors duration-300 shadow-md">
                        Send Your Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}