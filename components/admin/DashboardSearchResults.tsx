"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Folder, CheckSquare, User, ArrowRight, X } from 'lucide-react';
import { useSearch } from '@/contexts/SearchContext';

// Mock data for tasks and projects - TODO: Replace with API calls when available
const mockProjects = [
    { id: 1, name: "Website Redesign", description: "Complete overhaul of company website", status: "In Progress", progress: 75 },
    { id: 2, name: "Mobile App Development", description: "Native iOS and Android app", status: "In Progress", progress: 45 },
    { id: 3, name: "Dashboard Analytics", description: "Advanced analytics dashboard", status: "Review", progress: 90 },
    { id: 4, name: "API Integration", description: "Third-party API integration", status: "Planning", progress: 30 },
];

const mockTasks = [
    { id: 1, title: "Design homepage mockup", project: "Website Redesign", status: "Completed", priority: "High" },
    { id: 2, title: "Implement responsive navbar", project: "Website Redesign", status: "Completed", priority: "High" },
    { id: 3, title: "Create component library", project: "Website Redesign", status: "In Progress", priority: "Medium" },
    { id: 4, title: "Setup authentication flow", project: "Mobile App", status: "In Progress", priority: "High" },
    { id: 5, title: "Database schema design", project: "Mobile App", status: "Pending", priority: "High" },
];

interface DBUser {
    userid: number;
    username: string;
    email: string;
    role: string | null;
    is_active: boolean | null;
}

export function DashboardSearchResults() {
    const { searchQuery, setSearchQuery } = useSearch();
    const [users, setUsers] = useState<DBUser[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch real users from database
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('/api/users');
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                }
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    if (!searchQuery || searchQuery.trim() === '') {
        return null;
    }

    const query = searchQuery.toLowerCase();

    // Filter data
    const filteredProjects = mockProjects.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );

    const filteredTasks = mockTasks.filter(t =>
        t.title.toLowerCase().includes(query) ||
        t.project.toLowerCase().includes(query)
    );

    // ✅ REAL DATABASE USERS - No mock data
    const filteredUsers = users.filter(u =>
        u.username.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        (u.role && u.role.toLowerCase().includes(query))
    );

    const totalResults = filteredProjects.length + filteredTasks.length + filteredUsers.length;

    if (loading) {
        return (
            <div className="mb-8 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-indigo-200 shadow-xl">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <Search className="w-6 h-6 text-white animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">
                            Searching for "{searchQuery}"...
                        </h2>
                        <p className="text-sm text-slate-500 font-medium">
                            Loading results from database
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-8 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-indigo-200 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <Search className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">
                            Search Results for "{searchQuery}"
                        </h2>
                        <p className="text-sm text-slate-500 font-medium">
                            Found {totalResults} result{totalResults !== 1 ? 's' : ''} across all categories
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setSearchQuery('')}
                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                    title="Clear search"
                >
                    <X className="w-5 h-5 text-slate-600" />
                </button>
            </div>

            {totalResults === 0 ? (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2">No results found</h3>
                    <p className="text-slate-500 text-sm">Try searching with different keywords</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Projects Results */}
                    {filteredProjects.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Folder className="w-5 h-5 text-indigo-600" />
                                <h3 className="text-lg font-black text-slate-900">
                                    Projects ({filteredProjects.length})
                                </h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {filteredProjects.map((project) => (
                                    <Link
                                        key={project.id}
                                        href={`/AdminPanel/projects/${project.id}`}
                                        className="group p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <h4 className="font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                                                    {project.name}
                                                </h4>
                                                <p className="text-xs text-slate-500 line-clamp-1">{project.description}</p>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                                                    style={{ width: `${project.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-indigo-600">{project.progress}%</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tasks Results */}
                    {filteredTasks.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <CheckSquare className="w-5 h-5 text-teal-600" />
                                <h3 className="text-lg font-black text-slate-900">
                                    Tasks ({filteredTasks.length})
                                </h3>
                            </div>
                            <div className="space-y-2">
                                {filteredTasks.slice(0, 5).map((task) => (
                                    <Link
                                        key={task.id}
                                        href={`/AdminPanel/tasks/${task.id}`}
                                        className="group flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm group-hover:text-teal-600 transition-colors">
                                                    {task.title}
                                                </h4>
                                                <p className="text-xs text-slate-500">{task.project}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded-lg text-xs font-bold ${task.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                                                    task.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-slate-100 text-slate-700'
                                                }`}>
                                                {task.status}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </Link>
                                ))}
                                {filteredTasks.length > 5 && (
                                    <p className="text-xs text-slate-500 text-center pt-2">
                                        +{filteredTasks.length - 5} more tasks
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Users Results - ✅ REAL DATABASE DATA */}
                    {filteredUsers.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <User className="w-5 h-5 text-purple-600" />
                                <h3 className="text-lg font-black text-slate-900">
                                    Users ({filteredUsers.length})
                                    <span className="ml-2 text-xs font-normal text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                                        ✓ From Database
                                    </span>
                                </h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {filteredUsers.map((user) => (
                                    <Link
                                        key={user.userid}
                                        href={`/AdminPanel/users`}
                                        className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                                            {user.username.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-900 text-sm group-hover:text-purple-600 transition-colors">
                                                {user.username}
                                            </h4>
                                            <p className="text-xs text-slate-500">{user.email}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {user.role === 'admin' && (
                                                <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                                    Admin
                                                </span>
                                            )}
                                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
