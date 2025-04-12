'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

const WaitlistCTA = () => {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const controls = useAnimation()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !role) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Success animation
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after delay
    setTimeout(() => {
      setEmail('')
      setRole('')
      setIsSubmitted(false)
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.5 }
      })
    }, 3000)
  }
  
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-100 opacity-90"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-lg md:text-xl font-semibold bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text inline-block px-6 py-2 rounded-full border border-red-200/50 shadow-sm">
              The best closers don't have better memory. They have better systems.
            </p>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#0077B5] bg-clip-text text-transparent">
            Be the First to Know
          </h2>
          <p className="text-xl text-gray-600">
            Join our exclusive waitlist for early access and special perks
          </p>
        </motion.div>
        
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          animate={controls}
        >
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] outline-none transition-all"
                placeholder="you@example.com"
                required
                disabled={isSubmitting || isSubmitted}
              />
              <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-r from-[#D4AF37]/20 to-[#0077B5]/20 opacity-0 focus-within:opacity-100 transition-opacity" />
            </div>
          </div>
          
          <div className="mb-8">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Your Role
            </label>
            <div className="relative">
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] outline-none transition-all appearance-none bg-white"
                required
                disabled={isSubmitting || isSubmitted}
              >
                <option value="" disabled>Select your role</option>
                <option value="executive">Executive</option>
                <option value="manager">Manager</option>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="sales">Sales Professional</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#0077B5] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting || isSubmitted}
            data-magnetic
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : isSubmitted ? (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added to Waitlist!
              </span>
            ) : (
              "Join Waitlist"
            )}
          </motion.button>
          
          {isSubmitted && (
            <motion.div 
              className="mt-4 text-center text-green-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Thank you for joining our waitlist!
            </motion.div>
          )}
          
          <p className="mt-4 text-sm text-gray-500 text-center">
            We respect your privacy and will never share your information.
          </p>
        </motion.form>
      </div>
    </section>
  )
}

export default WaitlistCTA 