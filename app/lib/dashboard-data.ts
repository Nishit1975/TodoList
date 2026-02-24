import prisma from "@/app/lib/prisma";

export interface DashboardStats {
  totalTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  totalUsers: number;
  completionRate: number;
}

export interface ActiveProject {
  name: string;
  progress: number;
  status: string;
  team: number;
  dueDate: string;
}

export interface RecentActivity {
  user: string;
  action: string;
  item: string;
  time: string;
  type: "completed" | "created" | "updated";
}

export interface TopContributor {
  name: string;
  tasks: number;
  badge: string;
  score: number;
}

export interface DashboardData {
  stats: DashboardStats;
  activeProjects: ActiveProject[];
  recentActivities: RecentActivity[];
  topContributors: TopContributor[];
}

function timeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

function formatDueDate(date: Date | null | undefined): string {
  if (!date) return "No date";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export async function getDashboardData(): Promise<DashboardData> {
  const [
    totalTasks,
    inProgressTasks,
    doneTasks,
    totalUsers,
    projects,
    recentTasks,
  ] = await Promise.all([
    prisma.tasks.count(),
    prisma.tasks.count({ where: { status: "IN_PROGRESS" } }),
    prisma.tasks.count({ where: { status: "DONE" } }),
    prisma.users.count(),
    prisma.projects.findMany({
      take: 4,
      orderBy: { created_at: "desc" },
      include: {
        tasks: { select: { id: true, status: true } },
        project_members: { select: { id: true } },
      },
    }),
    prisma.tasks.findMany({
      take: 5,
      orderBy: { created_at: "desc" },
      include: {
        users_tasks_assignee_idTousers: { select: { username: true } },
        projects: { select: { name: true } },
      },
    }),
  ]);

  const completionRate =
    totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  // Build active projects with calculated progress
  const activeProjects: ActiveProject[] = projects.map((p) => {
    const totalProjectTasks = p.tasks.length;
    const doneProjTasks = p.tasks.filter((t) => t.status === "DONE").length;
    const progress =
      totalProjectTasks > 0
        ? Math.round((doneProjTasks / totalProjectTasks) * 100)
        : 0;

    let statusLabel = "Not Started";
    if (p.status === "In_Progress") statusLabel = "In Progress";
    else if (p.status === "Completed") statusLabel = "Completed";
    else if (p.status === "Review") statusLabel = "Review";

    return {
      name: p.name,
      progress,
      status: statusLabel,
      team: p.project_members.length,
      dueDate: formatDueDate(p.due_date),
    };
  });

  // Build recent activity from latest tasks
  const recentActivities: RecentActivity[] = recentTasks.map((task) => {
    const username =
      task.users_tasks_assignee_idTousers?.username ?? "Unknown User";
    const itemName = task.projects?.name ?? task.title;

    let action = "updated";
    let type: RecentActivity["type"] = "updated";
    if (task.status === "DONE") {
      action = "completed task";
      type = "completed";
    } else if (task.status === "NOT_STARTED") {
      action = "created task";
      type = "created";
    } else if (task.status === "IN_PROGRESS") {
      action = "started working on";
      type = "updated";
    }

    return {
      user: username,
      action,
      item: itemName,
      time: task.created_at ? timeAgo(new Date(task.created_at)) : "recently",
      type,
    };
  });

  // Build top contributors — users with most DONE tasks assigned
  const userTaskCounts = await prisma.tasks.groupBy({
    by: ["assignee_id"],
    where: { status: "DONE" },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 3,
  });

  const badges = ["🏆", "⭐", "🎯"];
  const topContributorIds = userTaskCounts.map((u) => u.assignee_id);
  const topUsers = await prisma.users.findMany({
    where: { userid: { in: topContributorIds } },
    select: { userid: true, username: true },
  });

  const topContributors: TopContributor[] = userTaskCounts.map((u, idx) => {
    const user = topUsers.find((usr) => usr.userid === u.assignee_id);
    const tasks = u._count.id;
    // Score: scale tasks count to a max of 100 relative to top performer
    const maxTasks = userTaskCounts[0]?._count.id ?? 1;
    const score = Math.round((tasks / maxTasks) * 100);
    return {
      name: user?.username ?? "Unknown",
      tasks,
      badge: badges[idx] ?? "🎖️",
      score,
    };
  });

  return {
    stats: {
      totalTasks,
      inProgressTasks,
      completedTasks: doneTasks,
      totalUsers,
      completionRate,
    },
    activeProjects,
    recentActivities,
    topContributors,
  };
}
