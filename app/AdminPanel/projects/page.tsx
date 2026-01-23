"use client";

import React, { useState } from 'react';
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

// Mock data for projects
const projectsData = [
    {
        id: 1,
        name: "Website Redesign",
        description: "Complete overhaul of company website with modern design",
        status: "In Progress",
        priority: "High",
        progress: 75,
        startDate: "Jan 15, 2026",
        dueDate: "Mar 15, 2026",
        team: [
            { name: "Sarah Chen", avatar: "SC", color: "bg-blue-500" },
            { name: "Mike Johnson", avatar: "MJ", color: "bg-purple-500" },
            { name: "Emma Davis", avatar: "ED", color: "bg-emerald-500" },
            { name: "Alex Wilson", avatar: "AW", color: "bg-orange-500" },
        ],
        tasks: { total: 24, completed: 18 },
        budget: "$45,000",
        category: "Design"
    },
    {
        id: 2,
        name: "Mobile App Development",
        description: "Native iOS and Android app for customer engagement",
        status: "In Progress",
        priority: "High",
        progress: 45,
        startDate: "Feb 1, 2026",
        dueDate: "Apr 20, 2026",
        team: [
            { name: "John Doe", avatar: "JD", color: "bg-blue-500" },
            { name: "Lisa Brown", avatar: "LB", color: "bg-pink-500" },
            { name: "Tom Wilson", avatar: "TW", color: "bg-indigo-500" },
        ],
        tasks: { total: 32, completed: 14 },
        budget: "$78,000",
        category: "Development"
    },
    {
        id: 3,
        name: "Dashboard Analytics",
        description: "Advanced analytics dashboard with real-time data",
        status: "Review",
        priority: "Medium",
        progress: 90,
        startDate: "Dec 10, 2025",
        dueDate: "Feb 28, 2026",
        team: [
            { name: "Sarah Chen", avatar: "SC", color: "bg-blue-500" },
            { name: "David Kim", avatar: "DK", color: "bg-teal-500" },
        ],
        tasks: { total: 18, completed: 16 },
        budget: "$32,000",
        category: "Analytics"
    },
    {
        id: 4,
        name: "API Integration",
        description: "Third-party API integration for payment processing",
        status: "Planning",
        priority: "Medium",
        progress: 30,
        startDate: "Mar 1, 2026",
        dueDate: "May 10, 2026",
        team: [
            { name: "Mike Johnson", avatar: "MJ", color: "bg-purple-500" },
            { name: "Alex Wilson", avatar: "AW", color: "bg-orange-500" },
            { name: "Emma Davis", avatar: "ED", color: "bg-emerald-500" },
        ],
        tasks: { total: 15, completed: 5 },
        budget: "$28,000",
        category: "Development"
    },
    {
        id: 5,
        name: "Marketing Campaign",
        description: "Q1 2026 digital marketing campaign launch",
        status: "Completed",
        priority: "Low",
        progress: 100,
        startDate: "Nov 1, 2025",
        dueDate: "Jan 5, 2026",
        team: [
            { name: "Lisa Brown", avatar: "LB", color: "bg-pink-500" },
            { name: "Tom Wilson", avatar: "TW", color: "bg-indigo-500" },
        ],
        tasks: { total: 12, completed: 12 },
        budget: "$15,000",
        category: "Marketing"
    },
    {
        id: 6,
        name: "Security Audit",
        description: "Comprehensive security audit and penetration testing",
        status: "On Hold",
        priority: "High",
        progress: 20,
        startDate: "Jan 20, 2026",
        dueDate: "Mar 30, 2026",
        team: [
            { name: "David Kim", avatar: "DK", color: "bg-teal-500" },
            { name: "Sarah Chen", avatar: "SC", color: "bg-blue-500" },
        ],
        tasks: { total: 20, completed: 4 },
        budget: "$52,000",
        category: "Security"
    },
];

export default function ProjectsPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [priorityFilter, setPriorityFilter] = useState<string>('All');
    const [showCreateModal, setShowCreateModal] = useState(false);

    const statusOptions = ['All', 'In Progress', 'Planning', 'Review', 'Completed', 'On Hold'];
    const priorityOptions = ['All', 'High', 'Medium', 'Low'];

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
            'Planning': 'bg-purple-100 text-purple-700 border-purple-200',
            'Review': 'bg-orange-100 text-orange-700 border-orange-200',
            'Completed': 'bg-emerald-100 text-emerald-700 border-emerald-200',
            'On Hold': 'bg-slate-100 text-slate-700 border-slate-200'
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

            {/* Stats Overview */}
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
                        {Math.round(projectsData.reduce((acc, p) => acc + p.progress, 0) / projectsData.length)}%
                    </p>
                </div>
            </div>

            {/* Projects Grid/List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group"
                        >
                            {/* Project Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                                        <Folder className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-900 mb-1 text-lg leading-tight">
                                            {project.name}
                                        </h3>
                                        <p className="text-xs text-slate-500 line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                    <MoreVertical className="w-4 h-4 text-slate-400" />
                                </button>
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
                        <Link
                            key={project.id}
                            href={`/AdminPanel/projects/${project.id}`}
                            className="block bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg flex-shrink-0">
                                    <Folder className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-black text-slate-900 text-lg mb-1">{project.name}</h3>
                                            <p className="text-sm text-slate-500">{project.description}</p>
                                        </div>
                                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                            <MoreVertical className="w-5 h-5 text-slate-400" />
                                        </button>
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
                        </Link>
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
                                onClick={() => setShowCreateModal(false)}
                                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        <form className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Project Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter project name"
                                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                <textarea
                                    placeholder="Enter project description"
                                    rows={3}
                                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all resize-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                                    <select className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:outline-none transition-all cursor-pointer">
                                        <option>Planning</option>
                                        <option>In Progress</option>
                                        <option>Review</option>
                                        <option>Completed</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Priority</label>
                                    <select className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:outline-none transition-all cursor-pointer">
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
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Due Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Budget</label>
                                <input
                                    type="text"
                                    placeholder="$0"
                                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-2xl font-bold text-slate-700 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-white hover:shadow-2xl hover:shadow-blue-300 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    Create Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
