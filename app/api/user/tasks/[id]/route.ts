import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getAuthUser } from "@/app/lib/auth";

// GET /api/user/tasks/[id] - Fetch single task (ownership validated)
export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // Extract userId from verified JWT token
        const user = await getAuthUser();

        if (!user) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Await params in Next.js 15+
        const params = await context.params;
        const taskId = parseInt(params.id);

        if (isNaN(taskId) || !params.id) {
            console.error('Invalid task ID received:', params.id);
            return NextResponse.json(
                { error: "Invalid task ID" },
                { status: 400 }
            );
        }

        // Fetch task
        const task = await prisma.tasks.findUnique({
            where: { id: taskId },
            include: {
                projects: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        if (!task) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }

        // SECURITY: Validate ownership - user can access tasks they created OR are assigned to
        if (task.assignee_id !== user.userId && task.created_by_id !== user.userId) {
            return NextResponse.json(
                { error: "Forbidden: You can only access your own tasks" },
                { status: 403 }
            );
        }

        // Transform task data
        const transformedTask = {
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
        };

        return NextResponse.json(transformedTask);
    } catch (error) {
        console.error("Error fetching task:", error);
        return NextResponse.json(
            { error: "Failed to fetch task" },
            { status: 500 }
        );
    }
}

// PUT /api/user/tasks/[id] - Update task (ownership validated)
export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // Extract userId from verified JWT token
        const user = await getAuthUser();

        if (!user) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Await params in Next.js 15+
        const params = await context.params;
        const taskId = parseInt(params.id);

        if (isNaN(taskId) || !params.id) {
            console.error('Invalid task ID received:', params.id);
            return NextResponse.json(
                { error: "Invalid task ID" },
                { status: 400 }
            );
        }

        // Fetch existing task
        const existingTask = await prisma.tasks.findUnique({
            where: { id: taskId },
        });

        if (!existingTask) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }

        // SECURITY: Validate ownership - user can edit tasks they created OR are assigned to
        if (existingTask.assignee_id !== user.userId && existingTask.created_by_id !== user.userId) {
            return NextResponse.json(
                { error: "Forbidden: You can only edit your own tasks" },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { title, description, status, priority, dueDate, projectId } = body;

        // Prepare update data object - only include fields that are provided
        const updateData: any = {};

        // Handle status update (comes from drag-and-drop or edit form)
        if (status !== undefined) {
            // Map display status to database status
            if (status === 'Completed' || status === 'DONE') {
                updateData.status = 'DONE';
            } else if (status === 'In Progress' || status === 'IN_PROGRESS') {
                updateData.status = 'IN_PROGRESS';
            } else {
                updateData.status = 'NOT_STARTED';
            }
        }

        // Handle other fields (only if provided)
        if (title !== undefined) {
            updateData.title = title;
        }

        if (description !== undefined) {
            updateData.description = description;
        }

        if (priority !== undefined) {
            updateData.priority = priority.toUpperCase();
        }

        if (projectId !== undefined) {
            updateData.project_id = projectId ? parseInt(projectId) : null;
        }

        if (dueDate !== undefined) {
            updateData.due_date = dueDate ? new Date(dueDate) : null;
        }

        // Update task with only the provided fields
        const updatedTask = await prisma.tasks.update({
            where: { id: taskId },
            data: updateData,
        });

        return NextResponse.json({
            success: true,
            task: updatedTask
        }, { status: 200 });
    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json(
            { error: "Failed to update task" },
            { status: 500 }
        );
    }
}

// DELETE /api/user/tasks/[id] - Delete task (ownership validated)
export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // Extract userId from verified JWT token
        const user = await getAuthUser();

        if (!user) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Await params in Next.js 15+
        const params = await context.params;
        const taskId = parseInt(params.id);

        if (isNaN(taskId) || !params.id) {
            console.error('Invalid task ID received:', params.id);
            return NextResponse.json(
                { error: "Invalid task ID" },
                { status: 400 }
            );
        }

        // Fetch existing task
        const existingTask = await prisma.tasks.findUnique({
            where: { id: taskId },
        });

        if (!existingTask) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }

        // SECURITY: Validate ownership - user can delete tasks they created OR are assigned to
        if (existingTask.assignee_id !== user.userId && existingTask.created_by_id !== user.userId) {
            return NextResponse.json(
                { error: "Forbidden: You can only delete your own tasks" },
                { status: 403 }
            );
        }

        // Delete task
        await prisma.tasks.delete({
            where: { id: taskId },
        });

        return NextResponse.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json(
            { error: "Failed to delete task" },
            { status: 500 }
        );
    }
}
