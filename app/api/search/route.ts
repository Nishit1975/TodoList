import { NextRequest, NextResponse } from "next/server";
import { searchData } from "@/app/lib/search";

/**
 * GET /api/search
 *
 * Query params:
 *  q          - search query string
 *  priority   - All | High | Medium | Low
 *  status     - All | Pending | In Progress | Completed | Review | Planning | On Hold
 *  assignee   - All | username
 *  project    - All | project name
 *  dateRange  - All | Today | This Week | This Month | Overdue
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;

        const filters = {
            query: searchParams.get("q") ?? "",
            priority: searchParams.get("priority") ?? "All",
            status: searchParams.get("status") ?? "All",
            assignee: searchParams.get("assignee") ?? "All",
            project: searchParams.get("project") ?? "All",
            dateRange: searchParams.get("dateRange") ?? "All",
        };

        const data = await searchData(filters);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Search API error:", error);
        return NextResponse.json(
            { error: "Failed to perform search", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
