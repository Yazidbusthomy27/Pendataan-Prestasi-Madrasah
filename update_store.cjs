const fs = require('fs');
let content = fs.readFileSync('src/store.ts', 'utf8');

// Insert record.kecamatanMadrasah after record.namaMadrasah in all four row arrays

content = content.replace(
  /record\.namaMadrasah,\s*record\.nsm,/g,
  'record.namaMadrasah,\n      record.kecamatanMadrasah,\n      record.nsm,'
);

fs.writeFileSync('src/store.ts', content);
