'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [buttonHovered, setButtonHovered] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [sectionType, setSectionType] = useState('')
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Check if the device is mobile
  useEffect(() => {
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    setMounted(true)
  }, [])

  // Set cursor visibility after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Handle mouse movement with smooth transition
  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    
    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setPosition({ x: e.clientX, y: e.clientY })
    }

    // Animated cursor position using RAF for smooth movement
    const animateCursor = () => {
      // Smooth interpolation for main cursor
      const easingFactor = 0.2
      cursorX += (mouseX - cursorX) * easingFactor
      cursorY += (mouseY - cursorY) * easingFactor
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`
        cursorRef.current.style.setProperty('--x', `${cursorX}px`)
        cursorRef.current.style.setProperty('--y', `${cursorY}px`)
      }
      
      requestAnimationFrame(animateCursor)
    }

    window.addEventListener('mousemove', moveCursor)
    const animationId = requestAnimationFrame(animateCursor)
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      cancelAnimationFrame(animationId)
    }
  }, [])

  // Handle hover states with section awareness
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Detect page section for context-aware cursor
      const heroSection = document.getElementById('home')
      const valueSection = document.getElementById('value-prop')
      const howItWorksSection = document.getElementById('how-it-works')
      const statsSection = document.getElementById('stats-timeline')
      
      if (heroSection?.contains(target)) {
        setSectionType('hero')
      } else if (valueSection?.contains(target)) {
        setSectionType('value')
      } else if (howItWorksSection?.contains(target)) {
        setSectionType('how-it-works')
      } else if (statsSection?.contains(target)) {
        setSectionType('stats')
      } else {
        setSectionType('')
      }
      
      // Check if target is a button or has a button-like role
      const isButton = 
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('button') ||
        target.closest('[role="button"]')
      
      // Check if target is a link
      const isLink = 
        target.tagName === 'A' || 
        target.closest('a')
      
      if (isButton) {
        setButtonHovered(true)
        const buttonText = target.getAttribute('data-cursor-text') || ''
        setCursorText(buttonText)
      } else if (isLink) {
        setLinkHovered(true)
        const linkText = target.getAttribute('data-cursor-text') || ''
        setCursorText(linkText)
      } else {
        setButtonHovered(false)
        setLinkHovered(false)
        setCursorText('')
      }
    }

    window.addEventListener('mouseover', handleMouseOver)
    return () => window.removeEventListener('mouseover', handleMouseOver)
  }, [])

  // Update cursor appearance based on hover state and section context
  useEffect(() => {
    if (!cursorRef.current) return
    
    const customCursorElement = cursorRef.current
    
    if (buttonHovered || linkHovered) {
      // Pointer appearance for buttons and links
      customCursorElement.style.width = '32px'
      customCursorElement.style.height = '32px'
      customCursorElement.style.backgroundColor = 'transparent'
      customCursorElement.style.backdropFilter = 'none'
      customCursorElement.style.border = 'none'
      customCursorElement.style.mixBlendMode = 'normal'
      customCursorElement.classList.add('cursor-pointer-style')
      customCursorElement.classList.add('cursor-text-visible')
    } else {
      // Default appearance
      customCursorElement.style.width = '16px'
      customCursorElement.style.height = '16px'
      customCursorElement.style.backgroundColor = theme === 'dark' ? 'rgba(60, 165, 92, 0.8)' : 'rgba(60, 165, 92, 0.8)'
      customCursorElement.style.backdropFilter = 'none'
      customCursorElement.style.border = '1px solid rgba(60, 165, 92, 0.6)'
      customCursorElement.style.mixBlendMode = 'normal'
      customCursorElement.classList.remove('cursor-pointer-style')
      customCursorElement.classList.remove('cursor-text-visible')
    }
  }, [buttonHovered, linkHovered, theme, sectionType])

  // Don't render on mobile or before component is mounted
  if (!mounted || isMobile) return null

  return (
    <>
      {/* Main cursor dot */}
      <div
        id="custom-cursor"
        ref={cursorRef}
        className={cn(
          'custom-cursor fixed top-0 left-0 pointer-events-none transform -translate-x-1/2 -translate-y-1/2',
          visible ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          '--x': `${position.x}px`,
          '--y': `${position.y}px`
        } as React.CSSProperties}
      >
        {cursorText && (
          <span className="cursor-text absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-sm whitespace-nowrap text-white opacity-0 transition-opacity duration-200">
            {cursorText}
          </span>
        )}
      </div>
      
      {/* Memory pulse effects that follow cursor on special sections */}
      {(sectionType === 'hero' || sectionType === 'stats') && (
        <div className="fixed top-0 left-0 w-24 h-24 rounded-full pointer-events-none z-[9997] opacity-20 memory-pulse" 
          style={{
            transform: 'translate(-50%, -50%)',
            left: `${position.x}px`,
            top: `${position.y}px`,
          }} 
        />
      )}
    </>
  )
}

export default CustomCursor 