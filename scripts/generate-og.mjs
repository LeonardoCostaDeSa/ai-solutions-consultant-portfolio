// Generates public/img/og-image.png (1200x630) from an inline SVG.
// Run: node scripts/generate-og.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, '..', 'public', 'img', 'og-image.png');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow1" cx="15%" cy="10%" r="60%">
      <stop offset="0%" stop-color="#4F46E5" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#4F46E5" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="90%" cy="95%" r="55%">
      <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#06B6D4" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#121212"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <rect x="0" y="0" width="1200" height="6" fill="#4F46E5"/>

  <text x="80" y="130" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="800" letter-spacing="6" fill="#9CA3AF">LEONARDO COSTA DE SÁ</text>

  <text x="80" y="255" font-family="Segoe UI, Arial, sans-serif" font-size="76" font-weight="800" fill="#FFFFFF">AI Engineer</text>
  <text x="80" y="340" font-family="Segoe UI, Arial, sans-serif" font-size="42" font-weight="600" fill="#E5E7EB">Production GenAI systems</text>
  <text x="80" y="396" font-family="Segoe UI, Arial, sans-serif" font-size="42" font-weight="600" fill="#818CF8">where errors are expensive.</text>

  <line x1="80" y1="452" x2="1120" y2="452" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="2"/>

  <text x="80" y="516" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="700" fill="#06B6D4">94% validated accuracy</text>
  <text x="470" y="516" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="700" fill="#F97316">50,000 docs in 6 hours</text>
  <text x="855" y="516" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="700" fill="#818CF8">1,600+ trained</text>

  <text x="80" y="575" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="600" fill="#9CA3AF">leonardosa.pro</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log('Wrote', out);
