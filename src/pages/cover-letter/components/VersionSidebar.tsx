interface CoverLetter {
    id: string;
    title: string;
    company_name: string;
    position: string;
    tone: string;
    version: number;
    is_favorite: boolean;
    generated_at: string;
}

interface VersionSidebarProps {
    coverLetters: CoverLetter[];
    currentId: string | null;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    onToggleFavorite: (id: string) => void;
    loading?: boolean;
}

export default function VersionSidebar({
    coverLetters,
    currentId,
    onSelect,
    onDelete,
    onToggleFavorite,
    loading = false
}: VersionSidebarProps) {
    const getToneColor = (tone: string) => {
        switch (tone) {
            case 'enthusiastic': return 'bg-orange-100 text-orange-700';
            case 'creative': return 'bg-purple-100 text-purple-700';
            default: return 'bg-blue-100 text-blue-700';
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6">
                <div className="flex items-center justify-center h-40">
                    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <i className="ri-file-copy-line text-purple-600"></i>
                    Saved Versions
                </h3>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {coverLetters.length}
                </span>
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto">
                {coverLetters.length === 0 ? (
                    <div className="p-6 text-center">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="ri-draft-line text-2xl text-slate-300"></i>
                        </div>
                        <p className="text-sm text-slate-500">No cover letters yet</p>
                        <p className="text-xs text-slate-400 mt-1">Generate your first one above</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {coverLetters.map((letter) => (
                            <div
                                key={letter.id}
                                onClick={() => onSelect(letter.id)}
                                className={`p-4 cursor-pointer transition-all hover:bg-slate-50 ${currentId === letter.id ? 'bg-purple-50 border-l-4 border-l-purple-500' : ''
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            {letter.is_favorite && (
                                                <i className="ri-star-fill text-amber-500 text-sm"></i>
                                            )}
                                            <h4 className="font-semibold text-slate-900 text-sm truncate">
                                                {letter.title || letter.company_name}
                                            </h4>
                                        </div>
                                        <p className="text-xs text-slate-500 truncate">{letter.position}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${getToneColor(letter.tone)}`}>
                                                {letter.tone}
                                            </span>
                                            <span className="text-xs text-slate-400">v{letter.version}</span>
                                            <span className="text-xs text-slate-400">{formatDate(letter.generated_at)}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onToggleFavorite(letter.id); }}
                                            className="p-1.5 text-slate-400 hover:text-amber-500 transition-colors"
                                        >
                                            <i className={letter.is_favorite ? 'ri-star-fill text-amber-500' : 'ri-star-line'}></i>
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onDelete(letter.id); }}
                                            className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <i className="ri-delete-bin-line"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
