// Generates flow-diagram SVGs for case studies that previously used stock photos.
// Output: public/img/diagrams/<id>.svg (1600x1000, 16:10 to match card aspect)
// Run: node scripts/generate-diagrams.mjs
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'img', 'diagrams');
fs.mkdirSync(outDir, { recursive: true });

const TEAL = '#06B6D4';
const CORAL = '#F97316';

const diagrams = [
  {
    id: 'saving-time',
    accent: TEAL,
    title: 'SAVING TIME APP',
    subtitle: 'Capture once, reuse everywhere',
    nodes: ['Session audio\n+ time tracking', 'Offline-first\nmobile capture', 'AI transcription\n& summarization', 'Client-ready\nsession report'],
    metric: 'Zero manual reporting',
  },
  {
    id: 'doc-analysis',
    accent: TEAL,
    title: 'DOCUMENT ANALYSIS AUTOMATION',
    subtitle: '$8B legal case · 50,000 scanned documents since 1958',
    nodes: ['50,000\nscanned docs', 'Python\npage splitter', 'SharePoint\nqueue', 'Power Automate\n+ AI Builder', 'Page-level\nevidence sheet'],
    metric: '6 hours · 98% validated accuracy',
  },
  {
    id: 'lei-do-bem',
    accent: TEAL,
    title: 'TAX INCENTIVE FORM ANALYSIS',
    subtitle: "Lei do Bem — Brazil's R&D incentive",
    nodes: ['R&D incentive\nforms', 'Copilot Studio\nagent', 'Power Automate\norchestration', 'Full-scope\nspecialist review'],
    metric: 'From sample to 100% coverage',
  },
  {
    id: 'workshop',
    accent: CORAL,
    title: 'AI OPPORTUNITY MAPPING',
    subtitle: '12-hour immersive workshop',
    nodes: ['As-is process\nmapping', 'Impact × Effort\nprioritization', 'Concrete\nuse cases', 'Deployed\nsolutions'],
    metric: '6+ solutions in 12 hours',
  },
  {
    id: 'training',
    accent: CORAL,
    title: 'AI TRAINING FOR ALL',
    subtitle: 'Hybrid enablement across the Tax practice',
    nodes: ['Shared AI\nvocabulary', 'CARTS prompting\nframework', 'Hands-on\nbusiness cases', 'Enterprise\ncapability'],
    metric: '1,600+ professionals upskilled',
  },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function nodeSvg(lines, x, y, w, h, accent, fontSize) {
  const lineHeight = fontSize + 10;
  const startY = y + h / 2 - ((lines.length - 1) * lineHeight) / 2 + 12;
  const text = lines
    .map((l, i) => `<text x="${x + w / 2}" y="${startY + i * lineHeight}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="${fontSize}" font-weight="600" fill="#E5E7EB">${esc(l)}</text>`)
    .join('\n');
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="24" fill="#FFFFFF" fill-opacity="0.04" stroke="${accent}" stroke-opacity="0.45" stroke-width="2.5"/>
  <rect x="${x}" y="${y}" width="${w}" height="6" rx="3" fill="${accent}" fill-opacity="0.8"/>
  ${text}`;
}

function arrowSvg(x1, x2, y, accent) {
  return `
  <line x1="${x1}" y1="${y}" x2="${x2 - 16}" y2="${y}" stroke="${accent}" stroke-width="3" stroke-opacity="0.7"/>
  <path d="M ${x2 - 16} ${y - 10} L ${x2} ${y} L ${x2 - 16} ${y + 10} Z" fill="${accent}" fill-opacity="0.9"/>`;
}

for (const d of diagrams) {
  const W = 1600;
  const H = 1000;
  const n = d.nodes.length;
  const gap = 56;
  const margin = 80;
  const boxW = (W - margin * 2 - gap * (n - 1)) / n;
  const boxH = 230;
  const boxY = 470;

  const fontSize = n >= 5 ? 28 : 34;
  let body = '';
  d.nodes.forEach((node, i) => {
    const x = margin + i * (boxW + gap);
    body += nodeSvg(node.split('\n'), x, boxY, boxW, boxH, d.accent, fontSize);
    if (i < n - 1) {
      body += arrowSvg(x + boxW + 6, x + boxW + gap - 6, boxY + boxH / 2, d.accent);
    }
  });

  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="20%" cy="0%" r="80%">
      <stop offset="0%" stop-color="${d.accent}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="${d.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#16161a"/>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="${margin}" y="200" font-family="Segoe UI, Arial, sans-serif" font-size="44" font-weight="800" letter-spacing="8" fill="${d.accent}">${esc(d.title)}</text>
  <text x="${margin}" y="272" font-family="Segoe UI, Arial, sans-serif" font-size="36" font-weight="500" fill="#9CA3AF">${esc(d.subtitle)}</text>
  ${body}
  <rect x="${margin}" y="820" width="${d.metric.length * 19 + 90}" height="76" rx="38" fill="${d.accent}" fill-opacity="0.12" stroke="${d.accent}" stroke-opacity="0.5" stroke-width="2"/>
  <circle cx="${margin + 42}" cy="858" r="9" fill="${d.accent}"/>
  <text x="${margin + 72}" y="871" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="700" fill="#E5E7EB">${esc(d.metric)}</text>
</svg>`;

  const out = path.join(outDir, `${d.id}.svg`);
  fs.writeFileSync(out, svg);
  console.log('Wrote', out);
}
