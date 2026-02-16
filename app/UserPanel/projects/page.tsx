"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Folder,
  Calendar,
  Users,
  Target,
  TrendingUp,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
} from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  priority: string;
  progress: number;
  startDate: string;
  dueDate: string;
  teamSize: number;
  userRole: string;
  tasks: {
    total: number;
    completed: number;
  };
}

export default function UserProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/user/projects');

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Not Started': 'bg-purple-100 text-purple-700 border-purple-200',
      'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
      'Review': 'bg-orange-100 text-orange-700 border-orange-200',
      'Completed': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'High': 'text-red-600',
      'Medium': 'text-orange-600',
      'Low': 'text-emerald-600',
    };
    return colors[priority] || 'text-slate-600';
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-8">
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <div>
              <h3 className="font-bold text-red-900 text-lg">Error Loading Projects</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchProjects}
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-900 mb-2">My Projects</h1>
          <p className="text-slate-600 text-lg">Projects you've been assigned to</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-2xl font-medium focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Folder className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">
              {searchQuery ? 'No Projects Found' : 'No Projects Yet'}
            </h2>
            <p className="text-slate-500 mb-6">
              {searchQuery
                ? 'Try adjusting your search query'
                : 'You haven\'t been assigned to any projects yet'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/UserPanel/projects/${project.id}`}
                className="block group"
              >
                <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 h-full">
                  {/* Project Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Folder className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2">
                        {project.description || 'No description'}
                      </p>
                    </div>
                  </div>

                  {/* Project Status & Priority */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    <span className={`text-xs font-black flex items-center gap-1 ${getPriorityColor(project.priority)}`}>
                      <Target className="w-3 h-3" />
                      {project.priority}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-500">Progress</span>
                      <span className="text-sm font-black text-slate-900">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-1">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="text-xs font-bold text-slate-500">Tasks</p>
                      <p className="text-sm font-black text-slate-900">
                        {project.tasks.completed}/{project.tasks.total}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center mx-auto mb-1">
                        <Users className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-xs font-bold text-slate-500">Team</p>
                      <p className="text-sm font-black text-slate-900">{project.teamSize}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center mx-auto mb-1">
                        <Calendar className="w-4 h-4 text-orange-600" />
                      </div>
                      <p className="text-xs font-bold text-slate-500">Due</p>
                      <p className="text-xs font-black text-slate-900">
                        {project.dueDate || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* User Role Badge */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-500">Your Role: </span>
                    <span className="text-xs font-black text-blue-600">{project.userRole}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
