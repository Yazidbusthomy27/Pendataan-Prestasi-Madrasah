const fs = require('fs');

// 1. Dashboard
let dashboard = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');
dashboard = dashboard.replace(/\{dataSiswa\.length\}/g, "{filteredSiswa.length}");
dashboard = dashboard.replace(/\{dataGuru\.length\}/g, "{filteredGuru.length}");
dashboard = dashboard.replace(/\{dataKepala\.length\}/g, "{filteredKepala.length}");
dashboard = dashboard.replace(/\{dataMadrasah\.length\}/g, "{filteredMadrasah.length}");
fs.writeFileSync('src/pages/Dashboard.tsx', dashboard);

// 2. Data Pages
const pages = [
  { file: 'src/pages/DataSiswa.tsx', color: 'emerald' },
  { file: 'src/pages/DataGuru.tsx', color: 'sky' },
  { file: 'src/pages/DataKepala.tsx', color: 'amber' },
  { file: 'src/pages/DataMadrasah.tsx', color: 'purple' }
];

for (const page of pages) {
  let content = fs.readFileSync(page.file, 'utf8');
  
  if (!content.includes('filterJenisPrestasi')) {
    // Add state
    content = content.replace(
      /const \[filterTingkat, setFilterTingkat\] = useState<string>\('All'\);/,
      "const [filterTingkat, setFilterTingkat] = useState<string>('All');\n  const [filterJenisPrestasi, setFilterJenisPrestasi] = useState<string>('All');"
    );
    
    // Add filter logic
    content = content.replace(
      /const matchTingkat = filterTingkat === 'All' \|\| item\.tingkat === filterTingkat;\n\s*return matchJenjang && matchTingkat;/,
      "const matchTingkat = filterTingkat === 'All' || item.tingkat === filterTingkat;\n    const matchJenis = filterJenisPrestasi === 'All' || item.jenisPrestasi === filterJenisPrestasi;\n    return matchJenjang && matchTingkat && matchJenis;"
    );
    
    // Add UI filter
    const selectTingkatRegex = /(<select[\s\S]*?value=\{filterTingkat\}[\s\S]*?<\/select>)/;
    const match = content.match(selectTingkatRegex);
    if (match) {
      const selectJenis = `\n          <select 
            value={filterJenisPrestasi} 
            onChange={(e) => setFilterJenisPrestasi(e.target.value)}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-${page.color}-500"
          >
            <option value="All">Semua Jenis</option>
            <option value="Akademik">Akademik</option>
            <option value="Non Akademik">Non Akademik</option>
          </select>`;
      content = content.replace(selectTingkatRegex, match[1] + selectJenis);
    }
    
    fs.writeFileSync(page.file, content);
  }
}

console.log("Done");
