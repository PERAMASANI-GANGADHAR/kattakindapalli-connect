import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const categoryMeta = [
  { id: 'roadmap', step: '★', icon: '🗺️' },
  { id: 'school', step: '1', icon: '🎒' },
  { id: 'after10th', step: '2', icon: '📘' },
  { id: 'interExams', step: '3', icon: '✏️' },
  { id: 'degreeCourses', step: '4', icon: '📚' },
  { id: 'defense', step: '5', icon: '🚀' },
  { id: 'graduation', step: '6', icon: '🎓' },
  { id: 'management', step: '7', icon: '💼' },
  { id: 'it', step: '8', icon: '💻' },
  { id: 'govt', step: '9', icon: '🏛️' },
  { id: 'sportsAbroad', step: '10', icon: '✈️' }
];

const linkMeta = {
  school: [
    'https://cse.ap.gov.in/',
    'https://apreis.apcfss.in/',
    'https://navodaya.gov.in/',
    'https://bse.ap.gov.in/'
  ],
  after10th: [
    'https://www.rgukt.in/',
    'https://sbtet.ap.gov.in/',
    'https://bie.ap.gov.in/',
    'https://iti.itda.ap.gov.in/'
  ],
  interExams: [
    'https://svvu.edu.in/',
    'https://www.icai.org/',
    'https://jeemain.nta.nic.in/',
    'https://cets.apsche.ap.gov.in/',
    'https://neet.nta.nic.in/',
    'https://consortiumofnlus.ac.in/'
  ],
  degreeCourses: [
    'https://cets.apsche.ap.gov.in/',
    'https://oamdc-apsche.aptonline.in/',
    'https://oamdc-apsche.aptonline.in/',
    'https://oamdc-apsche.aptonline.in/'
  ],
  defense: [
    { link: 'https://www.iist.ac.in/', extraUrl: 'https://www.isro.gov.in/Careers.html' },
    { link: 'https://upsc.gov.in/', extraUrl: 'https://afcat.cdac.in/' },
    { link: 'https://joinindianarmy.nic.in/', extraUrl: 'https://www.joinindiannavy.gov.in/' },
    { link: 'https://www.drdo.gov.in/', extraUrl: null }
  ],
  graduation: [
    'https://gate2026.iitg.ac.in/',
    'https://ugcnet.nta.ac.in/',
    'https://cets.apsche.ap.gov.in/'
  ],
  management: [
    'https://iimcat.ac.in/',
    'https://cets.apsche.ap.gov.in/'
  ],
  it: [
    'https://www.freecodecamp.org/',
    'https://www.coursera.org/',
    'https://www.eccouncil.org/'
  ],
  govt: [
    'https://upsc.gov.in/',
    'https://psc.ap.gov.in/',
    'https://cse.ap.gov.in/',
    'https://slprb.ap.gov.in/',
    'https://ssc.gov.in/',
    'https://www.ibps.in/'
  ],
  sportsAbroad: [
    'https://sports.ap.gov.in/',
    'https://jnanabhumi.ap.gov.in/',
    'https://www.ets.org/',
    'https://www.vidyalakshmi.co.in/Students/'
  ]
};

const roadmapBoxLinks = {
  stage1: [null, null, null],
  stage2: [null, null, null, null],
  stage3: [null, null, null, null, null],
};

const RoadmapBox = ({ title, desc, highlight = false }) => (
  <div className={`p-4 rounded-xl border transition ${
    highlight ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-slate-50 border-slate-200'
  }`}>
    <h3 className="text-sm font-bold text-slate-800 mb-1">{title}</h3>
    <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

const RoadmapCard = ({ icon, title, desc, onClick, detailsLabel }) => (
  <div
    onClick={onClick}
    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
  >
    <div>
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="text-sm font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs text-slate-600 leading-relaxed mb-3">{desc}</p>
    </div>
    <span className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
      {detailsLabel} ➔
    </span>
  </div>
);

const SectionLayout = ({ stepNum, title, subtitle, children }) => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
        {stepNum}
      </span>
      <h2 className="text-xl font-bold text-slate-900 mt-2">{title}</h2>
      <p className="text-xs text-slate-600 mt-1">{subtitle}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  </div>
);

