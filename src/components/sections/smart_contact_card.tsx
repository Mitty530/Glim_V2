import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Calendar, Link, Building, Users, Edit, Mail, Phone, Zap, AlertTriangle, CheckCircle, Mic, X, Send, Settings, ChevronDown, ChevronUp, Plus, Activity, Briefcase, MapPin, Coffee, Eye as EyeIcon, Pencil as PencilIcon, MessageCircle, Bell } from 'lucide-react';
import { CalendarIcon, MoveRight, PenLine, PhoneIcon, UserCircle2 } from "lucide-react";
import { cn } from '@/lib/utils';

// Define our own Variants type
type Variants = {
  [key: string]: {
    [key: string]: any;
    transition?: {
      [key: string]: any;
    };
  };
};

// Mock icon components
const BiChat = MessageCircle;
const HiOutlineHeart = Heart;
const PiCallBell = Bell;

// Mock UI components
const AvatarFallback = (props: any) => <div className={props.className}>{props.children}</div>;
const AvatarImage = (props: any) => <img src={props.src} alt={props.alt} className={`object-cover ${props.className || ''}`} />;
const Avatar = (props: any) => (
  <div className={`relative rounded-full overflow-hidden ${props.className || ''}`}>
    {props.children}
  </div>
);
const Badge = (props: any) => (
  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${props.variant === 'outline' ? 'border' : 'bg-primary/10 text-primary'} ${props.className || ''}`}>
    {props.children}
  </span>
);
const Button = (props: any) => (
  <button 
    type={props.type || 'button'} 
    onClick={props.onClick} 
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
      props.variant === 'ghost' 
        ? 'hover:bg-accent hover:text-accent-foreground' 
        : props.variant === 'outline'
          ? 'border border-input hover:bg-accent hover:text-accent-foreground'
          : 'bg-primary text-primary-foreground hover:bg-primary/90'
    } ${props.size === 'sm' ? 'h-8 px-3' : 'h-10 px-4 py-2'} ${props.className || ''}`}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);
const Card = (props: any) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${props.className || ''}`}>
    {props.children}
  </div>
);
const CardHeader = (props: any) => (
  <div className="flex flex-col space-y-1.5 p-6">
    {props.children}
  </div>
);
const CardContent = (props: any) => (
  <div className="p-6 pt-0">
    {props.children}
  </div>
);
const CardFooter = (props: any) => (
  <div className="flex items-center p-6 pt-0">
    {props.children}
  </div>
);
const Tooltip = (props: any) => (
  <div className="relative inline-block">
    <div className="group">
      {props.children[0]}
      <div className="invisible group-hover:visible absolute z-50 p-2 rounded shadow-md bg-background border text-sm min-w-[8rem] bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2">
        {props.children[1]}
      </div>
    </div>
  </div>
);

// Define the color mapping outside the component
const colorClasses: { [key: string]: { text: string; bg: string } } = {
  pink: { text: 'text-pink-400', bg: 'bg-pink-400' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-400' },
  blue: { text: 'text-blue-400', bg: 'bg-blue-400' },
};

// Add CSS for custom cursor interactions
const customCursorClasses = `
  .glim-card {
    --cursor-bg-color: rgba(52, 211, 153, 0.15);
    --cursor-border-color: rgba(52, 211, 153, 0.4);
    transition: all 0.3s ease;
    z-index: 10;
    position: relative;
  }
  
  .glim-card:hover {
    --cursor-bg-color: rgba(52, 211, 153, 0.2);
    --cursor-border-color: rgba(52, 211, 153, 0.6);
  }
  
  .cursor-highlight {
    position: relative;
  }
  
  .cursor-highlight::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      to right,
      rgba(52, 211, 153, 0.5),
      rgba(52, 211, 153, 0.2)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .cursor-highlight:hover::before {
    opacity: 1;
  }
  
  .gradient-bg {
    background-image: radial-gradient(
      circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      var(--cursor-bg-color) 0%,
      transparent 60%
    );
    background-position: center;
    background-size: 200% 200%;
    transition: background-position 0.1s ease;
  }
  
  .pulse-memory {
    position: relative;
  }
  
  .pulse-memory::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7);
    animation: pulseIn 1.5s ease-out infinite;
    opacity: 0;
    top: 0;
    left: 0;
    z-index: -1;
  }
  
  @keyframes pulseIn {
    0% {
      box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7);
      opacity: 0.3;
    }
    70% {
      box-shadow: 0 0 0 10px rgba(52, 211, 153, 0);
      opacity: 0;
    }
    100% {
      box-shadow: 0 0 0 0 rgba(52, 211, 153, 0);
      opacity: 0;
    }
  }
