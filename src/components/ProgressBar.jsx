import React from 'react';

function ProgressBar({ percentage, label }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <span className="text-sm text-gray-400 w-12 text-right">{percentage}%</span>
    </div>
  );
}

export default ProgressBar;