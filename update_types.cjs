const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');

if (!content.includes('JenisPrestasi')) {
  content = content.replace(
    /export type JenisKelamin = 'Laki-laki' \| 'Perempuan';/,
    "export type JenisKelamin = 'Laki-laki' | 'Perempuan';\nexport type JenisPrestasi = 'Akademik' | 'Non Akademik';"
  );
  
  content = content.replace(
    /sertifikatLink: string;/,
    "sertifikatLink: string;\n  jenisPrestasi: JenisPrestasi;"
  );
  
  fs.writeFileSync('src/types.ts', content);
  console.log('types.ts updated');
} else {
  console.log('types.ts already updated');
}
