"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    ArrowLeft,
    Calendar,
    Flag,
    Folder,
    Clock,
    CheckSquare,
    AlertCircle,
    Edit,
    MessageSquare,
    History,
    Send,
} from 'lucide-react';

// Mock user tasks data
const mockUserTasks = [
    {
        id: 1,
        title: "Design homepage mockup",
        description: "Create modern UI design for the new company homepage. Focus on clean aesthetics, responsive layouts, and brand consistency. Include mobile and desktop versions.",
        status: "Completed",
        priority: "High",
        dueDate: "Jan 20, 2026",
        project: "Website Redesign",
        createdAt: "Jan 10, 2026",
        tags: ["Design", "UI/UX", "Homepage"]
    },
    {
        id: 2,
        title: "Implement responsive navbar",
        description: "Mobile-first approach with hamburger menu for mobile devices and full navbar for desktop. Include dropdown menus for main navigation items.",
        status: "Completed",
        priority: "High",
        dueDate: "Jan 22, 2026",
        project: "Website Redesign",
        createdAt: "Jan 12, 2026",
        tags: ["Development", "Frontend", "Mobile"]
    },
    {
        id: 3,
        title: "Create component library",
        description: "Build reusable UI components for the design system. Include buttons, forms, cards, and navigation elements with proper documentation.",
        status: "In Progress",
        priority: "Medium",
        dueDate: "Feb 5, 2026",
        project: "Website Redesign",
        createdAt: "Jan 15, 2026",
        tags: ["Design System", "Components", "Documentation"]
    },
];

// Mock comments
const mockComments = [
    { id: 1, author: "You", avatar: "YO", text: "Started working on the initial mockup. Making good progress!", timestamp: "2 hours ago", color: "bg-purple-500" },
    { id: 2, author: "Sarah Chen", avatar: "SC", text: "Great work! Keep it up. Let me know if you need any help.", timestamp: "1 hour ago", color: "bg-blue-500" },
];

// Mock change history
const mockHistory = [
    { id: 1, action: "Status updated", from: "In Progress", to: "Completed", timestamp: "10 min ago" },
    { id: 2, action: "Due date changed", from: "Jan 18, 2026", to: "Jan 20, 2026", timestamp: "2 hours ago" },
    { id: 3, action: "Priority updated", from: "Medium", to: "High", timestamp: "1 day ago" },
    { id: 4, action: "Task created", from: "", to: "", timestamp: "Jan 10, 2026" },
];

export default function UserTaskDetailPage() {
    const params = useParams();
    const taskId = parseInt(params.id as string);
    const task = mockUserTasks.find(t => t.id === taskId);

    const [newComment, setNewComment] = useState('');

    if (!task) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-10 h-10 text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Task Not Found</h2>
                    <p className="text-slate-500 mb-6">The task you're looking for doesn't exist.</p>
                    <Link
                        href="/UserPanel/tasks"
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-bold text-white hover:shadow-xl transition-all inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to My Tasks
                    </Link>
                </div>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
            'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
            'Completed': 'bg-emerald-100 text-emerald-700 border-emerald-200',
        };
        return colors[status] || 'bg-slate-100 text-slate-700';
    };

    const getPriorityColor = (priority: string) => {
        const colors: { [key: string]: string } = {
            'High': 'text-red-600',
            'Medium': 'text-orange-600',
            'Low': 'text-emerald-600'
        };
        return colors[priority] || 'text-slate-600';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/UserPanel/tasks"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold mb-4 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to My Tasks
                    </Link>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(task.status)}`}>
                                            {task.status}
                                        </span>
                                        <span className={`text-sm font-black flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                                            <Flag className="w-4 h-4" />
                                            {task.priority} Priority
                                        </span>
                                    </div>
                                    <h1 className="text-4xl font-black text-slate-900 mb-3">{task.title}</h1>
                                    <p className="text-slate-600 text-lg leading-relaxed">{task.description}</p>
                                </div>
                                <Link
                                    href={`/UserPanel/tasks/edit/${task.id}`}
                                    className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-white hover:shadow-xl transition-all flex items-center gap-2"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </Link>
                            </div>

                            {/* Tags */}
                            {task.tags && (
                                <div className="flex items-center gap-2 flex-wrap">
                                    {task.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {/* Main Content */}
                    <div className="col-span-8 space-y-6">
                        {/* Task Details Card */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white">
                                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <CheckSquare className="w-5 h-5 text-purple-600" />
                                    Task Details
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-1">
                                            <Calendar className="w-4 h-4" />
                                            Due Date
                                        </div>
                                        <p className="text-slate-900 font-black">{task.dueDate}</p>
                                    </div>
                                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-1">
                                            <Folder className="w-4 h-4" />
                                            Project
                                        </div>
                                        <p className="text-slate-900 font-black">{task.project}</p>
                                    </div>
                                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 col-span-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-1">
                                            <Clock className="w-4 h-4" />
                                            Created
                                        </div>
                                        <p className="text-slate-900 font-black">{task.createdAt}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white">
                                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-purple-600" />
                                    Comments ({mockComments.length})
                                </h2>

                                {/* Comment List */}
                                <div className="space-y-4 mb-6">
                                    {mockComments.map((comment) => (
                                        <div key={comment.id} className="flex gap-3">
                                            <div className={`w-10 h-10 rounded-full ${comment.color} flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg`}>
                                                {comment.avatar}
                                            </div>
                                            <div className="flex-1">
                                                <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 border border-slate-100">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-bold text-slate-900">{comment.author}</span>
                                                        <span className="text-xs text-slate-500">{comment.timestamp}</span>
                                                    </div>
                                                    <p className="text-slate-700">{comment.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Add Comment */}
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg">
                                        YO
                                    </div>
                                    <div className="flex-1">
                                        <textarea
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            placeholder="Write a comment..."
                                            rows={3}
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900 placeholder:text-slate-400 focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all resize-none"
                                        />
                                        <div className="mt-2 flex justify-end">
                                            <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-white hover:shadow-lg transition-all flex items-center gap-2">
                                                <Send className="w-4 h-4" />
                                                Post Comment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="col-span-4 space-y-6">
                        {/* Change History */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white">
                                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <History className="w-5 h-5 text-purple-600" />
                                    Activity
                                </h2>
                                <div className="space-y-3">
                                    {mockHistory.map((item, idx) => (
                                        <div key={item.id} className="relative pl-6 pb-4">
                                            {idx !== mockHistory.length - 1 && (
                                                <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-slate-200"></div>
                                            )}
                                            <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-purple-600 border-2 border-white shadow-sm"></div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{item.action}</p>
                                                {item.from && (
                                                    <p className="text-xs text-slate-500 mt-1">
                                                        <span className="line-through">{item.from}</span> → <span className="text-purple-600 font-semibold">{item.to}</span>
                                                    </p>
                                                )}
                                                <p className="text-xs text-slate-400 mt-1">{item.timestamp}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="relative">
                                <h3 className="text-lg font-black mb-4">Task Information</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                                        <span className="text-sm text-white/70">Created On</span>
                                        <span className="font-bold">{task.createdAt}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                                        <span className="text-sm text-white/70">Status</span>
                                        <span className="font-bold">{task.status}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-sm text-white/70">Task ID</span>
                                        <span className="font-bold font-mono">#{task.id.toString().padStart(4, '0')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
