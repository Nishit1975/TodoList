import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getAuthUser } from "@/app/lib/auth";

// GET /api/chatbox/users — list all users (for the chat members panel)
export async function GET() {
    try {
        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const users = await prisma.users.findMany({
            where: { is_active: true },
            select: {
                userid: true,
                username: true,
                email: true,
                role: true,
            },
            orderBy: { username: "asc" },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}
