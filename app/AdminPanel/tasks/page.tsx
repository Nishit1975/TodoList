"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Plus,
    Search,
    Filter,
    Calendar,
    User,
    Flag,
    Clock,
    MoreVertical,
    X,
    CheckSquare,
    Circle,
    AlertCircle,
} from 'lucide-react';

// Mock task data
const initialTasksData = [
    { id: 1, title: "Design homepage mockup", description: "Create modern UI design", status: "Completed", priority: "High", assignee: "Sarah Chen", dueDate: "Jan 20, 2026", project: "Website Redesign" },
    { id: 2, title: "Implement responsive navbar", description: "Mobile-first approach", status: "Completed", priority: "High", assignee: "Mike Johnson", dueDate: "Jan 22, 2026", project: "Website Redesign" },
    { id: 3, title: "Create component library", description: "Reusable UI components", status: "In Progress", priority: "Medium", assignee: "Emma Davis", dueDate: "Feb 5, 2026", project: "Website Redesign" },
    { id: 4, title: "Setup authentication flow", description: "OAuth and JWT implementation", status: "In Progress", priority: "High", assignee: "Alex Wilson", dueDate: "Feb 10, 2026", project: "Mobile App" },
    { id: 5, title: "Write API documentation", description: "Complete REST API docs", status: "Pending", priority: "Low", assignee: "Mike Johnson", dueDate: "Feb 28, 2026", project: "Dashboard Analytics" },
    { id: 6, title: "Database schema design", description: "PostgreSQL optimization", status: "Pending", priority: "High", assignee: "David Kim", dueDate: "Feb 15, 2026", project: "Mobile App" },
    { id: 7, title: "User testing sessions", description: "Conduct usability tests", status: "In Progress", priority: "Medium", assignee: "Sarah Chen", dueDate: "Feb 12, 2026", project: "Website Redesign" },
    { id: 8, title: "Performance optimization", description: "Improve load times", status: "Pending", priority: "Medium", assignee: "Alex Wilson", dueDate: "Mar 1, 2026", project: "Dashboard Analytics" },
];

type Task = typeof initialTasksData[0];
type Status = "Pending" | "In Progress" | "Completed";

export default function AdminTasksPage() {
    const [tasks, setTasks] = useState<Task[]>(initialTasksData);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);

    const columns: { status: Status; color: string; icon: any }[] = [
        { status: "Pending", color: "from-yellow-500 to-orange-500", icon: Circle },
        { status: "In Progress", color: "from-blue-500 to-indigo-500", icon: Clock },
        { status: "Completed", color: "from-emerald-500 to-green-500", icon: CheckSquare },
    ];

    const getTasksByStatus = (status: Status) => {
        return tasks.filter(task =>
            task.status === status &&
            (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.assignee.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    };

    const handleDragStart = (task: Task) => {
        setDraggedTask(task);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (status: Status) => {
        if (draggedTask) {
            setTasks(tasks.map(task =>
                task.id === draggedTask.id ? { ...task, status } : task
            ));
            setDraggedTask(null);
        }
    };

    const getPriorityColor = (priority: string) => {
        const colors: { [key: string]: string } = {
            'High': 'bg-red-100 text-red-700 border-red-200',
            'Medium': 'bg-orange-100 text-orange-700 border-orange-200',
            'Low': 'bg-emerald-100 text-emerald-700 border-emerald-200'
        };
        return colors[priority] || 'bg-slate-100 text-slate-700';
    };

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
    const pendingTasks = tasks.filter(t => t.status === 'Pending').length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8">
            <div className="max-w-full mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">
                                    <CheckSquare className="w-6 h-6 text-white" />
                                </div>
                                Task Board
                            </h1>
                            <p className="text-slate-500 font-medium">
                                Manage and track all tasks across projects
                            </p>
                        </div>
                        <Link
                            href="/AdminPanel/tasks/create"
                            className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-white hover:shadow-2xl hover:shadow-blue-300 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            New Task
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-500 text-sm font-bold">Total Tasks</span>
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <CheckSquare className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>
                            <p className="text-3xl font-black text-slate-900">{totalTasks}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-500 text-sm font-bold">Pending</span>
                                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                                    <Circle className="w-5 h-5 text-yellow-600" />
                                </div>
                            </div>
                            <p className="text-3xl font-black text-slate-900">{pendingTasks}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-500 text-sm font-bold">In Progress</span>
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>
                            <p className="text-3xl font-black text-slate-900">{inProgressTasks}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-500 text-sm font-bold">Completed</span>
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                    <CheckSquare className="w-5 h-5 text-emerald-600" />
                                </div>
                            </div>
                            <p className="text-3xl font-black text-slate-900">{completedTasks}</p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search tasks by title or assignee..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Kanban Board */}
                <div className="grid grid-cols-3 gap-6">
                    {columns.map((column) => {
                        const columnTasks = getTasksByStatus(column.status);
                        return (
                            <div key={column.status} className="flex flex-col">
                                {/* Column Header */}
                                <div className={`bg-gradient-to-r ${column.color} rounded-2xl p-4 mb-4 shadow-lg`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                <column.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <h2 className="text-xl font-black text-white">{column.status}</h2>
                                        </div>
                                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-bold text-white">
                                            {columnTasks.length}
                                        </span>
                                    </div>
                                </div>

                                {/* Column Drop Zone */}
                                <div
                                    onDragOver={handleDragOver}
                                    onDrop={() => handleDrop(column.status)}
                                    className="flex-1 bg-slate-50/50 rounded-2xl p-4 min-h-[600px] space-y-3"
                                >
                                    {columnTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            draggable
                                            onDragStart={() => handleDragStart(task)}
                                            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-move group"
                                        >
                                            {/* Task Header */}
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="font-black text-slate-900 text-sm leading-tight flex-1 pr-2">
                                                    {task.title}
                                                </h3>
                                                <Link
                                                    href={`/AdminPanel/tasks/${task.id}`}
                                                    className="p-1 hover:bg-slate-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <MoreVertical className="w-4 h-4 text-slate-400" />
                                                </Link>
                                            </div>

                                            {/* Task Description */}
                                            {task.description && (
                                                <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                                                    {task.description}
                                                </p>
                                            )}

                                            {/* Task Meta */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${getPriorityColor(task.priority)}`}>
                                                        <Flag className="w-3 h-3 inline mr-1" />
                                                        {task.priority}
                                                    </span>
                                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                                                        {task.project}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-xs text-slate-500">
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-3 h-3" />
                                                        {task.assignee}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {task.dueDate}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Empty State */}
                                    {columnTasks.length === 0 && (
                                        <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                                            <AlertCircle className="w-8 h-8 mb-2" />
                                            <p className="text-sm font-semibold">No tasks</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Add Task Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black text-slate-900">Create New Task</h2>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Task Title</label>
                                    <input
                                        type="text"
                                        placeholder="Enter task title"
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:bg-white focus:outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                    <textarea
                                        placeholder="Enter task description"
                                        rows={3}
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:bg-white focus:outline-none transition-all resize-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Priority</label>
                                        <select className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:outline-none cursor-pointer">
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                                        <select className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:outline-none cursor-pointer">
                                            <option>Pending</option>
                                            <option>In Progress</option>
                                            <option>Completed</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Assignee</label>
                                        <input
                                            type="text"
                                            placeholder="Assign to..."
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-blue-300 focus:bg-white focus:outline-none transition-all"
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
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white hover:shadow-xl transition-all"
                                    >
                                        Create Task
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
