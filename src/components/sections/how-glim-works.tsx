'use client'

import React, { useState, useEffect, useRef, ComponentType, ReactNode } from 'react';
import { motion, AnimatePresence, Transition, Repeat } from 'framer-motion';
import { 
    Paperclip, 
    User, 
    Search, 
    Mic, 
    Camera, 
    Type, 
    MessageCircle, // Keep if used, e.g., Interaction History icon
    ClipboardCheck, // Example for Action Items icon
    Bell, // Example for Alerts icon
    Eye, // Example for Intelligence View icon
    Sparkles, // Example for AI Insights icon
    Brain,
    Zap,
    Users,
    Heart,
    Calendar,
    Clock,
    Phone,
    Mail,
    MapPin,
    Briefcase,
    Check,
    Clock3,
    Star,
    Edit,
    ChevronRight,
    X,
    Plus,
    Activity,
    Coffee,
    BrainCircuit,
    Lightbulb,
    AlertTriangle,
    Target,
    Copy,
    SendHorizonal,
    Linkedin,
    ChevronDown,
    Archive,
    BellOff,
    Send,
    MessageSquare
} from 'lucide-react';

// Import the GlimContactCard component and necessary types/data
import GlimContactCard, { sampleContacts as smartCardContactsData, ContactData } from './smart_contact_card';
// import GlimContactCardV2 from './card-insight'; // Keep commented or remove if V2 not needed elsewhere

// --- Type for SVG Icon Components ---
interface IconProps {
    className: string;
}

// --- SVG Icons (Inline) with Types ---
const MicIcon: React.FC<IconProps> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg> );
const CameraIcon: React.FC<IconProps> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg> );
const FileTextIcon: React.FC<IconProps> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg> );
const StopIcon: React.FC<IconProps> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2"/></svg> );
const ResetIcon: React.FC<IconProps> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> );
const SpinnerIcon: React.FC<IconProps> = ({ className }) => ( <motion.svg
    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
><path d="M21 12a9 9 0 1 1-6.219-8.56"/></motion.svg> );

// Helper functions for Card Insight tab
// Helper: Icon for Insight Type
interface InsightIconProps {
  type: string;
  color: string;
}

const InsightIcon: React.FC<InsightIconProps> = ({ type, color }) => {
  const iconMap = { 'Pain Point': AlertTriangle, 'Goal': Target, 'Opportunity': Lightbulb, 'Leverage': Zap };
  // Explicitly type the key for iconMap lookup
  const IconComponent = iconMap[type as keyof typeof iconMap] || Lightbulb;
  return (
     <div className={`mt-1 w-6 h-6 rounded-lg bg-${color}-500/10 flex items-center justify-center flex-shrink-0 border border-${color}-500/30 shadow-inner`}>
       <IconComponent size={14} className={`text-${color}-400`} />
     </div>
  );
};

// Helper: Get Urgency Styles for Actions
const getUrgencyStyles = (urgency: string | undefined) => { // Add type annotation
  switch (urgency?.toLowerCase()) {
    case 'high': return { bgColor: 'bg-red-800/30', borderColor: 'border-red-600/70', hoverBorderColor: 'hover:border-red-500/80', iconBg: 'bg-red-500/20', iconBorder: 'border-red-500/40', iconColor: 'text-red-400', statusBg: 'bg-red-500/10', statusText: 'text-red-300', statusBorder: 'border-red-500/30' };
    case 'medium': return { bgColor: 'bg-yellow-800/30', borderColor: 'border-yellow-600/70', hoverBorderColor: 'hover:border-yellow-500/80', iconBg: 'bg-yellow-500/20', iconBorder: 'border-yellow-500/40', iconColor: 'text-yellow-400', statusBg: 'bg-yellow-500/10', statusText: 'text-yellow-300', statusBorder: 'border-yellow-500/30' };
    default: return { bgColor: 'bg-gray-800/40', borderColor: 'border-gray-700/50', hoverBorderColor: 'hover:border-gray-600/70', iconBg: 'bg-gray-700/50', iconBorder: 'border-gray-600/60', iconColor: 'text-gray-400', statusBg: 'bg-gray-700/50', statusText: 'text-gray-300', statusBorder: 'border-gray-600/50' };
  }
};

