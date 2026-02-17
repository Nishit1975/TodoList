"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Menu,
    Search,
    Bell,
    Settings,
    Moon,
    User,
    LogOut,
    CheckSquare
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/components/actions/logout";

export function UserNavbar() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <header className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 h-16 flex items-center justify-between px-6 sticky top-0 z-30 shadow-lg">

            {/* Left Section: Menu Toggle & Brand */}
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 dark:from-indigo-500 dark:to-purple-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 dark:from-indigo-600 dark:to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                        <CheckSquare className="w-5 h-5 text-white" />
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                        User Panel
                    </h1>
                </div>
            </div>

            {/* Center Section: Search Bar */}
            <div className="flex-1 max-w-2xl mx-6">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && searchQuery.trim()) {
                                router.push(`/UserPanel/search?q=${encodeURIComponent(searchQuery.trim())}`);
                                setSearchQuery(''); // Clear after search
                            }
                        }}
                        placeholder="Search anything..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm text-slate-200 placeholder-slate-500"
                    />
                </div>
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-3">

                {/* Notifications */}
                <button className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
                </button>

                {/* Dark Mode Toggle */}
                {/* <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors hidden sm:flex">
                    <Moon className="w-5 h-5" />
                </button> */}

                {/* Divider */}
                <div className="w-px h-8 bg-slate-700 hidden lg:block"></div>

                {/* Profile Dropdown */}
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center ring-2 ring-slate-700">
                            <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="hidden lg:block text-left">
                            {loading ? (
                                <>
                                    <div className="h-4 w-20 bg-slate-700 rounded animate-pulse mb-1"></div>
                                    <div className="h-3 w-24 bg-slate-700 rounded animate-pulse"></div>
                                </>
                            ) : (
                                <>
                                    <p className="text-sm font-semibold text-white">{user?.username || "Guest"}</p>
                                    <p className="text-xs text-slate-400">User Account</p>
                                </>
                            )}
                        </div>
                    </button>
                </div>

                {/* Logout */}
                <button
                    onClick={async () => {
                        // Clear client-side storage first
                        if (typeof window !== 'undefined') {
                            localStorage.clear();
                            sessionStorage.clear();
                        }
                        // Call server action to clear cookie
                        await logout();
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden xl:inline text-sm font-medium">Logout</span>
                </button>
            </div>

        </header>
    );
}