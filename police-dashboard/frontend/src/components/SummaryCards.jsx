import React from 'react';

export default function SummaryCards({ summary }) {
  const cards = [
    { title: 'Total Tickets', value: summary.totalTickets, color: 'bg-blue-600' },
    { title: 'Closed', value: summary.totalClosed, color: 'bg-green-600' },
    { title: 'Carry Forward - Closed', value: summary.totalCarryForwardClosed, color: 'bg-yellow-500' },
    { title: 'Pending', value: summary.totalPending, color: 'bg-red-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((c, i) => (
        <div key={i} className={`${c.color} text-white rounded-2xl shadow-lg p-5 flex flex-col items-center`}>
          <h3 className="text-lg font-semibold">{c.title}</h3>
          <p className="text-3xl font-bold mt-2">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
