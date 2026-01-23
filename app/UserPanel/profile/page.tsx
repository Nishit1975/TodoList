import React from 'react';
import Link from 'next/link';
import {
  User,
  Mail,
  Shield,
  Calendar,
  CheckCircle2,
  Folder,
  CheckSquare,
} from 'lucide-react';
import { getAuthUser } from '@/app/lib/auth';
import ProfileEditForm from '@/components/ui/ProfileEditForm';

export default async function ProfilePage() {
  const user = await getAuthUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 font-medium">Please login to view your profile</p>
        </div>
      </div>
    );
  }

  // Mock stats - in production, fetch from API
  const stats = {
    totalTasks: 12,
    completedTasks: 8,
    activeProjects: 3,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">My Profile</h1>
              <p className="text-slate-500 font-medium mt-1">Manage your account information</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white shadow-lg">
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-black shadow-xl">
                    {user.username.substring(0, 2).toUpperCase()}
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-black text-slate-900 mb-1">{user.username}</h2>
                  <p className="text-sm text-slate-500 mb-3">{user.email}</p>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black border-2 ${user.role === 'admin'
                      ? 'bg-purple-100 text-purple-700 border-purple-200'
                      : 'bg-blue-100 text-blue-700 border-blue-200'
                    }`}>
                    <Shield className="w-3.5 h-3.5" />
                    {user.role === 'admin' ? 'Administrator' : 'User'}
                  </span>
                </div>

                {/* Account Info */}
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-600 justify-center">
                    <Calendar className="w-4 h-4" />
                    <span>Member since 2026</span>
                  </div>
                </div>

                {/* Settings Link */}
                <div className="mt-6">
                  <Link
                    href="/UserPanel/settings"
                    className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-white hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Account Settings
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <CheckSquare className="w-5 h-5 text-teal-600" />
                    <span className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                      {stats.totalTasks}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">Total Tasks</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                      {stats.completedTasks}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">Completed</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Folder className="w-5 h-5 text-violet-600" />
                    <span className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                      {stats.activeProjects}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">Projects</p>
                </div>
              </div>
            </div>

            {/* Profile Information Form */}
            <ProfileEditForm
              username={user.username}
              email={user.email}
              role={user.role}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
