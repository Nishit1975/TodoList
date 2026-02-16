import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getAuthUser } from "@/app/lib/auth";

// GET /api/user/projects/[id] - Fetch single project detail for user
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

        // Get authenticated user
        const user = await getAuthUser();

        if (!user) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Check if user is a member of this project
        const membership = await prisma.project_members.findFirst({
            where: {
                project_id: projectId,
                user_id: user.userId,
            },
            include: {
                projects: {
                    include: {
                        tasks: {
                            include: {
                                users_tasks_assignee_idTousers: {
                                    select: {
                                        userid: true,
                                        username: true,
                                    },
                                },
                            },
                        },
                        project_members: {
                            include: {
                                users: {
                                    select: {
                                        userid: true,
                                        username: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!membership) {
            return NextResponse.json(
                { error: "Project not found or you don't have access" },
                { status: 404 }
            );
        }

        const project = membership.projects;

        // Get tasks assigned to the current user in this project
        const userTasks = project.tasks.filter(
            (task) => task.assignee_id === user.userId
        );

        // Calculate progress
        const totalTasks = project.tasks.length;
        const completedTasks = project.tasks.filter(
            (t) => t.status === "DONE"
        ).length;
        const progress =
            totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        // Transform the data
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
            userRole: membership.role,
            team: project.project_members.map((member) => ({
                id: member.users.userid,
                name: member.users.username,
                email: member.users.email,
                role: member.role,
            })),
            tasks: {
                total: totalTasks,
                completed: completedTasks,
                inProgress: project.tasks.filter((t) => t.status === "IN_PROGRESS")
                    .length,
                pending: project.tasks.filter((t) => t.status === "NOT_STARTED")
                    .length,
            },
            myTasks: userTasks.map((task) => ({
                id: task.id,
                name: task.title,
                description: task.description || "",
                status:
                    task.status === "DONE"
                        ? "Completed"
                        : task.status === "IN_PROGRESS"
                            ? "In Progress"
                            : task.status === "REVIEW"
                                ? "Review"
                                : "Pending",
                priority: task.priority || "Medium",
                dueDate: task.due_date
                    ? new Date(task.due_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })
                    : "",
            })),
        };

        return NextResponse.json(transformedProject);
    } catch (error) {
        console.error("Error fetching project detail:", error);
        return NextResponse.json(
            { error: "Failed to fetch project" },
            { status: 500 }
        );
    }
}
