const fs = require('fs');

// 1. MadrasahSelector
let ms = fs.readFileSync('src/components/MadrasahSelector.tsx', 'utf8');
ms = ms.replace(/>\{m\.nama\} \(\{m\.nsm\}\)<\/option>/g, '>{m.nama}</option>');
fs.writeFileSync('src/components/MadrasahSelector.tsx', ms);

// 2. Forms
const forms = [
  { file: 'src/pages/FormSiswa.tsx', color: 'emerald' },
  { file: 'src/pages/FormGuru.tsx', color: 'sky' },
  { file: 'src/pages/FormKepala.tsx', color: 'amber' },
  { file: 'src/pages/FormMadrasah.tsx', color: 'purple' }
];

for (const form of forms) {
  let content = fs.readFileSync(form.file, 'utf8');
  
  // Add state hooks if not present
  if (!content.includes('const [authNsm, setAuthNsm] = useState')) {
    content = content.replace(
      /const \[formData, setFormData\] = useState/,
      `const [authNsm, setAuthNsm] = useState('');\n  const [isAuthenticated, setIsAuthenticated] = useState(false);\n  const [formData, setFormData] = useState`
    );
  }
  
  // Add verify function
  if (!content.includes('const handleVerify = () => {')) {
    content = content.replace(
      /const handleMadrasahSelect/,
      `const handleVerify = () => {
    if (!formData.nsm) {
      alert("Pilih madrasah terlebih dahulu!");
      return;
    }
    if (authNsm.trim() === formData.nsm) {
      setIsAuthenticated(true);
    } else {
      alert("NSM yang Anda masukkan salah. Verifikasi gagal.");
      setIsAuthenticated(false);
    }
  };

  const handleMadrasahSelect`
    );
  }
  
  // Reset auth when madrasah changes
  content = content.replace(
    /if \(madrasah\) \{\n\s*setFormData/,
    `if (madrasah) {
      setIsAuthenticated(false);
      setAuthNsm('');
      setFormData`
  );
  
  // Update button section
  const buttonRegex = /<div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">\s*<button type="submit" disabled=\{isSubmitting\}[^>]*>[\s\S]*?<\/button>\s*<\/div>/;
  
  const newButtonArea = `<div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              {isAuthenticated ? (
                <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm px-2">
                  <CheckCircle2 className="w-5 h-5" />
                  NSM Terverifikasi
                </div>
              ) : (
                <>
                  <input 
                    type="text" 
                    placeholder="Ketik NSM untuk verifikasi" 
                    value={authNsm}
                    onChange={(e) => setAuthNsm(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-${form.color}-500 outline-none text-sm w-full md:w-64"
                  />
                  <button 
                    type="button" 
                    onClick={handleVerify}
                    className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors whitespace-nowrap"
                  >
                    Verifikasi
                  </button>
                </>
              )}
            </div>
            <button type="submit" disabled={isSubmitting || !isAuthenticated} className="w-full md:w-auto flex items-center justify-center gap-2 bg-${form.color}-600 hover:bg-${form.color}-700 text-white py-2 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
            </button>
          </div>`;
          
  content = content.replace(buttonRegex, newButtonArea);
  
  fs.writeFileSync(form.file, content);
}
console.log('done');
