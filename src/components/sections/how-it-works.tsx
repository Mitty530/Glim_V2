'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence, MotionValue } from 'framer-motion'
import { ScrollAnimation } from '@/components/ui/scroll-animation'
import { ParallaxEffect } from '@/components/ui/parallax-effect'
import { fadeUp, fadeIn, slideInLeft, slideInRight, zoomIn, bounceIn, rotateIn } from '@/hooks/useScrollAnimation'

// Improved animation variants with 3D effects
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
      duration: 0.7
    }
  }
}

const textVariants = {
  hidden: { opacity: 0, y: 20, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      duration: 0.7
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 5, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 100,
      duration: 0.7
    }
  }
}

// 3D tilt effect hook
function useTilt(initialState: { x: number, y: number, scale: number } = { x: 0, y: 0, scale: 1 }) {
  const [tilt, setTilt] = useState(initialState);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    
    setTilt({
      x: x * 15, // -7.5 to 7.5 degrees
      y: -y * 15, // -7.5 to 7.5 degrees
      scale: 1.05
    });
  };
  
  const handleMouseLeave = () => {
    setTilt(initialState);
  };
  
  return {
    tilt,
    handleMouseMove,
    handleMouseLeave
  };
}

// Enhanced mockup UI component with 3D tilt effect
function MockupUI({ step, color, icon, content }: { step: number, color: string, icon: React.ReactNode, content: string }) {
  const uiRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(uiRef, { once: false, amount: 0.3 });
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt();
  
  // Content reveal animation variants
  const contentRevealVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.4,
        delay: 0.2
      }
    }
  };
  
  // Indicator pulse animation
  const pulseVariants = {
    idle: { scale: 1, opacity: 0.7 },
    pulse: { 
      scale: [1, 1.1, 1], 
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <motion.div 
      ref={uiRef}
      className="perspective-1000 transform-gpu"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      style={{ 
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${tilt.scale})`,
        transition: "transform 0.2s ease-out"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl border border-gray-800 transform-gpu">
        {/* Window header with float effect */}
        <motion.div 
          className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-gray-400">Glim App</div>
          <div className="w-6"></div>
        </motion.div>
        
        {/* App content with 3D effect */}
        <div className="p-5">
          {/* Input method indicator */}
          <motion.div 
            className="flex mb-4 justify-center"
            variants={contentRevealVariants}
          >
            <motion.div 
              className={`px-4 py-2 rounded-md text-sm font-medium ${color} text-white shadow-lg`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {step === 1 ? "Voice" : step === 2 ? "Camera" : "Text"}
            </motion.div>
          </motion.div>
          
          {/* For Voice Step - Show microphone with animation */}
          {step === 1 && (
            <>
              <motion.div 
                className="flex items-center justify-center mb-4"
                variants={contentRevealVariants}
              >
                <motion.div 
                  className={`w-12 h-12 rounded-full bg-indigo-600/30 flex items-center justify-center mb-2`}
                  variants={pulseVariants}
                  initial="idle"
                  animate="pulse"
                >
                  {icon}
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-center mb-3"
                variants={contentRevealVariants}
              >
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden w-full max-w-md">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
                    animate={{ 
                      width: ["0%", "100%", "30%", "80%", "60%", "100%"],
                      transition: { 
                        duration: 4, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }
                    }}
                  />
                </div>
              </motion.div>
            </>
          )}
          
          {/* Captured text area with typing effect */}
          <motion.div 
            className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 text-gray-300 text-sm font-mono shadow-inner border border-gray-700/50"
            variants={contentRevealVariants}
            style={{ 
              transformStyle: "preserve-3d", 
              transform: "translateZ(10px)" 
            }}
          >
            <div className="overflow-hidden break-words whitespace-pre-wrap max-h-[150px] overflow-y-auto text-xs md:text-sm">
              {content}
            </div>
          </motion.div>
          
          {/* Action button with glow effect */}
          <motion.div 
            className="flex justify-end mt-4"
            variants={contentRevealVariants}
          >
            <motion.button 
              className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white shadow-lg`}
              whileHover={{ 
                scale: 1.1, 
                boxShadow: `0 0 20px 2px ${color === "bg-pink-500" ? "rgba(236, 72, 153, 0.5)" : "rgba(79, 70, 229, 0.5)"}` 
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100
  });
  
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [20, 0, 0, 20]);
  const scale = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0.95, 1, 1, 0.95]);
  
  // Step 3D rotation effects
  const rotateX = useTransform(smoothProgress, [0, 1], [2, -2]);
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [-2, 0, 2]);
  
  // Background animation values
  const bgOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const gradient1X = useTransform(smoothProgress, [0, 1], ["0%", "10%"]);
  const gradient1Y = useTransform(smoothProgress, [0, 1], ["0%", "5%"]);
  const gradient2X = useTransform(smoothProgress, [0, 1], ["100%", "90%"]);
  const gradient2Y = useTransform(smoothProgress, [0, 1], ["100%", "95%"]);
  
  const steps = [
    {
      heading: "Voice Input",
      description: "Quickly capture meeting details using your voice after a call or meeting",
      icon: (
        <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      color: "bg-indigo-600",
      content: "\"Just had a productive call with Alex Chen, CTO at Quantum Innovations. They're looking to revamp their cybersecurity infrastructure by Q3 2025. Budget is $450K. Need to prepare a custom demo focusing on their healthcare compliance requirements.\""
    },
    {
      heading: "Camera Input",
      description: "Scan business cards and handwritten notes with your camera",
      icon: (
        <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: "bg-indigo-600",
      content: "Business card scan: Alex Chen, CTO\nQuantum Innovations, Inc.\nPhone: (415) 555-8292\nEmail: alex.chen@quantuminnovations.com\nNote: Discussed cybersecurity infrastructure revamp, Q3 2025, $450K budget"
    },
    {
      heading: "Text Input",
      description: "Type or paste your notes directly",
      icon: (
        <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      color: "bg-pink-500",
      content: "Meeting with David Kim, Head of Product at EcoSmart Solutions today\nThey need help with their sustainability tracking software\nBudget: $300K, timeline is ASAP\nHe's interested in data visualization features and API integrations\nPersonal note: Training for a marathon next month"
    }
  ];
  
  return (
    <motion.section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900 overflow-hidden relative"
      id="how-it-works"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ perspective: 1000 }}
    >
      {/* Enhanced background elements with parallax motion */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"
          style={{ 
            opacity: bgOpacity,
            backgroundPosition: `${gradient1X}% ${gradient1Y}%` 
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"
          style={{ 
            opacity: bgOpacity,
            backgroundPosition: `${gradient2X}% ${gradient2Y}%` 
          }}
        />
        
        {/* Floating elements in background */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-500/5 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/5 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header with 3D perspective */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-24"
          style={{ 
            opacity, 
            y,
            scale,
            rotateX,
            transformPerspective: "1000px",
            transformStyle: "preserve-3d"
          }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-purple-300"
            variants={textVariants}
          >
            How Glim Works
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300/90 max-w-2xl mx-auto"
            variants={textVariants}
          >
            Transform your notes into actionable insights in three simple steps
          </motion.p>
        </motion.div>
        
        {/* Enhanced step layout with 3D cards */}
        <motion.div 
          className="max-w-6xl mx-auto"
          style={{ 
            rotateY,
            transformPerspective: "2000px"
          }}
        >
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="flex flex-col h-full"
                variants={cardVariants}
                custom={index}
                whileHover={{ 
                  y: -10, 
                  zIndex: 10,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
              >
                <motion.div 
                  className="bg-gray-900/50 backdrop-blur-lg p-6 rounded-2xl border border-gray-800/50 shadow-xl h-full flex flex-col transform-gpu"
                  whileHover={{ 
                    boxShadow: index === 2 
                      ? "0 20px 40px -10px rgba(236, 72, 153, 0.25), 0 0 15px rgba(236, 72, 153, 0.15)" 
                      : "0 20px 40px -10px rgba(79, 70, 229, 0.25), 0 0 15px rgba(79, 70, 229, 0.15)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: index === 2 ? 15 : 20 }}
                >
                  {/* Step number with floating effect */}
                  <motion.div 
                    className="mb-6 flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <motion.div 
                      className={`w-10 h-10 rounded-full ${index === 2 ? 'bg-pink-500' : 'bg-indigo-600'} flex items-center justify-center text-white font-bold text-xl shadow-lg mr-4`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {index + 1}
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="text-2xl font-bold text-white mb-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 * index, duration: 0.5 }}
                      >
                        {step.heading}
                      </motion.h3>
                      <motion.p 
                        className="text-sm text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 * index, duration: 0.5 }}
                      >
                        {step.description}
                      </motion.p>
                    </div>
                  </motion.div>
                  
                  {/* UI Component with enhanced 3D */}
                  <div className="mt-auto">
                    <MockupUI 
                      step={index + 1}
                      color={step.color}
                      icon={step.icon}
                      content={step.content}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          {/* Enhanced explanation with floating button */}
          <motion.div 
            className="mt-20 max-w-2xl mx-auto text-center"
            variants={textVariants}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <motion.p 
              className="text-lg text-gray-300/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              After capturing information, Glim&apos;s AI extracts key details, 
              identifies action items, and organizes everything into structured data 
              that integrates with your existing workflow.
            </motion.p>
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.a 
                href="#demo" 
                className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition duration-200 shadow-lg"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4), 0 0 10px rgba(79, 70, 229, 0.3)" 
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Try It Now
                <motion.svg 
                  className="ml-2 w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: "loop", 
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
} 