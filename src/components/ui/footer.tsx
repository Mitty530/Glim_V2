import React from 'react'
import Link from 'next/link'
import AiFaq from '../sections/ai-faq'


export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <AiFaq />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          {/* Brand */}
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-2 justify-center md:justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">GL</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">Glim</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
              Transform your notes into actionable insights
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 text-center md:text-left">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#value" className="text-gray-600 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-light transition-colors">
                  Why Glim
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-gray-600 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-light transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#demo" className="text-gray-600 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-light transition-colors">
                  Demo
                </Link>
              </li>
              <li>
                <Link href="#waitlist" className="text-gray-600 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-light transition-colors">
                  Join Waitlist
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            © {currentYear} Glim. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 