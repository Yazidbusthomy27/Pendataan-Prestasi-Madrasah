import { SiswaRecord, GuruRecord } from './types';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzpi53rjdBSr75n-7g0K1guJqjGlJijCFjo217XE44e6NQlZ4EMhyw8nq2whDEo1CtpJg/exec';

const getScriptUrl = () => {
  return SCRIPT_URL;
};

export const store = {
  getSiswa: async (): Promise<SiswaRecord[]> => {
    try {
      const res = await fetch(`${getScriptUrl()}?action=getSiswa&t=${Date.now()}`);
      const data = await res.json();
      if (!data.values) return [];
      
      return data.values.map((row: any[], i: number) => ({
        id: `siswa-${i}`,
        type: 'siswa',
        jenjang: (row[0] || 'MI').trim(),
        kkm: row[1] || '',
        namaMadrasah: row[2] || '',
        nsm: row[3] || '',
        namaSiswa: row[4] || '',
        jenisKelamin: row[5] || 'Laki-laki',
        prestasi: row[6] || 'Juara 1',
        tingkat: row[7] || 'Kabupaten',
        tanggalPelaksanaan: row[8] || '',
        penyelenggara: row[9] || '',
        sertifikatLink: row[10] || '',
        timestamp: Date.now()
      } as SiswaRecord));
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  
  getGuru: async (): Promise<GuruRecord[]> => {
    try {
      const res = await fetch(`${getScriptUrl()}?action=getGuru&t=${Date.now()}`);
      const data = await res.json();
      if (!data.values) return [];
      
      return data.values.map((row: any[], i: number) => ({
        id: `guru-${i}`,
        type: 'guru',
        jenjang: (row[0] || 'MI').trim(),
        kkm: row[1] || '',
        namaMadrasah: row[2] || '',
        nsm: row[3] || '',
        namaGuru: row[4] || '',
        jenisKelamin: row[5] || 'Laki-laki',
        prestasi: row[6] || 'Juara 1',
        keteranganPrestasi: row[7] || '',
        tingkat: row[8] || 'Kabupaten',
        tanggalPelaksanaan: row[9] || '',
        penyelenggara: row[10] || '',
        sertifikatLink: row[11] || '',
        timestamp: Date.now()
      } as GuruRecord));
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  
  addSiswa: async (record: SiswaRecord, fileBase64?: string, fileName?: string, fileMimeType?: string) => {
    const row = [
      record.jenjang,
      record.kkm,
      record.namaMadrasah,
      record.nsm,
      record.namaSiswa,
      record.jenisKelamin === 'Laki-laki' ? 'L' : 'P',
      record.prestasi,
      record.tingkat,
      record.tanggalPelaksanaan,
      record.penyelenggara,
      record.sertifikatLink || ''
    ];
    
    await fetch(getScriptUrl(), {
      method: 'POST',
      body: JSON.stringify({ 
        action: 'addSiswa',
        payload: {
          row,
          fileBase64,
          fileName,
          fileMimeType,
          folderId: '1ig9jTBM92liW7tDdW21LTANkMSM26tMz'
        }
      })
    });
  },
  
  addGuru: async (record: GuruRecord, fileBase64?: string, fileName?: string, fileMimeType?: string) => {
    const row = [
      record.jenjang,
      record.kkm,
      record.namaMadrasah,
      record.nsm,
      record.namaGuru,
      record.jenisKelamin === 'Laki-laki' ? 'L' : 'P',
      record.prestasi,
      record.prestasi === 'Keterangan' ? record.keteranganPrestasi : '',
      record.tingkat,
      record.tanggalPelaksanaan,
      record.penyelenggara,
      record.sertifikatLink || ''
    ];
    
    await fetch(getScriptUrl(), {
      method: 'POST',
      body: JSON.stringify({ 
        action: 'addGuru',
        payload: {
          row,
          fileBase64,
          fileName,
          fileMimeType,
          folderId: '1ig9jTBM92liW7tDdW21LTANkMSM26tMz'
        }
      })
    });
  }
};
