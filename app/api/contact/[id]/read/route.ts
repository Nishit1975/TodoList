import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

// PATCH /api/contact/:id/read - Mark a contact message as read
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const messageId = parseInt(id, 10);

        if (isNaN(messageId)) {
            return NextResponse.json(
                { error: 'Invalid message ID' },
                { status: 400 }
            );
        }

        const updatedMessage = await prisma.contact_messages.update({
            where: { id: messageId },
            data: { is_read: true },
        });

        return NextResponse.json(updatedMessage);
    } catch (error) {
        console.error('Error marking message as read:', error);
        return NextResponse.json(
            { error: 'Failed to mark message as read' },
            { status: 500 }
        );
    }
}
