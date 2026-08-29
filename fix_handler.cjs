const fs = require('fs');
const forms = [
  'src/pages/FormSiswa.tsx',
  'src/pages/FormGuru.tsx',
  'src/pages/FormKepala.tsx',
  'src/pages/FormMadrasah.tsx'
];

forms.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find the handleMadrasahSelect function
  const handlerRegex = /const handleMadrasahSelect = \(madrasah: DatabaseMadrasah \| null\) => \{[\s\S]*?\}\s*};\s*/;
  
  const match = content.match(handlerRegex);
  if (match) {
    const handlerCode = match[0];
    // Remove it from its current position
    content = content.replace(handlerCode, '');
    
    // Insert it before `if (isSuccess) {`
    content = content.replace('if (isSuccess) {', handlerCode + '\n  if (isSuccess) {');
    
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
  }
});
