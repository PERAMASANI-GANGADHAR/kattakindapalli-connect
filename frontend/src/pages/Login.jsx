import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('https://kattakindapalli-connect.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'లాగిన్ విఫలమైంది.');
        setLoading(false);
        return;
      }

      // టోకెన్‌ని బ్రౌజర్‌లో సేవ్ చేయడం
      localStorage.setItem('kkp_admin_token', data.token);
      navigate('/admin');
    } catch (err) {
      setError('సర్వర్‌తో కనెక్ట్ కాలేకపోయాం. Backend రన్ అవుతుందో చెక్ చేయండి.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-sm w-full bg-white rounded-3xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            అధికారిక లాగిన్
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-3">సర్పంచ్ లాగిన్</h1>
          <p className="text-xs text-slate-500 mt-1">Admin Dashboard యాక్సెస్ చేయడానికి లాగిన్ అవ్వండి</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-xl text-sm font-semibold text-center">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1">యూజర్‌నేమ్</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1">పాస్‌వర్డ్</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-extrabold py-3 rounded-2xl shadow-md transition-all"
          >
            {loading ? 'లాగిన్ అవుతోంది...' : 'లాగిన్ →'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
