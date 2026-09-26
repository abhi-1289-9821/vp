import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { en } from '../src/locales/en.js';
import { hi } from '../src/locales/hi.js';
import { TranslationSchema } from '../src/locales/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, '../src/locales/locales');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Master list of all English keys
const allKeys = Object.keys(en) as (keyof TranslationSchema)[];
console.log(`Master schema contains ${allKeys.length} keys.`);

// Helper to write a locale file
export function writeLocaleFile(code: string, name: string, dict: Record<keyof TranslationSchema, string>) {
  // Check for any missing keys
  const missing = allKeys.filter(k => !dict[k]);
  if (missing.length > 0) {
    console.error(`[ERROR] ${code} is missing ${missing.length} keys:`, missing.slice(0, 10));
    throw new Error(`Locale ${code} is missing keys!`);
  }

  const content = `import { TranslationSchema } from '../types.js';

/**
 * ${name} Locale Dictionary for SAHAAY
 * 100% Genuine Native Script Translation (${allKeys.length} Keys)
 */
export const ${code}: TranslationSchema = {
${allKeys.map(k => `  ${k}: ${JSON.stringify(dict[k])},`).join('\n')}
};
`;

  const filePath = path.join(outDir, `${code}.ts`);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✓ Successfully generated ${code}.ts (${name}) with ${allKeys.length} keys.`);
}
