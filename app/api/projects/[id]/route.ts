import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// GET /api/projects/[id] - Fetch single project with tasks and team
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const projectId = parseInt(id);

        if (isNaN(projectId)) {
            return NextResponse.json(
                { error: "Invalid project ID" },
                { status: 400 }
            );
        }

        const project = await prisma.projects.findUnique({
            where: {
                project_id: projectId,
            },
            include: {
                tasks: {
                    include: {
                        users_tasks_assignee_idTousers: {
                            select: {
                                userid: true,
                                username: true,
                                email: true,
                            },
                        },
                        users_tasks_created_by_idTousers: {
                            select: {
                                userid: true,
                                username: true,
                            },
                        },
                    },
                },
            },
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        // Calculate task statistics
        const totalTasks = project.tasks.length;
        const completedTasks = project.tasks.filter((t: any) => t.status === "DONE").length;
        const inProgressTasks = project.tasks.filter((t: any) => t.status === "IN_PROGRESS").length;
        const pendingTasks = project.tasks.filter((t: any) => t.status === "NOT_STARTED").length;
        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        // Get unique team members from tasks
        const teamMap = new Map();
        project.tasks.forEach((task: any) => {
            if (task.users_tasks_assignee_idTousers) {
                const user = task.users_tasks_assignee_idTousers;
                if (!teamMap.has(user.userid)) {
                    teamMap.set(user.userid, {
                        name: user.username,
                        avatar: user.username
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2),
                        color: `bg-${["blue", "purple", "emerald", "orange", "pink", "indigo", "teal"][user.userid % 7]}-500`,
                        role: "Team Member",
                    });
                }
            }
        });

        // Transform tasks data
        const transformedTasks = project.tasks.map((task: any) => ({
            id: task.id,
            name: task.title,
            status: task.status === "DONE" ? "Completed" : task.status === "IN_PROGRESS" ? "In Progress" : "Pending",
            priority: task.priority || "Medium",
            assignee: task.users_tasks_assignee_idTousers?.username || "Unassigned",
            dueDate: task.due_date
                ? new Date(task.due_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })
                : "",
            description: task.description || "",
        }));

        // Transform project data
        const transformedProject = {
            id: project.project_id,
            name: project.name,
            description: project.description || "",
            status: project.status?.replace("_", " ") || "Not Started",
            priority: project.priority || "Medium",
            progress,
            startDate: project.start_date
                ? new Date(project.start_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })
                : "",
            dueDate: project.due_date
                ? new Date(project.due_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })
                : "",
            team: Array.from(teamMap.values()),
            tasks: {
                total: totalTasks,
                completed: completedTasks,
                inProgress: inProgressTasks,
                pending: pendingTasks,
            },
            tasksList: transformedTasks,
            budget: "",
            category: "",
        };

        return NextResponse.json(transformedProject);
    } catch (error) {
        console.error("Error fetching project:", error);
        return NextResponse.json(
            { error: "Failed to fetch project" },
            { status: 500 }
        );
    }
}

// PUT /api/projects/[id] - Update project
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const projectId = parseInt(id);

        if (isNaN(projectId)) {
            return NextResponse.json(
                { error: "Invalid project ID" },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { name, description, status, priority, startDate, dueDate } = body;

        // Validate required fields
        if (!name) {
            return NextResponse.json(
                { error: "Project name is required" },
                { status: 400 }
            );
        }

        // Check if project exists
        const existingProject = await prisma.projects.findUnique({
            where: { project_id: projectId },
        });

        if (!existingProject) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        // Update project
        const updatedProject = await prisma.projects.update({
            where: { project_id: projectId },
            data: {
                name,
                description: description || null,
                status: status?.replace(" ", "_") || "Not_Started",
                priority: priority || "Medium",
                start_date: startDate ? new Date(startDate) : null,
                due_date: dueDate ? new Date(dueDate) : null,
            },
        });

        return NextResponse.json({
            message: "Project updated successfully",
            project: updatedProject,
        });
    } catch (error) {
        console.error("Error updating project:", error);
        return NextResponse.json(
            { error: "Failed to update project" },
            { status: 500 }
        );
    }
}

// DELETE /api/projects/[id] - Delete project
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const projectId = parseInt(id);

        if (isNaN(projectId)) {
            return NextResponse.json(
                { error: "Invalid project ID" },
                { status: 400 }
            );
        }

        // Check if project exists
        const existingProject = await prisma.projects.findUnique({
            where: { project_id: projectId },
        });

        if (!existingProject) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        // Delete project (tasks will be cascade deleted based on schema)
        await prisma.projects.delete({
            where: { project_id: projectId },
        });

        return NextResponse.json({
            message: "Project deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json(
            { error: "Failed to delete project" },
            { status: 500 }
        );
    }
}
