import React, { useState } from 'react';

function Notes({ searchQuery }) {
  const [notes, setNotes] = useState([
    {
      id: 1, title: 'Architecture Blueprint & FastAPI Integration', snippet: 'System Architecture ProjectFlow combines the responsiveness of modern React with the reliability of a Python FastAPI + SQLite backend.', content: `### System Architecture

ProjectFlow combines the responsiveness of modern React with the reliability of a Python FastAPI + SQLite backend.

#### Key Highlights:
- **FastAPI Core**: Asynchronous REST endpoints with Pydantic validation and auto-generated Swagger documentation at \`/docs\`.
- **SQLite Engine**: Zero-configuration, file-based persistence at \`craftflow.db\` with relational integrity (cascade deletes on foreign keys).
- **Dual-Engine Client**: Seamless operation in browser storage when running standalone, and instant sync when FastAPI is booted at \`http://localhost:8000\`.

\`\`\`python
# Run local FastAPI server anytime:
uvicorn craftflow:app --reload
\`\`\`
`, pinned: true, lastEdited: 'Oct 12'
    },
    { id: 2, title: 'Workspace UX Checklist & Best Practices', snippet: 'Craft / Notion Inspired Principles: 1. Focus First: Collapse sidebars when... ', content: 'Workspace UX Checklist and best practices for ProjectFlow.', pinned: false, lastEdited: 'Oct 10' },
  ]);

  const [selectedNoteId, setSelectedNoteId] = useState(1);

  const selectedNote = notes.find(n => n.id === selectedNoteId);

  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-5rem)]">
      {/* Notes List */}
      <div className="w-full lg:w-1/3 border-r border-gray-800 bg-gray-900 overflow-y-auto">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-sm font-medium text-gray-400 uppercase">All Notes</h2>
          <span className="text-xs text-gray-600 ml-auto">{notes.length}</span>
        </div>
        <div className="divide-y divide-gray-800">
          {notes.map(note => (
            <button
              key={note.id}
              onClick={() => setSelectedNoteId(note.id)}
              className={`w-full p-4 text-left hover:bg-gray-800 transition-colors ${selectedNoteId === note.id ? 'bg-gray-800' : ''
                }`}
            >
              <div className="flex items-start gap-2 mb-1">
                <span className="text-lg">📄</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-200 truncate">{note.title}</p>
                  <p className="text-xs text-gray-500 truncate">{note.snippet}</p>
                </div>
                {note.pinned && (
                  <span className="ml-auto text-yellow-500 text-sm">📌</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1 p-6 overflow-y-auto">
        {selectedNote ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-400">MARKDOWN NOTE</span>
                <span className="text-xs text-gray-600">Edited {selectedNote.lastEdited}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors">
                  ✏️ Edit
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors">
                  👁️ Preview
                </button>
                <button className="text-yellow-500 hover:text-yellow-400 text-sm">📌</button>
                <button className="text-gray-500 hover:text-gray-400 text-sm">🗑</button>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-6">{selectedNote.title}</h1>
            <div className="prose prose-invert max-w-none">
              {selectedNote.content.split('\n').map((line, i) => {
                if (line.startsWith('### ')) {
                  return <h2 key={i} className="text-xl font-semibold text-white mt-6 mb-3">{line.replace('### ', '')}</h2>;
                }
                if (line.startsWith('#### ')) {
                  return <h3 key={i} className="text-lg font-semibold text-white mt-5 mb-2">{line.replace('#### ', '')}</h3>;
                }
                if (line.startsWith('- **')) {
                  return <li key={i} className="ml-6 mb-2 text-gray-300">{line}</li>;
                }
                if (line.trim() === '') {
                  return <br key={i} />;
                }
                if (line.startsWith('`')) {
                  return <p key={i} className="text-gray-400">{line}</p>;
                }
                return <p key={i} className="text-gray-300 mb-2">{line}</p>;
              })}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                {selectedNote.content.split(/\s+/).filter(w => w.length > 0).length} words
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Created Oct 12</span>
                <span>•</span>
                <span>Last edited Oct 12</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a note to view
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;