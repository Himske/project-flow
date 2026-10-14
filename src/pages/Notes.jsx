import { useState } from 'react';
import Note from '../components/Note';

export default function Notes({ project }) {
  const notes = project.notes || [];
  const [selectedNoteId, setSelectedNoteId] = useState(notes[0]?.id ?? null);
  const selectedNote = notes.find(note => note.id === selectedNoteId) || notes[0];
  const noteContent = selectedNote?.content || selectedNote?.snippet || '';

  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-5rem)]">
      {/* Notes List */}
      <div className="w-full lg:w-1/3 border-r border-gray-800 bg-gray-900 overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-medium text-gray-400 uppercase">All Notes</h2>
            <span className="text-xs text-gray-600">{notes.length}</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
            <span className="text-lg">+</span>
            Add note
          </button>
        </div>
        <div className="divide-y divide-gray-800">
          {notes.map(note => (
            <Note
              key={note.id}
              note={note}
              isSelected={selectedNoteId === note.id}
              onSelect={() => setSelectedNoteId(note.id)}
            />
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
                <span className="text-xs text-gray-600">Edited {selectedNote.lastEdited || 'recently'}</span>
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
              {noteContent.split('\n').map((line, i) => {
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
                {noteContent.split(/\s+/).filter(w => w.length > 0).length} words
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
            No notes for {project.label} yet.
          </div>
        )}
      </div>
    </div>
  );
}
