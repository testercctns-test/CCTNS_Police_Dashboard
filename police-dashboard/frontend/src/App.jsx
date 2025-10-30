import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SummaryCards from './components/SummaryCards';
import FilterBar from './components/FilterBar';
import ChartSection from './components/ChartSection';
import DataTable from './components/DataTable';

const API_BASE = 'https://localhost:5001/api/dashboard'; // change if different

export default function App() {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({ totalCompleted: 0, totalPending: 0, total: 0, latestMonth: '' });
  const [filter, setFilter] = useState({ from: 'February', to: 'October' });
  const [loading, setLoading] = useState(false);

  async function loadSummary() {
    try {
      const res = await axios.get(`${API_BASE}/summary`);
      setSummary(res.data);
    } catch (e) {
      console.warn('API summary failed, using local file.');
      // fallback: use local data
      const local = await import('./data/ticketsData.json');
      const totalCompleted = local.default.reduce((s,i)=>s+(i.completed||0),0);
      const totalPending = local.default.reduce((s,i)=>s+(i.pending||0),0);
      setSummary({ totalCompleted, totalPending, total: totalCompleted+totalPending, latestMonth: local.default[local.default.length-1].month });
    }
  }

  async function loadMonthly(from, to) {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/monthly`, { params: { from, to }});
      setData(res.data.map(d=>({ month: d.month, completed: d.completed, pending: d.pending })));
    } catch (err) {
      const local = await import('./data/ticketsData.json');
      let list = local.default;
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      const fi = months.indexOf(from);
      const ti = months.indexOf(to);
      if (fi >= 0 && ti >= 0 && fi <= ti) {
        list = list.filter(i => months.indexOf(i.month) >= fi && months.indexOf(i.month) <= ti);
        list.sort((a,b) => months.indexOf(a.month) - months.indexOf(b.month));
      }
      setData(list.map(d=>({ month: d.month, completed: d.completed, pending: d.pending })));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSummary();
    loadMonthly(filter.from, filter.to);
  }, []);

  const onApplyFilter = (f) => {
    setFilter(f);
    loadMonthly(f.from, f.to);
  };

  return (
    <div className="min-h-screen p-6">
      <header className="header rounded-md p-4 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--primary)]">Police Ticket Dashboard</h1>
          <p className="text-sm text-gray-600">Monitoring Ticket Status — February to October 2025</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-700">Puducherry Police</div>
          <div className="text-xs text-gray-500">Last updated: {new Date().toLocaleString()}</div>
        </div>
      </header>

      <SummaryCards summary={summary} />

      <div className="mt-6">
        <FilterBar initial={filter} onApply={onApplyFilter} />
      </div>

      <main className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white p-4 rounded shadow">
          <ChartSection data={data} loading={loading} />
        </section>

        <aside className="bg-white p-4 rounded shadow">
          <DataTable data={data} />
        </aside>
      </main>
    </div>
  );
}