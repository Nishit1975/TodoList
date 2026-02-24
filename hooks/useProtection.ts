"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchAuthUser, clearAuthCache } from "@/hooks/useAuth";

/**
 * Client-side hook to ensure admin authentication on protected pages.
 * Reuses the module-level auth cache from useAuth — no duplicate /api/auth/me calls.
 */
export function useAdminProtection() {
    const router = useRouter();

    useEffect(() => {
        let cancelled = false;

        const checkAuth = async () => {
            const user = await fetchAuthUser();
            if (cancelled) return;

            if (!user) {
                clearAuthCache();
                if (typeof window !== "undefined") {
                    localStorage.clear();
                    sessionStorage.clear();
                }
                router.push("/auth/login");
                return;
            }

            if (user.role !== "admin") {
                clearAuthCache();
                if (typeof window !== "undefined") {
                    localStorage.clear();
                    sessionStorage.clear();
                }
                router.push("/auth/login?error=unauthorized");
            }
        };

        checkAuth();

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                // Clear cache on tab-focus so re-check hits the server
                clearAuthCache();
                checkAuth();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            cancelled = true;
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty deps — router is stable in Next 15.
}

/**
 * Client-side hook to ensure user authentication on protected pages.
 * Reuses the module-level auth cache from useAuth.
 */
export function useUserProtection() {
    const router = useRouter();

    useEffect(() => {
        let cancelled = false;

        const checkAuth = async () => {
            const user = await fetchAuthUser();
            if (cancelled) return;

            if (!user) {
                clearAuthCache();
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
                clearAuthCache();
                checkAuth();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            cancelled = true;
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
