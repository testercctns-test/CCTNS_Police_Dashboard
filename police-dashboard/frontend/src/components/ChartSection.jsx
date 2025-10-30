import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

export default function ChartSection({ data, loading }) {
  // Recharts expects keys to match; normalize
  const normalized = (data || []).map(d => ({ month: d.month, Completed: d.completed, Pending: d.pending }));

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Completed vs Pending (Monthly)</h3>

      {loading ? <div>Loading...</div> :
        (normalized && normalized.length > 0) ? (
          <div style={{ width: '100%', height: 360 }}>
            <ResponsiveContainer>
              <BarChart data={normalized}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Completed" name="Completed" stackId="a" fill="#16a34a" />
                <Bar dataKey="Pending" name="Pending" stackId="a" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : <div className="text-gray-500">No data available for selected range.</div>
      }
    </div>
  );
}