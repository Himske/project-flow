import { FileTextIcon, PinIcon } from "./icons"

export default function Note({ note, isSelected, onSelect }) {
    return (
        <button
            onClick={onSelect}
            className={`w-full p-4 text-left hover:bg-gray-800 transition-colors ${isSelected ? 'bg-gray-800' : ''
                }`}
        >
            <div className="flex items-start gap-2 mb-1">
                <span className="text-lg">
                    <FileTextIcon className="text-gray-500 size-6 shrink-0" />
                </span>
                <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-200 truncate">{note.title}</p>
                    <p className="text-xs text-gray-500 truncate">{note.snippet}</p>
                </div>
                {note.pinned && (
                    <span className="ml-auto text-yellow-400 text-sm">
                        <PinIcon className="size-4 shrink-0" />
                    </span>
                )}
            </div>
        </button>
    )
}