const fs = require('fs');
let content = fs.readFileSync('src/store.ts', 'utf8');

// Replace getSiswa mapping
content = content.replace(
  /return data\.values\.map\(\(row: any\[\], i: number\) => \(\{[\s\S]*?\} as SiswaRecord\)\);/,
  `return data.values.map((row: any[], i: number) => ({
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
      } as SiswaRecord));`
);

// Replace getGuru mapping
content = content.replace(
  /return data\.values\.map\(\(row: any\[\], i: number\) => \(\{[\s\S]*?\} as GuruRecord\)\);/,
  `return data.values.map((row: any[], i: number) => ({
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
      } as GuruRecord));`
);

// Replace getKepala mapping
content = content.replace(
  /return data\.values\.map\(\(row: any\[\], i: number\) => \(\{[\s\S]*?\} as KepalaRecord\)\);/,
  `return data.values.map((row: any[], i: number) => ({
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
      } as KepalaRecord));`
);

// Replace getMadrasah mapping
content = content.replace(
  /return data\.values\.map\(\(row: any\[\], i: number\) => \(\{[\s\S]*?\} as MadrasahRecord\)\);/,
  `return data.values.map((row: any[], i: number) => ({
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
      } as MadrasahRecord));`
);

fs.writeFileSync('src/store.ts', content);
