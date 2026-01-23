import { NextResponse } from "next/server";
import { getAuthUser } from "@/app/lib/auth";

/**
 * API Route to get current authenticated user
 * GET /api/auth/me
 */
export async function GET() {
    const user = await getAuthUser();

    if (!user) {
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 }
        );
    }

    return NextResponse.json({
        userId: user.userId,
        username: user.username,
        email: user.email,
        role: user.role,
    });
}
