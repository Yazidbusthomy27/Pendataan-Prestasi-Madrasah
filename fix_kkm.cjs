const fs = require('fs');

// 1. types.ts
let types = fs.readFileSync('src/types.ts', 'utf8');
types = types.replace(/\s*kkm: string;\n/, '\n');
fs.writeFileSync('src/types.ts', types);

// 2. store.ts
let store = fs.readFileSync('src/store.ts', 'utf8');
// replace kkm parsing with jenisPrestasi parsing
store = store.replace(/kkm: row\[1\] \|\| '',/g, "jenisPrestasi: row[1] || 'Akademik',");
// replace record.kkm with record.jenisPrestasi in add methods
store = store.replace(/record\.kkm,/g, "record.jenisPrestasi,");

// remove the appended jenisPrestasi parsing (which we added in previous turn)
store = store.replace(/\s*jenisPrestasi: row\[13\] \|\| 'Akademik',/g, "");
store = store.replace(/\s*jenisPrestasi: row\[11\] \|\| 'Akademik',/g, "");

// remove the appended jenisPrestasi payload
store = store.replace(/,\n\s*record\.jenisPrestasi \|\| 'Akademik'/g, "");

fs.writeFileSync('src/store.ts', store);

// 3. Data pages
const pages = [
  'src/pages/DataSiswa.tsx',
  'src/pages/DataGuru.tsx',
  'src/pages/DataKepala.tsx',
  'src/pages/DataMadrasah.tsx'
];

for (const page of pages) {
  let content = fs.readFileSync(page, 'utf8');
  content = content.replace(/'KKM'/g, "'Jenis Prestasi'");
  content = content.replace(/item\.kkm/g, "item.jenisPrestasi");
  fs.writeFileSync(page, content);
}

console.log("Done");
