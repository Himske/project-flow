import React from 'react';

function AddButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}

export default AddButton;