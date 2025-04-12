'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '#', label: 'Home' },
  { href: '#value', label: 'Why Glim' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#demo', label: 'Demo' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isMobileMenuOpen && !target.closest('#mobile-menu') && !target.closest('#menu-button')) {
        setIsMobileMenuOpen(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobileMenuOpen])
  
  // Handle navigation item click (smooth scroll)
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    
    // Close mobile menu
    setIsMobileMenuOpen(false)
    
    // Handle anchor links
    if (href.startsWith('#')) {
      if (href === '#') {
        // For the home link, scroll to the top of the page
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // For section links
        const targetId = href.slice(1)
        const element = document.getElementById(targetId)
        
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }
    } else {
      // Handle regular links
      window.location.href = href
    }
  }
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="#"
            className="flex items-center space-x-2 cursor-pointer select-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
              <span className="text-white font-bold text-sm">GL</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Glim</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-primary ${
                  pathname === link.href 
                    ? 'text-brand-primary' 
                    : 'text-gray-700'
                }`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* CTA Button */}
            <Link
              href="#waitlist"
              className="px-4 py-2 rounded-lg bg-brand-primary text-white text-sm font-medium hover:bg-brand-primary/90 transition-colors"
              onClick={(e) => handleNavClick(e, '#waitlist')}
            >
              Join Waitlist
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            id="menu-button"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-2 text-base font-medium transition-colors hover:text-brand-primary ${
                    pathname === link.href 
                      ? 'text-brand-primary' 
                      : 'text-gray-700'
                  }`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile CTA Button */}
              <Link
                href="#waitlist"
                className="block w-full mt-4 px-4 py-3 rounded-lg bg-brand-primary text-center text-white font-medium hover:bg-brand-primary/90 transition-colors"
                onClick={(e) => handleNavClick(e, '#waitlist')}
              >
                Join Waitlist
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 