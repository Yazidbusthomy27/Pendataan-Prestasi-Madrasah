const fs = require('fs');
let content = fs.readFileSync('src/store.ts', 'utf8');

// parse SiswaRecord
content = content.replace(
  /sertifikatLink: row\[12\] \|\| '',\n\s*timestamp: Date.now\(\)\n\s*\} as SiswaRecord/g,
  "sertifikatLink: row[12] || '',\n        jenisPrestasi: row[13] || 'Akademik',\n        timestamp: Date.now()\n      } as SiswaRecord"
);

// parse GuruRecord
content = content.replace(
  /sertifikatLink: row\[12\] \|\| '',\n\s*timestamp: Date.now\(\)\n\s*\} as GuruRecord/g,
  "sertifikatLink: row[12] || '',\n        jenisPrestasi: row[13] || 'Akademik',\n        timestamp: Date.now()\n      } as GuruRecord"
);

// parse KepalaRecord
content = content.replace(
  /sertifikatLink: row\[12\] \|\| '',\n\s*timestamp: Date.now\(\)\n\s*\} as KepalaRecord/g,
  "sertifikatLink: row[12] || '',\n        jenisPrestasi: row[13] || 'Akademik',\n        timestamp: Date.now()\n      } as KepalaRecord"
);

// parse MadrasahRecord
content = content.replace(
  /sertifikatLink: row\[10\] \|\| '',\n\s*timestamp: Date.now\(\)\n\s*\} as MadrasahRecord/g,
  "sertifikatLink: row[10] || '',\n        jenisPrestasi: row[11] || 'Akademik',\n        timestamp: Date.now()\n      } as MadrasahRecord"
);

// add SiswaRecord
content = content.replace(
  /record.penyelenggara,\n\s*record.sertifikatLink \|\| ''\n\s*\];/g,
  "record.penyelenggara,\n      record.sertifikatLink || '',\n      record.jenisPrestasi || 'Akademik'\n    ];"
);

// add MadrasahRecord
content = content.replace(
  /record.penyelenggara,\n\s*record.sertifikatLink \|\| ''\n\s*\];/g,
  "record.penyelenggara,\n      record.sertifikatLink || '',\n      record.jenisPrestasi || 'Akademik'\n    ];"
);

fs.writeFileSync('src/store.ts', content);
console.log('store updated');
