import React, { useState } from 'react';

function Todos({ searchQuery }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Add Markdown formatting preview for project docs', description: 'Support headers, code snippets, lists, blockquotes, and more.', priority: 'MEDIUM', tags: ['Notes', 'Markdown'], date: 'Oct 16', completed: false, status: 'todo' },
    { id: 2, title: 'Implement drag-and-drop or status toggle for board view', description: 'Ensure smooth status transitions between Todo, In progress, and Done states.', priority: 'HIGH', tags: ['Frontend', 'UI/UX'], date: 'Oct 14', completed: false, status: 'in-progress' },
    { id: 3, title: 'Create link card favicon auto-resolution with fallback', description: 'Extract domain name from URL and display crisp high-resolution icons.', priority: 'MEDIUM', tags: ['Bookmarks'], date: 'Oct 13', completed: true, status: 'done' },
    { id: 4, title: 'Setup FastAPI SQLite database migration engine', description: 'Initialize SQLAlchemy connection pool with thread safety.', priority: 'URGENT', tags: ['Backend', 'Database'], date: 'Oct 11', completed: true, status: 'done' },
  ]);

  const [newTask, setNewTask] = useState('');

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    const colors = { 'todo': 'bg-gray-700', 'in-progress': 'bg-blue-600', 'done': 'bg-green-600' };
    return colors[status] || 'bg-gray-700';
  };

  const getPriorityColor = (priority) => {
    const colors = { LOW: 'bg-gray-600', MEDIUM: 'bg-blue-500', HIGH: 'bg-orange-500', URGENT: 'bg-red-500' };
    return colors[priority] || 'bg-gray-600';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Todos</h1>
        <p className="text-gray-400">
          Everything captured for {searchQuery || 'ProjectFlow Platform'}. Keep your work moving with a focused, calm workspace.
        </p>
      </div>

      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">Project progress</span>
          <span className="text-sm text-gray-400">{tasks.filter(t => t.completed).length}/{tasks.length}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-sm text-gray-400 w-12 text-right">{Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          <span className="text-xl">+</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">All tasks {tasks.length}</span>
        {['Design', 'Frontend', 'Backend', 'Database', 'Docs'].map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-gray-800 text-gray-500 text-xs rounded">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        {/* To Do Column */}
        <div className="flex-1 min-w-[250px] bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-400">To do <span className="ml-1 px-1.5 py-0.5 bg-gray-700 text-gray-400 text-xs rounded">{tasks.filter(t => t.status === 'todo').length}</span></span>
            <button className="text-gray-500 hover:text-gray-400">
              <span className="text-lg">⏮</span>
            </button>
          </div>
          <div className="space-y-3">
            {tasks.filter(t => t.status === 'todo').map(task => (
              <div key={task.id} className="p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
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
                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${getPriorityColor(task.priority)}`}>
                    {task.priority}
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
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="flex-1 min-w-[250px] bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-400">In progress <span className="ml-1 px-1.5 py-0.5 bg-gray-700 text-gray-400 text-xs rounded">{tasks.filter(t => t.status === 'in-progress').length}</span></span>
            <button className="text-gray-500 hover:text-gray-400">
              <span className="text-lg">⏮</span>
            </button>
          </div>
          <div className="space-y-3">
            {tasks.filter(t => t.status === 'in-progress').map(task => (
              <div key={task.id} className="p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
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
                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${getPriorityColor(task.priority)}`}>
                    {task.priority}
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
            ))}
          </div>
        </div>

        {/* Done Column */}
        <div className="flex-1 min-w-[250px] bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-400">Done <span className="ml-1 px-1.5 py-0.5 bg-gray-700 text-gray-400 text-xs rounded">{tasks.filter(t => t.status === 'done').length}</span></span>
            <button className="text-gray-500 hover:text-gray-400">
              <span className="text-lg">⏮</span>
            </button>
          </div>
          <div className="space-y-3">
            {tasks.filter(t => t.status === 'done').map(task => (
              <div key={task.id} className="p-3 rounded-lg bg-gray-700/50 opacity-75">
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
                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${getPriorityColor(task.priority)}`}>
                    {task.priority}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todos;