import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ComplaintStats = () => {
  const [counts, setCounts] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('https://kattakindapalli-connect.onrender.com/api/complaints/stats/summary');
        const data = await res.json();
        setCounts(data);
      } catch (err) {
        console.error('Stats fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    {
      title: t('home.stats.totalTitle'),
      desc: t('home.stats.totalDesc'),
      count: counts.total,
      icon: '📝',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      accentColor: 'border-l-emerald-500',
    },
    {
      title: t('home.stats.pendingTitle'),
      desc: t('home.stats.pendingDesc'),
      count: counts.pending,
      icon: '🕒',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      accentColor: 'border-l-amber-500',
    },
    {
      title: t('home.stats.progressTitle'),
      desc: t('home.stats.progressDesc'),
      count: counts.inProgress,
      icon: '🛠️',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      accentColor: 'border-l-blue-500',
    },
    {
      title: t('home.stats.resolvedTitle'),
      desc: t('home.stats.resolvedDesc'),
      count: counts.resolved,
      icon: '✅',
      badgeBg: 'bg-green-50 text-green-700 border-green-200',
      accentColor: 'border-l-green-500',
    },
  ];

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 md:px-12 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className={`bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer border-l-4 ${item.accentColor} group`}
          >
            <div className="flex items-start justify-between">
              <span className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-base sm:text-lg border ${item.badgeBg}`}>
                {item.icon}
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 group-hover:scale-105 transition-transform">
                {loading ? '...' : item.count}
              </span>
            </div>

            <div className="mt-2 sm:mt-4">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{item.title}</h3>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium leading-relaxed mt-0.5 sm:mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComplaintStats;
