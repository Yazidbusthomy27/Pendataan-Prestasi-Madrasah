const fs = require('fs');
let content = fs.readFileSync('src/store.ts', 'utf8');
content = content.replace(/alamat:\s*String\(row\[5\] \|\| ''\)\.trim\(\),?\n?/g, '');
content = content.replace(/row\[6\]/g, 'row[5]');
fs.writeFileSync('src/store.ts', content);
