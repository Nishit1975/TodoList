import prisma from "@/app/lib/prisma";
import Link from "next/link";
import DeleteBtn from "@/components/ui/DeleteBtn";
import ToggleStatusBtn from "@/components/ui/ToggleStatusBtn";
import deleteUser from "@/components/actions/DeleteUser";
import { getAuthUser } from "@/app/lib/auth";
import { Plus, Users, Shield, Mail, UserCheck, UserX, Edit } from "lucide-react";
import { UsersTableWrapper } from "@/components/admin/UsersTable";

export const runtime = "nodejs";

async function UsersPage() {
  const data = await prisma.users.findMany();

  // Get current logged-in user to check if they're an admin
  const currentUser = await getAuthUser();
  const isAdmin = currentUser?.role === 'admin';

  const getRoleBadge = (role: string | null) => {
    if (role === 'admin') {
      return 'bg-purple-100 text-purple-700 border-purple-200';
    }
    return 'bg-blue-100 text-blue-700 border-blue-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Users & Roles</h1>
              <p className="text-slate-500 font-medium mt-1">Manage user accounts and permissions</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-500">Total Users</span>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-black text-slate-900">{data.length}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-500">Admin</span>
              <Shield className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl font-black text-slate-900">
              {data.filter(u => u.role === 'admin').length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-500">Active</span>
              <UserCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-3xl font-black text-slate-900">
              {data.filter(u => u.is_active).length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-500">Inactive</span>
              <UserX className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-3xl font-black text-slate-900">
              {data.filter(u => !u.is_active).length}
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

          {/* Action Bar */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900">All Users</h2>
              <p className="text-sm text-slate-500 mt-0.5">Manage team members and their roles</p>
            </div>
            <Link href="/AdminPanel/users/create">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white hover:shadow-xl hover:shadow-blue-300 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add User
              </button>
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                    Sr. No.
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-black text-slate-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-black text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-black text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <UsersTableWrapper users={data} isAdmin={isAdmin} />
            </table>
          </div>

          {/* Empty State */}
          {data.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">No users found</h3>
              <p className="text-slate-500 text-sm mb-6">Get started by adding your first team member.</p>
              <Link href="/AdminPanel/users/create">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white hover:shadow-xl transition-all inline-flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add First User
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
