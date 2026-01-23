import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { getAuthUser } from '@/app/lib/auth';

// DELETE /api/admin/contact-messages/:id - Delete a contact message (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Get current authenticated user
        const user = await getAuthUser();

        if (!user || user.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = await params;
        const messageId = parseInt(id, 10);

        if (isNaN(messageId)) {
            return NextResponse.json(
                { error: 'Invalid message ID' },
                { status: 400 }
            );
        }

        // Check if message exists
        const message = await prisma.contact_messages.findUnique({
            where: { id: messageId },
        });

        if (!message) {
            return NextResponse.json(
                { error: 'Message not found' },
                { status: 404 }
            );
        }

        // Delete the contact message
        await prisma.contact_messages.delete({
            where: { id: messageId },
        });

        return NextResponse.json({
            message: 'Contact message deleted successfully',
            id: messageId,
        });
    } catch (error) {
        console.error('Error deleting contact message:', error);
        return NextResponse.json(
            { error: 'Failed to delete contact message' },
            { status: 500 }
        );
    }
}
