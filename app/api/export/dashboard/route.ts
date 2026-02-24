import { NextResponse } from "next/server";
import { getAuthUser } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

export async function GET() {
    // ✅ Lazy load ExcelJS (startup fast banavva mate)
    const ExcelJS = (await import("exceljs")).default;

    // 🔐 Auth guard — admin only
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 📦 Fetch all data in parallel
    const [tasks, users, projects] = await Promise.all([
        prisma.tasks.findMany({
            orderBy: { created_at: "desc" },
            include: {
                users_tasks_assignee_idTousers: { select: { username: true } },
                users_tasks_created_by_idTousers: { select: { username: true } },
                projects: { select: { name: true } },
            },
        }),
        prisma.users.findMany({
            orderBy: { created_at: "desc" },
            select: {
                userid: true,
                username: true,
                email: true,
                role: true,
                is_active: true,
                created_at: true,
            },
        }),
        prisma.projects.findMany({
            orderBy: { created_at: "desc" },
            include: {
                tasks: { select: { id: true, status: true } },
                project_members: { select: { id: true } },
            },
        }),
    ]);

    // 📊 Summary stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "DONE").length;
    const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS").length;
    const pendingTasks = tasks.filter(
        (t) => t.status === "NOT_STARTED" || t.status === "IN_REVIEW"
    ).length;
    const totalUsers = users.length;
    const completionRate =
        totalTasks > 0
            ? `${Math.round((completedTasks / totalTasks) * 100)}%`
            : "0%";

    // 📘 Create workbook
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Admin Dashboard";
    workbook.created = new Date();

    // 🎨 Header style helper
    const applyHeaderStyle = (row: any, color: string) => {
        row.eachCell((cell: any) => {
            cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: color },
            };
            cell.alignment = { vertical: "middle", horizontal: "center" };
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            };
        });
        row.height = 24;
    };

    const applyDataRow = (row: any) => {
        row.eachCell({ includeEmpty: true }, (cell: any) => {
            cell.alignment = { vertical: "middle", horizontal: "left" };
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            };
        });
        row.height = 20;
    };

    // ─── Sheet 1: Tasks ─────────────────────────────
    const tasksSheet = workbook.addWorksheet("Tasks");
    tasksSheet.columns = [
        { header: "Task Name", key: "task_name", width: 35 },
        { header: "Status", key: "status", width: 16 },
        { header: "Priority", key: "priority", width: 12 },
        { header: "Assignee", key: "assignee", width: 20 },
        { header: "Created By", key: "created_by", width: 20 },
        { header: "Project", key: "project", width: 25 },
        { header: "Due Date", key: "due_date", width: 16 },
        { header: "Created At", key: "created_at", width: 20 },
    ];

    applyHeaderStyle(tasksSheet.getRow(1), "FF4F46E5");

    tasks.forEach((task) => {
        const row = tasksSheet.addRow({
            task_name: task.title,
            status: task.status ?? "—",
            priority: task.priority ?? "—",
            assignee: task.users_tasks_assignee_idTousers?.username ?? "—",
            created_by: task.users_tasks_created_by_idTousers?.username ?? "—",
            project: task.projects?.name ?? "—",
            due_date: task.due_date
                ? new Date(task.due_date).toLocaleDateString("en-US")
                : "—",
            created_at: task.created_at
                ? new Date(task.created_at).toLocaleString("en-US")
                : "—",
        });
        applyDataRow(row);
    });

    // ─── Sheet 2: Users ─────────────────────────────
    const usersSheet = workbook.addWorksheet("Users");
    usersSheet.columns = [
        { header: "ID", key: "id", width: 8 },
        { header: "Username", key: "username", width: 22 },
        { header: "Email", key: "email", width: 32 },
        { header: "Role", key: "role", width: 14 },
        { header: "Active", key: "is_active", width: 10 },
        { header: "Created At", key: "created_at", width: 22 },
    ];

    applyHeaderStyle(usersSheet.getRow(1), "FF7C3AED");

    users.forEach((u) => {
        const row = usersSheet.addRow({
            id: u.userid,
            username: u.username,
            email: u.email,
            role: u.role ?? "user",
            is_active: u.is_active ? "Yes" : "No",
            created_at: u.created_at
                ? new Date(u.created_at).toLocaleString("en-US")
                : "—",
        });
        applyDataRow(row);
    });

    // ─── Sheet 3: Projects ─────────────────────────────
    const projectsSheet = workbook.addWorksheet("Projects");
    projectsSheet.columns = [
        { header: "ID", key: "id", width: 8 },
        { header: "Name", key: "name", width: 30 },
        { header: "Status", key: "status", width: 16 },
        { header: "Priority", key: "priority", width: 12 },
        { header: "Team Size", key: "team", width: 12 },
        { header: "Total Tasks", key: "total_tasks", width: 14 },
        { header: "Done Tasks", key: "done_tasks", width: 13 },
        { header: "Progress %", key: "progress", width: 13 },
        { header: "Start Date", key: "start_date", width: 16 },
        { header: "Due Date", key: "due_date", width: 16 },
        { header: "Created At", key: "created_at", width: 20 },
    ];

    applyHeaderStyle(projectsSheet.getRow(1), "FF059669");

    projects.forEach((p) => {
        const totalProjTasks = p.tasks.length;
        const doneProjTasks = p.tasks.filter((t) => t.status === "DONE").length;
        const progress =
            totalProjTasks > 0
                ? `${Math.round((doneProjTasks / totalProjTasks) * 100)}%`
                : "0%";

        const row = projectsSheet.addRow({
            id: p.project_id,
            name: p.name,
            status: p.status ?? "Not Started",
            priority: p.priority ?? "Medium",
            team: p.project_members.length,
            total_tasks: totalProjTasks,
            done_tasks: doneProjTasks,
            progress,
            start_date: p.start_date
                ? new Date(p.start_date).toLocaleDateString("en-US")
                : "—",
            due_date: p.due_date
                ? new Date(p.due_date).toLocaleDateString("en-US")
                : "—",
            created_at: p.created_at
                ? new Date(p.created_at).toLocaleString("en-US")
                : "—",
        });
        applyDataRow(row);
    });

    // ─── Sheet 4: Summary ─────────────────────────────
    const summarySheet = workbook.addWorksheet("Summary");
    summarySheet.columns = [
        { header: "Metric", key: "metric", width: 28 },
        { header: "Value", key: "value", width: 18 },
    ];

    applyHeaderStyle(summarySheet.getRow(1), "FFD97706");

    const summaryRows = [
        { metric: "Total Tasks", value: totalTasks },
        { metric: "Completed Tasks", value: completedTasks },
        { metric: "In Progress Tasks", value: inProgressTasks },
        { metric: "Pending Tasks", value: pendingTasks },
        { metric: "Total Users", value: totalUsers },
        { metric: "Total Projects", value: projects.length },
        { metric: "Completion Rate", value: completionRate },
        {
            metric: "Report Generated At",
            value: new Date().toLocaleString("en-US"),
        },
    ];

    summaryRows.forEach((s) => {
        const row = summarySheet.addRow(s);
        applyDataRow(row);
        row.getCell("metric").font = { bold: true };
    });

    // 📤 Return Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
        status: 200,
        headers: {
            "Content-Type":
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition":
                'attachment; filename="dashboard-report.xlsx"',
            "Cache-Control": "no-store",
        },
    });
}