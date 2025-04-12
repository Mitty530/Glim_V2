'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const AiDemoSection = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">AI-Powered Relationship Intelligence</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how Glim transforms your relationship management with advanced AI technology
          </p>
        </div>

        {/* AI Features Grid - Replacing the duplicated stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* AI Feature 1 */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-green-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.5 2.25m0-7.964c.249.023.499.05.749.082M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Real-time Insights</h3>
            <p className="text-gray-600">
              Get instant analysis of relationships, interests, and opportunities as they develop
            </p>
          </motion.div>
          
          {/* AI Feature 2 */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-green-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Personalized Outreach</h3>
            <p className="text-gray-600">
              AI suggests conversation starters and follow-ups based on relationship context
            </p>
          </motion.div>
          
          {/* AI Feature 3 */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-green-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Intent Recognition</h3>
            <p className="text-gray-600">
              Automatically identify high-intent signals from your contacts' digital behavior
            </p>
          </motion.div>
          
          {/* AI Feature 4 */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-green-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Relationship Analytics</h3>
            <p className="text-gray-600">
              Track engagement patterns and relationship strength with visual analytics
            </p>
          </motion.div>
        </div>
        
        {/* AI Demo CTA */}
        <div className="mt-12 text-center">
          <motion.button
            className="bg-[#16543a] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#0d3826] transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule a Demo
          </motion.button>
          <p className="text-gray-600 mt-4">See how our AI can transform your relationship management</p>
        </div>
      </div>
    </section>
  )
}

export default AiDemoSection