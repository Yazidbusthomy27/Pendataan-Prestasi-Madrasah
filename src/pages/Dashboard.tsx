import React, { useEffect, useState } from 'react';
import { useNavigate } from '../router';
import { Users, GraduationCap, ArrowLeft, BarChart3, ChevronRight, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import { store } from '../store';
import { SiswaRecord, GuruRecord, Jenjang } from '../types';

export default function Dashboard() {
  const navigate = useNavigate();
  const [dataSiswa, setDataSiswa] = useState<SiswaRecord[]>([]);
  const [dataGuru, setDataGuru] = useState<GuruRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([store.getSiswa(), store.getGuru()])
      .then(([siswa, guru]) => {
        setDataSiswa(siswa);
        setDataGuru(guru);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getSiswaByJenjang = (jenjang: Jenjang) => dataSiswa.filter(d => d.jenjang === jenjang).length;
  const getGuruByJenjang = (jenjang: Jenjang) => dataGuru.filter(d => d.jenjang === jenjang).length;

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Header title="Dashboard Admin" />
      
      <main className="max-w-5xl mx-auto px-4 mt-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Keluar
        </button>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
            <p className="text-slate-500 font-medium animate-pulse">Sinkronisasi dengan Spreadsheet...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-8 animate-in fade-in zoom-in-95 duration-500">
            {/* Card Total Siswa */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-emerald-100 p-4 rounded-full text-emerald-600">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-slate-500 text-sm font-medium">Total Prestasi Siswa</h3>
                  <p className="text-3xl font-bold text-slate-800">{dataSiswa.length}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-6 text-center">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">RA</p>
                  <p className="text-lg font-bold text-emerald-600">{getSiswaByJenjang('RA')}</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">MI</p>
                  <p className="text-lg font-bold text-emerald-600">{getSiswaByJenjang('MI')}</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">MTs</p>
                  <p className="text-lg font-bold text-emerald-600">{getSiswaByJenjang('MTs')}</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">MA</p>
                  <p className="text-lg font-bold text-emerald-600">{getSiswaByJenjang('MA')}</p>
                </div>
              </div>

              <button 
                onClick={() => navigate('/data-siswa')}
                className="w-full flex items-center justify-between px-4 py-3 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors font-medium text-sm"
              >
                Lihat Detail Data Siswa
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Card Total Guru */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-sky-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-sky-100 p-4 rounded-full text-sky-600">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-slate-500 text-sm font-medium">Total Prestasi Guru</h3>
                  <p className="text-3xl font-bold text-slate-800">{dataGuru.length}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-6 text-center">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">RA</p>
                  <p className="text-lg font-bold text-sky-600">{getGuruByJenjang('RA')}</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">MI</p>
                  <p className="text-lg font-bold text-sky-600">{getGuruByJenjang('MI')}</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">MTs</p>
                  <p className="text-lg font-bold text-sky-600">{getGuruByJenjang('MTs')}</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">MA</p>
                  <p className="text-lg font-bold text-sky-600">{getGuruByJenjang('MA')}</p>
                </div>
              </div>

              <button 
                onClick={() => navigate('/data-guru')}
                className="w-full flex items-center justify-between px-4 py-3 bg-sky-50 text-sky-700 rounded-xl hover:bg-sky-100 transition-colors font-medium text-sm"
              >
                Lihat Detail Data Guru
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
