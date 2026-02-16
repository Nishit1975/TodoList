import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// GET /api/tasks - Fetch all tasks
export async function GET() {
    try {
        const tasks = await prisma.tasks.findMany({
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
                projects: {
                    select: {
                        project_id: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },
        });

        // Transform data to match frontend expectations
        const transformedTasks = tasks.map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description || "",
            status: task.status || "NOT_STARTED",
            priority: task.priority || "MEDIUM",
            assignee: task.users_tasks_assignee_idTousers?.username || "Unassigned",
            assigneeId: task.assignee_id,
            dueDate: task.due_date
                ? new Date(task.due_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })
                : "",
            dueDateRaw: task.due_date,
            project: task.projects?.name || "",
            projectId: task.project_id,
            createdById: task.created_by_id,
            createdAt: task.created_at,
        }));

        return NextResponse.json(transformedTasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json(
            { error: "Failed to fetch tasks" },
            { status: 500 }
        );
    }
}

// POST /api/tasks - Create a new task
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            title,
            description,
            status,
            priority,
            assigneeId,
            createdById,
            projectId,
            dueDate,
        } = body;

        // Validate required fields
        if (!title || !assigneeId || !createdById) {
            return NextResponse.json(
                { error: "Title, assignee, and creator are required" },
                { status: 400 }
            );
        }

        // Create task
        const task = await prisma.tasks.create({
            data: {
                title,
                description: description || null,
                status: status || "NOT_STARTED",
                priority: priority || "MEDIUM",
                assignee_id: parseInt(assigneeId),
                created_by_id: parseInt(createdById),
                project_id: projectId ? parseInt(projectId) : null,
                due_date: dueDate ? new Date(dueDate) : null,
            },
            include: {
                users_tasks_assignee_idTousers: {
                    select: {
                        userid: true,
                        username: true,
                    },
                },
                projects: {
                    select: {
                        project_id: true,
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json(task, { status: 201 });
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json(
            {
                error: "Failed to create task",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
