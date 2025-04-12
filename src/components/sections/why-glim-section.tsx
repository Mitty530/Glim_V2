'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { ParallaxEffect } from '@/components/ui/parallax-effect'
import Image from 'next/image'

// Animation variants
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

const itemVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Comparison data
const traditionalApproaches = [
  "Manually searching for leads",
  "Cold outreach with low response rates",
  "Wasting hours scrolling social media",
  "Missing high-intent buyers",
  "Generic, ineffective messaging",
  "Slow response times, lost deals",
  "High cost, low efficiency sales tools",
  "Sales reps overloaded with manual work"
];

const glimAdvantages = [
  "AI finds high-intent leads instantly",
  "Engage with warm prospects, not cold ones",
  "No more endless scrolling—get real signals",
  "Never miss a potential buyer again",
  "AI suggests personalized replies",
  "Respond 10x faster and close more deals",
  "Affordable, powerful, and easy to use",
  "Focus on selling, let us do the heavy lifting"
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
  
  return (
    <section 
      id="why-glim"
      ref={containerRef} 
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Background decoration with static styles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[35rem] h-[35rem] bg-brand-secondary/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-10 z-0 pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2395D5B2' fill-opacity='0.15'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }}
      ></div>

      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              <span className="inline-block">
                Feel The <span className="text-[#22c55e]">Freedom</span> of Better Relationships
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
              The best closers don't have better memory.
              <span className="text-[#22c55e]"> They have better systems.</span>
            </p>
          </div>

          {/* Comparison cards */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* WITHOUT US card */}
            <div className="flex-1 bg-[#f5f5f5] rounded-3xl overflow-hidden border border-gray-200 shadow-xl relative">
              {/* Card header */}
              <div className="bg-[#e9e9e9] p-5 flex justify-center relative overflow-hidden">
                <h3 className="text-2xl font-bold text-[#2d3748] relative z-10">
                  WITHOUT US
                </h3>
              </div>

              {/* List items */}
              <div className="p-6 md:p-8 relative">
                <ul className="space-y-5">
                  {traditionalApproaches.map((item, index) => (
                    <li 
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <ShieldIcon className="w-6 h-6 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* GLIM card */}
            <div className="flex-1 bg-white rounded-3xl overflow-hidden border border-[#22c55e]/20 shadow-2xl relative">
              {/* Card header */}
              <div className="bg-[#22c55e] p-5 flex justify-center items-center gap-3 relative overflow-hidden">
                {/* Logo */}
                <div className="relative z-10">
                  {/* <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" fill="#4ade80" />
                  </svg> */}
                </div>

                <h3 className="text-2xl font-bold text-white relative z-10">
                  Glim AI
                </h3>
              </div>

              {/* List items */}
              <div className="p-6 md:p-8 relative">
                <ul className="space-y-5">
                  {glimAdvantages.map((item, index) => (
                    <li 
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#222222] flex items-center justify-center flex-shrink-0">
                        <CheckIcon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* VS Toggle and connecting lines between cards */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-[40%] z-20">
            {/* Left connection line with circle */}
            <div className="flex items-center">
              <div className="w-8 h-[2px] bg-gray-400"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-4 h-[2px] bg-gray-400"></div>
            </div>
            
            {/* VS Toggle */}
            <div className="flex-shrink-0 mx-2">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-xs font-bold">
                  V/S
                </span>
              </div>
            </div>
            
            {/* Right connection line with circle */}
            <div className="flex items-center">
              <div className="w-4 h-[2px] bg-[#22c55e]"></div>
              <div className="w-2 h-2 bg-[#22c55e] rounded-full"></div>
              <div className="w-8 h-[2px] bg-[#22c55e]"></div>
            </div>
          </div>
          
          {/* Vertical connection lines for mobile */}
          <div className="md:hidden flex flex-col items-center relative -mt-3 mb-3 z-10">
            <div className="flex items-center">
              <div className="h-8 w-[2px] bg-gray-400"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="h-4 w-[2px] bg-gray-400"></div>
            </div>
            
            <div className="relative my-2">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-xs font-bold">
                  V/S
                </span>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="h-4 w-[2px] bg-[#22c55e]"></div>
              <div className="w-2 h-2 bg-[#22c55e] rounded-full"></div>
              <div className="h-8 w-[2px] bg-[#22c55e]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 