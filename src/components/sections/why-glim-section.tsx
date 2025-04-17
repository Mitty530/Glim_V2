'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { ParallaxEffect } from '@/components/ui/parallax-effect'
import Image from 'next/image'

// Enhanced animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } }
};

const staggerItems = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.2,
    } 
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut"
    }
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const itemVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const rightItemVariants = {
  initial: { opacity: 0, x: 10 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// VS toggle animation
const vsVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    rotate: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.34, 1.56, 0.64, 1], // Spring-like effect
      delay: 0.3
    }
  }
};

// Line animation
const lineVariants = {
  initial: { scaleX: 0, opacity: 0 },
  animate: { 
    scaleX: 1, 
    opacity: 1,
    transition: { 
      duration: 0.4, 
      ease: "easeOut",
      delay: 0.6
    }
  }
};

// Dot animation
const dotVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.3, 
      ease: "easeOut",
      delay: 0.7
    }
  }
};

// Comparison data
const traditionalApproaches = [
  "Forgetting details after meetings",
  "Feeling unsure how to follow up because you don't remember enough",
  "Strained, shallow conversations due to lack of context",
  "Relationships that fade after one interaction",
  "Mental overload trying to track every name, goal, and thread",
  "Wasting time digging through old notes, emails, and CRMs",
  "Struggling to scale personal relationships as your network grows",
  "Trying to be thoughtful, but missing the details that make it personal"
];

const glimAdvantages = [
  "Effortless recall of key details from every meeting",
  "Instant context before every follow-up",
  "Insightful conversation openers drawn from your past interactions",
  "Guidance on what to bring up — and what to hold back",
  "Prioritized memory: what matters most, and when to mention it",
  "Deeper, more personal conversations that build trust",
  "Scalable relationship-building without sacrificing authenticity",
  "Relationship context stays fresh, even after time apart"
];

// Shield/Badge icon
const ShieldIcon = ({ className = "" }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

// Check mark icon
const CheckIcon = ({ className = "" }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

// Enhanced text animation variants
const textReveal = {
  initial: { y: 100, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.33, 1, 0.68, 1] // Custom spring-like easing
    }
  }
};

const splitTextReveal = {
  initial: { opacity: 0, y: 50 },
  animate: (i: number) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      delay: i * 0.08,
      ease: "easeOut"
    }
  })
};

// Add containerVariants for staggering text
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, 
      delayChildren: 0.2
    }
  }
};

