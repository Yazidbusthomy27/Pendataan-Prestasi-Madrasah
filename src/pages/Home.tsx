import React, { useState } from 'react';
import { useNavigate } from '../router';
import { Lock, FileEdit, Landmark } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Jember') {
      navigate('/dashboard');
    } else {
      setError('Password salah');
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-emerald-700 p-8 text-center text-white">
          <div className="mx-auto w-24 h-24 flex items-center justify-center mb-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Kementerian_Agama_new_logo.png" alt="Logo Kemenag" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Pendataan Prestasi Madrasah</h1>
          <p className="text-emerald-100 text-sm">Kantor Kementerian Agama Kabupaten Jember</p>
        </div>
        
        <div className="p-8">
          {!showAdminLogin ? (
            <div className="space-y-4">
              <button
                onClick={() => navigate('/form')}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
              >
                <FileEdit className="w-5 h-5" />
                Form Pendataan Madrasah
              </button>
              
              <button
                onClick={() => setShowAdminLogin(true)}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-medium transition-colors"
              >
                <Lock className="w-5 h-5" />
                Login Admin
              </button>
            </div>
          ) : (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 text-center mb-4">Login Administrator</h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="Masukkan password..."
                  autoFocus
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAdminLogin(false)}
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Masuk
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-emerald-600/80">
        <p>© 2026 Kemenag Kab. Jember</p>
        <p>developed by Langsungklik.id</p>
      </div>
    </div>
  );
}
