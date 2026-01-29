import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// GET /api/projects/stats - Fetch project statistics
export async function GET() {
    try {
        const projects = await prisma.projects.findMany({
            include: {
                tasks: {
                    select: {
                        status: true,
                    },
                },
            },
        });

        const totalProjects = projects.length;
        const inProgressCount = projects.filter(
            (p: any) => p.status === "In_Progress"
        ).length;
        const completedCount = projects.filter(
            (p: any) => p.status === "Completed"
        ).length;

        // Calculate average progress
        let totalProgress = 0;
        projects.forEach((project: any) => {
            const totalTasks = project.tasks.length;
            const completedTasks = project.tasks.filter(
                (task: any) => task.status === "DONE"
            ).length;
            const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
            totalProgress += progress;
        });

        const avgProgress =
            totalProjects > 0 ? Math.round(totalProgress / totalProjects) : 0;

        return NextResponse.json({
            totalProjects,
            inProgressCount,
            completedCount,
            avgProgress,
        });
    } catch (error) {
        console.error("Error fetching project stats:", error);
        return NextResponse.json(
            { error: "Failed to fetch project stats" },
            { status: 500 }
        );
    }
}
