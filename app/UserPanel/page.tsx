import React from 'react';
import {
  CheckCircle2,
  ListTodo,
  Clock,
  Calendar,
  Plus,
  CheckSquare,
  AlertCircle,
  Activity,
  ChevronRight,
  Timer,
} from 'lucide-react';
import { getAuthUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/app/lib/prisma';

// ─── Helpers ────────────────────────────────────────────────────────────────

function timeAgo(date: Date | null | undefined): string {
  if (!date) return 'recently';
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function formatDate(date: Date | null | undefined): string {
  if (!date) return 'No date';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function statusBadgeClass(status: string | null | undefined): string {
  switch (status) {
    case 'DONE': return 'bg-emerald-100 text-emerald-700';
    case 'IN_PROGRESS': return 'bg-amber-100 text-amberald-700';
    case 'IN_REVIEW': return 'bg-blue-100 text-blue-700';
    default: return 'bg-slate-100 text-slate-600';
  }
}

function statusLabel(status: string | null | undefined): string {
  switch (status) {
    case 'DONE': return 'Done';
    case 'IN_PROGRESS': return 'In Progress';
    case 'IN_REVIEW': return 'In Review';
    default: return 'Not Started';
  }
}

function priorityColor(priority: string | null | undefined): string {
  switch (priority) {
    case 'HIGH': return 'text-rose-500';
    case 'MEDIUM': return 'text-amber-500';
    default: return 'text-slate-400';
  }
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function UserDashboard() {
  // 1. Auth guard
  const authUser = await getAuthUser();
  if (!authUser) redirect('/auth/login');

  const userId = authUser.userId;

  // 2. Get today's date boundaries (UTC-safe)
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(todayStart.getTime() + 86_400_000); // +24 h

  // 3. Single batched query — no unnecessary round-trips
  const [
    totalCount,
    inProgressCount,
    doneCount,
    todayTasks,
    upcomingTasks,
    recentTasks,
  ] = await Promise.all([
    // Total tasks assigned to user
    prisma.tasks.count({
      where: { assignee_id: userId },
    }),

    // In-progress tasks assigned to user
    prisma.tasks.count({
      where: { assignee_id: userId, status: 'IN_PROGRESS' },
    }),

    // Completed tasks assigned to user
    prisma.tasks.count({
      where: { assignee_id: userId, status: 'DONE' },
    }),

    // Today's tasks (due_date falls within today)
    prisma.tasks.findMany({
      where: {
        assignee_id: userId,
        due_date: { gte: todayStart, lt: todayEnd },
        status: { not: 'DONE' },
      },
      select: { id: true, title: true, status: true, priority: true, due_date: true },
      orderBy: { priority: 'desc' },
    }),

    // Upcoming deadlines — next 3 tasks ordered by due_date
    prisma.tasks.findMany({
      where: {
        assignee_id: userId,
        status: { not: 'DONE' },
        due_date: { gte: todayEnd }, // strictly after today
      },
      select: { id: true, title: true, status: true, priority: true, due_date: true },
      orderBy: { due_date: 'asc' },
      take: 3,
    }),

    // Recent activity — last 5 tasks updated/completed
    prisma.tasks.findMany({
      where: { assignee_id: userId },
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        created_at: true,
        projects: { select: { name: true } },
      },
      orderBy: { created_at: 'desc' },
      take: 5,
    }),
  ]);

  // 4. Stat cards config
  const stats = [
    {
      title: 'Total Tasks',
      value: totalCount,
      icon: ListTodo,
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
    },
    {
      title: 'In Progress',
      value: inProgressCount,
      icon: Clock,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
    {
      title: 'Completed',
      value: doneCount,
      icon: CheckCircle2,
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-[2rem] p-8 shadow-2xl shadow-purple-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-black text-white tracking-tight">
                  Welcome back, {authUser.username}!
                </h1>
              </div>
              <p className="text-white/90 font-medium flex items-center gap-2 ml-16">
                <Calendar className="w-4 h-4" />
                Here&apos;s what&apos;s on your plate today
              </p>
            </div>
            <button className="px-6 py-3 bg-white rounded-xl font-bold text-purple-600 hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Task
            </button>
          </div>
        </div>

        {/* ── Stats Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </div>
                <h3 className="text-slate-600 text-sm font-semibold uppercase tracking-wide">
                  {stat.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* ── Widgets Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Today's Tasks */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur opacity-10 group-hover:opacity-25 transition-opacity duration-500" />
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                  <Timer className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-slate-800 font-bold text-base">Today&apos;s Tasks</h2>
                  <p className="text-slate-400 text-xs">{todayTasks.length} task{todayTasks.length !== 1 ? 's' : ''} due today</p>
                </div>
              </div>

              {todayTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-slate-400">
                  <CheckCircle2 className="w-10 h-10 mb-2 text-emerald-400" />
                  <p className="text-sm font-medium">All clear for today!</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {todayTasks.map((task) => (
                    <li key={task.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors duration-200">
                      <span className={`text-xs font-bold ${priorityColor(task.priority)}`}>
                        ●
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-700 text-sm font-semibold truncate">{task.title}</p>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusBadgeClass(task.status)}`}>
                          {statusLabel(task.status)}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-orange-400 rounded-2xl blur opacity-10 group-hover:opacity-25 transition-opacity duration-500" />
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-md">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-slate-800 font-bold text-base">Upcoming Deadlines</h2>
                  <p className="text-slate-400 text-xs">Next {upcomingTasks.length} deadline{upcomingTasks.length !== 1 ? 's' : ''}</p>
                </div>
              </div>

              {upcomingTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-slate-400">
                  <Calendar className="w-10 h-10 mb-2 text-slate-300" />
                  <p className="text-sm font-medium">No upcoming deadlines</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {upcomingTasks.map((task) => (
                    <li key={task.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-rose-50 transition-colors duration-200">
                      <span className={`text-xs font-bold ${priorityColor(task.priority)}`}>
                        ●
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-700 text-sm font-semibold truncate">{task.title}</p>
                        <p className="text-rose-400 text-xs font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(task.due_date)}
                        </p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${statusBadgeClass(task.status)}`}>
                        {statusLabel(task.status)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-10 group-hover:opacity-25 transition-opacity duration-500" />
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-slate-800 font-bold text-base">Recent Activity</h2>
                  <p className="text-slate-400 text-xs">Last {recentTasks.length} action{recentTasks.length !== 1 ? 's' : ''}</p>
                </div>
              </div>

              {recentTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-slate-400">
                  <Activity className="w-10 h-10 mb-2 text-slate-300" />
                  <p className="text-sm font-medium">No recent activity</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {recentTasks.map((task) => {
                    const isDone = task.status === 'DONE';
                    const dotColor = isDone ? 'bg-emerald-400' : task.status === 'IN_PROGRESS' ? 'bg-amber-400' : 'bg-slate-300';
                    const actionText = isDone
                      ? 'Completed'
                      : task.status === 'IN_PROGRESS'
                        ? 'Working on'
                        : 'Created';
                    return (
                      <li key={task.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 transition-colors duration-200">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${dotColor}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-700 text-sm font-semibold truncate">{task.title}</p>
                          <p className="text-slate-400 text-xs">
                            <span className="font-medium text-slate-500">{actionText}</span>
                            {task.projects?.name ? ` · ${task.projects.name}` : ''}
                          </p>
                        </div>
                        <span className="text-slate-400 text-xs flex-shrink-0">
                          {timeAgo(task.created_at)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}