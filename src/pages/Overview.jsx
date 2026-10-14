import { useState } from 'react';
import AddButton from '../components/AddButton';
import ProgressBar from '../components/ProgressBar';
import TodoOverview from '../components/TodoOverview'
import NoteOverview from '../components/NoteOverview';
import LinkOverview from '../components/LinkOverview'

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
            <h2 className="text-sm font-medium text-gray-400">MOMENTUM</h2>
            <button className="text-sm text-blue-400 hover:text-blue-300">
              View all ↗
            </button>
          </div>
          <h3 className="text-lg font-semibold text-white mb-3">Your next moves</h3>
          <div className="space-y-3">
            {tasks.map(task => (
              <TodoOverview task={task} />
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
            <NoteOverview note={note} />
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
            <LinkOverview link={link} />
          ))}
        </div>
      </div>
    </div>
  );
}
