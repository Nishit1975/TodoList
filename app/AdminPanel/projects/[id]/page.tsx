"use client";

import React, { useState } from 'react';
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

const mockTasksData = [
    { id: 1, name: "Design homepage mockup", status: "Completed", priority: "High", assignee: "Sarah Chen", dueDate: "Jan 20, 2026" },
    { id: 2, name: "Implement responsive navbar", status: "Completed", priority: "High", assignee: "Mike Johnson", dueDate: "Jan 22, 2026" },
    { id: 3, name: "Create component library", status: "In Progress", priority: "Medium", assignee: "Emma Davis", dueDate: "Feb 5, 2026" },
    { id: 4, name: "Setup authentication flow", status: "In Progress", priority: "High", assignee: "Alex Wilson", dueDate: "Feb 10, 2026" },
    { id: 5, name: "Write API documentation", status: "Pending", priority: "Low", assignee: "Mike Johnson", dueDate: "Feb 28, 2026" },
];

export default function ProjectDetailPage() {
    const params = useParams();
    const projectId = parseInt(params.id as string);
    const project = projectsData.find(p => p.id === projectId);

    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    if (!project) {
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
                                        <span className="text-sm font-bold text-slate-500 flex items-center gap-1 bg-slate-100 px-3 py-2 rounded-lg">
                                            <DollarSign className="w-4 h-4" />
                                            {project.budget}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-3 hover:bg-slate-100 rounded-xl transition-colors">
                                    <Edit className="w-5 h-5 text-slate-600" />
                                </button>
                                <button className="p-3 hover:bg-red-50 rounded-xl transition-colors">
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
                        <p className="text-xl font-black text-slate-900">{project.dueDate}</p>
                        <p className="text-sm text-slate-500 mt-1">Started {project.startDate}</p>
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
                                {mockTasksData.map((task) => (
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
                                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                                <MoreVertical className="w-4 h-4 text-slate-400" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
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
                                {project.team.map((member, idx) => (
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
                                ))}
                            </div>
                        </div>

                        {/* Project Info */}
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 shadow-xl text-white mt-6">
                            <h3 className="text-lg font-black mb-4">Project Details</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-white/10">
                                    <span className="text-sm text-white/70">Category</span>
                                    <span className="font-bold">{project.category}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-white/10">
                                    <span className="text-sm text-white/70">Budget</span>
                                    <span className="font-bold">{project.budget}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-white/10">
                                    <span className="text-sm text-white/70">Start Date</span>
                                    <span className="font-bold">{project.startDate}</span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-sm text-white/70">End Date</span>
                                    <span className="font-bold">{project.dueDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
