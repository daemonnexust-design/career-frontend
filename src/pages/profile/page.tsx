import React from 'react';
import { ProfileForm } from './components/ProfileForm';
import { CVManager } from './components/CVManager';
import { EmailDraftsList } from './components/EmailDraftsList';
import { DangerZone } from './components/DangerZone';
import { Navigation } from '@/components/feature/Navigation';
import { Footer } from '@/components/feature/Footer';

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navigation />

            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>

                <div className="space-y-8 max-w-4xl mx-auto">
                    {/* Profile Information */}
                    <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
                        <ProfileForm />
                    </section>

                    {/* CV Management */}
                    <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">Curriculum Vitae</h2>
                                <p className="text-sm text-gray-500 mt-1">Manage your CV for AI generation</p>
                            </div>
                        </div>
                        <CVManager />
                    </section>

                    {/* Email Drafts */}
                    <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Generated Emails</h2>
                        <EmailDraftsList />
                    </section>

                    {/* Danger Zone */}
                    <section className="bg-red-50 rounded-xl shadow-sm p-6 border border-red-100 mt-12">
                        <h2 className="text-xl font-semibold text-red-800 mb-2">Danger Zone</h2>
                        <p className="text-sm text-red-600 mb-6">Irreversible actions regarding your account</p>
                        <DangerZone />
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
