import { en } from '../src/locales/en.js';
import { hi } from '../src/locales/hi.js';

const allKeys = Object.keys(en);
console.log(`Total Keys: ${allKeys.length}`);
console.log(JSON.stringify(allKeys, null, 2));