`;

// Type definitions (ensure these match your actual data structure)
interface PersonalDetail {
    icon: React.ElementType; // Allow Lucide icons or other component types
    title: string;
    content: string;
}

interface FollowUpItem {
    task: string;
    dueDate: string;
    status: 'pending' | 'completed' | 'overdue';
}

export interface ContactData {
    id: string | number;
    name: string;
    title: string;
    company: string;
    avatarUrl: string;
    email: string;
    phone: string;
    linkedinUrl?: string;
    relationshipStrength: number; // Percentage value (0-100)
    lastInteraction: string; // e.g., "Yesterday", "2 days ago"
    personalDetails: PersonalDetail[];
    emotionalPoints: string[];
    memoryItems: string[]; // Array of strings representing memories
    followUpItems: FollowUpItem[];
    aiSuggestions: string[];
    tags?: string[]; // Optional tags
    initials?: string; // Added for fallback avatars
    status?: string; // Added for status badges
    lastContact?: string; // Added for last contact info
}

interface GlimContactCardProps {
  data: ContactData;
  viewMode?: 'compact' | 'full'; // Control initial view
}

// Animation variants
const cardVariants: Variants = {
  compact: {
    height: "100%",
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  full: {
    height: "auto",
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const GlimContactCard: React.FC<GlimContactCardProps> = ({ data, viewMode: initialViewMode = 'full' }) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'memory' | 'follow'>('personal');
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(initialViewMode === 'full');
    const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [showNewMemory, setShowNewMemory] = useState(false);
  const [currentViewMode, setCurrentViewMode] = useState<'compact' | 'full'>(initialViewMode);

  // Add these for cursor position tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position for custom cursor effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

    useEffect(() => {
    setIsExpanded(initialViewMode === 'full');
    setCurrentViewMode(initialViewMode);
  }, [initialViewMode]);

    useEffect(() => {
    if (data && typeof data.relationshipStrength === 'number') {
        const timer = setTimeout(() => setProgress(data.relationshipStrength), 500);
        return () => clearTimeout(timer);
    }
  }, [data?.relationshipStrength]);

    const handleStartRecording = () => {
    setShowVoiceRecorder(true);
        setIsRecording(true);
        setRecordingTime(0);
    if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
    }
        recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
        }, 1000);

    setTimeout(() => {
        if (recordingIntervalRef.current) {
            clearInterval(recordingIntervalRef.current);
            recordingIntervalRef.current = null;
        }
            setIsRecording(false);

        setTimeout(() => {
                setShowVoiceRecorder(false);
            setShowNewMemory(true);

            setTimeout(() => setShowNewMemory(false), 5000);
            }, 1500);

        }, 5000);
    };

  // New design for compact cards based on the second image
  const renderCompactView = () => (
    <Card
      className={cn(
        "glim-card gradient-bg border-gray-800/70 shadow-xl overflow-hidden bg-gray-800/95 backdrop-blur-xl relative cursor-pointer",
        isExpanded ? "h-auto" : "h-full"
      )}
      data-cursor-text="View Contact"
      ref={cardRef}
      onMouseMove={handleMouseMove}
    >
      {currentViewMode === 'compact' && (
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-gray-600/20 to-transparent"></div>
      )}
      
      <div className="p-4">
        {/* Header with Avatar + Name */}
        <div className="flex items-start gap-4 mb-5">
          <div className="relative flex-shrink-0">
            {data.avatarUrl ? (
              <Avatar className="w-16 h-16 border border-gray-800">
                <AvatarImage src={data.avatarUrl} alt={data.name} className="object-cover" />
              </Avatar>
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-gray-800">
                <span className="text-xl font-semibold text-white">{data.name?.split(' ').slice(0, 2).map(n => n[0]).join('')}</span>
                            </div>
                        )}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center p-0.5">
              <div className="w-full h-full rounded-full bg-green-500"></div>
                        </div>
                    </div>
          
          <div className="flex-grow min-w-0 overflow-visible">
            <div className="flex items-start justify-between gap-2 w-full">
              <div className="min-w-0 max-w-full flex-shrink">
                <h3 className="text-xl font-bold text-white leading-tight truncate max-w-[100px]">
                  {data.name.split(' ')[0]}...
                </h3>
                <p className="text-gray-300 text-sm font-medium truncate max-w-[140px]">
                  {data.title} at{' '}
                  <span className="text-blue-300 truncate">{data.company.split(' ')[0]}...</span>
                </p>
            </div>

              <div className="flex-shrink-0 ml-auto"> 
                <Badge 
                  className={cn(
                    "text-xs px-3 py-1 rounded-full whitespace-nowrap",
                    data.relationshipStrength > 75 ? "bg-green-800/50 text-green-300" : 
                    data.relationshipStrength > 60 ? "bg-indigo-800/50 text-indigo-300" :
                    "bg-amber-800/50 text-amber-300"
                  )}
                >
                  {data.relationshipStrength > 75 ? "High Value" : 
                  data.relationshipStrength > 60 ? "Potential Partner" : 
                  "Active"}
                </Badge>
                        </div>
            </div>

            <div className="flex items-center mt-2 space-x-2">
                    <button
                className="text-amber-400 cursor-highlight"
                onClick={(e) => e.stopPropagation()}
              >
                {data.relationshipStrength > 70 ? (
                  <Heart className="w-5 h-5 fill-amber-400" />
                ) : (
                  <Heart className="w-5 h-5" />
                        )}
                    </button>
              <p className="text-gray-400 ml-1">
                {data.lastInteraction === "Yesterday" ? "Connected today" : 
                 data.lastInteraction === "3 days ago" ? "Met last week" : 
                 data.lastInteraction}
              </p>
            </div>
                                                </div>
                                    </div>
        
        {/* Contact Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Email */}
          <div className="flex items-start space-x-2 bg-gray-700/40 p-2 rounded-lg border border-gray-700/50">
            <div className="p-1.5 bg-gray-700 rounded-lg">
              <Mail className="text-gray-400 w-4 h-4" />
                                    </div>
            <div className="min-w-0">
              <p className="text-gray-400 text-xs">Email</p>
              <p className="text-white text-xs font-medium truncate max-w-[100px]">{data.email.split('@')[0]}...</p>
                                                    </div>
                                    </div>
          
          {/* Phone */}
          <div className="flex items-start space-x-2 bg-gray-700/40 p-2 rounded-lg border border-gray-700/50">
            <div className="p-1.5 bg-gray-700 rounded-lg">
              <Phone className="text-gray-400 w-4 h-4" />
                                                </div>
            <div className="min-w-0">
              <p className="text-gray-400 text-xs">Phone</p>
              <p className="text-white text-xs font-medium truncate max-w-[100px]">+1 (...</p>
                                                </div>
                                                </div>
          
          {/* Position */}
          <div className="flex items-start space-x-2 bg-gray-700/40 p-2 rounded-lg border border-gray-700/50">
            <div className="p-1.5 bg-gray-700 rounded-lg">
              <Briefcase className="text-gray-400 w-4 h-4" />
                                    </div>
            <div className="min-w-0">
              <p className="text-gray-400 text-xs">Position</p>
              <p className="text-white text-xs font-medium truncate max-w-[100px]">
                {data.title === "VP of Marketing" ? "VP ..." : 
                 data.title === "CTO" ? "CTO" : 
                 "Pro..."}
              </p>
                                                        </div>
                                                            </div>
          
          {/* Location */}
          <div className="flex items-start space-x-2 bg-gray-700/40 p-2 rounded-lg border border-gray-700/50">
            <div className="p-1.5 bg-gray-700 rounded-lg">
              <MapPin className="text-gray-400 w-4 h-4" />
                                                    </div>
            <div className="min-w-0">
              <p className="text-gray-400 text-xs">Location</p>
              <p className="text-white text-xs font-medium truncate max-w-[100px]">Bas...</p>
                                                        </div>
                                                    </div>
                                                </div>

        {/* Relationship Strength */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-400 text-xs">Relationship</p>
            <p className="text-gray-400 text-xs">Last contact: {data.lastContact || data.lastInteraction}</p>
          </div>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className={`h-5 w-6 rounded-sm ${
                  data.name === "Alex Morgan" && i <= 4 ? 'bg-blue-600' :
                  data.name === "Jordan Smith" && i <= 2 ? 'bg-blue-600' :
                  data.name === "Sarah Chen" && i <= 3 ? 'bg-blue-600' :
                  'bg-gray-700'
                }`}
              />
            ))}
                                    </div>
            </div>

        {/* Key Emotional Points */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Key Points</h4>
          <div className="space-y-1.5">
            {data.emotionalPoints.slice(0, 2).map((point, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="p-1 bg-gray-700 rounded-full mt-0.5">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                </div>
                <p className="text-sm text-gray-300 line-clamp-1">{point}</p>
              </div>
            ))}
                </div>
            </div>

        {/* Follow-ups */}
        <div className="flex items-center text-gray-400 border-t border-gray-700 pt-3">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1.5" />
            <span className="text-sm">{data.followUpItems?.length || 0} follow-ups</span>
          </div>
        </div>
      </div>

      {/* Animated cursor gradient effect */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light">
        <div className="w-full h-full bg-gradient-radial from-blue-500/10 via-transparent to-transparent" 
             style={{
               backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
               backgroundSize: '120% 120%'
             }}></div>
      </div>
      
      {/* Custom cursor animation styling */}
      <style jsx global>{customCursorClasses}</style>
    </Card>
  );

  return (
    <motion.div 
      className={`glim-card w-full rounded-lg overflow-hidden relative ${
        currentViewMode === 'compact'
          ? 'border-0'
          : 'border-[1px] border-muted/50'
      }`}
      variants={cardVariants}
      animate={currentViewMode}
      initial={currentViewMode}
      data-cursor-highlight={true}
    >
      {renderCompactView()}
    </motion.div>
  );
};

export default GlimContactCard;

// Sample data for demonstration purposes
export const sampleContacts: ContactData[] = [
  {
    id: 1,
    name: "Alex Morgan",
    title: "Product Manager",
    company: "TechFlow",
    avatarUrl: "https://randomuser.me/api/portraits/women/42.jpg",
    email: "alex.morgan@techflow.com",
    phone: "+1 (555) 123-4567",
    linkedinUrl: "https://linkedin.com/in/alexmorgan",
    relationshipStrength: 82,
    lastInteraction: "Yesterday",
    personalDetails: [
      {
        icon: Coffee,
        title: "Personal Preferences",
        content: "Prefers morning meetings. Enjoys discussing product strategy over coffee. Interested in AI and machine learning applications."
      },
      {
        icon: Briefcase,
        title: "Work History",
        content: "6+ years in product management. Previously worked at InnovateTech for 3 years. Led launch of 2 major products."
      },
      {
        icon: MapPin,
        title: "Location",
        content: "Based in San Francisco. Travels to New York quarterly for team meetings."
      }
    ],
    emotionalPoints: [
      "Enthusiastic about innovation and emerging technologies",
      "Values clear communication and documentation",
      "Passionate about user experience and customer-driven development"
    ],
        memoryItems: [
      "Mentioned interest in exploring AI for customer support automation",
      "Shared concerns about current roadmap timeline during last call",
      "Praised your team's responsiveness to their feature requests",
      "Planning to present our solution to their executive team next month"
        ],
        followUpItems: [
      {
        task: "Send product roadmap document",
        dueDate: "Tomorrow",
        status: "pending"
      },
      {
        task: "Schedule technical review with their dev team",
        dueDate: "Next week",
        status: "pending"
      },
      {
        task: "Follow up on pricing discussion",
        dueDate: "Last week",
        status: "overdue"
      }
    ],
    aiSuggestions: [
      "Send case study on similar implementation with Company XYZ",
      "Offer to facilitate introductory meeting between technical teams",
      "Share recent blog post about industry trends relevant to their goals"
    ],
    tags: ["Key Account", "Enterprise", "Tech"],
    initials: "AM",
    status: "Active",
    lastContact: "Yesterday"
  },
  {
    id: 2,
    name: "Jordan Smith",
    title: "CTO",
    company: "Innovate Solutions",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "jordan.smith@innovatesolutions.com",
    phone: "+1 (555) 987-6543",
    linkedinUrl: "https://linkedin.com/in/jordansmith",
    relationshipStrength: 55,
    lastInteraction: "3 days ago",
        personalDetails: [
      {
        icon: Activity,
        title: "Communication Style",
        content: "Direct and data-driven. Prefers technical deep dives and concrete examples. Values efficiency in meetings."
      },
      {
        icon: Users,
        title: "Team Dynamics",
        content: "Leads a team of 15 engineers. Highly respected by team members. Delegates decisions but stays informed."
      },
      {
        icon: MapPin,
        title: "Location",
        content: "Based in Boston. Remote work arrangement with quarterly visits to headquarters."
      }
        ],
        emotionalPoints: [
      "Cautious about new vendors due to past implementation challenges",
      "Excited about potential efficiency gains from our solution",
      "Concerned about security and compliance requirements"
    ],
    memoryItems: [
      "Expressed concerns about API limitations during technical discussion",
      "Mentioned plans to migrate infrastructure to cloud by Q3",
      "Shared frustration with current vendor's support response times"
    ],
    followUpItems: [
      {
        task: "Share API documentation and sample implementations",
        dueDate: "Tomorrow",
        status: "pending"
      },
      {
        task: "Introduce to our security team for compliance overview",
        dueDate: "Last week",
        status: "completed"
      }
    ],
    aiSuggestions: [
      "Provide benchmark data comparing performance metrics",
      "Offer technical workshop for their engineering team",
      "Share security whitepaper addressing their specific concerns"
    ],
    tags: ["Technical Decision Maker", "Mid-Market"],
    initials: "JS",
    status: "Active",
    lastContact: "1 week ago"
  },
  {
    id: 3,
    name: "Sarah Chen",
    title: "VP of Marketing",
    company: "GlobalBrands Inc.",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    email: "sarah.chen@globalbrands.com",
    phone: "+1 (555) 345-6789",
    linkedinUrl: "https://linkedin.com/in/sarahchen",
    relationshipStrength: 65,
    lastInteraction: "1 week ago",
        personalDetails: [
      {
        icon: Coffee,
        title: "Personal Preferences",
        content: "Prefers afternoon meetings. Communicates best through visual aids and examples. Values brand consistency."
      },
      {
        icon: Briefcase,
        title: "Work History",
        content: "10+ years in marketing. Previously led digital transformation at MarketLeaders Co. Expert in international campaigns."
      },
      {
        icon: MapPin,
        title: "Location",
        content: "Based in Chicago with frequent travel to Asia-Pacific region for market expansion."
      }
        ],
        emotionalPoints: [
      "Passionate about customer journey and experience mapping",
      "Driven by data-backed decision making and measurable outcomes",
      "Values long-term partnerships over transactional relationships"
    ],
        memoryItems: [
      "Mentioned upcoming global rebrand initiative launching in Q2",
      "Interested in analytics capabilities for cross-channel attribution",
      "Shared challenges with current agency relationships and coordination",
      "Expressed interest in case studies from retail and luxury sectors"
        ],
        followUpItems: [
      {
        task: "Send marketing integration one-pager",
        dueDate: "Tomorrow",
        status: "pending"
      },
      {
        task: "Schedule demo with analytics team",
        dueDate: "Next week",
        status: "pending"
      },
      {
        task: "Share retail industry benchmarks",
        dueDate: "Yesterday",
        status: "overdue"
      }
    ],
    aiSuggestions: [
      "Highlight multicultural marketing capabilities specifically for APAC region",
      "Include global brand consistency features in next presentation",
      "Share case study on cross-channel attribution from luxury sector"
    ],
    tags: ["Marketing Decision Maker", "Enterprise", "Global"],
    initials: "SC",
    status: "Active",
    lastContact: "2 weeks ago"
  }
];

