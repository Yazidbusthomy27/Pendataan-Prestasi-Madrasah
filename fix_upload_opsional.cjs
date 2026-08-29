const fs = require('fs');
const forms = [
  'src/pages/FormSiswa.tsx',
  'src/pages/FormGuru.tsx',
  'src/pages/FormKepala.tsx',
  'src/pages/FormMadrasah.tsx'
];

forms.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Change Label
  content = content.replace(
    /<label className="block text-sm font-medium text-slate-700 mb-1">Upload Sertifikat \*(<\/label>)/g,
    '<label className="block text-sm font-medium text-slate-700 mb-1">Upload Sertifikat (Opsional)$1'
  );

  // Remove required from file input
  content = content.replace(
    /<input required type="file"/g,
    '<input type="file"'
  );

  fs.writeFileSync(file, content);
  console.log("Updated " + file);
});
