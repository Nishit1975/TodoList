import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// POST /api/tasks/[id]/comments - Add comment to task
export async function POST(
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
        const { content, userId } = body;

        // Validate required fields
        if (!content || !userId) {
            return NextResponse.json(
                { error: "Content and userId are required" },
                { status: 400 }
            );
        }

        // Check if task exists
        const task = await prisma.tasks.findUnique({
            where: { id: taskId },
        });

        if (!task) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }

        // Create comment
        const comment = await prisma.comments.create({
            data: {
                content,
                task_id: taskId,
                user_id: parseInt(userId),
            },
            include: {
                users: {
                    select: {
                        userid: true,
                        username: true,
                    },
                },
            },
        });

        return NextResponse.json({
            message: "Comment added successfully",
            comment: {
                id: comment.comment_id,
                content: comment.content,
                userId: comment.user_id,
                userName: comment.users?.username || "Unknown",
            },
        }, { status: 201 });
    } catch (error) {
        console.error("Error adding comment:", error);
        return NextResponse.json(
            { error: "Failed to add comment" },
            { status: 500 }
        );
    }
}
