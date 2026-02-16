"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    ArrowLeft,
    Folder,
    Calendar,
    Users,
    Target,
    Clock,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    DollarSign,
    CheckSquare,
} from 'lucide-react';

interface Task {
    id: number;
    name: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
}

interface TeamMember {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface ProjectDetail {
    id: number;
    name: string;
    description: string;
    status: string;
    priority: string;
    progress: number;
    startDate: string;
    dueDate: string;
    userRole: string;
    team: TeamMember[];
    tasks: {
        total: number;
        completed: number;
        inProgress: number;
        pending: number;
    };
    myTasks: Task[];
}

export default function UserProjectDetailPage() {
    const params = useParams();
    const projectId = parseInt(params.id as string);

    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProjectDetail();
    }, [projectId]);

    const fetchProjectDetail = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(`/api/user/projects/${projectId}`);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Project not found or you don\'t have access');
                }
                throw new Error('Failed to fetch project');
            }

            const data = await response.json();
            setProject(data);
        } catch (err: any) {
            console.error('Error fetching project:', err);
            setError(err.message || 'Failed to load project. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Toggle Task Complete
    const handleToggleTaskComplete = async (taskId: number, currentStatus: string) => {
        try {
            // Determine new status
            const newStatus = currentStatus === 'Completed' ? 'NOT_STARTED' : 'DONE';

            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: newStatus,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            // Refresh project data to show updated task
            await fetchProjectDetail();
        } catch (err) {
            console.error('Error toggling task:', err);
            alert('Failed to update task. Please try again.');
        }
    };

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
            'Planning': 'bg-purple-100 text-purple-700 border-purple-200',
            'Review': 'bg-orange-100 text-orange-700 border-orange-200',
            'Completed': 'bg-emerald-100 text-emerald-700 border-emerald-200',
            'On Hold': 'bg-slate-100 text-slate-700 border-slate-200',
            'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
            'Not Started': 'bg-purple-100 text-purple-700 border-purple-200',
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

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const getAvatarColor = (index: number) => {
        const colors = [
            'bg-blue-500',
            'bg-purple-500',
            'bg-emerald-500',
            'bg-orange-500',
            'bg-pink-500',
            'bg-teal-500',
            'bg-indigo-500',
            'bg-rose-500',
        ];
        return colors[index % colors.length];
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 font-medium">Loading project...</p>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-10 h-10 text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">
                        {error || 'Project Not Found'}
                    </h2>
                    <p className="text-slate-500 mb-6">
                        {error || 'The project you\'re looking for doesn\'t exist or you don\'t have access.'}
                    </p>
                    <Link
                        href="/UserPanel/projects"
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-bold text-white hover:shadow-xl transition-all inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/UserPanel/projects"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold mb-4 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Projects
                    </Link>

                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl">
                                <Folder className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-4xl font-black text-slate-900 mb-3">{project.name}</h1>
                                <p className="text-slate-600 text-lg mb-4">{project.description}</p>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(project.status)}`}>
                                        {project.status}
                                    </span>
                                    <span className={`text-sm font-black flex items-center gap-1 ${getPriorityColor(project.priority)}`}>
                                        <Target className="w-4 h-4" />
                                        {project.priority} Priority
                                    </span>
                                    <span className="px-4 py-2 rounded-full text-sm font-bold bg-blue-100 text-blue-700 border-2 border-blue-200">
                                        Your Role: {project.userRole}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-500 text-sm font-bold">Progress</span>
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">{project.progress}%</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-500 text-sm font-bold">My Tasks</span>
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                                    <CheckSquare className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">{project.myTasks.length}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-500 text-sm font-bold">Team</span>
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">{project.team.length}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-500 text-sm font-bold">Due Date</span>
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <p className="text-lg font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">{project.dueDate || 'Not set'}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {/* My Tasks */}
                    <div className="col-span-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white">
                            <h2 className="text-2xl font-black text-slate-900 mb-6">My Tasks in This Project</h2>

                            {project.myTasks.length === 0 ? (
                                <div className="text-center py-12">
                                    <CheckSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-500 font-medium">No tasks assigned to you yet</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {project.myTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="relative group"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                                            <div className="relative bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl p-4 hover:border-purple-300 transition-all duration-300">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-3 flex-1">
                                                        <div
                                                            className="w-5 h-5 rounded border-2 border-slate-300 flex items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                                                            onClick={() => handleToggleTaskComplete(task.id, task.status)}
                                                            title={task.status === 'Completed' ? 'Mark as incomplete' : 'Mark as complete'}
                                                        >
                                                            {task.status === 'Completed' && (
                                                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-black text-slate-900">{task.name}</h3>
                                                            {task.description && (
                                                                <p className="text-sm text-slate-500 mt-1">{task.description}</p>
                                                            )}
                                                            <div className="flex items-center gap-3 mt-2">
                                                                <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${getStatusColor(task.status)}`}>
                                                                    {task.status}
                                                                </span>
                                                                {task.dueDate && (
                                                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                                                        <Calendar className="w-3 h-3" />
                                                                        {task.dueDate}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className={`text-xs font-black ${getPriorityColor(task.priority)}`}>
                                                        {task.priority}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Project Info Sidebar */}
                    <div className="col-span-4 space-y-6">
                        {/* Team Members */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white">
                            <h2 className="text-xl font-black text-slate-900 mb-4">Team Members</h2>
                            <div className="space-y-3">
                                {project.team.map((member, idx) => (
                                    <div
                                        key={member.id}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all"
                                    >
                                        <div className={`w-10 h-10 rounded-xl ${getAvatarColor(idx)} flex items-center justify-center text-white font-bold shadow-md`}>
                                            {getInitials(member.name)}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-slate-900 text-sm">{member.name}</p>
                                            <p className="text-xs text-slate-500">{member.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Project Details */}
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 shadow-xl text-white">
                            <h3 className="text-lg font-black mb-4">Project Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-white/10">
                                    <span className="text-sm text-white/70">Total Tasks</span>
                                    <span className="font-bold">{project.tasks.total}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-white/10">
                                    <span className="text-sm text-white/70">Completed</span>
                                    <span className="font-bold">{project.tasks.completed}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-white/10">
                                    <span className="text-sm text-white/70">In Progress</span>
                                    <span className="font-bold">{project.tasks.inProgress}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-white/10">
                                    <span className="text-sm text-white/70">Start Date</span>
                                    <span className="font-bold">{project.startDate || 'Not set'}</span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-sm text-white/70">Due Date</span>
                                    <span className="font-bold">{project.dueDate || 'Not set'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
