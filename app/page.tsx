"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Zap, Layers, Command, X, Loader2 } from "lucide-react";

export default function HomePage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({ type: "success", message: "Message sent successfully! We'll get back to you soon." });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setContactOpen(false), 2000);
      } else {
        const data = await response.json();
        setSubmitStatus({ type: "error", message: data.error || "Failed to send message" });
      }
    } catch {
      setSubmitStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden font-sans">

      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[500px] bg-violet-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 border-b border-white/5 bg-[#020617]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center border border-white/10 shadow-xl group-hover:scale-105 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Todo<span className="text-indigo-400">Master</span>
              </span>
            </div>

            {/* Links */}
            <div className="hidden md:flex items-center gap-8">
              {["Features", "Workflow", "Pricing", "About"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 transition-all group-hover:w-full" />
                </Link>
              ))}
              <button
                onClick={() => setContactOpen(true)}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 transition-all group-hover:w-full" />
              </button>
            </div>

            {/* Auth */}
            <div className="flex items-center gap-4">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="group relative px-5 py-2.5 rounded-lg overflow-hidden transition-transform active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 transition-all group-hover:brightness-110" />
                <div className="absolute top-0 w-full h-[1px] bg-white/30" />
                <span className="relative z-10 text-sm font-bold text-white flex items-center gap-2">
                  Get Started
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-24 lg:pt-48 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-indigo-300 mb-10 backdrop-blur-md animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Smart Todo & Task Manager
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-8 leading-[1.1]">
            Organize Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-white">
              Tasks & Daily Goals.
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            A powerful Todo List & Task Management system designed to help you
            plan, prioritize, and complete your work effortlessly. Create tasks,
            manage deadlines, track progress, and stay productive every day —
            all from one clean and intuitive dashboard.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
            <Link
              href="/auth/signup"
              className="group h-14 px-8 rounded-full bg-white text-slate-950 font-bold text-lg hover:bg-indigo-50 transition-all flex items-center gap-3 shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] hover:-translate-y-1"
            >
              Start Managing Tasks
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button className="h-14 px-8 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-3">
              Live Demo
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
            {[
              {
                icon: Zap,
                title: "Real-Time Sync",
                desc: "Instantly sync your tasks across devices. Every update is saved in real-time so your todo list is always up to date.",
                color: "text-amber-400",
                bg: "bg-amber-500/10 border-amber-500/20",
              },
              {
                icon: Layers,
                title: "Task Organization",
                desc: "Break down big goals into smaller tasks and subtasks. Organize todos by priority, category, or deadline.",
                color: "text-blue-400",
                bg: "bg-blue-500/10 border-blue-500/20",
              },
              {
                icon: Command,
                title: "Quick Actions",
                desc: "Quickly add, edit, and manage tasks using smart controls designed for speed, focus, and simplicity.",
                color: "text-indigo-400",
                bg: "bg-indigo-500/10 border-indigo-500/20",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/10 transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${feature.bg}`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-32 pt-10 border-t border-white/5 opacity-60">
            <p className="text-sm font-semibold tracking-widest uppercase text-slate-500 mb-10">
              Used by individuals, teams, and productivity-focused users
            </p>
          </div>

        </div>
      </main>

      {/* Contact Modal */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setContactOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0f172a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setContactOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Contact <span className="text-indigo-400">Us</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10">
              Have questions or feedback? We&apos;d love to hear from you.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Status Message */}
              {submitStatus && (
                <div
                  className={`p-4 rounded-xl flex items-center gap-3 ${submitStatus.type === "success"
                      ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                      : "bg-rose-500/20 border border-rose-500/30 text-rose-400"
                    }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span>{submitStatus.message}</span>
                </div>
              )}

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What is this about?"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full md:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
