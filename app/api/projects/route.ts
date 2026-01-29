import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// GET /api/projects - Fetch all projects with task counts
export async function GET() {
    try {
        const projects = await prisma.projects.findMany({
            include: {
                tasks: {
                    select: {
                        id: true,
                        status: true,
                        assignee_id: true,
                        users_tasks_assignee_idTousers: {
                            select: {
                                userid: true,
                                username: true,
                                email: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },
        });

        // Transform data to match frontend expectations
        const transformedProjects = projects.map((project: any) => {
            const totalTasks = project.tasks.length;
            const completedTasks = project.tasks.filter(
                (task: any) => task.status === "DONE"
            ).length;

            // Calculate progress based on completed tasks
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
                        });
                    }
                }
            });

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
                team: Array.from(teamMap.values()),
                tasks: {
                    total: totalTasks,
                    completed: completedTasks,
                },
                budget: "", // Not in schema, can be added later if needed
                category: "", // Not in schema, can be added later if needed
            };
        });

        return NextResponse.json(transformedProjects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json(
            { error: "Failed to fetch projects" },
            { status: 500 }
        );
    }
}

// POST /api/projects - Create a new project
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, status, priority, startDate, dueDate } = body;

        if (!name) {
            return NextResponse.json(
                { error: "Project name is required" },
                { status: 400 }
            );
        }

        const project = await prisma.projects.create({
            data: {
                name,
                description: description || null,
                status: status?.replace(" ", "_") || "Not_Started",
                priority: priority || "Medium",
                start_date: startDate ? new Date(startDate) : null,
                due_date: dueDate ? new Date(dueDate) : null,
            },
        });

        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json(
            { error: "Failed to create project" },
            { status: 500 }
        );
    }
}
