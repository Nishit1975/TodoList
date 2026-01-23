"use client";

import React, { useState, useEffect } from "react";
import {
    Mail,
    Eye,
    Clock,
    User,
    AlertCircle,
    CheckCircle,
    Loader2,
    MessageSquare,
    Inbox,
    ArrowUpRight,
    Trash2
} from "lucide-react";

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

export default function ContactMessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [deleting, setDeleting] = useState<number | null>(null);

    // Fetch all contact messages
    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/contact");
            if (!response.ok) throw new Error("Failed to fetch messages");
            const data = await response.json();
            setMessages(data);
        } catch (err) {
            setError("Failed to load contact messages");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Mark message as read
    const markAsRead = async (message: ContactMessage) => {
        setSelectedMessage(message);

        if (!message.is_read) {
            try {
                await fetch(`/api/contact/${message.id}/read`, {
                    method: "PATCH",
                });
                // Update local state
                setMessages((prev) =>
                    prev.map((m) => (m.id === message.id ? { ...m, is_read: true } : m))
                );
            } catch (err) {
                console.error("Failed to mark as read:", err);
            }
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Delete a contact message
    const deleteMessage = async (messageId: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering markAsRead

        if (!confirm("Are you sure you want to delete this message?")) {
            return;
        }

        setDeleting(messageId);

        try {
            const response = await fetch(`/api/admin/contact-messages/${messageId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Remove from local state
                setMessages((prev) => prev.filter((m) => m.id !== messageId));
                // Clear selected message if it was deleted
                if (selectedMessage?.id === messageId) {
                    setSelectedMessage(null);
                }
            } else {
                const data = await response.json();
                alert(data.error || "Failed to delete message");
            }
        } catch (err) {
            console.error("Failed to delete message:", err);
            alert("Failed to delete message. Please try again.");
        } finally {
            setDeleting(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                    <p className="text-slate-600 font-medium">Loading messages...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center">
                <div className="flex items-center gap-3 text-rose-600 bg-rose-50 px-6 py-4 rounded-xl border border-rose-200">
                    <AlertCircle className="w-6 h-6" />
                    <span className="font-semibold">{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-8">
            <div className="max-w-7xl mx-auto">

                {/* Floating Header Card */}
                <div className="mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-[2rem] p-8 shadow-2xl shadow-purple-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="text-4xl font-black text-white tracking-tight">
                                    Contact Messages
                                </h1>
                            </div>
                            <p className="text-white/90 font-medium ml-16">
                                View and manage messages from the contact form
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-3 gap-4">
                    {[
                        {
                            title: "Total Messages",
                            value: messages.length,
                            icon: Inbox,
                            color: "from-indigo-500 to-purple-600",
                            bgColor: "bg-indigo-50",
                            textColor: "text-indigo-600"
                        },
                        {
                            title: "Unread",
                            value: messages.filter((m) => !m.is_read).length,
                            icon: AlertCircle,
                            color: "from-amber-500 to-orange-600",
                            bgColor: "bg-amber-50",
                            textColor: "text-amber-600"
                        },
                        {
                            title: "Read",
                            value: messages.filter((m) => m.is_read).length,
                            icon: CheckCircle,
                            color: "from-emerald-500 to-green-600",
                            bgColor: "bg-emerald-50",
                            textColor: "text-emerald-600"
                        }
                    ].map((stat, index) => (
                        <div key={index} className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                        <stat.icon className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <p className="text-slate-600 text-xs font-semibold mb-1 uppercase tracking-wide">{stat.title}</p>
                                <p className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-12 gap-6">

                    {/* Messages List */}
                    <div className="col-span-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-lg overflow-hidden">
                        <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                    <MessageSquare className="w-4 h-4 text-white" />
                                </div>
                                <h2 className="text-lg font-black text-slate-900">All Messages</h2>
                            </div>
                        </div>
                        <div className="max-h-[600px] overflow-y-auto">
                            {messages.length === 0 ? (
                                <div className="p-8 text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                                        <Inbox className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <p className="text-slate-500 font-medium">No contact messages yet</p>
                                </div>
                            ) : (
                                messages.map((message) => (
                                    <div
                                        key={message.id}
                                        onClick={() => markAsRead(message)}
                                        className={`p-4 border-b border-slate-100 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 ${!message.is_read ? "bg-gradient-to-r from-indigo-50/50 to-purple-50/50" : ""
                                            } ${selectedMessage?.id === message.id ? "bg-gradient-to-r from-indigo-100 to-purple-100 border-l-4 border-l-indigo-500" : ""}`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                                        <User className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="font-black text-slate-900 truncate">
                                                        {message.name}
                                                    </span>
                                                    {!message.is_read && (
                                                        <span className="w-2.5 h-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-slate-500 truncate mb-1 ml-10">
                                                    {message.email}
                                                </p>
                                                <p className="text-sm font-bold text-slate-700 truncate ml-10">
                                                    {message.subject}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`text-xs px-2.5 py-1 rounded-lg font-bold ${message.is_read
                                                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                                            : "bg-amber-100 text-amber-700 border border-amber-200"
                                                            }`}
                                                    >
                                                        {message.is_read ? "Read" : "New"}
                                                    </span>
                                                    <button
                                                        onClick={(e) => deleteMessage(message.id, e)}
                                                        disabled={deleting === message.id}
                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all disabled:opacity-50"
                                                        title="Delete message"
                                                    >
                                                        {deleting === message.id ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                </div>
                                                <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                                                    <Clock className="w-3 h-3" />
                                                    {formatDate(message.created_at).split(",")[0]}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Message Detail */}
                    <div className="col-span-7 bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-lg overflow-hidden">
                        <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                                    <Eye className="w-4 h-4 text-white" />
                                </div>
                                <h2 className="text-lg font-black text-slate-900">Message Details</h2>
                            </div>
                        </div>
                        {selectedMessage ? (
                            <div className="p-6">
                                <div className="space-y-5">
                                    {/* Sender Info Card */}
                                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                                                <User className="w-7 h-7 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xl font-black text-slate-900">{selectedMessage.name}</p>
                                                <a href={`mailto:${selectedMessage.email}`} className="text-indigo-600 font-medium hover:underline flex items-center gap-1">
                                                    {selectedMessage.email}
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            Subject
                                        </label>
                                        <p className="text-lg font-bold text-slate-900 mt-1 bg-slate-50 rounded-lg p-3 border border-slate-200">
                                            {selectedMessage.subject}
                                        </p>
                                    </div>

                                    {/* Date */}
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-sm font-medium">
                                            {formatDate(selectedMessage.created_at)}
                                        </span>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            Message
                                        </label>
                                        <div className="mt-2 p-5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 shadow-inner">
                                            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                                                {selectedMessage.message}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Delete Button */}
                                    <div className="pt-4 border-t border-slate-200">
                                        <button
                                            onClick={(e) => deleteMessage(selectedMessage.id, e)}
                                            disabled={deleting === selectedMessage.id}
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 text-rose-600 font-bold text-sm hover:bg-rose-100 border border-rose-200 transition-all disabled:opacity-50"
                                        >
                                            {deleting === selectedMessage.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="w-4 h-4" />
                                            )}
                                            Delete Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-12 text-center">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-10 h-10 text-slate-400" />
                                </div>
                                <p className="text-slate-500 font-medium text-lg">Select a message to view details</p>
                                <p className="text-slate-400 text-sm mt-1">Click on any message from the list</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
