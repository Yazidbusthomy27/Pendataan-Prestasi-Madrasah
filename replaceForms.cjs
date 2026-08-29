const fs = require('fs');
const forms = [
  { file: 'src/pages/FormSiswa.tsx', color: 'emerald' },
  { file: 'src/pages/FormGuru.tsx', color: 'sky' },
  { file: 'src/pages/FormKepala.tsx', color: 'amber' },
  { file: 'src/pages/FormMadrasah.tsx', color: 'purple' }
];

forms.forEach(({file, color}) => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('MadrasahSelector')) {
    content = content.replace("import { ", "import MadrasahSelector from '../components/MadrasahSelector';\nimport { DatabaseMadrasah, ");
  }

  if (!content.includes('handleMadrasahSelect')) {
    const handlerCode = `
  const handleMadrasahSelect = (madrasah: DatabaseMadrasah | null) => {
    if (madrasah) {
      setFormData(prev => ({
        ...prev,
        nsm: madrasah.nsm,
        namaMadrasah: madrasah.nama,
        jenjang: madrasah.jenjang as any,
        alamatMadrasah: madrasah.alamat,
      }));
    }
  };

  return (`;
    content = content.replace("  return (", handlerCode);
  }

  const newSection = `<h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Identitas Madrasah</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-1">Cari & Pilih Madrasah *</label>
                <MadrasahSelector onSelect={handleMadrasahSelect} ringColor="${color}" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Jenjang</label>
                  <input readOnly type="text" value={formData.jenjang || ''} className="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-lg text-slate-500 outline-none cursor-not-allowed" placeholder="Otomatis terisi..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">KKM *</label>
                  <input required type="text" name="kkm" value={formData.kkm || ''} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-${color}-500 outline-none" placeholder="Isi manual KKM..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Nama Madrasah</label>
                  <input readOnly type="text" value={formData.namaMadrasah || ''} className="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-lg text-slate-500 outline-none cursor-not-allowed" placeholder="Otomatis terisi..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">NSM</label>
                  <input readOnly type="text" value={formData.nsm || ''} className="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-lg text-slate-500 outline-none cursor-not-allowed" placeholder="Otomatis terisi..." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-500 mb-1">Alamat Madrasah</label>
                  <textarea readOnly value={formData.alamatMadrasah || ''} rows={2} className="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-lg text-slate-500 outline-none cursor-not-allowed" placeholder="Otomatis terisi..."></textarea>
                </div>
              </div>
            </div>`;
            
  // Regex to replace Identitas Madrasah block up until next section
  const regex = /<h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Identitas Madrasah<\/h3>[\s\S]*?(?=\{\/\* Section:)/;
  
  if (regex.test(content)) {
    content = content.replace(regex, newSection + "\n\n            ");
  } else {
    console.log("Could not find Identitas Madrasah section in " + file);
  }

  fs.writeFileSync(file, content);
  console.log("Updated " + file);
});
