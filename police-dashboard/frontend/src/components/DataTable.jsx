import React from "react";

export default function DataTable({ data }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Monthly Ticket Details
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-blue-100 text-blue-900 font-semibold">
            <tr>
              <th className="px-4 py-2 text-left">Month</th>
              <th className="px-4 py-2 text-right">Total Tickets</th>
              <th className="px-4 py-2 text-right">Closed</th>
              <th className="px-4 py-2 text-right">Carry Forward - Closed</th>
              <th className="px-4 py-2 text-right">Pending</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, idx) => (
              <tr
                key={idx}
                className={`border-t ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-2 font-medium">{d.month}</td>
                <td className="px-4 py-2 text-right">{d.total}</td>
                <td className="px-4 py-2 text-right text-green-700">{d.closed}</td>
                <td className="px-4 py-2 text-right text-yellow-700">
                  {d.carryForwardClosed}
                </td>
                <td className="px-4 py-2 text-right text-red-700">{d.pending}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
