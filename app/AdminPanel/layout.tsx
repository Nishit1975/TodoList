import React from 'react';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminNavbar } from '@/components/admin/navbar';
import { requireAdmin } from '@/app/lib/auth';
import { SearchProvider } from '@/contexts/SearchContext';
import { headers } from 'next/headers';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Set no-cache headers to prevent browser caching
    const headersList = await headers();

    await requireAdmin();

    return (
        <SearchProvider>
            <div className="flex min-h-screen bg-[#F8FAFC]">
                <AdminSidebar />
                <main className="flex-1 ml-72">
                    <AdminNavbar />
                    <div className="p-8">
                        {children}
                    </div>
                </main>
            </div>
        </SearchProvider>
    );
}
