"use client";

import React, { useState, useEffect } from "react";
import {
    History,
    CheckSquare,
    CheckCircle2,
    MessageSquare,
    Folder,
    UserPlus,
    Clock,
    AlertCircle,
    RefreshCw,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type BadgeType = "task" | "project" | "comment" | "member";
type ActivityType =
    | "task_created"
    | "task_completed"
    | "task_updated"
    | "comment_added"
    | "project_created"
    | "member_added";

interface Activity {
    id: string;
    type: ActivityType;
    user: string;
    action: string;
    item: string;
    subItem: string;
    timeAgo: string;
    badgeLabel: string;
    badgeType: BadgeType;
}

// ─── Config maps (no logic changes, purely presentational) ────────────────────

const ICON_MAP: Record<ActivityType, React.ReactNode> = {
    task_created: <CheckSquare className="w-4 h-4 text-white" />,
    task_completed: <CheckCircle2 className="w-4 h-4 text-white" />,
    task_updated: <Clock className="w-4 h-4 text-white" />,
    comment_added: <MessageSquare className="w-4 h-4 text-white" />,
    project_created: <Folder className="w-4 h-4 text-white" />,
    member_added: <UserPlus className="w-4 h-4 text-white" />,
};

const AVATAR_BG: Record<ActivityType, string> = {
    task_created: "bg-gradient-to-br from-blue-500 to-blue-600",
    task_completed: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    task_updated: "bg-gradient-to-br from-orange-500 to-orange-600",
    comment_added: "bg-gradient-to-br from-purple-500 to-purple-600",
    project_created: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    member_added: "bg-gradient-to-br from-pink-500 to-pink-600",
};

const BADGE_COLOR: Record<BadgeType, string> = {
    task: "bg-blue-100 text-blue-700",
    project: "bg-indigo-100 text-indigo-700",
    comment: "bg-purple-100 text-purple-700",
    member: "bg-pink-100 text-pink-700",
};

const FILTER_OPTIONS: { label: string; value: BadgeType | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Tasks", value: "task" },
    { label: "Projects", value: "project" },
    { label: "Comments", value: "comment" },
    { label: "Members", value: "member" },
];

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ActivitySkeleton() {
    return (
        <div className="flex items-start gap-4 p-4 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
                <div className="h-3 bg-slate-100 rounded w-1/4" />
            </div>
            <div className="w-16 h-6 bg-slate-200 rounded-lg flex-shrink-0" />
        </div>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HistoryPage() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<BadgeType | "all">("all");

    const fetchHistory = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/history");
            if (!res.ok) throw new Error(`Request failed: ${res.status}`);
            const data = await res.json();
            setActivities(data.activities ?? []);
        } catch (err) {
            console.error("History fetch error:", err);
            setError("Failed to load activity history. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    // ── Filter ───────────────────────────────────────────────────────────────
    const displayed =
        activeFilter === "all"
            ? activities
            : activities.filter((a) => a.badgeType === activeFilter);

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">
                            <History className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                                Activity History
                            </h1>
                            <p className="text-slate-500 font-medium mt-1">
                                A chronological log of all recent actions
                            </p>
                        </div>
                    </div>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <p className="text-red-700 font-medium text-sm">{error}</p>
                        </div>
                        <button
                            onClick={fetchHistory}
                            className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-xl text-red-700 font-bold text-sm transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Filter Tabs + Refresh */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 flex-wrap">
                        {FILTER_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setActiveFilter(opt.value)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeFilter === opt.value
                                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                    }`}
                            >
                                {opt.label}
                                {!isLoading && opt.value !== "all" && (
                                    <span className="ml-1.5 text-xs opacity-75">
                                        ({activities.filter((a) => a.badgeType === opt.value).length})
                                    </span>
                                )}
                                {!isLoading && opt.value === "all" && (
                                    <span className="ml-1.5 text-xs opacity-75">({activities.length})</span>
                                )}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={fetchHistory}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                        Refresh
                    </button>
                </div>

                {/* Activity Feed Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

                    {/* Loading */}
                    {isLoading && (
                        <div className="divide-y divide-slate-100">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <ActivitySkeleton key={i} />
                            ))}
                        </div>
                    )}

                    {/* Empty */}
                    {!isLoading && !error && displayed.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <History className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-black text-slate-900 mb-2">No activity found</h3>
                            <p className="text-slate-500 text-sm">
                                {activeFilter === "all"
                                    ? "No recent activity to display."
                                    : `No ${activeFilter} activity found. Try a different filter.`}
                            </p>
                        </div>
                    )}

                    {/* Activity list */}
                    {!isLoading && !error && displayed.length > 0 && (
                        <div className="divide-y divide-slate-100">
                            {displayed.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-start gap-4 p-4 hover:bg-slate-50 transition-colors"
                                >
                                    {/* Avatar / type icon */}
                                    <div
                                        className={`w-10 h-10 rounded-full ${AVATAR_BG[activity.type]} flex items-center justify-center flex-shrink-0 shadow-md`}
                                    >
                                        {ICON_MAP[activity.type]}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-slate-900 leading-snug">
                                            <span className="font-black">{activity.user}</span>{" "}
                                            <span className="text-slate-600">{activity.action}</span>{" "}
                                            <span className="font-bold">{activity.item}</span>
                                        </p>
                                        {activity.subItem && (
                                            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                                                {activity.subItem}
                                            </p>
                                        )}
                                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {activity.timeAgo}
                                        </p>
                                    </div>

                                    {/* Badge */}
                                    <span
                                        className={`px-2.5 py-1 rounded-lg text-xs font-bold flex-shrink-0 ${BADGE_COLOR[activity.badgeType]}`}
                                    >
                                        {activity.badgeLabel}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Footer count */}
                    {!isLoading && displayed.length > 0 && (
                        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50">
                            <p className="text-xs text-slate-500 font-medium">
                                Showing {displayed.length} of {activities.length} activities
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
