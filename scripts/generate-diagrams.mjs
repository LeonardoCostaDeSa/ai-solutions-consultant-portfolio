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
  // 16:10 to match the card crop. No title/subtitle: the card already shows
  // the project title below and the category badge on top — a title here only
  // collides with the badge. The flow + metric carry the meaning.
  const W = 1600;
  const H = 1000;
  const n = d.nodes.length;
  const gap = 52;
  const margin = 90;
  const boxW = (W - margin * 2 - gap * (n - 1)) / n;
  const boxH = 260;
  const boxY = 300;
  const rowMid = boxY + boxH / 2;

  const fontSize = n >= 5 ? 30 : 36;
  let body = '';
  d.nodes.forEach((node, i) => {
    const x = margin + i * (boxW + gap);
    body += nodeSvg(node.split('\n'), x, boxY, boxW, boxH, d.accent, fontSize);
    if (i < n - 1) {
      body += arrowSvg(x + boxW + 4, x + boxW + gap - 4, rowMid, d.accent);
    }
  });

  // Metric chip centered under the flow
  const chipW = d.metric.length * 20 + 120;
  const chipX = (W - chipW) / 2;
  const chipY = 700;

  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="50%" cy="30%" r="75%">
      <stop offset="0%" stop-color="${d.accent}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${d.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#16161a"/>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  ${body}
  <rect x="${chipX}" y="${chipY}" width="${chipW}" height="84" rx="42" fill="${d.accent}" fill-opacity="0.12" stroke="${d.accent}" stroke-opacity="0.5" stroke-width="2"/>
  <circle cx="${chipX + 48}" cy="${chipY + 42}" r="10" fill="${d.accent}"/>
  <text x="${chipX + 78}" y="${chipY + 55}" font-family="Segoe UI, Arial, sans-serif" font-size="38" font-weight="700" fill="#F3F4F6">${esc(d.metric)}</text>
</svg>`;

  const out = path.join(outDir, `${d.id}.svg`);
  fs.writeFileSync(out, svg);
  console.log('Wrote', out);
}
