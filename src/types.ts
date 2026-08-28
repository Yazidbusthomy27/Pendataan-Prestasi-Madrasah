export type Jenjang = 'RA' | 'MI' | 'MTs' | 'MA';
export type Tingkat = 'Kabupaten' | 'Regional' | 'Provinsi' | 'Nasional';
export type Prestasi = 'Juara 1' | 'Juara 2' | 'Juara 3' | 'Harapan 1' | 'Harapan 2' | 'Harapan 3' | 'Keterangan';
export type JenisKelamin = 'Laki-laki' | 'Perempuan';

export interface BaseRecord {
  id: string;
  jenjang: Jenjang;
  kkm: string;
  namaMadrasah: string;
  alamatMadrasah: string;
  nsm: string;
  jenisKelamin: JenisKelamin;
  tingkat: Tingkat;
  detailPencapaian: string;
  tanggalPelaksanaan: string;
  penyelenggara: string;
  sertifikatLink: string;
  timestamp: number;
}

export interface SiswaRecord extends BaseRecord {
  type: 'siswa';
  namaSiswa: string;
  prestasi: Exclude<Prestasi, 'Keterangan'>;
}

export interface GuruRecord extends BaseRecord {
  type: 'guru';
  namaGuru: string;
  prestasi: Prestasi;
  keteranganPrestasi?: string; // Only if prestasi is 'Keterangan'
}

export type RecordType = SiswaRecord | GuruRecord;
