const fs = require('fs');
const path = require('path');

const allKeys = JSON.parse(fs.readFileSync(path.join(__dirname, 'keys.json'), 'utf-8'));

function writeLocaleFile(code, nativeName, dict) {
  const missing = allKeys.filter(k => !(k in dict) || !dict[k]);
  if (missing.length > 0) {
    console.error(`[ERROR] ${code} (${nativeName}) has ${missing.length} missing keys:`, missing.slice(0, 10));
    throw new Error(`Incomplete locale: ${code}`);
  }

  const lines = [
    `import { TranslationSchema } from '../types.js';`,
    ``,
    `/**`,
    ` * ${nativeName} (${code}) Locale Dictionary for SAHAAY`,
    ` * 100% Complete Authentic Native Script Translation (${allKeys.length} Keys)`,
    ` */`,
    `export const ${code}: TranslationSchema = {`,
    ...allKeys.map(k => `  ${k}: ${JSON.stringify(dict[k])},`),
    `};`,
    ``
  ];

  const outPath = path.join(__dirname, '..', 'src', 'locales', 'locales', `${code}.ts`);
  fs.writeFileSync(outPath, lines.join('\n'), 'utf-8');
  console.log(`✓ [${code}] ${nativeName} -> 100% Complete (${allKeys.length}/${allKeys.length} keys)`);
}

module.exports = { writeLocaleFile, allKeys };
