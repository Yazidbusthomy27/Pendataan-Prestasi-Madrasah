const fs = require('fs');
let content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

content = content.replace(
  "const getScore = (tingkat: string, prestasi: string): number => {\n    const isHarapan = prestasi.startsWith('Harapan');",
  "const getScore = (tingkat: string, prestasi: string): number => {\n    if (!prestasi || typeof prestasi !== 'string') return 0;\n    const isHarapan = prestasi.startsWith('Harapan');"
);

fs.writeFileSync('src/pages/Dashboard.tsx', content);
