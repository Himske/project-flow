import { useEffect, useRef, useState } from 'react';

export default function ConfigurationModal({ data, onClose, onImport }) {
    const fileInputRef = useRef(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const exportData = () => {
        const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = `projectflow-backup-${new Date().toISOString().slice(0, 10)}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const importData = async event => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const importedData = JSON.parse(await file.text());
            if (
                !Array.isArray(importedData.projects) ||
                importedData.projects.length === 0 ||
                importedData.projects.some(project =>
                    !project || typeof project !== 'object' || Array.isArray(project) ||
                    project.id == null || typeof project.label !== 'string'
                )
            ) {
                throw new Error('Invalid ProjectFlow backup');
            }

            onImport({
                ...importedData,
                projects: importedData.projects.map(project => ({
                    ...project,
                    tasks: Array.isArray(project.tasks) ? project.tasks : [],
                    notes: Array.isArray(project.notes) ? project.notes : [],
                    links: Array.isArray(project.links) ? project.links : [],
                })),
            });
            onClose();
        } catch {
            setError('Could not import this file. Choose a valid ProjectFlow JSON backup.');
        } finally {
            event.target.value = '';
        }
    };

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
                aria-labelledby="configuration-modal-title"
                className="w-full max-w-md rounded-lg border border-gray-700 bg-gray-800 p-5 shadow-2xl"
            >
                <div className="mb-5 flex items-center justify-between">
                    <h2 id="configuration-modal-title" className="text-lg font-semibold text-white">
                        Local workspace
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

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,application/json"
                    onChange={importData}
                    className="sr-only"
                    tabIndex={-1}
                />
                <div className="flex justify-end gap-2 border-t border-gray-700 pt-4">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-md border border-gray-600 px-3 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700"
                    >
                        Import JSON
                    </button>
                    <button
                        type="button"
                        onClick={exportData}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                    >
                        Export JSON
                    </button>
                </div>
                {error && <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>}
            </section>
        </div>
    );
}