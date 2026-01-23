"use client"; // Required for useState in Next.js App Router

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Lock,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff
} from "lucide-react";

export default function ResetPasswordPage() {
  // States to toggle visibility for each field independently
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] relative overflow-hidden px-4 py-8">

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Branding / Logo */}
      <Link href="/" className="flex items-center gap-2 mb-6 group transition-all duration-300 hover:scale-105">
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-3 transition-transform">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-black tracking-tight text-slate-900">
          TaskFlow
        </span>
      </Link>

      <div className="w-full max-w-[400px] bg-white p-8 rounded-[32px] 
                      shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.1)] 
                      border border-white relative z-10">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full mb-4">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            Change password
          </h2>
          {/* <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Please enter your current password to make changes.
          </p> */}
        </div>

        <form className="space-y-4">
          {/* Current Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">
              Current Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 focus:bg-white transition-all text-sm font-medium text-slate-900"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="h-px bg-slate-100 my-2" />

          {/* New Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">
              New Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type={showNew ? "text" : "password"}
                placeholder="Min. 8 characters"
                className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 focus:bg-white transition-all text-sm font-medium text-slate-900"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">
              Confirm New Password
            </label>
            <div className="relative group">
              <CheckCircle2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat new password"
                className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 focus:bg-white transition-all text-sm font-medium text-slate-900"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold text-base 
                       shadow-[0_10px_20px_-5px_rgba(15,23,42,0.3)] 
                       hover:bg-blue-600 hover:shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] 
                       hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group mt-2"
          >
            Update Password
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-50 text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-xs transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Cancel and go back
          </Link>
        </div>
      </div>

      <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">
        &copy; 2026 Todo List Inc.
      </p>
    </div>
  );
}