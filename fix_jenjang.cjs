const fs = require('fs');
let content = fs.readFileSync('src/store.ts', 'utf8');

// Insert normalizeJenjang function
const normalizeFn = `
const normalizeJenjang = (j: string): any => {
  if (!j) return 'MI';
  const upper = String(j).toUpperCase();
  if (upper.includes('TSANAWIYAH') || upper === 'MTS') return 'MTs';
  if (upper.includes('IBTIDAIYAH') || upper === 'MI') return 'MI';
  if (upper.includes('ALIYAH') || upper === 'MA') return 'MA';
  if (upper.includes('RAUDHATUL') || upper.includes('ATHFAL') || upper === 'RA') return 'RA';
  return 'MI';
};
`;

if (!content.includes('normalizeJenjang')) {
  content = content.replace('let cachedDatabaseMadrasah', normalizeFn + '\nlet cachedDatabaseMadrasah');
}

// Replace the parsing
content = content.replace(/jenjang: \(row\[0\] \|\| 'MI'\)\.trim\(\) as any/g, 'jenjang: normalizeJenjang(row[0])');

fs.writeFileSync('src/store.ts', content);
