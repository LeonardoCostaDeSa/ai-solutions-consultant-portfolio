// Generates minimal metric-forward cover SVGs for case studies that have no
// real screenshot. A single big impact metric reads instantly and stays clean
// — flow diagrams cluttered the card and said little.
// Output: public/img/diagrams/<id>.svg (1600x1000, 16:10 to match the card)
// Run: node scripts/generate-diagrams.mjs
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'img', 'diagrams');
fs.mkdirSync(outDir, { recursive: true });

const TEAL = '#06B6D4';
const CORAL = '#F97316';

// eyebrow: small label · big: the hero metric · sub: one supporting line
const covers = [
  { id: 'saving-time', accent: TEAL,  eyebrow: 'SAVING TIME APP',            big: 'Zero',    sub: 'manual reporting — capture once, reuse everywhere' },
  { id: 'doc-analysis', accent: TEAL, eyebrow: 'DOCUMENT ANALYSIS',          big: '50,000',  sub: 'documents analyzed in 6 hours · 98% validated' },
  { id: 'lei-do-bem', accent: TEAL,   eyebrow: 'LEI DO BEM · R&D INCENTIVE',  big: '100%',    sub: 'form coverage — from sample to full analysis' },
  { id: 'workshop', accent: CORAL,    eyebrow: 'AI OPPORTUNITY MAPPING',      big: '6+',      sub: 'deployable solutions in a 12-hour workshop' },
  { id: 'training', accent: CORAL,    eyebrow: 'AI TRAINING FOR ALL',         big: '1,600+',  sub: 'professionals upskilled in responsible AI' },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

for (const c of covers) {
  const W = 1600;
  const H = 1000;

  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="22%" cy="18%" r="90%">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="${c.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#16161a"/>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="0" y="0" width="${W}" height="8" fill="${c.accent}" fill-opacity="0.85"/>

  <text x="110" y="250" font-family="Segoe UI, Arial, sans-serif" font-size="42" font-weight="800" letter-spacing="10" fill="${c.accent}">${esc(c.eyebrow)}</text>

  <text x="104" y="600" font-family="Segoe UI, Arial, sans-serif" font-size="300" font-weight="800" letter-spacing="-6" fill="#F8F9FA">${esc(c.big)}</text>

  <text x="110" y="720" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="500" fill="#C4C7CE">${esc(c.sub)}</text>
</svg>`;

  const out = path.join(outDir, `${c.id}.svg`);
  fs.writeFileSync(out, svg);
  console.log('Wrote', out);
}
