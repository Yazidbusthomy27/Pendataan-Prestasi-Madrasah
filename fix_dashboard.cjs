const fs = require('fs');
let content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

// 1. Add state
if (!content.includes('const [jenisPrestasiFilter, setJenisPrestasiFilter]')) {
  content = content.replace(
    /const \[leaderboardJenjang, setLeaderboardJenjang\] = useState<Jenjang \| 'Semua'>\('Semua'\);/,
    "const [leaderboardJenjang, setLeaderboardJenjang] = useState<Jenjang | 'Semua'>('Semua');\n  const [jenisPrestasiFilter, setJenisPrestasiFilter] = useState<'Semua' | 'Akademik' | 'Non Akademik'>('Semua');"
  );
}

// 2. Filter logic
content = content.replace(
  /const getSiswaByJenjang = \(jenjang: Jenjang\) => dataSiswa\.filter\(d => d\.jenjang === jenjang\)\.length;/g,
  `const filteredSiswa = React.useMemo(() => dataSiswa.filter(d => jenisPrestasiFilter === 'Semua' || d.jenisPrestasi === jenisPrestasiFilter), [dataSiswa, jenisPrestasiFilter]);
  const filteredGuru = React.useMemo(() => dataGuru.filter(d => jenisPrestasiFilter === 'Semua' || d.jenisPrestasi === jenisPrestasiFilter), [dataGuru, jenisPrestasiFilter]);
  const filteredKepala = React.useMemo(() => dataKepala.filter(d => jenisPrestasiFilter === 'Semua' || d.jenisPrestasi === jenisPrestasiFilter), [dataKepala, jenisPrestasiFilter]);
  const filteredMadrasah = React.useMemo(() => dataMadrasah.filter(d => jenisPrestasiFilter === 'Semua' || d.jenisPrestasi === jenisPrestasiFilter), [dataMadrasah, jenisPrestasiFilter]);

  const getSiswaByJenjang = (jenjang: Jenjang) => filteredSiswa.filter(d => d.jenjang === jenjang).length;`
);

content = content.replace(
  /const getGuruByJenjang = \(jenjang: Jenjang\) => dataGuru\.filter\(d => d\.jenjang === jenjang\)\.length;/g,
  `const getGuruByJenjang = (jenjang: Jenjang) => filteredGuru.filter(d => d.jenjang === jenjang).length;`
);

content = content.replace(
  /const getKepalaByJenjang = \(jenjang: Jenjang\) => dataKepala\.filter\(d => d\.jenjang === jenjang\)\.length;/g,
  `const getKepalaByJenjang = (jenjang: Jenjang) => filteredKepala.filter(d => d.jenjang === jenjang).length;`
);

content = content.replace(
  /const getMadrasahByJenjang = \(jenjang: Jenjang\) => dataMadrasah\.filter\(d => d\.jenjang === jenjang\)\.length;/g,
  `const getMadrasahByJenjang = (jenjang: Jenjang) => filteredMadrasah.filter(d => d.jenjang === jenjang).length;`
);

// 3. Leaderboard filter update
content = content.replace(
  /dataSiswa\.forEach\(processRecord\);\n\s*dataGuru\.forEach\(processRecord\);\n\s*dataKepala\.forEach\(processRecord\);\n\s*dataMadrasah\.forEach\(processRecord\);/g,
  `filteredSiswa.forEach(processRecord);\n    filteredGuru.forEach(processRecord);\n    filteredKepala.forEach(processRecord);\n    filteredMadrasah.forEach(processRecord);`
);

content = content.replace(
  /\[dataSiswa, dataGuru, dataKepala, dataMadrasah\]\);/g,
  `[filteredSiswa, filteredGuru, filteredKepala, filteredMadrasah]);`
);

// 4. Update UI
const oldUI = `<div className="flex justify-center mb-8">
              <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">`;

const newUI = `<div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">`;
              
content = content.replace(oldUI, newUI);

const oldUI2 = `</button>
              </div>
            </div>`;

const newUI2 = `</button>
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
            </div>`;
content = content.replace(oldUI2, newUI2);

fs.writeFileSync('src/pages/Dashboard.tsx', content);
console.log('Dashboard updated');
