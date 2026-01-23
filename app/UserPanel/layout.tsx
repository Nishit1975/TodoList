import React from 'react';
import { UserSidebar } from '@/components/user/sidebar';
import { UserNavbar } from '@/components/user/navbar';
import { requireAuth } from '@/app/lib/auth';

export default async function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await requireAuth();

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <UserSidebar />
            <main className="flex-1 ml-72">
                <UserNavbar />
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
