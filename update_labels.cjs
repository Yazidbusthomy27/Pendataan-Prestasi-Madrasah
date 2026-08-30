const fs = require('fs');

const pages = [
  'src/pages/DataSiswa.tsx',
  'src/pages/DataGuru.tsx',
  'src/pages/DataKepala.tsx',
  'src/pages/DataMadrasah.tsx'
];

for (const page of pages) {
  let content = fs.readFileSync(page, 'utf8');
  
  // Update Table Header
  content = content.replace(/<th className="px-4 py-3">Jenis Prestasi<\/th>/g, '<th className="px-4 py-3">Jenis</th>');
  
  // Update CSV Header
  content = content.replace(/'Jenis Prestasi'/g, "'Jenis'");
  
  fs.writeFileSync(page, content);
}
console.log("Done updating labels");
