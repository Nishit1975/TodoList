"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { login } from "@/components/actions/login";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  X,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [showError, setShowError] = useState(true);

  return (
    <>
      {error === "invalid" && showError && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 mb-6 animate-in fade-in slide-in-from-top-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span className="flex-1 font-medium">Invalid email or password</span>
          <button
            onClick={() => setShowError(false)}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form action={login} className="space-y-6">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
            Email Address
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/[0.05] border border-white/5 text-white placeholder:text-slate-600 focus:bg-white/[0.08] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2 ml-1">
            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Password
            </label>
            <Link
              href="/auth/forgotpassword"
              className="text-[11px] font-bold uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot?
            </Link>
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white/[0.05] border border-white/5 text-white placeholder:text-slate-600 focus:bg-white/[0.08] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full group relative flex items-center justify-center gap-2 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-base overflow-hidden transition-all hover:bg-indigo-500 active:scale-95 shadow-[0_0_30px_-5px_rgba(99,102,241,0.8)] hover:shadow-[0_0_40px_0px_rgba(139,92,246,0.9)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            Sign In{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        </button>
      </form>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050507] px-4 py-10 relative overflow-hidden font-sans">

      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/30 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-violet-600/30 rounded-full blur-[140px] animate-pulse delay-700" />

      <div className="w-full max-w-md relative z-10">
        <div className="relative rounded-[2.5rem] bg-[#0f0f13]/60 backdrop-blur-3xl border border-white/10 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_60px_-15px_rgba(139,92,246,0.3)]">

          {/* ✅ TodoList Logo */}
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

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-400 mt-2 text-sm font-medium">
              Sign in to your workspace
            </p>
          </div>

          <Suspense
            fallback={
              <div className="h-40 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <LoginForm />
          </Suspense>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don’t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors underline-offset-4 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        <footer className="mt-10 text-center text-[10px] uppercase tracking-[0.2em] font-bold text-slate-700">
          © 2026 TodoList • Secure Authentication
        </footer>
      </div>
    </div>
  );
}
