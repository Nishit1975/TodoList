"use client";

import React, { useState } from 'react';
import { User, Mail, Shield, Edit, Save, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { updateProfile } from '@/components/actions/updateProfile';

interface ProfileEditFormProps {
    username: string;
    email: string;
    role: string;
}

export default function ProfileEditForm({ username, email, role }: ProfileEditFormProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({ username, email });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const formDataToSend = new FormData();
        formDataToSend.append('username', formData.username);
        formDataToSend.append('email', formData.email);

        const result = await updateProfile(formDataToSend);

        if (result?.error) {
            setError(result.error);
        } else if (result?.success) {
            setSuccess('Profile updated successfully! Refresh the page to see changes.');
            setIsEditing(false);
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    };

    const handleCancel = () => {
        setFormData({ username, email });
        setIsEditing(false);
        setError('');
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white shadow-lg">
            {/* Success/Error Messages */}
            {success && (
                <div className="mb-4 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span className="flex-1 font-medium">{success}</span>
                </div>
            )}

            {error && (
                <div className="mb-4 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span className="flex-1 font-medium">{error}</span>
                    <button onClick={() => setError('')} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-slate-900">Profile Information</h3>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
                    >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username Field */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                        <User className="w-4 h-4 text-indigo-600" />
                        Username
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
                            required
                        />
                    ) : (
                        <div className="px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900">
                            {username}
                        </div>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                        <Mail className="w-4 h-4 text-indigo-600" />
                        Email Address
                    </label>
                    {isEditing ? (
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
                            required
                        />
                    ) : (
                        <div className="px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium text-slate-900">
                            {email}
                        </div>
                    )}
                </div>

                {/* Role Field (Read-only) */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                        <Shield className="w-4 h-4 text-indigo-600" />
                        Role
                    </label>
                    <div className="px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl font-medium text-slate-500">
                        {role === 'admin' ? 'Administrator' : 'User'} (Cannot be changed)
                    </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 transition-all flex items-center justify-center gap-2"
                        >
                            <X className="w-5 h-5" />
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-white hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            Save Changes
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
