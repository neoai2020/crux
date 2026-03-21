"use client";
import { useState } from "react";

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
  icon: string;
  color: string;
}

interface Lesson {
  title: string;
  duration: string;
  type: "video" | "article" | "quiz";
}

const MODULES: TrainingModule[] = [
  {
    id: "getting-started",
    title: "Getting Started with Crux",
    description: "Learn the basics of creating your first website with Crux's AI-powered wizard.",
    duration: "25 min",
    icon: "🚀",
    color: "from-crux-500 to-crux-400",
    lessons: [
      { title: "Welcome to Crux - Platform Overview", duration: "5 min", type: "video" },
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
    icon: "🎨",
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
    icon: "🛒",
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
    icon: "📣",
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
    icon: "🎯",
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
    icon: "💰",
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

  const toggleLesson = (moduleId: string, lessonTitle: string) => {
    const key = `${moduleId}:${lessonTitle}`;
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
    <div className="max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-black mb-1">
        <span className="gradient-text">Training Hub</span>
      </h1>
      <p className="text-gray-400 mb-8">
        Step-by-step training to help you build, launch, and scale profitable websites.
      </p>

      {/* Progress Overview */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold">Your Progress</h2>
            <p className="text-sm text-gray-400">
              {completedLessons.size} of {MODULES.reduce((acc, m) => acc + m.lessons.length, 0)} lessons completed
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black gradient-text">
              {Math.round(
                (completedLessons.size / MODULES.reduce((acc, m) => acc + m.lessons.length, 0)) * 100
              )}%
            </p>
          </div>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-crux-500 to-accent-pink rounded-full transition-all duration-500"
            style={{
              width: `${(completedLessons.size / MODULES.reduce((acc, m) => acc + m.lessons.length, 0)) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-4">
        {MODULES.map((mod) => {
          const isOpen = activeModule === mod.id;
          const progress = getModuleProgress(mod);

          return (
            <div key={mod.id} className="card overflow-hidden">
              <button
                onClick={() => setActiveModule(isOpen ? null : mod.id)}
                className="w-full flex items-center gap-4 text-left"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-xl shrink-0`}
                >
                  {mod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold truncate">{mod.title}</h3>
                    {progress === 100 && (
                      <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full shrink-0">
                        Complete ✓
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 truncate">{mod.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-500">{mod.lessons.length} lessons</span>
                    <span className="text-xs text-gray-500">{mod.duration}</span>
                    <div className="flex-1 max-w-[120px] h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${mod.color} rounded-full transition-all duration-500`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{progress}%</span>
                  </div>
                </div>
                <span className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>

              {isOpen && (
                <div className="mt-4 pt-4 border-t border-gray-800/50 space-y-2 animate-fade-in">
                  {mod.lessons.map((lesson, idx) => {
                    const key = `${mod.id}:${lesson.title}`;
                    const isCompleted = completedLessons.has(key);
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                          isCompleted ? "bg-green-500/5" : "hover:bg-gray-800/50"
                        }`}
                        onClick={() => toggleLesson(mod.id, lesson.title)}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                            isCompleted ? "border-green-500 bg-green-500/20 text-green-400" : "border-gray-700"
                          }`}
                        >
                          {isCompleted && <span className="text-xs">✓</span>}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${isCompleted ? "text-gray-400 line-through" : ""}`}>
                            {lesson.title}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-gray-500">
                            {lesson.type === "video" && "🎬"}
                            {lesson.type === "article" && "📄"}
                            {lesson.type === "quiz" && "❓"}
                          </span>
                          <span className="text-xs text-gray-500">{lesson.duration}</span>
                        </div>
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
