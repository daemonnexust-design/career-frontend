
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';

interface ActivityLog {
    id: string;
    type: 'upload' | 'assessment' | 'email';
    title: string;
    timestamp: string;
}

export default function ActivityFeed() {
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // 1. Fetch AI Assessments (Audit Logs)
            const { data: aiLogs } = await supabase
                .from('ai_audit_logs')
                .select('id, timestamp, action_type')
                .eq('user_id', user.id)
                .order('timestamp', { ascending: false })
                .limit(5);

            // 2. Fetch CV Uploads
            const { data: cvLogs } = await supabase
                .from('user_cvs')
                .select('id, uploaded_at, original_filename')
                .eq('user_id', user.id)
                .order('uploaded_at', { ascending: false })
                .limit(5);

            // 3. Normalize & Merge
            const normalizedActivities: ActivityLog[] = [];

            if (aiLogs) {
                aiLogs.forEach(log => {
                    normalizedActivities.push({
                        id: log.id,
                        type: 'assessment',
                        title: 'AI Personal Assessment',
                        timestamp: log.timestamp
                    });
                });
            }

            if (cvLogs) {
                cvLogs.forEach(cv => {
                    normalizedActivities.push({
                        id: cv.id,
                        type: 'upload',
                        title: `Uploaded CV: ${cv.original_filename}`,
                        timestamp: cv.uploaded_at
                    });
                });
            }

            // 4. Sort & Slice
            const sorted = normalizedActivities
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .slice(0, 5);

            setActivities(sorted);

        } catch (error) {
            console.error('Error fetching activity:', error);
        } finally {
            setLoading(false);
        }
    };

    const getIconForType = (type: string) => {
        switch (type) {
            case 'upload': return { icon: 'ri-file-upload-line', color: 'text-teal-600', bg: 'bg-teal-50' };
            case 'assessment': return { icon: 'ri-sparkling-fill', color: 'text-purple-600', bg: 'bg-purple-50' };
            case 'email': return { icon: 'ri-mail-send-fill', color: 'text-blue-600', bg: 'bg-blue-50' };
            default: return { icon: 'ri-flashlight-line', color: 'text-slate-600', bg: 'bg-slate-50' };
        }
    };

    if (loading) return <div className="h-48 flex items-center justify-center"><div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
            </div>

            <div className="space-y-6">
                {activities.length === 0 ? (
                    <p className="text-slate-500 text-sm text-center py-4">No recent activity</p>
                ) : (
                    activities.map((activity, index) => {
                        const style = getIconForType(activity.type);
                        return (
                            <div key={activity.id} className="flex gap-4 group">
                                <div className="flex flex-col items-center">
                                    <div className={`w-10 h-10 ${style.bg} ${style.color} rounded-full flex items-center justify-center shadow-sm z-10 group-hover:scale-110 transition-transform`}>
                                        <i className={style.icon}></i>
                                    </div>
                                    {index !== activities.length - 1 && (
                                        <div className="w-0.5 flex-1 bg-slate-100 my-2"></div>
                                    )}
                                </div>
                                <div className="flex-1 pb-1">
                                    <h4 className="text-sm font-semibold text-slate-900">{activity.title}</h4>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        {new Date(activity.timestamp).toLocaleDateString()} • {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
