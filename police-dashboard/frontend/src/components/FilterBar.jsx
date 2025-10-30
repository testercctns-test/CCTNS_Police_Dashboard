import React, { useState } from 'react';

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function FilterBar({ initial, onApply }) {
  const [from, setFrom] = useState(initial.from || "February");
  const [to, setTo] = useState(initial.to || "October");

  const apply = () => {
    onApply({ from, to });
  };

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col sm:flex-row gap-3 items-end">
      <div>
        <label className="text-xs text-gray-600">From</label>
        <select value={from} onChange={e => setFrom(e.target.value)} className="block mt-1 p-2 border rounded">
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div>
        <label className="text-xs text-gray-600">To</label>
        <select value={to} onChange={e => setTo(e.target.value)} className="block mt-1 p-2 border rounded">
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div>
        <button onClick={apply} className="bg-[var(--primary)] text-white px-4 py-2 rounded">Apply</button>
      </div>

      <div className="text-sm text-gray-500 ml-auto">
        (Monthly-wise view)
      </div>
    </div>
  );
}