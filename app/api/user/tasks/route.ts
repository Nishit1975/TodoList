import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getAuthUser } from "@/app/lib/auth";

// GET /api/user/tasks - Fetch all tasks for the logged-in user
export async function GET() {
    try {
        // Extract userId from verified JWT token
        const user = await getAuthUser();

        if (!user) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Fetch tasks where user is assignee OR creator
        const tasks = await prisma.tasks.findMany({
            where: {
                OR: [
                    { assignee_id: user.userId },
                    { created_by_id: user.userId },
                ],
            },
            include: {
                projects: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },
        });

        // Transform tasks to match frontend format
        const transformedTasks = tasks.map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description || "",
            status:
                task.status === "DONE"
                    ? "Completed"
                    : task.status === "IN_PROGRESS"
                        ? "In Progress"
                        : "Pending",
            priority: task.priority || "Medium",
            dueDate: task.due_date
                ? new Date(task.due_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })
                : "",
            dueDateRaw: task.due_date,
            project: task.projects?.name || "No Project",
            projectId: task.project_id,
        }));

        return NextResponse.json(transformedTasks);
    } catch (error) {
        console.error("Error fetching user tasks:", error);
        return NextResponse.json(
            { error: "Failed to fetch tasks" },
            { status: 500 }
        );
    }
}

// POST /api/user/tasks - Create a new task for the logged-in user
export async function POST(request: Request) {
    try {
        // Extract userId from verified JWT token
        const user = await getAuthUser();

        if (!user) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { title, description, status, priority, dueDate, projectId } = body;

        if (!title) {
            return NextResponse.json(
                { error: "Task title is required" },
                { status: 400 }
            );
        }

        // Map display status to database status
        const dbStatus = status === 'Completed' ? 'DONE' : status === 'In Progress' ? 'IN_PROGRESS' : 'NOT_STARTED';
        const dbPriority = priority?.toUpperCase() || 'MEDIUM';

        // Create task with assignee_id set to authenticated user
        const task = await prisma.tasks.create({
            data: {
                title,
                description: description || null,
                status: dbStatus,
                priority: dbPriority,
                assignee_id: user.userId, // Security: Set to authenticated user only
                created_by_id: user.userId, // Security: Track who created it
                project_id: projectId ? parseInt(projectId) : null,
                due_date: dueDate ? new Date(dueDate) : null,
            },
        });

        return NextResponse.json(task, { status: 201 });
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json(
            { error: "Failed to create task" },
            { status: 500 }
        );
    }
}
