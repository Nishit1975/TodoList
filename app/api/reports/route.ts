import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// ── Helpers ────────────────────────────────────────────────────────────────────

function timeAgo(date: Date | null | string | undefined): string {
    if (!date) return "recently";
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

const AVATAR_COLORS = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-emerald-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-indigo-500",
];

function avatarColor(userId: number): string {
    return AVATAR_COLORS[userId % AVATAR_COLORS.length];
}

function initials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

// ── GET /api/reports ───────────────────────────────────────────────────────────

export async function GET() {
    try {
        // Run ALL queries in parallel — no N+1
        const [
            totalTasks,
            completedTasks,
            inProgressTasks,
            totalProjects,
            activeProjects,
            projects,
            usersWithTasks,
            recentTasks,
            recentComments,
        ] = await Promise.all([
            // 1. Total tasks
            prisma.tasks.count(),

            // 2. Completed tasks (DONE)
            prisma.tasks.count({ where: { status: "DONE" } }),

            // 3. In-progress tasks
            prisma.tasks.count({ where: { status: "IN_PROGRESS" } }),

            // 4. Total projects
            prisma.projects.count(),

            // 5. Active projects (not Completed)
            prisma.projects.count({
                where: { status: { not: "Completed" } },
            }),

            // 6. All projects with their tasks + member count
            prisma.projects.findMany({
                select: {
                    project_id: true,
                    name: true,
                    status: true,
                    tasks: { select: { id: true, status: true } },
                    project_members: { select: { id: true } },
                },
                orderBy: { created_at: "desc" },
            }),

            // 7. All users with their assigned tasks (for team workload)
            prisma.users.findMany({
                where: { is_active: true },
                select: {
                    userid: true,
                    username: true,
                    tasks_tasks_assignee_idTousers: {
                        select: { id: true, status: true },
                    },
                },
                orderBy: { username: "asc" },
            }),

            // 8. Last 5 created tasks (for recent activity)
            prisma.tasks.findMany({
                take: 5,
                orderBy: { created_at: "desc" },
                select: {
                    id: true,
                    title: true,
                    status: true,
                    created_at: true,
                    users_tasks_assignee_idTousers: { select: { username: true } },
                },
            }),

            // 9. Last 5 comments (for recent activity)
            prisma.comments.findMany({
                take: 5,
                orderBy: { comment_id: "desc" },
                select: {
                    comment_id: true,
                    content: true,
                    users: { select: { username: true } },
                    tasks: { select: { title: true } },
                },
            }),
        ]);

        // ── 1. Overview stats ───────────────────────────────────────────────────
        const completionRate =
            totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        // ── 2. Project progress ─────────────────────────────────────────────────
        const projectProgress = projects.map((p) => {
            const total = p.tasks.length;
            const done = p.tasks.filter((t) => t.status === "DONE").length;
            const progress = total > 0 ? Math.round((done / total) * 100) : 0;

            let trackStatus: string;
            if (p.status === "Completed") {
                trackStatus = "Completed";
            } else if (progress >= 80) {
                trackStatus = "On Track";
            } else if (progress < 50) {
                trackStatus = "At Risk";
            } else {
                trackStatus = "On Track";
            }

            return {
                id: p.project_id,
                name: p.name,
                progress,
                totalTasks: total,
                completedTasks: done,
                status: trackStatus,
            };
        });

        // ── 3. Team workload ────────────────────────────────────────────────────
        const teamWorkload = usersWithTasks
            .filter((u) => u.tasks_tasks_assignee_idTousers.length > 0) // only users with tasks
            .map((u) => {
                const userTasks = u.tasks_tasks_assignee_idTousers;
                const total = userTasks.length;
                const done = userTasks.filter((t) => t.status === "DONE").length;
                const inProg = userTasks.filter((t) => t.status === "IN_PROGRESS").length;
                const pending = userTasks.filter((t) => t.status === "NOT_STARTED").length;
                const efficiency = total > 0 ? Math.round((done / total) * 100) : 0;

                return {
                    name: u.username,
                    avatar: initials(u.username),
                    tasks: total,
                    completed: done,
                    inProgress: inProg,
                    pending,
                    efficiency,
                    color: avatarColor(u.userid),
                };
            })
            .sort((a, b) => b.efficiency - a.efficiency); // highest efficiency first

        // ── 4. Team performance summary ─────────────────────────────────────────
        const teamTotalTasks = teamWorkload.reduce((s, m) => s + m.tasks, 0);
        const teamTotalDone = teamWorkload.reduce((s, m) => s + m.completed, 0);
        const avgEfficiency =
            teamWorkload.length > 0
                ? Math.round(
                    teamWorkload.reduce((s, m) => s + m.efficiency, 0) /
                    teamWorkload.length
                )
                : 0;

        // ── 5. Recent activity — merge tasks + comments, pick 5 most recent ─────
        type ActivityItem = {
            id: string;
            user: string;
            action: string;
            item: string;
            time: string;
            type: "task" | "comment";
        };

        const taskActivities: ActivityItem[] = recentTasks.map((t) => ({
            id: `task-${t.id}`,
            user: t.users_tasks_assignee_idTousers?.username ?? "Unknown",
            action:
                t.status === "DONE"
                    ? "completed"
                    : t.status === "IN_PROGRESS"
                        ? "started working on"
                        : "created",
            item: t.title,
            time: timeAgo(t.created_at),
            type: "task" as const,
        }));

        const commentActivities: ActivityItem[] = recentComments.map((c) => ({
            id: `comment-${c.comment_id}`,
            user: c.users?.username ?? "Unknown",
            action: "commented on",
            item: c.tasks?.title ?? "a task",
            time: "recently",
            type: "comment" as const,
        }));

        // Merge and take 5 most relevant (task activities first, then comments)
        const recentActivity = [...taskActivities, ...commentActivities]
            .slice(0, 5)
            .map((a, idx) => ({ ...a, id: idx + 1 }));

        // ── Response ────────────────────────────────────────────────────────────
        return NextResponse.json({
            overallStats: {
                totalTasks,
                completedTasks,
                inProgressTasks,
                totalProjects,
                activeProjects,
                completionRate,
            },
            projectProgress,
            teamWorkload,
            teamPerformance: {
                avgEfficiency,
                totalTasks: teamTotalTasks,
                totalDone: teamTotalDone,
                teamSize: teamWorkload.length,
            },
            recentActivity,
        });
    } catch (error) {
        console.error("Reports API error:", error);
        return NextResponse.json(
            {
                error: "Failed to load report data",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
