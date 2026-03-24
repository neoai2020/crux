"use client";
import { Mail, BookOpen, MessageCircle, ChevronRight } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-black mb-2">
        <span className="gradient-text">Support</span>
      </h1>
      <p className="text-gray-400 mb-8">
        Need help? Our team is here to assist you.
      </p>

      <div className="grid gap-5">
        <div className="card hover:border-crux-500/30 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center text-white shrink-0 shadow-lg">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="font-bold mb-1">Email Support</h3>
              <p className="text-sm text-gray-400 mb-3">
                Get a response within 24 hours from our dedicated team.
              </p>
              <a
                href="mailto:support@crux.site"
                className="text-sm text-crux-400 hover:text-crux-300 font-medium transition"
              >
                support@crux.site →
              </a>
            </div>
          </div>
        </div>

        <div className="card hover:border-crux-500/30 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-green to-accent-cyan flex items-center justify-center text-white shrink-0 shadow-lg">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="font-bold mb-1">Knowledge Base</h3>
              <p className="text-sm text-gray-400 mb-3">
                Browse guides, tutorials, and FAQs to find answers fast.
              </p>
              <span className="text-sm text-gray-500">Coming soon</span>
            </div>
          </div>
        </div>

        <div className="card hover:border-crux-500/30 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-orange to-yellow-400 flex items-center justify-center text-white shrink-0 shadow-lg">
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 className="font-bold mb-1">Live Chat</h3>
              <p className="text-sm text-gray-400 mb-3">
                Chat with us in real time for urgent issues.
              </p>
              <span className="text-sm text-gray-500">Coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
