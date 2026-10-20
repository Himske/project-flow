import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { PinIcon, TrashIcon } from '../components/icons';
import AddButton from '../components/AddButton';
import Note from '../components/Note';

export default function Notes({ project, onAddNote, onDeleteNote, onUpdateNote, onTogglePin }) {
  const notes = project.notes || [];
  const [selectedNoteId, setSelectedNoteId] = useState(notes[0]?.id ?? null);
  const [viewMode, setViewMode] = useState('preview');
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
          <AddButton icon="+" label="Add note" onClick={onAddNote} />
        </div>
        <div className="divide-y divide-gray-800">
          {notes.map(note => (
            <Note
              key={note.id}
              note={note}
              isSelected={selectedNoteId === note.id}
              onSelect={() => {
                setSelectedNoteId(note.id);
                setViewMode('preview');
              }}
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
                <button
                  type="button"
                  aria-pressed={viewMode === 'edit'}
                  onClick={() => setViewMode('edit')}
                  className={`px-3 py-1.5 rounded-l-md text-sm transition-colors ${viewMode === 'edit' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  Edit
                </button>
                <button
                  type="button"
                  aria-pressed={viewMode === 'preview'}
                  onClick={() => setViewMode('preview')}
                  className={`-ml-2 px-3 py-1.5 rounded-r-md text-sm transition-colors ${viewMode === 'preview' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  Preview
                </button>
                <button
                  type="button"
                  aria-label={selectedNote.pinned ? `Unpin ${selectedNote.title}` : `Pin ${selectedNote.title}`}
                  aria-pressed={Boolean(selectedNote.pinned)}
                  onClick={() => onTogglePin?.(selectedNote.id)}
                  className={`transition-colors ${selectedNote.pinned ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <PinIcon className="size-5 shrink-0" />
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteNote?.(selectedNote)}
                  aria-label={`Delete ${selectedNote.title}`}
                  className="text-gray-500 transition-colors hover:text-red-400"
                >
                  <TrashIcon className="size-5 shrink-0" />
                </button>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-6">{selectedNote.title}</h1>
            {viewMode === 'edit' ? (
              <div data-color-mode="dark">
                <MDEditor
                  aria-label={`Edit ${selectedNote.title}`}
                  value={noteContent}
                  onChange={value => onUpdateNote?.(selectedNote.id, value || '')}
                  preview="edit"
                  height={320}
                />
              </div>
            ) : (
              <div data-color-mode="dark">
                <MDEditor.Markdown source={noteContent} />
              </div>
            )}
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
