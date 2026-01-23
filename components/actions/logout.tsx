"use server";

import { clearAuthCookie } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export async function logout() {
    await clearAuthCookie();
    redirect("/auth/login");
}
