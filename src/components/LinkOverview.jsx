import { PencilIcon, TrashIcon } from "./icons";

export default function LinkOverview({ link, onEdit, onDelete }) {
    return (
        <div key={link.id} className="p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-sm font-medium text-gray-400">
                        {link.title[0]}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-200 truncate">{link.title}</p>
                        <p className="text-xs text-gray-500 truncate">{link.url}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => onEdit?.(link)}
                        aria-label={`Edit ${link.title}`}
                        className="text-gray-500 hover:text-gray-300"
                    >
                        <PencilIcon className="size-5 shrink-0" />
                    </button>
                    {onDelete && (
                        <button
                            type="button"
                            onClick={() => onDelete(link)}
                            aria-label={`Delete ${link.title}`}
                            className="text-gray-500 hover:text-red-400"
                        >
                            <TrashIcon className="size-5 shrink-0" />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between mt-2">
                <span className="px-2 py-0.5 bg-gray-700 text-gray-400 text-xs rounded">{link.category}</span>
                <div className="flex items-center gap-2">
                    {link.tags.map(tag => (
                        <span key={tag} className="text-xs text-gray-500">#{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}