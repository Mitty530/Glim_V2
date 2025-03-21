'use client'

import React, { useEffect, useState } from 'react'
import Lenis from 'lenis'

export const SmoothScrollProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    setLenis(lenisInstance)

    return () => {
      lenisInstance.destroy()
    }
  }, [])

  return <>{children}</>
}

export default SmoothScrollProvider 