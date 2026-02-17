"use server";

import { clearAuthCookie } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function logout() {
    // Clear the auth cookie
    await clearAuthCookie();

    // Extra safety: Manually delete any potential auth-related cookies
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    // Delete all cookies to ensure complete logout
    for (const cookie of allCookies) {
        cookieStore.delete(cookie.name);
    }

    // Revalidate all admin and user panel paths to force re-authentication
    revalidatePath("/AdminPanel", "layout");
    revalidatePath("/UserPanel", "layout");
    revalidatePath("/", "layout");

    // Redirect to login
    redirect("/auth/login");
}
