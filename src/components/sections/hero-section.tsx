'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } }
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.12,
      delayChildren: 0.1,
    } 
  }
};

// Animated background gradient
const AnimatedBackground = () => (
  <motion.div 
    className="absolute inset-0 z-0 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
  </motion.div>
);

export function HeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  
  // Scroll-based parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#f8f9ff] to-white"
      id="home"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]" />
      
      <div className="container mx-auto px-4 z-20 relative py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div 
            className="flex-1 text-left"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              variants={fadeInUp}
              className="mb-8"
            >
              <span className="text-[#4F46E5] font-medium text-lg">
                The human brain was never meant to be a CRM
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
            >
              Glim is an AI
              <span className="text-[#4F46E5] block mt-2">
                Relationship Memory
              </span>
              Engine.
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 mb-8 max-w-2xl"
            >
              Stop losing opportunities because you forgot what mattered.
              <span className="block mt-2 text-[#4F46E5]">
                That great connection you made last month? It's fading from memory right now.
              </span>
            </motion.p>
        
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4"
            >
              <Link 
                href="#waitlist"
                className="bg-[#4F46E5] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#4338CA] transition-all duration-200 inline-flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  const waitlistSection = document.getElementById('waitlist');
                  if (waitlistSection) {
                    waitlistSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Try for free
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Smart Card Preview */}
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-200 rounded-full blur-2xl opacity-20" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200 rounded-full blur-2xl opacity-20" />
              
              {/* Smart Card Preview */}
              <div className="bg-[#1a1d29] rounded-2xl shadow-2xl overflow-hidden border border-purple-500/10 p-6 relative backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-white/90 font-medium">Smart Contact Intelligence</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 font-bold text-xl">
                      AC
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-semibold">Alex Chen</h3>
                      <p className="text-gray-400">Chief Technology Officer</p>
                    </div>
                  </div>

                  <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                    <h4 className="text-gray-300 font-medium mb-2 text-sm uppercase">NOTES</h4>
                    <p className="text-gray-400 text-sm">
                      Last meeting: Discussed AI integration possibilities. Follow up next week.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">AI/ML</span>
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Enterprise</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 origin-bottom"
          animate={{
            y: [0, 5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-full absolute bottom-0" viewBox="0 0 1440 90" fill="none" preserveAspectRatio="none">
            <motion.path 
              d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,64C840,53,960,43,1080,42.7C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
              fill="url(#wave-gradient)"
              animate={{
                d: [
                  "M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,64C840,53,960,43,1080,42.7C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z",
                  "M0,64L60,58.7C120,53,240,43,360,37.3C480,32,600,32,720,42.7C840,53,960,75,1080,74.7C1200,75,1320,53,1380,42.7L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse"
              }}
            />
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3ca55c" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#52c234" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#3ca55c" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}