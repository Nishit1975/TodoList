import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// GET /api/tasks/[id] - Fetch single task
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const taskId = parseInt(id);

        if (isNaN(taskId)) {
            return NextResponse.json(
                { error: "Invalid task ID" },
                { status: 400 }
            );
        }

        const task = await prisma.tasks.findUnique({
            where: { id: taskId },
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
                subtasks: {
                    select: {
                        subtask_id: true,
                        title: true,
                        completed: true,
                    },
                },
                comments: {
                    include: {
                        users: {
                            select: {
                                userid: true,
                                username: true,
                            },
                        },
                    },
                    orderBy: {
                        comment_id: "desc",
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

        // Transform data
        const transformedTask = {
            id: task.id,
            title: task.title,
            description: task.description || "",
            status: task.status || "NOT_STARTED",
            priority: task.priority || "MEDIUM",
            assignee: task.users_tasks_assignee_idTousers?.username || "Unassigned",
            assigneeId: task.assignee_id,
            assigneeEmail: task.users_tasks_assignee_idTousers?.email || "",
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
            createdBy: task.users_tasks_created_by_idTousers?.username || "",
            createdById: task.created_by_id,
            createdAt: task.created_at,
            subtasks: task.subtasks,
            comments: task.comments.map((comment) => ({
                id: comment.comment_id,
                content: comment.content || "",
                userId: comment.user_id,
                userName: comment.users?.username || "Unknown",
            })),
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

// PUT /api/tasks/[id] - Update task
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const taskId = parseInt(id);

        if (isNaN(taskId)) {
            return NextResponse.json(
                { error: "Invalid task ID" },
                { status: 400 }
            );
        }

        const body = await request.json();
        const {
            title,
            description,
            status,
            priority,
            assigneeId,
            projectId,
            dueDate,
        } = body;

        // Check if task exists
        const existingTask = await prisma.tasks.findUnique({
            where: { id: taskId },
        });

        if (!existingTask) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }

        // Update task (use existing values if not provided)
        const updatedTask = await prisma.tasks.update({
            where: { id: taskId },
            data: {
                title: title !== undefined ? title : existingTask.title,
                description: description !== undefined ? description : existingTask.description,
                status: status !== undefined ? status : existingTask.status,
                priority: priority !== undefined ? priority : existingTask.priority,
                assignee_id: assigneeId !== undefined ? parseInt(assigneeId) : existingTask.assignee_id,
                project_id: projectId !== undefined ? (projectId ? parseInt(projectId) : null) : existingTask.project_id,
                due_date: dueDate !== undefined ? (dueDate ? new Date(dueDate) : null) : existingTask.due_date,
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

        return NextResponse.json({
            message: "Task updated successfully",
            task: updatedTask,
        });
    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json(
            { error: "Failed to update task" },
            { status: 500 }
        );
    }
}

// DELETE /api/tasks/[id] - Delete task
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const taskId = parseInt(id);

        if (isNaN(taskId)) {
            return NextResponse.json(
                { error: "Invalid task ID" },
                { status: 400 }
            );
        }

        // Check if task exists
        const existingTask = await prisma.tasks.findUnique({
            where: { id: taskId },
        });

        if (!existingTask) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }

        // Delete task (subtasks and comments will be cascade deleted based on schema)
        await prisma.tasks.delete({
            where: { id: taskId },
        });

        return NextResponse.json({
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json(
            { error: "Failed to delete task" },
            { status: 500 }
        );
    }
}
