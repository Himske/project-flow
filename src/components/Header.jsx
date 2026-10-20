export default function Header({ projectName, searchQuery, onSearch }) {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-gray-800 bg-gray-900">
      <nav className="text-sm text-gray-500">
        <span>Workspace</span>
        <span className="mx-2">/</span>
        <span className="text-gray-300">{projectName}</span>
      </nav>

      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search workspace"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-64 px-3 py-1.5 pl-9 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            🔍
          </span>
        </div>
      </div>
    </header>
  );
}
