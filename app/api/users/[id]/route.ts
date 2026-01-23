import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const userId = parseInt(params.id);

        const user = await prisma.users.findUnique({
            where: { userid: userId },
            select: {
                userid: true,
                username: true,
                email: true,
                role: true,
                // Don't send password
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}
