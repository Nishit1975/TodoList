"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signup } from "@/components/actions/signup";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c] px-4 py-10 relative overflow-hidden font-sans">
      
      {/* Dynamic Animated Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-600/20 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand with Modern Hover */}
        <Link
          href="/"
          className="flex items-center justify-center gap-3 mb-10 group"
        >
          <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:scale-110 transition-all duration-300">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Todo<span className="text-indigo-400">List</span>
          </span>
        </Link>

        {/* Glassmorphism Card */}
        <div className="relative rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-2xl p-8 md:p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Get Started
            </h1>
            <p className="text-slate-400 mt-2 text-sm font-medium">
              Create an account to track your goals
            </p>
          </div>

          <form action={signup} className="space-y-6">
            {/* Input Group Template */}
            {[
              { label: "Full Name", name: "username", icon: User, placeholder: "John Doe", type: "text" },
              { label: "Email Address", name: "email", icon: Mail, placeholder: "name@example.com", type: "email" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
                  {field.label}
                </label>
                <div className="relative group">
                  <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/[0.05] border border-white/5 text-white placeholder:text-slate-600 focus:bg-white/[0.08] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300"
                  />
                </div>
              </div>
            ))}

            {/* Password with Toggle */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white/[0.05] border border-white/5 text-white placeholder:text-slate-600 focus:bg-white/[0.08] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Role Select */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
                Account Role
              </label>
              <div className="relative group">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <select
                  name="role"
                  defaultValue="user"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/[0.05] border border-white/5 text-white focus:bg-white/[0.08] focus:border-indigo-500/50 outline-none appearance-none transition-all cursor-pointer"
                >
                  <option value="user" className="bg-[#1a1a1c]">Standard User</option>
                  <option value="admin" className="bg-[#1a1a1c]">Administrator</option>
                </select>
              </div>
            </div>

            {/* Premium Submit Button */}
            <button
              type="submit"
              className="w-full group relative flex items-center justify-center gap-2 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-base overflow-hidden transition-all hover:bg-indigo-500 active:scale-95 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Create Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>
          </form>

          {/* Footer Navigation */}
          <p className="mt-8 text-center text-sm text-slate-400">
            Existing user?{" "}
            <Link
              href="/auth/login"
              className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors underline-offset-4 hover:underline"
            >
              Log in instead
            </Link>
          </p>
        </div>

        <p className="mt-10 text-center text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600">
          Secure Cloud Infrastructure • © 2026
        </p>
      </div>
    </div>
  );
}
