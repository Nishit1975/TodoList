import { NextResponse } from "next/server";
import { getAuthUser } from "@/app/lib/auth";
import { getDashboardData } from "@/app/lib/dashboard-data";

export async function GET() {
    const user = await getAuthUser();

    if (!user || user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await getDashboardData();
        return NextResponse.json(data);
    } catch (error) {
        console.error("[Dashboard Stats Error]", error);
        return NextResponse.json(
            { error: "Failed to fetch dashboard data" },
            { status: 500 }
        );
    }
}
