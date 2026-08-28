import React, { useState, useEffect } from 'react';
import { useNavigate } from '../router';
import { ArrowLeft, Download, Filter, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import { store } from '../store';
import { GuruRecord } from '../types';

export default function DataGuru() {
  const navigate = useNavigate();
  const [data, setData] = useState<GuruRecord[]>([]);
  const [filterJenjang, setFilterJenjang] = useState<string>('All');
  const [filterTingkat, setFilterTingkat] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    store.getGuru()
      .then(setData)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredData = data.filter(item => {
    const matchJenjang = filterJenjang === 'All' || item.jenjang === filterJenjang;
    const matchTingkat = filterTingkat === 'All' || item.tingkat === filterTingkat;
    return matchJenjang && matchTingkat;
  });

  const handleExportCSV = () => {
    if (filteredData.length === 0) return;
    
    const headers = ['No', 'Jenjang', 'KKM', 'Nama Madrasah', 'NSM', 'Nama Guru', 'L/P', 'Prestasi', 'Ket. Prestasi', 'Tingkat', 'Tanggal', 'Penyelenggara', 'Sertifikat'];
    
    const escapeCsv = (str: string) => {
      if (str === null || str === undefined) return '""';
      const safeStr = String(str).replace(/"/g, '""');
      return `"${safeStr}"`;
    };
    
    const rows = filteredData.map((item, index) => [
      index + 1,
      escapeCsv(item.jenjang),
      escapeCsv(item.kkm),
      escapeCsv(item.namaMadrasah),
      escapeCsv(item.nsm),
      escapeCsv(item.namaGuru),
      escapeCsv(item.jenisKelamin === 'Laki-laki' ? 'L' : 'P'),
      escapeCsv(item.prestasi),
      escapeCsv(item.keteranganPrestasi || ''),
      escapeCsv(item.tingkat),
      escapeCsv(item.tanggalPelaksanaan),
      escapeCsv(item.penyelenggara),
      escapeCsv(item.sertifikatLink || '')
    ]);

    // Use semicolon for Indonesian locale Excel compatibility and add UTF-8 BOM
    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Data_Prestasi_Guru_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Header title="Detail Prestasi Guru" />
      
      <main className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
          </button>
          
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <Filter className="w-4 h-4" /> Filter:
          </div>
          <select 
            value={filterJenjang} 
            onChange={(e) => setFilterJenjang(e.target.value)}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="All">Semua Jenjang</option>
            <option value="RA">RA</option>
            <option value="MI">MI</option>
            <option value="MTs">MTs</option>
            <option value="MA">MA</option>
          </select>

          <select 
            value={filterTingkat} 
            onChange={(e) => setFilterTingkat(e.target.value)}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="All">Semua Tingkat</option>
            <option value="Kabupaten">Kabupaten</option>
            <option value="Regional">Regional</option>
            <option value="Provinsi">Provinsi</option>
            <option value="Nasional">Nasional</option>
          </select>
          
          <div className="ml-auto text-sm text-slate-500">
            Total Data: <strong>{filteredData.length}</strong>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-sky-500 animate-spin mb-4" />
                <p className="text-slate-500 font-medium animate-pulse">Memuat data dari Spreadsheet...</p>
              </div>
            ) : (
              <table className="w-full text-sm text-left animate-in fade-in duration-500">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">No</th>
                    <th className="px-4 py-3">Jenjang</th>
                    <th className="px-4 py-3 min-w-[200px]">Madrasah</th>
                    <th className="px-4 py-3 min-w-[200px]">Nama Guru</th>
                    <th className="px-4 py-3">Prestasi</th>
                    <th className="px-4 py-3">Tingkat</th>
                    <th className="px-4 py-3 min-w-[120px]">Tanggal</th>
                    <th className="px-4 py-3">Penyelenggara</th>
                    <th className="px-4 py-3">Sertifikat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.length > 0 ? (
                    filteredData.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">{idx + 1}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{item.jenjang}</td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-slate-800">{item.namaMadrasah}</div>
                          <div className="text-xs text-slate-500">NSM: {item.nsm}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-slate-800">{item.namaGuru}</div>
                          <div className="text-xs text-slate-500">{item.jenisKelamin}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sky-600 font-medium">
                            {item.prestasi === 'Keterangan' ? item.keteranganPrestasi : item.prestasi}
                          </div>
                        </td>
                        <td className="px-4 py-3">{item.tingkat}</td>
                        <td className="px-4 py-3 text-slate-500">{item.tanggalPelaksanaan}</td>
                        <td className="px-4 py-3 text-slate-600">{item.penyelenggara}</td>
                        <td className="px-4 py-3 text-slate-600">
                          {item.sertifikatLink ? (
                            <a href={item.sertifikatLink} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">Lihat Sertifikat</a>
                          ) : '-'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                        Belum ada data prestasi guru
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
