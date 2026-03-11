"use server";

import prisma from "@/app/lib/prisma";
import { getAuthUser } from "@/app/lib/auth";
import {
    normalizeTaskStatus,
    normalizeTaskPriority,
    normalizeProjectStatus,
    normalizeProjectPriority,
    SearchTask,
    SearchProject
} from "@/app/lib/search";

export async function fetchUserSearchData(
    query: string,
    priority: string,
    status: string,
    assignee: string,
    project: string,
    dateRange: string
) {
    const user = await getAuthUser();
    if (!user) throw new Error("Not authenticated");

    const searchLower = query.toLowerCase();

    // ── Tasks ──────────────────────────────────────────────────────────────────
    const rawTasks = await prisma.tasks.findMany({
        where: { assignee_id: user.userId },
        include: {
            users_tasks_assignee_idTousers: {
                select: { userid: true, username: true },
            },
            projects: {
                select: { project_id: true, name: true },
            },
        },
        orderBy: { created_at: "desc" },
    });

    // ── Projects ───────────────────────────────────────────────────────────────
    const rawProjects = await prisma.projects.findMany({
        where: {
            project_members: {
                some: { user_id: user.userId }
            }
        },
        select: {
            project_id: true,
            name: true,
            description: true,
            status: true,
            priority: true,
            tasks: { select: { id: true, status: true } },
            project_members: {
                select: { users: { select: { userid: true } } },
            },
        },
        orderBy: { created_at: "desc" },
    });

    // ── Build filter helpers ───────────────────────────────────────────────────
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    function matchesDateRange(dueDate: Date | null): boolean {
        if (dateRange === "All") return true;
        if (!dueDate) return false;
        const d = new Date(dueDate);
        if (dateRange === "Today") return d >= startOfDay && d < endOfDay;
        if (dateRange === "This Week") return d >= startOfWeek && d < endOfDay;
        if (dateRange === "This Month") return d >= startOfMonth && d < endOfDay;
        if (dateRange === "Overdue") return d < startOfDay;
        return true;
    }

    // ── Transform & filter tasks ───────────────────────────────────────────────
    const tasks: SearchTask[] = rawTasks
        .map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description ?? "",
            status: normalizeTaskStatus(task.status),
            priority: normalizeTaskPriority(task.priority),
            assignee: task.users_tasks_assignee_idTousers?.username ?? "Unassigned",
            dueDate: task.due_date
                ? new Date(task.due_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })
                : "",
            dueDateRaw: task.due_date,
            project: task.projects?.name ?? "",
            type: "task" as const,
        }))
        .filter((t) => {
            const matchesSearch =
                !query ||
                t.title.toLowerCase().includes(searchLower) ||
                t.description.toLowerCase().includes(searchLower);
            const matchesPriority = priority === "All" || t.priority === priority;
            const matchesStatus = status === "All" || t.status === status;
            const matchesAssignee = assignee === "All" || t.assignee === assignee;
            const matchesProject = project === "All" || t.project === project;
            const rawTask = rawTasks.find((r) => r.id === t.id);
            const matchesDate = matchesDateRange(rawTask?.due_date ?? null);

            return matchesSearch && matchesPriority && matchesStatus && matchesAssignee && matchesProject && matchesDate;
        });

    // ── Transform & filter projects ────────────────────────────────────────────
    const projects: SearchProject[] = rawProjects
        .map((p) => {
            const totalTasks = p.tasks.length;
            const completedTasks = p.tasks.filter((t) => t.status === "DONE").length;
            const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
            return {
                id: p.project_id,
                name: p.name,
                description: p.description ?? "",
                status: normalizeProjectStatus(p.status),
                priority: normalizeProjectPriority(p.priority),
                progress,
                team: p.project_members.length,
                type: "project" as const,
            };
        })
        .filter((p) => {
            const matchesSearch =
                !query ||
                p.name.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower);
            const matchesPriority = priority === "All" || p.priority === priority;
            const matchesStatus = status === "All" || p.status === status;
            return matchesSearch && matchesPriority && matchesStatus;
        });

    const assignees = [
        ...new Set(
            rawTasks
                .map((t) => t.users_tasks_assignee_idTousers?.username)
                .filter(Boolean) as string[]
        ),
    ].sort();

    const projectNames = [
        ...new Set(
            rawTasks
                .map((t) => t.projects?.name)
                .filter(Boolean) as string[]
        ),
    ].sort();

    return { tasks, projects, assignees, projectNames };
}
