import { useNavigate } from 'react-router-dom';

export default function Sidebar({ activeTab, onSelectTab, projects, selectedProjectId, onSelectProject }) {
  const navigate = useNavigate();
  const selectedProject = projects.find(project => project.id === selectedProjectId);
  const grid = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
    </svg>
  );
  const todosList = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
    </svg>
  );
  const fileText = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
  const bookmark = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
    </svg>
  );
  const workspaceItems = [
    { id: 'overview', label: 'Overview', icon: grid, path: '/' },
    { id: 'todos', label: 'Todos', icon: todosList, badge: selectedProject?.tasks.length ?? 0, path: '/todos' },
    { id: 'notes', label: 'Notes', icon: fileText, badge: selectedProject?.notes.length ?? 0, path: '/notes' },
    { id: 'links', label: 'Links', icon: bookmark, badge: selectedProject?.links.length ?? 0, path: '/links' },
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
