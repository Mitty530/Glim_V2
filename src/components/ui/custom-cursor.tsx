'use client'

import React, { useEffect, useState } from 'react'

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Check if hovering over magnetic elements
      const target = e.target as HTMLElement
      setIsHovering(target.closest('[data-magnetic]') !== null)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', updatePosition)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Implement magnetic effect for elements with data-magnetic attribute
  useEffect(() => {
    const magneticElements = document.querySelectorAll('[data-magnetic]')
    
    const handleMouseMove = (e: MouseEvent) => {
      magneticElements.forEach((el) => {
        const element = el as HTMLElement
        const rect = element.getBoundingClientRect()
        
        // Calculate center of element
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        // Calculate distance from mouse to center
        const distanceX = e.clientX - centerX
        const distanceY = e.clientY - centerY
        
        // Check if mouse is within magnetic range (100px)
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
        
        if (distance < 100) {
          // Calculate magnetic pull (stronger as mouse gets closer)
          const pull = 40 * (1 - distance / 100)
          
          // Apply transform to element
          element.style.transform = `translate(${distanceX * pull / 100}px, ${distanceY * pull / 100}px)`
        } else {
          // Reset transform when outside range
          element.style.transform = ''
        }
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      // Reset all transforms on cleanup
      magneticElements.forEach((el) => {
        (el as HTMLElement).style.transform = ''
      })
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`custom-cursor ${isHovering ? 'hover' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  )
} 