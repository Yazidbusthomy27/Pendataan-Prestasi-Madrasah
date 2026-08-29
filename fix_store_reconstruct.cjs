const fs = require('fs');

const content = `import { SiswaRecord, GuruRecord, KepalaRecord, MadrasahRecord, DatabaseMadrasah } from './types';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzpi53rjdBSr75n-7g0K1guJqjGlJijCFjo217XE44e6NQlZ4EMhyw8nq2whDEo1CtpJg/exec';

const getScriptUrl = () => {
  return SCRIPT_URL;
};

let cachedDatabaseMadrasah: DatabaseMadrasah[] | null = null;

export const store = {
  getDatabaseMadrasah: async (): Promise<DatabaseMadrasah[]> => {
    if (cachedDatabaseMadrasah) return cachedDatabaseMadrasah;
    try {
      const res = await fetch(\`\${getScriptUrl()}?action=getDatabaseMadrasah&t=\${Date.now()}\`);
      const data = await res.json();
      if (!data.values) return [];
      
      cachedDatabaseMadrasah = data.values.map((row: any[]) => ({
        nsm: String(row[0] || '').trim(),
        npsn: String(row[1] || '').trim(),
        nama: String(row[2] || '').trim(),
        jenjang: String(row[3] || '').trim(),
        status: String(row[4] || '').trim(),
        kecamatan: String(row[5] || '').trim(),
      }));
      return cachedDatabaseMadrasah;
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  getSiswa: async (): Promise<SiswaRecord[]> => {
    try {
      const res = await fetch(\`\${getScriptUrl()}?action=getSiswa&t=\${Date.now()}\`);
      const data = await res.json();
      if (!data.values) return [];
      
      return data.values.map((row: any[], i: number) => ({
        id: \`siswa-\${i}\`,
        type: 'siswa',
        jenjang: (row[0] || 'MI').trim() as any,
        kkm: row[1] || '',
        namaMadrasah: row[2] || '',
        kecamatanMadrasah: row[3] || '',
        nsm: row[4] || '',
        namaSiswa: row[5] || '',
        jenisKelamin: row[6] || 'Laki-laki',
        prestasi: row[7] || 'Juara 1',
        detailPencapaian: row[8] || '',
        tingkat: row[9] || 'Kabupaten',
        tanggalPelaksanaan: row[10] || '',
        penyelenggara: row[11] || '',
        sertifikatLink: row[12] || '',
        timestamp: Date.now()
      } as SiswaRecord));
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  
  getGuru: async (): Promise<GuruRecord[]> => {
    try {
      const res = await fetch(\`\${getScriptUrl()}?action=getGuru&t=\${Date.now()}\`);
      const data = await res.json();
      if (!data.values) return [];
      
      return data.values.map((row: any[], i: number) => ({
        id: \`guru-\${i}\`,
        type: 'guru',
        jenjang: (row[0] || 'MI').trim() as any,
        kkm: row[1] || '',
        namaMadrasah: row[2] || '',
        kecamatanMadrasah: row[3] || '',
        nsm: row[4] || '',
        namaGuru: row[5] || '',
        jenisKelamin: row[6] || 'Laki-laki',
        prestasi: row[7] || 'Juara 1',
        detailPencapaian: row[8] || '',
        tingkat: row[9] || 'Kabupaten',
        tanggalPelaksanaan: row[10] || '',
        penyelenggara: row[11] || '',
        sertifikatLink: row[12] || '',
        timestamp: Date.now()
      } as GuruRecord));
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  getKepala: async (): Promise<KepalaRecord[]> => {
    try {
      const res = await fetch(\`\${getScriptUrl()}?action=getKepala&t=\${Date.now()}\`);
      const data = await res.json();
      if (!data.values) return [];
      
      return data.values.map((row: any[], i: number) => ({
        id: \`kepala-\${i}\`,
        type: 'kepala',
        jenjang: (row[0] || 'MI').trim() as any,
        kkm: row[1] || '',
        namaMadrasah: row[2] || '',
        kecamatanMadrasah: row[3] || '',
        nsm: row[4] || '',
        namaKepala: row[5] || '',
        jenisKelamin: row[6] || 'Laki-laki',
        prestasi: row[7] || 'Juara 1',
        detailPencapaian: row[8] || '',
        tingkat: row[9] || 'Kabupaten',
        tanggalPelaksanaan: row[10] || '',
        penyelenggara: row[11] || '',
        sertifikatLink: row[12] || '',
        timestamp: Date.now()
      } as KepalaRecord));
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  getMadrasah: async (): Promise<MadrasahRecord[]> => {
    try {
      const res = await fetch(\`\${getScriptUrl()}?action=getMadrasah&t=\${Date.now()}\`);
      const data = await res.json();
      if (!data.values) return [];
      
      return data.values.map((row: any[], i: number) => ({
        id: \`madrasah-\${i}\`,
        type: 'madrasah',
        jenjang: (row[0] || 'MI').trim() as any,
        kkm: row[1] || '',
        namaMadrasah: row[2] || '',
        kecamatanMadrasah: row[3] || '',
        nsm: row[4] || '',
        prestasi: row[5] || 'Juara 1',
        detailPencapaian: row[6] || '',
        tingkat: row[7] || 'Kabupaten',
        tanggalPelaksanaan: row[8] || '',
        penyelenggara: row[9] || '',
        sertifikatLink: row[10] || '',
        timestamp: Date.now()
      } as MadrasahRecord));
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
      record.kecamatanMadrasah,
      record.nsm,
      record.namaSiswa,
      record.jenisKelamin,
      record.prestasi,
      record.detailPencapaian,
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
      record.kecamatanMadrasah,
      record.nsm,
      record.namaGuru,
      record.jenisKelamin,
      record.prestasi,
      record.detailPencapaian,
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
  },

  addKepala: async (record: KepalaRecord, fileBase64?: string, fileName?: string, fileMimeType?: string) => {
    const row = [
      record.jenjang,
      record.kkm,
      record.namaMadrasah,
      record.kecamatanMadrasah,
      record.nsm,
      record.namaKepala,
      record.jenisKelamin,
      record.prestasi,
      record.detailPencapaian,
      record.tingkat,
      record.tanggalPelaksanaan,
      record.penyelenggara,
      record.sertifikatLink || ''
    ];
    
    await fetch(getScriptUrl(), {
      method: 'POST',
      body: JSON.stringify({ 
        action: 'addKepala',
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

  addMadrasah: async (record: MadrasahRecord, fileBase64?: string, fileName?: string, fileMimeType?: string) => {
    const row = [
      record.jenjang,
      record.kkm,
      record.namaMadrasah,
      record.kecamatanMadrasah,
      record.nsm,
      record.prestasi,
      record.detailPencapaian,
      record.tingkat,
      record.tanggalPelaksanaan,
      record.penyelenggara,
      record.sertifikatLink || ''
    ];
    
    await fetch(getScriptUrl(), {
      method: 'POST',
      body: JSON.stringify({ 
        action: 'addMadrasah',
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
`
fs.writeFileSync('src/store.ts', content);
