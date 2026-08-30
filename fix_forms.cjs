const fs = require('fs');

const forms = [
  { file: 'src/pages/FormSiswa.tsx', color: 'emerald' },
  { file: 'src/pages/FormGuru.tsx', color: 'sky' },
  { file: 'src/pages/FormKepala.tsx', color: 'amber' },
  { file: 'src/pages/FormMadrasah.tsx', color: 'purple' }
];

for (const form of forms) {
  let content = fs.readFileSync(form.file, 'utf8');
  
  const regex = /(<div className="grid grid-cols-1 md:grid-cols-2 gap-4">\s*<div>\s*<label className="block text-sm font-medium text-slate-700 mb-1">Pencapaian Prestasi \*<\/label>)/;
  
  const insert = `<div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Prestasi *</label>
                  <select required name="jenisPrestasi" value={formData.jenisPrestasi || ''} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-${form.color}-500 outline-none">
                    <option value="" disabled>- Pilih Jenis Prestasi -</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Non Akademik">Non Akademik</option>
                  </select>
                </div>
                `;
                
  content = content.replace(regex, `<div className="grid grid-cols-1 md:grid-cols-2 gap-4">\n                ${insert}<div>\n                  <label className="block text-sm font-medium text-slate-700 mb-1">Pencapaian Prestasi *</label>`);
  
  fs.writeFileSync(form.file, content);
}
console.log('forms updated');
