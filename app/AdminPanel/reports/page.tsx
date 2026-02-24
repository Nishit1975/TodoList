"use client";

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  Folder,
  Activity,
  Calendar,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  X,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface OverallStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  totalProjects: number;
  activeProjects: number;
  completionRate: number;
}

interface ProjectProgress {
  id: number;
  name: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
  status: string;
}

interface TeamMember {
  name: string;
  avatar: string;
  tasks: number;
  completed: number;
  inProgress: number;
  pending: number;
  efficiency: number;
  color: string;
}

interface TeamPerformance {
  avgEfficiency: number;
  totalTasks: number;
  totalDone: number;
  teamSize: number;
}

interface ActivityItem {
  id: number;
  user: string;
  action: string;
  item: string;
  time: string;
  type: 'task' | 'comment';
}

interface ReportsData {
  overallStats: OverallStats;
  projectProgress: ProjectProgress[];
  teamWorkload: TeamMember[];
  teamPerformance: TeamPerformance;
  recentActivity: ActivityItem[];
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-200" />
        <div className="w-12 h-4 bg-slate-200 rounded" />
      </div>
      <div className="h-9 bg-slate-200 rounded w-16 mb-2" />
      <div className="h-4 bg-slate-100 rounded w-24 mb-2" />
      <div className="h-3 bg-slate-100 rounded w-28" />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const [data, setData] = useState<ReportsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch('/api/reports');
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Reports fetch error:', err);
        setError('Failed to load report data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, []);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'On Track': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'At Risk': 'bg-orange-100 text-orange-700 border-orange-200',
      'Delayed': 'bg-red-100 text-red-700 border-red-200',
      'Completed': 'bg-blue-100 text-blue-700 border-blue-200',
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  };

  // ── Derived display values ──────────────────────────────────────────────────

  const overallStats = data?.overallStats ?? {
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    totalProjects: 0,
    activeProjects: 0,
    completionRate: 0,
  };

