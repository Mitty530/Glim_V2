import React, { useState, useEffect, useRef, SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, Send, Calendar, Clock, Phone, Mail, MapPin, Briefcase, Heart, MessageSquare, Check,
  Clock3, Star, Edit, ChevronRight, X, User, Plus, Activity, Coffee, Zap, BrainCircuit,
  Lightbulb, AlertTriangle, Target, Copy, SendHorizonal, Linkedin, MessageCircle, ChevronDown,
  Archive, BellOff, LucideProps, LucideIcon
} from 'lucide-react';

// --- Type Definitions ---

type InsightType = 'Pain Point' | 'Goal' | 'Opportunity' | 'Leverage';
type UrgencyLevel = 'High' | 'Medium' | 'Low';
type ImportanceLevel = 'High' | 'Medium' | 'Low';
type ActionStatus = 'Recommended' | 'Optional' | 'Suggested';
type ManagedActionStatus = 'snoozed' | 'dismissed';

interface InsightIconProps {
  type: InsightType;
  color: string;
}

interface Draft {
  platform: string;
  text: string;
  subject?: string;
}

interface Action {
  id: string;
  type: string;
  status: ActionStatus;
  urgency: UrgencyLevel;
  date: string;
  reason: string;
  basedOn: string[];
  guidance: string[];
  drafts?: Draft[];
  primary: boolean;
}

// --- Helper Components & Functions ---

// Helper: Icon for Insight Type
const InsightIcon: React.FC<InsightIconProps> = ({ type, color }) => {
  const iconMap: Record<InsightType, LucideIcon> = {
    'Pain Point': AlertTriangle,
    'Goal': Target,
    'Opportunity': Lightbulb,
    'Leverage': Zap
  };
  const IconComponent = iconMap[type] || Lightbulb;
  return (
     <div className={`mt-1 w-6 h-6 rounded-lg bg-${color}-500/10 flex items-center justify-center flex-shrink-0 border border-${color}-500/30 shadow-inner`}>
       <IconComponent size={14} className={`text-${color}-400`} />
     </div>
  );
};

// Helper: Get Urgency Styles for Actions
const getUrgencyStyles = (urgency: UrgencyLevel | undefined) => {
  switch (urgency?.toLowerCase()) {
    case 'high': return { bgColor: 'bg-red-800/30', borderColor: 'border-red-600/70', hoverBorderColor: 'hover:border-red-500/80', iconBg: 'bg-red-500/20', iconBorder: 'border-red-500/40', iconColor: 'text-red-400', statusBg: 'bg-red-500/10', statusText: 'text-red-300', statusBorder: 'border-red-500/30' };
    case 'medium': return { bgColor: 'bg-yellow-800/30', borderColor: 'border-yellow-600/70', hoverBorderColor: 'hover:border-yellow-500/80', iconBg: 'bg-yellow-500/20', iconBorder: 'border-yellow-500/40', iconColor: 'text-yellow-400', statusBg: 'bg-yellow-500/10', statusText: 'text-yellow-300', statusBorder: 'border-yellow-500/30' };
    default: return { bgColor: 'bg-gray-800/40', borderColor: 'border-gray-700/50', hoverBorderColor: 'hover:border-gray-600/70', iconBg: 'bg-gray-700/50', iconBorder: 'border-gray-600/60', iconColor: 'text-gray-400', statusBg: 'bg-gray-700/50', statusText: 'text-gray-300', statusBorder: 'border-gray-600/50' };
  }
};

// Helper: Get Importance Styles for Profile Header
const getImportanceStyles = (importance: ImportanceLevel | undefined) => {
    // Using Emerald for High, Blue for Medium, Gray for Low
    switch (importance?.toLowerCase()) {
        case 'high':
            return {
                gradientFrom: 'from-emerald-600', gradientTo: 'to-emerald-800',
                ringColor: 'ring-emerald-500/40', tagBg: 'bg-emerald-500/10',
                tagText: 'text-emerald-300', tagBorder: 'border-emerald-500/30',
                headerGradientVia: 'via-emerald-900/20' // Subtle tint for header gradient
            };
        case 'medium':
             return {
                gradientFrom: 'from-blue-600', gradientTo: 'to-blue-800',
                ringColor: 'ring-blue-500/40', tagBg: 'bg-blue-500/10',
                tagText: 'text-blue-300', tagBorder: 'border-blue-500/30',
                headerGradientVia: 'via-blue-900/20'
            };
        case 'low':
        default:
             return {
                gradientFrom: 'from-gray-600', gradientTo: 'to-gray-800',
                ringColor: 'ring-gray-500/40', tagBg: 'bg-gray-500/10',
                tagText: 'text-gray-300', tagBorder: 'border-gray-500/30',
                headerGradientVia: 'via-gray-900/10'
            };
    }
};


