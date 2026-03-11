"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Calendar,
  Flag,
  Clock,
  CheckSquare,
  Circle,
  AlertCircle,
  ListTodo,
  Edit,
  Trash2,
  CheckCircle2,
} from 'lucide-react';

// Task type from API
interface Task {
  id: number;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: string;
  dueDate: string;
  project: string;
}

type Status = "Pending" | "In Progress" | "Completed";

export default function UserTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  // isLoading: true only during the INITIAL page load — controls the full-page spinner.
  const [isLoading, setIsLoading] = useState(true);

  // isFetching: true during background re-fetches (after drag-drop / delete).
  // Shows inline skeleton cards only; never replaces the whole board with a spinner.
  const [isFetching, setIsFetching] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // ─── fetchTasks ────────────────────────────────────────────────────────────
  // `isInitial` = true  → controls the full-page loading spinner (first mount).
  // `isInitial` = false → background refresh; only shows inline skeleton cards.
  const fetchTasks = useCallback(async (isInitial = false) => {
    if (isInitial) {
      setIsLoading(true);
    } else {
      setIsFetching(true);
    }
    setError(null);

    try {
      const response = await fetch('/api/user/tasks', { cache: 'no-store' });

      if (!response.ok) {
        throw new Error(`Failed to fetch tasks (HTTP ${response.status})`);
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please try again.');
    } finally {
      // Always reset BOTH flags so we can never get stuck in a loading state.
      setIsLoading(false);
      setIsFetching(false);
    }
  }, []);

  // Fetch once on mount (initial load).
  useEffect(() => {
    fetchTasks(true);
  }, [fetchTasks]);

  // ─── Kanban helpers ────────────────────────────────────────────────────────
  const columns: { status: Status; color: string; icon: React.ElementType }[] = [
    { status: "Pending", color: "from-amber-500 to-orange-600", icon: Circle },
    { status: "In Progress", color: "from-blue-500 to-indigo-600", icon: Clock },
    { status: "Completed", color: "from-emerald-500 to-green-600", icon: CheckSquare },
  ];

  const getTasksByStatus = (status: Status) =>
    tasks.filter(task =>
      task.status === status &&
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.project.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  // ─── Drag handlers ─────────────────────────────────────────────────────────
  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (status: Status) => {
    if (!draggedTask) return;
    if (draggedTask.status === status) return; // dropped on same column — no-op

    // Snapshot the current tasks list BEFORE the optimistic update so we can
    // roll back accurately if the API call fails.
    const previousTasks = tasks;

    // 1. Optimistic UI update — instant, no spinner.
    setTasks(prev =>
      prev.map(task => task.id === draggedTask.id ? { ...task, status } : task)
    );
    setDraggedTask(null);

    // 2. Persist to database.
    try {
      const response = await fetch(`/api/user/tasks/${draggedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }), // API handles format conversion
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 403) {
          throw new Error('You do not have permission to update this task');
        }
        if (response.status === 404) {
          throw new Error('Task not found');
        }
        throw new Error(errorData.error || 'Failed to update task');
      }

      // 3. Background re-fetch to sync with DB (inline skeleton, no full-page spinner).
      await fetchTasks(false);

    } catch (err: unknown) {
      console.error('Error updating task:', err);
      // Roll back to the snapshot taken before the optimistic update.
      setTasks(previousTasks);
      const message = err instanceof Error ? err.message : 'Failed to update task status.';
      alert(`${message} Please try again.`);
    }
  };

  // ─── Delete handler ────────────────────────────────────────────────────────
  const handleDeleteTask = async (taskId: number, taskTitle: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${taskTitle}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    // Optimistic removal.
    const previousTasks = tasks;
    setTasks(prev => prev.filter(task => task.id !== taskId));

    try {
      const response = await fetch(`/api/user/tasks/${taskId}`, { method: 'DELETE' });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('You do not have permission to delete this task');
        }
        throw new Error('Failed to delete task');
      }

      // Background sync to confirm deletion.
      await fetchTasks(false);
      alert('Task deleted successfully!');
    } catch (err: unknown) {
      console.error('Error deleting task:', err);
      // Restore the list if delete failed.
      setTasks(previousTasks);
      const message = err instanceof Error ? err.message : 'Failed to delete task.';
      alert(`${message} Please try again.`);
    }
  };

  // ─── Mark as Done handler ──────────────────────────────────────────────────
  const handleMarkAsDone = async (task: Task) => {
    if (task.status === 'Completed') return; // already done — no-op

    const previousTasks = tasks;

    // Optimistic update: move to Completed immediately.
    setTasks(prev =>
      prev.map(t => t.id === task.id ? { ...t, status: 'Completed' } : t)
    );

    try {
      const response = await fetch(`/api/user/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Completed' }), // API maps → DONE
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 403) throw new Error('You do not have permission to update this task');
        if (response.status === 404) throw new Error('Task not found');
        throw new Error(errorData.error || 'Failed to mark task as done');
      }

      // Background re-fetch to confirm DB state.
      await fetchTasks(false);
    } catch (err: unknown) {
      console.error('Error marking task as done:', err);
      setTasks(previousTasks);
      const message = err instanceof Error ? err.message : 'Failed to mark task as done.';
      alert(`${message} Please try again.`);
    }
  };

  // ─── Misc helpers ──────────────────────────────────────────────────────────
  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'High': 'bg-red-100 text-red-700 border-red-200',
      'HIGH': 'bg-red-100 text-red-700 border-red-200',
      'Medium': 'bg-orange-100 text-orange-700 border-orange-200',
      'MEDIUM': 'bg-orange-100 text-orange-700 border-orange-200',
      'Low': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'LOW': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    };
    return colors[priority] || 'bg-slate-100 text-slate-700';
  };

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;

  // ─── Render: Full-page loading (initial mount only) ────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  // ─── Render: Error state ───────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center p-8">
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <div>
              <h3 className="font-bold text-red-900 text-lg">Error Loading Tasks</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={() => fetchTasks(true)}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ─── Render: Main board ────────────────────────────────────────────────────
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
                  Manage your personal tasks
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Tasks */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <CheckSquare className="w-6 h-6 text-white" />
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

          {/* Pending */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <Circle className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                  {pendingTasks}
                </span>
              </div>
              <h3 className="text-slate-600 text-sm font-semibold uppercase tracking-wide">
                Pending
              </h3>
            </div>
          </div>

          {/* In Progress */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
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

          {/* Completed */}
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

        {/* No Tasks Message */}
        {tasks.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-white text-center">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">No tasks assigned</h2>
            <p className="text-slate-500 mb-6">You haven&apos;t been assigned any tasks yet. Contact your admin if you believe this is an error.</p>
          </div>
        )}

        {/* Kanban Board - Only show if there are tasks */}
        {tasks.length > 0 && (
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
                    {columnTasks.map((task) => {
                      const isDone = task.status === 'Completed';
                      return (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={() => handleDragStart(task)}
                          className="relative group cursor-pointer"
                          onClick={() => window.location.href = `/UserPanel/tasks/${task.id}`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                          {/* Completed tasks get reduced opacity to visually indicate they are done */}
                          <div className={`relative bg-white rounded-2xl p-4 shadow-sm border transition-all duration-300 ${
                            isDone
                              ? 'border-emerald-200 opacity-60'
                              : 'border-slate-200 hover:shadow-xl hover:-translate-y-1'
                          }`}>
                            {/* Task Header */}
                            <div className="flex items-start justify-between mb-2">
                              {/* Strike-through title for completed tasks */}
                              <h3 className={`font-black text-sm leading-tight flex-1 pr-2 ${
                                isDone ? 'line-through text-slate-400' : 'text-slate-900'
                              }`}>
                                {task.title}
                              </h3>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {/* Mark as Done — only on non-completed tasks */}
                                {!isDone && (
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleMarkAsDone(task);
                                    }}
                                    className="p-1.5 hover:bg-emerald-100 rounded-lg transition-colors group/done"
                                    title="Mark as Done"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-slate-400 group-hover/done:text-emerald-600 transition-colors" />
                                  </button>
                                )}
                                <Link
                                  href={`/UserPanel/tasks/edit/${task.id}`}
                                  className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors group/edit"
                                  title="Edit task"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Edit className="w-4 h-4 text-slate-400 group-hover/edit:text-blue-600 transition-colors" />
                                </Link>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
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
                                  {task.priority}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs text-slate-500">
                                <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg">
                                  {task.project}
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
                        </div>
                      );
                    })}

                    {/* Inline Skeleton Cards — shown during background re-fetch only */}
                    {isFetching && (
                      <>
                        {[1, 2].map((i) => (
                          <div key={i} className="relative group">
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 animate-pulse">
                              {/* Skeleton Header */}
                              <div className="flex items-start justify-between mb-2">
                                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                              </div>

                              {/* Skeleton Description */}
                              <div className="space-y-2 mb-3">
                                <div className="h-3 bg-slate-100 rounded w-full"></div>
                                <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                              </div>

                              {/* Skeleton Meta */}
                              <div className="space-y-2">
                                <div className="h-6 bg-slate-100 rounded w-20"></div>
                                <div className="flex items-center justify-between">
                                  <div className="h-6 bg-slate-100 rounded w-24"></div>
                                  <div className="h-4 bg-slate-100 rounded w-16"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}

                    {/* Empty State */}
                    {!isFetching && columnTasks.length === 0 && (
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
        )}
      </div>
    </div>
  );
}
