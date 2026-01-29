"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Folder,
    Calendar,
    Users,
    Target,
    Clock,
    CheckCircle2,
    AlertCircle,
    MoreVertical,
    Edit,
    Trash2,
    Plus,
    TrendingUp,
    DollarSign,
    UserPlus,
    X,
    Star,
    Circle,
    CheckSquare,
    Sparkles,
} from 'lucide-react';

// Type definitions
interface TeamMember {
    name: string;
    avatar: string;
    color: string;
    role: string;
}

interface Task {
    id: number;
    name: string;
    status: string;
    priority: string;
    assignee: string;
    dueDate: string;
    description?: string;
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
    team: TeamMember[];
    tasks: {
        total: number;
        completed: number;
        inProgress: number;
        pending: number;
    };
    tasksList: Task[];
    budget: string;
    category: string;
}

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = parseInt(params.id as string);

    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // State for real data from API
    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Form state for editing
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'Not Started',
        priority: 'Medium',
        startDate: '',
        dueDate: '',
    });

    // Fetch project data from API
    useEffect(() => {
        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    const fetchProject = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(`/api/projects/${projectId}`);

            if (response.status === 404) {
                setError('not_found');
                setProject(null);
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch project');
            }

            const data = await response.json();
            setProject(data);
        } catch (err) {
            console.error('Error fetching project:', err);
            setError('Failed to load project. Please try again.');
            setProject(null);
        } finally {
            setIsLoading(false);
        }
    };

    // Open Edit Modal
    const openEditModal = () => {
        if (!project) return;

        // Convert display dates back to YYYY-MM-DD format for input
        const startDate = project.startDate ? formatDateForInput(project.startDate) : '';
        const dueDate = project.dueDate ? formatDateForInput(project.dueDate) : '';

        setFormData({
            name: project.name,
            description: project.description,
            status: project.status,
            priority: project.priority,
            startDate,
            dueDate,
        });
        setShowEditModal(true);
    };

    // Handle Update Project
    const handleUpdateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!project) return;

        setIsSaving(true);

        try {
            const response = await fetch(`/api/projects/${project.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update project');
            }

            // Success - refresh project data and close modal
            await fetchProject();
            setShowEditModal(false);
        } catch (err) {
            console.error('Error updating project:', err);
            alert('Failed to update project. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    // Handle Delete Project
    const handleDeleteProject = async () => {
        if (!project) return;

        setIsSaving(true);

        try {
            const response = await fetch(`/api/projects/${project.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete project');
            }

            // Success - redirect to projects list
            router.push('/AdminPanel/projects');
        } catch (err) {
            console.error('Error deleting project:', err);
            alert('Failed to delete project. Please try again.');
            setIsSaving(false);
        }
    };

    const formatDateForInput = (dateStr: string): string => {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            return date.toISOString().split('T')[0];
        } catch {
            return '';
        }
    };

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            'Not Started': 'bg-purple-100 text-purple-700 border-purple-200',
            'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
            'Review': 'bg-orange-100 text-orange-700 border-orange-200',
            'Completed': 'bg-emerald-100 text-emerald-700 border-emerald-200',
            'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200'
        };
        return colors[status] || 'bg-slate-100 text-slate-700';
    };

    const getPriorityColor = (priority: string) => {
        const colors: { [key: string]: string } = {
            'High': 'text-red-600',
            'Medium': 'text-orange-600',
            'Low': 'text-emerald-600',
            'HIGH': 'text-red-600',
            'MEDIUM': 'text-orange-600',
            'LOW': 'text-emerald-600'
        };
        return colors[priority] || 'text-slate-600';
    };

    // Loading State
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 font-medium">Loading project...</p>
                </div>
            </div>
        );
    }

    // Error State - Project Not Found
    if (error === 'not_found' || !project) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-10 h-10 text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Project Not Found</h2>
                    <p className="text-slate-500 mb-6">The project you're looking for doesn't exist.</p>
                    <Link
                        href="/AdminPanel/projects"
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-white hover:shadow-xl transition-all inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    // Error State - General Error
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-8">
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                        <div>
                            <h3 className="font-bold text-red-900 text-lg">Error Loading Project</h3>
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={fetchProject}
                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
                        >
                            Retry
                        </button>
                        <Link
                            href="/AdminPanel/projects"
                            className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors text-center"
                        >
                            Go Back
                        </Link>
                    </div>
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
                        href="/AdminPanel/projects"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold mb-4 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Projects
                    </Link>

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">
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
                                        {project.budget && (
                                            <span className="text-sm font-bold text-slate-500 flex items-center gap-1 bg-slate-100 px-3 py-2 rounded-lg">
                                                <DollarSign className="w-4 h-4" />
                                                {project.budget}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={openEditModal}
                                    className="p-3 hover:bg-slate-100 rounded-xl transition-colors"
                                    title="Edit Project"
                                >
                                    <Edit className="w-5 h-5 text-slate-600" />
                                </button>
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="p-3 hover:bg-red-50 rounded-xl transition-colors"
                                    title="Delete Project"
                                >
                                    <Trash2 className="w-5 h-5 text-red-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-slate-500 text-sm font-bold">Progress</span>
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-black text-slate-900 mb-2">{project.progress}%</p>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                style={{ width: `${project.progress}%` }}
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-slate-500 text-sm font-bold">Total Tasks</span>
                            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                <CheckSquare className="w-5 h-5 text-purple-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-black text-slate-900">{project.tasks.total}</p>
                        <p className="text-sm text-slate-500 mt-1">
                            {project.tasks.completed} completed
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-slate-500 text-sm font-bold">Team Size</span>
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                <Users className="w-5 h-5 text-emerald-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-black text-slate-900">{project.team.length}</p>
                        <p className="text-sm text-slate-500 mt-1">members</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-slate-500 text-sm font-bold">Due Date</span>
                            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-orange-600" />
                            </div>
                        </div>
                        <p className="text-xl font-black text-slate-900">{project.dueDate || 'Not set'}</p>
                        <p className="text-sm text-slate-500 mt-1">Started {project.startDate || 'N/A'}</p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {/* Task List */}
                    <div className="col-span-8">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black text-slate-900">Tasks</h2>
                                <button
                                    onClick={() => setShowAddTaskModal(true)}
                                    className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white hover:shadow-xl transition-all flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Task
                                </button>
                            </div>

                            {/* Task Tabs */}
                            <div className="flex gap-2 mb-6 border-b border-slate-100">
                                <button className="px-4 py-2.5 font-bold text-sm border-b-2 border-blue-600 text-blue-600">
                                    All ({project.tasks.total})
                                </button>
                                <button className="px-4 py-2.5 font-bold text-sm text-slate-500 hover:text-slate-700">
                                    Completed ({project.tasks.completed})
                                </button>
                                <button className="px-4 py-2.5 font-bold text-sm text-slate-500 hover:text-slate-700">
                                    In Progress ({project.tasks.inProgress})
                                </button>
                                <button className="px-4 py-2.5 font-bold text-sm text-slate-500 hover:text-slate-700">
                                    Pending ({project.tasks.pending})
                                </button>
                            </div>

                            {/* Task List */}
                            <div className="space-y-3">
                                {project.tasksList && project.tasksList.length > 0 ? (
                                    project.tasksList.map((task) => (
                                        <div
                                            key={task.id}
                                            className="p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-3 flex-1">
                                                    <div className="w-5 h-5 rounded border-2 border-slate-300 flex items-center justify-center">
                                                        {task.status === 'Completed' && (
                                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-slate-900">{task.name}</h3>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${getStatusColor(task.status)}`}>
                                                                {task.status}
                                                            </span>
                                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                                <Users className="w-3 h-3" />
                                                                {task.assignee}
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
                                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                                    <MoreVertical className="w-4 h-4 text-slate-400" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <CheckSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                        <p className="text-slate-500 font-medium">No tasks yet</p>
                                        <p className="text-slate-400 text-sm">Create your first task to get started</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Team Members */}
                    <div className="col-span-4">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-black text-slate-900">Team Members</h2>
                                <button
                                    onClick={() => setShowAddMemberModal(true)}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <UserPlus className="w-5 h-5 text-blue-600" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {project.team && project.team.length > 0 ? (
                                    project.team.map((member, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all"
                                        >
                                            <div className={`w-10 h-10 rounded-xl ${member.color} flex items-center justify-center text-white font-bold shadow-md`}>
                                                {member.avatar}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-slate-900 text-sm">{member.name}</p>
                                                <p className="text-xs text-slate-500">{member.role}</p>
                                            </div>
                                            <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                                                <MoreVertical className="w-4 h-4 text-slate-400" />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                                        <p className="text-slate-500 text-sm">No team members</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Project Info */}
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 shadow-xl text-white mt-6">
                            <h3 className="text-lg font-black mb-4">Project Details</h3>
                            <div className="space-y-3">
                                {project.category && (
                                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                                        <span className="text-sm text-white/70">Category</span>
                                        <span className="font-bold">{project.category}</span>
                                    </div>
                                )}
                                {project.budget && (
                                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                                        <span className="text-sm text-white/70">Budget</span>
                                        <span className="font-bold">{project.budget}</span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between py-2 border-b border-white/10">
                                    <span className="text-sm text-white/70">Start Date</span>
                                    <span className="font-bold">{project.startDate || 'Not set'}</span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-sm text-white/70">End Date</span>
                                    <span className="font-bold">{project.dueDate || 'Not set'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Project Modal */}
                {showEditModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                                        <Edit className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900">Edit Project</h2>
                                </div>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                                    disabled={isSaving}
                                >
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>

                            <form onSubmit={handleUpdateProject} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Project Name *</label>
                                    <input
                                        type="text"
                                        placeholder="Enter project name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                    <textarea
                                        placeholder="Enter project description"
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all resize-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:outline-none transition-all cursor-pointer"
                                        >
                                            <option>Not Started</option>
                                            <option>In Progress</option>
                                            <option>Review</option>
                                            <option>Completed</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Priority</label>
                                        <select
                                            value={formData.priority}
                                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:outline-none transition-all cursor-pointer"
                                        >
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Start Date</label>
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Due Date</label>
                                        <input
                                            type="date"
                                            value={formData.dueDate}
                                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        disabled={isSaving}
                                        className="flex-1 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-2xl font-bold text-slate-700 transition-all duration-300 disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-1 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl font-bold text-white hover:shadow-2xl hover:shadow-emerald-300 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSaving ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-5 h-5" />
                                                Update Project
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
                            <div className="flex items-center justify-center mb-6">
                                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                                    <AlertCircle className="w-8 h-8 text-red-600" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 text-center mb-2">Delete Project?</h2>
                            <p className="text-slate-600 text-center mb-6">
                                Are you sure you want to delete <span className="font-bold text-slate-900">"{project.name}"</span>? This action cannot be undone and all tasks will be deleted.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    disabled={isSaving}
                                    className="flex-1 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-2xl font-bold text-slate-700 transition-all duration-300 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteProject}
                                    disabled={isSaving}
                                    className="flex-1 px-6 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl font-bold text-white hover:shadow-2xl hover:shadow-red-300 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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

                {/* Add Task Modal */}
                {showAddTaskModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black text-slate-900">Add New Task</h2>
                                <button
                                    onClick={() => setShowAddTaskModal(false)}
                                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Task Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter task name"
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:bg-white focus:outline-none transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                                        <select className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:outline-none cursor-pointer">
                                            <option>Pending</option>
                                            <option>In Progress</option>
                                            <option>Completed</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Priority</label>
                                        <select className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:outline-none cursor-pointer">
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddTaskModal(false)}
                                        className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white hover:shadow-xl transition-all"
                                    >
                                        Add Task
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Add Member Modal */}
                {showAddMemberModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black text-slate-900">Add Team Member</h2>
                                <button
                                    onClick={() => setShowAddMemberModal(false)}
                                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Select User</label>
                                    <select className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:outline-none cursor-pointer">
                                        <option>Select a user...</option>
                                        <option>John Smith</option>
                                        <option>Jane Doe</option>
                                        <option>Robert Brown</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Role</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Developer, Designer"
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:bg-white focus:outline-none transition-all"
                                    />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddMemberModal(false)}
                                        className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white hover:shadow-xl transition-all"
                                    >
                                        Add Member
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

