"use client";
import { useState } from "react";
import { Mail, BookOpen, ExternalLink, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import FaqSection from "@/components/FaqSection";

export default function SupportPage() {
  const { user } = useAuth();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/send-support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: user?.email || "Unknown",
          subject,
          message,
        }),
      });

      if (!res.ok) {
        const mailtoLink = `mailto:crux@neoai.freshdesk.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${user?.email || "Unknown"}\n\n${message}`)}`;
        window.open(mailtoLink, "_blank");
      }

      setSent(true);
      setSubject("");
      setMessage("");
      setTimeout(() => setSent(false), 5000);
    } catch {
      const mailtoLink = `mailto:crux@neoai.freshdesk.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${user?.email || "Unknown"}\n\n${message}`)}`;
      window.open(mailtoLink, "_blank");
      setSent(true);
      setSubject("");
      setMessage("");
      setTimeout(() => setSent(false), 5000);
    }
    setSending(false);
  }

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

      <div className="grid md:grid-cols-2 gap-5 w-full">
        {/* Left column — info cards */}
        <div className="space-y-5">
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
                  href="mailto:crux@neoai.freshdesk.com"
                  className="text-sm text-crux-400 hover:text-crux-300 font-medium transition"
                >
                  crux@neoai.freshdesk.com →
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
        </div>

        {/* Right column — contact form */}
        <div className="card hover:border-crux-500/30 transition-all h-fit">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-pink to-crux-500 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Send size={18} />
            </div>
            <div>
              <h3 className="font-bold">Send a Message</h3>
              <p className="text-xs text-gray-500">We&apos;ll get back to you within 24 hours</p>
            </div>
          </div>

          {sent ? (
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium py-6 justify-center">
              <CheckCircle2 size={18} />
              Message sent! We&apos;ll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-3">
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-crux-500 focus:ring-1 focus:ring-crux-500/50 transition-all"
              />
              <textarea
                placeholder="Describe your issue..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-crux-500 focus:ring-1 focus:ring-crux-500/50 transition-all resize-none"
              />
              {error && (
                <p className="text-red-400 text-xs">{error}</p>
              )}
              <button
                type="submit"
                disabled={sending || !subject || !message}
                className="btn-primary w-full py-2.5 text-sm font-bold inline-flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={14} /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full mt-10">
        <h2 className="text-xl font-black mb-5">
          <span className="gradient-text uppercase tracking-tight">Frequently Asked Questions</span>
        </h2>
        <FaqSection compact maxCategories={4} />
      </div>
    </div>
  );
}
