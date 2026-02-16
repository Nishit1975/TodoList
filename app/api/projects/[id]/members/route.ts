import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// POST /api/projects/[id]/members - Add team member to project
export async function POST(
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
        const { userId, role } = body;

        // Validate required fields
        if (!userId || !role) {
            return NextResponse.json(
                { error: "User ID and role are required" },
                { status: 400 }
            );
        }

        const userIdInt = parseInt(userId);

        // Check if project exists
        const project = await prisma.projects.findUnique({
            where: { project_id: projectId },
        });

        if (!project) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        // Check if user exists
        const user = await prisma.users.findUnique({
            where: { userid: userIdInt },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Check if member already exists
        const existingMember = await prisma.project_members.findFirst({
            where: {
                project_id: projectId,
                user_id: userIdInt,
            },
        });

        if (existingMember) {
            return NextResponse.json(
                { error: "User is already a member of this project" },
                { status: 400 }
            );
        }

        // Add team member
        const newMember = await prisma.project_members.create({
            data: {
                project_id: projectId,
                user_id: userIdInt,
                role,
            },
            include: {
                users: {
                    select: {
                        userid: true,
                        username: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json({
            message: "Team member added successfully",
            member: {
                name: newMember.users.username,
                role: newMember.role,
                userId: newMember.users.userid,
            },
        });
    } catch (error) {
        console.error("Error adding team member:", error);
        return NextResponse.json(
            { error: "Failed to add team member" },
            { status: 500 }
        );
    }
}

// DELETE /api/projects/[id]/members - Remove team member from project
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

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        const userIdInt = parseInt(userId);

        // Find the member
        const member = await prisma.project_members.findFirst({
            where: {
                project_id: projectId,
                user_id: userIdInt,
            },
        });

        if (!member) {
            return NextResponse.json(
                { error: "Team member not found" },
                { status: 404 }
            );
        }

        // Delete the member
        await prisma.project_members.delete({
            where: {
                id: member.id,
            },
        });

        return NextResponse.json({
            message: "Team member removed successfully",
        });
    } catch (error) {
        console.error("Error removing team member:", error);
        return NextResponse.json(
            { error: "Failed to remove team member" },
            { status: 500 }
        );
    }
}
