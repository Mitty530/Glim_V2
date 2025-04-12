'use client'

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const AiFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is an AI Relationship Memory Engine?",
      answer: "Unlike traditional CRMs that just store data, Glim captures the emotional context and nuance of your relationships. It remembers what makes each connection unique, helping you follow up authentically and turn conversations into lasting business relationships."
    },
    {
      question: "How does Glim improve my follow-ups?",
      answer: "Glim turns voice notes into smart relationship summaries. After a meeting, just speak into Glim, and it captures key points, context, and follow-up items. When it's time to reconnect, Glim provides personalized, context-rich follow-ups that see 3-5x higher conversion rates."
    },
    {
      question: "How is Glim different from a standard CRM?",
      answer: "Traditional CRMs were designed for pipeline tracking, not relationship building. They're rigid, require manual data entry, and miss emotional nuance. Glim focuses on capturing relationship context, automating memory, and turning conversations into genuine connections that close deals."
    },
    {
      question: "How much relationship opportunity am I losing now?",
      answer: "Research shows 80% of relationship opportunities are lost due to poor follow-up timing, and 60% of professionals forget crucial relationship context within 14 days. Glim helps recover this lost potential by ensuring you never forget what makes a relationship valuable."
    },
    {
      question: "Can I customize my relationship tracking?",
      answer: "Absolutely. Glim adapts to your workflow rather than forcing you into rigid processes. You can customize how you capture information, organize relationships, and set follow-up preferences to match your unique relationship-building style."
    },
    {
      question: "How do I measure ROI with Glim?",
      answer: "Users typically see 7-8x ROI compared to traditional CRMs through higher conversion rates, improved relationship retention, more warm referrals, and time saved on relationship management. Glim turns relationship memory into measurable business outcomes."
    },
  ];

  return (
    <section className="py-20 relative">
      {/* Background with improved contrast */}
      <div className="absolute inset-0 bg-white/90 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:flex relative z-10">
        {/* Left column with title and description */}
        <div className="md:w-1/3 mb-8 md:mb-0 pr-8">
          <div className="sticky top-24">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-700 text-lg">
              Everything you need to know about Glim, the AI Relationship Memory Engine. 
              Can't find the answer you're looking for? Please reach out to our team.
            </p>
          </div>
        </div>

        {/* Right column with FAQ items */}
        <div className="md:w-2/3">
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className="border-b border-gray-200 pb-2 bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <button
                  className="w-full text-left py-4 flex justify-between items-center focus:outline-none group"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-semibold text-gray-900 border-b border-transparent group-hover:border-purple-600 transition-colors duration-200">{item.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-purple-600 transition-transform duration-200 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`} 
                  />
                </button>
                {openIndex === index && (
                  <div className="pb-4 pr-8 text-gray-700 animate-fadeIn">
                    <p className="leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiFaq;

// Add this to your global CSS if you don't have this animation
// @keyframes fadeIn {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }
// .animate-fadeIn {
//   animation: fadeIn 0.3s ease-in-out;
// }