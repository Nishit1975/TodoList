import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// ── Helper ────────────────────────────────────────────────────────────────────

function timeAgo(date: Date | string | null | undefined): string {
    if (!date) return "recently";
    const diffMs = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diffMs / 60_000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
}

// ── GET /api/history ──────────────────────────────────────────────────────────

export async function GET() {
    try {
        // All queries run in parallel — no N+1
        const [tasks, comments, projects, memberships] = await Promise.all([
            // Tasks — grab assignee + project name
            prisma.tasks.findMany({
                take: 30,
                orderBy: { created_at: "desc" },
                select: {
                    id: true,
                    title: true,
                    status: true,
                    created_at: true,
                    users_tasks_assignee_idTousers: { select: { username: true } },
                    projects: { select: { name: true } },
                },
            }),

            // Comments — grab author + task title
            prisma.comments.findMany({
                take: 20,
                orderBy: { comment_id: "desc" },
                select: {
                    comment_id: true,
                    content: true,
                    users: { select: { username: true } },
                    tasks: { select: { id: true, title: true, created_at: true } },
                },
            }),

            // Projects — newest first
            prisma.projects.findMany({
                take: 15,
                orderBy: { created_at: "desc" },
                select: {
                    project_id: true,
                    name: true,
                    status: true,
                    created_at: true,
                },
            }),

            // Project members — who was added and when
            prisma.project_members.findMany({
                take: 15,
                orderBy: { added_at: "desc" },
                select: {
                    id: true,
                    added_at: true,
                    role: true,
                    users: { select: { username: true } },
                    projects: { select: { name: true } },
                },
            }),
        ]);

        // ── Build unified activity list ───────────────────────────────────────────

        type Activity = {
            id: string;
            type: "task_created" | "task_completed" | "task_updated" | "comment_added" | "project_created" | "member_added";
            user: string;
            action: string;
            item: string;
            subItem: string;
            timestamp: Date;
            timeAgo: string;
            badgeLabel: string;
            badgeType: "task" | "project" | "comment" | "member";
        };

        const activities: Activity[] = [];

        // Task activities
        for (const t of tasks) {
            const user = t.users_tasks_assignee_idTousers?.username ?? "Unknown";
            const project = t.projects?.name ?? "";
            const ts = t.created_at ? new Date(t.created_at) : new Date();

            let type: Activity["type"] = "task_created";
            let action = "created task";

            if (t.status === "DONE") {
                type = "task_completed";
                action = "completed task";
            } else if (t.status === "IN_PROGRESS") {
                type = "task_updated";
                action = "started working on";
            } else if (t.status === "IN_REVIEW") {
                type = "task_updated";
                action = "submitted for review";
            }

            activities.push({
                id: `task-${t.id}`,
                type,
                user,
                action,
                item: t.title,
                subItem: project,
                timestamp: ts,
                timeAgo: timeAgo(ts),
                badgeLabel: "Task",
                badgeType: "task",
            });
        }

        // Comment activities
        for (const c of comments) {
            const user = c.users?.username ?? "Unknown";
            const taskTitle = c.tasks?.title ?? "a task";
            // Use task's created_at as approximation (comments don't have created_at in schema)
            const ts = c.tasks?.created_at ? new Date(c.tasks.created_at) : new Date();

            activities.push({
                id: `comment-${c.comment_id}`,
                type: "comment_added",
                user,
                action: "commented on",
                item: taskTitle,
                subItem: c.content ? c.content.slice(0, 60) + (c.content.length > 60 ? "…" : "") : "",
                timestamp: ts,
                timeAgo: timeAgo(ts),
                badgeLabel: "Comment",
                badgeType: "comment",
            });
        }

        // Project activities
        for (const p of projects) {
            const ts = p.created_at ? new Date(p.created_at) : new Date();
            activities.push({
                id: `project-${p.project_id}`,
                type: "project_created",
                user: "Admin",
                action: "created project",
                item: p.name,
                subItem: p.status?.replace("_", " ") ?? "",
                timestamp: ts,
                timeAgo: timeAgo(ts),
                badgeLabel: "Project",
                badgeType: "project",
            });
        }

        // Member activities
        for (const m of memberships) {
            const ts = new Date(m.added_at);
            activities.push({
                id: `member-${m.id}`,
                type: "member_added",
                user: m.users?.username ?? "Unknown",
                action: "was added to",
                item: m.projects?.name ?? "a project",
                subItem: `Role: ${m.role}`,
                timestamp: ts,
                timeAgo: timeAgo(ts),
                badgeLabel: "Member",
                badgeType: "member",
            });
        }

        // Sort all by timestamp DESC and return top 50
        activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        const result = activities.slice(0, 50).map(({ timestamp, ...rest }) => rest);

        return NextResponse.json({ activities: result });
    } catch (error) {
        console.error("History API error:", error);
        return NextResponse.json(
            { error: "Failed to load history", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
