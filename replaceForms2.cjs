const fs = require('fs');
const forms = [
  'src/pages/FormSiswa.tsx',
  'src/pages/FormGuru.tsx',
  'src/pages/FormKepala.tsx',
  'src/pages/FormMadrasah.tsx'
];

forms.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace in handleMadrasahSelect
  content = content.replace('alamatMadrasah: madrasah.alamat', 'kecamatanMadrasah: madrasah.kecamatan');
  
  // Replace in UI
  content = content.replace(
    '<label className="block text-sm font-medium text-slate-500 mb-1">Alamat Madrasah</label>',
    '<label className="block text-sm font-medium text-slate-500 mb-1">Kecamatan</label>'
  );
  
  content = content.replace(
    '<textarea readOnly value={formData.alamatMadrasah || \'\'} rows={2} className="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-lg text-slate-500 outline-none cursor-not-allowed" placeholder="Otomatis terisi..."></textarea>',
    '<input readOnly type="text" value={formData.kecamatanMadrasah || \'\'} className="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-lg text-slate-500 outline-none cursor-not-allowed" placeholder="Otomatis terisi..." />'
  );

  fs.writeFileSync(file, content);
  console.log("Updated " + file);
});
