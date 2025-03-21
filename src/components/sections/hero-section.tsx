'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ParallaxEffect } from '@/components/ui/parallax-effect'
import { ScrollAnimation } from '@/components/ui/scroll-animation'
import { fadeUp, fadeIn, slideInLeft, slideInRight, zoomIn } from '@/hooks/useScrollAnimation'

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Scroll-based parallax effect for the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Transform values based on scroll position
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20"
    >
      {/* Animated background with parallax effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <ParallaxEffect speed={-0.1} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b dark:from-brand-dark dark:to-transparent from-brand-light to-white">
            {/* Animated dots */}
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-brand-primary/20 dark:bg-brand-primary/10"
                style={{
                  width: Math.random() * 8 + 2,
                  height: Math.random() * 8 + 2,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * -100 - 50],
                  opacity: [0.2, 0.8, 0],
                }}
                transition={{
                  duration: Math.random() * 20 + 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </ParallaxEffect>
        
        {/* Parallax floating cards with different speeds */}
        <ParallaxEffect speed={-0.2} className="absolute top-1/4 left-1/4 w-20 h-32 bg-brand-primary/20 rounded-lg transform rotate-6">
          <div className="w-full h-full"></div>
        </ParallaxEffect>
        <ParallaxEffect speed={-0.3} className="absolute top-2/3 left-2/3 w-16 h-24 bg-brand-secondary/20 rounded-lg transform -rotate-12">
          <div className="w-full h-full"></div>
        </ParallaxEffect>
        <ParallaxEffect speed={-0.15} className="absolute top-1/2 left-1/3 w-24 h-36 bg-brand-accent/20 rounded-lg transform rotate-12">
          <div className="w-full h-full"></div>
        </ParallaxEffect>
        <ParallaxEffect speed={-0.25} className="absolute top-1/3 left-2/3 w-16 h-28 bg-brand-primary/20 rounded-lg transform -rotate-6">
          <div className="w-full h-full"></div>
        </ParallaxEffect>
      </div>
      
      {/* Content with motion effects */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div style={{ y, opacity }}>
            <ScrollAnimation {...fadeIn} delay={0.1} className="mb-6 inline-block">
              <span className="bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent bg-clip-text text-sm md:text-base font-medium rounded-full px-4 py-1 border border-brand-primary/20">
                Effortless Contact Management
              </span>
            </ScrollAnimation>
            
            <ScrollAnimation {...fadeUp} delay={0.3}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="block">Transform Your Notes into</span>
                <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-transparent bg-clip-text">Smart Contact Cards</span>
              </h1>
            </ScrollAnimation>
            
            <ScrollAnimation {...fadeUp} delay={0.5}>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
                Capture information your way - speak, type, or snap a photo. Let AI organize your business contacts with structured details, personalized insights, and timely follow-ups.
              </p>
            </ScrollAnimation>
          </motion.div>
          
          <ScrollAnimation {...fadeUp} delay={0.7}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#waitlist"
                className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-medium py-3 px-8 rounded-full inline-flex items-center justify-center shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/30 transition-all duration-300 hover:-translate-y-1"
                onClick={(e) => {
                  e.preventDefault()
                  const waitlistSection = document.getElementById('waitlist')
                  if (waitlistSection) {
                    waitlistSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                Join Waitlist
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </Link>
              
              <Link 
                href="#how-it-works"
                className="bg-transparent text-gray-800 dark:text-white font-medium py-3 px-8 rounded-full inline-flex items-center justify-center border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault()
                  const howItWorksSection = document.getElementById('how-it-works')
                  if (howItWorksSection) {
                    howItWorksSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                How It Works
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation {...zoomIn} delay={0.9}>
            <div className="mt-16 max-w-3xl mx-auto">
              <div className="flex justify-center items-center space-x-8">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 text-sm font-medium">SL</div>
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 text-sm font-medium">JD</div>
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 text-sm font-medium">AR</div>
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 text-sm font-medium">+</div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">250+</span> business professionals already on the waitlist
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
} 