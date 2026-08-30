const fs = require('fs');

const pages = [
  'src/pages/DataSiswa.tsx',
  'src/pages/DataGuru.tsx',
  'src/pages/DataKepala.tsx',
  'src/pages/DataMadrasah.tsx'
];

for (const page of pages) {
  let content = fs.readFileSync(page, 'utf8');
  
  // Add <th>Jenis Prestasi</th>
  const thRegex = /<th className="px-4 py-3">Jenjang<\/th>/;
  content = content.replace(thRegex, '<th className="px-4 py-3">Jenjang</th>\n                    <th className="px-4 py-3">Jenis Prestasi</th>');
  
  // Add <td>item.jenisPrestasi</td>
  const tdRegex = /<td className="px-4 py-3 font-medium text-slate-800">\{item\.jenjang\}<\/td>/;
  content = content.replace(tdRegex, '<td className="px-4 py-3 font-medium text-slate-800">{item.jenjang}</td>\n                        <td className="px-4 py-3 text-slate-600">{item.jenisPrestasi}</td>');
  
  fs.writeFileSync(page, content);
}
console.log("Cols added");
