"use server";

import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { getAuthUser, setAuthCookie } from "@/app/lib/auth";

export async function updateProfile(formData: FormData) {
    try {
        // Get current logged-in user
        const currentUser = await getAuthUser();

        if (!currentUser) {
            redirect("/auth/login");
        }

        const username = formData.get("username") as string;
        const email = formData.get("email") as string;

        // Validate inputs
        if (!username || username.trim() === "") {
            return { error: "Username is required" };
        }

        if (!email || email.trim() === "") {
            return { error: "Email is required" };
        }

        // Check if email is already taken by another user
        const existingUser = await prisma.users.findFirst({
            where: {
                email: email,
                userid: {
                    not: currentUser.userId
                }
            }
        });

        if (existingUser) {
            return { error: "Email is already in use by another account" };
        }

        // Update user profile
        await prisma.users.update({
            where: {
                userid: currentUser.userId
            },
            data: {
                username: username.trim(),
                email: email.trim(),
            }
        });

        // ✅ UPDATE AUTH COOKIE - This makes changes reflect immediately
        await setAuthCookie({
            userId: currentUser.userId,
            username: username.trim(),
            email: email.trim(),
            role: currentUser.role
        });

        return { success: true };
    } catch (error) {
        console.error("Profile update error:", error);
        return { error: "Failed to update profile. Please try again." };
    }
}
