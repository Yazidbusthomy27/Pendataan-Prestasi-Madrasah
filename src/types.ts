export type Jenjang = 'RA' | 'MI' | 'MTs' | 'MA';
export type Tingkat = 'Kabupaten' | 'Regional' | 'Provinsi' | 'Nasional' | 'Internasional';
export type Prestasi = 'Juara 1' | 'Juara 2' | 'Juara 3' | 'Harapan 1' | 'Harapan 2' | 'Harapan 3';
export type JenisKelamin = 'Laki-laki' | 'Perempuan';
export type JenisPrestasi = 'Akademik' | 'Non Akademik';

export interface DatabaseMadrasah {
  nsm: string;
  npsn: string;
  nama: string;
  jenjang: string;
  status: string;
  kecamatan: string;
}

export interface BaseRecord {
  id: string;
  jenjang: Jenjang;
  namaMadrasah: string;
  kecamatanMadrasah: string;
  nsm: string;
  tingkat: Tingkat;
  detailPencapaian: string;
  tanggalPelaksanaan: string;
  penyelenggara: string;
  sertifikatLink: string;
  jenisPrestasi: JenisPrestasi;
  timestamp: number;
}

export interface PersonRecord extends BaseRecord {
  jenisKelamin: JenisKelamin;
  prestasi: Prestasi;
}

export interface SiswaRecord extends PersonRecord {
  type: 'siswa';
  namaSiswa: string;
}

export interface GuruRecord extends PersonRecord {
  type: 'guru';
  namaGuru: string;
}

export interface KepalaRecord extends PersonRecord {
  type: 'kepala';
  namaKepala: string;
}

export interface MadrasahRecord extends BaseRecord {
  type: 'madrasah';
  prestasi: Prestasi;
}

export type RecordType = SiswaRecord | GuruRecord | KepalaRecord | MadrasahRecord;
