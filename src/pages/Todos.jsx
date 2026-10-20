import { useState } from 'react';
import AddButton from '../components/AddButton';
import Todo from '../components/Todo';

export default function Todos({ project, searchQuery, onAddTask, onEditTask, onDeleteTask, onUpdateTaskStatus }) {
  const tasks = (project.tasks || []).map(task => ({
    ...task,
    description: task.description || '',
    priority: task.priority || 'MEDIUM',
    tags: task.tags || [],
    date: task.date || '',
    completed: task.completed ?? task.status === 'done',
    status: task.status || (task.completed ? 'done' : 'todo'),
  }));
  const handleDrop = (event, status) => {
    event.preventDefault();
    const taskId = Number(event.dataTransfer.getData('text/plain'));
    if (!Number.isNaN(taskId)) onUpdateTaskStatus(taskId, status);
  };
  const [filter, setFilter] = useState('all');
  const taskTags = [...new Set(tasks.flatMap(task => task.tags))];
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const filteredTasks = tasks.filter(task =>
    (filter === 'all' || task.tags.includes(filter)) &&
    (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Todos</h1>
        <p className="text-gray-400">
          Everything captured for {project.label}. Keep your work moving with a focused, calm workspace.
        </p>
      </div>

      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">Project progress</span>
          <span className="text-sm text-gray-400">{completedTasks}/{tasks.length}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="text-sm text-gray-400 w-12 text-right">{progress}%</span>
        </div>
      </div>

      <div className="flex justify-start">
        <AddButton icon="+" label="Add task" onClick={onAddTask} />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
        >
          All tasks {tasks.length}
        </button>
        {taskTags.map(tag => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === tag
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
          >
            {tag} {tasks.filter(task => task.tags.includes(tag)).length}
          </button>
        ))}
      </div>

      {tasks.length ? (
        <div className="flex gap-4">
          {/* To Do Column */}
          <div
            className="flex-1 min-w-62.5 bg-gray-800 rounded-xl p-4 border border-gray-700"
            onDragOver={event => event.preventDefault()}
            onDrop={event => handleDrop(event, 'todo')}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-400">To do <span className="ml-1 px-1.5 py-0.5 bg-gray-700 text-gray-400 text-xs rounded">{tasks.filter(t => t.status === 'todo').length}</span></span>
              <button className="text-gray-500 hover:text-gray-400">
                <span className="text-lg">⏮</span>
              </button>
            </div>
            <div className="space-y-3">
              {filteredTasks.filter(task => task.status === 'todo').map(task => (
                <Todo
                  key={task.id}
                  task={task}
                  draggable={true}
                  onDragStart={event => event.dataTransfer.setData('text/plain', String(task.id))}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div
            className="flex-1 min-w-62.5 bg-gray-800 rounded-xl p-4 border border-gray-700"
            onDragOver={event => event.preventDefault()}
            onDrop={event => handleDrop(event, 'in-progress')}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-400">In progress <span className="ml-1 px-1.5 py-0.5 bg-gray-700 text-gray-400 text-xs rounded">{tasks.filter(t => t.status === 'in-progress').length}</span></span>
              <button className="text-gray-500 hover:text-gray-400">
                <span className="text-lg">⏮</span>
              </button>
            </div>
            <div className="space-y-3">
              {filteredTasks.filter(task => task.status === 'in-progress').map(task => (
                <Todo
                  key={task.id}
                  task={task}
                  draggable={true}
                  onDragStart={event => event.dataTransfer.setData('text/plain', String(task.id))}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          </div>

          {/* Done Column */}
          <div
            className="flex-1 min-w-62.5 bg-gray-800 rounded-xl p-4 border border-gray-700"
            onDragOver={event => event.preventDefault()}
            onDrop={event => handleDrop(event, 'done')}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-400">Done <span className="ml-1 px-1.5 py-0.5 bg-gray-700 text-gray-400 text-xs rounded">{tasks.filter(t => t.status === 'done').length}</span></span>
              <button className="text-gray-500 hover:text-gray-400">
                <span className="text-lg">⏮</span>
              </button>
            </div>
            <div className="space-y-3">
              {filteredTasks.filter(task => task.status === 'done').map(task => (
                <Todo
                  key={task.id}
                  task={task}
                  draggable={true}
                  onDragStart={event => event.dataTransfer.setData('text/plain', String(task.id))}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No tasks for {project.label} yet.</p>
      )}
    </div>
  );
}
