'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Define keyframes animation for the waveform
const pulseAnimation = `
  @keyframes waveform-pulse {
    0% {
      height: 15%;
    }
    50% {
      height: 70%;
    }
    100% {
      height: 15%;
    }
  }
`;

// Mock data for the demo
const DEMO_CONVERSATION = [
  "Just spoke with Mark. He's considering our service but needs buy-in from his team.",
  "He's also a big Formula 1 fan.",
  "Remind me to follow up next month."
]

// Mock contact card data
const CONTACT_CARD = {
  name: "Mark Johnson",
  title: "VP of Operations",
  company: "TechSolutions Inc",
  email: "mark.johnson@techsolutions.com",
  phone: "+1 (555) 234-5678",
  meetingDate: "May 15, 2023",
  location: "Tech Conference San Francisco",
  topics: ["Product Demo", "Team Buy-in", "Formula 1"],
  followUp: "Follow up in June about team decision",
  notes: "Mark is interested in our service, but needs to get buy-in from his team members. He mentioned being a big Formula 1 fan - could use this as an icebreaker in future conversations. He seemed particularly interested in the data analysis features."
}

// Define type interfaces
interface DemoConversation {
  type: string;
  content: string;
}

interface FollowUp {
  date: string;
  action: string;
}

interface ContactCard {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
  interests: string[];
  followUp: FollowUp;
  insights: string[];
}

