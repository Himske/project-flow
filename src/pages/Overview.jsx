import { useState } from 'react';
import AddButton from '../components/AddButton';
import ProgressBar from '../components/ProgressBar';

export default function Overview({ project, searchQuery }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Add Markdown formatting preview for project docs', tags: ['Notes', 'Markdown'], date: 'Oct 16', completed: false },
    { id: 2, title: 'Implement drag-and-drop or status toggle for board view', tags: ['Frontend', 'UI/UX'], date: 'Oct 14', completed: false },
  ]);

  const [notes] = useState([
    { id: 1, title: 'Architecture Blueprint & FastAPI Integration', snippet: 'System Architecture ProjectFlow combines the responsiveness of...', pinned: true },
    { id: 2, title: 'Workspace UX Checklist & Best Practices', snippet: 'Craft / Notion Inspired Principles: 1. Focus First: Collapse sidebars when...', pinned: false },
  ]);

  const [links] = useState([
    { id: 1, title: 'Tailwind CSS Modern Color Palette', url: 'tailwindcss.com', description: 'Slate, Zinc, Indigo, and Violet color scales for crafting refined dark mode UIs.', category: 'Design', tags: ['Tailwind', 'CSS'] },
    { id: 2, title: 'Lucide Icons Directory', url: 'lucide.dev', description: 'Clean, consistent open-source iconography for dashboard and productivity tool actions.', category: 'Tools', tags: ['Icons', 'UI'] },
    { id: 3, title: 'SQLAlchemy 2.0 Unified Documentation', url: 'docs.sqlalchemy.org', description: 'Modern ORM mapping, relationship mechanics, and SQLite connection pool configuration.', category: 'Docs', tags: ['SQLite', 'SQLAlchemy'] },
    { id: 4, title: 'FastAPI Official Documentation & Tutorial', url: 'fastapi.tiangolo.com', description: 'Interactive API reference, dependency injection guides, and SQL databases tutorial with SQLAlchemy.', category: 'Docs', tags: ['FastAPI', 'Python'] },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{project}</h1>
        <p className="text-gray-400 text-sm">
          Personal productivity workspace with FastAPI backend, SQLite persistence, and high-performance React UI.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded">
            IN PROGRESS
          </span>
          <span className="text-xs text-gray-500">Updated Oct 12</span>
        </div>
        <AddButton icon="+" label="New Project" />
      </div>

      {/* Momentum */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Your Next Moves */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Your next moves</h2>
            <button className="text-sm text-blue-400 hover:text-blue-300">
              View all ↗
            </button>
          </div>
          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
                <input
                  type="checkbox"
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
            ))}
          </div>
        </div>

        {/* Project Pulse */}
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <h2 className="text-sm font-medium text-gray-400 mb-4">PROJECT PULSE</h2>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-24 h-24 mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * 50) / 100}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">50%</span>
              </div>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-sm text-gray-400"><span className="text-white font-medium">2</span> completed</p>
              <p className="text-sm text-gray-400"><span className="text-white font-medium">1</span> in progress</p>
              <p className="text-sm text-gray-400"><span className="text-white font-medium">1</span> to do</p>
            </div>
            <ProgressBar percentage={50} />
          </div>
        </div>
      </div>

      {/* Recent Notes */}
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-gray-400">RECENT NOTES</h2>
          <button className="text-sm text-blue-400 hover:text-blue-300">
            ↗
          </button>
        </div>
        <h3 className="text-lg font-semibold text-white mb-3">Knowledge base</h3>
        <div className="space-y-3">
          {notes.map(note => (
            <div key={note.id} className="p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📄</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-200 truncate">{note.title}</p>
                    <p className="text-xs text-gray-500 truncate">{note.snippet}</p>
                  </div>
                </div>
                {note.pinned && (
                  <span className="text-yellow-500 text-sm">📌</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Link Library */}
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-gray-400">LINK LIBRARY</h2>
          <button className="text-sm text-blue-400 hover:text-blue-300">
            ↗
          </button>
        </div>
        <h3 className="text-lg font-semibold text-white mb-3">Saved references</h3>
        <div className="space-y-3">
          {links.map(link => (
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
                <button className="text-gray-500 hover:text-gray-300">
                  ↗
                </button>
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
          ))}
        </div>
      </div>
    </div>
  );
}
