import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SummaryCards from './components/SummaryCards';
import FilterBar from './components/FilterBar';
import ChartSection from './components/ChartSection';
import DataTable from './components/DataTable';

const API_BASE = 'https://localhost:5001/api/dashboard'; // backend base URL

export default function App() {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({
    totalTickets: 0,
    totalClosed: 0,
    totalCarryForwardClosed: 0,
    totalPending: 0,
    latestMonth: '',
  });
  const [filter, setFilter] = useState({ from: 'February', to: 'September' });
  const [loading, setLoading] = useState(false);

// ✅ Correct summary calculation (Pending from latest month)
const calculateSummary = (dataset) => {
  if (!dataset || dataset.length === 0) {
    return {
      totalTickets: 0,
      totalClosed: 0,
      totalCarryForwardClosed: 0,
      totalPending: 0,
      latestMonth: '',
    };
  }

  return {
    totalTickets: dataset.reduce((sum, i) => sum + i.total, 0),
    totalClosed: dataset.reduce((sum, i) => sum + i.closed, 0),
    totalCarryForwardClosed: dataset.reduce(
      (sum, i) => sum + i.carryForwardClosed,
      0
    ),
    // ✅ Pending should reflect current latest month’s pending only
    totalPending: dataset[dataset.length - 1]?.pending ?? 0,
    latestMonth: dataset[dataset.length - 1]?.month ?? '',
  };
};
  


  async function loadMonthly(from, to) {
    setLoading(true);
    try {
      // ✅ Try backend first
      const res = await axios.get(`${API_BASE}/monthly`, {
        params: { from, to },
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
      });
      setData(res.data);
      setSummary(calculateSummary(res.data)); // ✅ summary from filtered data
    } catch (err) {
      // ✅ Fallback to local JSON if backend fails
      const local = await import('./data/ticketsData.json');
      let list = local.default;

      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];

      const fi = months.indexOf(from);
      const ti = months.indexOf(to);

      if (fi >= 0 && ti >= 0 && fi <= ti) {
        list = list.filter(
          (i) => months.indexOf(i.month) >= fi && months.indexOf(i.month) <= ti
        );
      }

      setData(list);
      setSummary(calculateSummary(list));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMonthly(filter.from, filter.to);
  }, []);

  const onApplyFilter = (f) => {
    setFilter(f);
    loadMonthly(f.from, f.to);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-6">
      <header className="text-center mb-10">
        <div className="flex justify-center items-center gap-4">
          <img
            src="/images/cctnslogo.jpg"
            alt="CCTNS Logo"
            className="w-16 h-16 object-contain drop-shadow-md"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 tracking-wide drop-shadow-sm">
            CCTNS PUDUCHERRY POLICE
          </h1>
        </div>
        <p className="text-gray-600 text-sm mt-3">
          Crime and Criminal Tracking Network & Systems (CCTNS)
        </p>
      </header>

      <SummaryCards summary={summary} />

      <div className="mt-8">
        <FilterBar initial={filter} onApply={onApplyFilter} />
      </div>

      <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <ChartSection data={data} loading={loading} />
        </section>

        <aside className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <DataTable data={data} />
        </aside>
      </main>
    </div>
  );
}
