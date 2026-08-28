import React from 'react';
import { useNavigate } from '../router';
import { Users, GraduationCap, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';

export default function FormSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header title="Pilih Form Pendataan" />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate('/form-siswa')}
            className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group"
          >
            <div className="bg-emerald-50 text-emerald-600 p-6 rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Users className="w-12 h-12" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-800">Prestasi Siswa</h2>
              <p className="text-slate-500 mt-2">Formulir pendataan prestasi untuk siswa RA, MI, MTs, dan MA</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/form-guru')}
            className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group"
          >
            <div className="bg-sky-50 text-sky-600 p-6 rounded-full group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <GraduationCap className="w-12 h-12" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-800">Prestasi Guru</h2>
              <p className="text-slate-500 mt-2">Formulir pendataan prestasi untuk guru RA, MI, MTs, dan MA</p>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
