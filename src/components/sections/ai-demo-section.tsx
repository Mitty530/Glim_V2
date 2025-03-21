'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const AiDemoSection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          See AI in Action
        </motion.h2>
        
        <motion.p 
          className="text-xl text-center max-w-2xl mx-auto mb-16 text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Our advanced AI transforms scattered information into organized, actionable insights
        </motion.p>
        
        <motion.div 
          className="h-[400px] rounded-2xl overflow-hidden shadow-2xl relative bg-gradient-to-r from-slate-50 to-gray-100"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* AI Flow Visualization */}
          <div className="absolute inset-0 flex items-center justify-between px-16">
            {/* Voice Input */}
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2a6 6 0 0 0-6 6h12a6 6 0 0 0-6-6z"/>
                </svg>
              </div>
              <span className="font-medium text-gray-800">Voice Input</span>
              <div className="mt-2 animate-pulse">
                <div className="h-1 w-8 bg-[#D4AF37] rounded-full mx-1 inline-block"></div>
                <div className="h-2 w-10 bg-[#D4AF37] rounded-full mx-1 inline-block"></div>
                <div className="h-3 w-6 bg-[#D4AF37] rounded-full mx-1 inline-block"></div>
                <div className="h-2 w-12 bg-[#D4AF37] rounded-full mx-1 inline-block"></div>
                <div className="h-1 w-8 bg-[#D4AF37] rounded-full mx-1 inline-block"></div>
              </div>
            </motion.div>
            
            {/* Connection Line 1 */}
            <motion.div 
              className="h-[2px] flex-1 bg-gray-300 mx-4 relative"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.div 
                className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-[#0077B5]"
                initial={{ left: 0 }}
                animate={{ left: '100%' }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
              />
            </motion.div>
            
            {/* AI Processing */}
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="w-28 h-28 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#0077B5] p-[2px] rotate-45 mb-4">
                <div className="w-full h-full bg-white flex items-center justify-center -rotate-45">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#0077B5" viewBox="0 0 16 16">
                    <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
                  </svg>
                </div>
              </div>
              <span className="font-medium text-gray-800">AI Processing</span>
              <div className="mt-2 grid grid-cols-3 gap-1">
                <div className="h-1 w-1 bg-[#0077B5] rounded-full animate-ping"></div>
                <div className="h-1 w-1 bg-[#0077B5] rounded-full animate-ping" style={{animationDelay: '300ms'}}></div>
                <div className="h-1 w-1 bg-[#0077B5] rounded-full animate-ping" style={{animationDelay: '600ms'}}></div>
              </div>
            </motion.div>
            
            {/* Connection Line 2 */}
            <motion.div 
              className="h-[2px] flex-1 bg-gray-300 mx-4 relative"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.div 
                className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-[#D4AF37]"
                initial={{ left: 0 }}
                animate={{ left: '100%' }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', delay: 0.5 }}
              />
            </motion.div>
            
            {/* Organized Output */}
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="w-24 h-24 rounded-md bg-gradient-to-br from-[#0077B5] to-[#00A0B0] flex items-center justify-center text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3 0h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3zm0 8h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3z"/>
                </svg>
              </div>
              <span className="font-medium text-gray-800">Organized Output</span>
              <div className="mt-2 w-20">
                <motion.div 
                  className="h-1 w-full bg-[#0077B5] rounded-full mb-1"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.3, delay: 1.0 }}
                ></motion.div>
                <motion.div 
                  className="h-1 w-full bg-[#0077B5] rounded-full mb-1"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.3, delay: 1.1 }}
                ></motion.div>
                <motion.div 
                  className="h-1 w-full bg-[#0077B5] rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.3, delay: 1.2 }}
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 italic">
            AI-powered analysis delivers contextually relevant information
          </p>
        </div>
      </div>
    </section>
  )
}

export default AiDemoSection 