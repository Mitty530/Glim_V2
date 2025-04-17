'use client'

import React, { useState, FormEvent } from 'react'

interface ContactFormProps {}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    relationship_focus: '',
    email: '',
    message: ''
  })

  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSuccess: false,
    error: null as string | null
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: 'Please fill out all required fields'
      })
      return
    }
    
    setFormState({
      isSubmitting: true,
      isSuccess: false,
      error: null
    })
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit the form')
      }
      
      // Reset form on success
      setFormData({
        name: '',
        relationship_focus: '',
        email: '',
        message: ''
      })
      
      setFormState({
        isSubmitting: false,
        isSuccess: true,
        error: null
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormState(prev => ({
          ...prev,
          isSuccess: false
        }))
      }, 5000)
      
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      })
    }
  }

  return (
    <div className="p-8 rounded-xl shadow-xl bg-white/95 backdrop-blur-sm" 
      style={{
        borderImage: 'linear-gradient(to right, #10b981, #059669) 1',
        borderWidth: '3px', 
        borderStyle: 'solid'
      }}>
      <h3 className="text-2xl font-semibold mb-2 text-[#0a2a1f]">Curious? Let's make memory effortless.</h3>
      <p className="text-gray-600 mb-6">We're building Glim for people who care about conversations that convert — because they're built on memory, not guesswork.</p>
      
      {formState.isSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
          <span className="block sm:inline">Thank you! Your message has been sent successfully.</span>
        </div>
      )}

      {formState.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <span className="block sm:inline">{formState.error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">Your Name*</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name" 
              className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
              disabled={formState.isSubmitting}
              required
            />
          </div>
          <div>
            <label htmlFor="relationship_focus" className="block text-sm font-medium text-gray-800 mb-1">Relationship Focus</label>
            <input 
              type="text" 
              id="relationship_focus" 
              name="relationship_focus" 
              value={formData.relationship_focus}
              onChange={handleChange}
              placeholder="Sales, Fundraising, Networking..." 
              className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
              disabled={formState.isSubmitting}
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">E-Mail*</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            placeholder="We respect your inbox. Only relevant updates, nothing more" 
            className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
            disabled={formState.isSubmitting}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-1">Your Relationship Memory Pain Points*</label>
          <textarea 
            id="message" 
            name="message" 
            value={formData.message}
            onChange={handleChange}
            rows={4} 
            placeholder="Tell us about your context or follow-up challenges..." 
            className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            disabled={formState.isSubmitting}
            required
          ></textarea>
        </div>
        <div>
          <button 
            type="submit" 
            className="w-full bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-lg disabled:bg-emerald-400"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? 'Sending...' : 'Send Your Message'}
          </button>
        </div>
      </form>
    </div>
  )
} 