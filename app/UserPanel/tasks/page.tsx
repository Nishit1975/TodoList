"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Calendar,
  User,
  Flag,
  Clock,
  CheckSquare,
  Circle,
  AlertCircle,
  ListTodo,
} from 'lucide-react';

// Mock task data - user's personal tasks
const initialUserTasks = [
  { id: 1, title: "Design homepage mockup", description: "Create modern UI design", status: "Completed", priority: "High", dueDate: "Jan 20, 2026", project: "Website Redesign" },
  { id: 2, title: "Implement responsive navbar", description: "Mobile-first approach", status: "Completed", priority: "High", dueDate: "Jan 22, 2026", project: "Website Redesign" },
  { id: 3, title: "Create component library", description: "Reusable UI components", status: "In Progress", priority: "Medium", dueDate: "Feb 5, 2026", project: "Website Redesign" },
  { id: 4, title: "Setup authentication flow", description: "OAuth and JWT implementation", status: "In Progress", priority: "High", dueDate: "Feb 10, 2026", project: "Mobile App" },
  { id: 5, title: "User testing sessions", description: "Conduct usability tests", status: "Pending", priority: "Medium", dueDate: "Feb 12, 2026", project: "Website Redesign" },
  { id: 6, title: "Write unit tests", description: "Test coverage improvement", status: "Pending", priority: "Low", dueDate: "Feb 25, 2026", project: "Dashboard Analytics" },
];

type Task = typeof initialUserTasks[0];
type Status = "Pending" | "In Progress" | "Completed";

export default function UserTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialUserTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const columns: { status: Status; color: string; icon: any }[] = [
    { status: "Pending", color: "from-amber-500 to-orange-600", icon: Circle },
    { status: "In Progress", color: "from-blue-500 to-indigo-600", icon: Clock },
    { status: "Completed", color: "from-emerald-500 to-green-600", icon: CheckSquare },
  ];

  const getTasksByStatus = (status: Status) => {
    return tasks.filter(task =>
      task.status === status &&
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.project.toLowerCase().includes(searchQuery.toLowerCase()))
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-8">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-[2rem] p-8 shadow-2xl shadow-purple-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <ListTodo className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-4xl font-black text-white tracking-tight">
                    My Tasks
                  </h1>
                </div>
                <p className="text-white/90 font-medium ml-16">
                  Organize and track your personal tasks
                </p>
              </div>
              <Link
                href="/UserPanel/tasks/create"
                className="px-6 py-3 bg-white rounded-xl font-bold text-purple-600 hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Task
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg">
                  <ListTodo className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                  {totalTasks}
                </span>
              </div>
              <h3 className="text-slate-600 text-sm font-semibold uppercase tracking-wide">
                Total Tasks
              </h3>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                  {inProgressTasks}
                </span>
              </div>
              <h3 className="text-slate-600 text-sm font-semibold uppercase tracking-wide">
                In Progress
              </h3>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                  {completedTasks}
                </span>
              </div>
              <h3 className="text-slate-600 text-sm font-semibold uppercase tracking-wide">
                Completed
              </h3>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks by title or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl font-medium text-slate-900 placeholder:text-slate-400 focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all"
            />
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  className="flex-1 bg-white/40 backdrop-blur-sm rounded-2xl p-4 min-h-[500px] space-y-3 border border-white"
                >
                  {columnTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task)}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                      <Link href={`/UserPanel/tasks/${task.id}`} className="block">
                        <div className="relative bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                          {/* Task Header */}
                          <h3 className="font-black text-slate-900 text-sm leading-tight mb-2">
                            {task.title}
                          </h3>

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
                            </div>
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg">
                                {task.project}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {task.dueDate}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
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
