"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  History,
  User,
  LogOut,
  Bell,
  CheckSquare,
  X,
  Mail
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useSearch } from "@/contexts/SearchContext";

// Interface for contact messages (used as notifications)
interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export function AdminNavbar() {
  const { user, loading } = useAuth();
  const { setSearchQuery } = useSearch();
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState<ContactMessage[]>([]);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch unread contact messages for notifications
  useEffect(() => {
    // Ensure we're in the browser environment
    if (typeof window === 'undefined') return;

    let isMounted = true;

    const fetchUnreadMessages = async () => {
      try {
        const response = await fetch("/api/contact/unread");
        if (!response.ok) {
          // Only log errors in development to avoid console spam
          if (process.env.NODE_ENV === 'development') {
            console.warn("Failed to fetch unread messages:", response.status);
          }
          return;
        }
        const data = await response.json();
        if (isMounted) {
          setUnreadMessages(data);
        }
      } catch (error) {
        // Only log errors in development
        if (process.env.NODE_ENV === 'development') {
          console.error("Failed to fetch unread messages:", error);
        }
      }
    };

    // Delay the initial fetch slightly to ensure everything is ready
    const initialTimeout = setTimeout(fetchUnreadMessages, 100);

    // Refresh every 30 seconds
    const interval = setInterval(fetchUnreadMessages, 30000);

    return () => {
      isMounted = false;
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const unreadCount = unreadMessages.length;

  const handleNotificationClick = () => {
    setShowNotifications(false);
    router.push("/AdminPanel/contact-messages");
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 h-16 flex items-center justify-between px-6 sticky top-0 z-30 shadow-lg">

      {/* Left Section: Brand */}
      <div className="flex items-center gap-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>
      </div>

      {/* Center Section: Search Bar */}
      <div className="flex-1 max-w-2xl mx-12">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors text-slate-500 group-focus-within:text-indigo-400" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setSearchQuery(e.target.value); // Update context immediately
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setInputValue('');
                  setSearchQuery(''); // Clear search
                }
              }}
              placeholder="Search tasks, projects, or team members..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 transition-all text-sm font-medium shadow-sm bg-slate-800/80 border border-slate-700/50 focus:bg-slate-800 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-100 placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-3">

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 text-slate-400 hover:bg-slate-800 hover:text-indigo-400"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-rose-500 rounded-full ring-2 ring-slate-900 text-xs font-bold text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
                <h3 className="text-sm font-bold text-white">Notifications</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Notification List */}
              <div className="max-h-80 overflow-y-auto">
                {unreadMessages.length === 0 ? (
                  <div className="px-4 py-8 text-center text-slate-500 text-sm">
                    No new notifications
                  </div>
                ) : (
                  unreadMessages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={handleNotificationClick}
                      className="px-4 py-3 border-b border-slate-700/50 cursor-pointer transition-colors hover:bg-slate-700/50 bg-purple-500/10"
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <Mail className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-white">
                              {msg.name}
                            </p>
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                            {msg.subject}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {formatTimeAgo(msg.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 bg-slate-900/50 border-t border-slate-700">
                <button
                  onClick={handleNotificationClick}
                  className="w-full text-center text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  View all messages
                </button>
              </div>
            </div>
          )}
        </div>

        {/* History */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 text-slate-400 hover:bg-slate-800 hover:text-slate-100">
          <History className="w-4 h-4" />
          <span className="hidden lg:inline">History</span>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-700"></div>

        {/* Profile */}
        <button className="relative group flex items-center gap-2">
          <div className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ring-2 ring-transparent group-hover:ring-indigo-500 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-300">
            <User className="w-5 h-5" />
          </div>
          {loading ? (
            <div className="hidden lg:block">
              <div className="h-4 w-20 bg-slate-700 rounded animate-pulse"></div>
            </div>
          ) : (
            <span className="hidden lg:inline text-sm font-semibold text-slate-200">
              {user?.username || "Admin"}
            </span>
          )}
        </button>

        {/* Logout */}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 group text-slate-400 hover:bg-rose-900/20 hover:text-rose-400"
        >
          <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          <span className="hidden xl:inline">Logout</span>
        </Link>
      </div>

    </header>
  );
}