import { FileTextIcon, PinIcon } from "./icons"
export default function NoteOverview({ note }) {
    return (
        <div key={note.id} className="p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-lg"><FileTextIcon className="text-gray-500 size-6 shrink-0" /></span>
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-200 truncate">{note.title}</p>
                        <p className="text-xs text-gray-500 truncate">{note.snippet}</p>
                    </div>
                </div>
                {note.pinned && (
                    <span className="text-sm"><PinIcon className="text-gray-500 size-4 shrink-0" /></span>
                )}
            </div>

        </div>
    )
}