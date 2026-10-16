export default function Todo({ task, draggable, onDragStart }) {
    const priority = task.priority || 'MEDIUM';
    const getPriorityColor = (priority) => {
        const colors = { LOW: 'bg-gray-600', MEDIUM: 'bg-blue-500', HIGH: 'bg-orange-500', URGENT: 'bg-red-500' };
        return colors[priority] || 'bg-gray-600';
    };

    return (
        <div
            className="p-3 rounded-lg bg-gray-700/50 opacity-75"
            draggable={draggable}
            onDragStart={onDragStart}
        >
            <div className="flex items-start gap-3 mb-2">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => { }}
                    className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-600 text-blue-500 focus:ring-blue-500"
                />
                <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-200 truncate">{task.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{task.description}</p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 text-xs font-medium rounded ${getPriorityColor(priority)}`}>
                    {priority}
                </span>
                <div className="flex items-center gap-2">
                    {task.tags.map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 bg-gray-700 text-gray-400 text-xs rounded">
                            {tag}
                        </span>
                    ))}
                    <span className="text-xs text-gray-500 ml-auto">📅 {task.date}</span>
                </div>
            </div>
        </div>
    )
}