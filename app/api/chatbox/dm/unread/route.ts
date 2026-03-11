import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getAuthUser } from "@/app/lib/auth";

// GET /api/chatbox/dm/unread
// Returns an array of sender_ids that have unread DMs sent to the current user.
export async function GET() {
    try {
        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Find all distinct senders who have at least one unread message to me
        const unread = await prisma.direct_messages.findMany({
            where: {
                receiver_id: user.userId,
                is_read: false,
            },
            select: { sender_id: true },
            distinct: ["sender_id"],
        });

        // Return as a plain array of numbers for easy Set construction on the client
        return NextResponse.json(unread.map((r) => r.sender_id));
    } catch (error) {
        console.error("Error fetching unread DMs:", error);
        return NextResponse.json({ error: "Failed to fetch unread status" }, { status: 500 });
    }
}
