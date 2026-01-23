"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Save,
    X,
    Calendar,
    Flag,
    Folder,
    AlignLeft,
    CheckSquare,
    AlertCircle,
    Edit,
    Trash2,
} from 'lucide-react';

// Mock user tasks data
const mockUserTasks = [
    { id: 1, title: "Design homepage mockup", description: "Create modern UI design", status: "Completed", priority: "High", dueDate: "2026-01-20", project: "Website Redesign" },
    { id: 2, title: "Implement responsive navbar", description: "Mobile-first approach", status: "Completed", priority: "High", dueDate: "2026-01-22", project: "Website Redesign" },
    { id: 3, title: "Create component library", description: "Reusable UI components", status: "In Progress", priority: "Medium", dueDate: "2026-02-05", project: "Website Redesign" },
    { id: 4, title: "Setup authentication flow", description: "OAuth and JWT implementation", status: "In Progress", priority: "High", dueDate: "2026-02-10", project: "Mobile App" },
    { id: 5, title: "User testing sessions", description: "Conduct usability tests", status: "Pending", priority: "Medium", dueDate: "2026-02-12", project: "Website Redesign" },
];

export default function UserEditTaskPage() {
    const params = useParams();
    const router = useRouter();
    const taskId = parseInt(params.id as string);
    const existingTask = mockUserTasks.find(t => t.id === taskId);

    const [formData, setFormData] = useState({
        title: existingTask?.title || '',
        description: existingTask?.description || '',
        priority: existingTask?.priority || 'Medium',
        status: existingTask?.status || 'Pending',
        dueDate: existingTask?.dueDate || '',
        project: existingTask?.project || '',
    });

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock submission - would normally update database
        console.log('Updating task:', { id: taskId, ...formData });
        router.push('/UserPanel/tasks');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDelete = () => {
        // Mock deletion - would normally call API
        console.log('Deleting task:', taskId);
        router.push('/UserPanel/tasks');
    };

    if (!existingTask) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-10 h-10 text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Task Not Found</h2>
                    <p className="text-slate-500 mb-6">The task you're trying to edit doesn't exist.</p>
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/UserPanel/tasks"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold mb-4 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to My Tasks
                    </Link>

                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-[2rem] p-8 shadow-2xl shadow-purple-500/20 relative overflow-hidden mb-6">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                    <Edit className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-black text-white tracking-tight">Edit Task</h1>
                                    <p className="text-white/90 font-medium mt-1">Update your task details</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="px-5 py-3 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-xl font-bold text-white transition-all flex items-center gap-2 border border-white/30"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Task Title */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                <CheckSquare className="w-4 h-4 text-purple-600" />
                                Task Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
                                required
                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900 placeholder:text-slate-400 focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all"
                            />
                        </div>

                        {/* Task Description */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                <AlignLeft className="w-4 h-4 text-purple-600" />
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter task description"
                                rows={4}
                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900 placeholder:text-slate-400 focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all resize-none"
                            />
                        </div>

                        {/* Priority and Status Row */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                    <Flag className="w-4 h-4 text-purple-600" />
                                    Priority *
                                </label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900 focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all cursor-pointer"
                                >
                                    <option value="Low">Low Priority</option>
                                    <option value="Medium">Medium Priority</option>
                                    <option value="High">High Priority</option>
                                </select>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                    <CheckSquare className="w-4 h-4 text-purple-600" />
                                    Status *
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900 focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all cursor-pointer"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                <Calendar className="w-4 h-4 text-purple-600" />
                                Due Date
                            </label>
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900 focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all"
                            />
                        </div>

                        {/* Project Selection */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                <Folder className="w-4 h-4 text-purple-600" />
                                Project
                            </label>
                            <select
                                name="project"
                                value={formData.project}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900 focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all cursor-pointer"
                            >
                                <option value="">Select a project (optional)</option>
                                <option value="Website Redesign">Website Redesign</option>
                                <option value="Mobile App">Mobile App Development</option>
                                <option value="Dashboard Analytics">Dashboard Analytics</option>
                            </select>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-6 border-t border-slate-100">
                            <Link
                                href="/UserPanel/tasks"
                                className="flex-1 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-2xl font-bold text-slate-700 text-center transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <X className="w-5 h-5" />
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-bold text-white hover:shadow-2xl hover:shadow-purple-300 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Save className="w-5 h-5" />
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-7 h-7 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 text-center mb-2">Delete Task?</h2>
                            <p className="text-slate-600 text-center mb-6">
                                Are you sure you want to delete "{existingTask.title}"? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
