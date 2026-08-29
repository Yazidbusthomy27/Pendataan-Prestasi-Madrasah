const fs = require('fs');
const forms = [
  { file: 'src/pages/FormSiswa.tsx', color: 'emerald' },
  { file: 'src/pages/FormGuru.tsx', color: 'sky' },
  { file: 'src/pages/FormKepala.tsx', color: 'amber' },
  { file: 'src/pages/FormMadrasah.tsx', color: 'purple' }
];

forms.forEach(({file, color}) => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Need to replace the div wrapping MadrasahSelector
  const wrapperPattern = new RegExp(
    `<div className="mb-6">\\s*<label className="block text-sm font-medium text-slate-700 mb-1">Cari & Pilih Madrasah \\*</label>\\s*<MadrasahSelector onSelect={handleMadrasahSelect} ringColor="${color}" />\\s*</div>`
  );

  if (wrapperPattern.test(content)) {
    content = content.replace(wrapperPattern, `<MadrasahSelector onSelect={handleMadrasahSelect} ringColor="${color}" />`);
  } else {
    // try a more loose regex
    const loose = new RegExp(`<div className="mb-6">[\\s\\S]*?<MadrasahSelector onSelect={handleMadrasahSelect} ringColor="${color}" />\\s*</div>`);
    content = content.replace(loose, `<MadrasahSelector onSelect={handleMadrasahSelect} ringColor="${color}" />`);
  }
  
  fs.writeFileSync(file, content);
  console.log('Fixed ' + file);
});
