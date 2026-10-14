import React, { useState } from 'react';

function Links({ searchQuery }) {
  const [filter, setFilter] = useState('all');

  const links = [
    { id: 1, title: 'Tailwind CSS Modern Color Palette', url: 'tailwindcss.com', description: 'Slate, Zinc, Indigo, and Violet color scales for crafting refined dark mode UIs.', category: 'Design', tags: ['Tailwind', 'CSS'] },
    { id: 2, title: 'Lucide Icons Directory', url: 'lucide.dev', description: 'Clean, consistent open-source iconography for dashboard and productivity tool actions.', category: 'Tools', tags: ['Icons', 'UI'] },
    { id: 3, title: 'SQLAlchemy 2.0 Unified Documentation', url: 'docs.sqlalchemy.org', description: 'Modern ORM mapping, relationship mechanics, and SQLite connection pool configuration.', category: 'Docs', tags: ['SQLite', 'SQLAlchemy'] },
    { id: 4, title: 'FastAPI Official Documentation & Tutorial', url: 'fastapi.tiangolo.com', description: 'Interactive API reference, dependency injection guides, and SQL databases tutorial with SQLAlchemy.', category: 'Docs', tags: ['FastAPI', 'Python'] },
  ];

  const filteredLinks = filter === 'all'
    ? links
    : links.filter(l => l.category.toLowerCase() === filter.toLowerCase());

  const getCategoryIcon = (category) => {
    const icons = { Design: '🎨', Tools: '🔧', Docs: '📄' };
    return icons[category] || '🔗';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Links</h1>
        <p className="text-gray-400">
          Everything captured for {searchQuery || 'ProjectFlow Platform'}. Keep your work moving with a focused, calm workspace.
        </p>
      </div>

      <div className="flex items-center justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
          <span className="text-lg">+</span>
          Add link
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
        >
          All links {links.length}
        </button>
        {['Design', 'Tools', 'Docs'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
          >
            {cat} {links.filter(l => l.category === cat).length}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLinks.map(link => (
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
        ))}
      </div>
    </div>
  );
}

export default Links;