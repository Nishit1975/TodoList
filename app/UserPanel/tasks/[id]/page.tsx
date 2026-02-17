"use client";

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
    project: string;
}

export default function UserTaskDetailPage() {
    const params = useParams();
    const taskId = parseInt(params.id as string);

    const [task, setTask] = useState<Task | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTask();
    }, [taskId]);

    const fetchTask = async () => {
        try {
            setIsLoading(true);
            // Use secure API that validates ownership
            const response = await fetch(`/api/user/tasks/${taskId}`);

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('You do not have permission to view this task');
                }
                throw new Error('Task not found');
            }

            const data = await response.json();
            setTask(data);
        } catch (err: any) {
            console.error('Error fetching task:', err);
            setError(err.message || 'Failed to load task');
        } finally {
            setIsLoading(false);
        }
    };

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
            'HIGH': 'text-red-600',
            'Medium': 'text-orange-600',
            'MEDIUM': 'text-orange-600',
            'Low': 'text-emerald-600',
            'LOW': 'text-emerald-600',
        };
        return colors[priority] || 'text-slate-600';
    };

    //Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 font-medium">Loading task...</p>
                </div>
            </div>
        );
    }

    // Error or Task Not Found
    if (error || !task) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-10 h-10 text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Task Not Found</h2>
                    <p className="text-slate-500 mb-6">{error || "The task you're looking for doesn't exist."}</p>
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
                                    <p className="text-slate-600 text-lg leading-relaxed">{task.description || "No description provided."}</p>
                                </div>
                                <Link
                                    href={`/UserPanel/tasks/edit/${task.id}`}
                                    className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-white hover:shadow-xl transition-all flex items-center gap-2"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Task Details Card */}
                <div className="relative group mb-6">
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
                                <p className="text-slate-900 font-black">{task.dueDate || "No due date"}</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                                <div className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-1">
                                    <Folder className="w-4 h-4" />
                                    Project
                                </div>
                                <p className="text-slate-900 font-black">{task.project}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative">
                        <h3 className="text-lg font-black mb-4">Task Information</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-2 border-b border-white/10">
                                <span className="text-sm text-white/70">Status</span>
                                <span className="font-bold">{task.status}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-white/10">
                                <span className="text-sm text-white/70">Priority</span>
                                <span className="font-bold">{task.priority}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-white/70">Task ID</span>
                                <span className="font-bold font-mono">#{task.id.toString().padStart(4, '0')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Help Note */}
                <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-blue-900 text-sm mb-1">Update Task Status</h3>
                            <p className="text-blue-700 text-xs">
                                To update the status of this task, go back to your tasks board and drag it between "Pending", "In Progress", and "Completed" columns.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
