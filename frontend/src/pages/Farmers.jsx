import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import WeatherWidget from '../components/WeatherWidget';

const tabIds = ['all', 'crops', 'modern', 'market', 'export', 'schemes', 'soil', 'weather', 'livestock', 'guide'];

const resourceMeta = [
  { type: 'crops', link: 'https://horticulture.ap.gov.in/' },
  { type: 'schemes', link: 'https://services.india.gov.in/service/detail/e-karshak-service-for-crop-booking-and-status-check-andhra-pradesh-1' },
  { type: 'modern', link: 'https://mnre.gov.in/' },
  { type: 'market', link: 'https://enam.gov.in/web/' },
  { type: 'market', link: 'https://ananthapuramu.ap.gov.in/agriculture-department/' },
  { type: 'export', link: 'https://apeda.gov.in/' },
  { type: 'schemes', link: 'https://pmkisan.gov.in/' },
  { type: 'soil', link: 'https://www.soilhealth.dac.gov.in/' },
  { type: 'schemes', link: 'https://pmfby.gov.in/' },
  { type: 'crops', link: 'https://www.myscheme.gov.in/' },
  { type: 'soil', link: 'https://nrega.nic.in/' },
  { type: 'livestock', link: 'https://ananthapuramu.ap.gov.in/animal-husbandry/' },
  { type: 'weather', link: 'https://mausam.imd.gov.in/index_en.php' },
  { type: 'weather', link: 'https://mausam.imd.gov.in/responsive/agromet_adv_ser_state_current.php' },
  { type: 'livestock', link: 'https://ananthapuramu.ap.gov.in/animal-husbandry/' },
  { type: 'livestock', link: 'https://ananthapuramu.ap.gov.in/animal-husbandry/' },
  { type: 'livestock', link: 'https://www.nabard.org/' },
];

const Farmer = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const contentRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeTab]);

  const ui = t('farmer.ui', { returnObjects: true });
  const tabLabels = t('farmer.tabs', { returnObjects: true });
  const translatedResources = t('farmer.resources', { returnObjects: true });
  const cropGuides = t('farmer.cropGuides', { returnObjects: true });

  const farmerResources = translatedResources.map((item, i) => ({
    ...item,
    type: resourceMeta[i].type,
    link: resourceMeta[i].link,
  }));

  const filteredResources = farmerResources.filter(item => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  return (
    <div className="min-h-screen bg-[#FAF3E8] pb-12">
      {/* Top Header */}
      <div
        className="relative overflow-hidden text-white py-10 px-6 md:px-12 shadow-lg"
        style={{
          background: 'linear-gradient(120deg, #7A3E1D 0%, #B5652B 60%, #C97A3A 100%)',
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 400 200"
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <path
              key={i}
              d={`M ${-40 + i * 32} 200 L ${40 + i * 32} 0`}
              stroke="white"
              strokeWidth="6"
            />
          ))}
        </svg>
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-[#D9A441] opacity-20 blur-2xl" />

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="bg-[#5C2E14] text-[#F3D9B1] text-xs font-bold px-3 py-1 rounded-full border border-[#8B4A2B]">
              {ui.districtTag}
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold mt-2 tracking-tight">{ui.title}</h1>
            <p className="text-[#F3D9B1] text-sm mt-1">{ui.subtitle}</p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-white text-[#8B4A2B] text-xs font-bold px-5 py-2.5 rounded-xl shadow-md hover:bg-[#FAF3E8] transition cursor-pointer"
          >
            {ui.backHome}
          </button>
        </div>
      </div>

      {/* Drought Advisory Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-6">
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-sm font-bold text-amber-900">{ui.advisoryTitle}</p>
              <p className="text-xs text-amber-700 mt-0.5">{ui.advisoryDesc}</p>
            </div>
          </div>
          <a
            href="tel:18001801551"
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-lg shrink-0 whitespace-nowrap"
          >
            {ui.callCenter}
          </a>
        </div>
      </div>

      {/* Live Weather Widget */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-6">
        <WeatherWidget />
      </div>

      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8">
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {tabIds.map(id => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition shadow-sm cursor-pointer ${
                activeTab === id
                  ? id === 'weather' ? 'bg-[#3E7C97] text-white shadow-md' : 'bg-[#B5652B] text-white shadow-md'
                  : 'bg-white text-gray-700 border border-[#EBDCC5] hover:bg-[#FAF3E8]'
              }`}
            >
              {id === 'all' ? `${tabLabels.all} (${farmerResources.length})` : tabLabels[id]}
            </button>
          ))}
        </div>

        <div ref={contentRef}></div>

        {/* Resources Grid */}
        {activeTab !== 'guide' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl border border-[#EBDCC5] p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FDF3E7] text-[#8B4A2B] border border-[#F0DFC7]">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-medium text-[#3E7C97] bg-[#EAF4F8] px-2.5 py-0.5 rounded-full">
                      ✨ {item.accessType}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#2B2118] mt-3">{item.title}</h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{item.desc}</p>

                  <div className="mt-4 space-y-1 text-xs bg-[#FAF3E8] p-3 rounded-xl border border-[#F0DFC7]">
                    <p className="text-gray-700"><strong className="text-[#2B2118]">{ui.benefitLabel}:</strong> {item.features}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0DFC7] flex items-center justify-end">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#8B4A2B] hover:bg-[#6B3A1F] text-white text-xs font-semibold px-4 py-2 rounded-lg transition inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    {ui.officialLink} ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Crop Cultivation Guide */}
        {activeTab === 'guide' && (
          <div className="bg-white rounded-2xl border border-[#EBDCC5] p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#2B2118] mb-2">{ui.guideTitle}</h2>
            <p className="text-xs text-gray-500 mb-6">{ui.guideSubtitle}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cropGuides.map((guide, idx) => (
                <div key={idx} className="bg-[#FAF3E8] border border-[#F0DFC7] rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-[#8B4A2B] text-sm mb-2">{guide.name}</h3>
                    <p className="text-[11px] font-bold text-[#8B4A2B] mb-3 bg-[#F3D9B1]/60 px-2.5 py-1 rounded-md inline-block">⏰ {guide.time}</p>
                    <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">{guide.details}</p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-[#F0DFC7] text-[10px] font-bold text-[#6B3A1F] flex items-center gap-1">
                    ✓ {ui.recommendedBy}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Farmer;