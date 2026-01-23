import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

// POST /api/contact - Save a new contact message
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Save contact message to database
        const contactMessage = await prisma.contact_messages.create({
            data: {
                name,
                email,
                subject,
                message,
                is_read: false,
            },
        });

        return NextResponse.json(
            { message: 'Contact message sent successfully', id: contactMessage.id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error saving contact message:', error);
        return NextResponse.json(
            { error: 'Failed to send contact message' },
            { status: 500 }
        );
    }
}

// GET /api/contact - Get all contact messages
export async function GET() {
    try {
        const messages = await prisma.contact_messages.findMany({
            orderBy: {
                created_at: 'desc',
            },
        });

        return NextResponse.json(messages);
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contact messages' },
            { status: 500 }
        );
    }
}
