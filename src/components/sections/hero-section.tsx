'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useAnimation, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import AnimatedGridBackground from '@/components/ui/animated-grid-background'

// Animation variants - Enhanced for better visual appeal
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.2,
    } 
  }
};

// Text revealing animation for dramatic effect
const textRevealVariant = {
  hidden: { width: "0%" },
  visible: { 
    width: "100%", 
    transition: { duration: 0.8, ease: "easeInOut" }
  }
};

// Card animation - more dramatic appearance
const cardAnimation = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      delay: 0.4,
      ease: [0.19, 1.0, 0.22, 1.0] // Custom ease for more premium feel
    }
  }
};

// Memory fade effect for text
const memoryFadeEffect = {
  initial: { opacity: 0, filter: "blur(8px)" },
  animate: { 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: 0.6 }
  }
};

// Button hover animation
const buttonHoverVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.5)",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.98 }
};

// Floating animation for decorative elements
const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Pulsing animation for emphasis
const pulseAnimation = {
  initial: { scale: 1, opacity: 0.8 },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export function HeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const controls = useAnimation();
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#031b0e] via-[#052e16] to-[#064e3b] hero-section-component"
      id="home"
    >
      {/* Animated Grid Background - Updated with even less opacity */}
      <AnimatedGridBackground 
        color="rgba(52, 211, 153, 0.4)" 
        opacity={0.15} 
        density={18}
        speed={0.4}
        rounded={true}
      />
      
      {/* Darker overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] z-0" />
      
      {/* Glow elements */}
      <motion.div 
        className="absolute top-20 left-10 w-96 h-96 bg-emerald-500 rounded-full opacity-10 blur-[120px] z-0"
        variants={pulseAnimation}
        initial="initial"
        animate="animate"
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 bg-teal-500 rounded-full opacity-10 blur-[100px] z-0"
        variants={pulseAnimation}
        initial="initial"
        animate="animate"
        transition={{ delay: 1.5 }}
      />
      
      <div className="container mx-auto px-4 z-20 relative py-20 md:py-32">
        {/* Center aligned header for cleaner look */}
        <div className="text-center max-w-5xl mx-auto">
          {/* Text backdrop for better visibility */}
          <div className="bg-black/20 backdrop-blur-sm py-12 px-8 rounded-xl shadow-2xl">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="mb-2"
            >
              <span className="text-emerald-300 font-semibold text-lg md:text-xl tracking-wide drop-shadow-md">
                The human brain was never meant to be a CRM
              </span>
            </motion.div>
            
            <motion.h1 
              ref={titleRef}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mt-4 mb-6 drop-shadow-xl"
              style={{ textShadow: '0 4px 6px rgba(0,0,0,0.4)' }}
            >
              AI Relationship
              <span className="block mt-2 text-white">
                Memory Engine
              </span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              Glim captures relationship context, enhances memory, and
              transforms how you maintain connections that matter.
            </motion.p>
            
            {/* Two-button CTA layout */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="flex flex-wrap gap-6 justify-center"
            >
              <motion.div
                variants={buttonHoverVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Link 
                  href="#contact-section"
                  className="bg-emerald-500 text-white px-12 py-5 rounded-lg font-bold transition-all duration-200 inline-flex items-center gap-2 text-lg shadow-lg border border-emerald-400"
                  onClick={(e) => {
                    e.preventDefault();
                    const contactSection = document.getElementById('contact-section');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Secure Your Memory Engine
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
              
              <motion.div
                variants={buttonHoverVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Link 
                  href="#how-it-works"
                  className="border-2 border-emerald-300 bg-black/10 text-white hover:border-white px-12 py-5 rounded-lg font-bold transition-all duration-200 inline-flex items-center gap-2 text-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    const howItWorksSection = document.getElementById('how-it-works');
                    if (howItWorksSection) {
                      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  See How It Works
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Enhanced wave animation at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 origin-bottom"
          animate={{
            y: [0, 8, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-full absolute bottom-0" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <motion.path 
              d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,64C840,53,960,43,1080,42.7C1200,43,1320,53,1380,58.7L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
              fill="url(#wave-gradient)"
              animate={{
                d: [
                  "M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,64C840,53,960,43,1080,42.7C1200,43,1320,53,1380,58.7L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z",
                  "M0,64L60,58.7C120,53,240,43,360,37.3C480,32,600,32,720,42.7C840,53,960,75,1080,74.7C1200,75,1320,53,1380,42.7L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z",
                  "M0,48L60,53.3C120,59,240,69,360,69.3C480,69,600,59,720,48C840,37,960,27,1080,32C1200,37,1320,59,1380,69.3L1440,80L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
                ]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror"
              }}
            />
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#047857" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}