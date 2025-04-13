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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      id="home"
    >
      <AnimatedBackground />
      
      <div className="absolute inset-0 z-10 bg-black/60" />
      
      <div className="container mx-auto px-4 z-20 relative py-20">
        <motion.div 
          style={{ y, opacity, scale }} 
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div 
            {...fadeIn}
            className="mb-12"
          >
            <motion.span 
              className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-lg md:text-xl font-medium tracking-wide rounded-full px-8 py-3 border border-brand-primary/30 shadow-lg shadow-brand-primary/10 inline-block"
              whileHover={{ 
                y: -3, 
                boxShadow: "0 10px 25px rgba(60, 165, 92, 0.2)",
                transition: { duration: 0.2 }
              }}
            >
              The human brain was never meant to be a CRM
            </motion.span>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="mb-16"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight mb-10"
              style={{ 
                letterSpacing: '-0.02em',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              <motion.span 
                className="block mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                Glim is an AI
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                Relationship Memory
              </motion.span>
              <motion.span 
                className="block mt-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                Engine.
              </motion.span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Stop losing opportunities because you forgot what mattered. 
              <span className="block mt-4 text-brand-primary">
                That great connection you made last month? It's fading from memory right now.
              </span>
            </motion.p>
        
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }} 
                whileTap={{ scale: 0.97 }}
              >
                <Link 
                  href="#waitlist"
                  className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-medium py-4 px-10 rounded-full inline-flex items-center justify-center shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/30 transition-all duration-300 group text-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    const waitlistSection = document.getElementById('waitlist');
                    if (waitlistSection) {
                      waitlistSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <span>Join Waitlist</span>
                  <svg 
                    className="w-6 h-6 ml-2 transition-all duration-300 group-hover:rotate-45 group-hover:translate-x-1" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                  </svg>
                </Link>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }} 
                whileTap={{ scale: 0.97 }}
              >
                <Link 
                  href="#how-it-works"
                  className="bg-white/10 backdrop-blur-sm text-white font-medium py-4 px-10 rounded-full inline-flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 group text-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    const howItWorksSection = document.getElementById('how-it-works');
                    if (howItWorksSection) {
                      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <span>How It Works</span>
                  <svg 
                    className="w-6 h-6 ml-2 transition-all duration-300 group-hover:translate-y-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex justify-center items-center space-x-6">
              <div className="flex -space-x-3">
                {["SL", "JD", "AR", "+"].map((initials, i) => (
                  <motion.div 
                    key={initials}
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-brand-primary text-sm font-medium shadow-md border border-brand-primary/10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    whileHover={{ y: -2, scale: 1.1, zIndex: 10 }}
                  >
                    {initials}
                  </motion.div>
                ))}
              </div>
              <motion.div 
                className="text-lg font-medium text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <motion.span 
                  className="font-semibold text-xl inline-block"
                  animate={{ 
                    color: ["#3ca55c", "#52c234", "#3ca55c"],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  250+
                </motion.span>
                <span className="ml-2">business professionals already on the waitlist</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
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