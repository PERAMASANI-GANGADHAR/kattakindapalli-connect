import React, { useState } from 'react';

const TrackComplaint = () => {
  const [searchKey, setSearchKey] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
  e.preventDefault();
  if (!searchKey.trim()) return;

  const cleanKey = searchKey.trim().replace('#', '');
  setSearched(true);
  setError('');
  setSelectedTicket(null);
  setLoading(true);

  try {
    // ముందు ID తో ట్రై చేయడం
    const idRes = await fetch(`https://kattakindapalli-connect.onrender.com/api/complaints/${cleanKey}`);
    if (idRes.ok) {
      const data = await idRes.json();
      setSelectedTicket(data);
      setLoading(false);
      return;
    }

    // ID తో దొరకకపోతే, పబ్లిక్ phone-search API వాడటం
    const phoneRes = await fetch(`https://kattakindapalli-connect.onrender.com/api/complaints/search/phone/${cleanKey}`);
    const results = await phoneRes.json();
    setSelectedTicket(results && results.length > 0 ? results[0] : null);
  } catch (err) {
    setError('సర్వర్‌తో కనెక్ట్ కాలేకపోయాం. Backend రన్ అవుతుందో చెక్ చేయండి.');
  } finally {
    setLoading(false);
  }
};

  // స్టేటస్ స్టెప్స్ (బ్యాకెండ్ enum: Pending, In Progress, Resolved)
  const steps = [
    { label: 'ఫిర్యాదు నమోదైంది', key: 'Pending', icon: '📝' },
    { label: 'పని జరుగుతోంది', key: 'In Progress', icon: '🛠️' },
    { label: 'పరిష్కారమైంది', key: 'Resolved', icon: '✅' }
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case 'Pending': return 0;
      case 'In Progress': return 1;
      case 'Resolved': return 2;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        {/* హెడర్ విభాగం */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            లైవ్ స్టేటస్ ట్రాకింగ్
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-3">
            మీ ఫిర్యాదు స్థితిని తెలుసుకోండి
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            మీ టికెట్ ID లేదా మొబైల్ నంబర్ నమోదు చేసి సెర్చ్ చేయండి.
          </p>
        </div>

        {/* సెర్చ్ ఫామ్ */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
            <input
              type="text"
              placeholder="టికెట్ ID లేదా మొబైల్ నంబర్ ఎంటర్ చేయండి"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="w-full bg-transparent px-4 py-2 text-sm font-semibold outline-none text-slate-800"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shrink-0"
            >
              {loading ? 'వెతుకుతోంది...' : '🔍 సెర్చ్'}
            </button>
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-2xl text-center text-sm font-semibold mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* ఫిర్యాదు లభించనప్పుడు */}
        {searched && !loading && !selectedTicket && !error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-center text-sm font-semibold">
            ఈ ID లేదా నంబర్‌తో ఏ ఫిర్యాదు వివరాలూ లభించలేదు. దయచేసి సరైన నంబరు నమోదు చేయండి.
          </div>
        )}

        {/* ఫిర్యాదు వివరాలు & టైమ్‌లైన్ */}
        {selectedTicket && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase">టికెట్ నంబర్</span>
                <h2 className="text-sm sm:text-lg font-black text-emerald-600 break-all">#{selectedTicket._id}</h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 font-bold block">నమోదైన తేదీ</span>
                <span className="text-sm font-semibold text-slate-700">
                  {selectedTicket.createdAt ? new Date(selectedTicket.createdAt).toLocaleDateString('te-IN') : 'ఇటీవల'}
                </span>
              </div>
            </div>

            {/* లైవ్ ప్రాసెస్ టైమ్‌లైన్ */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">ప్రస్తుత స్థితి (Live Status)</h3>
              <div className="grid grid-cols-3 gap-2">
                {steps.map((step, idx) => {
                  const currentIndex = getStepIndex(selectedTicket.status);
                  const isCompleted = idx <= currentIndex;
                  const isCurrent = idx === currentIndex;

                  return (
                    <div
                      key={step.key}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        isCurrent
                          ? 'bg-emerald-50 border-emerald-500 shadow-sm'
                          : isCompleted
                          ? 'bg-slate-50 border-emerald-300 opacity-90'
                          : 'bg-slate-50 border-slate-200 opacity-40'
                      }`}
                    >
                      <div className="text-xl mb-1">{step.icon}</div>
                      <div className={`text-xs font-bold ${isCurrent ? 'text-emerald-700' : 'text-slate-700'}`}>
                        {step.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ఫోటో (ఉంటే) */}
            {selectedTicket.photoUrl && (
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">సమస్య ఫోటో</h3>
                <img
                  src={`https://kattakindapalli-connect.onrender.com${...photoUrl}`}
                  alt="Complaint"
                  className="w-full h-56 object-cover rounded-2xl border border-slate-200"
                />
              </div>
            )}
            {/* సెల్ఫీ (ఉంటే) */}
            {selectedTicket.selfieUrl && (
              <div>
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">ఫిర్యాదు చేసిన వారి సెల్ఫీ</h3>
             <img
             src={`http://localhost:5000${selectedTicket.selfieUrl}`}
             alt="Selfie"
            className="w-full h-56 object-cover rounded-2xl border border-slate-200"
           />
           </div>
        )}
            {/* వివరాల కార్డు */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-xs text-slate-400 font-bold block">ఫిర్యాదు చేసిన వారు</span>
                  <span className="font-bold text-slate-800">{selectedTicket.reporterName} ({selectedTicket.reporterPhone})</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold block">సమస్య కేటగిరీ</span>
                  <span className="font-bold text-slate-800">{selectedTicket.category}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold block">లొకేషన్</span>
                  <span className="font-bold text-slate-800">{selectedTicket.wardNumber} - {selectedTicket.location}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold block">ప్రస్తుత స్టేటస్</span>
                  <span className="font-bold text-emerald-700">{selectedTicket.status}</span>
                </div>
              </div>

              {selectedTicket.description && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-xs text-slate-400 font-bold block">సమస్య వివరాలు:</span>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">{selectedTicket.description}</p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default TrackComplaint;
