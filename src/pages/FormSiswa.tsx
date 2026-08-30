import React, { useState } from 'react';
import MadrasahSelector from '../components/MadrasahSelector';
import { useNavigate } from '../router';
import { DatabaseMadrasah } from '../types';
import { ArrowLeft, Save, CheckCircle2, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import { store } from '../store';
import { Jenjang, JenisKelamin, Tingkat, SiswaRecord } from '../types';

export default function FormSiswa() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authNsm, setAuthNsm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState<Partial<SiswaRecord>>({
    type: 'siswa'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const record: SiswaRecord = {
        ...(formData as SiswaRecord),
        id: crypto.randomUUID(),
        sertifikatLink: formData.sertifikatLink || '',
        timestamp: Date.now()
      };
      
      await store.addSiswa(record);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/form');
      }, 2000);
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menyimpan data. Pastikan URL Apps Script sudah dikonfigurasi dengan benar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = () => {
    if (!formData.nsm) {
      alert("Pilih madrasah terlebih dahulu!");
      return;
    }
    if (authNsm.trim() === formData.nsm) {
      setIsAuthenticated(true);
    } else {
      alert("NSM yang Anda masukkan salah. Verifikasi gagal.");
      setIsAuthenticated(false);
    }
  };

  const handleMadrasahSelect = (madrasah: DatabaseMadrasah | null) => {
    if (madrasah) {
      setIsAuthenticated(false);
      setAuthNsm('');
      setFormData(prev => ({
        ...prev,
        nsm: madrasah.nsm,
        namaMadrasah: madrasah.nama,
        jenjang: madrasah.jenjang as any,
        kecamatanMadrasah: madrasah.kecamatan,
      }));
    }
  };

  
  if (isSuccess) {
  
  return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm w-full border border-emerald-100">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Berhasil!</h2>
          <p className="text-slate-500">Data prestasi siswa berhasil disimpan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Header title="Input Prestasi Siswa" />
      
      <main className="max-w-3xl mx-auto px-4 mt-8">
        <button 
          onClick={() => navigate('/form')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
            
            {/* Section: Identitas Madrasah */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Identitas Madrasah</h3>
              
              <MadrasahSelector onSelect={handleMadrasahSelect} ringColor="emerald" />
            </div>

            {/* Section: Identitas Siswa */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Identitas Siswa</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap Siswa *</label>
                  <input required type="text" name="namaSiswa" value={formData.namaSiswa || ''} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Kelamin *</label>
                  <select required name="jenisKelamin" value={formData.jenisKelamin || ''} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option value="" disabled>- Pilih -</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section: Detail Prestasi */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Detail Prestasi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Prestasi *</label>
                  <select required name="jenisPrestasi" value={formData.jenisPrestasi || ''} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option value="" disabled>- Pilih Jenis Prestasi -</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Non Akademik">Non Akademik</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pencapaian Prestasi *</label>
                  <select required name="prestasi" value={formData.prestasi || ''} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option value="" disabled>- Pilih -</option>
                    <option value="Juara 1">Juara 1</option>
                    <option value="Juara 2">Juara 2</option>
                    <option value="Juara 3">Juara 3</option>
                    <option value="Harapan 1">Harapan 1</option>
                    <option value="Harapan 2">Harapan 2</option>
                    <option value="Harapan 3">Harapan 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Detail Pencapaian (Contoh: Lomba Tahfidz) *</label>
                  <input required type="text" name="detailPencapaian" value={formData.detailPencapaian || ''} onChange={handleChange} placeholder="Masukkan detail lomba..." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tingkat Kompetisi *</label>
                  <select required name="tingkat" value={formData.tingkat || ''} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option value="" disabled>- Pilih -</option>
                    <option value="Kabupaten">Kabupaten</option>
                    <option value="Regional">Regional</option>
                    <option value="Provinsi">Provinsi</option>
                    <option value="Nasional">Nasional</option>
                    <option value="Internasional">Internasional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Pelaksanaan *</label>
                  <input required type="date" name="tanggalPelaksanaan" value={formData.tanggalPelaksanaan || ''} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Penyelenggara Kompetisi *</label>
                  <input required type="text" name="penyelenggara" value={formData.penyelenggara || ''} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Link Google Drive Sertifikat *</label>
                  <input required type="url" name="sertifikatLink" value={formData.sertifikatLink || ''} onChange={handleChange} placeholder="https://drive.google.com/..." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                  <p className="text-xs text-amber-600 mt-1 font-medium">* Pastikan link dibagikan untuk semua orang (Anyone with the link).</p>
                </div>
              </div>
            </div>

          </div>
          
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              {isAuthenticated ? (
                <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm px-2">
                  <CheckCircle2 className="w-5 h-5" />
                  NSM Terverifikasi
                </div>
              ) : (
                <>
                  <input 
                    type="text" 
                    placeholder="Ketik NSM untuk verifikasi" 
                    value={authNsm}
                    onChange={(e) => setAuthNsm(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm w-full md:w-64"
                  />
                  <button 
                    type="button" 
                    onClick={handleVerify}
                    className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors whitespace-nowrap"
                  >
                    Verifikasi
                  </button>
                </>
              )}
            </div>
            <button type="submit" disabled={isSubmitting || !isAuthenticated} className="w-full md:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