const Card = ({ badge, title, desc, howTo, link, extraLink, whatIsItLabel, howToLabel, portalLabel }) => (
  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
    <div>
      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 inline-block mb-3">
        {badge}
      </span>
      <h3 className="text-base font-bold text-slate-800 mb-2 leading-snug">{title}</h3>
      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
        <span className="font-semibold text-slate-700">✨ {whatIsItLabel}:</span> {desc}
      </p>
      <div className="bg-slate-50 p-3 rounded-lg mb-6 border border-slate-100">
        <p className="text-xs text-slate-600 leading-relaxed">
          <span className="font-semibold text-red-500">📍 {howToLabel}:</span> {howTo}
        </p>
      </div>
    </div>

    <div className="space-y-2">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-1"
      >
        {portalLabel} ↗
      </a>
      {extraLink && (
        <a
          href={extraLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs py-2 px-3 rounded-lg transition block"
        >
          {extraLink.label}
        </a>
      )}
    </div>
  </div>
);

const Student = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('roadmap');

  const categoryTitles = t('student.categories', { returnObjects: true });
  const ui = t('student.ui', { returnObjects: true });
  const roadmap = t('student.roadmap', { returnObjects: true });
  const sections = t('student.sections', { returnObjects: true });

  const renderCards = (sectionKey) => {
    const section = sections[sectionKey];
    const links = linkMeta[sectionKey];
    return section.cards.map((card, i) => {
      const linkEntry = links[i];
      const isDefense = sectionKey === 'defense';
      const link = isDefense ? linkEntry.link : linkEntry;
      const extraLink = isDefense && linkEntry.extraUrl && card.extraLabel
        ? { url: linkEntry.extraUrl, label: card.extraLabel }
        : null;
      return (
        <Card
          key={i}
          badge={card.badge}
          title={card.title}
          desc={card.desc}
          howTo={card.howTo}
          link={link}
          extraLink={extraLink}
          whatIsItLabel={ui.whatIsIt}
          howToLabel={ui.howToApply}
          portalLabel={ui.officialPortal}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">

      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl text-white font-bold shadow-md shadow-blue-500/20">
              🎓
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                {ui.headerTitle} <span className="text-blue-600 text-sm font-semibold">— {ui.headerSubtitle}</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">{ui.headerDesc}</p>
            </div>
          </div>

          <button
            onClick={() => window.location.href = '/'}
            className="text-xs font-bold px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition"
          >
            {ui.backHome}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 space-y-8">

        {/* Navigation Bar */}
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-4 flex items-center gap-2">
            <span>🧭</span> {ui.navTitle}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-11 gap-2">
            {categoryMeta.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                  activeTab === cat.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-base">{cat.icon}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      activeTab === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {cat.step}
                    </span>
                  </div>
                  <p className="text-xs font-bold leading-snug">{categoryTitles[cat.id]}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* TAB 0: VISUAL ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                {roadmap.badge}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-2">{roadmap.title}</h2>
              <p className="text-xs text-slate-600 mt-1">{roadmap.subtitle}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-8 overflow-x-auto">

              {/* STAGE 1 */}
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                    {roadmap.stage1.label}
                  </span>
                  <button onClick={() => setActiveTab('school')} className="text-xs font-bold text-blue-600 hover:underline">
                    {ui.detailsLabel} ➔
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {roadmap.stage1.boxes.map((box, i) => (
                    <RoadmapBox key={i} title={box.title} desc={box.desc} />
                  ))}
                </div>
              </div>

              <div className="text-center text-slate-400 text-2xl font-bold">{roadmap.arrow1}</div>

              {/* STAGE 2 */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full">
                    {roadmap.stage2.label}
                  </span>
                  <button onClick={() => setActiveTab('after10th')} className="text-xs font-bold text-blue-600 hover:underline">
                    {ui.detailsLabel} ➔
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {roadmap.stage2.boxes.map((box, i) => (
                    <RoadmapBox key={i} title={box.title} desc={box.desc} highlight={i === 0} />
                  ))}
                </div>
              </div>

              <div className="text-center text-slate-400 text-2xl font-bold">{roadmap.arrow2}</div>

              {/* STAGE 3 */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                    {roadmap.stage3.label}
                  </span>
                  <button onClick={() => setActiveTab('interExams')} className="text-xs font-bold text-blue-600 hover:underline">
                    {ui.entranceLabel} ➔
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {roadmap.stage3.boxes.map((box, i) => (
                    <RoadmapBox key={i} title={box.title} desc={box.desc} highlight={i < 2} />
                  ))}
                </div>
              </div>

              <div className="text-center text-slate-400 text-2xl font-bold">{roadmap.arrow3}</div>

              {/* STAGE 4 */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                    {roadmap.stage4.label}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {roadmap.stage4.cards.map((card, i) => (
                    <RoadmapCard
                      key={i}
                      icon={card.icon}
                      title={card.title}
                      desc={card.desc}
                      onClick={() => setActiveTab(card.target)}
                      detailsLabel={ui.detailsLabel}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP SECTIONS 1-10 */}
        {activeTab !== 'roadmap' && sections[activeTab] && (
          <SectionLayout
            stepNum={sections[activeTab].stepNum}
            title={sections[activeTab].title}
            subtitle={sections[activeTab].subtitle}
          >
            {renderCards(activeTab)}
          </SectionLayout>
        )}

      </main>
    </div>
  );
};

export default Student;