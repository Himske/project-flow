export default function Link({ link }) {
    return (
        <div key={link.id} className="p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-lg font-medium text-gray-400">
                    {link.title[0]}
                </div>
                <button className="text-gray-500 hover:text-gray-300">
                    ↗
                </button>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">{link.title}</h3>
            <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 break-all"
            >
                {link.url}
            </a>
            <p className="text-sm text-gray-400 mt-2 mb-3 line-clamp-2">{link.description}</p>
            <div className="flex items-center justify-between">
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