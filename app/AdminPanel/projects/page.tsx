"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Folder,
    Plus,
    Search,
    Filter,
    Grid3x3,
    List,
    Calendar,
    Users,
    Clock,
    TrendingUp,
    CheckCircle2,
    AlertCircle,
    MoreVertical,
    Star,
    Target,
    Zap,
    BarChart3,
    Settings,
    Trash2,
    Edit,
    X,
    ArrowUpRight,
    Sparkles
} from 'lucide-react';

// Type definitions for project data
interface TeamMember {
    name: string;
    avatar: string;
    color: string;
}

interface Project {
    id: number;
    name: string;
    description: string;
    status: string;
    priority: string;
    progress: number;
    startDate: string;
    dueDate: string;
    team: TeamMember[];
    tasks: { total: number; completed: number };
    budget: string;
    category: string;
}

export default function ProjectsPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [priorityFilter, setPriorityFilter] = useState<string>('All');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // State for real data from API
    const [projectsData, setProjectsData] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'Not Started',
        priority: 'Medium',
        startDate: '',
        dueDate: '',
    });

    // Fetch projects data from API on component mount
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch('/api/projects');

            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }

            const data = await response.json();
            setProjectsData(data);
        } catch (err) {
            console.error('Error fetching projects:', err);
            setError('Failed to load projects. Please try again.');
            setProjectsData([]);
        } finally {
            setIsLoading(false);
        }
    };

    const statusOptions = ['All', 'Not Started', 'In Progress', 'Review', 'Completed'];
    const priorityOptions = ['All', 'High', 'Medium', 'Low'];

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            'Not Started': 'bg-purple-100 text-purple-700 border-purple-200',
            'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
            'Review': 'bg-orange-100 text-orange-700 border-orange-200',
            'Completed': 'bg-emerald-100 text-emerald-700 border-emerald-200'
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

    const filteredProjects = projectsData.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
        const matchesPriority = priorityFilter === 'All' || project.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    // Reset form
    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            status: 'Planning',
            priority: 'Medium',
            startDate: '',
            dueDate: '',
        });
    };

    // Handle Create Project
    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create project');
            }

            // Success - refresh list and close modal
            await fetchProjects();
            setShowCreateModal(false);
            resetForm();
        } catch (err) {
            console.error('Error creating project:', err);
            alert('Failed to create project. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    // Handle Edit Project
    const openEditModal = (project: Project) => {
        setSelectedProject(project);
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

    const handleUpdateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProject) return;

        setIsSaving(true);

        try {
            const response = await fetch(`/api/projects/${selectedProject.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update project');
            }

            // Success - refresh list and close modal
            await fetchProjects();
            setShowEditModal(false);
            setSelectedProject(null);
            resetForm();
        } catch (err) {
            console.error('Error updating project:', err);
            alert('Failed to update project. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    // Handle Delete Project
    const openDeleteModal = (project: Project) => {
        setSelectedProject(project);
        setShowDeleteModal(true);
    };

    const handleDeleteProject = async () => {
        if (!selectedProject) return;

        setIsSaving(true);

        try {
            const response = await fetch(`/api/projects/${selectedProject.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete project');
            }

            // Success - refresh list and close modal
            await fetchProjects();
            setShowDeleteModal(false);
            setSelectedProject(null);
        } catch (err) {
            console.error('Error deleting project:', err);
            alert('Failed to delete project. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    // Helper function to convert "Jan 15, 2026" to "2026-01-15"
    const formatDateForInput = (dateStr: string): string => {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            return date.toISOString().split('T')[0];
        } catch {
            return '';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">
                                <Folder className="w-6 h-6 text-white" />
                            </div>
                            Projects
                        </h1>
                        <p className="text-slate-500 font-medium">
                            Manage and track all your projects in one place
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-white hover:shadow-2xl hover:shadow-blue-300 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        New Project
                    </button>
                </div>

                {/* Filters and Search Bar */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 w-full lg:max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex gap-3 items-center flex-wrap">
                            {/* Status Filter */}
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-slate-500" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                                >
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Priority Filter */}
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                            >
                                {priorityOptions.map(priority => (
                                    <option key={priority} value={priority}>
                                        {priority === 'All' ? 'All Priorities' : `${priority} Priority`}
                                    </option>
                                ))}
                            </select>

                            {/* View Toggle */}
                            <div className="flex bg-slate-50 rounded-xl p-1 border-2 border-slate-100">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2.5 rounded-lg transition-all duration-300 ${viewMode === 'grid'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    <Grid3x3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2.5 rounded-lg transition-all duration-300 ${viewMode === 'list'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    {(statusFilter !== 'All' || priorityFilter !== 'All' || searchQuery) && (
                        <div className="mt-4 flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-slate-500">Active Filters:</span>
                            {searchQuery && (
                                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold flex items-center gap-1">
                                    Search: "{searchQuery}"
                                    <button onClick={() => setSearchQuery('')}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}
                            {statusFilter !== 'All' && (
                                <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold flex items-center gap-1">
                                    Status: {statusFilter}
                                    <button onClick={() => setStatusFilter('All')}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}
                            {priorityFilter !== 'All' && (
                                <span className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-xs font-bold flex items-center gap-1">
                                    Priority: {priorityFilter}
                                    <button onClick={() => setPriorityFilter('All')}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-600 font-medium">Loading projects...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                        <div>
                            <h3 className="font-bold text-red-900">Error Loading Projects</h3>
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                        <button
                            onClick={fetchProjects}
                            className="ml-auto px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            )}

            {/* Stats Overview - Only show when data is loaded */}
            {!isLoading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 text-sm font-bold">Total Projects</span>
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                <Folder className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-black text-slate-900">{projectsData.length}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 text-sm font-bold">In Progress</span>
                            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-purple-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-black text-slate-900">
                            {projectsData.filter(p => p.status === 'In Progress').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 text-sm font-bold">Completed</span>
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-black text-slate-900">
                            {projectsData.filter(p => p.status === 'Completed').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 text-sm font-bold">Avg. Progress</span>
                            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-orange-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-black text-slate-900">
                            {projectsData.length > 0 ? Math.round(projectsData.reduce((acc, p) => acc + p.progress, 0) / projectsData.length) : 0}%
                        </p>
                    </div>
                </div>
            )}

            {/* Projects Grid/List - Only show when data is loaded */}
            {!isLoading && !error && (
                <>
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group relative"
                                >
                                    {/* Project Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-start gap-3 flex-1">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                                                <Folder className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-black text-slate-900 mb-1 text-lg leading-tight">
                                                    {project.name}
                                                </h3>
                                                <p className="text-xs text-slate-500 line-clamp-2">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="relative group/menu">
                                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                                <MoreVertical className="w-4 h-4 text-slate-400" />
                                            </button>
                                            {/* Dropdown Menu */}
                                            <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-slate-200 py-2 hidden group-hover/menu:block z-10 min-w-[150px]">
                                                <button
                                                    onClick={() => openEditModal(project)}
                                                    className="w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(project)}
                                                    className="w-full px-4 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status and Priority */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 ${getStatusColor(project.status)}`}>
                                            {project.status}
                                        </span>
                                        <span className={`text-xs font-black flex items-center gap-1 ${getPriorityColor(project.priority)}`}>
                                            <Target className="w-3 h-3" />
                                            {project.priority}
                                        </span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold text-slate-500">Progress</span>
                                            <span className="text-xs font-black text-slate-900">{project.progress}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                                                style={{ width: `${project.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Tasks Info */}
                                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            <span className="text-xs font-bold text-slate-700">
                                                {project.tasks.completed}/{project.tasks.total} Tasks
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-blue-500" />
                                            <span className="text-xs font-bold text-slate-700">
                                                {project.dueDate}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Team Avatars */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                            {project.team.slice(0, 4).map((member, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-md hover:scale-110 transition-transform cursor-pointer`}
                                                    title={member.name}
                                                >
                                                    {member.avatar}
                                                </div>
                                            ))}
                                            {project.team.length > 4 && (
                                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 text-xs font-bold border-2 border-white shadow-md">
                                                    +{project.team.length - 4}
                                                </div>
                                            )}
                                        </div>
                                        <Link
                                            href={`/AdminPanel/projects/${project.id}`}
                                            className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1 group/btn"
                                        >
                                            View
                                            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 relative"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg flex-shrink-0">
                                            <Folder className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <h3 className="font-black text-slate-900 text-lg mb-1">{project.name}</h3>
                                                    <p className="text-sm text-slate-500">{project.description}</p>
                                                </div>
                                                <div className="relative group/menu">
                                                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                                        <MoreVertical className="w-5 h-5 text-slate-400" />
                                                    </button>
                                                    <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-slate-200 py-2 hidden group-hover/menu:block z-10 min-w-[150px]">
                                                        <button
                                                            onClick={() => openEditModal(project)}
                                                            className="w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => openDeleteModal(project)}
                                                            className="w-full px-4 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 flex-wrap mt-3">
                                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 ${getStatusColor(project.status)}`}>
                                                    {project.status}
                                                </span>
                                                <span className={`text-xs font-black flex items-center gap-1 ${getPriorityColor(project.priority)}`}>
                                                    <Target className="w-3 h-3" />
                                                    {project.priority} Priority
                                                </span>
                                                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    {project.tasks.completed}/{project.tasks.total} Tasks
                                                </span>
                                                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    Due {project.dueDate}
                                                </span>
                                                <div className="flex -space-x-2 ml-auto">
                                                    {project.team.slice(0, 3).map((member, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`w-7 h-7 rounded-full ${member.color} flex items-center justify-center text-white text-xs font-bold border-2 border-white`}
                                                            title={member.name}
                                                        >
                                                            {member.avatar}
                                                        </div>
                                                    ))}
                                                </div>
                                                <Link
                                                    href={`/AdminPanel/projects/${project.id}`}
                                                    className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1"
                                                >
                                                    View →
                                                </Link>
                                            </div>
                                            <div className="mt-3 flex items-center gap-3">
                                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                                        style={{ width: `${project.progress}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-black text-slate-700 min-w-[45px]">{project.progress}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-slate-100">
                            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Folder className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-2">No projects found</h3>
                            <p className="text-slate-500 mb-6">Try adjusting your filters or create a new project</p>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-white hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                Create Project
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Create Project Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900">Create New Project</h2>
                            </div>
                            <button
                                onClick={() => { setShowCreateModal(false); resetForm(); }}
                                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                                disabled={isSaving}
                            >
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateProject} className="space-y-5">
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
                                    onClick={() => { setShowCreateModal(false); resetForm(); }}
                                    disabled={isSaving}
                                    className="flex-1 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-2xl font-bold text-slate-700 transition-all duration-300 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-white hover:shadow-2xl hover:shadow-blue-300 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-5 h-5" />
                                            Create Project
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Project Modal */}
            {showEditModal && selectedProject && (
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
                                onClick={() => { setShowEditModal(false); setSelectedProject(null); resetForm(); }}
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
                                    onClick={() => { setShowEditModal(false); setSelectedProject(null); resetForm(); }}
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
            {showDeleteModal && selectedProject && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                                <AlertCircle className="w-8 h-8 text-red-600" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 text-center mb-2">Delete Project?</h2>
                        <p className="text-slate-600 text-center mb-6">
                            Are you sure you want to delete <span className="font-bold text-slate-900">"{selectedProject.name}"</span>? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => { setShowDeleteModal(false); setSelectedProject(null); }}
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
        </div>
    );
}
