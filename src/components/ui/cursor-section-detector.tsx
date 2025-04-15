'use client'

import React, { useEffect } from 'react'

const CursorSectionDetector: React.FC = () => {
  useEffect(() => {
    // Add specific data attributes to interact with the cursor
    const addCursorInteractions = () => {
      // Hero section text enhancement - targeting the component directly
      const heroSection = document.querySelector('.hero-section-component')
      if (heroSection) {
        heroSection.setAttribute('id', 'hero-section') // Add ID for detection
        const heroHeadings = heroSection.querySelectorAll('h1, h2')
        heroHeadings.forEach(heading => {
          heading.setAttribute('data-cursor-text', 'Discover')
          heading.classList.add('cursor-text-trigger')
        })
      }

      // Memory section interaction
      const memoryButtons = document.querySelectorAll('#memory-section button, #memory-section a')
      memoryButtons.forEach(button => {
        button.setAttribute('data-cursor-expand', 'true')
        button.classList.add('cursor-expand-trigger')
      })

      // Value section special effect
      const valueSection = document.querySelector('#value-section')
      if (valueSection) {
        valueSection.setAttribute('data-cursor-exclusion', 'true')
        const valueCards = document.querySelectorAll('#value-section .card, #value-section [role="button"]')
        valueCards.forEach(card => {
          card.setAttribute('data-cursor-dot', 'true')
          card.classList.add('cursor-dot-trigger')
        })
      }

      // Contact section form inputs
      const contactInputs = document.querySelectorAll('#contact-section input, #contact-section textarea')
      contactInputs.forEach(input => {
        input.setAttribute('data-cursor-highlight', 'true')
        input.classList.add('cursor-highlight-trigger')
      })

      // Add hover effect listeners to cursor triggers
      const allTriggers = document.querySelectorAll(
        '.cursor-text-trigger, .cursor-expand-trigger, .cursor-dot-trigger, .cursor-highlight-trigger'
      )
      
      allTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', () => {
          document.body.classList.add('special-cursor-active')
          
          if (trigger.classList.contains('cursor-text-trigger')) {
            document.body.setAttribute('data-cursor-text-active', trigger.getAttribute('data-cursor-text') || '')
          }
          if (trigger.classList.contains('cursor-expand-trigger')) {
            document.body.setAttribute('data-cursor-expand-active', 'true')
          }
          if (trigger.classList.contains('cursor-dot-trigger')) {
            document.body.setAttribute('data-cursor-dot-active', 'true')
          }
          if (trigger.classList.contains('cursor-highlight-trigger')) {
            document.body.setAttribute('data-cursor-highlight-active', 'true')
          }
        })
        
        trigger.addEventListener('mouseleave', () => {
          document.body.classList.remove('special-cursor-active')
          document.body.removeAttribute('data-cursor-text-active')
          document.body.removeAttribute('data-cursor-expand-active')
          document.body.removeAttribute('data-cursor-dot-active')
          document.body.removeAttribute('data-cursor-highlight-active')
        })
      })
    }
    
    // Run after the DOM is fully loaded
    if (document.readyState === 'complete') {
      addCursorInteractions()
    } else {
      window.addEventListener('load', addCursorInteractions)
      return () => window.removeEventListener('load', addCursorInteractions)
    }
  }, [])

  return null // This component doesn't render anything
}

export default CursorSectionDetector 