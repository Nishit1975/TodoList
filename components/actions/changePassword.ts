"use server";

import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { getAuthUser } from "@/app/lib/auth";

export async function changePassword(formData: FormData) {
    try {
        // Get current logged-in user
        const currentUser = await getAuthUser();

        if (!currentUser) {
            redirect("/auth/login");
        }

        const currentPassword = formData.get("currentPassword") as string;
        const newPassword = formData.get("newPassword") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        // Validate inputs
        if (!currentPassword || !newPassword || !confirmPassword) {
            return { error: "All fields are required" };
        }

        if (newPassword.length < 6) {
            return { error: "New password must be at least 6 characters long" };
        }

        if (newPassword !== confirmPassword) {
            return { error: "New passwords do not match" };
        }

        // Get user with password hash
        const user = await prisma.users.findUnique({
            where: { userid: currentUser.userId }
        });

        if (!user || !user.password) {
            return { error: "User not found" };
        }

        // Verify current password (direct comparison since login uses plain text)
        // Note: In production, you should use bcrypt.compare if passwords are hashed
        if (currentPassword !== user.password) {
            return { error: "Current password is incorrect" };
        }

        // Update password (storing as plain text to match login logic)
        // Note: In production, hash the password with bcrypt.hash(newPassword, 10)
        await prisma.users.update({
            where: { userid: currentUser.userId },
            data: { password: newPassword }
        });

        return { success: true };
    } catch (error) {
        console.error("Password change error:", error);
        return { error: "Failed to change password. Please try again." };
    }
}
