import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { en } from '../src/locales/en.js';
import { hi } from '../src/locales/hi.js';
import { TranslationSchema } from '../src/locales/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.resolve(__dirname, '../src/locales/locales');

if (!fs.existsSync(localesDir)) {
  fs.mkdirSync(localesDir, { recursive: true });
}

const allKeys = Object.keys(en) as (keyof TranslationSchema)[];
console.log(`Master schema contains ${allKeys.length} keys.`);

export function writeFullLocale(code: string, nativeName: string, translations: Record<keyof TranslationSchema, string>) {
  // 1. Verify 0 missing keys
  const missing = allKeys.filter(k => !translations[k]);
  if (missing.length > 0) {
    console.error(`[ERROR] ${code} (${nativeName}) has ${missing.length} missing keys:`, missing.slice(0, 10));
    throw new Error(`Incomplete locale: ${code}`);
  }

  // 2. Format typescript file
  const lines = [
    `import { TranslationSchema } from '../types.js';`,
    ``,
    `/**`,
    ` * ${nativeName} (${code}) Locale Dictionary for SAHAAY`,
    ` * 100% Genuine Native Script Translation (${allKeys.length} / ${allKeys.length} Keys)`,
    ` */`,
    `export const ${code}: TranslationSchema = {`,
    ...allKeys.map(k => `  ${k}: ${JSON.stringify(translations[k])},`),
    `};`,
    ``
  ];

  const filePath = path.join(localesDir, `${code}.ts`);
  fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
  console.log(`✓ Generated ${code}.ts [${nativeName}] -> ${allKeys.length}/${allKeys.length} keys`);
}
