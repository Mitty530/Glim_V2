'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ScrollAnimation } from '@/components/ui/scroll-animation'
import { ParallaxEffect } from '@/components/ui/parallax-effect'
import { fadeUp, slideInLeft } from '@/hooks/useScrollAnimation'

export function ValueProposition() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  
  // Animations for scroll effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60])
  
  // Card animations
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }
  
  // Item list animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  }
  
  // Mesh gradient animation for background
  const gradientVariants = {
    initial: {
      backgroundPosition: "0% 0%",
    },
    animate: {
      backgroundPosition: "100% 100%",
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  }
  
  return (
    <section id="value" ref={sectionRef} className="py-24 relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-gradient-radial from-brand-light/5 to-transparent dark:from-brand-dark/10"></div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-full filter blur-3xl opacity-70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            From Notes to Knowledge in Seconds
          </h2>
          <p className="text-lg text-gray-400">
            Glim transforms your scattered notes and voice memos into structured, intelligent contact information
          </p>
        </div>
        
        {/* Main content - split screen layout with 3D effects */}
        <div className="grid md:grid-cols-2 gap-8 relative perspective-[1200px] py-12">
          {/* Before card */}
          <motion.div 
            className="w-full"
            initial={{ rotateY: -5, opacity: 0.8, z: -100 }}
            whileInView={{ rotateY: 0, opacity: 1, z: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ 
              rotateY: -8,
              z: 30,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" 
            }}
          >
            <div className="w-full rounded-xl overflow-hidden bg-gray-800/95 shadow-2xl h-full transform-gpu transition-all duration-300 relative">
              {/* Ambient glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 rounded-xl blur-xl transition-all duration-700"></div>
              
              {/* Window Controls */}
              <div className="flex items-center px-4 py-2 border-b border-gray-700/50 backdrop-blur-sm">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="ml-4 text-sm text-gray-400">Before: Unstructured Notes</span>
                <span className="ml-2 text-sm">📝</span>
              </div>
              
              {/* Notes Content */}
              <div className="p-6 font-mono text-sm text-gray-300 space-y-6 relative">
                <motion.div 
                  className="absolute top-0 left-0 right-0 bottom-0 opacity-10 pointer-events-none"
                  initial={{ backgroundPosition: "0% 0%" }}
                  animate={{ backgroundPosition: "100% 100%" }}
                  transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                  style={{ 
                    background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0) 70%)",
                    backgroundSize: "150% 150%" 
                  }}
                />
                
                {/* Floating sticky note decoration */}
                <motion.div
                  className="absolute -right-5 top-10 text-3xl"
                  animate={{ 
                    rotate: [0, 10, 0], 
                    y: [0, -5, 0] 
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  📝
                </motion.div>
                
                {/* Decorative dots pattern */}
                <div className="absolute bottom-0 left-0 opacity-10 pointer-events-none">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="2" fill="currentColor" />
                    </pattern>
                    <rect x="0" y="0" width="100" height="100" fill="url(#dots)" />
                  </svg>
                </div>
                
                {/* Animated text lines with staggered reveal */}
                <motion.div 
                  className="space-y-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.1 }
                    },
                    hidden: {}
                  }}
                >
                  <motion.p variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                    Met Sarah Johnson, CMO at Global Tech Solutions during SaaS Conference.
                  </motion.p>
                  <motion.p variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                    She&apos;s looking for a marketing analytics platform.
                  </motion.p>
                  <motion.p variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                    <span className="inline-block mr-2">📧</span> Email: sarah.j@globaltechsolutions.com
                  </motion.p>
                  <motion.p variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                    <span className="inline-block mr-2">📱</span> Ph: (555) 123-4567
                  </motion.p>
                  <motion.p variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                    <span className="inline-block mr-2">🏢</span> Address: 123 Innovation Blvd, Suite 300, San Francisco
                  </motion.p>
                  <motion.p variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                    <span className="inline-block mr-2">🥾</span> Likes hiking in Yosemite. Planning team expansion in Q4.
                  </motion.p>
                  <motion.p variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                    <span className="inline-block mr-2">⏰</span> Need to follow up within 2 weeks.
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* After card */}
          <motion.div 
            className="w-full"
            initial={{ rotateY: 5, opacity: 0.8, z: -100 }}
            whileInView={{ rotateY: 0, opacity: 1, z: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            whileHover={{ 
              rotateY: 8,
              z: 50,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" 
            }}
          >
            <div className="w-full rounded-xl overflow-hidden bg-gray-800/95 shadow-2xl h-full transform-gpu transition-all duration-300 relative group">
              {/* Enhanced glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-30 rounded-xl blur-xl transition-all duration-700"></div>
              
              {/* Window Controls */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700/50 backdrop-blur-sm">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-gray-400">After: Smart Contact Card</span>
                <motion.span 
                  className="text-xs px-2 py-1 bg-indigo-600/30 text-indigo-300 rounded relative overflow-hidden flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <motion.span 
                    className="absolute inset-0 bg-indigo-600/20"
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                  />
                  <span className="mr-1">✨</span> AI Enhanced
                </motion.span>
              </div>
              
              {/* Contact Card Content */}
              <div className="p-6 relative">
                {/* Ambient particle effect */}
                <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-indigo-400 rounded-full"
                      initial={{ 
                        x: Math.random() * 100 + "%", 
                        y: Math.random() * 100 + "%", 
                        opacity: Math.random() * 0.5 + 0.3
                      }}
                      animate={{ 
                        y: [null, Math.random() * 100 + "%"],
                        opacity: [null, Math.random() * 0.3 + 0.1]
                      }}
                      transition={{ 
                        duration: Math.random() * 10 + 10, 
                        repeat: Infinity, 
                        repeatType: "mirror" 
                      }}
                    />
                  ))}
                </div>
                
                {/* Floating sparkle decoration */}
                <motion.div
                  className="absolute -right-2 bottom-10 text-2xl"
                  animate={{ 
                    rotate: [0, 15, 0], 
                    y: [0, -5, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  ✨
                </motion.div>
                
                {/* Circular decoration */}
                <div className="absolute -left-5 -bottom-5 opacity-10 pointer-events-none">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                </div>

                {/* Contact Header with animated entry */}
                <motion.div 
                  className="flex items-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <div className="w-14 h-14 rounded-full bg-indigo-700/30 flex items-center justify-center text-indigo-300 text-xl font-medium mr-4 relative overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-indigo-700/30 to-indigo-700/60"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="relative z-10">SJ</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white flex items-center">
                      Sarah Johnson
                      <motion.span 
                        className="ml-2 text-base"
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      >
                        👩‍💼
                      </motion.span>
                    </h3>
                    <p className="text-gray-400">CMO @ Global Tech Solutions</p>
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {/* Contact */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <p className="text-sm text-gray-500 mb-2 flex items-center">
                      <span className="mr-2">📱</span> Contact
                    </p>
                    <p className="text-sm text-gray-300">sarah.j@globaltechsolutions.com</p>
                    <p className="text-sm text-gray-300">(555) 123-4567</p>
                  </motion.div>
                  
                  {/* Location */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <p className="text-sm text-gray-500 mb-2 flex items-center">
                      <span className="mr-2">📍</span> Location
                    </p>
                    <p className="text-sm text-gray-300">123 Innovation Blvd</p>
                    <p className="text-sm text-gray-300">Suite 300, San Francisco</p>
                  </motion.div>
                  
                  {/* Business Context */}
                  <motion.div 
                    className="col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <p className="text-sm text-gray-500 mb-2 flex items-center">
                      <span className="mr-2">💼</span> Business Context
                    </p>
                    <p className="text-sm text-gray-300">• Seeking marketing analytics platform</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Remove all previous indicators */}
        
        {/* Features section */}
        <div className="mt-24 relative">
          {/* Advanced 3D decoration for this section */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full filter blur-3xl opacity-70 transform rotate-12"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-full filter blur-3xl opacity-70 transform -rotate-12"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-block relative"
              whileInView={{
                scale: [0.9, 1.05, 1],
                opacity: [0, 1, 1],
              }}
              transition={{ 
                duration: 1,
                times: [0, 0.5, 1]
              }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-purple-300 drop-shadow-sm">
                Key Benefits
              </h3>
              
              {/* Animated decorative elements */}
              <motion.div 
                className="absolute -right-8 -top-5 text-3xl"
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 10, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.div>
              <motion.div 
                className="absolute -left-8 -top-5 text-3xl transform -scale-x-100"
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, -15, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2.5,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.div>
            </motion.div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 relative">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: "Structured Data",
                description: "Transform unstructured notes into organized, searchable contact information in seconds."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Smart Follow-ups",
                description: "AI automatically extracts and schedules follow-up reminders based on your conversations."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "Personalized Insights",
                description: "Get AI-powered recommendations for better relationship management and conversation starters."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Time Savings",
                description: "Reduce contact management time by up to 80% with AI-powered organization and automation."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                title: "Relationship ROI",
                description: "Never miss a business opportunity with smart reminders and relationship insights."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Data Security",
                description: "Keep all your important contact details securely organized and encrypted."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="perspective-1000"
                initial={{ opacity: 0, y: 40, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: i * 0.1,
                  type: "spring",
                  damping: 15,
                  stiffness: 70
                }}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 15 }
                }}
              >
                <motion.div 
                  className="bg-gray-800/60 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 shadow-xl h-full transform-gpu relative group overflow-hidden"
                  whileHover={{
                    boxShadow: "0 15px 30px -10px rgba(79, 70, 229, 0.25), 0 0 12px rgba(79, 70, 229, 0.15)",
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                >
                  {/* Background glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-600/0 to-purple-600/0 opacity-0 group-hover:from-indigo-600/30 group-hover:to-purple-600/30 rounded-xl blur-2xl group-hover:opacity-100 transition-all duration-500 group-hover:duration-200"></div>
                  
                  {/* Animated icon container */}
                  <motion.div 
                    className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden group-hover:from-indigo-600/30 group-hover:to-purple-600/30 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.05,
                      rotate: 5,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                  >
                    {/* Animated background for icon */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"
                      animate={{ 
                        backgroundPosition: ["0% 0%", "100% 100%"]
                      }} 
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity, 
                        repeatType: "mirror",
                        ease: "linear" 
                      }}
                      style={{ backgroundSize: "200% 200%" }}
                    />
                    
                    {/* Animated icon */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.5,
                        delay: i * 0.1 + 0.3
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                  </motion.div>
                  
                  {/* Shine effect on hover */}
                  <motion.div 
                    className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" 
                    style={{ display: "none" }}
                    animate={{ display: "block" }}
                    transition={{ delay: 0.5 }}
                  />
                  
                  {/* Feature content with animated reveal */}
                  <motion.h3 
                    className="text-lg font-bold mb-2 text-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: i * 0.1 + 0.2 
                    }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-300 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: i * 0.1 + 0.3 
                    }}
                  >
                    {feature.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Added CTA Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={() => {
                const demoSection = document.getElementById('demo');
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-medium rounded-lg shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              Experience the Magic
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 

