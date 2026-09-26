import { translations, LANGUAGES } from './src/locales/index.js';

console.log('==================================================');
console.log('       SAHAAY 23-LANGUAGE I18N VALIDATION REPORT   ');
console.log('==================================================\n');

console.log(`Total Configured Supported Languages: ${LANGUAGES.length}`);

const enKeys = Object.keys(translations.en);
console.log(`Total Translation Keys in Master Schema: ${enKeys.length}\n`);

let totalMissing = 0;

for (const lang of LANGUAGES) {
  const dict = translations[lang.code];
  if (!dict) {
    console.error(`[ERROR] Missing translation dictionary for: ${lang.name} (${lang.code})`);
    totalMissing += enKeys.length;
    continue;
  }
  const langKeys = new Set(Object.keys(dict));
  const missing = enKeys.filter(k => !langKeys.has(k));
  if (missing.length > 0) {
    console.error(`[ERROR] ${lang.displayLabel} (${lang.code}) is missing ${missing.length} keys:`, missing.slice(0, 5));
    totalMissing += missing.length;
  } else {
    console.log(`  ✓ ${lang.displayLabel.padEnd(28)} [dir: ${lang.dir || 'ltr'}] -> 100% complete (${enKeys.length}/${enKeys.length} keys)`);
  }
}

console.log(`\n--------------------------------------------------`);
console.log(`Missing Translation Key Count across ALL 23 languages: ${totalMissing}`);
if (totalMissing === 0) {
  console.log('STATUS: ZERO MISSING KEYS across all 23 official Indian languages!');
}
console.log(`--------------------------------------------------\n`);
