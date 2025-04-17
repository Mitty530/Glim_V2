'use client'

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const AiFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is an AI Relationship Memory Engine?",
      answer: "Glim captures the emotional context and nuance of your relationships. It remembers what makes each connection unique, helping you follow up authentically and turn conversations into lasting business relationships."
    },
    {
      question: "How does Glim improve my follow-ups?",
      answer: "The biggest follow-up mistakes aren't about forgetting to do it. They're about doing it without context. That's when messages feel cold, generic, or out of sync.\nGlim captures the key things people say and care about right after your conversations. When it's time to reconnect, it gives you a personalized, memory-rich summary so every follow-up feels thoughtful, timely, and relevant."
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
      question: "How is Glim better than other tools out there?",
      answer: "Most tools are built for tracking pipelines or managing workflows. They rely on rigid forms, dashboards, and endless manual input — which makes them feel like work.\n\nGlim is different. It's as natural as sending yourself a quick note — but instead of forgetting it later, Glim turns it into something you can actually use. No layers, no clutter, just memory that works for you. Make stronger connections."
    },
    {
      question: "How do I measure ROI with Glim?",
      answer: "Glim helps you follow up faster, remember key details, and show up with context — which builds stronger relationships and better results over time.\n\nThat could mean more warm referrals, higher trust, shorter sales cycles, or simply fewer dropped conversations. The ROI depends on how you use it — whether it's helping you close a $10,000 deal or keeping a $1 million relationship alive, it all starts with memory you can rely on."
    },
  ];

  return (
    <section className="py-20 relative bg-noise">
      {/* Green gradient background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          background: 'linear-gradient(135deg, #064e3b, #10b981)',
          opacity: 0.9
        }}
      ></div>
      
      {/* White overlay for improved contrast */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-0"></div>
      
      {/* Subtle pattern overlay for visual interest */}
      <div className="absolute inset-0 opacity-5 z-0 pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2310b981' fill-opacity='0.25'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-4 md:flex relative z-10">
        {/* Left column with title and description */}
        <div className="md:w-1/3 mb-8 md:mb-0 pr-8">
          <div className="sticky top-24">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-800 text-lg font-medium">
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
                className="border-b border-gray-200 pb-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <button
                  className="w-full text-left py-4 flex justify-between items-center focus:outline-none group"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-semibold text-gray-900 border-b border-transparent group-hover:border-green-600 transition-colors duration-200">{item.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-green-600 transition-transform duration-200 ${
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