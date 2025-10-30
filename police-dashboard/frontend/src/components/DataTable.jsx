import React from 'react';

export default function DataTable({ data }) {
  const rows = (data || []).map(d => {
    const completed = d.completed ?? d.Completed ?? 0;
    const pending = d.pending ?? d.Pending ?? 0;
    return {
      month: d.month,
      completed,
      pending,
      total: completed + pending
    };
  });

  return (
    <div>
      <h4 className="font-medium mb-2">Monthly Breakdown</h4>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-600">
            <th className="p-1">Month</th>
            <th className="p-1">Completed</th>
            <th className="p-1">Pending</th>
            <th className="p-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.month} className="border-t">
              <td className="p-2">{r.month}</td>
              <td className="p-2 text-green-600">{r.completed}</td>
              <td className="p-2 text-red-600">{r.pending}</td>
              <td className="p-2">{r.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}