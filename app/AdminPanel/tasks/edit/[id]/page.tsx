"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Save,
    X,
    Calendar,
    User,
    Flag,
    Folder,
    AlignLeft,
    CheckSquare,
    AlertCircle,
    Edit,
    Trash2,
} from 'lucide-react';

interface User {
    userid: number;
    username: string;
}

interface Project {
    id: number;
    name: string;
}

export default function EditTaskPage() {
    const params = useParams();
    const router = useRouter();
    const taskId = parseInt(params.id as string);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'MEDIUM',
        status: 'NOT_STARTED',
        assigneeId: '',
        dueDate: '',
        projectId: '',
    });

    const [users, setUsers] = useState<User[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        fetchTaskData();
        fetchUsers();
        fetchProjects();
    }, [taskId]);

    const fetchTaskData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/tasks/${taskId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch task');
            }

            const task = await response.json();

            // Convert status and priority to match form options
            const statusMap: { [key: string]: string } = {
                'Completed': 'DONE',
                'In Progress': 'IN_PROGRESS',
                'Pending': 'NOT_STARTED',
            };

            setFormData({
                title: task.title || '',
                description: task.description || '',
                priority: task.priority || 'MEDIUM',
                status: statusMap[task.status] || task.status || 'NOT_STARTED',
                assigneeId: task.assigneeId?.toString() || '',
                dueDate: task.dueDateRaw ? new Date(task.dueDateRaw).toISOString().split('T')[0] : '',
                projectId: task.projectId?.toString() || '',
            });
        } catch (err: any) {
            console.error('Error fetching task:', err);
            setError(err.message || 'Failed to load task');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (err) {
            console.error('Error fetching projects:', err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    status: formData.status,
                    priority: formData.priority,
                    assigneeId: formData.assigneeId ? parseInt(formData.assigneeId) : null,
                    projectId: formData.projectId ? parseInt(formData.projectId) : null,
                    dueDate: formData.dueDate || null,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to update task');
            }

            alert('Task updated successfully!');
            router.push('/AdminPanel/tasks');
        } catch (err: any) {
            console.error('Error updating task:', err);
            alert(err.message || 'Failed to update task. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            alert('Task deleted successfully!');
            router.push('/AdminPanel/tasks');
        } catch (err) {
            console.error('Error deleting task:', err);
            alert('Failed to delete task. Please try again.');
        }
    };

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

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-10 h-10 text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Task Not Found</h2>
                    <p className="text-slate-500 mb-6">{error}</p>
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
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/AdminPanel/tasks"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold mb-4 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Tasks
                    </Link>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">
                                <Edit className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Edit Task</h1>
                                <p className="text-slate-500 font-medium mt-1">Update task details</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="px-5 py-3 bg-red-50 hover:bg-red-100 rounded-xl font-bold text-red-600 transition-all flex items-center gap-2 border border-red-200"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </button>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Task Title */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                <CheckSquare className="w-4 h-4 text-blue-600" />
                                Task Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
                                required
                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                            />
                        </div>

                        {/* Task Description */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                <AlignLeft className="w-4 h-4 text-blue-600" />
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter task description"
                                rows={4}
                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all resize-none"
                            />
                        </div>

                        {/* Priority and Status Row */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                    <Flag className="w-4 h-4 text-blue-600" />
                                    Priority *
                                </label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer"
                                >
                                    <option value="LOW">Low Priority</option>
                                    <option value="MEDIUM">Medium Priority</option>
                                    <option value="HIGH">High Priority</option>
                                </select>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                    <CheckSquare className="w-4 h-4 text-blue-600" />
                                    Status *
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer"
                                >
                                    <option value="NOT_STARTED">Pending</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="DONE">Completed</option>
                                </select>
                            </div>
                        </div>

                        {/* Assignee and Due Date Row */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                    <User className="w-4 h-4 text-blue-600" />
                                    Assign To
                                </label>
                                <select
                                    name="assigneeId"
                                    value={formData.assigneeId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer"
                                >
                                    <option value="">Select user (optional)</option>
                                    {users.map(user => (
                                        <option key={user.userid} value={user.userid}>
                                            {user.username}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                                />
                            </div>
                        </div>

                        {/* Project Selection */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                <Folder className="w-4 h-4 text-blue-600" />
                                Project
                            </label>
                            <select
                                name="projectId"
                                value={formData.projectId}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer"
                            >
                                <option value="">Select a project (optional)</option>
                                {projects.map(project => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-6 border-t border-slate-100">
                            <Link
                                href="/AdminPanel/tasks"
                                className="flex-1 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-2xl font-bold text-slate-700 text-center transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <X className="w-5 h-5" />
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-white hover:shadow-2xl hover:shadow-blue-300 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save className="w-5 h-5" />
                                {isSaving ? 'Saving...' : 'Save Changes'}
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
                                Are you sure you want to delete "{formData.title}"? This action cannot be undone.
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