export function AiDemo() {
  // State for demo animation
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [showFullScript, setShowFullScript] = useState(false);
  const [activeInputTab, setActiveInputTab] = useState("voice"); // voice, camera, text
  const [showBusinessCard, setShowBusinessCard] = useState(false);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [showVoiceRecording, setShowVoiceRecording] = useState(false);
  
  const demoRef = useRef(null);
  const isInView = useInView(demoRef, { once: true, amount: 0.3 });

  const typingSpeed = 30; // ms per character
  
  // Demo data
  const demoConversation: DemoConversation[] = [
    {
      type: 'voice',
      content: "Just had a productive call with Alex Chen, CTO at Quantum Innovations on March 15, 2025. They're looking to revamp their enterprise cybersecurity infrastructure by Q3 2025. Alex mentioned they have a $450K budget and their current vendor contract expires in July 2025. He's particularly interested in our AI-powered threat detection module. Also noted he's an avid basketball fan and follows the NBA closely. Need to prepare a custom demo focusing on their healthcare compliance requirements and send a proposal by next week."
    },
    {
      type: 'camera',
      content: "Business Card: Sarah Johnson\nChief Marketing Officer\nGlobal Tech Solutions\nEmail: sarah.j@globaltechsolutions.com\nPhone: (555) 123-4567\nAddress: 123 Innovation Blvd, Suite 300, San Francisco, CA 94107\nNote: Met at SaaS Conference - interested in our marketing analytics platform. Follow up within 2 weeks. Mentioned upcoming team expansion in Q4 and loves hiking in Yosemite."
    },
    {
      type: 'text',
      content: "Meeting with David Kim, Head of Product at EcoSmart Solutions today (May 20, 2025). They need help with their sustainability tracking software. Budget around $300K, timeline is ASAP. David previously worked at GreenTech Inc. He's interested in our data visualization features and API integrations. Personal note: He's training for a marathon next month. Need to schedule a technical demo with their engineering team by end of week."
    }
  ];
  
  // Processing stages for different input types
  const processingStages = {
    voice: [
      "Analyzing voice note...",
      "Extracting entities...",
      "Identifying key information...",
      "Generating contact card..."
    ],
    camera: [
      "Processing image...",
      "Performing OCR...",
      "Identifying contact details...",
      "Generating contact card..."
    ],
    text: [
      "Analyzing text input...",
      "Extracting entities...",
      "Identifying key information...",
      "Generating contact card..."
    ]
  };
  
  // Contact card data for different input types
  const contactCards = {
    voice: {
      name: 'Alex Chen',
      title: 'Chief Technology Officer',
      company: 'Quantum Innovations',
      email: 'alex.chen@quantuminnovations.com',
      phone: '(555) 876-5432',
      notes: 'Call on March 15, 2025. Looking to implement new cybersecurity infrastructure by Q3 2025. $450K budget available. Current vendor contract expires July 2025.',
      interests: ['Basketball', 'NBA', 'Technology', 'Cybersecurity'],
      followUp: {
        date: 'March 22, 2025',
        action: 'Send custom demo and proposal'
      },
      insights: [
        'Emphasize healthcare compliance features in the proposal',
        'Mention NBA playoffs as an icebreaker in next conversation',
        'Highlight AI-powered threat detection module',
        'Propose implementation timeline starting August 2025'
      ]
    },
    camera: {
      name: 'Sarah Johnson',
      title: 'Chief Marketing Officer',
      company: 'Global Tech Solutions',
      email: 'sarah.j@globaltechsolutions.com',
      phone: '(555) 123-4567',
      notes: 'Met at SaaS Conference. Interested in marketing analytics platform. Company address: 123 Innovation Blvd, Suite 300, San Francisco, CA 94107.',
      interests: ['Marketing Analytics', 'SaaS', 'Hiking', 'Yosemite'],
      followUp: {
        date: 'June 1, 2025',
        action: 'Follow up regarding marketing analytics platform'
      },
      insights: [
        'Highlight case studies from other marketing teams',
        'Mention hiking in Yosemite as conversation starter',
        'Prepare demo focused on marketing analytics features',
        'Note team expansion in Q4 - potential for expanded deal'
      ]
    },
    text: {
      name: 'David Kim',
      title: 'Head of Product',
      company: 'EcoSmart Solutions',
      email: 'david.kim@ecosmartsolutions.com',
      phone: '(555) 789-0123',
      notes: 'Meeting on May 20, 2025. Needs help with sustainability tracking software. $300K budget with urgent timeline.',
      interests: ['Marathon Running', 'Sustainability', 'Data Visualization'],
      followUp: {
        date: 'May 25, 2025',
        action: 'Schedule technical demo with engineering team'
      },
      insights: [
        'Emphasize fast implementation timeline in proposal',
        'Mention marathon training in follow-up communication',
        'Highlight our API integration capabilities',
        'Research GreenTech Inc. to understand their previous experience'
      ]
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  
  // Start demo playback
  const startDemo = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setCurrentTextIndex(0);
    setTypedText("");
    setShowCard(false);
    setProcessingStage(0);
    setShowFullScript(false);
    setShowBusinessCard(false);
    setShowTextEditor(false);
    setShowVoiceRecording(false);
    
    // For camera input, show the business card image first
    if (activeInputTab === "camera") {
      setShowBusinessCard(true);
      setTimeout(() => {
        // After showing the business card for a few seconds, start processing
        const demoContent = demoConversation.find(item => item.type === activeInputTab)?.content || "";
        typeText(demoContent, 0);
      }, 2000);
    } else if (activeInputTab === "text") {
      // For text input, show a text editor first
      setShowTextEditor(true);
      setTimeout(() => {
        // After showing the text editor with content, start processing
        const demoContent = demoConversation.find(item => item.type === activeInputTab)?.content || "";
        typeText(demoContent, 0);
      }, 1500);
    } else if (activeInputTab === "voice") {
      // For voice input, show a recording UI first
      setShowVoiceRecording(true);
      setTimeout(() => {
        // After showing the recording interface for a few seconds, start processing
        const demoContent = demoConversation.find(item => item.type === activeInputTab)?.content || "";
        typeText(demoContent, 0);
      }, 3000);
    } else {
      // For any other input types, proceed with normal flow
      const demoContent = demoConversation.find(item => item.type === activeInputTab)?.content || "";
      typeText(demoContent, 0);
    }
  };
  
  // Typing effect
  const typeText = (text: string, index: number) => {
    if (index === 0) {
      setIsTyping(true);
    }
    
    if (index < text.length) {
      // Type one character at a time
      setTypedText(text.substring(0, index + 1));
      setTimeout(() => {
        typeText(text, index + 1);
      }, typingSpeed);
    } else {
      setIsTyping(false);
      
      // After typing finishes, show the AI processing and then the card
      setTimeout(() => {
        simulateProcessing();
      }, 1000);
    }
  };
  
  // Show more button
  const handleShowMore = () => {
    setShowFullScript(true);
  };
  
  // Simulate AI processing
  const simulateProcessing = () => {
    let stage = 0;
    const currentProcessingStages = processingStages[activeInputTab as keyof typeof processingStages] || processingStages.voice;
    
    const timer = setInterval(() => {
      if (stage < currentProcessingStages.length - 1) {
        setProcessingStage(stage);
        stage++;
      } else {
        clearInterval(timer);
        setProcessingStage(stage);
        
        setTimeout(() => {
          setShowCard(true);
        }, 1000);
      }
    }, 800);
  };

  // Get current contact card based on active input tab
  const getCurrentContactCard = () => {
    return contactCards[activeInputTab as keyof typeof contactCards] || contactCards.voice;
  };

  // Contact card component
  const ContactCardUI = ({ card }: { card: ContactCard }) => {
  return (
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg dark:shadow-xl border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20, rotateX: 10 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          transition: { 
            type: "spring",
            damping: 20,
            stiffness: 300
          }
        }}
      >
        {/* Card Header */}
        <div className="bg-gradient-to-r from-brand-primary to-brand-accent p-6">
          <h3 className="text-xl font-bold text-white mb-1">{card.name}</h3>
          <p className="text-white/90 text-sm">{card.title} at {card.company}</p>
        </div>
        
        {/* Card Content */}
        <div className="p-6">
          {/* Contact Info */}
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-3">
              <p className="flex items-center text-gray-700 dark:text-gray-300">
                <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center justify-center w-8 h-8 mr-2 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full text-brand-primary">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12H16L14 15H10L8 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.45 5.11L2 12V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.span>
                {card.email}
              </p>
              
              <p className="flex items-center text-gray-700 dark:text-gray-300">
                <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="inline-flex items-center justify-center w-8 h-8 mr-2 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full text-brand-primary">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27099 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.2165 3.36163C2.30513 3.09849 2.44757 2.85669 2.63477 2.65162C2.82196 2.44655 3.04981 2.28271 3.30379 2.17052C3.55778 2.05833 3.83234 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.4843C8.80173 2.80152 9.04208 3.23868 9.11 3.72C9.23679 4.68007 9.47347 5.62273 9.81 6.53C9.9446 6.88792 9.97365 7.27691 9.89391 7.65088C9.81417 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5265 19.3199 14.7632 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5266 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.span>
                {card.phone}
              </p>
            </div>
          </div>
          
          {/* Notes Section */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Notes</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{card.notes}</p>
          </div>
          
          {/* Interests */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Interests</h4>
            <div className="flex flex-wrap gap-2">
              {card.interests.map((interest, index) => (
                <motion.span 
                  key={index}
                  className="px-3 py-1 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-accent rounded-full text-xs"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (index * 0.1) }}
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </div>
          
          {/* Follow Up */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Follow Up</h4>
            <div className="flex items-center p-3 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-lg">
              <span className="mr-3 text-brand-primary">📅</span>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{card.followUp.action}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{card.followUp.date}</p>
              </div>
            </div>
          </div>
          
          {/* AI Insights */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">AI Insights</h4>
            <ul className="space-y-2">
              {card.insights.map((insight, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start text-sm text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (index * 0.1) }}
                >
                  <span className="inline-block mr-2 text-brand-accent">✨</span>
                  {insight}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    );
  };
  
  // Main return
  return (
    <section 
      id="demo" 
      className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden relative"
      ref={demoRef}
    >
      {/* Add the keyframes animation to the DOM */}
      <style jsx global>{pulseAnimation}</style>
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial from-brand-light/5 to-transparent dark:from-brand-dark/10"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-primary/10 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-secondary/10 rounded-full filter blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Experience the Magic in Action
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Watch Glim transform casual conversations into powerful relationship insights
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Left side - Input Panel */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-4 bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <h3 className="text-white font-medium">Note Input</h3>
              </div>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>
            
            <div className="p-6">
              {!isPlaying ? (
                <div className="text-center py-8">
                  <div className="flex justify-center space-x-2 mb-6">
                    <button
                      onClick={() => setActiveInputTab("voice")}
                      className={`px-4 py-2 rounded-md text-sm ${
                        activeInputTab === "voice" 
                          ? "bg-brand-primary text-white" 
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Voice
                    </button>
                    <button
                      onClick={() => setActiveInputTab("camera")}
                      className={`px-4 py-2 rounded-md text-sm ${
                        activeInputTab === "camera" 
                          ? "bg-brand-primary text-white" 
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Camera
                    </button>
                    <button
                      onClick={() => setActiveInputTab("text")}
                      className={`px-4 py-2 rounded-md text-sm ${
                        activeInputTab === "text" 
                          ? "bg-brand-primary text-white" 
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Text
                    </button>
                  </div>
                  
                  {activeInputTab === "voice" && (
                    <div>
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Voice Note Demo</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Speak your notes after a call or meeting
                      </p>
                    </div>
                  )}
                  
                  {activeInputTab === "camera" && (
                    <div>
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Camera Input Demo</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Scan business cards or capture handwritten notes
                      </p>
                    </div>
                  )}
                  
                  {activeInputTab === "text" && (
                    <div>
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Text Input Demo</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Type or paste notes directly
                      </p>
                    </div>
                  )}
                  
                  <button 
                    onClick={startDemo}
                    className="px-4 py-2 bg-brand-primary text-white rounded-lg font-medium hover:bg-brand-primary/90 transition-colors"
                  >
                    Play Demo
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center mr-3">
                      {activeInputTab === "voice" && (
                        <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      )}
                      {activeInputTab === "camera" && (
                        <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                      {activeInputTab === "text" && (
                        <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {activeInputTab === "voice" && "Voice Note"}
                        {activeInputTab === "camera" && "Camera Input"}
                        {activeInputTab === "text" && "Text Note"}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {activeInputTab === "voice" && "June 15, 2023 • Recording"}
                        {activeInputTab === "camera" && "June 15, 2023 • Image"}
                        {activeInputTab === "text" && "June 15, 2023 • Text"}
                      </div>
                    </div>
                  </div>
                  
                  {activeInputTab === "camera" && showBusinessCard && (
                    <div className="mb-6 p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center mr-2">
                              <span className="text-brand-primary font-semibold">SJ</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800 dark:text-white">Sarah Johnson</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Chief Marketing Officer</p>
                            </div>
                          </div>
                          <div className="text-center mt-2">
                            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300">Global Tech Solutions</h3>
                          </div>
                          <div className="space-y-1 mt-2 text-sm">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span>sarah.j@globaltechsolutions.com</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <span>(555) 123-4567</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="text-xs">123 Innovation Blvd, Suite 300, San Francisco, CA 94107</span>
                            </div>
                          </div>
                          <div className="mt-2 border-t border-gray-200 dark:border-gray-600 pt-2 text-xs italic text-gray-500 dark:text-gray-400">
                            <p>Met at SaaS Conference - interested in marketing analytics</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center mt-3">
                        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse mr-1"></div>
                        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse mr-1" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  )}
                  
                  {activeInputTab === "text" && showTextEditor && (
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
                      <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-3">
                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100 dark:border-gray-600">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New Contact Note</span>
                          </div>
                          <div className="flex space-x-1">
                            <button className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300">Save</button>
                            <button className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300">Cancel</button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {demoConversation.find(item => item.type === 'text')?.content.split('\n').map((line, index) => (
                            <p key={index} className="mb-2">{line}</p>
                          ))}
                        </div>
                        <div className="flex justify-end mt-3 pt-2 border-t border-gray-100 dark:border-gray-600">
                          <button className="text-sm px-3 py-1 rounded bg-brand-primary text-white">Process with AI</button>
                        </div>
                      </div>
                      <div className="flex justify-center items-center mt-3">
                        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse mr-1"></div>
                        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse mr-1" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  )}
                  
                  {activeInputTab === "voice" && showVoiceRecording && (
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
                      <div className="flex justify-center mb-3">
                        <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center">
                          <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center animate-pulse">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center mb-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Recording...</div>
                        <div className="text-xs text-brand-primary">00:12</div>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-1 h-12 mb-4">
                        {/* Voice waveform visualization */}
                        {[...Array(30)].map((_, i) => {
                          // Create a random height for each bar in the waveform
                          const randomHeight = Math.floor(Math.random() * 100);
                          const height = Math.max(15, Math.min(randomHeight, 100));
                          
                          return (
                            <div 
                              key={i}
                              className="w-1 bg-brand-primary rounded-full"
                              style={{ 
                                height: `${height}%`,
                                animationDelay: `${i * 0.05}s`,
                                animation: 'waveform-pulse 1s infinite'
                              }}
                            ></div>
                          );
                        })}
                      </div>
                      
                      <div className="flex justify-center">
                        <button className="px-4 py-2 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                          </svg>
                          Stop Recording
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                    {showFullScript ? (
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {demoConversation.find(item => item.type === activeInputTab)?.content}
                      </p>
                    ) : (
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          {typedText}
                          {isTyping && (
                            <span className="inline-block w-1 h-4 bg-brand-primary ml-0.5 animate-pulse"></span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {!isTyping && !showFullScript && typedText.length > 0 && typedText.length < demoConversation[0].content.length && (
                    <div className="text-right">
                      <button 
                        onClick={handleShowMore} 
                        className="text-sm text-brand-primary hover:text-brand-secondary transition-colors"
                      >
                        Show Full Note
                      </button>
                    </div>
                  )}
                  
                  {typedText && !showCard && (
                    <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white ml-2">AI Processing</span>
                      </div>
                      
                      <div className="space-y-3">
                        {processingStages[activeInputTab as keyof typeof processingStages].map((stage, index) => (
                          <div 
                            key={index}
                            className={`flex items-center space-x-2 ${index <= processingStage ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}
                          >
                            {index < processingStage ? (
                              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : index === processingStage ? (
                              <div className="w-5 h-5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600"></div>
                            )}
                            <span>{stage}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
          
          {/* Right side - Output Panel */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="p-4 bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-white font-medium">Smart Contact Intelligence</h3>
              </div>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>
            
            {showCard ? (
              <motion.div
                className="p-6 h-[500px] overflow-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-lg mr-4">
                    {getCurrentContactCard().name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{getCurrentContactCard().name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{getCurrentContactCard().title}, {getCurrentContactCard().company}</div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{getCurrentContactCard().email}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{getCurrentContactCard().phone}</span>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium mb-2">Notes</div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{getCurrentContactCard().notes}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {getCurrentContactCard().interests.map((interest, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 dark:text-brand-light"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium mb-2">Follow-up Reminder</div>
                  <div className="bg-brand-primary/5 dark:bg-brand-primary/10 p-3 rounded-lg flex items-start">
                    <svg className="w-5 h-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{getCurrentContactCard().followUp.date}</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">{getCurrentContactCard().followUp.action}</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium mb-2">AI Insights</div>
                  <ul className="space-y-2">
                    {getCurrentContactCard().insights.map((insight, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-4 h-4 text-brand-primary mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div variants={itemVariants} className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
                  <div className="flex justify-center space-x-3">
                    <button 
                      onClick={() => {
                        setIsPlaying(false);
                        setShowCard(false);
                      }}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Try Another Input
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-[500px] p-6">
                <div className="text-center bg-gray-50 dark:bg-gray-800/50 p-8 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 max-w-sm">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Smart Contact Card</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Play the demo to see how voice notes transform into structured contact information with AI-generated insights
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 