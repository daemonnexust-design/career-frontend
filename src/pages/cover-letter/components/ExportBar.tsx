interface ExportBarProps {
    onExportHtml: () => void;
    onExportTxt: () => void;
    onExportDocx: () => void;
    onPrint: () => void;
    loading?: boolean;
    disabled?: boolean;
}

export default function ExportBar({
    onExportHtml,
    onExportTxt,
    onExportDocx,
    onPrint,
    loading = false,
    disabled = false
}: ExportBarProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                    <i className="ri-download-line text-slate-600"></i>
                    <span className="text-sm font-semibold text-slate-900">Export Options</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={onExportTxt}
                        disabled={disabled || loading}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <i className="ri-file-text-line"></i>
                        TXT
                    </button>

                    <button
                        onClick={onExportHtml}
                        disabled={disabled || loading}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <i className="ri-file-code-line"></i>
                        HTML
                    </button>

                    <button
                        onClick={onExportDocx}
                        disabled={disabled || loading}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <i className="ri-file-word-line"></i>
                        DOCX
                    </button>

                    <button
                        onClick={onPrint}
                        disabled={disabled || loading}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/25 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <i className="ri-printer-line"></i>
                        Print / PDF
                    </button>
                </div>
            </div>

            {loading && (
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    Preparing export...
                </div>
            )}
        </div>
    );
}
