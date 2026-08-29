import React from 'react';
import { useNavigate } from '../router';
import { Users, GraduationCap, ArrowLeft, UserCircle, Building2 } from 'lucide-react';
import Header from '../components/Header';

export default function FormSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header title="Pilih Form Pendataan" />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            onClick={() => navigate('/form-siswa')}
            className="flex flex-col items-center justify-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group"
          >
            <div className="bg-emerald-50 text-emerald-600 p-5 rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Users className="w-10 h-10" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-800">Prestasi Siswa</h2>
              <p className="text-slate-500 text-sm mt-2">Formulir prestasi untuk siswa</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/form-guru')}
            className="flex flex-col items-center justify-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-sky-500 hover:shadow-md transition-all group"
          >
            <div className="bg-sky-50 text-sky-600 p-5 rounded-full group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <GraduationCap className="w-10 h-10" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-800">Prestasi Guru</h2>
              <p className="text-slate-500 text-sm mt-2">Formulir prestasi untuk guru</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/form-kepala')}
            className="flex flex-col items-center justify-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all group"
          >
            <div className="bg-amber-50 text-amber-600 p-5 rounded-full group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <UserCircle className="w-10 h-10" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-800">Prestasi Kepala</h2>
              <p className="text-slate-500 text-sm mt-2">Formulir prestasi kepala madrasah</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/form-madrasah')}
            className="flex flex-col items-center justify-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-purple-500 hover:shadow-md transition-all group"
          >
            <div className="bg-purple-50 text-purple-600 p-5 rounded-full group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Building2 className="w-10 h-10" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-800">Prestasi Lembaga</h2>
              <p className="text-slate-500 text-sm mt-2">Formulir prestasi madrasah/lembaga</p>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
