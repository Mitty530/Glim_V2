'use client'

import React from 'react'
import { motion } from 'framer-motion'

// Custom icons to match the design
const icons = [
  (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
]

const statsData = [
  {
    value: '80%',
    description: 'of relationship opportunities are lost due to poor follow-up timing'
  },
  {
    value: '3-5x',
    description: 'higher conversion rate with context-rich follow-ups versus generic ones'
  },
  {
    value: '60%',
    description: 'of professionals forget crucial relationship context within 14 days'
  },
  {
    value: '7-8x',
    description: 'ROI when using an AI Memory Engine compared to traditional CRMs'
  }
]

export function StatsTimeline() {
  // Animation variants for motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <div className="py-24 overflow-hidden relative">
      {/* Green gradient background matching the hero section */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          background: 'linear-gradient(135deg, #064e3b, #10b981)',
          opacity: 0.9
        }}
      ></div>
      
      {/* White overlay for improved contrast */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-0"></div>
      
      {/* Subtle pattern overlay for visual interest */}
      <div className="absolute inset-0 opacity-5 z-0 pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2310b981' fill-opacity='0.25'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }}
      ></div>
      
      <motion.div 
        className="container mx-auto px-4 max-w-7xl relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section title with enhanced contrast */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Why Your Brain Isn't a CRM
          </h2>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Relationship memory is unstructured, emotional, and context-rich. Glim transforms how you maintain connections.
          </p>
        </motion.div>
        
        {/* Main timeline container */}
        <div className="relative">
          {/* Horizontal timeline bar - Darker for better visibility */}
          <div className="hidden md:block absolute top-[32px] left-[8%] right-[8%] h-[2px] bg-gray-400 z-0"></div>
          
          {/* Stats timeline (desktop) */}
          <div className="hidden md:grid grid-cols-4 relative z-10 px-[5%]">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                variants={itemVariants}
              >
                {/* Icon circle */}
                <div className="mb-10 relative">
                  <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center relative z-10 shadow-xl">
                    <div className="text-white">
                      {icons[index]}
                    </div>
                  </div>
                  
                  {/* Purple glow effect - strengthened */}
                  <div className="absolute -inset-[6px] rounded-full" style={{
                    background: 'radial-gradient(circle, rgba(216, 180, 254, 0.9) 0%, rgba(216, 180, 254, 0) 70%)',
                    filter: 'blur(4px)',
                  }}></div>
                  
                  {/* Small dot on timeline - darkened */}
                  <div className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
                </div>
                
                {/* Stat Value - Darker for better contrast */}
                <h3 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900 drop-shadow-sm">
                  {stat.value}
                </h3>
                
                {/* Description - Darker for better contrast */}
                <p className="text-gray-800 font-medium text-center max-w-[250px] mx-auto leading-snug">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile view - with improved text contrast */}
          <div className="md:hidden space-y-12">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-6"
                variants={itemVariants}
              >
                {/* Icon circle */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center relative z-10 shadow-xl">
                    <div className="text-white">
                      {icons[index]}
                    </div>
                  </div>
                  
                  {/* Purple glow effect - strengthened */}
                  <div className="absolute -inset-[6px] rounded-full" style={{
                    background: 'radial-gradient(circle, rgba(216, 180, 254, 0.9) 0%, rgba(216, 180, 254, 0) 70%)',
                    filter: 'blur(4px)',
                  }}></div>
                </div>
                
                <div>
                  {/* Stat Value - Darker for better contrast */}
                  <h3 className="text-3xl font-bold mb-2 text-gray-900 drop-shadow-sm">
                    {stat.value}
                  </h3>
                  
                  {/* Description - Darker for better contrast */}
                  <p className="text-gray-800 font-medium leading-snug">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
} 