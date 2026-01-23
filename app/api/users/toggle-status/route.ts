import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { getAuthUser } from '@/app/lib/auth';

export async function POST(request: Request) {
    try {
        // Check if user is admin
        const currentUser = await getAuthUser();
        if (!currentUser || currentUser.role !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'Only admins can change user status' },
                { status: 403 }
            );
        }

        const { userId, isActive } = await request.json();

        // Update user status
        await prisma.users.update({
            where: { userid: userId },
            data: { is_active: isActive }
        });

        const message = isActive
            ? 'User activated successfully'
            : 'User deactivated successfully';

        return NextResponse.json({ success: true, message });
    } catch (error) {
        console.error('Error toggling user status:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update user status' },
            { status: 500 }
        );
    }
}
