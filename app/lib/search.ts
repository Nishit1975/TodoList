import prisma from "@/app/lib/prisma";

// ─── Type Definitions ────────────────────────────────────────────────────────

export interface SearchTask {
    id: number;
    title: string;
    description: string;
    /** UI-friendly status: "Completed" | "In Progress" | "Review" | "Pending" */
    status: string;
    /** UI-friendly priority: "High" | "Medium" | "Low" */
    priority: string;
    assignee: string;
    dueDate: string;
    project: string;
    type: "task";
}

export interface SearchProject {
    id: number;
    name: string;
    description: string;
    /** UI-friendly status: "Completed" | "In Progress" | "Review" | "Planning" | "On Hold" | "Pending" */
    status: string;
    /** UI-friendly priority: "High" | "Medium" | "Low" */
    priority: string;
    progress: number;
    team: number;
    type: "project";
}

export type SearchResult = SearchTask | SearchProject;

// ─── Status / Priority Normalizers ───────────────────────────────────────────

/** Map DB tasks_status enum → UI label */
export function normalizeTaskStatus(status: string | null): string {
    const map: Record<string, string> = {
        NOT_STARTED: "Pending",
        IN_PROGRESS: "In Progress",
        IN_REVIEW: "Review",
        DONE: "Completed",
    };
    return map[status ?? ""] ?? "Pending";
}

/** Map DB tasks_priority enum → UI label */
export function normalizeTaskPriority(priority: string | null): string {
    const map: Record<string, string> = {
        HIGH: "High",
        MEDIUM: "Medium",
        LOW: "Low",
    };
    return map[priority ?? ""] ?? "Medium";
}

/** Map DB projects_status enum → UI label */
export function normalizeProjectStatus(status: string | null): string {
    const map: Record<string, string> = {
        Not_Started: "Planning",
        In_Progress: "In Progress",
        Review: "Review",
        Completed: "Completed",
        // fallbacks for raw DB values
        "Not Started": "Planning",
    };
    return map[status ?? ""] ?? "Planning";
}

/** Map DB projects_priority enum → UI label */
export function normalizeProjectPriority(priority: string | null): string {
    const map: Record<string, string> = {
        High: "High",
        Medium: "Medium",
        Low: "Low",
    };
    return map[priority ?? ""] ?? "Medium";
}

// ─── Prisma Query ─────────────────────────────────────────────────────────────

export interface SearchFilters {
    query?: string;
    priority?: string;  // "All" | "High" | "Medium" | "Low"
    status?: string;    // "All" | UI status label
    assignee?: string;  // "All" | username
    project?: string;   // "All" | project name
    dateRange?: string; // "All" | "Today" | "This Week" | "This Month" | "Overdue"
}

export async function searchData(filters: SearchFilters): Promise<{
    tasks: SearchTask[];
    projects: SearchProject[];
    assignees: string[];
    projectNames: string[];
}> {
    const { query = "", priority = "All", status = "All", assignee = "All", project = "All", dateRange = "All" } = filters;
    const searchLower = query.toLowerCase();

    // ── Tasks ──────────────────────────────────────────────────────────────────
    const rawTasks = await prisma.tasks.findMany({
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
                t.description.toLowerCase().includes(searchLower) ||
                t.assignee.toLowerCase().includes(searchLower);
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
            // Projects don't have assignee / dateRange filters
            return matchesSearch && matchesPriority && matchesStatus;
        });

    // ── Unique filter options ──────────────────────────────────────────────────

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
