import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('kkp_admin_token');
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  // Resolution Modal state
  const [modalItem, setModalItem] = useState(null); // ఏ complaint కోసం modal ఓపెన్ అయ్యిందో
  const [resolutionNote, setResolutionNote] = useState('');
  const [resolutionPhoto, setResolutionPhoto] = useState(null);
  const [resolutionPreview, setResolutionPreview] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('kkp_admin_token');
    navigate('/login');
  };

  const fetchComplaints = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://kattakindapalli-connect.onrender.com/api/complaints', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('kkp_admin_token');
        navigate('/login');
        return;
      }

      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      setError('సర్వర్‌తో కనెక్ట్ కాలేకపోయాం.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchComplaints();
  }, []);

  // "పరిశీలనలోకి మార్చు (In Progress)" - direct గా మారుతుంది, modal అవసరం లేదు
  const handleQuickStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`https://kattakindapalli-connect.onrender.com/api/complaints/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const updated = await res.json();
      setComplaints((prev) => prev.map((c) => (c._id === id ? updated : c)));
    } catch (err) {
      setError('స్టేటస్ అప్‌డేట్ కాలేదు.');
    } finally {
      setUpdatingId(null);
    }
  };

  // "పరిష్కరించబడింది" బటన్ నొక్కితే - Modal ఓపెన్ అవుతుంది
  const openResolveModal = (item) => {
    setModalItem(item);
    setResolutionNote('');
    setResolutionPhoto(null);
    setResolutionPreview(null);
  };

  const closeModal = () => {
    setModalItem(null);
    setResolutionNote('');
    setResolutionPhoto(null);
    setResolutionPreview(null);
  };

  const handleResolutionPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResolutionPhoto(file);
      setResolutionPreview(URL.createObjectURL(file));
    }
  };

  // Modal లో "Submit" నొక్కినప్పుడు - status + note + photo అన్నీ ఒకేసారి పంపడం
  const handleResolveSubmit = async (e) => {
    e.preventDefault();
    if (!modalItem) return;

    setUpdatingId(modalItem._id);
    try {
      const data = new FormData();
      data.append('status', 'Resolved');
      data.append('resolutionNote', resolutionNote);
      if (resolutionPhoto) data.append('resolutionPhoto', resolutionPhoto);

      const res = await fetch(`https://kattakindapalli-connect.onrender.com/api/complaints/${modalItem._id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      const updated = await res.json();
      setComplaints((prev) => prev.map((c) => (c._id === modalItem._id ? updated : c)));
      closeModal();
    } catch (err) {
      setError('పరిష్కారం సమర్పించడంలో పొరపాటు జరిగింది.');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredComplaints = complaints.filter((item) => {
    if (filter === 'All') return true;
    return item.status === filter;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              అధికారిక లాగిన్ (Admin Panel)
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
              సర్పంచ్ సమస్యల నిర్వహణ డాష్‌బోర్డ్
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              గ్రామ ప్రజలు నమోదు చేసిన ఫిర్యాదులను పరిశీలించి, వాటి స్థితిని అప్‌డేట్ చేయండి.
            </p>
          </div>

          <div className="flex gap-3 items-start flex-wrap">
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm text-center">
              <p className="text-xs text-slate-500 font-bold">మొత్తం</p>
              <p className="text-xl font-black text-slate-900">{complaints.length}</p>
            </div>
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm text-center">
              <p className="text-xs text-amber-600 font-bold">పరిశీలనలో</p>
              <p className="text-xl font-black text-amber-600">
                {complaints.filter((c) => c.status === 'Pending' || c.status === 'In Progress').length}
              </p>
            </div>
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm text-center">
              <p className="text-xs text-emerald-600 font-bold">పరిష్కరించినవి</p>
              <p className="text-xl font-black text-emerald-600">
                {complaints.filter((c) => c.status === 'Resolved').length}
              </p>
            </div>
            <button
              onClick={fetchComplaints}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-sm h-full"
            >
              🔄 రిఫ్రెష్
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-sm h-full"
            >
              🚪 లాగ్ అవుట్
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-2xl text-center text-sm font-semibold mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['All', 'Pending', 'In Progress', 'Resolved'].map((statusOption) => (
            <button
              key={statusOption}
              onClick={() => setFilter(statusOption)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filter === statusOption
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {statusOption === 'All' ? 'అన్ని ఫిర్యాదులు' : statusOption}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
            <p className="text-sm text-slate-500">లోడ్ అవుతోంది...</p>
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
            <p className="text-4xl mb-2">📭</p>
            <h3 className="text-lg font-bold text-slate-800">ఫిర్యాదులు ఏవీ లేవు</h3>
            <p className="text-sm text-slate-500 mt-1">ఈ కేటగిరీలో ఎలాంటి ఫిర్యాదులు నమోదు కాలేదు.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComplaints.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {item.photoUrl && (
                  <img
                    src={`http://localhost:5000${item.photoUrl}`}
                    alt="Complaint"
                    className="w-full md:w-32 h-32 object-cover rounded-2xl border border-slate-200 shrink-0"
                  />
                )}

                {item.selfieUrl && (
                  <img
                 src={`http://localhost:5000${item.selfieUrl}`}
                 alt="Selfie"
                 className="w-full md:w-32 h-32 object-cover rounded-2xl border border-slate-200 shrink-0"
                />
               )}

                <div className="space-y-2 flex-grow">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="bg-slate-100 border border-slate-300 text-slate-800 font-black text-xs px-3 py-1 rounded-lg break-all">
                      #{item._id}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      📅 {item.createdAt ? new Date(item.createdAt).toLocaleDateString('te-IN') : ''}
                    </span>
                  </div>

                  <div className="text-sm text-slate-800 font-semibold">
                    👤 {item.reporterName} &nbsp;|&nbsp; 📞 {item.reporterPhone} &nbsp;|&nbsp; 📍 వార్డు: {item.wardNumber} ({item.location})
                  </div>

                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{item.description}"
                  </p>

                  {/* Resolution info ఉంటే చూపించడం */}
                  {item.status === 'Resolved' && (item.resolutionNote || item.resolutionPhotoUrl) && (
                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl space-y-2">
                      <p className="text-xs font-bold text-emerald-700 uppercase">✅ పరిష్కార వివరాలు</p>
                      {item.resolutionNote && (
                        <p className="text-sm text-emerald-900">{item.resolutionNote}</p>
                      )}
                      {item.resolutionPhotoUrl && (
                        <img
                          src={`http://localhost:5000${item.resolutionPhotoUrl}`}
                          alt="Resolution"
                          className="w-full max-w-xs h-32 object-cover rounded-xl border border-emerald-200"
                        />
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-[200px] justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                  <div className="text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : item.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}
                    >
                      ● {item.status}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <button
                      disabled={updatingId === item._id || item.status === 'In Progress' || item.status === 'Resolved'}
                      onClick={() => handleQuickStatusChange(item._id, 'In Progress')}
                      className="text-xs font-bold bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white py-1.5 px-3 rounded-xl transition-all shadow-xs"
                    >
                      పరిశీలనలోకి మార్చు (In Progress)
                    </button>
                    <button
                      disabled={updatingId === item._id || item.status === 'Resolved'}
                      onClick={() => openResolveModal(item)}
                      className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-1.5 px-3 rounded-xl transition-all shadow-xs"
                    >
                      పరిష్కరించబడింది (Resolved)
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resolution Modal */}
      {modalItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">పరిష్కార వివరాలు నమోదు చేయండి</h2>
              <p className="text-xs text-slate-500 mt-1">
                టికెట్ #{modalItem._id} — ఈ ఫిర్యాదుని "Resolved" గా మార్చే ముందు వివరాలు ఇవ్వండి.
              </p>
            </div>

            <form onSubmit={handleResolveSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1">
                  పరిష్కారం ఎలా చేశారో వివరించండి *
                </label>
                <textarea
                  required
                  rows="3"
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder="ఉదా: వీధి లైట్ రిపేర్ చేయబడింది, కొత్త బల్బ్ వేయబడింది."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1">
                  పరిష్కారం ఫోటో (ఆప్షనల్)
                </label>
                {resolutionPreview ? (
                  <div className="relative border-2 border-emerald-300 rounded-2xl p-3 bg-emerald-50">
                    <img src={resolutionPreview} alt="Preview" className="w-full h-40 object-cover rounded-xl" />
                    <button
                      type="button"
                      onClick={() => { setResolutionPhoto(null); setResolutionPreview(null); }}
                      className="mt-2 text-xs font-bold text-red-600 hover:text-red-700 bg-white px-3 py-1 rounded-lg border border-red-200"
                    >
                      ✕ తీసివేయండి
                    </button>
                  </div>
                ) : (
                  <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-5 text-center bg-slate-50 hover:bg-slate-100 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleResolutionPhotoChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="text-2xl mb-1">📸</div>
                    <p className="text-xs text-slate-600">పరిష్కారం అయిన ఫోటో అప్‌లోడ్ చేయండి</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl text-sm"
                >
                  రద్దు చేయి
                </button>
                <button
                  type="submit"
                  disabled={updatingId === modalItem._id}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold py-3 rounded-2xl text-sm"
                >
                  {updatingId === modalItem._id ? 'సమర్పిస్తోంది...' : 'నిర్ధారించు & పరిష్కరించు'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
