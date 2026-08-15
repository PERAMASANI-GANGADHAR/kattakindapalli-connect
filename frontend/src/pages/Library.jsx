import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const categoryIds = ['all', 'school', 'higher', 'competitive', 'agriculture', 'reading', 'law'];
const resourceMeta = [
  { category: 'school', link: 'https://ncert.nic.in/textbook.php', color: 'emerald' },
  { category: 'school', link: 'https://bie.ap.gov.in/', color: 'emerald' },
  { category: 'higher', link: 'https://nptel.ac.in/', color: 'blue' },
  { category: 'higher', link: 'https://www.coursera.org/', color: 'blue' },
  { category: 'competitive', link: 'https://psc.ap.gov.in/', color: 'amber' },
  { category: 'competitive', link: 'https://upsc.gov.in/', color: 'amber' },
  { category: 'agriculture', link: 'https://www.manage.gov.in/', color: 'lime' },
  { category: 'reading', link: 'https://telugu.pratilipi.com/', color: 'violet' },
  { category: 'reading', link: 'https://www.eenadu.net/', color: 'violet' },
  { category: 'law', link: 'https://www.indiacode.nic.in/', color: 'rose' },
];

const badgeStyles = {
  emerald: 'text-emerald-700 bg-emerald-50 border-emerald-100',
  blue: 'text-blue-700 bg-blue-50 border-blue-100',
  amber: 'text-amber-700 bg-amber-50 border-amber-100',
  rose: 'text-rose-700 bg-rose-50 border-rose-100',
  violet: 'text-violet-700 bg-violet-50 border-violet-100',
  lime: 'text-lime-700 bg-lime-50 border-lime-100',
};

const btnStyles = {
  emerald: 'bg-emerald-600 hover:bg-emerald-700',
  blue: 'bg-blue-600 hover:bg-blue-700',
  amber: 'bg-amber-600 hover:bg-amber-700',
  rose: 'bg-rose-600 hover:bg-rose-700',
  violet: 'bg-violet-600 hover:bg-violet-700',
  lime: 'bg-lime-700 hover:bg-lime-800',
};

const ResourceCard = ({ title, category, desc, link, badgeColor, viewLabel }) => (
  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
    <div>
      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border inline-block mb-3 ${badgeStyles[badgeColor] || badgeStyles.emerald}`}>
        {category}
      </span>
      <h3 className="text-base font-bold text-slate-800 mb-1 leading-snug">{title}</h3>
      <p className="text-xs text-slate-600 mb-4 leading-relaxed">{desc}</p>
    </div>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full text-center text-white font-medium text-xs py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-1 ${btnStyles[badgeColor] || btnStyles.emerald}`}
    >
      {viewLabel} ↗
    </a>
  </div>
);

const Library = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categoryLabels = t('library.categories', { returnObjects: true });
  const translatedResources = t('library.resources', { returnObjects: true });

  const resources = translatedResources.map((item, idx) => ({
    id: idx + 1,
    title: item.title,
    desc: item.desc,
    category: resourceMeta[idx].category,
    catName: categoryLabels[resourceMeta[idx].category],
    link: resourceMeta[idx].link,
    color: resourceMeta[idx].color,
  }));

  const filteredData = resources.filter(item => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
      {/* Simple header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-lg text-white shadow-sm">📚</div>
            <div>
              <h1 className="text-base font-bold text-slate-900">{t('library.title')}</h1>
              <p className="text-[11px] text-slate-500">{t('library.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="text-xs font-bold px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition"
          >
            {t('library.backHome')}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 mt-6 space-y-6">

        {/* Search + filter tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5 space-y-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('library.searchPlaceholder')}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-800 focus:outline-none focus:border-emerald-500 transition"
          />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categoryIds.map(id => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  filter === id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {categoryLabels[id]}
              </button>
            ))}
          </div>
        </div>

        {/* NDL featured link */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏛️</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{t('library.ndlLabel')}</p>
              <h3 className="text-sm font-bold text-slate-900">{t('library.ndlTitle')}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{t('library.ndlDesc')}</p>
            </div>
          </div>
          <a
            href="https://www.ndl.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition inline-flex items-center gap-1.5"
          >
            {t('library.ndlBtn')} ↗
          </a>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-bold text-slate-500">
            {t('library.totalResources', { count: filteredData.length })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <ResourceCard
                key={item.id}
                category={item.catName}
                title={item.title}
                desc={item.desc}
                link={item.link}
                badgeColor={item.color}
                viewLabel={t('library.viewBtn')}
              />
            ))
          ) : (
            <div className="col-span-full bg-white p-8 text-center rounded-2xl border border-slate-200">
              <p className="text-sm font-bold text-slate-500">{t('library.noResults')} 🙁</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default Library;