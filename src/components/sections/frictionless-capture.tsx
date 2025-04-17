'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// Enhanced animation variants with refined easing and hover states
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Item variant with refined easing and added rotation for dynamism
const itemVariants = {
  hidden: { x: -20, opacity: 0, rotate: -3 },
  visible: { 
    x: 0, 
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const iconWrapperVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    },
  },
};

// Arrow variant with subtle pulse on entry
const flowArrowVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: [1, 1.1, 1],
    transition: { 
      duration: 0.6,
      delay: 0.4,
      ease: "easeInOut",
      times: [0, 0.5, 1]
    }
  }
};

// Card hover variants
const cardHoverVariants = {
  hover: {
    scale: 1.03,
    backgroundColor: "#14b8a6",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.2, ease: "easeOut" }
  }
}

// Icon hover variants
const iconHoverVariants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.2, ease: "easeOut" }
  }
}

// Final box hover variants with enhanced animations
const finalBoxHoverVariants = {
  hover: {
    scale: 1.03,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
}

// Define a text animation sequence for letter-by-letter animation
const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

// Define continuous floating animation for icons
const floatVariants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};

export function FrictionlessCapture() {
  return (
    <section id="frictionless-capture" className="py-24 relative overflow-hidden bg-[#065f46]">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-16 text-center"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
          >
            Built for busy brains, <span className="block sm:inline">not perfect workflows</span>
          </motion.h2>
          
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-x-8 gap-y-10 mb-16">
              
              {/* Step 1: Input - Enhanced SVG with animations */}
              <motion.div 
                variants={{ ...itemVariants, ...cardHoverVariants }}
                whileHover="hover"
                className="bg-[#10b981] rounded-2xl p-8 flex flex-col items-center justify-start text-center h-full min-h-[320px] cursor-pointer"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">Effortless Input</h3>
                <p className="text-white/90 text-base mb-6 flex-grow">Just speak or type what's on your mind — no formatting, no organizing.</p>
                
                <motion.div 
                  whileHover="hover"
                  animate="animate"
                  variants={{ ...iconWrapperVariants, ...iconHoverVariants, ...floatVariants }}
                  className="w-24 h-24 flex items-center justify-center mt-auto"
                >
                  <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Enhanced chat bubble with subtle gradient */}
                    <defs>
                      <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="white" stopOpacity="1" />
                        <stop offset="100%" stopColor="white" stopOpacity="0.8" />
                      </linearGradient>
                      <filter id="chatShadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.2)" floodOpacity="0.3"/>
                      </filter>
                    </defs>
                    
                    <motion.path 
                      d="M95,25H25C18.373,25,13,30.373,13,37v33c0,6.627,5.373,12,12,12h15v20l26-20h29c6.627,0,12-5.373,12-12V37 C107,30.373,101.627,25,95,25z" 
                      fill="none" 
                      stroke="url(#chatGradient)" 
                      strokeWidth="5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      filter="url(#chatShadow)"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        transition: { duration: 0.7, ease: "easeOut" }
                      }}
                    />
                    
                    <motion.path 
                      d="M35 45 H85" 
                      stroke="white" 
                      strokeWidth="5" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: [0, 1],
                        transition: { 
                          duration: 0.8, 
                          ease: "easeOut", 
                          delay: 0.3,
                          opacity: { duration: 0.2 }
                        }
                      }}
                    />
                    
                    <motion.path 
                      d="M35 60 H65" 
                      stroke="white" 
                      strokeWidth="5" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: [0, 1],
                        transition: { 
                          duration: 0.6, 
                          ease: "easeOut", 
                          delay: 0.6,
                          opacity: { duration: 0.2 }
                        }
                      }}
                    />
                    
                    <motion.path 
                      d="M90,30L70,50l-5,15l15-5l20-20c2.5-2.5,2.5-6.5,0-9s-6.5-2.5-9,0" 
                      stroke="white" 
                      strokeWidth="5" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: 1,
                        transition: { 
                          duration: 1.2, 
                          ease: "easeOut", 
                          delay: 0.8 
                        }
                      }}
                    />
                    
                    {/* Pencil tip highlight */}
                    <motion.circle 
                      cx="70" 
                      cy="50" 
                      r="3" 
                      fill="#84e2d8"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.5, 1], 
                        opacity: [0, 1],
                        transition: { 
                          duration: 0.5, 
                          delay: 1.8,
                          times: [0, 0.6, 1]
                        }
                      }}
                    />
                    
                    {/* Animated pulse effect for writing */}
                    <motion.circle
                      cx="70"
                      cy="50"
                      r="10"
                      fill="#84e2d8"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1.5, 2],
                        opacity: [0, 0.5, 0],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                          delay: 2
                        }
                      }}
                    />
                  </svg>
                </motion.div>
              </motion.div>
              
              {/* Arrow for desktop - Added pulse animation */}
              <motion.div 
                variants={flowArrowVariants} 
                initial="hidden"
                animate="visible"
                className="hidden md:flex items-center justify-center pt-20"
              >
                <motion.div 
                  whileHover={{ x: [0, 5, 0], transition: { duration: 0.5, repeat: Infinity } }}
                  className="bg-[#10b981]/20 p-2 rounded-full"
                >
                  <ArrowRight className="text-white w-10 h-10" />
                </motion.div>
              </motion.div>
              
              {/* Step 2: Processing - Enhanced brain icon with animations */}
              <motion.div 
                variants={{ ...itemVariants, ...cardHoverVariants }}
                whileHover="hover"
                className="bg-[#10b981] rounded-2xl p-8 flex flex-col items-center justify-start text-center h-full min-h-[320px] cursor-pointer"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">AI Processing</h3>
                <p className="text-white/90 text-base mb-6 flex-grow">Behind the scenes, Glim transforms raw input into structured insight.</p>
                
                <motion.div 
                  whileHover="hover"
                  animate="animate"
                  variants={{ ...iconWrapperVariants, ...iconHoverVariants, ...floatVariants }}
                  className="w-24 h-24 flex items-center justify-center mt-auto"
                >
                  <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Glowing brain gradient with enhanced effects */}
                    <defs>
                      <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="white" stopOpacity="1" />
                        <stop offset="100%" stopColor="#ecfdf5" stopOpacity="0.9" />
                      </linearGradient>
                      <filter id="brainGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    
                    <motion.path 
                      d="M60 105C45 105 25 95 25 65C25 35 45 15 60 15C75 15 95 35 95 65C95 95 75 105 60 105Z" 
                      stroke="url(#brainGradient)" 
                      strokeWidth="5" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      filter="url(#brainGlow)"
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ 
                        opacity: 1, 
                        pathLength: 1,
                        transition: { 
                          duration: 1.5, 
                          ease: "easeInOut"
                        }
                      }}
                    />
                    
                    <motion.path 
                      d="M60 15V105" 
                      stroke="white" 
                      strokeWidth="5" 
                      strokeLinecap="round" 
                      strokeDasharray="8 8"
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ 
                        opacity: 1, 
                        pathLength: 1,
                        transition: { 
                          duration: 1.2, 
                          ease: "easeInOut", 
                          delay: 0.5
                        }
                      }}
                    />
                    
                    <motion.path 
                      d="M32 40C38 35 42 37 45 40M45 40C50 45 48 52 45 55M45 55C40 60 35 58 30 55" 
                      stroke="white" 
                      strokeWidth="5" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: 1,
                        transition: { 
                          duration: 1.5, 
                          ease: [0.16, 1, 0.3, 1], 
                          delay: 0.8 
                        }
                      }}
                    />
                    
                    <motion.path 
                      d="M88 40C82 35 78 37 75 40M75 40C70 45 72 52 75 55M75 55C80 60 85 58 90 55" 
                      stroke="white" 
                      strokeWidth="5" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: 1,
                        transition: { 
                          duration: 1.5, 
                          ease: [0.16, 1, 0.3, 1], 
                          delay: 1 
                        }
                      }}
                    />
                    
                    {/* Neural nodes with pulsing effect */}
                    {[
                      { cx: 45, cy: 75, r: 6, delay: 1.6 },
                      { cx: 75, cy: 75, r: 6, delay: 1.8 },
                      { cx: 45, cy: 35, r: 4, delay: 2 },
                      { cx: 75, cy: 35, r: 4, delay: 2.2 }
                    ].map((node, i) => (
                      <React.Fragment key={i}>
                        <motion.circle 
                          cx={node.cx} 
                          cy={node.cy} 
                          r={node.r} 
                          fill="#84e2d8"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: [0, 1.2, 1], 
                            opacity: 1,
                            transition: { 
                              duration: 0.6, 
                              delay: node.delay,
                              times: [0, 0.6, 1]
                            }
                          }}
                        />
                        <motion.circle 
                          cx={node.cx} 
                          cy={node.cy} 
                          r={node.r * 1.5} 
                          fill="#84e2d8"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ 
                            scale: [0.8, 1.5, 0.8], 
                            opacity: [0, 0.3, 0],
                            transition: { 
                              duration: 2, 
                              repeat: Infinity,
                              repeatDelay: 1 + Math.random() * 2,
                              delay: node.delay + 0.5
                            }
                          }}
                        />
                      </React.Fragment>
                    ))}
                    
                    {/* Neural connections - animated electrical impulses */}
                    <motion.circle 
                      cx="60" 
                      cy="50" 
                      r="2" 
                      fill="white"
                      initial={{ opacity: 0, x: -25, y: -15 }}
                      animate={{
                        x: [-25, 15, -25],
                        y: [-15, 25, -15],
                        opacity: [0, 1, 0],
                        transition: {
                          duration: 1.2, 
                          repeat: Infinity, 
                          repeatDelay: 3,
                          times: [0, 0.5, 1]
                        }
                      }}
                    />
                  </svg>
                </motion.div>
              </motion.div>
              
              {/* Arrow for desktop - Added pulse animation */}
              <motion.div 
                variants={flowArrowVariants} 
                initial="hidden"
                animate="visible"
                className="hidden md:flex items-center justify-center pt-20"
              >
                <motion.div 
                  whileHover={{ x: [0, 5, 0], transition: { duration: 0.5, repeat: Infinity } }}
                  className="bg-[#10b981]/20 p-2 rounded-full"
                >
                  <ArrowRight className="text-white w-10 h-10" />
                </motion.div>
              </motion.div>
              
              {/* Step 3: Output - Enhanced recall icon with animations */}
              <motion.div 
                variants={{ ...itemVariants, ...cardHoverVariants }}
                whileHover="hover"
                className="bg-[#10b981] rounded-2xl p-8 flex flex-col items-center justify-start text-center h-full min-h-[320px] cursor-pointer"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">Perfect Recall</h3>
                <p className="text-white/90 text-base mb-6 flex-grow">Access exactly what you need, when you need it, without the mental overhead.</p>
                
                <motion.div 
                  whileHover="hover"
                  animate="animate"
                  variants={{ ...iconWrapperVariants, ...iconHoverVariants, ...floatVariants }}
                  className="w-24 h-24 flex items-center justify-center mt-auto"
                >
                  <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Enhanced magnifying glass with more effects */}
                    <defs>
                      <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="white" stopOpacity="1" />
                        <stop offset="100%" stopColor="#ecfdf5" stopOpacity="0.9" />
                      </linearGradient>
                      <filter id="glassShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.2)" floodOpacity="0.3"/>
                      </filter>
                    </defs>
                    
                    <motion.circle 
                      cx="50" 
                      cy="50" 
                      r="30" 
                      stroke="url(#glassGradient)" 
                      strokeWidth="5" 
                      fill="none"
                      filter="url(#glassShadow)"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        transition: { 
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                          delay: 0.3
                        }
                      }}
                    />
                    
                    <motion.line 
                      x1="71" 
                      y1="71" 
                      x2="95" 
                      y2="95" 
                      stroke="white" 
                      strokeWidth="7" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: 1,
                        transition: { 
                          duration: 0.6, 
                          ease: "easeOut", 
                          delay: 1.2 
                        }
                      }}
                    />
                    
                    {/* Animated star with enhanced effect */}
                    <motion.path 
                      d="M50 35 L53.5 47.9 L66 49.5 L55.8 58.1 L58.2 71 L50 64.5 L41.8 71 L44.2 58.1 L34 49.5 L46.5 47.9 Z" 
                      fill="#84e2d8"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.1, 1], 
                        opacity: 1,
                        rotate: [0, 15, 0],
                        transition: { 
                          duration: 1, 
                          delay: 1.5,
                          times: [0, 0.7, 1]
                        }
                      }}
                      filter="drop-shadow(0px 0px 8px rgba(132, 226, 216, 0.8))"
                    />
                    
                    {/* Animated sparkle with rotation */}
                    <motion.path 
                      d="M85 25 l3 -7 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 z" 
                      fill="#84e2d8"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.2, 1], 
                        opacity: [0, 1],
                        rotate: 360,
                        transition: { 
                          duration: 1.8, 
                          delay: 2,
                          rotate: { duration: 2 }
                        }
                      }}
                      filter="drop-shadow(0px 0px 5px rgba(132, 226, 216, 0.8))"
                    />
                    
                    {/* Search result highlight ring */}
                    <motion.circle 
                      cx="50" 
                      cy="50" 
                      r="18" 
                      stroke="#84e2d8" 
                      strokeWidth="2" 
                      strokeDasharray="4 4" 
                      fill="none"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: [0, 0.7, 0], 
                        scale: [0.8, 1.1, 0.8],
                        rotate: 360,
                        transition: { 
                          duration: 4, 
                          repeat: Infinity,
                          times: [0, 0.5, 1],
                          rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                        }
                      }}
                    />
                    
                    {/* Additional sparkle effects */}
                    {[
                      { cx: 42, cy: 40, delay: 2.2 },
                      { cx: 58, cy: 42, delay: 2.5 },
                      { cx: 45, cy: 60, delay: 2.8 }
                    ].map((point, i) => (
                      <motion.circle
                        key={i}
                        cx={point.cx}
                        cy={point.cy}
                        r="1.5"
                        fill="white"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: [0, 1.5, 0],
                          opacity: [0, 1, 0],
                          transition: {
                            duration: 1.5,
                            delay: point.delay,
                            repeat: Infinity,
                            repeatDelay: 3 + Math.random() * 2
                          }
                        }}
                      />
                    ))}
                  </svg>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Enhanced Final Result Text with custom typography */}
            <motion.div
              variants={{ ...itemVariants, ...finalBoxHoverVariants }}
              whileHover="hover"
              className="bg-gradient-to-r from-[#059669] to-[#0d9488] p-8 rounded-2xl max-w-2xl mx-auto text-center relative overflow-hidden"
              style={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
            >
              {/* Enhanced background effects */}
              <div className="absolute inset-0 bg-[#84e2d8] opacity-10 blur-xl rounded-full w-2/3 h-2/3 mx-auto my-auto"></div>
              <motion.div 
                className="absolute inset-0 w-full h-full"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 30%, rgba(132, 226, 216, 0.1) 0%, rgba(5, 150, 105, 0) 50%)",
                    "radial-gradient(circle at 80% 70%, rgba(132, 226, 216, 0.15) 0%, rgba(5, 150, 105, 0) 50%)",
                    "radial-gradient(circle at 20% 30%, rgba(132, 226, 216, 0.1) 0%, rgba(5, 150, 105, 0) 50%)"
                  ],
                  transition: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
              
              {/* Text container with letter-by-letter animation */}
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-center">
                  {/* First part of text with letter animation */}
                  <div className="flex mb-2 md:mb-0 justify-center">
                    {"Zero stress in.".split("").map((char, i) => (
                      <motion.span
                        key={i}
                        custom={i}
                        variants={letterVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={`inline-block ${char === " " ? "mr-2" : ""} font-light text-white/90 text-3xl md:text-4xl tracking-tight`}
                        style={{ 
                          fontFamily: "'Inter', sans-serif",
                          textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                  
                  <div className="mx-3 hidden md:block text-white/50">•</div>
                  
                  {/* Second part with emphasis */}
                  <div className="flex justify-center relative">
                    {"Full recall out.".split("").map((char, i) => (
                      <motion.span
                        key={i}
                        custom={i + 14} // Offset for delay after first part
                        variants={letterVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={`inline-block ${char === " " ? "mr-2" : ""} font-bold text-white text-3xl md:text-4xl tracking-tight`}
                        style={{ 
                          fontFamily: "'Inter', sans-serif",
                          textShadow: '0 1px 3px rgba(0,0,0,0.2)'
                        }}
                        whileHover={{
                          color: "#84e2d8",
                          scale: 1.1,
                          textShadow: '0 0 8px rgba(132, 226, 216, 0.6)',
                          transition: { duration: 0.2 }
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    
                    {/* Animated underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-[#84e2d8] rounded-full w-0"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 2 }}
                      style={{ boxShadow: '0 0 8px rgba(132, 226, 216, 0.6)' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 