import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const ReportProblem = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: categoryFromUrl || 'Water',
    wardNumber: '',
    location: '',
    description: '',
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [selfiePreview, setSelfiePreview] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('kkp_user_info');
    if (savedUser) {
      try {
        const { name, phone } = JSON.parse(savedUser);
        setFormData((prev) => ({ ...prev, name: name || '', phone: phone || '' }));
      } catch (e) {}
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('ఫోటో సైజ్ 5MB కంటే తక్కువ ఉండాలి.');
        return;
      }
      setError('');
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleSelfieUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('సెల్ఫీ సైజ్ 5MB కంటే తక్కువ ఉండాలి.');
        return;
      }
      setError('');
      setSelfieFile(file);
      setSelfiePreview(URL.createObjectURL(file));
    }
  };

  const removeSelfie = () => {
    setSelfieFile(null);
    setSelfiePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreed) {
      setError('దయచేసి డిక్లరేషన్ చెక్‌బాక్స్‌ని ఎంచుకోండి.');
      return;
    }
    if (formData.phone.length !== 10) {
      setError('దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.');
      return;
    }
    if (!selfieFile) {
      setError('సెల్ఫీ తప్పనిసరి. మా గ్రామ ప్రజల ఫిర్యాదులు మాత్రమే పరిగణించబడతాయి.');
      return;
    }

    localStorage.setItem('kkp_user_info', JSON.stringify({ name: formData.name, phone: formData.phone }));

    const data = new FormData();
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('wardNumber', formData.wardNumber);
    data.append('reporterName', formData.name);
    data.append('reporterPhone', formData.phone);
    if (photoFile) data.append('photo', photoFile);
    if (selfieFile) data.append('selfie', selfieFile);

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();

      if (!res.ok) {
        setError(result.message || 'ఫిర్యాదు సబ్మిట్ కాలేదు, మళ్ళీ ప్రయత్నించండి.');
        setLoading(false);
        return;
      }

      setSubmittedId(result.complaint._id);
    } catch (err) {
      setError('సర్వర్‌తో కనెక్ట్ కాలేకపోయాం. Backend రన్ అవుతుందో చెక్ చేయండి.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewComplaint = () => {
    setSubmittedId(null);
    setAgreed(false);
    setPhotoFile(null);
    setPhotoPreview(null);
    setSelfieFile(null);
    setSelfiePreview(null);
    setFormData((prev) => ({
      name: prev.name,
      phone: prev.phone,
      category: 'Water',
      wardNumber: '',
      location: '',
      description: '',
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            గ్రామ ఫిర్యాదుల కేంద్రం
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-3">
            సమస్యను సర్పంచ్‌కి రిపోర్ట్ చేయండి
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            మీ గ్రామలోని సమస్యను ఫోటోతో సహా పంపండి. సర్పంచ్ గారు వెంటనే పరిశీలిస్తారు.
          </p>
        </div>

        {submittedId ? (
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              ✅
            </div>
            <h2 className="text-2xl font-bold text-slate-900">ఫిర్యాదు విజయవంతంగా నమోదైంది!</h2>
            <p className="text-slate-600 text-sm mt-2">మీ ఫిర్యాదు నంబరు (Complaint Ticket ID):</p>
            <div className="inline-block bg-white border-2 border-emerald-500 text-emerald-700 text-sm sm:text-lg font-black px-6 py-2 rounded-xl mt-3 shadow-sm break-all">
              #{submittedId}
            </div>
            <p className="text-xs text-slate-500 mt-4">
              ⚠️ ఈ నంబర్‌ను స్క్రీన్‌షాట్ తీసుకోండి — ట్రాకింగ్ పేజీలో స్టేటస్ చెక్ చేసుకోవడానికి ఇది అవసరం.
            </p>
            <button
              onClick={handleNewComplaint}
              className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 px-6 rounded-xl transition-all"
            >
              మరోక ఫిర్యాదు నమోదు చేయండి
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">

            {formData.name && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-sm text-emerald-800 font-semibold">
                👋 స్వాగతం, {formData.name}!
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-300 rounded-xl p-3 text-sm text-red-700 font-semibold">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">సమస్య కేటగిరీ (Category) *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="Water">🚰 మంచి నీటి సమస్య (Water Supply)</option>
                <option value="Street Lights">💡 వీధి దీపాలు (Street Lights)</option>
                <option value="Roads & Drainage">🛣️ రోడ్లు & డ్రైనేజ్ (Roads & Drainage)</option>
                <option value="Garbage & Sanitation">🗑️ చెత్త పారిశుధ్యం (Garbage & Sanitation)</option>
                <option value="Others">⚠️ ఇతర సమస్యలు (Others)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1">మీ పేరు (Name) *</label>
                <input
                  type="text" name="name" required
                  placeholder="ఉదా: Peramasani Gangadhar"
                  value={formData.name} onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1">మొబైల్ నంబర్ (Mobile) *</label>
                <input
                  type="tel" name="phone" required maxLength="10"
                  placeholder="9666964421"
                  value={formData.phone} onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1">వార్డు నంబర్ *</label>
                <input
                  type="text" name="wardNumber" required
                  placeholder="eg: Ward 3"
                  value={formData.wardNumber} onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-slate-800 mb-1">స్థలం/వీధి పేరు (Location) *</label>
                <input
                  type="text" name="location" required
                  placeholder="ఉదా: రామాలయం గుడి దగ్గర"
                  value={formData.location} onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">సమస్య వివరాలు (Problem Description)</label>
              <textarea
                name="description" rows="3" required
                placeholder="సమస్య గురించి క్షుణ్ణంగా రాయండి..."
                value={formData.description} onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">సమస్య ఫోటో అప్‌లోడ్ చేయండి (Upload Photo)</label>

              {photoPreview ? (
                <div className="relative border-2 border-emerald-300 rounded-2xl p-3 bg-emerald-50">
                  <img src={photoPreview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-slate-600 truncate">{photoFile?.name}</p>
                    <button type="button" onClick={removePhoto}
                      className="text-xs font-bold text-red-600 hover:text-red-700 bg-white px-3 py-1 rounded-lg border border-red-200">
                      ✕ తీసివేయండి
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <input type="file" accept="image/*" onChange={handlePhotoUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  <div className="text-3xl mb-1">📸</div>
                  <p className="text-xs text-slate-600">ఫోటో తీయడానికి లేదా అప్‌లోడ్ చేయడానికి ఇక్కడ క్లిక్ చేయండి</p>
                  <p className="text-[10px] text-slate-400 mt-1">గరిష్టం 5MB (JPG, PNG)</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">
                మీ సెల్ఫీ అప్‌లోడ్ చేయండి (Selfie) *
              </label>
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-2">
                ⚠️ మా గ్రామ ప్రజల ఫిర్యాదులు మాత్రమే పరిగణించబడతాయి. దయచేసి మీ ముఖం స్పష్టంగా కనిపించేలా సెల్ఫీ తీయండి.
              </p>

              {selfiePreview ? (
                <div className="relative border-2 border-emerald-300 rounded-2xl p-3 bg-emerald-50">
                  <img src={selfiePreview} alt="Selfie Preview" className="w-full h-48 object-cover rounded-xl" />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-slate-600 truncate">{selfieFile?.name}</p>
                    <button type="button" onClick={removeSelfie}
                      className="text-xs font-bold text-red-600 hover:text-red-700 bg-white px-3 py-1 rounded-lg border border-red-200">
                      ✕ తీసివేయండి
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <input type="file" accept="image/*" capture="user" onChange={handleSelfieUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  <div className="text-3xl mb-1">🤳</div>
                  <p className="text-xs text-slate-600">సెల్ఫీ తీయడానికి ఇక్కడ క్లిక్ చేయండి</p>
                  <p className="text-[10px] text-slate-400 mt-1">గరిష్టం 5MB (JPG, PNG)</p>
                </div>
              )}
            </div>

            <div className="flex items-start gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3">
              <input type="checkbox" id="declaration" checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-emerald-600 cursor-pointer" />
              <label htmlFor="declaration" className="text-xs text-slate-600 cursor-pointer">
                నేను పైన ఇచ్చిన సమాచారం నిజమైనదని ధృవీకరిస్తున్నాను. తప్పుడు ఫిర్యాదులు నమోదు చేయడం నేరమని నాకు తెలుసు.
              </label>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-md transition-all cursor-pointer">
              {loading ? 'పంపుతోంది...' : 'సర్పంచ్‌కి ఫిర్యాదు పంపండి (Submit) →'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default ReportProblem;