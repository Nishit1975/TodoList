"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Send, MessageSquare, Users, Circle, ArrowLeft, Hash, Lock } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
    id: number;
    content: string;
    senderId: number;
    senderName: string;
    createdAt: string;
}

interface DmMessage {
    id: number;
    content: string;
    senderId: number;
    receiverId: number;
    senderName: string;
    isRead: boolean;
    createdAt: string;
}

interface User {
    userid: number;
    username: string;
    email: string;
    role: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function getAvatarColor(id: number) {
    const colors = [
        "from-indigo-500 to-purple-600",
        "from-blue-500 to-cyan-600",
        "from-emerald-500 to-teal-600",
        "from-orange-500 to-amber-600",
        "from-pink-500 to-rose-600",
        "from-violet-500 to-indigo-600",
    ];
    return colors[id % colors.length];
}

function formatTime(dateStr: string) {
    return new Date(dateStr).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return "Today";
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function groupByDate<T extends { createdAt: string }>(messages: T[]) {
    return messages.reduce<{ date: string; msgs: T[] }[]>((groups, msg) => {
        const date = formatDate(msg.createdAt);
        const last = groups[groups.length - 1];
        if (last && last.date === date) { last.msgs.push(msg); }
        else { groups.push({ date, msgs: [msg] }); }
        return groups;
    }, []);
}

function MessageBubble({ msg, currentUserId, accentFrom, accentTo }: {
    msg: { id: number; content: string; senderId: number; senderName: string; createdAt: string };
    currentUserId: number | null;
    accentFrom: string;
    accentTo: string;
}) {
    const isMe = msg.senderId === currentUserId;
    return (
        <div className={`flex items-end gap-2.5 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(msg.senderId)} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                <span className="text-white text-xs font-bold">{getInitials(msg.senderName)}</span>
            </div>
            <div className={`max-w-[65%] flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
                {!isMe && (
                    <span className="text-xs font-semibold text-slate-500 px-1">{msg.senderName}</span>
                )}
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMe
                        ? `bg-gradient-to-br ${accentFrom} ${accentTo} text-white rounded-br-sm shadow-lg shadow-blue-200`
                        : "bg-slate-100 text-slate-800 rounded-bl-sm"
                }`}>
                    {msg.content}
                </div>
                <span className="text-xs text-slate-400 px-1">{formatTime(msg.createdAt)}</span>
            </div>
        </div>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminChatBoxPage() {
    const [generalMessages, setGeneralMessages]   = useState<Message[]>([]);
    const [dmMessages, setDmMessages]             = useState<DmMessage[]>([]);
    const [users, setUsers]                       = useState<User[]>([]);
    const [newMessage, setNewMessage]             = useState("");
    const [currentUserId, setCurrentUserId]       = useState<number | null>(null);
    const [selectedUser, setSelectedUser]         = useState<User | null>(null);
    const [isSending, setIsSending]               = useState(false);
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [isLoadingUsers, setIsLoadingUsers]     = useState(true);
    // Set of senderIds that have unread DMs to the current user
    const [unreadSenders, setUnreadSenders]       = useState<Set<number>>(new Set());
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef       = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // ── Fetch helpers ──────────────────────────────────────────────────────────

    const fetchGeneralMessages = useCallback(async () => {
        try {
            const res = await fetch("/api/chatbox", { cache: "no-store" });
            if (!res.ok) return;
            setGeneralMessages(await res.json());
        } catch (err) {
            console.error("Error fetching general messages:", err);
        } finally {
            setIsLoadingMessages(false);
        }
    }, []);

    const fetchDmMessages = useCallback(async (receiverId: number) => {
        try {
            const res = await fetch(`/api/chatbox/dm?receiverId=${receiverId}`, { cache: "no-store" });
            if (!res.ok) return;
            setDmMessages(await res.json());
        } catch (err) {
            console.error("Error fetching DMs:", err);
        } finally {
            setIsLoadingMessages(false);
        }
    }, []);

    const fetchUsers = useCallback(async () => {
        try {
            const res = await fetch("/api/chatbox/users", { cache: "no-store" });
            if (!res.ok) return;
            setUsers(await res.json());
        } catch (err) {
            console.error("Error fetching users:", err);
        } finally {
            setIsLoadingUsers(false);
        }
    }, []);

    const fetchCurrentUser = useCallback(async () => {
        try {
            const res = await fetch("/api/auth/me");
            if (!res.ok) return;
            const data = await res.json();
            setCurrentUserId(data.userId);
        } catch (err) {
            console.error("Error fetching current user:", err);
        }
    }, []);

    // Fetch unread senders and rebuild the Set
    const fetchUnread = useCallback(async () => {
        try {
            const res = await fetch("/api/chatbox/dm/unread", { cache: "no-store" });
            if (!res.ok) return;
            const senderIds: number[] = await res.json();
            setUnreadSenders(new Set(senderIds));
        } catch (err) {
            console.error("Error fetching unread:", err);
        }
    }, []);

    // Mark all DMs from senderId → me as read (server + optimistic)
    const markAsRead = useCallback(async (senderId: number) => {
        // Optimistic: remove from local set immediately
        setUnreadSenders((prev) => {
            const next = new Set(prev);
            next.delete(senderId);
            return next;
        });
        try {
            await fetch("/api/chatbox/dm", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ senderId }),
            });
        } catch (err) {
            console.error("Error marking as read:", err);
        }
    }, []);

    // ── Initial load ───────────────────────────────────────────────────────────

    useEffect(() => {
        fetchGeneralMessages();
        fetchUsers();
        fetchCurrentUser();
        fetchUnread();
    }, [fetchGeneralMessages, fetchUsers, fetchCurrentUser, fetchUnread]);

    // ── Polling every 5 s: active view + unread counts ─────────────────────────

    useEffect(() => {
        const interval = setInterval(() => {
            if (selectedUser) {
                fetchDmMessages(selectedUser.userid);
            } else {
                fetchGeneralMessages();
            }
            fetchUnread(); // always refresh unread dots
        }, 5000);
        return () => clearInterval(interval);
    }, [selectedUser, fetchGeneralMessages, fetchDmMessages, fetchUnread]);

    // ── When selected user changes ─────────────────────────────────────────────

    useEffect(() => {
        if (selectedUser) {
            setIsLoadingMessages(true);
            setDmMessages([]);
            fetchDmMessages(selectedUser.userid);
            // Mark their messages to me as read
            markAsRead(selectedUser.userid);
        } else {
            setIsLoadingMessages(true);
            setGeneralMessages([]);
            fetchGeneralMessages();
        }
    }, [selectedUser, fetchDmMessages, fetchGeneralMessages, markAsRead]);

    useEffect(() => { scrollToBottom(); }, [generalMessages, dmMessages]);

    // ── Send ───────────────────────────────────────────────────────────────────

    const handleSend = async () => {
        const trimmed = newMessage.trim();
        if (!trimmed || isSending) return;

        setIsSending(true);
        setNewMessage("");

        try {
            if (selectedUser) {
                const res = await fetch("/api/chatbox/dm", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ receiverId: selectedUser.userid, content: trimmed }),
                });
                if (!res.ok) throw new Error("Failed to send DM");
                const sent: DmMessage = await res.json();
                setDmMessages((prev) => [...prev, sent]);
            } else {
                const res = await fetch("/api/chatbox", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ content: trimmed }),
                });
                if (!res.ok) throw new Error("Failed to send message");
                const sent: Message = await res.json();
                setGeneralMessages((prev) => [...prev, sent]);
            }
        } catch (err) {
            console.error("Error sending message:", err);
            setNewMessage(trimmed);
        } finally {
            setIsSending(false);
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
    };

    // ── Handle clicking a user ─────────────────────────────────────────────────

    const handleSelectUser = (u: User) => {
        setSelectedUser(u);
        // markAsRead is called inside the selectedUser useEffect
    };

    // ── Derived ────────────────────────────────────────────────────────────────

    const activeMessages = selectedUser ? dmMessages : generalMessages;
    const grouped        = groupByDate(activeMessages);
    const accentFrom     = "from-blue-600";
    const accentTo       = "to-purple-600";

    // ──────────────────────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
            <div className="max-w-full mx-auto h-[calc(100vh-3rem)] flex flex-col">

                {/* Page Header */}
                <div className="mb-4">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                            <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        Team Chat
                    </h1>
                    <p className="text-slate-500 font-medium">Real-time team communication</p>
                </div>

                {/* Layout */}
                <div className="flex flex-1 gap-4 min-h-0">

                    {/* ── Left Panel ───────────────────────────────────────── */}
                    <div className="w-72 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-slate-500" />
                                <h2 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Team Members</h2>
                                <span className="ml-auto text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{users.length}</span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-3 space-y-1">
                            {/* General channel */}
                            <button
                                onClick={() => setSelectedUser(null)}
                                className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-colors text-left ${
                                    !selectedUser ? "bg-blue-50 ring-2 ring-blue-200" : "hover:bg-slate-50"
                                }`}
                            >
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                                    <Hash className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-semibold ${!selectedUser ? "text-blue-700" : "text-slate-800"}`}>General</p>
                                    <p className="text-xs text-slate-400">Everyone</p>
                                </div>
                            </button>

                            <div className="my-2 border-t border-slate-100" />
                            <p className="px-1 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Direct Messages</p>

                            {isLoadingUsers
                                ? Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex items-center gap-3 p-2 rounded-xl animate-pulse">
                                        <div className="w-9 h-9 rounded-full bg-slate-200 flex-shrink-0" />
                                        <div className="flex-1 space-y-1">
                                            <div className="h-3 bg-slate-200 rounded w-3/4" />
                                            <div className="h-2 bg-slate-100 rounded w-1/2" />
                                        </div>
                                    </div>
                                ))
                                : users
                                    .filter((u) => u.userid !== currentUserId)
                                    .map((u) => {
                                        const isSelected  = selectedUser?.userid === u.userid;
                                        const hasUnread   = unreadSenders.has(u.userid);
                                        return (
                                            <button
                                                key={u.userid}
                                                onClick={() => handleSelectUser(u)}
                                                className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-colors text-left ${
                                                    isSelected ? "bg-blue-50 ring-2 ring-blue-200" : "hover:bg-slate-50"
                                                }`}
                                            >
                                                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(u.userid)} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                                    <span className="text-white text-xs font-bold">{getInitials(u.username)}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm font-semibold truncate ${isSelected ? "text-blue-700" : "text-slate-800"}`}>
                                                        {u.username}
                                                    </p>
                                                    <p className="text-xs text-slate-400 capitalize">{u.role}</p>
                                                </div>
                                                {/* Green dot — only shown when there are unread DMs from this user */}
                                                {hasUnread && (
                                                    <Circle className="w-2.5 h-2.5 fill-emerald-400 text-emerald-400 flex-shrink-0" />
                                                )}
                                            </button>
                                        );
                                    })
                            }
                        </div>
                    </div>

                    {/* ── Right Panel ──────────────────────────────────────── */}
                    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col min-h-0 overflow-hidden">

                        {/* Chat Header */}
                        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                            {selectedUser ? (
                                <>
                                    <button
                                        onClick={() => setSelectedUser(null)}
                                        className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors mr-1"
                                        title="Back to General"
                                    >
                                        <ArrowLeft className="w-4 h-4 text-slate-500" />
                                    </button>
                                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(selectedUser.userid)} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                        <span className="text-white text-xs font-bold">{getInitials(selectedUser.username)}</span>
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                            <Lock className="w-3 h-3 text-slate-400" />
                                            Chat with {selectedUser.username}
                                        </h2>
                                        <p className="text-xs text-slate-400">Private conversation</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-sm">
                                        <Hash className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-slate-900 text-sm">General</h2>
                                        <p className="text-xs text-slate-400">{users.length} members</p>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {isLoadingMessages ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />
                                        <p className="text-slate-400 text-sm">Loading messages...</p>
                                    </div>
                                </div>
                            ) : activeMessages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                                        <MessageSquare className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <p className="text-slate-500 font-semibold">
                                        {selectedUser ? `No messages with ${selectedUser.username} yet` : "No messages yet"}
                                    </p>
                                    <p className="text-slate-400 text-sm mt-1">Be the first to say something!</p>
                                </div>
                            ) : (
                                grouped.map((group) => (
                                    <div key={group.date}>
                                        <div className="flex items-center gap-3 my-4">
                                            <div className="flex-1 h-px bg-slate-100" />
                                            <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{group.date}</span>
                                            <div className="flex-1 h-px bg-slate-100" />
                                        </div>
                                        <div className="space-y-3">
                                            {group.msgs.map((msg) => (
                                                <MessageBubble
                                                    key={msg.id}
                                                    msg={msg}
                                                    currentUserId={currentUserId}
                                                    accentFrom={accentFrom}
                                                    accentTo={accentTo}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-slate-100">
                            <div className="flex items-center gap-3 bg-slate-50 rounded-2xl border-2 border-slate-100 px-4 py-2 focus-within:border-blue-300 focus-within:bg-white transition-all">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={
                                        selectedUser
                                            ? `Message ${selectedUser.username}...`
                                            : "Message General... (Enter to send)"
                                    }
                                    className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                                    disabled={isSending}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!newMessage.trim() || isSending}
                                    className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                                    title="Send message"
                                >
                                    <Send className="w-4 h-4 text-white" />
                                </button>
                            </div>
                            <p className="text-xs text-slate-400 mt-2 text-center">Press Enter to send</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
