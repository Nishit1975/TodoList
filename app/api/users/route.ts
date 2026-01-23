import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
    try {
        const users = await prisma.users.findMany({
            select: {
                userid: true,
                username: true,
                email: true,
                role: true,
                is_active: true,
            },
            orderBy: {
                username: 'asc',
            },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}
