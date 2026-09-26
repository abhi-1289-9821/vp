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

export const allKeys = Object.keys(en) as (keyof TranslationSchema)[];

export function writeLocaleFile(code: string, nativeName: string, dict: Record<keyof TranslationSchema, string>) {
  const missing = allKeys.filter(k => !dict[k]);
  if (missing.length > 0) {
    console.error(`[ERROR] ${code} (${nativeName}) is missing ${missing.length} keys:`, missing.slice(0, 10));
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

  const filePath = path.join(localesDir, `${code}.ts`);
  fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
  console.log(`✓ [${code}] ${nativeName} -> 100% Complete (${allKeys.length}/${allKeys.length} keys)`);
}
