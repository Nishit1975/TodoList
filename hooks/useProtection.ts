"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Client-side hook to ensure admin authentication on protected pages
 * This provides an additional layer of security beyond server-side checks
 * and handles edge cases like browser back button after logout
 */
export function useAdminProtection() {
    const router = useRouter();

    useEffect(() => {
        // Check authentication on mount and visibility change
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/auth/me", {
                    cache: "no-store",
                    headers: {
                        "Cache-Control": "no-cache",
                        "Pragma": "no-cache",
                    },
                });

                if (!response.ok) {
                    // Not authenticated - clear everything and redirect
                    if (typeof window !== "undefined") {
                        localStorage.clear();
                        sessionStorage.clear();
                    }
                    router.push("/auth/login");
                    return;
                }

                const user = await response.json();

                // Verify admin role
                if (user.role !== "admin") {
                    // Not an admin - clear and redirect
                    if (typeof window !== "undefined") {
                        localStorage.clear();
                        sessionStorage.clear();
                    }
                    router.push("/auth/login?error=unauthorized");
                }
            } catch (error) {
                // Network error or other issue - redirect to login
                console.error("Authentication check failed:", error);
                if (typeof window !== "undefined") {
                    localStorage.clear();
                    sessionStorage.clear();
                }
                router.push("/auth/login");
            }
        };

        // Initial check
        checkAuth();

        // Re-check when page becomes visible (handles browser back button)
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                checkAuth();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Cleanup
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [router]);
}

/**
 * Client-side hook to ensure user authentication on protected pages
 */
export function useUserProtection() {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/auth/me", {
                    cache: "no-store",
                    headers: {
                        "Cache-Control": "no-cache",
                        "Pragma": "no-cache",
                    },
                });

                if (!response.ok) {
                    if (typeof window !== "undefined") {
                        localStorage.clear();
                        sessionStorage.clear();
                    }
                    router.push("/auth/login");
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
                if (typeof window !== "undefined") {
                    localStorage.clear();
                    sessionStorage.clear();
                }
                router.push("/auth/login");
            }
        };

        checkAuth();

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                checkAuth();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [router]);
}
