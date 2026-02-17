"use client";

import React from 'react';
import Link from 'next/link';
import {
  LayoutGrid,
  Folder,
  CheckSquare,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowUpRight,
  Calendar,
  Activity,
  Target,
  Zap,
  Star,
  Award
} from 'lucide-react';
import { DashboardSearchResults } from '@/components/admin/DashboardSearchResults';
import { useAdminProtection } from '@/hooks/useProtection';

export default function AdminDashboard() {
  // Client-side authentication protection
  useAdminProtection();
  // Mock data - replace with real data from API
  const stats = [
    {
      title: "Total Tasks",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: CheckSquare,
      color: "from-teal-500 to-cyan-600",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600"
    },
    {
      title: "In Progress",
      value: "156",
      change: "+8%",
      trend: "up",
      icon: Clock,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600"
    },
    {
      title: "Collaborators",
      value: "48",
      change: "+3",
      trend: "up",
      icon: Users,
      color: "from-violet-500 to-purple-600",
      bgColor: "bg-violet-50",
      textColor: "text-violet-600"
    },
    {
      title: "Completion Rate",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: Target,
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600"
    }
  ];

  const recentProjects = [
    { name: "Website Redesign", progress: 75, status: "In Progress", team: 8, dueDate: "Mar 15" },
    { name: "Mobile App", progress: 45, status: "In Progress", team: 6, dueDate: "Apr 20" },
    { name: "Dashboard Analytics", progress: 90, status: "Review", team: 4, dueDate: "Feb 28" },
    { name: "API Integration", progress: 30, status: "Planning", team: 5, dueDate: "May 10" },
  ];

  const recentActivities = [
    { user: "Sarah Chen", action: "completed task", item: "User Authentication", time: "5 min ago", icon: CheckCircle2, color: "text-green-500" },
    { user: "Mike Johnson", action: "created project", item: "E-commerce Platform", time: "1 hour ago", icon: Plus, color: "text-blue-500" },
    { user: "Emma Davis", action: "updated", item: "Dashboard UI", time: "2 hours ago", icon: Activity, color: "text-purple-500" },
    { user: "Alex Wilson", action: "commented on", item: "API Documentation", time: "3 hours ago", icon: AlertCircle, color: "text-orange-500" },
    { user: "Lisa Anderson", action: "completed", item: "Design Review", time: "5 hours ago", icon: CheckCircle2, color: "text-green-500" },
  ];

  const quickActions = [
    { name: "New Task", icon: Plus, color: "from-teal-500 to-cyan-600", href: "/AdminPanel/projects" },
    { name: "Add Note", icon: Folder, color: "from-amber-500 to-orange-600", href: "/AdminPanel/tasks" },
    { name: "Invite Team", icon: Users, color: "from-violet-500 to-purple-600", href: "/AdminPanel/users" },
    { name: "Analytics", icon: TrendingUp, color: "from-emerald-500 to-green-600", href: "/AdminPanel/reports" },
  ];

  const topPerformers = [
    { name: "Sarah Chen", tasks: 24, badge: "🏆", score: 98 },
    { name: "Mike Johnson", tasks: 21, badge: "⭐", score: 95 },
    { name: "Emma Davis", tasks: 19, badge: "🎯", score: 92 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Unique Floating Header Card */}
        <div className="mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-[2rem] p-8 shadow-2xl shadow-purple-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-black text-white tracking-tight">
                  My Todo Workspace
                </h1>
              </div>
              <p className="text-white/90 font-medium flex items-center gap-2 ml-16">
                <Calendar className="w-4 h-4" />
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl font-bold text-white hover:bg-white/30 transition-all duration-300 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Export
              </button>
              <button className="px-6 py-3 bg-white rounded-xl font-bold text-purple-600 hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Task
              </button>
            </div>
          </div>
        </div>

        {/* Search Results Section - Shows when user searches */}
        <DashboardSearchResults />

        {/* Horizontal Stats Cards with Different Style */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`px-2.5 py-1 rounded-lg ${stat.bgColor} ${stat.textColor} text-xs font-black`}>
                    {stat.change}
                  </div>
                </div>
                <p className="text-slate-600 text-xs font-semibold mb-1 uppercase tracking-wide">{stat.title}</p>
                <p className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Asymmetric Two Column Layout */}
        <div className="grid grid-cols-12 gap-6 mb-8">

          {/* Left Sidebar - Quick Actions & Top Performers Stacked */}
          <div className="col-span-3 space-y-6">

            {/* Quick Actions - Vertical List Style */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-lg">
              <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Quick Actions
              </h2>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{action.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Top Performers - Compact Cards */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-5 shadow-xl text-white">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-yellow-300" />
                <h2 className="text-lg font-black">Top Contributors</h2>
              </div>
              <div className="space-y-2">
                {topPerformers.map((performer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{performer.badge}</span>
                      <div>
                        <p className="font-bold text-sm leading-tight">{performer.name}</p>
                        <p className="text-xs text-white/70">{performer.tasks} done</p>
                      </div>
                    </div>
                    <div className="text-2xl font-black">{performer.score}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Content - Active Lists */}
          <div className="col-span-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Active Todo Lists
              </h2>
              <Link
                href="/AdminPanel/projects"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-bold text-sm hover:shadow-lg transition-all duration-300 flex items-center gap-1"
              >
                View All
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentProjects.map((project, index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl p-4 hover:border-purple-300 transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                          <CheckSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-black text-slate-900 mb-1">{project.name}</h3>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg">
                              <Users className="w-3 h-3" />
                              {project.team}
                            </span>
                            <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg">
                              <Calendar className="w-3 h-3" />
                              {project.dueDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1.5 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black border border-indigo-200">
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-black text-indigo-600 min-w-[50px] text-right">
                        {project.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Activity Feed */}
          <div className="col-span-3 bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-black text-slate-900">Activity</h2>
            </div>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-purple-200"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <activity.icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-900 leading-relaxed">
                        <span className="font-black">{activity.user}</span>
                        {' '}{activity.action}{' '}
                        <span className="font-bold text-indigo-600">{activity.item}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}