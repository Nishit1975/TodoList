import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to protect admin and user routes
 * This runs on every request at the edge, before the page loads
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get the auth cookie
    const authCookie = request.cookies.get("auth_session");

    // Check if accessing protected routes
    const isAdminRoute = pathname.startsWith("/AdminPanel");
    const isUserRoute = pathname.startsWith("/UserPanel");
    const isProtectedRoute = isAdminRoute || isUserRoute;

    // If accessing a protected route without auth cookie, redirect to login
    if (isProtectedRoute && !authCookie) {
        const loginUrl = new URL("/auth/login", request.url);
        const response = NextResponse.redirect(loginUrl);

        // Set cache control headers to prevent caching of protected pages
        response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");

        return response;
    }

    // If auth cookie exists for protected routes, verify role
    if (isProtectedRoute && authCookie) {
        try {
            const decodedSession = Buffer.from(authCookie.value, "base64").toString("utf-8");
            const sessionData = JSON.parse(decodedSession);

            // Admin route requires admin role
            if (isAdminRoute && sessionData.role !== "admin") {
                const loginUrl = new URL("/auth/login?error=unauthorized", request.url);
                const response = NextResponse.redirect(loginUrl);

                // Clear invalid cookie
                response.cookies.delete("auth_session");

                // Set no-cache headers
                response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
                response.headers.set("Pragma", "no-cache");
                response.headers.set("Expires", "0");

                return response;
            }

            // User route requires user or admin role
            if (isUserRoute && !sessionData.role) {
                const loginUrl = new URL("/auth/login", request.url);
                const response = NextResponse.redirect(loginUrl);

                response.cookies.delete("auth_session");

                response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
                response.headers.set("Pragma", "no-cache");
                response.headers.set("Expires", "0");

                return response;
            }
        } catch (error) {
            // Invalid cookie format - redirect to login
            const loginUrl = new URL("/auth/login", request.url);
            const response = NextResponse.redirect(loginUrl);

            response.cookies.delete("auth_session");

            response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
            response.headers.set("Pragma", "no-cache");
            response.headers.set("Expires", "0");

            return response;
        }
    }

    // For protected routes, add no-cache headers to prevent browser back button access
    if (isProtectedRoute) {
        const response = NextResponse.next();
        response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
        return response;
    }

    return NextResponse.next();
}

/**
 * Configure which routes this middleware should run on
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api routes (handled separately)
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico, etc
         */
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico).*)",
    ],
};
