import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getAuthUser } from "@/app/lib/auth";

// GET /api/chatbox — fetch all messages (newest first, then reversed on client)
export async function GET() {
    try {
        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const messages = await prisma.chat_messages.findMany({
            orderBy: { created_at: "asc" },
            take: 100, // last 100 messages
            include: {
                users: {
                    select: {
                        userid: true,
                        username: true,
                    },
                },
            },
        });

        const transformed = messages.map((msg) => ({
            id: msg.id,
            content: msg.content,
            senderId: msg.sender_id,
            senderName: msg.users?.username ?? "Unknown",
            createdAt: msg.created_at,
        }));

        return NextResponse.json(transformed);
    } catch (error) {
        console.error("Error fetching chat messages:", error);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}

// POST /api/chatbox — send a new message
export async function POST(request: Request) {
    try {
        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const body = await request.json();
        const { content } = body;

        if (!content || typeof content !== "string" || content.trim() === "") {
            return NextResponse.json({ error: "Message content is required" }, { status: 400 });
        }

        const message = await prisma.chat_messages.create({
            data: {
                content: content.trim(),
                sender_id: user.userId,
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

        return NextResponse.json(
            {
                id: message.id,
                content: message.content,
                senderId: message.sender_id,
                senderName: message.users?.username ?? "Unknown",
                createdAt: message.created_at,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error sending chat message:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
