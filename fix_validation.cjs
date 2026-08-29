const fs = require('fs');
const forms = [
  'src/pages/FormSiswa.tsx',
  'src/pages/FormGuru.tsx',
  'src/pages/FormKepala.tsx',
  'src/pages/FormMadrasah.tsx'
];

forms.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Fix store.addGuru in FormMadrasah
  if (file.includes('FormMadrasah')) {
    content = content.replace('await store.addGuru(record', 'await store.addMadrasah(record');
  }

  // Add validation check
  const validationCheck = `
    if (!formData.nsm) {
      alert('Silakan pilih madrasah terlebih dahulu dari menu dropdown.');
      setIsSubmitting(false);
      return;
    }`;

  if (!content.includes('Silakan pilih madrasah terlebih dahulu')) {
    content = content.replace(
      'setIsSubmitting(true);\n    try {',
      'setIsSubmitting(true);\n' + validationCheck + '\n    try {'
    );
  }

  fs.writeFileSync(file, content);
  console.log("Updated " + file);
});
