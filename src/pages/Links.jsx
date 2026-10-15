import { useState } from 'react';
import AddButton from '../components/AddButton';
import Link from '../components/Link';

export default function Links({ project }) {
  const [filter, setFilter] = useState('all');
  const links = project.links || [];
  const categories = [...new Set(links.map(link => link.category).filter(Boolean))];

  const filteredLinks = filter === 'all'
    ? links
    : links.filter(l => l.category.toLowerCase() === filter.toLowerCase());

  // const getCategoryIcon = (category) => {
  //   const icons = { Design: '🎨', Tools: '🔧', Docs: '📄' };
  //   return icons[category] || '🔗';
  // };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Links</h1>
        <p className="text-gray-400">
          Everything captured for {project.label}. Keep your work moving with a focused, calm workspace.
        </p>
      </div>

      <div className="flex items-center justify-end">
        <AddButton icon="+" label="Add link" />
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
        {categories.map(cat => (
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
          <Link key={link.id} link={link} />
        ))}
      </div>
      {!filteredLinks.length && <p className="text-sm text-gray-500">No links for this project yet.</p>}
    </div>
  );
}