// Helper: Get Importance Styles for Profile Header
const getImportanceStyles = (importance: string | undefined) => { // Add type annotation
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

// Tab Data: Define the content for the THREE tabs in the desired order
const tabs = [
    {
      id: 'overview',
      label: 'Memory Capture',
      icon: Eye,
      content: {
        title: 'Memory Capture',
        description: 'Capture relationship details effortlessly – voice notes, scanned cards, quick texts – forming the foundation of your AI memory.',
        // Keep interactive cards for this tab
        cards: [
          { 
            icon: Mic, 
            title: 'Voice Input', 
            subtitle: 'Speak to capture details', 
            example: `"Just had a productive call with Alex Chen, CTO at Quantum Innovations. They're looking to revamp their cybersecurity infrastructure by Q3 2025. Budget is $450K..."` 
          },
          { 
            icon: Camera, 
            title: 'Camera Input', 
            subtitle: 'Capture with your camera', 
            example: 'Business card scan: Alex Chen, CTO Quantum Innovations, Inc. + Notes: Discussed cybersecurity revamp, Q3 2025, $450K budget.' 
          },
          { 
            icon: Type, 
            title: 'Text Input', 
            subtitle: 'Type or paste your notes', 
            example: 'Meeting with David Kim (EcoSmart): Needs sustainability tracking software, $300K budget, ASAP. Interested in data viz & API integrations.' 
          },
        ]
      }
    },
    {
      id: 'contacts',
      label: 'Smart Contact Cards',
      icon: Users,
      content: {
        title: 'Smart Contact Cards',
        description: 'Instantly access AI-enriched context, history, and insights for every relationship.',
        // This tab will now render the GlimContactCard components
      }
    },
    {
      id: 'momentum',
      label: 'Relationship Hub',
      icon: Zap,
      content: {
        title: 'Relationship Hub',
        description: 'Dive deep into individual relationships: review memory, strategize actions, and understand personal context.',
        // Keep content object, but we'll replace the rendering logic 
      }
    }
];

// --- Data for the INTERACTIVE cards (Capture Tab) ---
const interactiveCardData = [
  { id: 'voice', icon: MicIcon, iconBgColor: 'bg-indigo-600', gradientFrom: 'from-indigo-900', title: 'Voice Input', description: 'Click card to simulate voice capture and processing.', content: `Just had a productive call with Alex Chen, CTO at Quantum Innovations on March 15, 2025. They're looking to revamp their enterprise cybersecurity infrastructure by Q3 2025. Alex mentioned they have a $450K budget... He's particularly interested in our AI-powered threat detection module. Need to prepare a custom demo...`, buttonColor: 'bg-indigo-600', hoverButtonColor: 'hover:bg-indigo-700', finalContent: { Type: "Voice Note Summary", Contact: "Alex Chen...", Topic: "Cybersecurity...", Budget: "$450K", Timeline: "Q3 2025", Action: "Prepare custom demo...", } },
  { id: 'camera', icon: CameraIcon, iconBgColor: 'bg-teal-600', gradientFrom: 'from-teal-900', title: 'Camera Input', description: 'Click card to simulate scanning and processing.', content: `Email: alex.chen@quantuminn...
Note: Discussed cybersecurity infrastructure revamp, Q3 2025, $450K budget. Urgent follow-up needed.`, buttonColor: 'bg-teal-600', hoverButtonColor: 'hover:bg-teal-700', finalContent: { Type: "Scanned Note Summary", Source: "Business Card...", Email: "alex.chen@...", Topic: "Cybersecurity...", Budget: "$450K", Action: "Urgent Follow-up", } },
  { id: 'text', icon: FileTextIcon, iconBgColor: 'bg-rose-600', gradientFrom: 'from-rose-900', title: 'Text Input', description: 'Click card to simulate text input and processing.', content: `Meeting with David Kim, Head of Product at EcoSmart Solutions today. They need help with their sustainability tracking software. Budget: $300K, timeline is ASAP.`, buttonColor: 'bg-rose-600', hoverButtonColor: 'hover:bg-rose-700', finalContent: { Type: "Text Note Summary", Contact: "David Kim...", Topic: "Sustainability...", Budget: "$300K", Timeline: "ASAP", } },
];

// --- Helper: Animated Waveform ---
const Waveform = () => {
    const variants = { initial: { height: '2px', opacity: 0.5 }, animate: { height: ['2px', '15px', '5px', '20px', '8px', '12px', '2px'], opacity: 1 }, };
    // Explicitly type the transition object to satisfy the linter
    const transition: Repeat & Transition = { duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" };
    return ( <div className="flex items-end justify-center h-10 gap-1 my-4"> {[...Array(15)].map((_, i) => (
        <motion.div
             key={i}
             variants={variants}
             initial="initial"
             animate="animate"
             // Apply transition with delay directly here
             transition={{ ...transition, delay: i * 0.05 }}
             className="w-1 bg-indigo-400 rounded-full"
        />
     ))} </div> );
};

// --- Helper: Camera Scanning Animation ---
interface CameraScanningProps {
    onComplete: () => void;
}
const CameraScanning: React.FC<CameraScanningProps> = ({ onComplete }) => {
    useEffect(() => { const timer = setTimeout(onComplete, 4000); return () => clearTimeout(timer); }, [onComplete]); return ( <motion.div key="scanning" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center flex-grow p-4 text-center"> <div className="relative w-32 h-24 border-2 border-teal-400 rounded-md overflow-hidden mb-4"> <div className="absolute inset-0 bg-gray-700 flex items-center justify-center"> <FileTextIcon className="text-gray-500 opacity-50 w-10 h-10" /> </div> <motion.div className="absolute left-0 right-0 h-1 bg-teal-300 opacity-75 shadow-lg" style={{ boxShadow: '0 0 8px 2px rgba(50, 200, 150, 0.7)' }} initial={{ top: '5%' }} animate={{ top: '90%' }} transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} /> </div> <p className="text-sm font-semibold text-white mb-1">Scanning...</p> <SpinnerIcon className="w-5 h-5 text-teal-400 mt-2" /> </motion.div> );
};

// --- Helper: Text Input Simulation ---
interface TextInputSimulationProps {
    textToSimulate: string;
    onComplete: () => void;
}
const TextInputSimulation: React.FC<TextInputSimulationProps> = ({ textToSimulate, onComplete }) => {
    const [displayedText, setDisplayedText] = useState(''); const index = useRef(0); useEffect(() => { setDisplayedText(''); index.current = 0; const intervalId = setInterval(() => { if (index.current < textToSimulate.length) { setDisplayedText((prev) => prev + textToSimulate[index.current]); index.current++; } else { clearInterval(intervalId); setTimeout(onComplete, 1000); } }, 30); return () => clearInterval(intervalId); }, [textToSimulate, onComplete]); return ( <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 pt-8 font-mono text-xs leading-relaxed flex-grow overflow-y-auto whitespace-pre-wrap"> {displayedText} <motion.span className="inline-block w-1.5 h-3 bg-rose-400 ml-0.5" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} /> </motion.div> );
};

// --- Helper: Processing Indicator ---
interface ProcessingIndicatorProps {
    text: string;
    colorClass?: string;
}
const ProcessingIndicator: React.FC<ProcessingIndicatorProps> = ({ text, colorClass = "text-indigo-400" }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center text-center p-4 space-y-3 flex-grow"> <SpinnerIcon className={`w-8 h-8 ${colorClass}`} /> <p className={`text-sm ${colorClass.replace("text-", "text-").replace("-400", "-300")}`}>{text}</p> </motion.div>
);

// --- Type for Simulation Stages ---
type SimulationStage = 'idle' | 'recording' | 'scanning' | 'typing' | 'processing' | 'done';

// --- Reusable INTERACTIVE Card Component (with Types) ---
interface InteractiveCardProps {
    id: string;
    icon: ComponentType<IconProps>;
    iconBgColor: string;
    gradientFrom: string;
    title: string;
    description: string;
    content: string;
    buttonColor: string;
    hoverButtonColor: string;
    finalContent: Record<string, string | undefined>; // Allow undefined values
}
const InteractiveCard: React.FC<InteractiveCardProps> = ({ id, icon: Icon, iconBgColor, gradientFrom, title, description, content, buttonColor, hoverButtonColor, finalContent }) => {
  const [stage, _setStage] = useState<SimulationStage>('idle');
  const stageRef = useRef<SimulationStage>(stage); // Ref to track current stage
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Wrapper for setStage to update ref as well
  const setStage = (newStage: SimulationStage) => {
    stageRef.current = newStage;
    _setStage(newStage);
  };

  const clearTimers = () => {
      // Add null checks before clearing
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      intervalRef.current = null; // Reset refs
      timeoutRef.current = null;
  };

  useEffect(() => {
      // clearTimers is called here, potentially setting refs to null
      clearTimers();
      if (stage === 'recording') {
          intervalRef.current = setInterval(() => setTimer((prev) => prev + 1), 1000);
      } else {
          setTimer(0);
      }
      // Return the cleanup function correctly
      return () => clearTimers();
  }, [stage]);

  const startSimulation = () => {
      if (stage === 'idle') {
          clearTimers();
          switch (id) {
              case 'voice':
                  setStage('recording');
                  timeoutRef.current = setTimeout(() => {
                      // Check ref inside timeout
                      if (stageRef.current === 'recording') {
                          handleCaptureComplete();
                      }
                  }, 5000);
                  break;
              case 'camera':
                  setStage('scanning');
                  break;
              case 'text':
                  setStage('typing');
                  break;
              default:
                  break;
          }
      }
  };

  const handleCaptureComplete = () => {
      clearTimers();
      setStage('processing');
  };

  useEffect(() => {
      if (stage === 'processing') {
          clearTimers();
          timeoutRef.current = setTimeout(() => {
              setStage('done');
          }, 3000);
          return clearTimers;
      }
  }, [stage]);

  const stopRecording = () => {
      if (stage === 'recording') {
          handleCaptureComplete();
      }
  };

  const resetSimulation = () => {
      clearTimers();
      setStage('idle');
  };

  const handleTitleClick = (e: React.MouseEvent<HTMLHeadingElement>) => { if (stage === 'done') { e.stopPropagation(); resetSimulation(); } };

  const cursorStyle = stage === 'idle' ? 'cursor-pointer' : 'cursor-default';
  const hoverProps = stage !== 'idle' ? {} : { scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)", transition: { duration: 0.2 } };
  let processingText = "Processing..."; let processingColorClass = "text-gray-400"; if (id === 'voice') { processingText = "Analyzing voice note..."; processingColorClass = "text-indigo-400"; } if (id === 'camera') { processingText = "Processing image..."; processingColorClass = "text-teal-400"; } if (id === 'text') { processingText = "Analyzing text..."; processingColorClass = "text-rose-400"; }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }} // Slightly slower entry
      whileHover={hoverProps}
      className={`bg-gradient-to-br ${gradientFrom} to-gray-800/90 p-6 rounded-xl text-gray-300 flex flex-col h-full shadow-lg ${cursorStyle} overflow-hidden border border-gray-700/50`} // Added border
      onClick={startSimulation}
    >
      {/* --- Header Section --- */}
      <div className="flex items-start gap-4 mb-4">
         <div className={`${iconBgColor} p-2 rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}> <Icon className="text-white w-6 h-6" /> </div>
         <div className="flex-grow"> <h3 className={`text-xl font-semibold text-white mb-1 ${stage === 'done' ? 'cursor-pointer hover:text-gray-400 transition-colors' : ''}`} onClick={handleTitleClick} title={stage === 'done' ? 'Click to reset simulation' : ''}> {title} </h3> <p className="text-sm text-gray-400">{description}</p> </div>
                            </div>

      {/* --- Animated Content Area --- */}
      <div className="bg-black bg-opacity-40 backdrop-blur-sm border border-white/10 rounded-lg mt-4 flex-grow flex flex-col relative min-h-[240px] overflow-hidden"> {/* Increased min height */}
         {/* Traffic lights */}
         <div className="absolute top-2 left-2 flex gap-1.5 z-10"> <span className="block w-2.5 h-2.5 rounded-full bg-red-500/80"></span> <span className="block w-2.5 h-2.5 rounded-full bg-yellow-400/80"></span> <span className="block w-2.5 h-2.5 rounded-full bg-green-500/80"></span> </div>
         {/* Reset Button */}
         {stage === 'done' && ( <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); resetSimulation(); }} className="absolute top-1.5 right-1.5 z-10 p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10" title="Reset Simulation" > <ResetIcon className="w-4 h-4" /> </motion.button> )}

         <AnimatePresence mode='wait'>
            {stage === 'idle' && ( <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.2}} className="p-4 pt-8 font-mono text-xs leading-relaxed flex-grow whitespace-pre-wrap flex flex-col justify-center items-center text-center" > <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15}} className={`${iconBgColor} text-white p-3 rounded-full mb-3 shadow-lg`} > <Icon className="w-10 h-10" /> {/* Slightly smaller icon */} </motion.div> <p className="text-sm text-gray-400">Click card to start simulation</p> </motion.div> )}
            {id === 'voice' && stage === 'recording' && ( <motion.div key="recording" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center flex-grow p-4 text-center" > <MicIcon className="text-indigo-400 mb-2 w-8 h-8" /> <p className="text-sm font-semibold text-white mb-1">Recording...</p> <p className="text-xs text-gray-400 mb-2">{new Date(timer * 1000).toISOString().substr(14, 5)}</p> <Waveform /> <motion.button onClick={(e) => { e.stopPropagation(); stopRecording(); }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm transition-colors shadow-md" > <StopIcon className="w-3.5 h-3.5" /> Stop Recording </motion.button> </motion.div> )}
            {id === 'camera' && stage === 'scanning' && ( <CameraScanning key="scanning" onComplete={handleCaptureComplete} /> )}
            {id === 'text' && stage === 'typing' && ( <TextInputSimulation key="typing" textToSimulate={content} onComplete={handleCaptureComplete} /> )}
            {stage === 'processing' && ( <ProcessingIndicator key="processing" text={processingText} colorClass={processingColorClass} /> )}
            {stage === 'done' && ( <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="p-4 pt-8 text-sm leading-relaxed flex-grow overflow-y-auto" > <h4 className="text-base font-semibold text-white mb-3 border-b border-gray-700 pb-1">Processed Summary</h4> {finalContent && Object.entries(finalContent).map(([key, value]) => ( <div key={key} className="mb-1.5"> <strong className={`${ (id === 'voice' && 'text-indigo-300') || (id === 'camera' && 'text-teal-300') || (id === 'text' && 'text-rose-300') }`}>{key}:</strong> <span className="ml-2 text-gray-300">{value}</span> </div> ))} {!finalContent && <p>Processing complete.</p>} </motion.div> )}
         </AnimatePresence>
                                    </div>
    </motion.div>
  );
};

/**
 * CardInsight Component for the Card Insight tab
 * Enhanced version with profile picture, dynamic animations, and color-coding
 */
const CardInsight: React.FC = () => {
  // --- State Management ---
  const [isStarred, setIsStarred] = useState(true);
  const [activeTab, setActiveTab] = useState('action');
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showNewMemory, setShowNewMemory] = useState(false);
  const [expandedActionId, setExpandedActionId] = useState<string | null>(null);
  const [copiedTemplateKey, setCopiedTemplateKey] = useState<string | null>(null);
  const [managedActions, setManagedActions] = useState<Record<string, string>>({});

  // Refs
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideRecorderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // --- Effects ---
  useEffect(() => {
    // Cleanup timers
    return () => {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
      if (hideRecorderTimeoutRef.current) clearTimeout(hideRecorderTimeoutRef.current);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  // --- Event Handlers ---
  const handleStartRecording = () => {
    if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
    if (hideRecorderTimeoutRef.current) clearTimeout(hideRecorderTimeoutRef.current);
    setIsRecording(true); setShowVoiceRecorder(true); setRecordingTime(0); setShowNewMemory(false);
    recordingIntervalRef.current = setInterval(() => setRecordingTime((prev) => prev + 1), 1000);
    stopTimeoutRef.current = setTimeout(() => {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
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
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopiedTemplateKey(null), 2000);
    }).catch(err => console.error('Failed to copy text: ', err));
  };

  const handleManageAction = (actionId: string, status: string) => {
     setManagedActions(prev => ({ ...prev, [actionId]: status }));
     if (expandedActionId === actionId) { setExpandedActionId(null); }
     console.log(`Action ${actionId} marked as ${status}`);
  };

  // --- Animation Variants ---
  const cardVariants = { // Added subtle slide
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };
  const tabContentVariants = { hidden: { opacity: 0, x: 25 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } }, exit: { opacity: 0, x: -25, transition: { duration: 0.25, ease: "easeInOut" } } };
  const listStaggerVariants = { visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }, hidden: {} }; // Added delayChildren
  const itemVariants = { hidden: { opacity: 0, y: 15, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } } }; // Added scale
  const hoverScale = { hover: { scale: 1.03, transition: { duration: 0.2 } }, tap: { scale: 0.97 } };
  const hoverScaleSlight = { hover: { scale: 1.02, transition: { duration: 0.2 } }, tap: { scale: 0.98 } }; // Less intense scale
  const subtleHoverBg = { hover: { backgroundColor: 'rgba(255, 255, 255, 0.04)', transition: { duration: 0.2 } } };
  const expandedContentVariants = { hidden: { opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.3, ease: "easeInOut" } }, visible: { opacity: 1, height: 'auto', marginTop: '1rem', transition: { duration: 0.3, ease: "easeInOut" } } };

  // --- Data ---
  const contactInfo = {
      name: "Sarah Lin", initials: "SL",
      profilePicUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      title: "Product Lead @ InnovateTech", location: "San Francisco, CA",
      email: "sarah.lin@innovatetech.com", phone: "+1 (415) 555-8721",
      connectionDate: "Connected today", valueTag: "High Value",
      importance: "High" // Added importance level
  };

  const personalConnection = { 
    family: "Daughter at Stanford (CS), proud parent. Adjusting to 'empty nest'.", 
    interests: "Hiking (Yosemite), AI ethics, sustainable tech, specialty coffee.", 
    commStyle: "Direct, values honesty. Prefers examples. Responds well to thoughtful questions.", 
    emotionalPoints: [ 
      { point: "Frustrated feeling like 'just another account'.", icon: AlertTriangle, color: 'yellow' }, 
      { point: "Values authenticity, dislikes 'fake interest'.", icon: Heart, color: 'pink' }, 
      { point: "Proud of team growth (5 to 45 in 2 yrs).", icon: Zap, color: 'emerald' } 
    ] 
  };
  
  // Add missing data for memory and actions
  const memoryItems = [ 
    { id: 'mem1', text: "Wants to revamp their customer data platform — frustrated with current Salesforce implementation.", timestamp: "2:15 PM" }, 
    { id: 'mem2', text: "Looking for a solution prioritizing relationship context over pipeline tracking.", timestamp: "2:16 PM" }, 
    { id: 'mem3', text: "Team of 45, budget ~ $200K for relationship tools.", timestamp: "2:17 PM" }, 
    { id: 'mem4', text: "Pain point: \"We keep dropping the ball on follow-ups and losing potential customers because we forget what made the connection special.\"", timestamp: "2:18 PM" }, 
    { id: 'mem5', text: "Mentioned presenting new relationship tools to exec team next month. Decision timeline ~45 days.", timestamp: "Just now", isNew: showNewMemory } 
  ];
  
  const keyInsights = [ 
    { id: 'ki1', text: "Primary Pain: Current CRM (Salesforce) lacks relationship context, causing frustration.", icon: AlertTriangle, color: 'yellow', type: 'Pain Point' }, 
    { id: 'ki2', text: "Goal: Seeking tool focused on 'relationship context', not just pipeline.", icon: Target, color: 'blue', type: 'Goal' }, 
    { id: 'ki3', text: "Opportunity: Budget ($200K) exists for the right solution. Decision timeline ~45 days.", icon: Lightbulb, color: 'emerald', type: 'Opportunity' }, 
    { id: 'ki4', text: "Leverage Point: Values authenticity & context – highlight how Glim differs from transactional CRMs.", icon: Zap, color: 'pink', type: 'Leverage' } 
  ];
  
  const actionableMomentum = [ 
    { id: 'act1', type: "3-Day Personal Follow-up", status: "Recommended", urgency: "High", date: "Apr 17, 2025", reason: "Acknowledge conversation & address core pain point.", basedOn: ['mem1', 'mem2', 'mem4'], guidance: [ "Objective: Re-engage personally, validate her frustration, and position Glim as the contextual solution.", "Opening Hook: Reference a personal detail (e.g., daughter at Stanford) to show you listened beyond business.", "Bridge to Business: Acknowledge her pain with current CRM's lack of context (Insight KI1). Use her own words if possible ('dropping the ball').", "Glim Positioning: Briefly introduce Glim as a 'Relationship Memory Engine' designed for context, contrasting it with pipeline-focused CRMs.", "Call to Action: Suggest a brief, low-commitment meeting (20 mins) focused on *how* Glim solves her specific context problem.", "Tone: Empathetic, authentic, and solution-oriented." ], drafts: [ { platform: 'Email', subject: "Following up on our chat - Glim & relationship context", text: "Hi Sarah,\n\nReally enjoyed our conversation today. I was thinking about your frustration with current tools lacking relationship context – it's a common pain point Glim was built to solve.\n\nUnlike traditional CRMs focused on pipelines, Glim acts as your team's 'Relationship Memory Engine', ensuring the nuances that build trust aren't lost.\n\nWould you have 20 minutes next Tuesday or Wednesday to see how it works in practice?\n\nBest,\n[Your Name]" } ], primary: true }, 
    { id: 'act2', type: "Share Relevant Content", status: "Optional", urgency: "Low", date: "Apr 21, 2025", reason: "Provide value based on interest in AI ethics.", basedOn: [], guidance: [ "Objective: Build rapport and demonstrate value beyond a direct sale by sharing content aligned with her interests (AI ethics).", "Content Selection: Find a high-quality, recent article or resource specifically on AI ethics related to CRM, customer relationships, or tech.", "Messaging: Keep it brief and low-pressure. Frame it as 'thought you might find this interesting' based on her passion.", "Platform: LinkedIn message or a very short email is suitable.", "Key Point: Explicitly state 'No need to reply' to reinforce the value-add nature." ], drafts: [ { platform: 'LinkedIn', text: "Sarah, saw this piece on AI ethics in CRM and thought it might resonate with your interests you mentioned. Sharing in case it's useful: [Link]" } ], primary: false }, 
    { id: 'act3', type: "Check-in Before Presentation", status: "Suggested", urgency: "Medium", date: "May 5, 2025", reason: "Offer support or insights before her exec presentation.", basedOn: ['mem5'], guidance: [ "Objective: Provide timely support and reinforce Glim's value proposition before a key internal event.", "Timing: Reach out roughly a week before her presentation.", "Messaging: Offer brief, specific help related to presenting relationship tools (e.g., 'Happy to share stats on context impact' or 'Wishing you luck!'). Keep it short and supportive.", "Avoid: Don't make it a sales pitch; focus on being helpful.", "Platform: Email or LinkedIn message appropriate." ], drafts: [ { platform: 'Email', subject: "Thinking of your upcoming presentation", text: "Hi Sarah,\n\nRecalled you mentioning your presentation on relationship tools next month. Wishing you the best with it!\n\nIf any last-minute thoughts on framing the importance of relationship context would be helpful, feel free to ping me. Otherwise, just wanted to send good vibes!\n\nBest,\n[Your Name]" } ], primary: false } 
  ];

  // Filter out dismissed actions for rendering
  const visibleActions = actionableMomentum.filter(action => managedActions[action.id] !== 'dismissed');

  // Get importance styles based on contact data
  const importanceStyles = getImportanceStyles(contactInfo.importance);

  // --- Render ---
  return (
    <motion.div
      className="flex flex-col w-full h-full rounded-2xl overflow-hidden bg-gray-900 text-gray-100 shadow-2xl border border-gray-700/40 font-sans"
      variants={cardVariants} initial="hidden" animate="visible" layout
    >
      {/* Status Bar */}
      <div className="bg-gray-950 px-4 py-2 flex justify-between items-center border-b border-gray-700/40">
        <div className="flex items-center gap-2">
          <motion.div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-xs font-medium text-emerald-400">AI Memory Engine Active</span>
        </div>
      </div>

      {/* Header - Applying Importance Styles */}
      <div className={`bg-gradient-to-br from-gray-800 ${importanceStyles.headerGradientVia} to-gray-900 px-6 py-5 flex justify-between items-center`}>
        <div className="flex items-center gap-4">
          {/* Profile Picture */}
          <motion.div className="relative group" variants={hoverScale} whileHover="hover" whileTap="tap">
             <img
                src={contactInfo.profilePicUrl}
                alt={`${contactInfo.name} profile picture`}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
                  const target = e.target as HTMLImageElement; 
                  target.onerror = null; 
                  target.src='https://placehold.co/64x64/1F2937/E5E7EB?text=Error'; 
                }}
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
            {contactInfo.valueTag} ({contactInfo.importance})
          </motion.div>
        </div>
      </div>

      {/* Essential Contact Details Grid */}
      <div className="bg-gray-800/50 px-4 py-3 grid grid-cols-1 gap-3 border-b border-gray-700/40 sm:grid-cols-2">
        {[ 
          { icon: Mail, label: "Email", value: contactInfo.email }, 
          { icon: Phone, label: "Phone", value: contactInfo.phone }, 
          { icon: Briefcase, label: "Position", value: contactInfo.title }, 
          { icon: MapPin, label: "Location", value: contactInfo.location } 
        ].map((item, index) => (
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
        {[ 
          { id: 'memory', label: 'Relationship Memory', icon: BrainCircuit, color: 'emerald' },
          { id: 'action', label: 'Actionable Momentum', icon: Zap, color: 'blue' },
          { id: 'connection', label: 'Personal Context', icon: Heart, color: 'pink' }
        ].map((tab) => (
          <button 
            key={tab.id} 
            className={`relative flex-1 py-4 font-medium text-sm flex items-center justify-center gap-2 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 ${activeTab === tab.id ? 'text-white bg-gray-800/50' : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800/30'}`} 
            onClick={() => setActiveTab(tab.id)} 
            aria-selected={activeTab === tab.id} 
            role="tab"
          >
            <motion.span whileHover={{ scale: 1.1 }}>
              <tab.icon size={16} className={activeTab === tab.id ? `text-${tab.color}-400` : 'text-gray-500 group-hover:text-gray-400'} />
            </motion.span>
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                className={`absolute bottom-0 left-0 right-0 h-1 bg-${tab.color}-400 rounded-t-sm`} 
                layoutId="tab-underline" 
                transition={{ type: "spring", stiffness: 350, damping: 35 }} 
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-850/20 relative bg-gray-900/70">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="p-6">

            {/* Actionable Momentum Tab */}
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
                  <motion.div variants={listStaggerVariants} className="space-y-4">
                    {visibleActions.map((action) => {
                      const isExpanded = expandedActionId === action.id;
                      const urgencyStyles = getUrgencyStyles(action.urgency);
                      const isManaged = managedActions[action.id];
                      if (isManaged === 'dismissed') return null;
                      return (
                        <motion.div key={action.id} variants={itemVariants} layout className={`rounded-lg border transition-all duration-300 overflow-hidden relative ${isManaged === 'snoozed' ? 'opacity-50' : ''} ${isExpanded ? `${urgencyStyles.bgColor} ${urgencyStyles.borderColor} shadow-lg` : `${action.primary ? urgencyStyles.bgColor.replace('30', '20') : 'bg-gray-800/40'} ${urgencyStyles.borderColor.replace('70', '40')} ${urgencyStyles.hoverBorderColor}`}`} whileHover={!isManaged && !isExpanded ? { y: -2, scale: 1.01 } : {}}>
                           {isManaged === 'snoozed' && (<div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center z-10 rounded-lg"><span className="text-gray-400 text-sm font-medium flex items-center gap-1"><BellOff size={14}/> Snoozed</span></div>)}
                          <motion.button onClick={() => !isManaged && handleToggleAction(action.id)} className={`flex justify-between items-center w-full p-4 text-left transition-colors duration-300 ${isExpanded ? '' : 'hover:bg-gray-700/20'} ${isManaged ? 'cursor-not-allowed' : 'cursor-pointer'}`} aria-expanded={isExpanded} whileTap={!isManaged ? { scale: 0.98 } : {}} disabled={!!isManaged}>
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg ${urgencyStyles.iconBg} ${urgencyStyles.iconBorder} flex items-center justify-center shrink-0 border shadow-inner`}><Zap size={16} className={urgencyStyles.iconColor} /></div>
                              <div>
                                <span className="text-base font-semibold text-white">{action.type}</span>
                                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1.5"><Clock size={12} /> Suggested: {action.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                               {action.status && (<div className={`text-xs hidden sm:block px-2.5 py-1 ${urgencyStyles.statusBg} ${urgencyStyles.statusText} ${urgencyStyles.statusBorder} rounded-full border whitespace-nowrap`}>{action.status} ({action.urgency})</div>)}
                              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown size={20} className={`transition-colors ${isExpanded ? urgencyStyles.iconColor : 'text-gray-500'}`} /></motion.div>
                            </div>
                          </motion.button>
                          <AnimatePresence initial={false}>
                            {isExpanded && !isManaged && (
                              <motion.div key="content" variants={expandedContentVariants} initial="hidden" animate="visible" exit="hidden" className="px-4 pb-4 overflow-hidden">
                                 <hr className={`mb-4 ${urgencyStyles.borderColor.replace('70', '60')}`} />
                                 <div className="mb-5"><h4 className="text-sm font-semibold text-gray-200 mb-2">Personalized Strategy:</h4><ul className="space-y-1.5 list-disc list-inside pl-1">{action.guidance.map((point, index) => (<li key={index} className="text-sm text-gray-300 leading-relaxed">{point}</li>))}</ul></div>
                                 {action.drafts && action.drafts.length > 0 && (
                                   <div className="mb-5">
                                     <h4 className="text-sm font-semibold text-gray-200 mb-2">Suggested Template:</h4>
                                     {action.drafts.map((draft, index) => {
                                       if (index > 0) return null; // Only show the first draft for brevity
                                       const templateKey = `${action.id}-draft-${index}`;
                                       return (
                                         <div key={templateKey} className="bg-gray-700/30 p-3.5 rounded-md border border-gray-600/50 relative group">
                                           <div className="flex justify-between items-center mb-2.5">
                                             {/* Fix: Use 'in' operator for type-safe subject access */}
                                             <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{draft.platform} {'subject' in draft && draft.subject ? `- ${draft.subject}`: ''}</span>
                                             <motion.button
                                               onClick={() => handleCopyTemplate(draft.text, templateKey)}
                                               className={`text-xs px-2 py-1 rounded-md flex items-center gap-1 transition-all duration-200 absolute top-2 right-2 ${copiedTemplateKey === templateKey ? 'bg-emerald-500 text-white shadow-md' : 'bg-gray-600/70 hover:bg-emerald-700 text-gray-300 hover:text-white opacity-0 group-hover:opacity-100'}`}
                                               whileTap={{ scale: 0.95 }}
                                               initial={{ opacity: 0 }}
                                               animate={{ opacity: copiedTemplateKey === templateKey ? 1 : 0 }}
                                               whileHover={{ opacity: 1 }}
                                             >
                                               {copiedTemplateKey === templateKey ? <><Check size={14}/> Copied!</> : <><Copy size={14}/> Copy</>}
                                             </motion.button>
                                           </div>
                                           <pre className="text-sm text-gray-200 whitespace-pre-wrap break-words font-mono bg-gray-800/50 p-3 rounded scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700/50 max-h-48 overflow-y-auto">{draft.text}</pre>
                                         </div>
                                       );
                                     })}
                                   </div>
                                 )}
                                 <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700/60"><div className="flex gap-2"><motion.button onClick={() => handleManageAction(action.id, 'snoozed')} className="text-xs text-gray-400 hover:text-yellow-400 flex items-center gap-1 p-1 rounded hover:bg-gray-700/50 transition-colors" title="Snooze this action" whileTap={{ scale: 0.9 }}><BellOff size={14} /> Snooze</motion.button><motion.button onClick={() => handleManageAction(action.id, 'dismissed')} className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1 p-1 rounded hover:bg-gray-700/50 transition-colors" title="Dismiss this action" whileTap={{ scale: 0.9 }}><Archive size={14} /> Dismiss</motion.button></div><motion.button className={`px-4 py-1.5 text-sm ${action.primary ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'} font-semibold rounded-full transition-colors duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white`} variants={hoverScale} whileHover="hover" whileTap="tap">{action.primary ? 'Schedule Action' : 'Mark as Reviewed'}</motion.button></div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                    <motion.div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-blue-600/50 hover:bg-gray-800/30 transition-all duration-300 group cursor-pointer mt-6" variants={hoverScale} whileHover="hover" whileTap="tap"><button className="flex items-center justify-center gap-2 w-full text-gray-500 group-hover:text-blue-400 transition-colors duration-300"><Plus size={16} /> <span className="text-sm font-medium">Create Custom Action</span></button></motion.div>
                  </motion.div>
                </section>
              </motion.div>
            )}

            {/* Relationship Memory Tab */}
            {activeTab === 'memory' && (
              <motion.div variants={listStaggerVariants} initial="hidden" animate="visible" className="space-y-8">
                 <motion.section variants={itemVariants}>
                   <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2.5">
                     <Lightbulb size={20} /> Key Insights & Opportunities
                   </h3>
                   <motion.div variants={listStaggerVariants} className="space-y-3">
                     {keyInsights.map((insight) => (
                       <motion.div key={insight.id} className="flex items-start gap-3 group bg-gradient-to-r from-gray-800/50 to-gray-800/30 p-3.5 rounded-lg border border-gray-700/60 hover:border-gray-600/80 transition-all duration-300 hover:shadow-md" variants={itemVariants} whileHover={{ y: -2 }}>
                         <InsightIcon type={insight.type} color={insight.color} />
                         <div className="flex-1 pt-0.5">
                           <span className={`text-xs font-semibold tracking-wide text-${insight.color}-400 uppercase`}>{insight.type}</span>
                           <p className="text-gray-100 text-sm leading-relaxed mt-1">{insight.text}</p>
                         </div>
                       </motion.div>
                     ))}
                   </motion.div>
                 </motion.section>
                 <hr className="border-gray-700/60 my-8" />
                 <motion.section variants={itemVariants}>
                   <div className="flex items-center justify-between mb-4">
                     <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2.5">
                       <BrainCircuit size={20} className="text-emerald-400" /> Captured Memory Stream
                     </h3>
                     <motion.button className="text-xs text-gray-400 hover:text-emerald-400 flex items-center gap-1" whileTap={{ scale: 0.95 }}>
                       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg> Filter
                     </motion.button>
                   </div>
                   <motion.div variants={listStaggerVariants} className="space-y-3">
                     {memoryItems.map((memory) => (
                       <motion.div key={memory.id} className={`flex items-start gap-3 group p-3.5 rounded-lg transition-all duration-300 border ${memory.isNew ? 'bg-emerald-800/40 border-emerald-600/60 ring-1 ring-emerald-500/50 shadow-lg' : 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-700/40 hover:border-gray-600/70'}`} variants={itemVariants} initial={memory.isNew ? { scale: 0.9, opacity: 0 } : false} animate={memory.isNew ? { scale: 1, opacity: 1, transition: { delay: 0.5, duration: 0.4 } } : {}} whileHover={{ y: -2 }}>
                         <motion.div className={`w-7 h-7 rounded-full ${memory.isNew ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-600'} flex items-center justify-center mt-0.5 shadow-md flex-shrink-0 group-hover:bg-emerald-500 transition-colors duration-300`} whileHover={{ rotate: memory.isNew ? 0 : 360, scale: 1.1 }}>
                           <div className="w-2.5 h-2.5 bg-white rounded-full shadow-inner"></div>
                         </motion.div>
                         <div className="flex-1">
                           <p className={`text-sm leading-relaxed ${memory.isNew ? 'text-emerald-100 font-medium' : 'text-gray-200 group-hover:text-white'} transition-colors duration-300`}>{memory.text}</p>
                           <span className={`text-xs ${memory.isNew ? 'text-emerald-300' : 'text-gray-500'} mt-1.5 block`}>{memory.timestamp}</span>
                         </div>
                       </motion.div>
                     ))}
                   </motion.div>
                 </motion.section>
                 <motion.section className="mt-8 sticky bottom-0 pb-2 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent z-10" variants={itemVariants}>
                   <AnimatePresence mode="wait">
                     {showVoiceRecorder ? (
                       <motion.div key="recorder" className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-700/70 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
                         <div className="flex justify-between items-center mb-3">
                           <h4 className="text-sm font-medium text-white">Capturing Voice Memory...</h4>
                           {!isRecording && <motion.button onClick={() => setShowVoiceRecorder(false)} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700" whileTap={{ scale: 0.9 }}><X size={16} /></motion.button>}
                         </div>
                         <div className="flex items-center justify-center py-3 min-h-[80px]">
                           {isRecording ? (
                             <motion.div className="flex flex-col items-center" key="recording">
                               <motion.div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-2 shadow-lg ring-2 ring-red-500/50" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}><Mic size={24} className="text-white" /></motion.div>
                               <span className="text-red-400 text-sm font-mono">{recordingTime}s</span>
                             </motion.div>
                           ) : (
                             <motion.div className="text-center w-full" key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                               <p className="text-sm text-gray-300 mb-2">Processing & Adding to Memory...</p>
                               <div className="w-full bg-gray-700 h-1.5 rounded-full"><motion.div className="bg-emerald-500 h-full" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 0.8, ease: "linear", delay: 0.3 }} /></div>
                             </motion.div>
                           )}
                         </div>
                       </motion.div>
                     ) : (
                       <motion.div key="input" className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10"><Mic size={18} className="text-emerald-400" /></div>
                         <input type="text" placeholder="Speak or type to capture memory..." className="w-full bg-gray-800/80 backdrop-blur-sm border border-gray-700/70 rounded-lg pl-12 pr-28 py-4 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/80 placeholder-gray-500 text-gray-100 transition-all duration-300 hover:border-gray-600/90 focus:bg-gray-800 shadow-inner"/>
                         <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-2">
                           <motion.button onClick={handleStartRecording} className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700/70 hover:bg-emerald-600 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" aria-label="Start voice recording" variants={hoverScale} whileHover="hover" whileTap="tap"><Mic size={18} className="text-gray-300 group-hover:text-white transition-colors duration-300" /></motion.button>
                           <motion.button className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" aria-label="Add text memory" variants={hoverScale} whileHover="hover" whileTap="tap"><Send size={18} className="text-white" /></motion.button>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </motion.section>
              </motion.div>
            )}

            {/* Personal Context Tab */}
            {activeTab === 'connection' && (
              <motion.div variants={listStaggerVariants} initial="hidden" animate="visible" className="space-y-8">
                <motion.section variants={itemVariants}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-pink-400 flex items-center gap-2.5">
                      <User size={20} /> Personal Context
                    </h3>
                    <motion.button className="text-xs text-emerald-400 flex items-center gap-1 bg-gray-800 hover:bg-gray-700 transition-colors duration-300 px-3 py-1.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" variants={hoverScale} whileHover="hover" whileTap="tap">
                      <Edit size={12} /> Edit Context
                    </motion.button>
                  </div>
                  <motion.div variants={listStaggerVariants} className="space-y-4">
                    {[ { icon: User, title: "Family & Personal", content: personalConnection.family }, { icon: Coffee, title: "Interests & Passions", content: personalConnection.interests }, { icon: MessageSquare, title: "Communication Style", content: personalConnection.commStyle } ].map((card, index) => (
                      <motion.div key={index} className="bg-gray-800/40 p-4 rounded-lg border border-gray-700/60" variants={itemVariants} whileHover={{ y: -2 }}>
                        <h4 className="text-sm font-semibold text-pink-300 mb-2 flex items-center gap-2.5">
                          <card.icon size={16} /> {card.title}
                        </h4>
                        <p className="text-gray-200 text-sm leading-relaxed">{card.content}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.section>
                <motion.section variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2.5">
                    <Heart size={20} className="text-pink-400"/> Emotional Connection Points
                  </h3>
                  <motion.div variants={listStaggerVariants} className="space-y-3">
                    {personalConnection.emotionalPoints.map((point, index) => (
                      <motion.div key={index} className="flex items-start gap-3 group bg-gray-800/40 p-3.5 rounded-lg border border-gray-700/60" variants={itemVariants} whileHover={{ y: -2 }}>
                        <div className={`mt-1 w-6 h-6 rounded-lg bg-${point.color}-500/10 flex items-center justify-center flex-shrink-0 border border-${point.color}-500/30 shadow-inner`}>
                          <point.icon size={14} className={`text-${point.color}-400`} />
                        </div>
                        <p className="text-gray-200 text-sm leading-relaxed flex-1 pt-0.5">{point.point}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.section>
              </motion.div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-auto p-4 bg-gradient-to-t from-gray-900 to-gray-850 border-t border-gray-700/50 flex flex-wrap justify-between items-center gap-3">
        <div className="flex gap-2 flex-wrap">
           <div className="flex items-center gap-1.5 text-xs bg-pink-500/10 text-pink-300 px-3 py-1.5 rounded-full border border-pink-500/30 shadow-sm backdrop-blur-sm"> 
             <Heart size={14} fill="currentColor" /> <span>Strong Connection</span> 
           </div>
          <motion.button className="flex items-center gap-1.5 text-xs bg-gray-700/50 text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-600/70 hover:text-gray-100 transition-colors duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 backdrop-blur-sm" variants={hoverScale} whileHover="hover" whileTap="tap"> 
            <Clock3 size={14} /> <span>Remind</span> <ChevronRight size={14} className="-mr-1" /> 
          </motion.button>
        </div>
        <div>
          <motion.button className="px-6 py-2.5 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-semibold text-sm rounded-lg hover:from-emerald-500 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-emerald-400 flex items-center gap-2" variants={hoverScale} whileHover="hover" whileTap="tap"> 
            {activeTab === 'action' ? <><Check size={16}/> Review Actions</> : <><Send size={16}/> Save Changes</>} 
          </motion.button>
        </div>
      </div>

      {/* Scrollbar styles */}
      <style jsx global>{`
        .scrollbar-thin { scrollbar-width: thin; scrollbar-color: #4B5563 rgba(31, 41, 55, 0.2); }
        .scrollbar-thin::-webkit-scrollbar { width: 8px; height: 8px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: rgba(31, 41, 55, 0.2); border-radius: 10px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background-color: #4B5563; border-radius: 10px; border: 2px solid rgba(31, 41, 55, 0.2); }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { background-color: rgba(107, 114, 128, 0.9); }
        pre { white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; word-wrap: break-word; }
      `}</style>
    </motion.div>
  );
};

const GlimFeatures = () => {
    const [selectedTab, setSelectedTab] = useState(tabs[0].id);
    const currentTabData = tabs.find(tab => tab.id === selectedTab);

    // Animation variants for grid items
    const gridItemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }
    };

    return (
        <div id="how-it-works" className="flex justify-center items-start min-h-screen p-4 md:p-10 font-sans">
            <div className="w-full max-w-6xl"> {/* Increased max-width */} 
                {/* Section Header */}
                <header className="text-center mb-16">
                    <div className="inline-flex items-center bg-green-800/30 py-1 px-3 rounded-full mb-4 shadow-md backdrop-blur-sm border border-green-500/20">
                        <span className="text-sm font-medium text-green-300 flex items-center">
                            <BrainCircuit className="w-4 h-4 mr-1.5" />
                            AI Memory Engine
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                        How Glim Works
                    </h2>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        Glim transforms how you remember relationship details, turning scattered information into actionable intelligence.
                    </p>
                </header>

                {/* Tab Navigation - Updated to reflect 3 tabs */}
                <nav className="flex flex-wrap justify-center mb-12 gap-2">
                    {tabs.map((tab) => {
                        const isActive = selectedTab === tab.id;
                        const TabIcon = tab.icon;
                        
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                                    isActive
                                        ? 'bg-gradient-to-br from-emerald-800 to-emerald-500 text-white shadow-lg'
                                        : 'bg-black/20 backdrop-blur-sm text-gray-300 hover:bg-black/30 border border-white/10'
                                }`}
                                data-cursor-text={tab.label}
                            >
                                <TabIcon className={`w-5 h-5 mr-2 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Tab Content Area with Animation */}
                <main>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedTab}
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -15, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="text-gray-200"
                        >
                            {currentTabData && (
                                <div>
                                    {/* Conditionally render Title and Description - Hide for 'contacts' tab */} 
                                    {selectedTab !== 'contacts' && (
                                      <>
                                        <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-white text-center">{currentTabData.content.title}</h3>
                                        <p className="text-base text-gray-400 mb-8 text-center max-w-xl mx-auto">{currentTabData.content.description}</p>
                                      </>
                                    )}

                                    {/* Overview Tab Content (Interactive Cards) */}
                                    {selectedTab === 'overview' && currentTabData.content.cards && (
                                        <motion.div
                                          className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                          {interactiveCardData.map((card) => (
                                            <motion.div key={card.id} variants={gridItemVariants}>
                                              <InteractiveCard {...card} />
                                            </motion.div>
                                          ))}
                                        </motion.div>
                                    )}

                                    {/* Smart Contact Cards Grid */}
                                    {selectedTab === 'contacts' && (
                                      <div className="w-full" id="smart-contacts-section">
                                        <div className="mb-8 text-center">
                                          <div className="inline-block bg-gradient-to-r from-blue-900/50 to-indigo-900/50 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg border border-blue-500/30 mb-4">
                                            <span className="text-blue-400 text-sm font-medium">AI-Powered Contact Insight</span>
                                          </div>
                                          {/* This h3 element will be removed */}
                                          {/* <h3 className="text-xl font-medium text-gray-300 max-w-2xl mx-auto">
                                            Glim automatically enriches contacts, providing context and history at a glance.
                                          </h3> */}
                                        </div>
                                        
                                        <motion.div
                                          className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 md:gap-8"
                                          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                          {smartCardContactsData.map((contact: ContactData, index) => (
                                            <motion.div 
                                              key={contact.id} 
                                              variants={gridItemVariants}
                                              className={`card-wrapper min-h-[500px] relative cursor-pointer flex flex-col bg-gradient-to-b from-gray-800/50 to-gray-900/70 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden border border-gray-700/50 p-1 transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/10 ${ 
                                                index === 0 ? 'first-card' : 
                                                index === 1 ? 'second-card' : 
                                                'third-card'
                                              }`}
                                              whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                              data-cursor-text={`View ${contact.name}'s Details`}
                                            >
                                              <GlimContactCard data={contact} />
                                            </motion.div>
                                          ))}
                                        </motion.div>
                                        
                                        <div className="mt-10 flex justify-center">
                                          <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 max-w-xl text-center">
                                            <p className="text-gray-400 text-sm">
                                              <span className="text-blue-400">✦</span> Each card displays essential contact info, recent interactions, and upcoming follow-ups.
                                            </p>
                                          </div>
                                        </div>
                                </div>
                            )}

                                    {/* Relationship Hub Tab (previously Card Insight / Actionable Momentum) */}
                                    {selectedTab === 'momentum' && (
                                      <div className="flex justify-center">
                                        <div className="w-full max-w-xl lg:max-w-2xl"> {/* Increased max-width */}
                                          {/* Card Insight Component is rendered here */}
                                          <div className="phone-frame relative h-[600px] overflow-auto custom-scrollbar bg-gray-950 rounded-xl border border-gray-800 shadow-xl">
                                            <CardInsight />
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
            
            {/* Updated Styles */}
            <style jsx global>{`
              .perspective-1000 {
                perspective: 1000px;
                transform-style: preserve-3d;
                backface-visibility: hidden;
              }
              
              /* Custom cursor effects for the How Glim Works section */
              #how-it-works {
                --cursor-bg-color: rgba(16, 185, 129, 0.2);
                --cursor-border-color: rgba(16, 185, 129, 0.5);
              }
              
              #how-it-works button:hover,
              #how-it-works .cursor-pointer:hover {
                --cursor-bg-color: rgba(16, 185, 129, 0.3);
                --cursor-border-color: rgba(16, 185, 129, 0.7);
                --cursor-scale: 1.5;
              }

              #how-it-works .card-wrapper:hover {
                --cursor-bg-color: rgba(52, 211, 153, 0.25);
                --cursor-border-color: rgba(52, 211, 153, 0.7);
                --cursor-scale: 1.6;
              }
              
              /* Target the motion.div wrapper for contact cards */
              #smart-contacts-section .card-wrapper {
                 /* Base styles are now inline */
                 /* Hover styles applied inline using hover: prefix */
              }
              
              /* Gradient text effect (if used in GlimContactCard) */
              .text-gradient {
                background: linear-gradient(90deg, #fff, #a8b1ff);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              }
              
              /* Blurred glow effect for status badges (if used in GlimContactCard) */
              .badge-glow {
                position: relative;
              }
              
              .badge-glow::before {
                content: '';
                position: absolute;
                inset: -3px;
                background: inherit;
                border-radius: inherit;
                filter: blur(8px);
                opacity: 0.7;
                z-index: -1;
              }

              /* Mobile optimizations */
              @media (max-width: 640px) {
                #smart-contacts-section .grid {
                  grid-template-columns: 1fr; /* Stack cards on mobile */
                }
                #smart-contacts-section .min-h-\[500px\] {
                  min-height: auto; /* Adjust min height on mobile */
                }
              }
              
              /* Add subtle animations to make the cards feel alive */
              /* Target the motion.div wrappers directly */
              #smart-contacts-section .first-card {
                animation: subtleFloat 7s ease-in-out infinite;
                animation-delay: 0s;
              }
              
              #smart-contacts-section .second-card {
                animation: subtleFloat 7s ease-in-out infinite;
                animation-delay: 2s;
              }
              
              #smart-contacts-section .third-card {
                animation: subtleFloat 7s ease-in-out infinite;
                animation-delay: 4s;
              }
              
              /* Card Insight scrollbar styles */
              .custom-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: rgba(75, 85, 99, 0.7) rgba(31, 41, 55, 0.2);
              }
              
              .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
                height: 8px;
              }
              
              .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(31, 41, 55, 0.2);
                border-radius: 10px;
              }
              
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: rgba(75, 85, 99, 0.7);
                border-radius: 10px;
                border: 2px solid rgba(31, 41, 55, 0.2);
              }
              
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: rgba(107, 114, 128, 0.9);
              }
              
              @keyframes subtleFloat {
                0%, 100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-5px);
                }
              }
            `}</style>
        </div>
    );
};

export default GlimFeatures;