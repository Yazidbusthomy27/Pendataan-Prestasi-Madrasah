const fs = require('fs');

const forms = [
  { file: 'src/pages/FormSiswa.tsx', color: 'emerald', addMethod: 'addSiswa', type: 'SiswaRecord' },
  { file: 'src/pages/FormGuru.tsx', color: 'sky', addMethod: 'addGuru', type: 'GuruRecord' },
  { file: 'src/pages/FormKepala.tsx', color: 'amber', addMethod: 'addKepala', type: 'KepalaRecord' },
  { file: 'src/pages/FormMadrasah.tsx', color: 'purple', addMethod: 'addMadrasah', type: 'MadrasahRecord' }
];

for (const form of forms) {
  let content = fs.readFileSync(form.file, 'utf8');

  // Remove selectedFile state
  content = content.replace(/const \[selectedFile, setSelectedFile\] = useState<File \| null>\(null\);\n\s*/g, '');

  // Remove handleFileChange
  content = content.replace(/const handleFileChange = \(e: React\.ChangeEvent<HTMLInputElement>\) => {[\s\S]*?};\n\s*/, '');

  // Remove readFileAsBase64
  content = content.replace(/const readFileAsBase64 = \(file: File\): Promise<string> => {[\s\S]*?};\n\s*/, '');

  // Update handleSubmit
  const oldHandleSubmitRegex = /const handleSubmit = async \(e: React\.FormEvent\) => {[\s\S]*?try {[\s\S]*?let fileBase64;[\s\S]*?await store\.\w+\([^)]+\);\n\s*setIsSuccess\(true\);/m;
  
  const newHandleSubmit = `const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const record: ${form.type} = {
        ...(formData as ${form.type}),
        id: crypto.randomUUID(),
        sertifikatLink: formData.sertifikatLink || '',
        timestamp: Date.now()
      };
      
      await store.${form.addMethod}(record);
      setIsSuccess(true);`;
      
  content = content.replace(oldHandleSubmitRegex, newHandleSubmit);

  // Replace UI
  const oldUIRegex = /<div className="md:col-span-2">\s*<label className="block text-sm font-medium text-slate-700 mb-1">Upload Sertifikat.*?<\/label>\s*<input type="file".*?\/>\s*<p className="text-xs text-slate-500 mt-1">.*?<\/p>\s*<\/div>/g;
  
  const newUI = `<div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Link Google Drive Sertifikat *</label>
                  <input required type="url" name="sertifikatLink" value={formData.sertifikatLink || ''} onChange={handleChange} placeholder="https://drive.google.com/..." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-${form.color}-500 outline-none" />
                  <p className="text-xs text-amber-600 mt-1 font-medium">* Pastikan link dibagikan untuk semua orang (Anyone with the link).</p>
                </div>`;
                
  content = content.replace(oldUIRegex, newUI);

  fs.writeFileSync(form.file, content);
}
console.log("Done");
