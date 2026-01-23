import React from 'react';
import { CheckCircle2, ListTodo, Clock, Calendar, Activity, Plus, ArrowUpRight, CheckSquare } from 'lucide-react';

export default function UserDashboard() {
  const stats = [
    {
      title: "Total Tasks",
      value: "12",
      icon: ListTodo,
      color: "from-teal-500 to-cyan-600",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600"
    },
    {
      title: "In Progress",
      value: "4",
      icon: Clock,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600"
    },
    {
      title: "Completed",
      value: "8",
      icon: CheckCircle2,
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600"
    }
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
                  Welcome back, User!
                </h1>
              </div>
              <p className="text-white/90 font-medium flex items-center gap-2 ml-16">
                <Calendar className="w-4 h-4" />
                Here's what's on your plate today
              </p>
            </div>
            <button className="px-6 py-3 bg-white rounded-xl font-bold text-purple-600 hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Task
            </button>
          </div>
        </div>

        {/* Stats Cards with Gradient Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
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
      </div>
    </div>
  );
}