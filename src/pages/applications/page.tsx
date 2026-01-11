import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/feature/Layout';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

interface Application {
    id: string;
    company_name: string;
    status: string;
    created_at: string;
}

export default function ApplicationsPage() {
    const { user } = useAuth();
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchApplications();
        }
    }, [user]);

    const fetchApplications = async () => {
        try {
            const { data, error } = await supabase
                .from('applications')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setApplications(data || []);
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'applied': return 'bg-blue-100 text-blue-700';
            case 'interviewed': return 'bg-purple-100 text-purple-700';
            case 'rejected': return 'bg-red-100 text-red-700';
            case 'offer': return 'bg-emerald-100 text-emerald-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>
                            <p className="text-slate-600 mt-1">Track and manage your job search progress</p>
                        </div>
                        <Link
                            to="/application/new"
                            className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/20 transition-all flex items-center gap-2"
                        >
                            <i className="ri-add-line"></i>
                            New Application
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : applications.length > 0 ? (
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Company</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Date Added</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {applications.map((app) => (
                                        <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900">{app.company_name}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(app.status)}`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {new Date(app.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
                                                    <i className="ri-more-2-line"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-16 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="ri-folder-open-line text-4xl text-slate-300"></i>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No applications yet</h3>
                            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                                You haven't added any applications. Start by clicking the button above to create your first one.
                            </p>
                            <Link
                                to="/application/new"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all"
                            >
                                <i className="ri-rocket-2-line"></i>
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
