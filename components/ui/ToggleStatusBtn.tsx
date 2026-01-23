"use client";

import { useState } from "react";
import { UserCheck, UserX } from "lucide-react";

interface ToggleStatusBtnProps {
    userId: number;
    isActive: boolean;
    isAdmin: boolean;
}

export default function ToggleStatusBtn({ userId, isActive, isAdmin }: ToggleStatusBtnProps) {
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        if (!isAdmin) return; // Only admins can toggle

        const action = isActive ? "deactivate" : "activate";
        if (!confirm(`Are you sure you want to ${action} this user?`)) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/users/toggle-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, isActive: !isActive })
            });

            const result = await response.json();

            if (result.success) {
                alert(result.message);
                window.location.reload();
            } else {
                alert(result.message || 'Failed to update status');
            }
        } catch (error) {
            alert('An error occurred while updating status');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <span className="px-3 py-1.5 rounded-full text-xs font-black bg-slate-100 text-slate-600 border-2 border-slate-200 inline-flex items-center gap-1.5">
                Updating...
            </span>
        );
    }

    if (isActive) {
        return (
            <button
                onClick={handleToggle}
                disabled={!isAdmin}
                className={`px-3 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-700 border-2 border-emerald-200 inline-flex items-center gap-1.5 ${isAdmin ? 'hover:bg-emerald-200 cursor-pointer' : 'cursor-default'
                    }`}
                title={isAdmin ? "Click to deactivate user" : "Active"}
            >
                <UserCheck className="w-3.5 h-3.5" />
                Active
            </button>
        );
    }

    return (
        <button
            onClick={handleToggle}
            disabled={!isAdmin}
            className={`px-3 py-1.5 rounded-full text-xs font-black bg-slate-100 text-slate-600 border-2 border-slate-200 inline-flex items-center gap-1.5 ${isAdmin ? 'hover:bg-slate-200 cursor-pointer' : 'cursor-default'
                }`}
            title={isAdmin ? "Click to activate user" : "Inactive"}
        >
            <UserX className="w-3.5 h-3.5" />
            Inactive
        </button>
    );
}
