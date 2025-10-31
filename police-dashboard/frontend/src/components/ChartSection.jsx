import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from "recharts";

export default function ChartSection({ data, loading }) {
  if (loading) return <p className="text-center text-gray-500">Loading chart data...</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Monthly Tickets Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#3b82f6" name="Total" />
          <Bar dataKey="closed" fill="#10b981" name="Closed" />
          <Bar dataKey="pending" fill="#ef4444" name="Pending" />
        </BarChart>
      </ResponsiveContainer>

      <h2 className="text-lg font-semibold mt-8 mb-4 text-gray-800">Carry Forward Closed Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="carryForwardClosed"
            stroke="#8b5cf6"
            strokeWidth={2}
            name="Carry Forward Closed"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
