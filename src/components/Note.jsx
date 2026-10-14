export default function Note({ note }) {
    return (
        <button
            key={note.id}
            onClick={() => setSelectedNoteId(note.id)}
            className={`w-full p-4 text-left hover:bg-gray-800 transition-colors ${selectedNoteId === note.id ? 'bg-gray-800' : ''
                }`}
        >
            <div className="flex items-start gap-2 mb-1">
                <span className="text-lg">📄</span>
                <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-200 truncate">{note.title}</p>
                    <p className="text-xs text-gray-500 truncate">{note.snippet}</p>
                </div>
                {note.pinned && (
                    <span className="ml-auto text-yellow-500 text-sm">📌</span>
                )}
            </div>
        </button>
    )
}