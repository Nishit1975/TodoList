"use client";

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  X,
  Filter,
  Calendar,
  User,
  Flag,
  Folder,
  CheckSquare,
  Clock,
  Target,
  Bookmark,
  Star,
  TrendingUp,
  FileText,
} from 'lucide-react';
import type { SearchTask, SearchProject } from '@/app/lib/search';

// ─── Types ────────────────────────────────────────────────────────────────────

type SearchResult = (SearchTask | SearchProject) & { type: 'task' | 'project' };

type SavedSearch = {
  id: number;
  name: string;
  query: string;
  filters: {
    priority: string;
    status: string;
    assignee: string;
    dateRange: string;
    project: string;
  };
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function SearchPage() {
  const searchParams = useSearchParams();

  // ── State ──────────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'tasks' | 'projects'>('all');

  // Data from API
  const [allTasks, setAllTasks] = useState<SearchTask[]>([]);
  const [allProjects, setAllProjects] = useState<SearchProject[]>([]);
  const [assignees, setAssignees] = useState<string[]>([]);
  const [projectNames, setProjectNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [assigneeFilter, setAssigneeFilter] = useState('All');
  const [dateRangeFilter, setDateRangeFilter] = useState('All');
  const [projectFilter, setProjectFilter] = useState('All');

  // Saved searches
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([
    { id: 1, name: "High Priority Tasks", query: "", filters: { priority: "High", status: "All", assignee: "All", dateRange: "All", project: "All" } },
    { id: 2, name: "My Overdue Tasks", query: "", filters: { priority: "All", status: "Pending", assignee: "All", dateRange: "Overdue", project: "All" } },
  ]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [newSearchName, setNewSearchName] = useState('');

  // Debounce ref
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Filter options ─────────────────────────────────────────────────────────
  const uniqueAssignees = ['All', ...assignees];
  const uniqueProjects = ['All', ...projectNames];
  const priorityOptions = ['All', 'High', 'Medium', 'Low'];
  const statusOptions = ['All', 'Pending', 'In Progress', 'Completed', 'Review', 'Planning', 'On Hold'];
  const dateRangeOptions = ['All', 'Today', 'This Week', 'This Month', 'Overdue'];

  // ── Fetch data from API ────────────────────────────────────────────────────
  const fetchData = useCallback(async (
    query: string,
    priority: string,
    status: string,
    assignee: string,
    project: string,
    dateRange: string,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        q: query,
        priority,
        status,
        assignee,
        project,
        dateRange,
      });
      const res = await fetch(`/api/search?${params.toString()}`);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setAllTasks(data.tasks ?? []);
      setAllProjects(data.projects ?? []);
      setAssignees(data.assignees ?? []);
      setProjectNames(data.projectNames ?? []);
    } catch (err) {
      console.error('Search fetch error:', err);
      setError('Failed to load search results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Initialize from URL param ──────────────────────────────────────────────
  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [searchParams]);

  // ── Debounced re-fetch on filter changes ───────────────────────────────────
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchData(searchQuery, priorityFilter, statusFilter, assigneeFilter, projectFilter, dateRangeFilter);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery, priorityFilter, statusFilter, assigneeFilter, projectFilter, dateRangeFilter, fetchData]);

  // ── Combine results ────────────────────────────────────────────────────────
  const filteredResults: SearchResult[] = useMemo(() => {
    return [...allTasks, ...allProjects] as SearchResult[];
  }, [allTasks, allProjects]);

  const tasks = allTasks;
  const projects = allProjects;

  const displayResults: SearchResult[] =
    activeTab === 'all' ? filteredResults :
      activeTab === 'tasks' ? (tasks as SearchResult[]) :
        (projects as SearchResult[]);

  // ── Saved search helpers ───────────────────────────────────────────────────
  const clearFilters = () => {
    setSearchQuery('');
    setPriorityFilter('All');
    setStatusFilter('All');
    setAssigneeFilter('All');
    setDateRangeFilter('All');
    setProjectFilter('All');
  };

  const saveCurrentSearch = () => {
    if (newSearchName.trim()) {
      const newSearch: SavedSearch = {
        id: Date.now(),
        name: newSearchName,
        query: searchQuery,
        filters: {
          priority: priorityFilter,
          status: statusFilter,
          assignee: assigneeFilter,
          dateRange: dateRangeFilter,
          project: projectFilter,
        }
      };
      setSavedSearches([...savedSearches, newSearch]);
      setNewSearchName('');
      setShowSaveModal(false);
    }
  };

  const loadSavedSearch = (search: SavedSearch) => {
    setSearchQuery(search.query);
    setPriorityFilter(search.filters.priority);
    setStatusFilter(search.filters.status);
    setAssigneeFilter(search.filters.assignee);
    setDateRangeFilter(search.filters.dateRange);
    setProjectFilter(search.filters.project);
  };

  const deleteSavedSearch = (id: number) => {
    setSavedSearches(savedSearches.filter(s => s.id !== id));
  };

  // ── Badge / color helpers ──────────────────────────────────────────────────
  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
      'Planning': 'bg-purple-100 text-purple-700 border-purple-200',
      'Review': 'bg-orange-100 text-orange-700 border-orange-200',
      'Completed': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'On Hold': 'bg-slate-100 text-slate-700 border-slate-200',
      'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200'
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'High': 'text-red-600',
      'Medium': 'text-orange-600',
      'Low': 'text-emerald-600'
    };
    return colors[priority] || 'text-slate-600';
  };

  const hasActiveFilters = priorityFilter !== 'All' || statusFilter !== 'All' ||
    assigneeFilter !== 'All' || dateRangeFilter !== 'All' ||
    projectFilter !== 'All';

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">
              <Search className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Search &amp; Filters</h1>
              <p className="text-slate-500 font-medium mt-1">Search across all tasks and projects</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Saved Searches */}
          <div className="col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-blue-600" />
                  Saved Searches
                </h2>
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Save current search"
                >
                  <Star className="w-4 h-4 text-slate-600" />
                </button>
              </div>
              <div className="space-y-2">
                {savedSearches.map(search => (
                  <div
                    key={search.id}
                    className="group p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-blue-200"
                  >
                    <div className="flex items-start justify-between">
                      <button
                        onClick={() => loadSavedSearch(search)}
                        className="flex-1 text-left"
                      >
                        <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {search.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {Object.values(search.filters).filter(f => f !== 'All').length} filters active
                        </p>
                      </button>
                      <button
                        onClick={() => deleteSavedSearch(search.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
                      >
                        <X className="w-3 h-3 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-6 shadow-xl text-white">
              <h3 className="text-lg font-black mb-4">Search Results</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-sm text-white/70">Total Results</span>
                  {isLoading ? (
                    <span className="font-black text-xl animate-pulse">—</span>
                  ) : (
                    <span className="font-black text-xl">{filteredResults.length}</span>
                  )}
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-sm text-white/70">Tasks</span>
                  {isLoading ? (
                    <span className="font-black animate-pulse">—</span>
                  ) : (
                    <span className="font-black">{tasks.length}</span>
                  )}
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-white/70">Projects</span>
                  {isLoading ? (
                    <span className="font-black animate-pulse">—</span>
                  ) : (
                    <span className="font-black">{projects.length}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9 space-y-6">
            {/* Search Bar */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tasks, projects, assignees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                )}
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${showFilters || hasActiveFilters
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs">
                      {[priorityFilter, statusFilter, assigneeFilter, dateRangeFilter, projectFilter]
                        .filter(f => f !== 'All').length}
                    </span>
                  )}
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-sm text-slate-700 transition-all flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </button>
                )}
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Priority</label>
                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-sm text-slate-900 focus:border-blue-300 focus:outline-none transition-all cursor-pointer"
                    >
                      {priorityOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-sm text-slate-900 focus:border-blue-300 focus:outline-none transition-all cursor-pointer"
                    >
                      {statusOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Assignee</label>
                    <select
                      value={assigneeFilter}
                      onChange={(e) => setAssigneeFilter(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-sm text-slate-900 focus:border-blue-300 focus:outline-none transition-all cursor-pointer"
                    >
                      {uniqueAssignees.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Due Date</label>
                    <select
                      value={dateRangeFilter}
                      onChange={(e) => setDateRangeFilter(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-sm text-slate-900 focus:border-blue-300 focus:outline-none transition-all cursor-pointer"
                    >
                      {dateRangeOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Project</label>
                    <select
                      value={projectFilter}
                      onChange={(e) => setProjectFilter(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-sm text-slate-900 focus:border-blue-300 focus:outline-none transition-all cursor-pointer"
                    >
                      {uniqueProjects.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Results Tabs */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="flex border-b border-slate-100 p-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  All Results ({isLoading ? '…' : filteredResults.length})
                </button>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'tasks'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  Tasks ({isLoading ? '…' : tasks.length})
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'projects'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  Projects ({isLoading ? '…' : projects.length})
                </button>
              </div>

              {/* Results List */}
              <div className="p-6">
                {/* Error State */}
                {error && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <X className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2">Something went wrong</h3>
                    <p className="text-slate-500 text-sm">{error}</p>
                    <button
                      onClick={() => fetchData(searchQuery, priorityFilter, statusFilter, assigneeFilter, projectFilter, dateRangeFilter)}
                      className="mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Loading State */}
                {!error && isLoading && (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white animate-pulse">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-slate-200 flex-shrink-0" />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 space-y-2">
                                <div className="h-4 bg-slate-200 rounded w-2/3" />
                                <div className="h-3 bg-slate-100 rounded w-1/2" />
                              </div>
                              <div className="ml-4 h-6 w-20 bg-slate-200 rounded-full" />
                            </div>
                            <div className="flex gap-4">
                              <div className="h-3 bg-slate-100 rounded w-16" />
                              <div className="h-3 bg-slate-100 rounded w-24" />
                              <div className="h-3 bg-slate-100 rounded w-20" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {!error && !isLoading && displayResults.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2">No results found</h3>
                    <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
                  </div>
                )}

                {/* Results */}
                {!error && !isLoading && displayResults.length > 0 && (
                  <div className="space-y-3">
                    {displayResults.map((item) => (
                      <div key={`${item.type}-${item.id}`}>
                        {item.type === 'task' && 'title' in item && (
                          <Link
                            href={`/AdminPanel/tasks/${item.id}`}
                            className="block p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-white"
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                                <CheckSquare className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <h3 className="font-black text-slate-900 mb-1">{item.title}</h3>
                                    <p className="text-sm text-slate-500 line-clamp-1">{item.description}</p>
                                  </div>
                                  <span className={`ml-4 px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(item.status)}`}>
                                    {item.status}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                  <span className={`flex items-center gap-1 font-black ${getPriorityColor(item.priority)}`}>
                                    <Flag className="w-3 h-3" />
                                    {item.priority}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {item.assignee}
                                  </span>
                                  {item.dueDate && (
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      {item.dueDate}
                                    </span>
                                  )}
                                  {item.project && (
                                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg">
                                      <Folder className="w-3 h-3" />
                                      {item.project}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                        )}

                        {item.type === 'project' && 'name' in item && (
                          <Link
                            href={`/AdminPanel/projects/${item.id}`}
                            className="block p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 bg-white"
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                <Folder className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <h3 className="font-black text-slate-900 mb-1">{item.name}</h3>
                                    <p className="text-sm text-slate-500 line-clamp-1">{item.description}</p>
                                  </div>
                                  <span className={`ml-4 px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(item.status)}`}>
                                    {item.status}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                        style={{ width: `${item.progress}%` }}
                                      />
                                    </div>
                                    <span className="text-xs font-black text-slate-700">{item.progress}%</span>
                                  </div>
                                  <span className={`text-xs font-black flex items-center gap-1 ${getPriorityColor(item.priority)}`}>
                                    <Target className="w-3 h-3" />
                                    {item.priority}
                                  </span>
                                  <span className="text-xs text-slate-500 flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {item.team} members
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Save Search Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-slate-900">Save Search</h2>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">Search Name</label>
                <input
                  type="text"
                  value={newSearchName}
                  onChange={(e) => setNewSearchName(e.target.value)}
                  placeholder="e.g., High Priority Tasks"
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={saveCurrentSearch}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white hover:shadow-xl transition-all"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
