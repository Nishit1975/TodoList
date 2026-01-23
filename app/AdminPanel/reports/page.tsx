"use client";

import React, { useState } from 'react';
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
} from 'lucide-react';

export default function ReportsPage() {
  // Mock data - in production, fetch from API
  const overallStats = {
    totalTasks: 156,
    completedTasks: 98,
    inProgressTasks: 42,
    pendingTasks: 16,
    completionRate: 62.8,
    avgCompletionTime: '3.2 days',
    totalProjects: 6,
    activeProjects: 4,
  };

  const trends = {
    tasksThisWeek: { value: 24, change: 12.5, isPositive: true },
    completionRate: { value: 62.8, change: 8.3, isPositive: true },
    teamProductivity: { value: 89, change: -3.2, isPositive: false },
  };

  const projectProgress = [
    { id: 1, name: 'Website Redesign', progress: 75, totalTasks: 24, completedTasks: 18, status: 'On Track' },
    { id: 2, name: 'Mobile App Development', progress: 45, totalTasks: 32, completedTasks: 14, status: 'On Track' },
    { id: 3, name: 'Dashboard Analytics', progress: 90, totalTasks: 20, completedTasks: 18, status: 'On Track' },
    { id: 4, name: 'API Integration', progress: 30, totalTasks: 18, completedTasks: 5, status: 'At Risk' },
    { id: 5, name: 'Marketing Campaign', progress: 100, totalTasks: 15, completedTasks: 15, status: 'Completed' },
    { id: 6, name: 'Security Audit', progress: 20, totalTasks: 25, completedTasks: 5, status: 'Delayed' },
  ];

  const teamWorkload = [
    { name: 'Sarah Chen', avatar: 'SC', tasks: 12, completed: 8, inProgress: 3, pending: 1, efficiency: 92, color: 'bg-blue-500' },
    { name: 'Mike Johnson', avatar: 'MJ', tasks: 15, completed: 10, inProgress: 4, pending: 1, efficiency: 88, color: 'bg-purple-500' },
    { name: 'Emma Davis', avatar: 'ED', tasks: 10, completed: 7, inProgress: 2, pending: 1, efficiency: 95, color: 'bg-emerald-500' },
    { name: 'Alex Wilson', avatar: 'AW', tasks: 14, completed: 9, inProgress: 3, pending: 2, efficiency: 85, color: 'bg-orange-500' },
    { name: 'David Kim', avatar: 'DK', tasks: 11, completed: 6, inProgress: 4, pending: 1, efficiency: 78, color: 'bg-pink-500' },
  ];

  const recentActivity = [
    { id: 1, user: 'Sarah Chen', action: 'completed', item: 'Design homepage mockup', time: '10 minutes ago', type: 'task' },
    { id: 2, user: 'Mike Johnson', action: 'created', item: 'Mobile App Development', time: '1 hour ago', type: 'project' },
    { id: 3, user: 'Emma Davis', action: 'updated', item: 'Create component library', time: '2 hours ago', type: 'task' },
    { id: 4, user: 'Alex Wilson', action: 'completed', item: 'Setup authentication flow', time: '3 hours ago', type: 'task' },
    { id: 5, user: 'David Kim', action: 'commented on', item: 'Database schema design', time: '4 hours ago', type: 'task' },
  ];

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'On Track': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'At Risk': 'bg-orange-100 text-orange-700 border-orange-200',
      'Delayed': 'bg-red-100 text-red-700 border-red-200',
      'Completed': 'bg-blue-100 text-blue-700 border-blue-200',
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  };

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
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Reports & Analytics</h1>
              <p className="text-slate-500 font-medium mt-1">Track project performance and team productivity</p>
            </div>
          </div>
        </div>

        {/* Overview Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Tasks */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${trends.tasksThisWeek.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {trends.tasksThisWeek.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {trends.tasksThisWeek.change}%
              </div>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-1">{overallStats.totalTasks}</h3>
            <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Total Tasks</p>
            <p className="text-xs text-slate-500 mt-2">{trends.tasksThisWeek.value} this week</p>
          </div>

          {/* Completed Tasks */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${trends.completionRate.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {trends.completionRate.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {trends.completionRate.change}%
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
            <p className="text-xs text-slate-500 mt-2">Avg. {overallStats.avgCompletionTime}</p>
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
                <span className="text-sm text-slate-500 font-medium">{projectProgress.length} Projects</span>
              </div>

              <div className="space-y-4">
                {projectProgress.map((project) => (
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
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Recent Activity
              </h2>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
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
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${activity.type === 'project' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                      {activity.type}
                    </span>
                  </div>
                ))}
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
                {teamWorkload.map((member, index) => (
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
                        <p className="text-xs text-slate-600 font-medium">Active</p>
                      </div>
                      <div className="bg-slate-100 rounded-lg p-2">
                        <p className="text-lg font-black text-slate-700">{member.pending}</p>
                        <p className="text-xs text-slate-600 font-medium">Todo</p>
                      </div>
                    </div>
                  </div>
                ))}
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
                    <span className="font-black text-slate-900">87.6%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Total Tasks</span>
                    <span className="font-black text-slate-900">62</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Completed</span>
                    <span className="font-black text-emerald-700">40</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Team Members</span>
                    <span className="font-black text-slate-900">{teamWorkload.length}</span>
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
