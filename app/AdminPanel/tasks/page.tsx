"use client";

import React, { useState, useEffect } from 'react';
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
    Edit,
    Trash2,
} from 'lucide-react';

// Task type based on API response
interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignee: string;
    assigneeId: number;
    dueDate: string;
    dueDateRaw: Date | null;
    project: string;
    projectId: number | null;
    createdById: number;
}

type Status = "NOT_STARTED" | "IN_PROGRESS" | "DONE";

// Map database status to display status
const statusDisplayMap: { [key: string]: string } = {
    "NOT_STARTED": "Pending",
    "IN_PROGRESS": "In Progress",
    "IN_REVIEW": "In Progress",
    "DONE": "Completed",
};

// Reverse map for drag and drop
const displayToDbStatusMap: { [key: string]: string } = {
    "Pending": "NOT_STARTED",
    "In Progress": "IN_PROGRESS",
    "Completed": "DONE",
};

export default function AdminTasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch tasks on mount
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch('/api/tasks');

            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }

            const data = await response.json();
            setTasks(data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
            setError('Failed to load tasks. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const columns: { status: string; displayStatus: string; color: string; icon: any }[] = [
        { status: "NOT_STARTED", displayStatus: "Pending", color: "from-yellow-500 to-orange-500", icon: Circle },
        { status: "IN_PROGRESS", displayStatus: "In Progress", color: "from-blue-500 to-indigo-500", icon: Clock },
        { status: "DONE", displayStatus: "Completed", color: "from-emerald-500 to-green-500", icon: CheckSquare },
    ];

    const getTasksByStatus = (status: string) => {
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

    const handleDrop = async (newStatus: string) => {
        if (!draggedTask) return;

        // Optimistically update UI
        const updatedTasks = tasks.map(task =>
            task.id === draggedTask.id ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
        setDraggedTask(null);

        // Update in database
        try {
            const response = await fetch(`/api/tasks/${draggedTask.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: draggedTask.title,
                    description: draggedTask.description,
                    status: newStatus,
                    priority: draggedTask.priority,
                    assigneeId: draggedTask.assigneeId,
                    projectId: draggedTask.projectId,
                    dueDate: draggedTask.dueDateRaw,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            // Refresh to get latest data
            await fetchTasks();
        } catch (err) {
            console.error('Error updating task:', err);
            // Revert on error
            setTasks(tasks);
            alert('Failed to update task status. Please try again.');
        }
    };

    const handleDeleteTask = async (taskId: number, taskTitle: string) => {
        if (!confirm(`Are you sure you want to delete "${taskTitle}"? This action cannot be undone.`)) {
            return;
        }

        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            // Refresh tasks list
            await fetchTasks();
            alert('Task deleted successfully!');
        } catch (err) {
            console.error('Error deleting task:', err);
            alert('Failed to delete task. Please try again.');
        }
    };

    const getPriorityColor = (priority: string) => {
        const colors: { [key: string]: string } = {
            'HIGH': 'bg-red-100 text-red-700 border-red-200',
            'MEDIUM': 'bg-orange-100 text-orange-700 border-orange-200',
            'LOW': 'bg-emerald-100 text-emerald-700 border-emerald-200'
        };
        return colors[priority] || 'bg-slate-100 text-slate-700';
    };

    const getPriorityDisplay = (priority: string) => {
        return priority.charAt(0) + priority.slice(1).toLowerCase();
    };

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'DONE').length;
    const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS' || t.status === 'IN_REVIEW').length;
    const pendingTasks = tasks.filter(t => t.status === 'NOT_STARTED').length;

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 font-medium">Loading tasks...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-8">
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                        <div>
                            <h3 className="font-bold text-red-900 text-lg">Error Loading Tasks</h3>
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    </div>
                    <button
                        onClick={fetchTasks}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

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
                                            <h2 className="text-xl font-black text-white">{column.displayStatus}</h2>
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
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        href={`/AdminPanel/tasks/edit/${task.id}`}
                                                        className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors group/edit"
                                                        title="Edit task"
                                                    >
                                                        <Edit className="w-4 h-4 text-slate-400 group-hover/edit:text-blue-600 transition-colors" />
                                                    </Link>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteTask(task.id, task.title);
                                                        }}
                                                        className="p-1.5 hover:bg-red-100 rounded-lg transition-colors group/delete"
                                                        title="Delete task"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-slate-400 group-hover/delete:text-red-600 transition-colors" />
                                                    </button>
                                                </div>
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
                                                        {getPriorityDisplay(task.priority)}
                                                    </span>
                                                    {task.project && (
                                                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                                                            {task.project}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center justify-between text-xs text-slate-500">
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-3 h-3" />
                                                        {task.assignee}
                                                    </span>
                                                    {task.dueDate && (
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {task.dueDate}
                                                        </span>
                                                    )}
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
            </div>
        </div>
    );
}
