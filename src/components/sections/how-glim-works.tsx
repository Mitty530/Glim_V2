'use client'

import React, { useState, useEffect } from 'react';

const GlimFeatures = () => {
  // Use state only after component is mounted
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [hoverTab, setHoverTab] = useState(null);

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  const tabs = [
    {
      id: 0,
      icon: "🚀",
      title: "AI Powered Lead Discovery",
      heading: "Find High-Intent Leads",
      content: "Stop wasting time on cold outreach. Beacon scans Reddit to uncover posts where people are actively looking for solutions like yours. No more guessing—just real, high-intent leads ready to engage."
    },
    {
      id: 1,
      icon: "💬",
      title: "Lead Enrichment & Replies",
      heading: "Engage With Confidence",
      content: "Get comprehensive insights about your leads and receive AI-suggested replies tailored to their specific needs, making your outreach more personalized and effective."
    },
    {
      id: 2,
      icon: "🔍",
      title: "Real Time Post Monitoring",
      heading: "Never Miss an Opportunity",
      content: "Our platform continuously monitors relevant platforms in real-time, alerting you when potential customers are discussing problems your product can solve."
    }
  ];

  // Return a placeholder during SSR
  if (!mounted) {
    return (
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <div className="text-center mb-6">
              <div className="inline-block bg-white rounded-full px-4 py-1 shadow-sm mb-2">
                <span className="text-purple-700 text-sm font-medium">Unique Features</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">What Makes Us Different</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Turn your meetings and conversations into intelligent, structured contact information in seconds
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 relative overflow-hidden w-full min-h-[400px]">
            {/* Loading placeholder */}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <div className="text-center mb-6">
            <div className="inline-block bg-white rounded-full px-4 py-1 shadow-sm mb-2">
              <span className="text-purple-700 text-sm font-medium">Unique Features</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">What Makes Us Different</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Turn your meetings and conversations into intelligent, structured contact information in seconds
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 relative overflow-hidden w-full">
          {/* Tabs */}
          <div className="flex flex-wrap mb-8 gap-3 justify-center md:justify-start">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center px-6 py-3 rounded-full border transition-all duration-300 ${
                  activeTab === tab.id 
                    ? "bg-green-50 border-green-200 text-green-600 shadow-sm transform scale-105" 
                    : hoverTab === tab.id
                    ? "bg-gray-100 border-gray-200 text-gray-700"
                    : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tab.id)}
                onMouseEnter={() => setHoverTab(tab.id)}
                onMouseLeave={() => setHoverTab(null)}
              >
                <span className="mr-2">{tab.icon}</span>
                <span className="font-medium">{tab.title}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
              <h3 className="text-2xl font-semibold mb-4">{tabs[activeTab].heading}</h3>
              <p className="text-gray-600 text-lg">{tabs[activeTab].content}</p>
            </div>
            <div className="w-full md:w-1/2">
              <img 
                src="https://framerusercontent.com/images/AwfcFQZQb0SiaDiJNoWAWWMTPY.png" 
                alt="Feature demonstration" 
                className="rounded-lg shadow-md w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlimFeatures;