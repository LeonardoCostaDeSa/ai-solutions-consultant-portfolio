
import React from 'react';
import type { ProjectPalette } from '../../types';

/**
 * Premium architecture diagrams from a tiny declarative DSL.
 *
 * Both orientations are rendered from the same data — horizontal (md+) and
 * vertical (mobile) — so responsiveness needs no matchMedia and can't cause
 * hydration mismatches. The wrapper carries the accessible name; both SVGs are
 * aria-hidden so screen readers never read the diagram twice.
 */

export type FlowNodeKind = 'input' | 'process' | 'agent' | 'store' | 'output';

export interface FlowNode {
  id: string;
  label: string;
  sublabel?: string;
  kind: FlowNodeKind;
  /** Lane grid position (horizontal orientation: col = x, row = y). */
  col: number;
  row: number;
}

export interface FlowEdge {
  from: string;
  to: string;
  label?: string;
  kind?: 'flow' | 'feedback';
}

export interface FlowDiagramData {
  title: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
}

interface FlowDiagramProps {
  data: FlowDiagramData;
  palette: ProjectPalette;
  className?: string;
}

const NODE_W = 176;
const NODE_H = 72;
const GAP_X = 72;
const GAP_Y = 48;
const PAD = 24;

interface Placed extends FlowNode {
  x: number;
  y: number;
}

function layout(nodes: FlowNode[], vertical: boolean): { placed: Placed[]; width: number; height: number } {
  if (vertical) {
    // A literal row/col swap only narrows the diagram when the original
    // column range is wider than the row range. It fails silently on grids
    // like Revisa's 5-agent fan-out, where both ranges span 0-4 — swapping
    // produces the exact same bounding box, unreadable on a phone. Instead,
    // stack every node in one column, ordered by its logical position
    // (col first, since edges flow left-to-right = early-to-late), so mobile
    // is always exactly one node wide regardless of the source topology.
    const ordered = [...nodes].sort((a, b) => a.col - b.col || a.row - b.row);
    const placed = ordered.map((n, i) => ({ ...n, x: PAD, y: PAD + i * (NODE_H + GAP_Y) }));
    const width = NODE_W + PAD * 2;
    const height = Math.max(...placed.map((p) => p.y + NODE_H)) + PAD;
    return { placed, width, height };
  }
  const placed = nodes.map((n) => ({ ...n, x: PAD + n.col * (NODE_W + GAP_X), y: PAD + n.row * (NODE_H + GAP_Y) }));
  const width = Math.max(...placed.map((p) => p.x + NODE_W)) + PAD;
  const height = Math.max(...placed.map((p) => p.y + NODE_H)) + PAD;
  return { placed, width, height };
}

