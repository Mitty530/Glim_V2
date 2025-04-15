'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [features, setFeatures] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({})

  // Effect to redirect to home page after successful submission
  useEffect(() => {
    if (submitStatus.success) {
      const timer = setTimeout(() => {
        window.location.href = '/'
      }, 3000) // Redirect after 3 seconds
      
      return () => clearTimeout(timer)
    }
  }, [submitStatus.success])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setSubmitStatus({
        success: false,
        message: 'Please enter your email address'
      })
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus({})
    
    try {
      // Log the payload for debugging
      const payload = { name, email, features };
      console.log('Submitting waitlist form:', payload);
      
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      
      const data = await response.json()
      console.log('API Response:', data); // For debugging
      
      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: data.message || 'Successfully joined the waitlist!'
        })
        // Clear form on success
        setEmail('')
        setName('')
        setFeatures('')
      } else {
        setSubmitStatus({
          success: false,
          message: data.error || 'Failed to join waitlist. Please try again.'
        })
      }
    } catch (error) {
      console.error('Error submitting to waitlist:', error)
      setSubmitStatus({
        success: false,
        message: 'An unexpected error occurred. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-700/50">
        <h3 className="text-xl font-bold mb-4 text-white">
          Secure Your Early Access
        </h3>
        
        {submitStatus.success ? (
          <motion.div 
            className="text-center py-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-8 h-8 text-green-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            
            <h4 className="text-xl font-bold text-white mb-2">
              {submitStatus.message}
            </h4>
            
            <p className="text-gray-400 text-sm">
              You're on the path to never forgetting what makes relationships valuable. Check your inbox for details.
            </p>
            
            <div className="mt-3 text-gray-400 text-xs">
              Redirecting to home page...
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="features" className="block text-sm font-medium text-gray-300 mb-1">
                  What relationship pain points do you want Glim to solve?
                </label>
                <textarea
                  id="features"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white resize-none min-h-[100px]"
                  placeholder="Tell us what frustrates you about remembering context in relationships..."
                />
              </div>
              
              {submitStatus.message && !submitStatus.success && (
                <div className="text-red-400 text-sm py-2">
                  {submitStatus.message}
                </div>
              )}
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Lock In Your Access'
                )}
              </motion.button>
              
              <p className="text-gray-500 text-xs text-center mt-4">
                Your network is fading while you wait. The sooner you join, the sooner your relationship memory becomes your competitive advantage.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
} 