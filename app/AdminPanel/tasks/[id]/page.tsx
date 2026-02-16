"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Calendar,
    User,
    Flag,
    Folder,
    Clock,
    CheckSquare,
    AlertCircle,
    Edit,
    MessageSquare,
    History,
    Trash2,
    Loader2,
} from 'lucide-react';

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignee: string;
    assigneeId: number;
    dueDate: string;
    project: string;
    createdAt: Date | null;
    createdBy: string;
    createdById: number;
    subtasks?: any[];
    comments?: any[];
}

export default function TaskDetailPage() {
    const params = useParams();
    const router = useRouter();
    const taskId = parseInt(params.id as string);

    const [task, setTask] = useState<Task | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchTask();
    }, [taskId]);

    const fetchTask = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(`/api/tasks/${taskId}`);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Task not found');
                }
                throw new Error('Failed to fetch task');
            }

            const data = await response.json();
            setTask(data);
        } catch (err) {
            console.error('Error fetching task:', err);
            setError(err instanceof Error ? err.message : 'Failed to load task');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteTask = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`/ api / tasks / ${taskId} `, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            // Redirect to tasks list
            router.push('/AdminPanel/tasks');
            router.refresh();
        } catch (err) {
            console.error('Error deleting task:', err);
            alert('Failed to delete task. Please try again.');
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            'IN_PROGRESS': 'bg-blue-100 text-blue-700 border-blue-200',
            'NOT_STARTED': 'bg-yellow-100 text-yellow-700 border-yellow-200',
            'DONE': 'bg-emerald-100 text-emerald-700 border-emerald-200',
            'IN_REVIEW': 'bg-purple-100 text-purple-700 border-purple-200',
        };
        return colors[status] || 'bg-slate-100 text-slate-700';
    };

    const getStatusDisplay = (status: string) => {
        const displayMap: { [key: string]: string } = {
            'NOT_STARTED': 'Pending',
            'IN_PROGRESS': 'In Progress',
            'IN_REVIEW': 'In Review',
            'DONE': 'Completed',
        };
        return displayMap[status] || status;
    };

    const getPriorityColor = (priority: string) => {
        const colors: { [key: string]: string } = {
            'HIGH': 'text-red-600',
            'MEDIUM': 'text-orange-600',
            'LOW': 'text-emerald-600'
        };
        return colors[priority] || 'text-slate-600';
    };

    const getPriorityDisplay = (priority: string) => {
        return priority.charAt(0) + priority.slice(1).toLowerCase();
    };

    const formatDate = (date: Date | string | null) => {
        if (!date) return 'Not set';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 font-medium">Loading task...</p>
                </div>
            </div>
        );
    }

    // Error or not found
    if (error || !task) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-10 h-10 text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Task Not Found</h2>
                    <p className="text-slate-500 mb-6">{error || "The task you're looking for doesn't exist."}</p>
                    <Link
                        href="/AdminPanel/tasks"
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-white hover:shadow-xl transition-all inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Tasks
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/AdminPanel/tasks"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold mb-4 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Tasks
                    </Link>

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`px - 4 py - 2 rounded - full text - sm font - bold border - 2 ${getStatusColor(task.status)} `}>
                                        {getStatusDisplay(task.status)}
                                    </span>
                                    <span className={`text - sm font - black flex items - center gap - 1 ${getPriorityColor(task.priority)} `}>
                                        <Flag className="w-4 h-4" />
                                        {getPriorityDisplay(task.priority)} Priority
                                    </span>
                                </div>
                                <h1 className="text-4xl font-black text-slate-900 mb-3">{task.title}</h1>
                                <p className="text-slate-600 text-lg leading-relaxed">{task.description || 'No description provided'}</p>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    href={`/ AdminPanel / tasks / edit / ${task.id} `}
                                    className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white hover:shadow-xl transition-all flex items-center gap-2"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="px-5 py-3 bg-red-600 rounded-xl font-bold text-white hover:bg-red-700 hover:shadow-xl transition-all flex items-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {/* Main Content */}
                    <div className="col-span-8 space-y-6">
                        {/* Task Details Card */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                <CheckSquare className="w-5 h-5 text-blue-600" />
                                Task Details
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-xl">
                                    <div className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-1">
                                        <User className="w-4 h-4" />
                                        Assigned To
                                    </div>
                                    <p className="text-slate-900 font-black">{task.assignee}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl">
                                    <div className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-1">
                                        <Calendar className="w-4 h-4" />
                                        Due Date
                                    </div>
                                    <p className="text-slate-900 font-black">{task.dueDate || 'Not set'}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl">
                                    <div className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-1">
                                        <Folder className="w-4 h-4" />
                                        Project
                                    </div>
                                    <p className="text-slate-900 font-black">{task.project || 'No project'}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl">
                                    <div className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-1">
                                        <Clock className="w-4 h-4" />
                                        Created
                                    </div>
                                    <p className="text-slate-900 font-black">{formatDate(task.createdAt)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Subtasks Section (if available) */}
                        {task.subtasks && task.subtasks.length > 0 && (
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <CheckSquare className="w-5 h-5 text-blue-600" />
                                    Subtasks ({task.subtasks.length})
                                </h2>
                                <div className="space-y-2">
                                    {task.subtasks.map((subtask: any) => (
                                        <div key={subtask.subtask_id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                            <input
                                                type="checkbox"
                                                checked={subtask.completed || false}
                                                readOnly
                                                className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                                            />
                                            <span className={`flex - 1 ${subtask.completed ? 'line-through text-slate-400' : 'text-slate-900 font-medium'} `}>
                                                {subtask.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="col-span-4 space-y-6">
                        {/* Task Information */}
                        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-6 shadow-xl text-white">
                            <h3 className="text-lg font-black mb-4">Task Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-white/10">
                                    <span className="text-sm text-white/70">Created By</span>
                                    <span className="font-bold">{task.createdBy}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-white/10">
                                    <span className="text-sm text-white/70">Created On</span>
                                    <span className="font-bold">{formatDate(task.createdAt)}</span>
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

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center">
                                <Trash2 className="w-7 h-7 text-red-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Delete Task</h2>
                                <p className="text-slate-500 text-sm">This action cannot be undone</p>
                            </div>
                        </div>
                        <p className="text-slate-700 mb-6">
                            Are you sure you want to delete "<span className="font-bold">{task.title}</span>"? All related data will be permanently removed.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                disabled={isDeleting}
                                className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteTask}
                                disabled={isDeleting}
                                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-5 h-5" />
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
