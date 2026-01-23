"use client";

import React from 'react';
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

// Mock data - matches structure from projects list page
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
            { name: "Sarah Chen", avatar: "SC", color: "bg-blue-500", role: "Lead Designer" },
            { name: "Mike Johnson", avatar: "MJ", color: "bg-purple-500", role: "Frontend Dev" },
            { name: "Emma Davis", avatar: "ED", color: "bg-emerald-500", role: "UX Designer" },
            { name: "Alex Wilson", avatar: "AW", color: "bg-orange-500", role: "Backend Dev" },
        ],
        tasks: { total: 24, completed: 18, inProgress: 4, pending: 2 },
        budget: "$45,000",
        category: "Design",
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
            { name: "John Doe", avatar: "JD", color: "bg-blue-500", role: "iOS Developer" },
            { name: "Lisa Brown", avatar: "LB", color: "bg-pink-500", role: "Android Dev" },
            { name: "Tom Wilson", avatar: "TW", color: "bg-indigo-500", role: "QA Engineer" },
        ],
        tasks: { total: 32, completed: 14, inProgress: 12, pending: 6 },
        budget: "$78,000",
        category: "Development",
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
            { name: "Sarah Chen", avatar: "SC", color: "bg-blue-500", role: "Data Analyst" },
            { name: "David Kim", avatar: "DK", color: "bg-teal-500", role: "Backend Dev" },
        ],
        tasks: { total: 18, completed: 16, inProgress: 2, pending: 0 },
        budget: "$32,000",
        category: "Analytics",
    },
];

const mockUserTasksData = [
    { id: 1, name: "Design homepage mockup", status: "Completed", priority: "High", dueDate: "Jan 20, 2026" },
    { id: 2, name: "Implement responsive navbar", status: "Completed", priority: "High", dueDate: "Jan 22, 2026" },
    { id: 3, name: "Create component library", status: "In Progress", priority: "Medium", dueDate: "Feb 5, 2026" },
    { id: 4, name: "Setup authentication flow", status: "In Progress", priority: "High", dueDate: "Feb 10, 2026" },
];

export default function UserProjectDetailPage() {
    const params = useParams();
    const projectId = parseInt(params.id as string);
    const project = projectsData.find(p => p.id === projectId);

    if (!project) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-10 h-10 text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Project Not Found</h2>
                    <p className="text-slate-500 mb-6">The project you're looking for doesn't exist.</p>
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

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
            'Planning': 'bg-purple-100 text-purple-700 border-purple-200',
            'Review': 'bg-orange-100 text-orange-700 border-orange-200',
            'Completed': 'bg-emerald-100 text-emerald-700 border-emerald-200',
            'On Hold': 'bg-slate-100 text-slate-700 border-slate-200',
            'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200'
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
                            <p className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">{mockUserTasksData.length}</p>
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
                            <p className="text-lg font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">{project.dueDate}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {/* My Tasks */}
                    <div className="col-span-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white">
                            <h2 className="text-2xl font-black text-slate-900 mb-6">My Tasks in This Project</h2>

                            <div className="space-y-3">
                                {mockUserTasksData.map((task) => (
                                    <div
                                        key={task.id}
                                        className="relative group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                                        <div className="relative bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl p-4 hover:border-purple-300 transition-all duration-300">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-3 flex-1">
                                                    <div className="w-5 h-5 rounded border-2 border-slate-300 flex items-center justify-center">
                                                        {task.status === 'Completed' && (
                                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-black text-slate-900">{task.name}</h3>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${getStatusColor(task.status)}`}>
                                                                {task.status}
                                                            </span>
                                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                                <Calendar className="w-3 h-3" />
                                                                {task.dueDate}
                                                            </span>
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
                                        key={idx}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all"
                                    >
                                        <div className={`w-10 h-10 rounded-xl ${member.color} flex items-center justify-center text-white font-bold shadow-md`}>
                                            {member.avatar}
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
                                    <span className="text-sm text-white/70">Category</span>
                                    <span className="font-bold">{project.category}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-white/10">
                                    <span className="text-sm text-white/70">Total Tasks</span>
                                    <span className="font-bold">{project.tasks.total}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-white/10">
                                    <span className="text-sm text-white/70">Completed</span>
                                    <span className="font-bold">{project.tasks.completed}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-white/10">
                                    <span className="text-sm text-white/70">Start Date</span>
                                    <span className="font-bold">{project.startDate}</span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-sm text-white/70">Due Date</span>
                                    <span className="font-bold">{project.dueDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
