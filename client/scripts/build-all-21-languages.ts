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

console.log(`Starting master 21-language generation for all ${allKeys.length} keys...`);
