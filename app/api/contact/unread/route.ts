import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

// GET /api/contact/unread - Get all unread contact messages for notifications
export async function GET() {
    try {
        const messages = await prisma.contact_messages.findMany({
            where: {
                is_read: false,
            },
            orderBy: {
                created_at: 'desc',
            },
            take: 10, // Limit to latest 10 for notifications
        });

        return NextResponse.json(messages);
    } catch (error) {
        console.error('Error fetching unread messages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch unread messages' },
            { status: 500 }
        );
    }
}
