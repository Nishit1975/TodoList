"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Save,
    X,
    Calendar,
    Flag,
    Folder,
    AlignLeft,
    CheckSquare,
    Sparkles,
    Plus,
} from 'lucide-react';

export default function UserCreateTaskPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Pending',
        dueDate: '',
        project: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock submission - would normally save to database
        console.log('Creating task:', formData);
        router.push('/UserPanel/tasks');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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
                        <div className="relative z-10 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                <Plus className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-white tracking-tight">Create New Task</h1>
                                <p className="text-white/90 font-medium mt-1">Add a new task to your personal list</p>
                            </div>
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
                                Create Task
                            </button>
                        </div>
                    </form>
                </div>

                {/* Help Card */}
                <div className="relative group mt-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg">
                        <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            Tips for Creating Tasks
                        </h3>
                        <ul className="space-y-1 text-sm text-slate-600">
                            <li>• Use clear, action-oriented titles for better organization</li>
                            <li>• Set realistic due dates to manage your time effectively</li>
                            <li>• Use priority levels to focus on what matters most</li>
                            <li>• Link tasks to projects to track progress holistically</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
