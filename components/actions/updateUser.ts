"use server";

import prisma from "@/app/lib/prisma";

export async function updateUser(
    userId: number,
    data: {
        name: string;
        email: string;
        password: string;
        role: string;
    }
) {
    try {
        // Check if email is taken by another user
        const existingUser = await prisma.users.findFirst({
            where: {
                email: data.email,
                NOT: {
                    userid: userId
                }
            }
        });

        if (existingUser) {
            return { success: false, error: "Email is already taken by another user" };
        }

        // Prepare update data
        const updateData: any = {
            username: data.name,
            email: data.email,
            role: data.role,
        };

        // Only update password if provided
        if (data.password && data.password.trim() !== '') {
            updateData.password = data.password; // In production, hash this password
        }

        // Update user
        const updatedUser = await prisma.users.update({
            where: { userid: userId },
            data: updateData
        });

        return { success: true, user: updatedUser };
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, error: "Failed to update user" };
    }
}
