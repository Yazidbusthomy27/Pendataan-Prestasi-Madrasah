const fs = require('fs');

const forms = [
  { file: 'src/pages/FormSiswa.tsx' },
  { file: 'src/pages/FormGuru.tsx' },
  { file: 'src/pages/FormKepala.tsx' },
  { file: 'src/pages/FormMadrasah.tsx' }
];

for (const form of forms) {
  let content = fs.readFileSync(form.file, 'utf8');
  content = content.replace(/reader\.onerror = reject;[\s\S]*?reader\.readAsDataURL\(file\);\s*}\);\s*};/g, '');
  fs.writeFileSync(form.file, content);
}
console.log("Fixed");
