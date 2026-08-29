const fs = require('fs');
let content = fs.readFileSync('src/store.ts', 'utf8');

// Replace all res.json() with robust parsing
content = content.replace(/const data = await res\.json\(\);/g, `const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('Failed to parse JSON, received text:', text.substring(0, 200));
        return [];
      }`);

fs.writeFileSync('src/store.ts', content);
