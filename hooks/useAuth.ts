"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface AuthUser {
    userId: number;
    username: string;
    email: string;
    role: string;
}

export function useAuth() {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch("/api/auth/me");

                if (!response.ok) {
                    // User not authenticated
                    router.push("/auth/login");
                    return;
                }

                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error("Failed to fetch user:", error);
                router.push("/auth/login");
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [router]);

    return { user, loading };
}