export function WhyGlimSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [hoveredCard, setHoveredCard] = useState<'left' | 'right' | null>(null);
  
  // Add client-side only state
  const [isClient, setIsClient] = useState(false);
  
  // Ensure we only run client-side code after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Scroll-based parallax effect - only used on client
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  // For split text animation
  const words = ["Feel", "The", "Freedom", "of", "Better", "Relationships"];
  
  return (
    <section 
      id="why-glim"
      ref={containerRef} 
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Enhanced background decoration */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#064e3b] to-[#10b981] opacity-90 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 1.2 }}
      />

      {/* Animated glow elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-25"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.25, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-[35rem] h-[35rem] bg-emerald-400 rounded-full blur-[150px] opacity-25"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.25, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-teal-400 rounded-full blur-[120px] opacity-15"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Leaf pattern overlay with animation */}
      <motion.div 
        className="absolute inset-0 leaf-pattern opacity-0 z-0 pointer-events-none" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.2 }}
      />

      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Heading Area */}
          <div className="container mx-auto px-4 relative z-10 mb-16 md:mb-24 text-center">
            <motion.div 
              className="inline-flex items-center bg-white/90 backdrop-blur-sm py-1.5 px-4 rounded-full mb-6 shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <CheckIcon className="w-4 h-4 mr-2 text-emerald-600" />
              <span className="text-sm font-semibold text-gray-800">Why Choose Glim</span>
            </motion.div>
            
            {/* Animated Headline */}
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg overflow-hidden"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
              variants={textReveal}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
            >
              Deeper Trust. Stronger Follow-Ups. Better Relationships
            </motion.h2>
            
            {/* Split Text Subheadline */}
            <motion.p 
              className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md leading-relaxed"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <span className="block">The cost of forgetting isn't small. It's every opportunity that never called back.</span>
              <span className="block mt-2">Never underestimate the power of small contextual details in relationships.</span>
            </motion.p>
          </div>

          {/* Comparison cards with better position for VS overlay */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-16 max-w-6xl mx-auto relative">
            {/* WITHOUT US card with enhanced contrast */}
            <motion.div 
              className="flex-1 bg-black/30 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 shadow-xl relative"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              variants={cardVariants}
              onMouseEnter={() => setHoveredCard('left')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card header with subtle animation */}
              <motion.div 
                className="bg-black/50 p-5 flex justify-center relative overflow-hidden"
                whileHover={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3 
                  className="text-2xl font-bold text-white relative z-10"
                  initial={{ opacity: 0.9 }}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  WITHOUT US
                </motion.h3>
              </motion.div>

              {/* Animated list items with enhanced visibility */}
              <div className="p-6 md:p-8 relative">
                <motion.ul 
                  className="space-y-5"
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                  variants={staggerItems}
                >
                  {traditionalApproaches.map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-3"
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                      <ShieldIcon className="w-6 h-6 text-gray-300 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-100 font-medium drop-shadow-sm">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>

            {/* VS Toggle and connecting lines between cards - Enhanced for better visibility */}
            <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-24">
              <div className="relative flex items-center justify-center">
                {/* Left connection line with circle */}
                <div className="absolute left-0 right-1/2 flex items-center justify-start mr-5">
                  <motion.div 
                    className="w-full h-[2px] bg-gray-200"
                    variants={lineVariants}
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                  />
                  <motion.div 
                    className="absolute right-0 w-2 h-2 bg-gray-200 rounded-full"
                    variants={dotVariants}
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                  />
                </div>
                
                {/* VS Toggle with enhanced animated appearance */}
                <motion.div 
                  className="flex-shrink-0 z-10"
                  variants={vsVariants}
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                >
                  <motion.div 
                    className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-lg border-2 border-emerald-500/40"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 0 25px rgba(16, 185, 129, 0.6)",
                      borderColor: "rgba(16, 185, 129, 0.7)"
                    }}
                  >
                    <span className="text-white text-lg font-bold">
                      VS
                    </span>
                  </motion.div>
                </motion.div>
                
                {/* Right connection line with circle */}
                <div className="absolute left-1/2 right-0 flex items-center justify-end ml-5">
                  <motion.div 
                    className="absolute left-0 w-2 h-2 bg-[#4ade80] rounded-full shadow-sm shadow-[#4ade80]/50"
                    variants={dotVariants}
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                  />
                  <motion.div 
                    className="w-full h-[2px] bg-[#4ade80] shadow-sm shadow-[#4ade80]/30"
                    variants={lineVariants}
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                  />
                </div>
              </div>
            </div>

            {/* GLIM card with enhanced visibility */}
            <motion.div 
              className="flex-1 bg-white/15 backdrop-blur-sm rounded-3xl overflow-hidden border border-[#4ade80]/40 shadow-2xl relative"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              variants={cardVariants}
              onMouseEnter={() => setHoveredCard('right')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Enhanced card header */}
              <motion.div 
                className="bg-[#10b981] p-5 flex justify-center items-center gap-3 relative overflow-hidden"
                whileHover={{ backgroundColor: "#0d9868" }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background effect */}
                <motion.div 
                  className="absolute inset-0 opacity-40"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.4 }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  style={{
                    background: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)"
                  }}
                />

                {/* Animated logo with enhanced effects */}
                <motion.div 
                  className="relative z-10 w-8 h-8 rounded-full bg-white/30 flex items-center justify-center shadow-md shadow-emerald-800/20"
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  <span className="text-white font-bold text-sm">G</span>
                </motion.div>

                <motion.h3 
                  className="text-2xl font-bold text-white relative z-10 drop-shadow-sm"
                  initial={{ opacity: 0.9 }}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Glim AI
                </motion.h3>
              </motion.div>

              {/* Animated list items with enhanced visibility */}
              <div className="p-6 md:p-8 relative">
                <motion.ul 
                  className="space-y-5"
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                  variants={staggerItems}
                >
                  {glimAdvantages.map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-3"
                      variants={rightItemVariants}
                      custom={index}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                      <motion.div 
                        className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-500/40"
                        whileHover={{ scale: 1.1, backgroundColor: "#4ade80", boxShadow: "0 0 12px rgba(74, 222, 128, 0.6)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <CheckIcon className="w-3.5 h-3.5 text-white" />
                      </motion.div>
                      <span className="text-white font-medium drop-shadow-sm">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Subtle animated glow effect on the card */}
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-[#4ade80]/0 via-[#4ade80]/30 to-[#4ade80]/0 opacity-0 rounded-3xl"
                animate={{ 
                  opacity: [0, 0.3, 0],
                  x: ['-100%', '100%', '100%'],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  repeatDelay: 5
                }}
              />
            </motion.div>
          </div>
          
          {/* Enhanced vertical connection for mobile view */}
          <motion.div 
            className="md:hidden flex flex-col items-center relative my-4 z-10"
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            <div className="flex flex-col items-center">
              <motion.div 
                className="h-8 w-[2px] bg-gray-200"
                variants={lineVariants}
              />
              <motion.div 
                className="w-2 h-2 bg-gray-200 rounded-full"
                variants={dotVariants}
              />
            </div>
            
            <motion.div 
              className="relative my-2"
              variants={vsVariants}
            >
              <motion.div 
                className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-lg border-2 border-emerald-500/40"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 25px rgba(16, 185, 129, 0.6)",
                  borderColor: "rgba(16, 185, 129, 0.7)"
                }}
              >
                <span className="text-white text-lg font-bold">
                  VS
                </span>
              </motion.div>
            </motion.div>
            
            <div className="flex flex-col items-center">
              <motion.div 
                className="w-2 h-2 bg-[#4ade80] rounded-full shadow-sm shadow-[#4ade80]/50"
                variants={dotVariants}
              />
              <motion.div 
                className="h-8 w-[2px] bg-[#4ade80] shadow-sm shadow-[#4ade80]/30"
                variants={lineVariants}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 