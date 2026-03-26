"use client";
import { useState } from "react";
import { 
  Rocket, 
  Palette, 
  ShoppingCart, 
  Zap, 
  Target, 
  DollarSign, 
  Video, 
  FileText, 
  HelpCircle,
  ChevronDown,
  CheckCircle2
} from "lucide-react";

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
  icon: React.ReactNode;
  color: string;
}

interface Lesson {
  title: string;
  duration: string;
  type: "video" | "article" | "quiz";
  vimeoId?: string;
}

const MODULES: TrainingModule[] = [
  {
    id: "getting-started",
    title: "Getting Started with Crux",
    description: "Learn the basics of creating your first website with Crux's AI-powered wizard.",
    duration: "25 min",
    icon: <Rocket size={20} />,
    color: "from-crux-500 to-crux-400",
    lessons: [
      { title: "Welcome to Crux - Platform Overview", duration: "5 min", type: "video", vimeoId: "1177422137" },
      { title: "Choosing the Right Website Type", duration: "4 min", type: "video" },
      { title: "Setting Up Your Business Profile", duration: "6 min", type: "article" },
      { title: "Your First Website in 5 Minutes", duration: "5 min", type: "video" },
      { title: "Knowledge Check", duration: "5 min", type: "quiz" },
    ],
  },
  {
    id: "templates",
    title: "Mastering Templates",
    description: "Deep dive into template customization, content optimization, and design best practices.",
    duration: "35 min",
    icon: <Palette size={20} />,
    color: "from-accent-pink to-accent-orange",
    lessons: [
      { title: "Understanding Template Structure", duration: "6 min", type: "video" },
      { title: "Customizing Colors and Branding", duration: "8 min", type: "video" },
      { title: "Writing High-Converting Headlines", duration: "7 min", type: "article" },
      { title: "Adding Compelling Product Descriptions", duration: "7 min", type: "video" },
      { title: "Mobile Optimization Tips", duration: "4 min", type: "article" },
      { title: "Template Mastery Quiz", duration: "3 min", type: "quiz" },
    ],
  },
  {
    id: "ecommerce",
    title: "eCom & Dropshipping Success",
    description: "Build profitable online stores with proven strategies for product selection and pricing.",
    duration: "45 min",
    icon: <ShoppingCart size={20} />,
    color: "from-accent-green to-accent-cyan",
    lessons: [
      { title: "Choosing Winning Products", duration: "8 min", type: "video" },
      { title: "Setting Up Your Store", duration: "10 min", type: "video" },
      { title: "Pricing Strategies That Work", duration: "7 min", type: "article" },
      { title: "Product Photography Tips", duration: "6 min", type: "video" },
      { title: "Managing Orders & Fulfillment", duration: "8 min", type: "video" },
      { title: "Scaling Your Store", duration: "6 min", type: "article" },
    ],
  },
  {
    id: "marketing",
    title: "Marketing & Traffic Generation",
    description: "Learn to drive traffic using Reddit, forums, social media, and content marketing.",
    duration: "50 min",
    icon: <Zap size={20} />,
    color: "from-accent-orange to-yellow-400",
    lessons: [
      { title: "Marketing Fundamentals", duration: "6 min", type: "video" },
      { title: "Reddit Marketing Strategy", duration: "10 min", type: "video" },
      { title: "Forum Marketing Blueprint", duration: "8 min", type: "article" },
      { title: "Social Media Posting Schedule", duration: "7 min", type: "video" },
      { title: "Using the AI Message Generator", duration: "9 min", type: "video" },
      { title: "Measuring Your Results", duration: "5 min", type: "video" },
      { title: "Marketing Strategy Quiz", duration: "5 min", type: "quiz" },
    ],
  },
  {
    id: "funnels",
    title: "Sales Funnels That Convert",
    description: "Build high-converting sales funnels with urgency, social proof, and strategic CTAs.",
    duration: "40 min",
    icon: <Target size={20} />,
    color: "from-red-500 to-pink-500",
    lessons: [
      { title: "Sales Funnel Psychology", duration: "8 min", type: "video" },
      { title: "Creating Urgency & Scarcity", duration: "7 min", type: "video" },
      { title: "Social Proof Strategies", duration: "6 min", type: "article" },
      { title: "Crafting Irresistible Offers", duration: "8 min", type: "video" },
      { title: "A/B Testing Basics", duration: "6 min", type: "video" },
      { title: "Funnel Optimization Quiz", duration: "5 min", type: "quiz" },
    ],
  },
  {
    id: "scaling",
    title: "Scaling to $10K/Month",
    description: "Advanced strategies for scaling your online business to consistent five-figure months.",
    duration: "55 min",
    icon: <DollarSign size={20} />,
    color: "from-yellow-500 to-amber-500",
    lessons: [
      { title: "The $10K Roadmap", duration: "10 min", type: "video" },
      { title: "Building Multiple Revenue Streams", duration: "8 min", type: "video" },
      { title: "Automation & Systems", duration: "9 min", type: "article" },
      { title: "Paid Traffic Fundamentals", duration: "10 min", type: "video" },
      { title: "Outsourcing & Delegation", duration: "8 min", type: "video" },
      { title: "Case Studies: Real Success Stories", duration: "10 min", type: "video" },
    ],
  },
];

