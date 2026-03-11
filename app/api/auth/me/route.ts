import { NextResponse } from "next/server";
import { getAuthUser } from "@/app/lib/auth";

/**
 * API Route to get current authenticated user
 * GET /api/auth/me
 *
 * Cache-Control headers ensure the browser and Next.js fetch cache
 * NEVER serve stale session data — every request reads the live cookie.
 */
export async function GET() {
    const user = await getAuthUser();

    if (!user) {
        const res = NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 }
        );
        res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        res.headers.set("Pragma", "no-cache");
        res.headers.set("Expires", "0");
        return res;
    }

    const res = NextResponse.json({
        userId: user.userId,
        username: user.username,
        email: user.email,
        role: user.role,
    });

    // Prevent ANY caching — user data must always be fresh
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.headers.set("Pragma", "no-cache");
    res.headers.set("Expires", "0");

    return res;
}
