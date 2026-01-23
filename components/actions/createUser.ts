"use server";

import prisma from "@/app/lib/prisma";

export async function createUser(data: {
    name: string;
    email: string;
    password: string;
    role: string;
    status: string; // 'Active' or 'Inactive'
}) {
    try {
        // Check if user already exists
        const existingUser = await prisma.users.findUnique({
            where: { email: data.email }
        });

        if (existingUser) {
            return { success: false, error: "User with this email already exists" };
        }

        // Create new user
        const newUser = await prisma.users.create({
            data: {
                username: data.name,
                email: data.email,
                password: data.password, // In production, hash this password
                role: data.role,
                is_active: data.status === 'Active', // Convert to boolean
            }
        });

        return { success: true, user: newUser };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, error: "Failed to create user" };
    }
}