export default function TrainingPage() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const handleLessonClick = (moduleId: string, lesson: Lesson) => {
    if (lesson.vimeoId) {
      setPlayingVideo((prev) => (prev === lesson.vimeoId ? null : lesson.vimeoId!));
    }
    const key = `${moduleId}:${lesson.title}`;
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const getModuleProgress = (mod: TrainingModule): number => {
    const completed = mod.lessons.filter((l) => completedLessons.has(`${mod.id}:${l.title}`)).length;
    return Math.round((completed / mod.lessons.length) * 100);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in pb-20 flex flex-col items-center">
      <div className="w-full text-center mb-8">
        <h1 className="text-3xl font-black mb-2">
          <span className="gradient-text uppercase tracking-tight">Training Hub</span>
        </h1>
        <p className="text-gray-400 italic">
          Master the art of online business with our expert-led modules. From first site to five-figure months.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="card mb-10 overflow-hidden relative border-crux-500/20 bg-gray-900/60">
        <div className="absolute inset-0 bg-grid opacity-5" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Your Progress</h2>
              <p className="text-sm text-gray-400 mt-1">
                You have finished <span className="text-white font-bold">{completedLessons.size}</span> out of {MODULES.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black text-crux-400">
                {Math.round(
                  (completedLessons.size / MODULES.reduce((acc, m) => acc + m.lessons.length, 0)) * 100
                )}%
              </p>
            </div>
          </div>
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-crux-500 via-accent-pink to-accent-orange rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${(completedLessons.size / MODULES.reduce((acc, m) => acc + m.lessons.length, 0)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="grid gap-4">
        {MODULES.map((mod) => {
          const isOpen = activeModule === mod.id;
          const progress = getModuleProgress(mod);

          return (
            <div key={mod.id} className={`card p-0 overflow-hidden transition-all duration-300 border-gray-800/50 hover:border-gray-700 ${isOpen ? "ring-1 ring-crux-500/30 shadow-2xl shadow-crux-500/10" : ""}`}>
              <button
                onClick={() => setActiveModule(isOpen ? null : mod.id)}
                className={`w-full flex items-center gap-5 p-6 text-left group transition-colors ${isOpen ? "bg-black/40" : "hover:bg-gray-800/30"}`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white shrink-0 shadow-lg shadow-black/40 group-hover:scale-110 transition-all duration-500`}
                >
                  {mod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-crux-300 transition-colors">{mod.title}</h3>
                    {progress === 100 && (
                      <span className="text-[10px] font-black bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30 uppercase tracking-tighter shadow-sm shadow-green-500/10">
                        Mastery Achieved ✓
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1">{mod.description}</p>
                  <div className="flex items-center gap-5 mt-2.5">
                    <div className="flex items-center gap-1.5">
                      <FileText size={12} className="text-gray-600" />
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{mod.lessons.length} LESSONS</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Rocket size={12} className="text-gray-600" />
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{mod.duration}</span>
                    </div>
                    <div className="flex-1 max-w-[150px] h-1.5 bg-gray-800 rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full bg-gradient-to-r ${mod.color} rounded-full transition-all duration-700 ease-out`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
                <ChevronDown size={24} className={`text-gray-600 transition-transform duration-500 ease-in-out ${isOpen ? "rotate-180 text-crux-400" : ""}`} />
              </button>

              {isOpen && (
                <div className="bg-black/20 p-6 pt-2 border-t border-gray-800/50 space-y-2 animate-slide-down">
                  {mod.lessons.map((lesson, idx) => {
                    const key = `${mod.id}:${lesson.title}`;
                    const isCompleted = completedLessons.has(key);
                    const isVideoPlaying = lesson.vimeoId && playingVideo === lesson.vimeoId;
                    return (
                      <div key={idx} className="space-y-0">
                        <div
                          className={`group/lesson flex items-center gap-4 px-5 py-4 rounded-xl transition-all cursor-pointer border ${
                            isCompleted ? "bg-green-500/5 border-green-500/20" : "bg-gray-800/20 border-transparent hover:border-gray-700 hover:bg-gray-800/40"
                          }`}
                          onClick={() => handleLessonClick(mod.id, lesson)}
                        >
                          <div
                            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                              isCompleted ? "border-green-500 bg-green-500/20 text-green-400 scale-110 shadow-lg shadow-green-500/10" : "border-gray-700 group-hover/lesson:border-crux-500 group-hover/lesson:bg-crux-500/5"
                            }`}
                          >
                            {isCompleted ? <CheckCircle2 size={14} /> : <div className="w-1 h-1 rounded-full bg-gray-700" />}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-bold tracking-tight transition-all ${isCompleted ? "text-gray-500 line-through opacity-60" : "text-gray-200 group-hover/lesson:text-white"}`}>
                              {lesson.title}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 shrink-0 px-3 py-1 bg-black/30 rounded-lg border border-gray-800 group-hover/lesson:border-gray-700 transition-colors">
                            <div className="text-gray-600 group-hover/lesson:text-gray-400 transition-colors">
                              {lesson.type === "video" && <Video size={14} />}
                              {lesson.type === "article" && <FileText size={14} />}
                              {lesson.type === "quiz" && <HelpCircle size={14} />}
                            </div>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{lesson.duration}</span>
                          </div>
                        </div>
                        {isVideoPlaying && (
                          <div className="mx-5 mt-2 mb-3 rounded-xl overflow-hidden border border-gray-800 bg-black">
                            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                              <iframe
                                src={`https://player.vimeo.com/video/${lesson.vimeoId}?autoplay=1&muted=0&title=0&byline=0&portrait=0&dnt=1`}
                                className="absolute inset-0 w-full h-full"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                style={{ border: 0 }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
