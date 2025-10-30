import React from 'react';

export default function SummaryCards({ summary }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <div className="text-sm text-gray-500">Total Completed</div>
        <div className="text-2xl font-bold text-green-600">{summary.totalCompleted ?? 0}</div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <div className="text-sm text-gray-500">Total Pending</div>
        <div className="text-2xl font-bold text-red-600">{summary.totalPending ?? 0}</div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <div className="text-sm text-gray-500">Total Tickets</div>
        <div className="text-2xl font-bold text-blue-700">{summary.total ?? 0}</div>
        <div className="text-xs text-gray-500 mt-1">Latest: {summary.latestMonth}</div>
      </div>
    </div>
  );
}