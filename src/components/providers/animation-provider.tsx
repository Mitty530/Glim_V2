'use client'

import { ReactNode, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function AnimationProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
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

  return <>{children}</>
} 