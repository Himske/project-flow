import AddButton from '../components/AddButton';
import ProgressBar from '../components/ProgressBar';
import Todo from '../components/Todo'
import NoteOverview from '../components/NoteOverview';
import LinkOverview from '../components/LinkOverview'

export default function Overview({ project }) {
  const { tasks = [], notes = [], links = [] } = project;
  const completedTasks = tasks.filter(task => task.completed || task.status === 'done').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = tasks.filter(task => !task.completed && task.status !== 'done' && task.status !== 'in-progress').length;
  const activeTasks = tasks.filter(task => !task.completed && task.status !== 'done');
  const progress = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const status = progress == 100 ? 'COMPLETED' : progress == 0 ? 'NOT STARTED' : 'IN PROGRESS';
  const getStatusColor = (status) => {
    const colors = { 'NOT STARTED': 'bg-gray-600', 'IN PROGRESS': 'bg-blue-600', 'COMPLETED': 'bg-green-600' };
    return colors[status] || 'bg-gray-600';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{project.label}</h1>
        <p className="text-gray-400 text-sm">
          Personal productivity workspace with high-performance React UI.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 ${getStatusColor(status)} text-white text-xs font-medium rounded`}>
            {status}
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
            {activeTasks.length ? activeTasks.map(task => (
              <Todo key={task.id} task={task} />
            )) : <p className="text-sm text-gray-500">No active tasks for this project.</p>}
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
                  strokeDashoffset={283 - (283 * progress) / 100}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{progress}%</span>
              </div>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-sm text-gray-400"><span className="text-white font-medium">{completedTasks}</span> completed</p>
              <p className="text-sm text-gray-400"><span className="text-white font-medium">{inProgressTasks}</span> in progress</p>
              <p className="text-sm text-gray-400"><span className="text-white font-medium">{todoTasks}</span> to do</p>
            </div>
            <ProgressBar percentage={progress} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            {notes.length ? notes.map(note => (
              <NoteOverview key={note.id} note={note} />
            )) : <p className="text-sm text-gray-500">No notes for this project yet.</p>}
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
            {links.length ? links.map(link => (
              <LinkOverview key={link.id} link={link} />
            )) : <p className="text-sm text-gray-500">No links for this project yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
