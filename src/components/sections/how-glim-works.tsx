'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, MessageCircle, Search } from 'lucide-react';

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
            icon: <Rocket className="w-5 h-5" />,
            title: "Capture Information Intuitively",
            heading: "Capture Information Intuitively",
            content:
                "Quickly capture meeting details and notes with Glim using your preferred input method. Focus on the conversation, not the note-taking.",
            processCards: [
                {
                    title: "Voice Input",
                    description: "Speak to capture details",
                    contentHtml: `
                        <div class="bg-gradient-to-br from-gray-900 to-gray-800/90 backdrop-blur-lg p-6 rounded-2xl border border-green-800/50 shadow-2xl h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-green-500/30">
                            <div class="mb-6 flex items-center">
                                <div class="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-xl shadow-lg mr-4" tabindex="0">
                                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-bold text-white mb-1">Voice Input</h3>
                                    <p class="text-sm text-green-300">Speak to capture details</p>
                                </div>
                            </div>
                            <div class="mt-auto">
                                <div class="bg-black/40 backdrop-blur-sm rounded-xl p-4 text-gray-300 text-sm font-mono shadow-inner border border-gray-700/50">
                                    <div class="overflow-hidden break-words whitespace-pre-wrap max-h-[150px] overflow-y-auto text-xs md:text-sm">
                                        "Just had a productive call with Alex Chen, CTO at Quantum Innovations. They're looking to revamp their cybersecurity infrastructure by Q3 2025. Budget is $450K. Need to prepare a custom demo focusing on their healthcare compliance requirements."
                                    </div>
                                </div>
                                <div class="flex justify-end mt-4">
                                    <button class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg transition-all duration-200 hover:scale-110">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `,
                },
                {
                    title: "Camera Input",
                    description: "Capture with your camera",
                    contentHtml: `
                        <div class="bg-gradient-to-br from-gray-900 to-gray-800/90 backdrop-blur-lg p-6 rounded-2xl border border-green-800/50 shadow-2xl h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-green-500/30">
                            <div class="mb-6 flex items-center">
                                
                                <div>
                                    <h3 class="text-2xl font-bold text-white mb-1">Camera Input</h3>
                                    <p class="text-sm text-green-300">Capture with your camera</p>
                                </div>
                            </div>
                            <div class="mt-auto">
                                <div class="bg-black/40 backdrop-blur-sm rounded-xl p-4 text-gray-300 text-sm font-mono shadow-inner border border-gray-700/50">
                                    <div class="overflow-hidden break-words whitespace-pre-wrap max-h-[150px] overflow-y-auto text-xs md:text-sm">
                                        Business card scan: Alex Chen, CTO
                                        Quantum Innovations, Inc.
                                        Phone: (415) 555-8292
                                        Email: alex.chen@quantuminnovations.com
                                        Note: Discussed cybersecurity infrastructure revamp, Q3 2025, $450K budget
                                    </div>
                                </div>
                                 <div class="flex justify-end mt-4">
                                    <button class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg transition-all duration-200 hover:scale-110">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `,
                },
                {
                    title: "Text Input",
                    description: "Type or paste your notes",
                    contentHtml: `
                        <div class="bg-gradient-to-br from-gray-900 to-gray-800/90 backdrop-blur-lg p-6 rounded-2xl border border-green-800/50 shadow-2xl h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-green-500/30">
                            <div class="mb-6 flex items-center">
                                <div class="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-xl shadow-lg mr-4" tabindex="0">
                                     <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-4c0-1.5-1-2.7-2.3-3.4.2-1 1-1.7 2-1.7h1m3 1.7c1 0 1.8.7 2 1.7 1.3.7 2.3 2 2.3 3.4v4m-6-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-bold text-white mb-1">Text Input</h3>
                                    <p class="text-sm text-green-300">Type or paste your notes</p>
                                </div>
                            </div>
                            <div class="mt-auto">
                                <div class="bg-black/40 backdrop-blur-sm rounded-xl p-4 text-gray-300 text-sm font-mono shadow-inner border border-gray-700/50">
                                    <div class="overflow-hidden break-words whitespace-pre-wrap max-h-[150px] overflow-y-auto text-xs md:text-sm">
                                        Meeting with David Kim, Head of Product at EcoSmart Solutions today
                                        They need help with their sustainability tracking software
                                        Budget: $300K, timeline is ASAP
                                        He's interested in data visualization features and API integrations
                                        Personal note: Training for a marathon next month
                                    </div>
                                </div>
                                <div class="flex justify-end mt-4">
                                    <button class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg transition-all duration-200 hover:scale-110">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `,
                },
            ],
        },
        {
            id: 1,
            icon: <MessageCircle className="w-5 h-5" />,
            title: "Smart Contact Cards",
            content: "View automatically enriched contact information, conversation history, follow-up reminders, and AI insights.",
            processCards: [
                {
                    title: "Alex Chen",
                    description: "CTO, Quantum Innovations",
                    contentHtml: `
                        <div class="bg-[#1a1d29] rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-purple-500/20 w-full border border-purple-500/10">
                            <div class="p-4 bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <svg class="w-6 h-6 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span class="text-white/90 font-medium">Contact Profile</span>
                                </div>
                                <div class="flex space-x-1">
                                    <div class="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div class="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                            </div>
                            <div class="p-6 space-y-6">
                                <div class="flex items-start gap-4">
                                    <div class="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 font-bold text-xl">
                                        AC
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="text-white text-lg font-semibold">Alex Chen</h3>
                                        <p class="text-gray-400 text-sm">Chief Technology Officer, Quantum Innovations</p>
                                        <div class="mt-2 space-y-1">
                                            <div class="flex items-center text-gray-400 text-sm">
                                                <svg class="w-4 h-4 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                alex.chen@quantuminnovations.com
                                            </div>
                                            <div class="flex items-center text-gray-400 text-sm">
                                                <svg class="w-4 h-4 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                (555) 876-5432
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                                    <h4 class="text-gray-300 font-medium mb-2 text-sm uppercase">NOTES</h4>
                                    <p class="text-gray-400 text-sm leading-relaxed">Regular contact. Key decision-maker.</p>
                                    <div class="flex flex-wrap gap-2 mt-3">
                                        <span class="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Cybersecurity</span>
                                        <span class="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Enterprise</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `,
                },
                {
                    title: "Meeting Summary",
                    description: "AI-generated summary",
                    contentHtml: `
                        <div class="bg-[#1a1d29] rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-purple-500/20 w-full border border-purple-500/10">
                            <div class="p-4 bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <svg class="w-6 h-6 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    <span class="text-white/90 font-medium">Meeting Summary</span>
                                </div>
                                <div class="flex space-x-1">
                                    <div class="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div class="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                            </div>
                            <div class="p-6 space-y-6">
                                <div class="flex items-start gap-4">
                                    <div class="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 font-bold text-xl">
                                        DK
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="text-white text-lg font-semibold">David Kim</h3>
                                        <p class="text-gray-400 text-sm">Head of Product, EcoSmart Solutions</p>
                                        <div class="mt-2 space-y-1">
                                            <div class="flex items-center text-gray-400 text-sm">
                                                <svg class="w-4 h-4 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                david.kim@ecosmart.com
                                            </div>
                                            <div class="flex items-center text-gray-400 text-sm">
                                                <svg class="w-4 h-4 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                (555) 987-6543
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                                    <h4 class="text-gray-300 font-medium mb-2 text-sm uppercase">MEETING NOTES</h4>
                                    <p class="text-gray-400 text-sm leading-relaxed">
                                        Discussed their needs for sustainability tracking software. Their budget is around $300K, and they want the project completed ASAP. Key features: data visualization and API integrations.
                                    </p>
                                    <div class="flex flex-wrap gap-2 mt-3">
                                        <span class="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Sustainability</span>
                                        <span class="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Software</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `,
                },
                {
                    title: "Follow Up",
                    description: "AI generated follow up",
                    contentHtml: `
                        <div class="bg-[#1a1d29] rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-purple-500/20 w-full border border-purple-500/10">
                            <div class="p-4 bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <svg class="w-6 h-6 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span class="text-white/90 font-medium">Action Items</span>
                                </div>
                                <div class="flex space-x-1">
                                    <div class="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div class="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                            </div>
                            <div class="p-6 space-y-6">
                                <div class="flex items-start gap-4">
                                    <div class="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 font-bold text-xl">
                                        MB
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="text-white text-lg font-semibold">Mike Brown</h3>
                                        <p class="text-gray-400 text-sm">Sales Representative</p>
                                    </div>
                                </div>
                                <div class="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                                    <h4 class="text-gray-300 font-medium mb-2 text-sm uppercase">ACTION ITEMS</h4>
                                    <ul class="space-y-3">
                                        <li class="flex items-center gap-2 text-gray-400">
                                            <svg class="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span class="text-sm">Send proposal to David Kim</span>
                                        </li>
                                        <li class="flex items-center gap-2 text-gray-400">
                                            <svg class="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span class="text-sm">Schedule follow-up meeting</span>
                                        </li>
                                        <li class="flex items-center gap-2 text-gray-400">
                                            <svg class="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span class="text-sm">Prepare presentation</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `,
                },
            ],
        },
        {
            id: 2,
            icon: <Search className="w-5 h-5" />,
            title: "Real-Time Opportunity Monitoring",
            heading: "Never Miss a Business Opportunity",
            content: "Our platform continuously monitors relevant platforms in real-time, alerting you when potential customers are discussing problems your product can solve.",
            processCards: [{
                title: "Smart Contact Intelligence",
                description: "Real-time monitoring example",
                contentHtml: `
                    <div class="bg-[#1a1d29] rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-purple-500/20 w-full border border-purple-500/10">
                        <div class="p-4 bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <svg class="w-6 h-6 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                </svg>
                                <span class="text-white/90 font-medium">Smart Contact Intelligence</span>
                            </div>
                            <div class="flex space-x-1">
                                <div class="w-3 h-3 rounded-full bg-red-400"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div class="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                        </div>
                        
                        <div class="p-6 space-y-6">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 font-bold text-xl">
                                    AC
                                </div>
                                <div class="flex-1">
                                    <h3 class="text-white text-lg font-semibold">Alex Chen</h3>
                                    <p class="text-gray-400 text-sm">Chief Technology Officer, Quantum Innovations</p>
                                    <div class="mt-2 space-y-1">
                                        <div class="flex items-center text-gray-400 text-sm">
                                            <svg class="w-4 h-4 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            alex.chen@quantuminnovations.com
                                        </div>
                                        <div class="flex items-center text-gray-400 text-sm">
                                            <svg class="w-4 h-4 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            (555) 876-5432
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                                <h4 class="text-gray-300 font-medium mb-2 text-sm uppercase">NOTES</h4>
                                <p class="text-gray-400 text-sm leading-relaxed">
                                    Call on March 15, 2025. Looking to implement new cybersecurity infrastructure by Q3 2025. $450K budget available. Current vendor contract expires July 2025.
                                </p>
                            </div>

                            <div class="flex flex-wrap gap-2">
                                <span class="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Basketball</span>
                                <span class="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">NBA</span>
                                <span class="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Technology</span>
                                <span class="px-3 py-1 text-xs rounded-full bg-red-500/10 text-red-400 border border-red-500/20">Cybersecurity</span>
                            </div>

                            <div class="border-t border-gray-700/50 pt-4">
                                <div class="space-y-3">
                                    <h4 class="text-gray-300 font-medium text-sm uppercase">FOLLOW-UP REMINDER</h4>
                                    <div class="flex items-center text-gray-400">
                                        <svg class="w-4 h-4 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span class="text-sm">March 22, 2025</span>
                                        <span class="mx-2 text-gray-600">•</span>
                                        <span class="text-sm">Send custom demo and proposal</span>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-3">
                                <h4 class="text-gray-300 font-medium text-sm uppercase">AI INSIGHTS</h4>
                                <div class="space-y-2">
                                    <div class="flex items-start gap-2">
                                        <svg class="w-4 h-4 text-purple-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span class="text-gray-400 text-sm">Emphasize healthcare compliance features in the proposal</span>
                                    </div>
                                    <div class="flex items-start gap-2">
                                        <svg class="w-4 h-4 text-purple-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span class="text-gray-400 text-sm">Mention NBA playoffs as an icebreaker in next conversation</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }]
        },
    ];

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeInOut" } },
    };

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
                                        : "bg-gray-50 border-gray-200 text-gray-500"
                                }`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                <span className="font-medium">{tab.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="flex flex-wrap items-start">
                        <div className="w-full ${activeTab === 0 ? 'md:w-full' : 'md:w-1/2'} pr-0 md:pr-8 mb-8 md:mb-0">
                            <h3 className="text-2xl font-semibold mb-4">{tabs[activeTab].heading}</h3>
                            <p className="text-gray-600 text-lg mb-6">{tabs[activeTab].content}</p>

                            {/* Process Cards for First Tab */}
                            {activeTab === 0 && tabs[activeTab].processCards && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {tabs[activeTab].processCards.map((card, index) => (
                                        <motion.div
                                            key={index}
                                            variants={cardVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="flex flex-col h-full"
                                        >
                                            <div 
                                                className="bg-gradient-to-br from-gray-900 to-gray-800/90 backdrop-blur-lg p-6 rounded-2xl border border-green-800/50 shadow-2xl h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-green-500/30"
                                                dangerouslySetInnerHTML={{ __html: card.contentHtml }} 
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Process Cards for Second Tab */}
                            {activeTab === 1 && tabs[activeTab].processCards && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {tabs[activeTab].processCards.map((card, index) => (
                                        <motion.div
                                            key={index}
                                            variants={cardVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="flex flex-col h-full"
                                        >
                                            <div dangerouslySetInnerHTML={{ __html: card.contentHtml }} />
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Process Cards for Third Tab */}
                            {activeTab === 2 && tabs[activeTab].processCards && (
                                <div className="w-full">
                                    {tabs[activeTab].processCards.map((card, index) => (
                                        <motion.div
                                            key={index}
                                            variants={cardVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="flex flex-col h-full"
                                        >
                                            <div dangerouslySetInnerHTML={{ __html: card.contentHtml }} />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* Removed the image on the right for all tabs */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GlimFeatures;