"use client";
import { Mail, BookOpen, ExternalLink, MessageCircle } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import { useAuth } from "@/context/AuthContext";

export default function SupportPage() {
  const { user } = useAuth();
  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="w-full text-center mb-8">
        <h1 className="text-3xl font-black mb-2">
          <span className="gradient-text">Support</span>
        </h1>
        <p className="text-gray-400">
          Need help? Our team is here to assist you.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 w-full">
        <div className="card hover:border-crux-500/30 transition-all">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center text-white shrink-0 shadow-lg">
              <Mail size={26} />
            </div>
            <div>
              <h3 className="font-bold mb-1">Email Support</h3>
              <p className="text-sm text-gray-400 mb-3">
                Get a response within 24 hours from our dedicated team.
              </p>
              <a
                href="mailto:crux@neoai.freshdesk.com"
                className="text-sm text-crux-400 hover:text-crux-300 font-medium transition"
              >
                crux@neoai.freshdesk.com →
              </a>
            </div>
          </div>
        </div>

        <div className="card hover:border-crux-500/30 transition-all">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-green to-accent-cyan flex items-center justify-center text-white shrink-0 shadow-lg">
              <BookOpen size={26} />
            </div>
            <div>
              <h3 className="font-bold mb-1">Support Portal</h3>
              <p className="text-sm text-gray-400 mb-3">
                Browse help articles, submit tickets, and track your requests.
              </p>
              <a
                href="https://curxai.freshdesk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-crux-400 hover:text-crux-300 font-medium transition"
              >
                Open Support Portal <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="card hover:border-accent-pink/30 transition-all border-accent-pink/10 bg-gradient-to-br from-gray-900 to-accent-pink/[0.03]">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-pink to-crux-500 flex items-center justify-center text-white shrink-0 shadow-lg">
              <MessageCircle size={26} />
            </div>
            <div>
              <h3 className="font-bold mb-1">Got a Question?</h3>
              <p className="text-sm text-gray-400 mb-4">
                Drop us a message and we&apos;ll get back to you as soon as possible.
              </p>
              <a
                href="mailto:crux@neoai.freshdesk.com"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest text-white bg-accent-pink hover:bg-accent-pink/80 transition-all shadow-lg shadow-accent-pink/20 hover:scale-105 active:scale-95"
              >
                <Mail size={14} /> Message Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full mt-10">
        <h2 className="text-xl font-black mb-5">
          <span className="gradient-text uppercase tracking-tight">Frequently Asked Questions</span>
        </h2>
        <FaqSection compact maxCategories={4} userFeatures={user?.features} />
      </div>
    </div>
  );
}