  const projectProgress = data?.projectProgress ?? [];
  const teamWorkload = data?.teamWorkload ?? [];
  const teamPerformance = data?.teamPerformance ?? {
    avgEfficiency: 0,
    totalTasks: 0,
    totalDone: 0,
    teamSize: 0,
  };
  const recentActivity = data?.recentActivity ?? [];

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Reports &amp; Analytics</h1>
              <p className="text-slate-500 font-medium mt-1">Track project performance and team productivity</p>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 font-medium text-sm">{error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-xl text-red-700 font-bold text-sm transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Overview Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Tasks */}
          {isLoading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              {/* Total Tasks */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                    <ArrowUpRight className="w-4 h-4" />
                    Live
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-1">{overallStats.totalTasks}</h3>
                <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Total Tasks</p>
                <p className="text-xs text-slate-500 mt-2">{overallStats.inProgressTasks} in progress</p>
              </div>

              {/* Completed Tasks */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-bold ${overallStats.completionRate >= 50 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {overallStats.completionRate >= 50 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {overallStats.completionRate}%
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-1">{overallStats.completedTasks}</h3>
                <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Completed</p>
                <p className="text-xs text-slate-500 mt-2">{overallStats.completionRate}% completion rate</p>
              </div>

              {/* In Progress */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-1">{overallStats.inProgressTasks}</h3>
                <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">In Progress</p>
                <p className="text-xs text-slate-500 mt-2">
                  {overallStats.totalTasks - overallStats.completedTasks - overallStats.inProgressTasks} not started
                </p>
              </div>

              {/* Active Projects */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Folder className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-1">{overallStats.activeProjects}</h3>
                <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Active Projects</p>
                <p className="text-xs text-slate-500 mt-2">of {overallStats.totalProjects} total</p>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Project Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Progress Tracking */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Folder className="w-5 h-5 text-blue-600" />
                  Project Progress
                </h2>
                <span className="text-sm text-slate-500 font-medium">
                  {isLoading ? '—' : `${projectProgress.length} Projects`}
                </span>
              </div>

              <div className="space-y-4">
                {isLoading ? (
                  [1, 2, 3, 4].map(i => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl animate-pulse">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-slate-200 rounded w-40" />
                          <div className="h-3 bg-slate-100 rounded w-28" />
                        </div>
                        <div className="h-6 w-20 bg-slate-200 rounded-full" />
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full" />
                    </div>
                  ))
                ) : projectProgress.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 font-medium">No projects found</div>
                ) : (
                  projectProgress.map((project) => (
                    <div key={project.id} className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-black text-slate-900 text-sm mb-1">{project.name}</h3>
                          <p className="text-xs text-slate-500">
                            {project.completedTasks} of {project.totalTasks} tasks completed
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-600">{project.progress}%</span>
                        </div>
                        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${project.progress === 100
                              ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                              : project.progress >= 70
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                                : project.progress >= 40
                                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500'
                                  : 'bg-gradient-to-r from-red-500 to-pink-500'
                              }`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Recent Activity
              </h2>
              <div className="space-y-3">
                {isLoading ? (
                  [1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex items-start gap-3 p-3 animate-pulse">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-3/4" />
                        <div className="h-3 bg-slate-100 rounded w-24" />
                      </div>
                      <div className="w-16 h-6 bg-slate-200 rounded-lg" />
                    </div>
                  ))
                ) : recentActivity.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 font-medium">No recent activity</div>
                ) : (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {activity.user.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900">
                          <span className="font-bold">{activity.user}</span>{' '}
                          <span className="text-slate-600">{activity.action}</span>{' '}
                          <span className="font-bold">{activity.item}</span>
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${activity.type === 'comment'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                        }`}>
                        {activity.type === 'comment' ? 'comment' : 'task'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Team Workload */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Team Workload
              </h2>
              <div className="space-y-4">
                {isLoading ? (
                  [1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl animate-pulse">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-slate-200 rounded w-24" />
                          <div className="h-3 bg-slate-100 rounded w-20" />
                        </div>
                        <div className="w-12 h-6 bg-slate-200 rounded-lg" />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-12 bg-slate-100 rounded-lg" />
                        <div className="h-12 bg-slate-100 rounded-lg" />
                        <div className="h-12 bg-slate-100 rounded-lg" />
                      </div>
                    </div>
                  ))
                ) : teamWorkload.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 font-medium">No team data found</div>
                ) : (
                  teamWorkload.map((member, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                          {member.avatar}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-slate-900 text-sm">{member.name}</h3>
                          <p className="text-xs text-slate-500">{member.tasks} tasks assigned</p>
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${member.efficiency >= 90 ? 'bg-emerald-100 text-emerald-700' :
                          member.efficiency >= 80 ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                          <Award className="w-3 h-3" />
                          <span className="text-xs font-bold">{member.efficiency}%</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-emerald-50 rounded-lg p-2">
                          <p className="text-lg font-black text-emerald-700">{member.completed}</p>
                          <p className="text-xs text-slate-600 font-medium">Done</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-2">
                          <p className="text-lg font-black text-blue-700">{member.inProgress}</p>
                          <p className="text-xs text-slate-600 font-medium">In Progress</p>
                        </div>
                        <div className="bg-slate-100 rounded-lg p-2">
                          <p className="text-lg font-black text-slate-700">{member.pending}</p>
                          <p className="text-xs text-slate-600 font-medium">Not Started</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Team Summary */}
              <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  Team Performance
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Avg. Efficiency</span>
                    <span className="font-black text-slate-900">
                      {isLoading ? '—' : `${teamPerformance.avgEfficiency}%`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Total Tasks</span>
                    <span className="font-black text-slate-900">
                      {isLoading ? '—' : teamPerformance.totalTasks}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Completed</span>
                    <span className="font-black text-emerald-700">
                      {isLoading ? '—' : teamPerformance.totalDone}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Team Members</span>
                    <span className="font-black text-slate-900">
                      {isLoading ? '—' : teamPerformance.teamSize}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
