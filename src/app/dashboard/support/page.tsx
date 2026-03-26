"use client";
import { useState } from "react";
import { Mail, BookOpen, ExternalLink, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SupportPage() {
  const { user } = useAuth();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);

    const mailtoLink =
      `mailto:crux@neoai.freshdesk.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `From: ${user?.email || "Unknown"}\n\n${message}`
      )}`;

    window.open(mailtoLink, "_blank");

    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setSubject("");
      setMessage("");
    }, 800);
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in flex flex-col items-center">
      <div className="w-full text-center mb-8">
        <h1 className="text-3xl font-black mb-2">
          <span className="gradient-text">Support</span>
        </h1>
        <p className="text-gray-400">
          Need help? Our team is here to assist you.
        </p>
      </div>

      <div className="grid gap-5 w-full">
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

        {/* Contact Form */}
        <div className="card hover:border-crux-500/30 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-pink to-crux-500 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Send size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold mb-1">Send a Message</h3>
              <p className="text-sm text-gray-400 mb-4">
                Describe your issue and we&apos;ll get back to you.
              </p>

              {sent ? (
                <div className="flex items-center gap-2 text-green-400 text-sm font-medium py-3">
                  <CheckCircle2 size={18} />
                  Your email client has been opened — send the message to complete your request.
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
                    rows={4}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-crux-500 focus:ring-1 focus:ring-crux-500/50 transition-all resize-none"
                  />
                  <button
                    type="submit"
                    disabled={sending || !subject || !message}
                    className="btn-primary px-6 py-2.5 text-sm font-bold inline-flex items-center gap-2 disabled:opacity-50"
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
        </div>
      </div>
    </div>
  );
}