function edgePath(a: Placed, b: Placed, vertical: boolean): string {
  if (vertical) {
    const x1 = a.x + NODE_W / 2;
    const y1 = a.y + NODE_H;
    const x2 = b.x + NODE_W / 2;
    const y2 = b.y;
    const my = (y1 + y2) / 2;
    return `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
  }
  const x1 = a.x + NODE_W;
  const y1 = a.y + NODE_H / 2;
  const x2 = b.x;
  const y2 = b.y + NODE_H / 2;
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

const KIND_STYLE: Record<FlowNodeKind, { dash?: string; strokeOpacity: number; fillOpacity: number; glow: boolean }> = {
  input: { strokeOpacity: 0.35, fillOpacity: 0.03, glow: false },
  process: { strokeOpacity: 0.45, fillOpacity: 0.05, glow: false },
  agent: { strokeOpacity: 0.9, fillOpacity: 0.09, glow: true },
  store: { dash: '5 4', strokeOpacity: 0.5, fillOpacity: 0.04, glow: false },
  output: { strokeOpacity: 0.7, fillOpacity: 0.07, glow: false },
};

const DiagramSvg: React.FC<{ data: FlowDiagramData; palette: ProjectPalette; vertical: boolean }> = ({
  data,
  palette,
  vertical,
}) => {
  const { placed, width, height } = layout(data.nodes, vertical);
  const byId = new Map(placed.map((p) => [p.id, p]));
  const markerId = `arrow-${data.title.replace(/\W+/g, '')}-${vertical ? 'v' : 'h'}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" aria-hidden="true">
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 Z" fill={palette.accent} fillOpacity={0.9} />
        </marker>
      </defs>

      {data.edges.map((e, i) => {
        const a = byId.get(e.from);
        const b = byId.get(e.to);
        if (!a || !b) return null;
        const isFeedback = e.kind === 'feedback';
        return (
          <g key={i}>
            <path
              d={edgePath(a, b, vertical)}
              fill="none"
              stroke={palette.accent}
              strokeOpacity={isFeedback ? 0.35 : 0.6}
              strokeWidth={1.5}
              strokeDasharray={isFeedback ? '4 5' : undefined}
              markerEnd={`url(#${markerId})`}
              className="flow-edge"
            />
            {e.label && (
              <text
                x={(a.x + b.x + NODE_W) / 2}
                y={vertical ? (a.y + NODE_H + b.y) / 2 - 6 : Math.min(a.y, b.y) + NODE_H / 2 - 10}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill="#F8F9FA"
                fillOpacity={0.5}
              >
                {e.label}
              </text>
            )}
          </g>
        );
      })}

      {placed.map((n) => {
        const s = KIND_STYLE[n.kind];
        return (
          <g key={n.id}>
            {s.glow && (
              <rect x={n.x - 3} y={n.y - 3} width={NODE_W + 6} height={NODE_H + 6} rx={15} fill={palette.accent} fillOpacity={0.1} />
            )}
            <rect
              x={n.x}
              y={n.y}
              width={NODE_W}
              height={NODE_H}
              rx={12}
              fill={palette.glow}
              fillOpacity={s.fillOpacity}
              stroke={palette.accent}
              strokeOpacity={s.strokeOpacity}
              strokeWidth={1.5}
              strokeDasharray={s.dash}
            />
            <text
              x={n.x + NODE_W / 2}
              y={n.y + (n.sublabel ? NODE_H / 2 - 4 : NODE_H / 2 + 5)}
              textAnchor="middle"
              fontSize={13}
              fontWeight={700}
              fill="#F8F9FA"
              fillOpacity={0.92}
            >
              {n.label}
            </text>
            {n.sublabel && (
              <text
                x={n.x + NODE_W / 2}
                y={n.y + NODE_H / 2 + 16}
                textAnchor="middle"
                fontSize={11}
                fontWeight={500}
                fill="#F8F9FA"
                fillOpacity={0.55}
              >
                {n.sublabel}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

// role="img" treats its content as a single leaf node — screen readers announce
// only the aria-label and never descend into children, even if they aren't
// aria-hidden. So the flow's actual content (nodes + connections) is exposed
// as a plain sr-only list, as a SIBLING of the role="img" box, not inside it.
function describeFlow(data: FlowDiagramData): { id: string; text: string }[] {
  const labelById = new Map(data.nodes.map((n) => [n.id, n.label]));
  const outgoing = new Map<string, FlowEdge[]>();
  data.edges.forEach((e) => outgoing.set(e.from, [...(outgoing.get(e.from) ?? []), e]));

  return [...data.nodes]
    .sort((a, b) => a.col - b.col || a.row - b.row)
    .map((n) => {
      const next = (outgoing.get(n.id) ?? [])
        .map((e) => {
          const target = labelById.get(e.to) ?? e.to;
          const suffix = e.label ? ` (${e.label})` : '';
          return e.kind === 'feedback' ? `feeds back to ${target}${suffix}` : `${target}${suffix}`;
        })
        .join(', then ');
      const parts = [`${n.label}${n.sublabel ? `, ${n.sublabel}` : ''} — ${n.kind}.`];
      if (next) parts.push(`Leads to: ${next}.`);
      return { id: n.id, text: parts.join(' ') };
    });
}

const FlowDiagram: React.FC<FlowDiagramProps> = ({ data, palette, className = '' }) => (
  <div className={className}>
    <div role="img" aria-label={data.title}>
      <div className="hidden md:block" aria-hidden="true">
        <DiagramSvg data={data} palette={palette} vertical={false} />
      </div>
      <div className="md:hidden" aria-hidden="true">
        <DiagramSvg data={data} palette={palette} vertical />
      </div>
    </div>
    <ol className="sr-only">
      {describeFlow(data).map((step) => (
        <li key={step.id}>{step.text}</li>
      ))}
    </ol>
  </div>
);

export default FlowDiagram;
