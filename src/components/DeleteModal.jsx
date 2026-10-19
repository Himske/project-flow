import { useEffect } from 'react';

const typeLabels = {
    link: 'link',
    task: 'task',
    note: 'note',
};

export default function DeleteModal({ type, item, onClose, onConfirm }) {
    const label = typeLabels[type] || 'item';

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

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
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
                className="w-full max-w-lg rounded-lg border border-gray-700 bg-gray-800 p-5 shadow-2xl"
            >
                <div className="mb-5 flex items-center justify-between">
                    <h2 id="delete-modal-title" className="text-lg font-semibold text-white">
                        Delete {label}
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

                <p id="delete-modal-description" className="text-sm text-gray-300">
                    Are you sure you want to delete <span className="font-medium text-white">{item.title}</span>? This action cannot be undone.
                </p>

                <div className="mt-5 flex justify-end gap-2 border-t border-gray-700 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
                    >
                        Delete {label}
                    </button>
                </div>
            </section>
        </div>
    );
}