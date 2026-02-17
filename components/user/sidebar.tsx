"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutGrid,
    Folder,
    CheckSquare,
    Search,
    Calendar,
    StickyNote,
    MessageSquare,
    User,
    Settings,
    LogOut,
    CheckCircle2
} from "lucide-react";
import { logout } from "@/components/actions/logout";

const mainNavItems = [
    { name: "Dashboard", href: "/UserPanel", icon: LayoutGrid },
    { name: "My Projects", href: "/UserPanel/projects", icon: Folder },
    { name: "My Tasks", href: "/UserPanel/tasks", icon: CheckSquare },
    { name: "Search", href: "/UserPanel/search", icon: Search },
    { name: "Calendar", href: "/UserPanel/calendar", icon: Calendar },
    { name: "Notes", href: "/UserPanel/notes", icon: StickyNote },
    { name: "Chat Box", href: "/UserPanel/chatbox", icon: MessageSquare },
];

const bottomNavItems = [
    { name: "Profile", href: "/UserPanel/profile", icon: User },
    { name: "Settings", href: "/UserPanel/settings", icon: Settings },
];

export function UserSidebar() {
    const pathname = usePathname();

    useEffect(() => {
        document.documentElement.classList.add("dark");
        sessionStorage.setItem("theme", "dark");
    }, []);

    return (
        <aside className="w-72 h-screen fixed left-0 top-0 z-40 flex flex-col
            bg-slate-900 border-r border-slate-800">

            {/* Header */}
            <div className="h-20 flex items-center px-8 mb-4 border-b border-slate-800">
                <Link href="/UserPanel" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center
                        bg-emerald-900/40 group-hover:bg-emerald-900/60 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-xl font-bold text-slate-100">
                        Todo<span className="text-emerald-400">List</span>
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 flex flex-col px-4 gap-6 py-6 overflow-y-auto">

                {/* Main Menu */}
                <div className="space-y-1">
                    <p className="px-3 text-xs font-semibold uppercase tracking-wider mb-2 text-slate-500">
                        Menu
                    </p>

                    {mainNavItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                                    transition-colors
                                    ${isActive
                                        ? "bg-emerald-900/40 text-emerald-300"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                                    }`}
                            >
                                <item.icon
                                    className={`w-5 h-5 ${isActive ? "text-emerald-400" : "text-slate-500"
                                        }`}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* System */}
                <div className="space-y-1 mt-auto">
                    <p className="px-3 text-xs font-semibold uppercase tracking-wider mb-2 text-slate-500">
                        System
                    </p>

                    {bottomNavItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                                    transition-colors
                                    ${isActive
                                        ? "bg-emerald-900/40 text-emerald-300"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                                    }`}
                            >
                                <item.icon
                                    className={`w-5 h-5 ${isActive ? "text-emerald-400" : "text-slate-500"
                                        }`}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Logout */}
            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={async () => {
                        // Clear client-side storage first
                        if (typeof window !== 'undefined') {
                            localStorage.clear();
                            sessionStorage.clear();
                        }
                        // Call server action to clear cookie
                        await logout();
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg
                        text-sm font-medium text-slate-400
                        hover:bg-red-900/30 hover:text-red-400 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
