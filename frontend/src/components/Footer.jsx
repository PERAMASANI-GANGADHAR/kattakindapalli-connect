import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-white pt-12 pb-8 px-6 md:px-12 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        
        {/* Column 1: Brand & Tagline */}
        <div>
          <h3 className="text-lg font-bold text-emerald-400 mb-2">🌿 Kattakindapalli Connect</h3>
          <p className="text-xs font-semibold text-emerald-300 mb-3">"అందరి వికాసం – మన గ్రామం ప్రగతి"</p>
          <p className="text-xs text-emerald-200/80 leading-relaxed">
            గ్రామ పరిపాలనను మరింత సులభతరం చేయడానికి, స్థానిక సమస్యలను (రోడ్లు, డ్రైనేజీ, తాగునీరు) అధికారుల దృష్టికి తీసుకెళ్లడానికి మరియు ప్రభుత్వ పథకాలను ప్రజలకు చేరవేయడానికి ఏర్పాటు చేయబడిన డిజిటల్ వేదిక.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-xs text-emerald-200/80">
            <li><a href="/" className="hover:text-white transition">🏠 Home</a></li>
            <li><a href="/farmer" className="hover:text-white transition">🌾 Farmer Section & Guide</a></li>
            <li><a href="/grievances" className="hover:text-white transition">📢 Report a Problem</a></li>
            <li><a href="/track" className="hover:text-white transition">🔍 Track Complaint Status</a></li>
          </ul>
        </div>

        {/* Column 3: Panchayat Info */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-3">Gram Panchayat Office</h3>
          <p className="text-xs text-emerald-200/80 leading-relaxed mb-2">
            అత్యవసర సహాయం లేదా స్థానిక సమస్యల ఫిర్యాదుల కొరకు మీ గ్రామ సచివాలయాన్ని సంప్రదించండి.
          </p>
          <p className="text-xs font-semibold text-emerald-300">
            📍 Location: Kattakindapalli, Andhra Pradesh
          </p>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-emerald-900/60 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-emerald-300/60">© {new Date().getFullYear()} Kattakindapalli Connect. All rights reserved.</p>

        {/* Developer Credit Badge */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-900 to-emerald-800 border border-emerald-700/60 rounded-full px-4 py-2 shadow-md hover:border-emerald-500 transition-colors">
          <span className="text-sm">👨‍💻</span>
          <span className="text-xs text-emerald-300/70">Built &amp; Developed by</span>
          <span className="text-xs font-bold text-white tracking-wide">Gangadhar Peramasani</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;