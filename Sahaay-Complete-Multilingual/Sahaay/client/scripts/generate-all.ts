import { generateTamil } from './gen-ta-te-kn-ml.js';
import { generateTelugu, generateKannada, generateMalayalam } from './gen-dravidian.js';
import {
  generateBengali,
  generateMarathi,
  generateGujarati,
  generatePunjabi,
  generateOdia,
  generateAssamese,
} from './gen-indo-aryan-1.js';
import {
  generateUrdu,
  generateSanskrit,
  generateMaithili,
  generateKashmiri,
  generateDogri,
  generateKonkani,
  generateNepali,
  generateSindhi,
} from './gen-group-3.js';
import { generateBodo, generateSantali, generateManipuri } from './gen-group-4.js';

console.log('================================================================');
console.log('GENERATING ALL 21 REGIONAL LOCALES WITH 100% COMPLETE KEYS');
console.log('================================================================\n');

try {
  generateTamil();
  generateTelugu();
  generateKannada();
  generateMalayalam();

  generateBengali();
  generateMarathi();
  generateGujarati();
  generatePunjabi();
  generateOdia();
  generateAssamese();

  generateUrdu();
  generateSanskrit();
  generateMaithili();
  generateKashmiri();
  generateDogri();
  generateKonkani();
  generateNepali();
  generateSindhi();

  generateBodo();
  generateSantali();
  generateManipuri();

  console.log('\n================================================================');
  console.log('✓ ALL 21 REGIONAL LOCALES SUCCESSFULLY GENERATED!');
  console.log('================================================================');
} catch (err) {
  console.error('Generation failed:', err);
  process.exit(1);
}
