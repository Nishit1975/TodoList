"use server";

import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function activateUser(userId: number) {
    try {
        await prisma.users.update({
            where: { userid: userId },
            data: { is_active: true }
        });

        revalidatePath("/AdminPanel/users");
        return { success: true, message: "User activated successfully" };
    } catch (error) {
        console.error("Error activating user:", error);
        return { success: false, message: "Failed to activate user" };
    }
}
