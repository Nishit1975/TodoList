"use client";

import { useSearch } from "@/contexts/SearchContext";
import { useMemo } from "react";
import Link from "next/link";
import DeleteBtn from "@/components/ui/DeleteBtn";
import ToggleStatusBtn from "@/components/ui/ToggleStatusBtn";
import deleteUser from "@/components/actions/DeleteUser";
import { Mail, Shield, Edit, Search, X } from "lucide-react";

interface User {
    userid: number;
    username: string;
    email: string;
    password: string;
    role: string | null;
    is_active: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
}

interface UsersTableWrapperProps {
    users: User[];
    isAdmin: boolean;
}

export function UsersTableWrapper({ users, isAdmin }: UsersTableWrapperProps) {
    const { searchQuery, setSearchQuery } = useSearch();

    const filteredUsers = useMemo(() => {
        if (!searchQuery.trim()) {
            return users;
        }

        const query = searchQuery.toLowerCase();
        return users.filter(user =>
            user.username.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            (user.role && user.role.toLowerCase().includes(query))
        );
    }, [users, searchQuery]);

    const getRoleBadge = (role: string | null) => {
        if (role === 'admin') {
            return 'bg-purple-100 text-purple-700 border-purple-200';
        }
        return 'bg-blue-100 text-blue-700 border-blue-200';
    };

    // Show search indicator and no results message
    if (searchQuery.trim() && filteredUsers.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan={6} className="px-6 py-12">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                                    <Search className="w-8 h-8 text-slate-400" />
                                </div>
                            </div>
                            <h3 className="text-lg font-black text-slate-900 mb-2">
                                No users found for "{searchQuery}"
                            </h3>
                            <p className="text-slate-500 text-sm mb-4">
                                Try adjusting your search terms
                            </p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-xl font-bold text-sm transition-all inline-flex items-center gap-2"
                            >
                                <X className="w-4 h-4" />
                                Clear Search
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <>
            {/* Search Indicator - Shows when filtering */}
            {searchQuery.trim() && (
                <caption className="text-left pb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-xl border border-indigo-200">
                        <Search className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-bold text-indigo-900">
                            Showing {filteredUsers.length} result{filteredUsers.length !== 1 ? 's' : ''} for "{searchQuery}"
                        </span>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="ml-2 p-1 hover:bg-indigo-200 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4 text-indigo-600" />
                        </button>
                    </div>
                </caption>
            )}

            <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user, index) => (
                    <tr key={user.userid} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-bold text-slate-900">{index + 1}</span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                                    {user.username?.substring(0, 2).toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">{user.username}</p>
                                </div>
                            </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Mail className="w-4 h-4 text-slate-400" />
                                {user.email}
                            </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-black border-2 inline-flex items-center gap-1.5 ${getRoleBadge(user.role)}`}>
                                <Shield className="w-3.5 h-3.5" />
                                {user.role === 'admin' ? 'Admin' : 'User'}
                            </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-center">
                            <ToggleStatusBtn
                                userId={user.userid}
                                isActive={user.is_active || false}
                                isAdmin={isAdmin}
                            />
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center gap-2">
                                <Link
                                    href={`/AdminPanel/users/edit/${user.userid}`}
                                    className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5"
                                >
                                    <Edit className="w-3.5 h-3.5" />
                                    Edit
                                </Link>
                                <DeleteBtn id={user.userid} deleteFn={deleteUser} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </>
    );
}
