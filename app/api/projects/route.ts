import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// GET /api/projects - Fetch all projects with task counts
export async function GET() {
    try {
        const projects = await prisma.projects.findMany({
            select: {
                project_id: true,
                name: true,
                description: true,
                status: true,
                priority: true,
                start_date: true,
                due_date: true,
                created_at: true,
                tasks: {
                    select: { id: true, status: true },
                },
                project_members: {
                    select: {
                        users: {
                            select: { userid: true, username: true },
                        },
                    },
                },
            },
            orderBy: { created_at: "desc" },
        });

        const transformedProjects = projects.map((project) => {
            const totalTasks = project.tasks.length;
            const completedTasks = project.tasks.filter(
                (task) => task.status === "DONE"
            ).length;

            // Calculate progress based on completed tasks
            const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

            const colors = ["blue", "purple", "emerald", "orange", "pink", "indigo", "teal"];
            const team = project.project_members.map((m) => ({
                name: m.users.username,
                avatar: m.users.username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2),
                color: `bg-${colors[m.users.userid % 7]}-500`,
            }));

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
                team,
                tasks: { total: totalTasks, completed: completedTasks },
                budget: "",
                category: "",
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
