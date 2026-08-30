const fs = require('fs');
let content = fs.readFileSync('src/store.ts', 'utf8');

// replace add methods signature
content = content.replace(/, fileBase64\?: string, fileName\?: string, fileMimeType\?: string/g, '');

// replace payload object
content = content.replace(/,\n\s*fileBase64,\n\s*fileName,\n\s*fileMimeType/g, '');

fs.writeFileSync('src/store.ts', content);
