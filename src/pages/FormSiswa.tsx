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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<Partial<SiswaRecord>>({
    type: 'siswa'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Remove the data URI scheme prefix (e.g., "data:image/png;base64,")
          const base64Str = reader.result.split(',')[1];
          resolve(base64Str);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let fileBase64;
      let fileName;
      let fileMimeType;
      
      if (selectedFile) {
        fileBase64 = await readFileAsBase64(selectedFile);
        fileName = selectedFile.name;
        fileMimeType = selectedFile.type;
      }

      const record: SiswaRecord = {
        ...(formData as SiswaRecord),
        id: crypto.randomUUID(),
        sertifikatLink: '', // Akan diisi oleh Apps Script
        timestamp: Date.now()
      };
      
      await store.addSiswa(record, fileBase64, fileName, fileMimeType);
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

  const handleMadrasahSelect = (madrasah: DatabaseMadrasah | null) => {
    if (madrasah) {
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Upload Sertifikat </label>
                  <input type="file" accept=".pdf,image/*" onChange={handleFileChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
                  <p className="text-xs text-slate-500 mt-1">Format PDF/JPG/PNG. Max 2MB.</p>
                </div>
              </div>
            </div>

          </div>
          
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-lg font-medium transition-colors disabled:opacity-50">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
