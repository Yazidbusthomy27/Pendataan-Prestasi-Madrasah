const fs = require('fs');
const forms = [
  'src/pages/FormSiswa.tsx',
  'src/pages/FormGuru.tsx',
  'src/pages/FormKepala.tsx',
  'src/pages/FormMadrasah.tsx'
];

forms.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace everything between `<MadrasahSelector ... />` and `</div>\s*{/* Section:` 
  // Wait, the HTML structure is:
  // <div>
  //   <h3 ...>Identitas Madrasah</h3>
  //   <MadrasahSelector ... />
  //   <div className="grid ..."> ... </div>
  // </div>
  // {/* Section: ... */}
  
  // So we just want to remove the `<div className="grid ...">...</div>` that comes immediately after MadrasahSelector.
  const regex = /(<MadrasahSelector onSelect={handleMadrasahSelect} ringColor="[a-z]+" \/>)\s*<div className="grid grid-cols-1 md:grid-cols-2 gap-4">[\s\S]*?(?=<\/div>\s*\{\/\* Section:)/;

  if (regex.test(content)) {
    content = content.replace(regex, '$1\n            ');
    console.log("Stripped fields in " + file);
  } else {
    console.log("Could not find pattern in " + file);
  }

  fs.writeFileSync(file, content);
});
