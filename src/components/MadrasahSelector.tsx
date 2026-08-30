import React, { useState, useEffect, useMemo } from 'react';
import { DatabaseMadrasah } from '../types';
import { store } from '../store';
import { Loader2, MapPin, School, GraduationCap } from 'lucide-react';

interface Props {
  onSelect: (madrasah: DatabaseMadrasah | null) => void;
  ringColor?: string;
}

export default function MadrasahSelector({ onSelect, ringColor = 'emerald' }: Props) {
  const [madrasahList, setMadrasahList] = useState<DatabaseMadrasah[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [selectedJenjang, setSelectedJenjang] = useState<string>('');
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>('');
  const [selectedNsm, setSelectedNsm] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    store.getDatabaseMadrasah().then(data => {
      setMadrasahList(data);
      setIsLoading(false);
    });
  }, []);

  const jenjangList = useMemo(() => {
    const jenjangs = madrasahList.map(m => m.jenjang).filter(Boolean);
    return Array.from(new Set(jenjangs)).sort();
  }, [madrasahList]);

  const kecamatanList = useMemo(() => {
    if (!selectedJenjang) return [];
    const kecamatans = madrasahList
      .filter(m => m.jenjang === selectedJenjang)
      .map(m => m.kecamatan)
      .filter(Boolean);
    return Array.from(new Set(kecamatans)).sort();
  }, [madrasahList, selectedJenjang]);

  const filteredMadrasah = useMemo(() => {
    if (!selectedJenjang || !selectedKecamatan) return [];
    return madrasahList
      .filter(m => m.jenjang === selectedJenjang && m.kecamatan === selectedKecamatan)
      .sort((a, b) => a.nama.localeCompare(b.nama));
  }, [madrasahList, selectedJenjang, selectedKecamatan]);

  const handleJenjangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedJenjang(e.target.value);
    setSelectedKecamatan('');
    setSelectedNsm('');
    onSelect(null);
  };

  const handleKecamatanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedKecamatan(e.target.value);
    setSelectedNsm('');
    onSelect(null);
  };

  const handleMadrasahChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nsm = e.target.value;
    setSelectedNsm(nsm);
    const found = filteredMadrasah.find(m => m.nsm === nsm) || null;
    onSelect(found);
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 text-slate-600 text-sm p-4 border border-slate-200 rounded-xl bg-slate-50 mb-6">
        <Loader2 className="w-5 h-5 animate-spin text-slate-400" /> 
        <span>Memuat database madrasah...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200 mb-6">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
          <GraduationCap className="w-4 h-4 text-slate-400" />
          1. Pilih Jenjang *
        </label>
        <select 
          className={`w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-${ringColor}-500 outline-none bg-white text-slate-700 transition-shadow`}
          value={selectedJenjang}
          onChange={handleJenjangChange}
          required
        >
          <option value="">- Pilih Jenjang -</option>
          {jenjangList.map(j => (
            <option key={j} value={j}>{j}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
          <MapPin className="w-4 h-4 text-slate-400" />
          2. Pilih Kecamatan *
        </label>
        <select 
          className={`w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-${ringColor}-500 outline-none bg-white text-slate-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-shadow`}
          value={selectedKecamatan}
          onChange={handleKecamatanChange}
          disabled={!selectedJenjang}
          required
        >
          <option value="">- Pilih Kecamatan -</option>
          {kecamatanList.map(kec => (
            <option key={kec} value={kec}>{kec}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
          <School className="w-4 h-4 text-slate-400" />
          3. Pilih Madrasah *
        </label>
        <select 
          className={`w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-${ringColor}-500 outline-none bg-white text-slate-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-shadow`}
          value={selectedNsm}
          onChange={handleMadrasahChange}
          disabled={!selectedKecamatan}
          required
        >
          <option value="">- Pilih Madrasah -</option>
          {filteredMadrasah.map(m => (
            <option key={m.nsm} value={m.nsm}>{m.nama}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