/**
 * GlimContactCard Component (v6 - Visual Polish)
 *
 * Adds profile picture, more dynamic animations, profile color-coding based on importance,
 * and further design refinements. Removed Glim version text.
 */
const GlimContactCard: React.FC = (): JSX.Element => {
  // --- State Management ---
  const [isStarred, setIsStarred] = useState(true);
  const [activeTab, setActiveTab] = useState<'memory' | 'action' | 'connection'>('action');
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showNewMemory, setShowNewMemory] = useState(false);
  const [expandedActionId, setExpandedActionId] = useState<string | null>(null);
  const [copiedTemplateKey, setCopiedTemplateKey] = useState<string | null>(null);
  const [managedActions, setManagedActions] = useState<Record<string, ManagedActionStatus>>({});

  // Refs - Using NodeJS.Timeout for Node environments, number for browsers
  const recordingIntervalRef = useRef<NodeJS.Timeout | number | null>(null);
  const stopTimeoutRef = useRef<NodeJS.Timeout | number | null>(null);
  const hideRecorderTimeoutRef = useRef<NodeJS.Timeout | number | null>(null);
  const copyTimeoutRef = useRef<NodeJS.Timeout | number | null>(null);


  // --- Effects ---
  useEffect(() => {
    // Cleanup timers
    return () => {
      // Use number type for browser compatibility with clearInterval/clearTimeout
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current as number);
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current as number);
      if (hideRecorderTimeoutRef.current) clearTimeout(hideRecorderTimeoutRef.current as number);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current as number);
    };
  }, []);

  // --- Event Handlers ---
  const handleStartRecording = () => {
    if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current as number);
    if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current as number);
    if (hideRecorderTimeoutRef.current) clearTimeout(hideRecorderTimeoutRef.current as number);
    setIsRecording(true); setShowVoiceRecorder(true); setRecordingTime(0); setShowNewMemory(false);
    recordingIntervalRef.current = setInterval(() => setRecordingTime((prev) => prev + 1), 1000);
    stopTimeoutRef.current = setTimeout(() => {
      if (recordingIntervalRef.current) {
         clearInterval(recordingIntervalRef.current as number);
         recordingIntervalRef.current = null;
      }
      setIsRecording(false); setShowNewMemory(true);
      hideRecorderTimeoutRef.current = setTimeout(() => { setShowVoiceRecorder(false); setRecordingTime(0); }, 1500);
    }, 5000);
  };

  const handleToggleAction = (actionId: string) => {
    setExpandedActionId(prevId => (prevId === actionId ? null : actionId));
  };

  const handleCopyTemplate = (textToCopy: string, key: string) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedTemplateKey(key);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current as number);
      copyTimeoutRef.current = setTimeout(() => setCopiedTemplateKey(null), 2000);
    }).catch(err => console.error('Failed to copy text: ', err));
  };

  const handleManageAction = (actionId: string, status: ManagedActionStatus) => {
     setManagedActions(prev => ({ ...prev, [actionId]: status }));
     if (expandedActionId === actionId) { setExpandedActionId(null); }
     console.log(`Action ${actionId} marked as ${status}`);
  };

  // Image error handler with proper typing
  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loop if fallback fails
    target.src = 'https://placehold.co/64x64/1F2937/E5E7EB?text=Img'; // Simple fallback
  };


  // --- Animation Variants ---
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };
  const tabContentVariants = { hidden: { opacity: 0, x: 25 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } }, exit: { opacity: 0, x: -25, transition: { duration: 0.25, ease: "easeInOut" } } };
  const listStaggerVariants = { visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }, hidden: {} };
  const itemVariants = { hidden: { opacity: 0, y: 15, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } } };
  const hoverScale = { hover: { scale: 1.03, transition: { duration: 0.2 } }, tap: { scale: 0.97 } };
  const hoverScaleSlight = { hover: { scale: 1.02, transition: { duration: 0.2 } }, tap: { scale: 0.98 } };
  const subtleHoverBg = { hover: { backgroundColor: 'rgba(255, 255, 255, 0.04)', transition: { duration: 0.2 } } };
  const expandedContentVariants = { hidden: { opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.3, ease: "easeInOut" } }, visible: { opacity: 1, height: 'auto', marginTop: '1rem', transition: { duration: 0.3, ease: "easeInOut" } } };


  // --- Data ---
  const contactInfo = {
      name: "Sarah Lin", initials: "SL",
      profilePicUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      title: "Product Lead @ InnovateTech", location: "San Francisco, CA",
      email: "sarah.lin@innovatetech.com", phone: "+1 (415) 555-8721",
      connectionDate: "Connected today", valueTag: "High Value",
      importance: "High" as ImportanceLevel
  };
  const personalConnection = { family: "Daughter at Stanford (CS), proud parent. Adjusting to 'empty nest'.", interests: "Hiking (Yosemite), AI ethics, sustainable tech, specialty coffee.", commStyle: "Direct, values honesty. Prefers examples. Responds well to thoughtful questions.", emotionalPoints: [ { point: "Frustrated feeling like 'just another account'.", icon: AlertTriangle, color: 'yellow' }, { point: "Values authenticity, dislikes 'fake interest'.", icon: Heart, color: 'pink' }, { point: "Proud of team growth (5 to 45 in 2 yrs).", icon: Zap, color: 'emerald' } ] };
  const memoryItems = [ { id: 'mem1', text: "Wants to revamp their customer data platform — frustrated with current Salesforce implementation.", timestamp: "2:15 PM" }, { id: 'mem2', text: "Looking for a solution prioritizing relationship context over pipeline tracking.", timestamp: "2:16 PM" }, { id: 'mem3', text: "Team of 45, budget ~ $200K for relationship tools.", timestamp: "2:17 PM" }, { id: 'mem4', text: `Pain point: \"We keep dropping the ball on follow-ups and losing potential customers because we forget what made the connection special.\"`, timestamp: "2:18 PM" }, { id: 'mem5', text: "Mentioned presenting new relationship tools to exec team next month. Decision timeline ~45 days.", timestamp: "Just now", isNew: showNewMemory } ];
  const keyInsights = [ { id: 'ki1', text: "Primary Pain: Current CRM (Salesforce) lacks relationship context, causing frustration.", icon: AlertTriangle, color: 'yellow', type: 'Pain Point' as InsightType }, { id: 'ki2', text: "Goal: Seeking tool focused on 'relationship context', not just pipeline.", icon: Target, color: 'blue', type: 'Goal' as InsightType }, { id: 'ki3', text: "Opportunity: Budget ($200K) exists for the right solution. Decision timeline ~45 days.", icon: Lightbulb, color: 'emerald', type: 'Opportunity' as InsightType }, { id: 'ki4', text: "Leverage Point: Values authenticity & context – highlight how Glim differs from transactional CRMs.", icon: Zap, color: 'pink', type: 'Leverage' as InsightType } ];
  const actionableMomentum: Action[] = [
    { id: 'act1', type: "3-Day Personal Follow-up", status: "Recommended", urgency: "High", date: "Apr 17, 2025", reason: "Acknowledge conversation & address core pain point.", basedOn: ['mem1', 'mem2', 'mem4'], guidance: [ "Objective: Re-engage personally, validate her frustration, and position Glim as the contextual solution.", "Opening Hook: Reference a personal detail (e.g., daughter at Stanford) to show you listened beyond business.", "Bridge to Business: Acknowledge her pain with current CRM's lack of context (Insight KI1). Use her own words if possible ('dropping the ball').", "Glim Positioning: Briefly introduce Glim as a 'Relationship Memory Engine' designed for context, contrasting it with pipeline-focused CRMs.", "Call to Action: Suggest a brief, low-commitment meeting (20 mins) focused on *how* Glim solves her specific context problem.", "Tone: Empathetic, authentic, and solution-oriented." ], drafts: [ { platform: 'Email', subject: "Following up on our chat - Glim & relationship context", text: `Hi Sarah,\n\nReally enjoyed our conversation today. I was thinking about your frustration with current tools lacking relationship context – it's a common pain point Glim was built to solve.\n\nUnlike traditional CRMs focused on pipelines, Glim acts as your team's 'Relationship Memory Engine', ensuring the nuances that build trust aren't lost.\n\nWould you have 20 minutes next Tuesday or Wednesday to see how it works in practice?\n\nBest,\n[Your Name]` } ], primary: true },
    { id: 'act2', type: "Share Relevant Content", status: "Optional", urgency: "Low", date: "Apr 21, 2025", reason: "Provide value based on interest in AI ethics.", basedOn: [], guidance: [ "Objective: Build rapport and demonstrate value beyond a direct sale by sharing content aligned with her interests (AI ethics).", "Content Selection: Find a high-quality, recent article or resource specifically on AI ethics related to CRM, customer relationships, or tech.", "Messaging: Keep it brief and low-pressure. Frame it as 'thought you might find this interesting' based on her passion.", "Platform: LinkedIn message or a very short email is suitable.", "Key Point: Explicitly state 'No need to reply' to reinforce the value-add nature." ], drafts: [ { platform: 'LinkedIn', text: "Sarah, saw this piece on AI ethics in CRM and thought it might resonate with your interests you mentioned. Sharing in case it's useful: [Link]" } ], primary: false },
    { id: 'act3', type: "Check-in Before Presentation", status: "Suggested", urgency: "Medium", date: "May 5, 2025", reason: "Offer support or insights before her exec presentation.", basedOn: ['mem5'], guidance: [ "Objective: Provide timely support and reinforce Glim's value proposition before a key internal event.", "Timing: Reach out roughly a week before her presentation.", "Messaging: Offer brief, specific help related to presenting relationship tools (e.g., 'Happy to share stats on context impact' or 'Wishing you luck!'). Keep it short and supportive.", "Avoid: Don't make it a sales pitch; focus on being helpful.", "Platform: Email or LinkedIn message appropriate." ], drafts: [ { platform: 'Email', subject: "Thinking of your upcoming presentation", text: `Hi Sarah,\n\nRecalled you mentioning your presentation on relationship tools next month. Wishing you the best with it!\n\nIf any last-minute thoughts on framing the importance of relationship context would be helpful, feel free to ping me. Otherwise, just wanted to send good vibes!\n\nBest,\n[Your Name]` } ], primary: false }
  ];

  // Filter out dismissed actions for rendering
  const visibleActions = actionableMomentum.filter(action => managedActions[action.id] !== 'dismissed');

  // Get importance styles based on contact data
  const importanceStyles = getImportanceStyles(contactInfo.importance);


  // --- Render ---
  return (
    <motion.div
      className="flex flex-col w-full max-w-md lg:max-w-lg mx-auto rounded-2xl overflow-hidden bg-gray-900 text-gray-100 shadow-2xl border border-gray-700/40 font-sans"
      variants={cardVariants} initial="hidden" animate="visible" layout
    >
      {/* Status Bar - Removed Glim Version */}
      <div className="bg-gray-950 px-4 py-2 flex justify-between items-center border-b border-gray-700/40">
        <div className="flex items-center gap-2">
          <motion.div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-xs font-medium text-emerald-400">AI Memory Engine Active</span>
        </div>
        {/* Glim version removed */}
      </div>

      {/* Header - Applying Importance Styles */}
      <div className={`bg-gradient-to-br from-gray-800 ${importanceStyles.headerGradientVia} to-gray-900 px-6 py-5 flex justify-between items-center`}> {/* Importance tint */}
        <div className="flex items-center gap-4">
          {/* Profile Picture */}
          <motion.div className="relative group" variants={hoverScale} whileHover="hover" whileTap="tap">
             <img
                src={contactInfo.profilePicUrl}
                alt={`${contactInfo.name} profile picture`}
                onError={handleImageError}
                className={`w-16 h-16 rounded-full object-cover bg-gray-700 shadow-lg ring-2 ${importanceStyles.ringColor}`}
             />
            {/* Online status indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-gray-850 shadow-md ring-1 ring-white/20"></div>
          </motion.div>
          {/* Name and Connection Status */}
          <div>
            <h2 className="text-2xl font-semibold text-white">{contactInfo.name}</h2>
            <div className="flex items-center mt-1 gap-2">
              <motion.button onClick={() => setIsStarred(!isStarred)} className={`p-1 rounded-full transition-colors duration-300 ${isStarred ? "text-yellow-400 hover:text-yellow-300" : "text-gray-500 hover:text-yellow-500"}`} aria-label={isStarred ? "Unstar contact" : "Star contact"} whileHover={{ scale: 1.2, rotate: isStarred ? -15 : 15 }} whileTap={{ scale: 0.9 }}>
                <Star size={18} fill={isStarred ? "currentColor" : "none"} />
              </motion.button>
              <span className="text-gray-400 text-sm">{contactInfo.connectionDate}</span>
            </div>
          </div>
        </div>
        {/* Importance Tag */}
        <div>
          <motion.div
             className={`px-3 py-1 rounded-full ${importanceStyles.tagBg} ${importanceStyles.tagText} text-sm font-medium border ${importanceStyles.tagBorder} shadow-sm backdrop-blur-sm`}
             variants={hoverScaleSlight} whileHover="hover"
          >
            {contactInfo.valueTag} ({contactInfo.importance}) {/* Display importance level */}
          </motion.div>
        </div>
      </div>

      {/* Essential Contact Details Grid */}
      <div className="bg-gray-800/50 px-4 py-3 grid grid-cols-1 gap-3 border-b border-gray-700/40 sm:grid-cols-2">
        {[ { icon: Mail, label: "Email", value: contactInfo.email }, { icon: Phone, label: "Phone", value: contactInfo.phone }, { icon: Briefcase, label: "Position", value: contactInfo.title }, { icon: MapPin, label: "Location", value: contactInfo.location }, ].map((item, index) => (
          <motion.div key={index} className="flex items-center gap-3 group transition-all duration-300 hover:bg-gray-700/30 p-2.5 rounded-lg cursor-pointer" variants={hoverScaleSlight} whileHover="hover" whileTap="tap">
            <div className="w-9 h-9 rounded-lg bg-gray-700/40 flex items-center justify-center shrink-0 group-hover:bg-emerald-600/20 transition-colors duration-300 border border-gray-600/50 group-hover:border-emerald-500/50">
              <item.icon size={16} className="text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs text-gray-400">{item.label}</span>
              <span className="text-sm text-gray-100 group-hover:text-white transition-colors duration-300 truncate">{item.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700/60 bg-gray-850 sticky top-0 z-20 shadow-sm">
        {[ { id: 'memory', label: 'Relationship Memory', icon: BrainCircuit, color: 'emerald' }, { id: 'action', label: 'Actionable Momentum', icon: Zap, color: 'blue' }, { id: 'connection', label: 'Personal Context', icon: Heart, color: 'pink' }, ].map((tab) => (
          <button key={tab.id} className={`relative flex-1 py-4 font-medium text-sm flex items-center justify-center gap-2 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 ${ activeTab === tab.id ? 'text-white bg-gray-800/50' : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800/30' }`} onClick={() => setActiveTab(tab.id as 'memory' | 'action' | 'connection')} aria-selected={activeTab === tab.id} role="tab">
            <motion.span whileHover={{ scale: 1.1 }}><tab.icon size={16} className={activeTab === tab.id ? `text-${tab.color}-400` : 'text-gray-500 group-hover:text-gray-400'} /></motion.span>
            {tab.label}
            {activeTab === tab.id && <motion.div className={`absolute bottom-0 left-0 right-0 h-1 bg-${tab.color}-400 rounded-t-sm`} layoutId="underline" transition={{ type: "spring", stiffness: 350, damping: 35 }} />}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-850/20 relative bg-gray-900/70">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="p-6">

            {/* --- Relationship Memory Content --- */}
            {activeTab === 'memory' && (
              <motion.div variants={listStaggerVariants} initial="hidden" animate="visible" className="space-y-8">
                 {/* Insights and Memory Stream */}
                 <motion.section variants={itemVariants}> <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2.5"> <Lightbulb size={20} /> Key Insights & Opportunities </h3> <motion.div variants={listStaggerVariants} className="space-y-3"> {keyInsights.map((insight) => ( <motion.div key={insight.id} className="flex items-start gap-3 group bg-gradient-to-r from-gray-800/50 to-gray-800/30 p-3.5 rounded-lg border border-gray-700/60 hover:border-gray-600/80 transition-all duration-300 hover:shadow-md" variants={itemVariants} whileHover={{ y: -2 }}> <InsightIcon type={insight.type} color={insight.color} /> <div className="flex-1 pt-0.5"> <span className={`text-xs font-semibold tracking-wide text-${insight.color}-400 uppercase`}>{insight.type}</span> <p className="text-gray-100 text-sm leading-relaxed mt-1">{insight.text}</p> </div> </motion.div> ))} </motion.div> </motion.section>
                 <hr className="border-gray-700/60 my-8" />
                 <motion.section variants={itemVariants}> <div className="flex items-center justify-between mb-4"> <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2.5"> <BrainCircuit size={20} className="text-emerald-400" /> Captured Memory Stream </h3> <motion.button className="text-xs text-gray-400 hover:text-emerald-400 flex items-center gap-1" whileTap={{ scale: 0.95 }}> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg> Filter </motion.button> </div> <motion.div variants={listStaggerVariants} className="space-y-3"> {memoryItems.map((memory) => ( <motion.div key={memory.id} className={`flex items-start gap-3 group p-3.5 rounded-lg transition-all duration-300 border ${memory.isNew ? 'bg-emerald-800/40 border-emerald-600/60 ring-1 ring-emerald-500/50 shadow-lg' : 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-700/40 hover:border-gray-600/70'}`} variants={itemVariants} initial={memory.isNew ? { scale: 0.9, opacity: 0 } : false} animate={memory.isNew ? { scale: 1, opacity: 1, transition: { delay: 0.5, duration: 0.4 } } : {}} whileHover={{ y: -2 }}> <motion.div className={`w-7 h-7 rounded-full ${memory.isNew ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-600'} flex items-center justify-center mt-0.5 shadow-md flex-shrink-0 group-hover:bg-emerald-500 transition-colors duration-300`} whileHover={{ rotate: memory.isNew ? 0 : 360, scale: 1.1 }}> <div className="w-2.5 h-2.5 bg-white rounded-full shadow-inner"></div> </motion.div> <div className="flex-1"> <p className={`text-sm leading-relaxed ${memory.isNew ? 'text-emerald-100 font-medium' : 'text-gray-200 group-hover:text-white'} transition-colors duration-300`}>{memory.text}</p> <span className={`text-xs ${memory.isNew ? 'text-emerald-300' : 'text-gray-500'} mt-1.5 block`}>{memory.timestamp}</span> </div> </motion.div> ))} </motion.div> </motion.section>
                 <motion.section className="mt-8 sticky bottom-0 pb-2 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent z-10" variants={itemVariants}> <AnimatePresence mode="wait"> {showVoiceRecorder ? ( <motion.div key="recorder" className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-700/70 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}> <div className="flex justify-between items-center mb-3"> <h4 className="text-sm font-medium text-white">Capturing Voice Memory...</h4> {!isRecording && <motion.button onClick={() => setShowVoiceRecorder(false)} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700" whileTap={{ scale: 0.9 }}><X size={16} /></motion.button>} </div> <div className="flex items-center justify-center py-3 min-h-[80px]"> {isRecording ? ( <motion.div className="flex flex-col items-center" key="recording"> <motion.div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-2 shadow-lg ring-2 ring-red-500/50" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}><Mic size={24} className="text-white" /></motion.div> <span className="text-red-400 text-sm font-mono">{recordingTime}s</span> </motion.div> ) : ( <motion.div className="text-center w-full" key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}> <p className="text-sm text-gray-300 mb-2">Processing & Adding to Memory...</p> <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden"><motion.div className="bg-emerald-500 h-full" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 0.8, ease: "linear", delay: 0.3 }} /></div> </motion.div> )} </div> </motion.div> ) : ( <motion.div key="input" className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}> <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10"><Mic size={18} className="text-emerald-400" /></div> <input type="text" placeholder="Speak or type to capture memory..." className="w-full bg-gray-800/80 backdrop-blur-sm border border-gray-700/70 rounded-lg pl-12 pr-28 py-4 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/80 placeholder-gray-500 text-gray-100 transition-all duration-300 hover:border-gray-600/90 focus:bg-gray-800 shadow-inner"/> <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-2"> <motion.button onClick={handleStartRecording} className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700/70 hover:bg-emerald-600 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" aria-label="Start voice recording" variants={hoverScale} whileHover="hover" whileTap="tap"><Mic size={18} className="text-gray-300 group-hover:text-white transition-colors duration-300" /></motion.button> <motion.button className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" aria-label="Add text memory" variants={hoverScale} whileHover="hover" whileTap="tap"><Send size={18} className="text-white" /></motion.button> </div> </motion.div> )} </AnimatePresence> </motion.section>
              </motion.div>
            )}

            {/* --- Actionable Momentum Content --- */}
            {activeTab === 'action' && (
              <motion.div initial="hidden" animate="visible" className="space-y-8">
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2.5">
                      <Zap size={20} /> Actionable Momentum
                    </h3>
                     <motion.button className="text-xs text-gray-400 hover:text-blue-400 flex items-center gap-1" whileTap={{ scale: 0.95 }}>
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                         Filter Actions
                     </motion.button>
                  </div>

                  {/* Map over actions */}
                  <motion.div variants={listStaggerVariants} className="space-y-4">
                    {visibleActions.map((action) => {
                      const isExpanded = expandedActionId === action.id;
                      const urgencyStyles = getUrgencyStyles(action.urgency);
                      const isManaged = managedActions[action.id];

                      return (
                        <motion.div
                          key={action.id}
                          variants={itemVariants}
                          layout
                          className={`rounded-lg border transition-all duration-300 overflow-hidden relative ${ isManaged === 'snoozed' ? 'opacity-50' : '' } ${ isExpanded ? `${urgencyStyles.bgColor} ${urgencyStyles.borderColor} shadow-lg` : `${action.primary ? urgencyStyles.bgColor.replace('30', '20') : 'bg-gray-800/40'} ${urgencyStyles.borderColor.replace('70', '40')} ${urgencyStyles.hoverBorderColor}` }`}
                          whileHover={!isManaged && !isExpanded ? { y: -2, scale: 1.01 } : {}}
                        >
                           {isManaged === 'snoozed' && ( <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center z-10 rounded-lg"> <span className="text-gray-400 text-sm font-medium flex items-center gap-1"><BellOff size={14}/> Snoozed</span> </div> )}

                          {/* Clickable Header */}
                          <motion.button
                            onClick={() => !isManaged && handleToggleAction(action.id)}
                            className={`flex justify-between items-center w-full p-4 text-left transition-colors duration-300 ${isExpanded ? '' : 'hover:bg-gray-700/20'} ${isManaged ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            aria-expanded={isExpanded}
                            whileTap={!isManaged ? { scale: 0.98 } : {}}
                            disabled={!!isManaged}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg ${urgencyStyles.iconBg} ${urgencyStyles.iconBorder} flex items-center justify-center shrink-0 border shadow-inner`}>
                                <Zap size={16} className={urgencyStyles.iconColor} />
                              </div>
                              <div>
                                <span className="text-base font-semibold text-white">{action.type}</span>
                                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1.5"> <Clock size={12} /> Suggested: {action.date} </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                               {action.status && ( <div className={`text-xs hidden sm:block px-2.5 py-1 ${urgencyStyles.statusBg} ${urgencyStyles.statusText} ${urgencyStyles.statusBorder} rounded-full border whitespace-nowrap`}> {action.status} ({action.urgency}) </div> )}
                              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}> <ChevronDown size={20} className={`transition-colors ${isExpanded ? urgencyStyles.iconColor : 'text-gray-500'}`} /> </motion.div>
                            </div>
                          </motion.button>

                          {/* Expanded Content */}
                          <AnimatePresence initial={false}>
                            {isExpanded && !isManaged && (
                              <motion.div key="content" variants={expandedContentVariants} initial="hidden" animate="visible" exit="hidden" className="px-4 pb-4 overflow-hidden">
                                 <hr className={`mb-4 ${urgencyStyles.borderColor.replace('70', '60')}`} />
                                 <div className="mb-5"> <h4 className="text-sm font-semibold text-gray-200 mb-2">Personalized Strategy:</h4> <ul className="space-y-1.5 list-disc list-inside pl-1"> {action.guidance.map((point, index) => ( <li key={index} className="text-sm text-gray-300 leading-relaxed">{point}</li> ))} </ul> </div>
                                 {action.drafts && action.drafts.length > 0 && ( <div className="mb-5"> <h4 className="text-sm font-semibold text-gray-200 mb-2">Suggested Template:</h4> {action.drafts.map((draft, index) => { if (index > 0) return null; const templateKey = `${action.id}-draft-${index}`; return ( <div key={templateKey} className="bg-gray-700/30 p-3.5 rounded-md border border-gray-600/50 relative group"> <div className="flex justify-between items-center mb-2.5"> <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{draft.platform} {draft.subject ? `- ${draft.subject}`: ''}</span> <motion.button onClick={() => handleCopyTemplate(draft.text, templateKey)} className={`text-xs px-2 py-1 rounded-md flex items-center gap-1 transition-all duration-200 absolute top-2 right-2 ${copiedTemplateKey === templateKey ? 'bg-emerald-500 text-white shadow-md' : 'bg-gray-600/70 hover:bg-emerald-700 text-gray-300 hover:text-white opacity-0 group-hover:opacity-100'}`} whileTap={{ scale: 0.95 }} initial={{ opacity: 0 }} animate={{ opacity: copiedTemplateKey === templateKey ? 1 : 0 }} whileHover={{ opacity: 1 }}> {copiedTemplateKey === templateKey ? <><Check size={14}/> Copied!</> : <><Copy size={14}/> Copy</>} </motion.button> </div> <pre className="text-sm text-gray-200 whitespace-pre-wrap break-words font-mono bg-gray-800/50 p-3 rounded scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700/50 max-h-48 overflow-y-auto">{draft.text}</pre> </div> ); })} </div> )}
                                 <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700/60"> <div className="flex gap-2"> <motion.button onClick={() => handleManageAction(action.id, 'snoozed')} className="text-xs text-gray-400 hover:text-yellow-400 flex items-center gap-1 p-1 rounded hover:bg-gray-700/50 transition-colors" title="Snooze this action" whileTap={{ scale: 0.9 }}> <BellOff size={14} /> Snooze </motion.button> <motion.button onClick={() => handleManageAction(action.id, 'dismissed')} className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1 p-1 rounded hover:bg-gray-700/50 transition-colors" title="Dismiss this action" whileTap={{ scale: 0.9 }}> <Archive size={14} /> Dismiss </motion.button> </div> <motion.button className={`px-4 py-1.5 text-sm ${action.primary ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'} font-semibold rounded-full transition-colors duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white`} variants={hoverScale} whileHover="hover" whileTap="tap"> {action.primary ? 'Schedule Action' : 'Mark as Reviewed'} </motion.button> </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                     <motion.div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-blue-600/50 hover:bg-gray-800/30 transition-all duration-300 group cursor-pointer mt-6" variants={hoverScale} whileHover="hover" whileTap="tap"> <button className="flex items-center justify-center gap-2 w-full text-gray-500 group-hover:text-blue-400 transition-colors duration-300"> <Plus size={16} /> <span className="text-sm font-medium">Create Custom Action</span> </button> </motion.div>
                  </motion.div>
                </section>
              </motion.div>
            )}

             {/* --- Personal Context Content --- */}
            {activeTab === 'connection' && (
              <motion.div variants={listStaggerVariants} initial="hidden" animate="visible" className="space-y-8">
                 <motion.section variants={itemVariants}> <div className="flex items-center justify-between mb-4"> <h3 className="text-lg font-semibold text-pink-400 flex items-center gap-2.5"> <User size={20} /> Personal Context </h3> <motion.button className="text-xs text-emerald-400 flex items-center gap-1 bg-gray-800 hover:bg-gray-700 transition-colors duration-300 px-3 py-1.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" variants={hoverScale} whileHover="hover" whileTap="tap"> <Edit size={12} /> Edit Context </motion.button> </div> <motion.div variants={listStaggerVariants} className="space-y-4"> {[ { icon: User, title: "Family & Personal", content: personalConnection.family }, { icon: Coffee, title: "Interests & Passions", content: personalConnection.interests }, { icon: MessageSquare, title: "Communication Style", content: personalConnection.commStyle }, ].map((card, index) => ( <motion.div key={index} className="bg-gray-800/40 p-4 rounded-lg border border-gray-700/60" variants={itemVariants} whileHover={{ y: -2 }}> <h4 className="text-sm font-semibold text-pink-300 mb-2 flex items-center gap-2.5"> <card.icon size={16} /> {card.title} </h4> <p className="text-gray-200 text-sm leading-relaxed">{card.content}</p> </motion.div> ))} </motion.div> </motion.section>
                 <motion.section variants={itemVariants}> <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2.5"> <Heart size={20} className="text-pink-400"/> Emotional Connection Points </h3> <motion.div variants={listStaggerVariants} className="space-y-3"> {personalConnection.emotionalPoints.map((point, index) => ( <motion.div key={index} className="flex items-start gap-3 group bg-gray-800/40 p-3.5 rounded-lg border border-gray-700/60" variants={itemVariants} whileHover={{ y: -2 }}> <div className={`mt-1 w-6 h-6 rounded-lg bg-${point.color}-500/10 flex items-center justify-center flex-shrink-0 border border-${point.color}-500/30 shadow-inner`}> <point.icon size={14} className={`text-${point.color}-400`} /> </div> <p className="text-gray-200 text-sm leading-relaxed flex-1 pt-0.5">{point.point}</p> </motion.div> ))} </motion.div> </motion.section>
              </motion.div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-auto p-4 bg-gradient-to-t from-gray-900 to-gray-850 border-t border-gray-700/50 flex flex-wrap justify-between items-center gap-3">
        <div className="flex gap-2 flex-wrap">
           <div className="flex items-center gap-1.5 text-xs bg-pink-500/10 text-pink-300 px-3 py-1.5 rounded-full border border-pink-500/30 shadow-sm backdrop-blur-sm"> <Heart size={14} fill="currentColor" /> <span>Strong Connection</span> </div>
          <motion.button className="flex items-center gap-1.5 text-xs bg-gray-700/50 text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-600/70 hover:text-gray-100 transition-colors duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 backdrop-blur-sm" variants={hoverScale} whileHover="hover" whileTap="tap"> <Clock3 size={14} /> <span>Remind</span> <ChevronRight size={14} className="-mr-1" /> </motion.button>
        </div>
        <div>
          <motion.button className="px-6 py-2.5 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-semibold text-sm rounded-lg hover:from-emerald-500 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-emerald-400 flex items-center gap-2" variants={hoverScale} whileHover="hover" whileTap="tap"> {activeTab === 'action' ? <><Check size={16}/> Review Actions</> : <><Send size={16}/> Save Changes</>} </motion.button>
        </div>
      </div>

      {/* Keep scrollbar styles */}
      <style jsx global>{`
        .scrollbar-thin { scrollbar-width: thin; scrollbar-color: #4B5563 rgba(31, 41, 55, 0.2); }
        .scrollbar-thin::-webkit-scrollbar { width: 8px; height: 8px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: rgba(31, 41, 55, 0.2); border-radius: 10px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background-color: #4B5563; border-radius: 10px; border: 2px solid rgba(31, 41, 55, 0.2); }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { background-color: #6B7280; }
        pre { white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; word-wrap: break-word; }
      `}</style>
    </motion.div>
  );
};

export default GlimContactCard;
