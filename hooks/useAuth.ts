"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export interface AuthUser {
    userId: number;
    username: string;
    email: string;
    role: string;
}

/**
 * Fetches the currently authenticated user from the server.
 * Uses cache: "no-store" so the browser never serves a cached (stale) response.
 */
export function fetchAuthUser(): Promise<AuthUser | null> {
    return fetch("/api/auth/me", {
        cache: "no-store",
        headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
        },
    })
        .then((res) => {
            if (!res.ok) return null;
            return res.json() as Promise<AuthUser>;
        })
        .catch(() => null);
}

// Kept for API compatibility — actual cache prevention is done via fetch headers.
export function clearAuthCache() { /* no-op */ }

/**
 * useAuth — returns the currently logged-in user and a loading flag.
 *
 * Re-fetches on every pathname change so that switching users in the same
 * browser session always shows the correct, fresh username.
 */
export function useAuth() {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname(); // Re-run on every navigation

    useEffect(() => {
        let cancelled = false;

        // Reset to loading state immediately when the route changes
        // so stale user data is never visible during the transition.
        setLoading(true);
        setUser(null);

        fetchAuthUser().then((userData) => {
            if (cancelled) return;
            if (!userData) {
                // No valid session — redirect to login
                router.push("/auth/login");
            } else {
                setUser(userData);
            }
            setLoading(false);
        });

        return () => { cancelled = true; };
    }, [pathname]); // ← re-fetch whenever the user navigates to a new page

    return { user, loading };
}

