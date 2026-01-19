interface WarRoomProps {
    data: {
        trojan_horse_questions: string[];
        role_specific_challenges: string[];
    };
}

export const WarRoom = ({ data }: WarRoomProps) => {
    return (
        <div className="bg-slate-900 text-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
            {/* Tactical Grid Background */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, #475569 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
                        <i className="ri-sword-line text-indigo-400 text-xl" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">Interview War Room</h2>
                        <p className="text-slate-400 text-sm">Tactical preparation for high-stakes conversations</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Trojan Horse Questions */}
                    <div>
                        <h3 className="text-indigo-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                            <i className="ri-spy-line" /> Trojan Horse Questions
                        </h3>
                        <ul className="space-y-4">
                            {data.trojan_horse_questions.map((q, i) => (
                                <li key={i} className="flex gap-3 text-sm group/item">
                                    <span className="text-indigo-500 font-mono opacity-50">0{i + 1}</span>
                                    <span className="group-hover/item:text-white transition-colors">{q}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Role Challenges */}
                    <div>
                        <h3 className="text-rose-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                            <i className="ri-shield-cross-line" /> Predicted Challenges
                        </h3>
                        <ul className="space-y-4">
                            {data.role_specific_challenges.map((c, i) => (
                                <li key={i} className="flex gap-3 text-sm group/item">
                                    <span className="text-rose-500 font-mono opacity-50">0{i + 1}</span>
                                    <span className="group-hover/item:text-white transition-colors">{c}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
