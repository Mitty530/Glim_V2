'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ParallaxEffect } from '@/components/ui/parallax-effect'

// Leaf SVG component
const LeafIcon = ({ className = "" }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
  >
    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
  </svg>
);

// Memory thread SVG
const ThreadIcon = ({ className = "" }) => (
  <svg 
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
    <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>
    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
  </svg>
);

// Digital Memory Animation - Enhanced with relationship memory paths
const DigitalMemoryAnimation = () => {
  const nodeCount = 12;
  const connectionCount = 15;
  const nodes = Array.from({ length: nodeCount });
  const connections = Array.from({ length: connectionCount });

  // Create 'memory nodes' for the animation
  const nodePositions = nodes.map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5
  }));

  // Create connections between nodes
  const nodeConnections = connections.map(() => {
    const start = Math.floor(Math.random() * nodeCount);
    let end = Math.floor(Math.random() * nodeCount);
    while (end === start) {
      end = Math.floor(Math.random() * nodeCount);
    }
    return { start, end };
  });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
      <div className="relative w-full h-full">
        {/* Memory Nodes */}
        {nodePositions.map((node, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute rounded-full bg-brand-primary/80"
            style={{
              width: node.size,
              height: node.size,
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
              boxShadow: [
                '0 0 0 rgba(60, 165, 92, 0)',
                '0 0 20px rgba(60, 165, 92, 0.5)',
                '0 0 0 rgba(60, 165, 92, 0)'
              ]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}

        {/* SVG Connections */}
        <svg className="absolute inset-0 w-full h-full">
          {nodeConnections.map((connection, i) => {
            const start = nodePositions[connection.start];
            const end = nodePositions[connection.end];
            
            return (
              <motion.line
                key={`connection-${i}`}
                x1={`${start.x}%`}
                y1={`${start.y}%`}
                x2={`${end.x}%`}
                y2={`${end.y}%`}
                stroke="#3ca55c"
                strokeWidth="1"
                strokeOpacity="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

// Animated background gradient - Updated for better memory visualization
const AnimatedBackground = () => (
  <motion.div 
    className="absolute inset-0 z-0 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
    
    {/* Memory pulse effects */}
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div
        key={`memory-pulse-${i}`}
        className="memory-pulse absolute"
        style={{
          left: `${20 + i * 15}%`,
          top: `${30 + (i % 3) * 20}%`,
          width: `${30 + i * 10}px`,
          height: `${30 + i * 10}px`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 2, 0],
          opacity: [0, 0.3, 0]
        }}
        transition={{
          duration: 4 + i,
          repeat: Infinity,
          delay: i * 2,
          ease: "easeInOut"
        }}
      />
    ))}
  </motion.div>
);

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

export function HeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  
  // Scroll-based parallax effect for the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Transform values based on scroll position
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-20 md:py-0 flex flex-col justify-center overflow-hidden bg-black"
      id="home"
    >
      {/* Background elements */}
      <AnimatedBackground />
      
      {/* Improved background contrast */}
      <div className="absolute inset-0 z-10 bg-black/60"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/40 to-black/70"></div>
      
      {/* Digital memory visualization in background */}
      <DigitalMemoryAnimation />
      
      {/* Content */}
      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            style={{ y, opacity, scale }} 
            className="flex flex-col lg:flex-row lg:items-center lg:gap-12"
          >
            {/* Main content area - Updated messaging */}
            <div className="lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
              <motion.div 
                {...fadeIn}
                className="mb-8 inline-block"
              >
                <motion.span 
                  className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-sm md:text-base font-medium tracking-wide rounded-full px-5 py-2 border border-brand-primary/30 shadow-lg shadow-brand-primary/10 inline-block"
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
                className="mb-10"
              >
                {/* New headline focused on the core value proposition */}
                <motion.h1 
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-10 text-white"
                  style={{ 
                    letterSpacing: '-0.02em',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  <motion.span 
                    className="block mb-2 inline-flex relative"
                    whileHover={{ 
                      color: "#4ade80",
                      transition: { duration: 0.3 }
                    }}
                  >
                    Glim is an AI Relationship
                    <motion.span 
                      className="absolute bottom-0 left-0 h-[2px] bg-brand-primary/50"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </motion.span>
                  <motion.span 
                    className="block relative inline-flex"
                    whileHover={{ 
                      color: "#4ade80",
                      transition: { duration: 0.3 }
                    }}
                  >
                    Memory Engine.
                    <motion.span 
                      className="absolute bottom-0 left-0 h-[2px] bg-brand-primary/50"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </motion.span>
                </motion.h1>
                
                {/* Strong subheading focusing on emotional pain point */}
                <motion.p
                  variants={fadeInUp}
                  className="text-lg md:text-xl text-gray-300 mb-6 max-w-xl mx-auto lg:mx-0"
                >
                  Stop losing opportunities because you forgot what mattered. That great connection you made last month? It's fading from memory right now.
                </motion.p>
            
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  className="mb-10 mt-10"
                >
                  <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -5 }} 
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link 
                        href="#waitlist"
                        className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-medium py-3.5 px-8 rounded-full inline-flex items-center justify-center shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/30 transition-all duration-300 group relative overflow-hidden"
                        onClick={(e) => {
                          e.preventDefault();
                          const waitlistSection = document.getElementById('waitlist');
                          if (waitlistSection) {
                            waitlistSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        data-cursor-text="Join now"
                      >
                        {/* Shine effect on hover */}
                        <motion.div 
                          className="absolute inset-0 w-full h-full"
                          initial={{ x: '-100%', opacity: 0 }}
                          whileHover={{ 
                            x: '100%', 
                            opacity: [0, 0.5, 0],
                            transition: { duration: 1, repeat: Infinity, repeatDelay: 0.5 }
                          }}
                        >
                          <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent transform rotate-12 translate-x-1/2" />
                        </motion.div>
                        
                        <span className="relative z-10">Join Waitlist</span>
                        <svg 
                          className="w-5 h-5 ml-2 transition-all duration-300 group-hover:rotate-45 group-hover:translate-x-1 relative z-10" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" fill="currentColor" />
                        </svg>
                      </Link>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -5 }} 
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link 
                        href="#how-it-works"
                        className="bg-white/10 backdrop-blur-sm text-white font-medium py-3.5 px-8 rounded-full inline-flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-sm relative overflow-hidden"
                        onClick={(e) => {
                          e.preventDefault();
                          const howItWorksSection = document.getElementById('how-it-works');
                          if (howItWorksSection) {
                            howItWorksSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        data-cursor-text="See how"
                      >
                        {/* Subtle pulse effect on hover */}
                        <motion.div 
                          className="absolute inset-0 rounded-full bg-brand-primary/5"
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileHover={{ 
                            scale: [0.8, 1.05, 0.8], 
                            opacity: [0, 0.5, 0],
                            transition: { duration: 2, repeat: Infinity }
                          }}
                        />
                        
                        <span className="relative z-10">How It Works</span>
                        <svg 
                          className="w-5 h-5 ml-2 transition-all duration-300 group-hover:translate-y-1 relative z-10" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Key metrics highlight - Updated with stronger stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-10 hidden md:block"
              >
                <div className="flex justify-start items-center space-x-8">
                  <div className="flex -space-x-3">
                    {["SL", "JD", "AR", "+"].map((initials, i) => (
                      <motion.div 
                        key={initials}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-primary text-sm font-medium shadow-md border border-brand-primary/10"
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
                    className="text-sm font-medium text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                  >
                    <motion.span 
                      className="font-semibold inline-block"
                      animate={{ 
                        color: ["#3ca55c", "#52c234", "#3ca55c"],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      250+
                    </motion.span> business professionals already on the waitlist
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Visual explanation with enhanced memory demonstration */}
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="relative"
              >
                {/* Video-like container showing memory in action */}
                <div className="bg-gray-900 backdrop-blur-md rounded-2xl shadow-xl shadow-black/20 border border-white/5 relative overflow-hidden group">
                  {/* Screen recording frame */}
                  <div className="bg-gray-800 h-8 w-full flex items-center px-4 border-b border-white/5">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-gray-400">Glim Memory Engine Demo</span>
                    </div>
                  </div>
                  
                  {/* Content area showing "forgotten connections" transforming into "remembered opportunities" */}
                  <div className="p-6">
                    {/* Animated sequence showing memory capture */}
                    <div className="space-y-6">
                      <motion.div 
                        className="p-4 bg-black/40 rounded-lg border border-white/10"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary mr-3">
                            <span className="text-sm">JD</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">John Davis</div>
                            <div className="text-xs text-gray-400">CEO @ TechVentures</div>
                          </div>
                        </div>
                        
                        <motion.div 
                          className="text-gray-300 text-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          "Looking for a solution that helps with customer profile management and follow-ups. Our current process is too manual."
                        </motion.div>
                      </motion.div>
                      
                      <motion.div 
                        className="p-4 bg-brand-primary/10 rounded-lg border border-brand-primary/20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-brand-primary font-medium">Memory Captured</div>
                          <div className="text-xs text-brand-primary/70">Just now</div>
                        </div>
                        
                        <motion.div 
                          className="space-y-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 }}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-brand-primary/30 mr-2"></div>
                            <div className="text-gray-300 text-sm">Interested in customer profile management</div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-brand-primary/30 mr-2"></div>
                            <div className="text-gray-300 text-sm">Current process is manual</div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-brand-primary/30 mr-2"></div>
                            <div className="text-gray-300 text-sm">Position: CEO at TechVentures</div>
                          </div>
                        </motion.div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex justify-between items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                      >
                        <div className="text-xs text-gray-400">Saved to <span className="text-brand-primary">Leads database</span></div>
                        
                        <motion.div 
                          className="flex items-center text-brand-primary text-xs bg-brand-primary/10 px-3 py-1 rounded-md"
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.9, 1, 0.9]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          Memory Thread Active
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Recording indicator */}
                  <motion.div 
                    className="absolute top-3 right-4"
                    animate={{
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                      <span className="text-xs text-red-400">REC</span>
                    </div>
                  </motion.div>
                  
                  {/* Overlay scan lines for video effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <motion.div
                        key={`scanline-${i}`}
                        className="absolute w-full h-px bg-white/5"
                        style={{
                          top: `${(i / 40) * 100}%`,
                        }}
                        animate={{
                          opacity: [0.05, 0.1, 0.05]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.01
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Feature highlight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="mt-6"
              >
                <div className="bg-black/40 border border-white/10 backdrop-blur-sm p-4 rounded-lg overflow-hidden relative">
                  {/* Features list */}
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div 
                      className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        backgroundColor: ["rgba(60, 165, 92, 0.1)", "rgba(60, 165, 92, 0.2)", "rgba(60, 165, 92, 0.1)"]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </motion.div>
                    <div className="text-sm text-gray-300">
                      <span className="font-medium text-brand-primary">AI-powered</span> relationship memory
                    </div>
                  </div>
                  
                  <div className="pl-11 space-y-3">
                    <motion.div 
                      className="text-xs text-gray-400 flex items-center"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 }}
                    >
                      <div className="w-1 h-1 bg-brand-primary rounded-full mr-2"></div>
                      Automatically extract key details from every conversation
                    </motion.div>
                    <motion.div 
                      className="text-xs text-gray-400 flex items-center"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 }}
                    >
                      <div className="w-1 h-1 bg-brand-primary rounded-full mr-2"></div>
                      Personalize future interactions with perfect recall
                    </motion.div>
                    <motion.div 
                      className="text-xs text-gray-400 flex items-center"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.7 }}
                    >
                      <div className="w-1 h-1 bg-brand-primary rounded-full mr-2"></div>
                      Never miss a follow-up opportunity again
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Mobile-only waitlist counter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-8 md:hidden flex justify-center"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {["SL", "JD", "+"].map((initials, i) => (
                      <motion.div 
                        key={initials}
                        className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-brand-primary text-xs font-medium shadow-md border border-brand-primary/10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                      >
                        {initials}
                      </motion.div>
                    ))}
                  </div>
                  <motion.div 
                    className="text-xs font-medium text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                  >
                    <span className="font-semibold">250+</span> on waitlist
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Video effect dots overlaying the entire section */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 150 }).map((_, i) => (
          <motion.div
            key={`pixel-${i}`}
            className="absolute rounded-full bg-white/10"
            style={{
              width: 2,
              height: 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      {/* Bottom animated wave */}
      <div className="absolute bottom-0 left-0 right-0 h-20 z-0 overflow-hidden">
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