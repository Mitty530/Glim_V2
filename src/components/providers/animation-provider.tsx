'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type AnimationContextType = {
  hasScrolled: boolean
}

const AnimationContext = createContext<AnimationContextType>({
  hasScrolled: false
})

export const useAnimation = () => useContext(AnimationContext)

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Register GSAP plugins
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
      
      // Pin some sections for parallax effects
      const sections = document.querySelectorAll('.pin-section')
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          pin: true,
          start: 'top top',
          end: 'bottom top',
          pinSpacing: false,
        })
      })
      
      // Refresh ScrollTrigger on resize for responsive layouts
      window.addEventListener('resize', () => {
        ScrollTrigger.refresh()
      })

      // Cleanup on unmount
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        window.removeEventListener('resize', () => {
          ScrollTrigger.refresh()
        })
      }
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return;
    
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMounted])

  return (
    <AnimationContext.Provider
      value={{
        hasScrolled
      }}
    >
      {children}
    </AnimationContext.Provider>
  )
} 