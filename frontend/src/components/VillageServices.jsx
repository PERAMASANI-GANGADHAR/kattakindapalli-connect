import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const VillageServices = () => {
  const { t } = useTranslation();

  const services = [
    { key: 'roads', icon: '🛣️', path: '/report-problem?category=Roads%20%26%20Drainage' },
    { key: 'water', icon: '💧', path: '/report-problem?category=Water' },
    { key: 'lights', icon: '💡', path: '/report-problem?category=Street%20Lights' },
    { key: 'garbage', icon: '🗑️', path: '/report-problem?category=Garbage%20%26%20Sanitation' },
    { key: 'farmer', icon: '🌱', path: '/farmer' },
    { key: 'student', icon: '🎓', path: '/student' },
    { key: 'library', icon: '📚', path: '/library' },
    { key: 'schemes', icon: '📋', path: '/schemes' },
  ];

  return (
    <section className="py-8 px-4 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto space-y-6">
        <h2 className="text-lg font-bold text-gray-900">{t('home.servicesTitle')}</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {services.map((item, idx) => (
            <Link to={item.path} key={idx} className="block no-underline h-full group">
              <div className="bg-gray-50/75 p-4 rounded-xl border border-gray-100 hover:bg-white hover:shadow-md transition h-full flex flex-col justify-between">
                <div>
                  <div className="text-2xl transition group-hover:scale-110 mb-1">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 text-xs">{t(`home.services.${item.key}.title`)}</h3>
                  <p className="text-[10px] text-gray-500 leading-tight mt-1">
                    {t(`home.services.${item.key}.desc`)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VillageServices;