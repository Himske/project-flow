import { useEffect, useState } from 'react';

const typeLabels = {
    link: 'link',
    task: 'task',
    note: 'note',
};

const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
};

const getDateInputValue = value => {
    if (!value) return getTomorrowDate();
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

    const legacyDate = value.match(/^([A-Za-z]+)\s+(\d{1,2})$/);
    const date = legacyDate
        ? new Date(`${legacyDate[1]} ${legacyDate[2]}, ${new Date().getFullYear()}`)
        : new Date(value);

    if (Number.isNaN(date.getTime())) return getTomorrowDate();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export default function ItemModal({ type, item, onClose, onSave }) {
    const isEditing = Boolean(item);
    const [title, setTitle] = useState(item?.title || '');
    const [description, setDescription] = useState(
        item?.description || item?.content || item?.snippet || ''
    );
    const [url, setUrl] = useState(item?.url || '');
    const [category, setCategory] = useState(item?.category || '');
    const [tags, setTags] = useState((item?.tags || []).join(', '));
    const [priority, setPriority] = useState(item?.priority || 'MEDIUM');
    const [status, setStatus] = useState(
        item?.status || (item?.completed ? 'done' : 'todo')
    );
    const [date, setDate] = useState(() => getDateInputValue(item?.date));

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleSubmit = event => {
        event.preventDefault();
        const itemData = { title: title.trim() };
        const itemTags = tags.split(',').map(tag => tag.trim()).filter(Boolean);

        if (type === 'link') {
            onSave({
                ...itemData,
                url: url.trim(),
                description: description.trim(),
                category: category.trim(),
                tags: itemTags,
            });
        } else if (type === 'task') {
            onSave({
                ...itemData,
                description: description.trim(),
                tags: itemTags,
                priority,
                status,
                completed: status === 'done',
                date: date || getTomorrowDate(),
            });
        } else {
            const content = description.trim();
            onSave({
                ...itemData,
                content,
                snippet: content,
                pinned: item?.pinned || false,
                lastEdited: isEditing ? 'just now' : undefined,
            });
        }
    };

    const fieldClass = 'w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';
    const labelClass = 'mb-1 block text-xs font-medium text-gray-400';
    const label = typeLabels[type] || 'item';

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
                aria-labelledby="item-modal-title"
                className="w-full max-w-lg rounded-lg border border-gray-700 bg-gray-800 p-5 shadow-2xl"
            >
                <div className="mb-5 flex items-center justify-between">
                    <h2 id="item-modal-title" className="text-lg font-semibold text-white">
                        {isEditing ? 'Edit' : 'Add'} {label}
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
                        <span className={labelClass}>Title</span>
                        <input
                            autoFocus
                            required
                            value={title}
                            onChange={event => setTitle(event.target.value)}
                            className={fieldClass}
                            placeholder={`${label[0].toUpperCase()}${label.slice(1)} title`}
                        />
                    </label>

                    {type === 'link' && (
                        <>
                            <label className="block">
                                <span className={labelClass}>URL</span>
                                <input
                                    type="url"
                                    required
                                    value={url}
                                    onChange={event => setUrl(event.target.value)}
                                    className={fieldClass}
                                    placeholder="https://example.com"
                                />
                            </label>
                            <label className="block">
                                <span className={labelClass}>Category</span>
                                <input
                                    value={category}
                                    onChange={event => setCategory(event.target.value)}
                                    className={fieldClass}
                                    placeholder="Design, Docs, Tools..."
                                />
                            </label>
                        </>
                    )}

                    {(type === 'link' || type === 'task' || (type === 'note' && isEditing)) && (
                        <label className="block">
                            <span className={labelClass}>{type === 'note' ? 'Content' : 'Description'}</span>
                            <textarea
                                rows={4}
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                                className={`${fieldClass} resize-y`}
                                placeholder={type === 'note' ? 'Write your note...' : 'Add details...'}
                            />
                        </label>
                    )}

                    {type !== 'note' && (
                        <label className="block">
                            <span className={labelClass}>Tags</span>
                            <input
                                value={tags}
                                onChange={event => setTags(event.target.value)}
                                className={fieldClass}
                                placeholder="Separate tags with commas"
                            />
                        </label>
                    )}

                    {type === 'task' && (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <label className="block">
                                <span className={labelClass}>Priority</span>
                                <select value={priority} onChange={event => setPriority(event.target.value)} className={fieldClass}>
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                    <option value="URGENT">Urgent</option>
                                </select>
                            </label>
                            <label className="block">
                                <span className={labelClass}>Status</span>
                                <select value={status} onChange={event => setStatus(event.target.value)} className={fieldClass}>
                                    <option value="todo">To do</option>
                                    <option value="in-progress">In progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </label>
                            <label className="block">
                                <span className={labelClass}>Date</span>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={event => setDate(event.target.value)}
                                    className={`${fieldClass} [color-scheme:dark]`}
                                />
                            </label>
                        </div>
                    )}

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
                            {isEditing ? 'Save changes' : `Add ${label}`}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
