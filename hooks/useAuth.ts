"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface AuthUser {
    userId: number;
    username: string;
    email: string;
    role: string;
}

// Module-level cache so multiple hook instances (Navbar + protection hook)
// share a single in-flight request and a single resolved value per page load.
let cachedUser: AuthUser | null | undefined = undefined; // undefined = not yet fetched
let inflight: Promise<AuthUser | null> | null = null;

export function fetchAuthUser(): Promise<AuthUser | null> {
    if (cachedUser !== undefined) return Promise.resolve(cachedUser);
    if (inflight) return inflight;

    inflight = fetch("/api/auth/me", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
    })
        .then((res) => {
            if (!res.ok) return null;
            return res.json() as Promise<AuthUser>;
        })
        .catch(() => null)
        .then((user) => {
            cachedUser = user;
            inflight = null;
            return user;
        });

    return inflight;
}

// Call this on logout so the next page load re-fetches.
export function clearAuthCache() {
    cachedUser = undefined;
    inflight = null;
}

export function useAuth() {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    // Capture router ref once — avoids re-running the effect on every navigation.
    const router = useRouter();

    useEffect(() => {
        let cancelled = false;

        fetchAuthUser().then((userData) => {
            if (cancelled) return;
            if (!userData) {
                router.push("/auth/login");
            } else {
                setUser(userData);
            }
            setLoading(false);
        });

        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty deps: only run once per mount — router is stable in Next 15.

    return { user, loading };
}
