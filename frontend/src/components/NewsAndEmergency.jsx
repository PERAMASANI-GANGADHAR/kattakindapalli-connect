import React from 'react';
import { useTranslation } from 'react-i18next';

const newsImages = [
  'https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?w=150',
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=150',
  'https://images.unsplash.com/photo-1571687949921-1306bfb24b72?w=150',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=150',
  'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=150',
];

const contactMeta = [
  { icon: '📞', color: 'bg-red-50 text-red-600' },
  { icon: '🛡️', color: 'bg-blue-50 text-blue-600' },
  { icon: '🚓', color: 'bg-blue-100 text-blue-700' },
  { icon: '➕', color: 'bg-red-100 text-red-600' },       // Health Center
  { icon: '🏛️', color: 'bg-teal-100 text-teal-700' },    // Pamidi Mandal Office (కొత్తది)
  { icon: '🚑', color: 'bg-rose-100 text-rose-700' },     // Ambulance
  { icon: '👩', color: 'bg-pink-100 text-pink-700' },
  { icon: '🆘', color: 'bg-pink-50 text-pink-600' },
  { icon: '🧒', color: 'bg-amber-100 text-amber-700' },
  { icon: '🚒', color: 'bg-orange-100 text-orange-700' },
  { icon: '📱', color: 'bg-slate-100 text-slate-700' },
];

const NewsAndEmergency = () => {
  const { t } = useTranslation();

  const newsList = t('home.newsList', { returnObjects: true }).map((item, idx) => ({
    ...item,
    img: newsImages[idx],
  }));

  const contacts = t('home.contacts', { returnObjects: true }).map((item, idx) => ({
    ...item,
    icon: contactMeta[idx].icon,
    color: contactMeta[idx].color,
  }));

  return (
    <section className="py-8 px-4 md:px-12 bg-gray-50/60">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Latest Village News */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-gray-900">{t('home.newsTitle')}</h2>

          <div className="space-y-4">
            {newsList.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start p-2 rounded-xl hover:bg-gray-50 transition">
                <img src={item.img} alt={item.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold text-gray-900">{item.title}</h3>
                  <p className="text-[11px] text-gray-600 leading-relaxed">{item.description}</p>
                  <p className="text-[10px] text-gray-400 pt-0.5">
                    {item.date} • <span className="text-gray-500">{item.author}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-gray-900">{t('home.emergencyTitle')}</h2>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {contacts.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${item.color} flex items-center justify-center text-sm`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">{item.name}</h3>
                    <p className="text-[11px] text-gray-500">{item.phone}</p>
                  </div>
                </div>
                <a
                  href={`tel:${item.phone}`}
                  className="border border-gray-200 hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 text-xs font-medium px-3.5 py-1.5 rounded-lg transition"
                >
                  📞 {t('home.callBtn')}
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default NewsAndEmergency;