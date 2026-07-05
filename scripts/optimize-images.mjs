// One-off image optimizer: converts the large case-study images to WebP
// at 480/960/1440 widths. Originals stay in git history; delete after running.
// Run: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imgDir = path.join(__dirname, '..', 'public', 'img');

const sources = ['CardKBSE.png', 'CardTaxReform.png', 'CardRevisaExpress.jpg'];
const widths = [480, 960, 1440];

for (const file of sources) {
  const src = path.join(imgDir, file);
  if (!fs.existsSync(src)) {
    console.log('skip (missing):', file);
    continue;
  }
  const base = path.parse(file).name;
  for (const w of widths) {
    const out = path.join(imgDir, `${base}-${w}.webp`);
    await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log(`${base}-${w}.webp  ${kb} KB`);
  }
}
console.log('Done.');
