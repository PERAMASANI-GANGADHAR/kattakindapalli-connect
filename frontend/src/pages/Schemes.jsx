import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const tabMeta = [
  { id: 'state', accent: 'amber' },
  { id: 'central', accent: 'orange' },
  { id: 'ids', accent: 'blue' },
];

const linkMeta = {
  state: [
    'https://gsws-nbm.ap.gov.in/',
    'https://sspensions.ap.gov.in/',
    'https://annadathasukhibhava.ap.gov.in/',
    'https://ap.meeseva.gov.in/',
    'https://apobmms.apcfss.in/',
    'https://apsrtc.ap.gov.in/',
  ],
  central: [
    'https://pmkisan.gov.in/',
    'https://pmfby.gov.in/',
    'https://pmjay.gov.in/',
    'https://pmayg.nic.in/',
    'https://pmuy.gov.in/',
    'https://www.pmjdy.gov.in/',
  ],
  ids: [
    'https://www.digilocker.gov.in/',
    'https://uidai.gov.in/',
    'https://www.nvsp.in/',
    'https://www.incometax.gov.in/',
    'https://parivahan.gov.in/',
    'https://www.passportindia.gov.in/',
  ],
};

const accentStyles = {
  amber: {
    badge: 'bg-amber-50 text-amber-800 border-amber-200',
    status: 'bg-amber-50 text-amber-700',
    box: 'bg-amber-50/60 border-amber-100',
    btn: 'bg-amber-600 hover:bg-amber-700',
    tabActive: 'bg-amber-500 text-white',
    tabInactive: 'bg-white text-gray-700 border border-amber-200 hover:bg-amber-50',
  },
  orange: {
    badge: 'bg-orange-50 text-orange-800 border-orange-200',
    status: 'bg-orange-50 text-orange-700',
    box: 'bg-orange-50/60 border-orange-100',
    btn: 'bg-orange-600 hover:bg-orange-700',
    tabActive: 'bg-orange-500 text-white',
    tabInactive: 'bg-white text-gray-700 border border-orange-200 hover:bg-orange-50',
  },
  blue: {
    badge: 'bg-blue-50 text-blue-800 border-blue-200',
    status: 'bg-blue-50 text-blue-700',
    box: 'bg-blue-50/60 border-blue-100',
    btn: 'bg-blue-600 hover:bg-blue-700',
    tabActive: 'bg-blue-500 text-white',
    tabInactive: 'bg-white text-gray-700 border border-blue-200 hover:bg-blue-50',
  },
};

const Schemes = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('state');

  const tabLabels = t('schemes.tabs', { returnObjects: true });
  const items = t(`schemes.${activeTab}`, { returnObjects: true });
  const links = linkMeta[activeTab];
  const style = accentStyles[tabMeta.find(tb => tb.id === activeTab).accent];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Top Header */}
      <div className="bg-emerald-900 text-white py-8 px-6 md:px-12 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{t('schemes.title')}</h1>
            <p className="text-emerald-200 text-sm mt-1">{t('schemes.subtitle')}</p>
          </div>
          <Link
            to="/"
            className="bg-white text-emerald-900 text-xs font-semibold px-4 py-2 rounded-lg shadow hover:bg-emerald-50 transition"
          >
            {t('schemes.backHome')}
          </Link>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8">
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {tabMeta.map(tab => {
            const tabStyle = accentStyles[tab.accent];
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition shadow-sm cursor-pointer ${
                  activeTab === tab.id ? tabStyle.tabActive : tabStyle.tabInactive
                }`}
              >
                {tabLabels[tab.id]}
              </button>
            );
          })}
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((scheme, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${style.badge}`}>
                    {tabLabels[activeTab]}
                  </span>
                  <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${style.status}`}>
                    🟢 {scheme.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mt-3">{scheme.title}</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{scheme.desc}</p>

                <div className={`mt-4 space-y-1.5 text-xs p-3 rounded-xl border ${style.box}`}>
                  <p className="text-gray-700"><strong className="text-gray-900">{t('schemes.amountLabel')}:</strong> {scheme.amount}</p>
                  <p className="text-gray-700"><strong className="text-gray-900">{t('schemes.eligibilityLabel')}:</strong> {scheme.eligibility}</p>
                  <p className="text-gray-700"><strong className="text-gray-900">{t('schemes.deadlineLabel')}:</strong> {scheme.deadline}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end">
                <a
                  href={links[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white text-xs font-semibold px-4 py-2 rounded-lg transition inline-flex items-center gap-1.5 shadow-sm ${style.btn}`}
                >
                  {t('schemes.viewBtn')} ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schemes;