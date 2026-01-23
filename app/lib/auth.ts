"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface AuthUser {
    userId: number;
    username: string;
    email: string;
    role: string;
}

const AUTH_COOKIE_NAME = "auth_session";

/**
 * Sets the authentication cookie after successful login
 */
export async function setAuthCookie(user: AuthUser): Promise<void> {
    const cookieStore = await cookies();

    const sessionData = JSON.stringify({
        userId: user.userId,
        username: user.username,
        email: user.email,
        role: user.role,
        loginTime: Date.now(),
    });

    // Encode to base64 for safe storage
    const encodedSession = Buffer.from(sessionData).toString("base64");

    cookieStore.set(AUTH_COOKIE_NAME, encodedSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    });
}

/**
 * Gets the current authenticated user from cookie
 */
export async function getAuthUser(): Promise<AuthUser | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);

    if (!sessionCookie?.value) {
        return null;
    }

    try {
        const decodedSession = Buffer.from(sessionCookie.value, "base64").toString("utf-8");
        const sessionData = JSON.parse(decodedSession);
        return {
            userId: sessionData.userId,
            username: sessionData.username,
            email: sessionData.email,
            role: sessionData.role,
        };
    } catch {
        return null;
    }
}

/**
 * Clears the authentication cookie (logout)
 */
export async function clearAuthCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
}

/**
 * Require authentication - redirects to login if not authenticated
 */
export async function requireAuth(): Promise<AuthUser> {
    const user = await getAuthUser();
    if (!user) {
        redirect("/auth/login");
    }
    return user;
}

/**
 * Require admin role - redirects if not admin
 */
export async function requireAdmin(): Promise<AuthUser> {
    const user = await requireAuth();
    if (user.role !== "admin") {
        redirect("/auth/login?error=unauthorized");
    }
    return user;
}
