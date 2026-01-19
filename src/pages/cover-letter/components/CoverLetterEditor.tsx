import { useState, useEffect } from 'react';

interface CoverLetterEditorProps {
    content: string;
    onChange: (content: string) => void;
    onSave: () => void;
    saving?: boolean;
    title: string;
    onTitleChange: (title: string) => void;
}

export default function CoverLetterEditor({
    content,
    onChange,
    onSave,
    saving = false,
    title,
    onTitleChange
}: CoverLetterEditorProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [localContent, setLocalContent] = useState(content);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setLocalContent(content);
        setHasChanges(false);
    }, [content]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLocalContent(e.target.value);
        setHasChanges(e.target.value !== content);
    };

    const handleSave = () => {
        onChange(localContent);
        onSave();
        setHasChanges(false);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setLocalContent(content);
        setHasChanges(false);
        setIsEditing(false);
    };

    const wordCount = localContent.trim().split(/\s+/).filter(Boolean).length;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                        <i className="ri-quill-pen-line text-xl text-white"></i>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                            className="text-lg font-semibold text-slate-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                            placeholder="Cover Letter Title"
                        />
                        <p className="text-xs text-slate-500">{wordCount} words</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving || !hasChanges}
                                className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Saving
                                    </>
                                ) : (
                                    <>
                                        <i className="ri-check-line"></i>
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <i className="ri-edit-line"></i>
                            Edit
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {isEditing ? (
                    <textarea
                        value={localContent}
                        onChange={handleContentChange}
                        className="w-full min-h-[400px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all resize-none font-serif text-slate-800 leading-relaxed"
                        placeholder="Your cover letter content..."
                    />
                ) : (
                    <div className="prose prose-slate max-w-none">
                        <div className="whitespace-pre-wrap font-serif text-slate-800 leading-relaxed p-4 bg-slate-50 rounded-xl border border-slate-100 min-h-[400px]">
                            {localContent || <span className="text-slate-400 italic">No content yet. Generate a cover letter to get started.</span>}
                        </div>
                    </div>
                )}
            </div>

            {/* Status Bar */}
            {hasChanges && (
                <div className="px-6 py-3 bg-amber-50 border-t border-amber-100 flex items-center gap-2">
                    <i className="ri-information-line text-amber-600"></i>
                    <span className="text-sm text-amber-800">You have unsaved changes</span>
                </div>
            )}
        </div>
    );
}
