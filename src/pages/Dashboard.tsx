import React, { useEffect, useState } from 'react';
import { useNavigate } from '../router';
import { Users, GraduationCap, ArrowLeft, BarChart3, ChevronRight, Loader2, UserCircle, Building2, Trophy } from 'lucide-react';
import Header from '../components/Header';
import { store } from '../store';
import { SiswaRecord, GuruRecord, KepalaRecord, MadrasahRecord, Jenjang } from '../types';

export default function Dashboard() {
  const navigate = useNavigate();
  const [dataSiswa, setDataSiswa] = useState<SiswaRecord[]>([]);
  const [dataGuru, setDataGuru] = useState<GuruRecord[]>([]);
  const [dataKepala, setDataKepala] = useState<KepalaRecord[]>([]);
  const [dataMadrasah, setDataMadrasah] = useState<MadrasahRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'rekap' | 'penilaian'>('rekap');
  const [leaderboardJenjang, setLeaderboardJenjang] = useState<Jenjang | 'Semua'>('Semua');
  const [jenisPrestasiFilter, setJenisPrestasiFilter] = useState<'Semua' | 'Akademik' | 'Non Akademik'>('Semua');

  useEffect(() => {
    setIsLoading(true);
    Promise.all([store.getSiswa(), store.getGuru(), store.getKepala(), store.getMadrasah()])
      .then(([siswa, guru, kepala, madrasah]) => {
        setDataSiswa(siswa);
        setDataGuru(guru);
        setDataKepala(kepala);
        setDataMadrasah(madrasah);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredSiswa = React.useMemo(() => dataSiswa.filter(d => jenisPrestasiFilter === 'Semua' || d.jenisPrestasi === jenisPrestasiFilter), [dataSiswa, jenisPrestasiFilter]);
  const filteredGuru = React.useMemo(() => dataGuru.filter(d => jenisPrestasiFilter === 'Semua' || d.jenisPrestasi === jenisPrestasiFilter), [dataGuru, jenisPrestasiFilter]);
  const filteredKepala = React.useMemo(() => dataKepala.filter(d => jenisPrestasiFilter === 'Semua' || d.jenisPrestasi === jenisPrestasiFilter), [dataKepala, jenisPrestasiFilter]);
  const filteredMadrasah = React.useMemo(() => dataMadrasah.filter(d => jenisPrestasiFilter === 'Semua' || d.jenisPrestasi === jenisPrestasiFilter), [dataMadrasah, jenisPrestasiFilter]);

  const getSiswaByJenjang = (jenjang: Jenjang) => filteredSiswa.filter(d => d.jenjang === jenjang).length;
  const getGuruByJenjang = (jenjang: Jenjang) => filteredGuru.filter(d => d.jenjang === jenjang).length;
  const getKepalaByJenjang = (jenjang: Jenjang) => filteredKepala.filter(d => d.jenjang === jenjang).length;
  const getMadrasahByJenjang = (jenjang: Jenjang) => filteredMadrasah.filter(d => d.jenjang === jenjang).length;

  const getScore = (tingkat: string, prestasi: string): number => {
    if (!prestasi || typeof prestasi !== 'string') return 0;
    const isHarapan = prestasi.startsWith('Harapan');
    if (tingkat === 'Internasional') {
      if (prestasi === 'Juara 1') return 60;
      if (prestasi === 'Juara 2') return 50;
      if (prestasi === 'Juara 3') return 40;
      if (isHarapan) return 30;
    }
    if (tingkat === 'Nasional') {
      if (prestasi === 'Juara 1') return 50;
      if (prestasi === 'Juara 2') return 40;
      if (prestasi === 'Juara 3') return 30;
      if (isHarapan) return 20;
    }
    if (tingkat === 'Provinsi') {
      if (prestasi === 'Juara 1') return 40;
      if (prestasi === 'Juara 2') return 30;
      if (prestasi === 'Juara 3') return 20;
      if (isHarapan) return 10;
    }
    if (tingkat === 'Regional') {
      if (prestasi === 'Juara 1') return 30;
      if (prestasi === 'Juara 2') return 20;
      if (prestasi === 'Juara 3') return 10;
      if (isHarapan) return 5;
    }
    if (tingkat === 'Kabupaten') {
      if (prestasi === 'Juara 1') return 20;
      if (prestasi === 'Juara 2') return 10;
      if (prestasi === 'Juara 3') return 5;
      if (isHarapan) return 2;
    }
    return 0;
  };

  const leaderboard = React.useMemo(() => {
    const scores: Record<string, { namaMadrasah: string, score: number, jenjang: string }> = {};

    const processRecord = (record: SiswaRecord | GuruRecord | KepalaRecord | MadrasahRecord) => {
      if (!record.nsm) return;
      if (!scores[record.nsm]) {
        scores[record.nsm] = { namaMadrasah: record.namaMadrasah, score: 0, jenjang: record.jenjang };
      }
      scores[record.nsm].score += getScore(record.tingkat, record.prestasi);
    };

    filteredSiswa.forEach(processRecord);
    filteredGuru.forEach(processRecord);
    filteredKepala.forEach(processRecord);
    filteredMadrasah.forEach(processRecord);

    return Object.values(scores).sort((a, b) => b.score - a.score);
  }, [filteredSiswa, filteredGuru, filteredKepala, filteredMadrasah]);

  const filteredLeaderboard = React.useMemo(() => {
    if (leaderboardJenjang === 'Semua') return leaderboard;
    return leaderboard.filter(item => item.jenjang === leaderboardJenjang);
  }, [leaderboard, leaderboardJenjang]);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Header title="Dashboard Admin" />
      
      <main className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Keluar
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
            <p className="text-slate-500 font-medium animate-pulse">Sinkronisasi dengan Spreadsheet...</p>
          </div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
                <button
                  onClick={() => setActiveTab('rekap')}
                  className={`px-8 py-3 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'rekap' ? 'bg-slate-800 text-white shadow' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  Rekap Data
                </button>
                <button
                  onClick={() => setActiveTab('penilaian')}
                  className={`px-8 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === 'penilaian' ? 'bg-slate-800 text-white shadow' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  <Trophy className="w-4 h-4" />
                  Penilaian
                </button>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-200">
                <span className="text-sm font-medium text-slate-700">Filter Prestasi:</span>
                <select 
                  value={jenisPrestasiFilter}
                  onChange={(e) => setJenisPrestasiFilter(e.target.value as any)}
                  className="bg-transparent text-slate-700 text-sm focus:ring-0 outline-none font-semibold cursor-pointer"
                >
                  <option value="Semua">Semua Jenis</option>
                  <option value="Akademik">Akademik</option>
                  <option value="Non Akademik">Non Akademik</option>
                </select>
              </div>
            </div>

            {activeTab === 'rekap' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card Total Siswa */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-200 flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-emerald-100 p-4 rounded-full text-emerald-600">
                      <Users className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-slate-500 text-sm font-medium">Prestasi Siswa</h3>
                      <p className="text-3xl font-bold text-slate-800">{filteredSiswa.length}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mb-6 text-center mt-auto">
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
                    Lihat Detail
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Card Total Guru */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-sky-200 flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-sky-100 p-4 rounded-full text-sky-600">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-slate-500 text-sm font-medium">Prestasi Guru</h3>
                      <p className="text-3xl font-bold text-slate-800">{filteredGuru.length}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mb-6 text-center mt-auto">
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
                    Lihat Detail
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Card Total Kepala */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-200 flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-amber-100 p-4 rounded-full text-amber-600">
                      <UserCircle className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-slate-500 text-sm font-medium">Prestasi Kepala</h3>
                      <p className="text-3xl font-bold text-slate-800">{filteredKepala.length}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mb-6 text-center mt-auto">
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 font-medium">RA</p>
                      <p className="text-lg font-bold text-amber-600">{getKepalaByJenjang('RA')}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 font-medium">MI</p>
                      <p className="text-lg font-bold text-amber-600">{getKepalaByJenjang('MI')}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 font-medium">MTs</p>
                      <p className="text-lg font-bold text-amber-600">{getKepalaByJenjang('MTs')}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 font-medium">MA</p>
                      <p className="text-lg font-bold text-amber-600">{getKepalaByJenjang('MA')}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/data-kepala')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-amber-50 text-amber-700 rounded-xl hover:bg-amber-100 transition-colors font-medium text-sm"
                  >
                    Lihat Detail
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Card Total Madrasah */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-200 flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-purple-100 p-4 rounded-full text-purple-600">
                      <Building2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-slate-500 text-sm font-medium">Prestasi Lembaga</h3>
                      <p className="text-3xl font-bold text-slate-800">{filteredMadrasah.length}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mb-6 text-center mt-auto">
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 font-medium">RA</p>
                      <p className="text-lg font-bold text-purple-600">{getMadrasahByJenjang('RA')}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 font-medium">MI</p>
                      <p className="text-lg font-bold text-purple-600">{getMadrasahByJenjang('MI')}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 font-medium">MTs</p>
                      <p className="text-lg font-bold text-purple-600">{getMadrasahByJenjang('MTs')}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 font-medium">MA</p>
                      <p className="text-lg font-bold text-purple-600">{getMadrasahByJenjang('MA')}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/data-madrasah')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors font-medium text-sm"
                  >
                    Lihat Detail
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'penilaian' && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden max-w-5xl mx-auto">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                        <Trophy className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">Klasemen Madrasah Berprestasi</h3>
                        <p className="text-slate-500 font-medium">Peringkat berdasarkan akumulasi nilai di seluruh kategori</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                      {(['Semua', 'RA', 'MI', 'MTs', 'MA'] as const).map(jenj => (
                        <button
                          key={jenj}
                          onClick={() => setLeaderboardJenjang(jenj)}
                          className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                            leaderboardJenjang === jenj
                              ? 'bg-white text-blue-600 shadow-sm'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {jenj}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="py-4 px-6 text-sm font-semibold text-slate-500 w-20 text-center">Peringkat</th>
                          <th className="py-4 px-6 text-sm font-semibold text-slate-500">Nama Madrasah</th>
                          <th className="py-4 px-6 text-sm font-semibold text-slate-500">Jenjang</th>
                          <th className="py-4 px-6 text-sm font-semibold text-slate-500 text-right">Total Poin</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredLeaderboard.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-12 text-center text-slate-500">
                              Belum ada data prestasi untuk dinilai.
                            </td>
                          </tr>
                        ) : (
                          filteredLeaderboard.map((item, index) => (
                            <tr key={index} className="hover:bg-slate-50/80 transition-colors group">
                              <td className="py-4 px-6 text-center font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                                {index === 0 ? (
                                  <div className="bg-amber-100 text-amber-600 w-8 h-8 rounded-full flex items-center justify-center mx-auto text-lg">1</div>
                                ) : index === 1 ? (
                                  <div className="bg-slate-200 text-slate-600 w-8 h-8 rounded-full flex items-center justify-center mx-auto text-lg">2</div>
                                ) : index === 2 ? (
                                  <div className="bg-orange-100 text-orange-700 w-8 h-8 rounded-full flex items-center justify-center mx-auto text-lg">3</div>
                                ) : (
                                  index + 1
                                )}
                              </td>
                              <td className="py-4 px-6 font-semibold text-slate-800 text-lg">
                                {item.namaMadrasah}
                              </td>
                              <td className="py-4 px-6">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                  {item.jenjang}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-right font-bold text-emerald-600 text-2xl">
                                {item.score}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
