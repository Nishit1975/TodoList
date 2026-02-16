import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getAuthUser } from "@/app/lib/auth";

// GET /api/user/projects - Fetch projects assigned to the current user
export async function GET() {
    try {
        // Get authenticated user
        const user = await getAuthUser();

        if (!user) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Fetch projects where the user is a member
        const projectMembers = await prisma.project_members.findMany({
            where: {
                user_id: user.userId,
            },
            include: {
                projects: {
                    include: {
                        tasks: {
                            select: {
                                id: true,
                                status: true,
                            },
                        },
                        project_members: {
                            include: {
                                users: {
                                    select: {
                                        userid: true,
                                        username: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        // Transform the data
        const projects = projectMembers.map((member) => {
            const project = member.projects;
            const totalTasks = project.tasks.length;
            const completedTasks = project.tasks.filter(
                (t) => t.status === "DONE"
            ).length;
            const progress =
                totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

            return {
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
                teamSize: project.project_members.length,
                userRole: member.role,
                tasks: {
                    total: totalTasks,
                    completed: completedTasks,
                },
            };
        });

        return NextResponse.json(projects);
    } catch (error) {
        console.error("Error fetching user projects:", error);
        return NextResponse.json(
            { error: "Failed to fetch projects" },
            { status: 500 }
        );
    }
}
