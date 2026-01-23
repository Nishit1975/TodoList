"use client";

import { useState } from "react";
import { UserCheck } from "lucide-react";
import activateUser from "@/components/actions/activateUser";

export default function ActivateBtn({ userId }: { userId: number }) {
    const [loading, setLoading] = useState(false);

    const handleActivate = async () => {
        if (!confirm("Are you sure you want to activate this user?")) {
            return;
        }

        setLoading(true);
        try {
            const result = await activateUser(userId);
            if (result.success) {
                alert(result.message);
                window.location.reload(); // Reload to show updated status
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert("An error occurred while activating user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleActivate}
            disabled={loading}
            className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Activate user account"
        >
            <UserCheck className="w-3.5 h-3.5" />
            {loading ? "Activating..." : "Activate"}
        </button>
    );
}
