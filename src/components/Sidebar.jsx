import { useNavigate } from 'react-router-dom';

export default function Sidebar({ activeTab, onSelectTab, projects, selectedProjectId, onSelectProject }) {
  const navigate = useNavigate();
  const selectedProject = projects.find(project => project.id === selectedProjectId);
  const workspaceItems = [
    { id: 'overview', label: 'Overview', icon: 'grid', path: '/' },
    { id: 'todos', label: 'Todos', icon: 'list', badge: selectedProject?.tasks.length ?? 0, path: '/todos' },
    { id: 'notes', label: 'Notes', icon: 'file-text', badge: selectedProject?.notes.length ?? 0, path: '/notes' },
    { id: 'links', label: 'Links', icon: 'bookmark', badge: selectedProject?.links.length ?? 0, path: '/links' },
  ];

  return (
    <aside className="w-64 flex flex-col border-r border-gray-800 bg-gray-900">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">⚡</span>
          </div>
          <div>
            <h1 className="font-semibold text-white">ProjectFlow</h1>
            <p className="text-xs text-gray-500">PROJECT WORKSPACE</p>
          </div>
        </div>
        <button className="mt-3 p-1 text-gray-500 hover:text-gray-300">
          <span className="text-2xl">+</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <p className="text-xs font-medium text-gray-500 uppercase mb-2">
            WORKSPACE
          </p>
          <nav className="space-y-1">
            {workspaceItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  navigate(item.path);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
                {item.badge !== undefined && (
                  <span className="ml-auto text-xs bg-gray-700 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-3 border-t border-gray-800">
          <p className="text-xs font-medium text-gray-500 uppercase mb-2">
            PROJECTS
          </p>
          <nav className="space-y-1">
            {projects.map(project => (
              <button
                key={project.id}
                onClick={() => {
                  onSelectProject(project.id);
                  navigate('/');
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${selectedProjectId === project.id
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
              >
                <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs">
                  {project.icon}
                </span>
                <span className="text-sm font-medium truncate">{project.label}</span>
                {selectedProjectId === project.id && (
                  <span className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-3 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-sm font-medium">Local workspace</span>
              <span className="text-xs text-gray-600">Changes saved in browser</span>
            </div>
            <span className="text-xs text-gray-600">⚙️</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
