import { useEffect, useState } from 'react';

export default function ProjectModal({ project, onClose, onSave }) {
    const isEditing = Boolean(project);
    const [name, setName] = useState(project?.label || '');
    const [description, setDescription] = useState(project?.description || '');

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleSubmit = event => {
        event.preventDefault();
        onSave({ label: name.trim(), description: description.trim() });
    };

    const fieldClass = 'w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';
    const labelClass = 'mb-1 block text-xs font-medium text-gray-400';

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onMouseDown={event => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                className="w-full max-w-lg rounded-lg border border-gray-700 bg-gray-800 p-5 shadow-2xl"
            >
                <div className="mb-5 flex items-center justify-between">
                    <h2 id="project-modal-title" className="text-lg font-semibold text-white">
                        {isEditing ? 'Edit project' : 'New project'}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="rounded px-2 py-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className={labelClass}>Project name</span>
                        <input
                            autoFocus
                            required
                            value={name}
                            onChange={event => setName(event.target.value)}
                            className={fieldClass}
                            placeholder="Project name"
                        />
                    </label>
                    <label className="block">
                        <span className={labelClass}>Description</span>
                        <textarea
                            rows={4}
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                            className={`${fieldClass} resize-y`}
                            placeholder="What is this project about?"
                        />
                    </label>
                    <div className="flex justify-end gap-2 border-t border-gray-700 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                        >
                            {isEditing ? 'Save changes' : 'Create project'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}