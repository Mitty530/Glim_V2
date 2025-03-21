'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface FormData {
  email: string;
}

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  waitlistPosition: number | null;
}

export default function WaitlistForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
  });
  
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
    waitlistPosition: null,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email.trim()) {
      setFormState(prev => ({
        ...prev,
        error: 'Email is required',
      }));
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormState(prev => ({
        ...prev,
        error: 'Please enter a valid email address',
      }));
      return;
    }
    
    setFormState(prev => ({
      ...prev,
      isSubmitting: true,
      error: null,
    }));
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: 'User' // Default value for API compatibility
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormState({
          isSubmitting: false,
          isSuccess: true,
          error: null,
          waitlistPosition: data.waitlistPosition,
        });
        // Reset form
        setFormData({
          email: '',
        });
      } else {
        setFormState({
          isSubmitting: false,
          isSuccess: false,
          error: data.error || 'Something went wrong. Please try again.',
          waitlistPosition: null,
        });
      }
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: 'Network error. Please try again.',
        waitlistPosition: null,
      });
    }
  };
  
  // Particle animation for background effect
  const particles = Array.from({ length: 20 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-brand-primary/20 dark:bg-brand-primary/10"
      style={{
        width: Math.random() * 30 + 10,
        height: Math.random() * 30 + 10,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, Math.random() * -100 - 50],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  ))
  
  // Success checkmark animation
  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  }
  
  return (
    <section 
      className="py-24 bg-gradient-to-b from-white to-brand-light dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
      id="waitlist"
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles}
      </div>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {formState.isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  You're on the list!
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You&apos;re currently #{formState.waitlistPosition} in line.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4 mb-4 text-left">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Note:</strong> In this development environment, confirmation emails are not actually sent. 
                    However, in production, you would receive an email at {formData.email} with your waitlist position 
                    and referral link.
                  </p>
                </div>
                <button
                  onClick={() => setFormState(prev => ({ ...prev, isSuccess: false }))}
                  className="text-brand-primary hover:text-brand-secondary dark:text-brand-light dark:hover:text-white transition-colors"
                >
                  Back to form
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="text-center mb-8">
                <div className="inline-block mb-2">
                  <svg className="w-8 h-8 text-brand-primary mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mx-auto"></div>
                </div>
                <motion.h3 
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Join Waitlist
                </motion.h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                  Be the first to experience NetworkAI
                </p>
              </div>
              
              {formState.error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-300 p-3 rounded-md text-sm">
                  {formState.error}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-light focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={formState.isSubmitting}
                className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-3 px-4 rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formState.isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  "Join Waitlist"
                )}
              </button>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                We respect your privacy and will never share your information.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
} 