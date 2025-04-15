'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

// Define types for feature items
interface FeatureItem {
  text: string;
  icon?: React.ReactNode;
}

// Define props for the component
interface AnimatedFeatureListProps {
  features?: FeatureItem[];
  className?: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Default feature data with icons
const defaultFeatures: FeatureItem[] = [
  {
    text: "Follow-ups that make people feel seen, not sold to",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    )
  },
  {
    text: "A second brain that remembers every key detail — so you don't have to",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    text: "Conversations that pick up where they left off — even weeks later",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    )
  },
  {
    text: "Context that builds trust, not just reminders that ping you",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    text: "Turning casual chats into compounding opportunities",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    text: "Never scrambling for \"what to say\" again",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    )
  },
  {
    text: "Keeping momentum warm — across deals, intros, and relationships",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    text: "Small details that make big impressions",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  },
  {
    text: "Confidence in your next conversation",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    text: "A reputation for being thoughtful, sharp, and on point",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  },
  {
    text: "Quiet confidence when you message someone — because you know *why* it matters",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

// Create a client-side only version of the feature list
const AnimatedFeatureList: React.FC<AnimatedFeatureListProps> = ({ 
  features = defaultFeatures,
  className = ""
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const duplicatedFeatures = [...features, ...features];
  
  return (
    <div 
      className={`relative overflow-hidden h-[500px] ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex flex-col space-y-4"
        animate={isPaused ? { y: 0 } : {
          y: [0, -800],
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        {duplicatedFeatures.map((feature, index) => (
          <motion.div
            key={`feature-${index}`}
            className="bg-white/95 backdrop-blur-md rounded-3xl shadow-lg p-7 flex items-start gap-5 mx-4 border border-indigo-100/30 transition-all duration-300"
            whileHover={{ 
              scale: 1.03,
              backgroundColor: "rgba(255, 255, 255, 1)",
              boxShadow: "0 25px 30px -12px rgba(79, 70, 229, 0.15), 0 18px 20px -15px rgba(79, 70, 229, 0.1)",
              borderColor: "rgba(79, 70, 229, 0.3)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.05,
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
          >
            {feature.icon && (
              <motion.div 
                className="text-indigo-600 flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center p-2 shadow-md border border-indigo-100"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(79, 70, 229, 0.1)",
                  transition: { duration: 0.2 }
                }}
              >
                {feature.icon}
              </motion.div>
            )}
            <div>
              <p className="text-gray-900 font-semibold text-lg leading-relaxed">{feature.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// Create a client-side only version with no SSR
const ClientOnlyAnimatedFeatureList = dynamic(
  () => Promise.resolve(AnimatedFeatureList),
  { ssr: false }
);

export function WaveGoodbyeSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-white to-gray-50" style={{borderRadius: "24px"}}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="#0a1a2f" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="white" style={{borderRadius: "24px"}}/>
        </svg>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left content - Headline and CTA */}
          <div className="lg:w-1/2 lg:sticky lg:top-32 pt-8">
            <div className="max-w-lg">
              {isClient && (
                <div>
                  <motion.div 
                    className="inline-flex items-center bg-indigo-100 py-1 px-3 rounded-full mb-4 shadow-sm"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                      <span className="text-[#0a1a2f] font-medium">Features</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-white/70 backdrop-blur-md px-8 py-6 rounded-2xl shadow-lg border border-indigo-100/50 mb-10 inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <motion.h1 
                      className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0a1a2f] tracking-tight leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                      <motion.span 
                        className="inline-block transform" 
                        animate={{ 
                          rotate: [0, -10, 0, 10, 0],
                          transition: { repeat: 3, duration: 1.5, repeatDelay: 5 }
                        }}
                      >
                        👋
                      </motion.span>{" "}
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Say hello to...
                      </span>
                    </motion.h1>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                    className="mt-10 md:mt-16"
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Right content - Feature cards */}
          <div className="lg:w-1/2">
            {isClient && <ClientOnlyAnimatedFeatureList />}
          </div>
        </div>
      </div>
    </section>
  );
} 