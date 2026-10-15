export default function TodoOverview({ task }) {
    return (
        <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
            <input
                type="checkbox"
                checked={task.completed}
                className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-600 text-blue-500 focus:ring-blue-500"
            />
            <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-200 truncate">{task.title}</p>
                <div className="flex items-center gap-2 mt-1">
                    {task.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-700 text-gray-400 text-xs rounded">
                            {tag}
                        </span>
                    ))}
                    <span className="text-xs text-gray-500 ml-auto">📅 {task.date}</span>
                </div>
            </div>
        </div>
    )
}