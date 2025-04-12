'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ScrollAnimation } from '@/components/ui/scroll-animation'
import { ParallaxEffect } from '@/components/ui/parallax-effect'
import { fadeUp, slideInLeft } from '@/hooks/useScrollAnimation'
import { WaveGoodbyeSection } from '@/components/sections/wave-goodbye-section'

export function ValueProposition() {
  const sectionRef = useRef<HTMLElement | null>(null);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  
  // Parallax animation for background elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  // Subtle floating animation
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  }
  
  return (
    <section id="value" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-brand-light/5 to-transparent"></div>
      
      {/* Background decoration removed */}
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Wave Goodbye Section */}
        <WaveGoodbyeSection />
      </div>
    </section>
  )
} 

