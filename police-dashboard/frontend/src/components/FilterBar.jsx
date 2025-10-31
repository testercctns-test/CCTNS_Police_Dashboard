import React, { useState } from 'react';

const months = [ 'January','February','March','April','May','June','July','August','September','October','November','December' ];

export default function FilterBar({ initial, onApply }) {
  const [from, setFrom] = useState(initial.from);
  const [to, setTo] = useState(initial.to);

  return (
    <div className="bg-white p-4 rounded shadow-sm flex gap-3 items-center">
      <div>
        <label className="text-sm text-gray-600 block">From</label>
        <select value={from} onChange={(e) => setFrom(e.target.value)} className="border rounded px-2 py-1">
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div>
        <label className="text-sm text-gray-600 block">To</label>
        <select value={to} onChange={(e) => setTo(e.target.value)} className="border rounded px-2 py-1">
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <button
        className="ml-4 px-4 py-2 bg-blue-700 text-white rounded"
        onClick={() => onApply({ from, to })}
      >
        Apply
      </button>
    </div>
  );
}
