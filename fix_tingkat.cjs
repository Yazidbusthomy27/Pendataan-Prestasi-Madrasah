const fs = require('fs');
const forms = [
  'src/pages/FormSiswa.tsx',
  'src/pages/FormGuru.tsx',
  'src/pages/FormKepala.tsx',
  'src/pages/FormMadrasah.tsx'
];

forms.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    '<option value="Nasional">Nasional</option>',
    '<option value="Nasional">Nasional</option>\n                    <option value="Internasional">Internasional</option>'
  );
  fs.writeFileSync(file, content);
  console.log("Updated " + file);
});
