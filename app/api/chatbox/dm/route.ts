import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getAuthUser } from "@/app/lib/auth";

// GET /api/chatbox/dm?receiverId=X
// Returns the full conversation between the current user and receiverId.
export async function GET(request: Request) {
    try {
        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const receiverIdStr = searchParams.get("receiverId");

        if (!receiverIdStr || isNaN(parseInt(receiverIdStr))) {
            return NextResponse.json({ error: "receiverId is required" }, { status: 400 });
        }

        const receiverId = parseInt(receiverIdStr);

        const messages = await prisma.direct_messages.findMany({
            where: {
                OR: [
                    { sender_id: user.userId,  receiver_id: receiverId },
                    { sender_id: receiverId,    receiver_id: user.userId },
                ],
            },
            orderBy: { created_at: "asc" },
            take: 100,
            include: {
                sender:   { select: { userid: true, username: true } },
                receiver: { select: { userid: true, username: true } },
            },
        });

        const transformed = messages.map((msg) => ({
            id:         msg.id,
            content:    msg.content,
            senderId:   msg.sender_id,
            receiverId: msg.receiver_id,
            senderName: msg.sender?.username ?? "Unknown",
            isRead:     msg.is_read,
            createdAt:  msg.created_at,
        }));

        return NextResponse.json(transformed);
    } catch (error) {
        console.error("Error fetching DMs:", error);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}

// POST /api/chatbox/dm
// Body: { receiverId: number, content: string }
// Creates a new DM (is_read defaults to false in DB).
export async function POST(request: Request) {
    try {
        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const body = await request.json();
        const { receiverId, content } = body;

        if (!receiverId || isNaN(Number(receiverId))) {
            return NextResponse.json({ error: "receiverId is required" }, { status: 400 });
        }
        if (!content || typeof content !== "string" || content.trim() === "") {
            return NextResponse.json({ error: "Message content is required" }, { status: 400 });
        }

        const receiver = await prisma.users.findUnique({
            where: { userid: Number(receiverId) },
            select: { userid: true },
        });
        if (!receiver) {
            return NextResponse.json({ error: "Receiver not found" }, { status: 404 });
        }

        const message = await prisma.direct_messages.create({
            data: {
                content:     content.trim(),
                sender_id:   user.userId,
                receiver_id: Number(receiverId),
                // is_read defaults to false — the receiver needs to open the chat
            },
            include: {
                sender: { select: { userid: true, username: true } },
            },
        });

        return NextResponse.json(
            {
                id:         message.id,
                content:    message.content,
                senderId:   message.sender_id,
                receiverId: message.receiver_id,
                senderName: message.sender?.username ?? "Unknown",
                isRead:     message.is_read,
                createdAt:  message.created_at,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error sending DM:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}

// PATCH /api/chatbox/dm
// Body: { senderId: number }
// Marks all DMs from senderId → currentUser as is_read = true.
export async function PATCH(request: Request) {
    try {
        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const body = await request.json();
        const { senderId } = body;

        if (!senderId || isNaN(Number(senderId))) {
            return NextResponse.json({ error: "senderId is required" }, { status: 400 });
        }

        await prisma.direct_messages.updateMany({
            where: {
                sender_id:   Number(senderId),
                receiver_id: user.userId,
                is_read:     false,
            },
            data: { is_read: true },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error marking DMs as read:", error);
        return NextResponse.json({ error: "Failed to mark as read" }, { status: 500 });
    }
}
