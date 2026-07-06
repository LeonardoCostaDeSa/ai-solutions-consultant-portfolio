
import React, { useMemo } from 'react';
import { motion, type MotionStyle } from 'framer-motion';
import { createRng } from '../../lib/prng';
import { GRAIN_DATA_URI } from '../../lib/grain';
import type { ProjectPalette, EnvironmentArchetype } from '../../types';

/**
 * Generative environment for a project. Five layers, bottom to top:
 * base wash → architectural geometry (SVG) → volumetric light → film grain → vignette.
 *
 * Everything derives deterministically from `seed` (no Math.random/Date/window
 * in render) so the SSG markup matches hydration exactly. Layers are static;
 * motion comes from the parent passing transform-only MotionStyles for the
 * geometry and light layers (parallax).
 */

type Variant = 'hero' | 'strip' | 'card';

interface ProjectEnvironmentProps {
  seed: string;
  palette: ProjectPalette;
  archetype: EnvironmentArchetype;
  variant?: Variant;
  className?: string;
  /** Transform-only styles applied by the parent for scroll parallax. */
  parallax?: { geometry?: MotionStyle; light?: MotionStyle };
}

const DENSITY: Record<Variant, number> = { hero: 1, card: 0.65, strip: 0.4 };

const VB_W = 1600;
const VB_H = 900;

type Rng = () => number;
const between = (rng: Rng, min: number, max: number) => min + rng() * (max - min);

/* ---------------------------------------------------------------------------
 * Archetype geometry generators — each returns SVG children for a 1600×900
 * viewBox. Strokes/fills use the palette at low opacity; composition rules
 * borrow from editorial/architectural photography: few elements, one anchor.
 * ------------------------------------------------------------------------- */

function editorialGeometry(rng: Rng, p: ProjectPalette, density: number): React.ReactNode {
  // Ruled baselines + one large anchoring arc, like a well-set page.
  const lines = Math.round(7 * density) + 2;
  const anchorX = between(rng, VB_W * 0.55, VB_W * 0.75);
  const anchorY = between(rng, VB_H * 0.3, VB_H * 0.5);
  const anchorR = between(rng, 220, 340);
  return (
    <>
      {Array.from({ length: lines }, (_, i) => {
        const y = (VB_H / (lines + 1)) * (i + 1) + between(rng, -12, 12);
        const x1 = between(rng, 0, VB_W * 0.15);
        const x2 = between(rng, VB_W * 0.75, VB_W);
        return (
          <line key={`l${i}`} x1={x1} y1={y} x2={x2} y2={y} stroke={p.accent} strokeOpacity={0.09} strokeWidth={1} />
        );
      })}
      <circle cx={anchorX} cy={anchorY} r={anchorR} fill="none" stroke={p.accent} strokeOpacity={0.16} strokeWidth={1.5} />
      <circle cx={anchorX} cy={anchorY} r={anchorR * 0.62} fill={p.glow} fillOpacity={0.04} />
      {Array.from({ length: Math.round(4 * density) }, (_, i) => {
        const x = between(rng, VB_W * 0.08, VB_W * 0.4);
        const y = between(rng, VB_H * 0.15, VB_H * 0.85);
        return <line key={`t${i}`} x1={x} y1={y - 14} x2={x} y2={y + 14} stroke={p.accent} strokeOpacity={0.22} strokeWidth={1.5} />;
      })}
    </>
  );
}

function vaultGeometry(rng: Rng, p: ProjectPalette, density: number): React.ReactNode {
  // Translucent planes receding in perspective — volumes in an archive vault.
  const planes = Math.round(6 * density) + 2;
  const cx = between(rng, VB_W * 0.35, VB_W * 0.6);
  return (
    <>
      {Array.from({ length: planes }, (_, i) => {
        const t = i / (planes - 1);
        const w = 900 - t * 620;
        const h = 560 - t * 380;
        const x = cx - w / 2 + (t * between(rng, -60, 60));
        const y = VB_H * 0.52 - h / 2 - t * 40;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx={10}
            fill={p.glow}
            fillOpacity={0.022}
            stroke={p.accent}
            strokeOpacity={0.14 - t * 0.06}
            strokeWidth={1.2}
          />
        );
      })}
      <line x1={0} y1={VB_H * 0.82} x2={VB_W} y2={VB_H * 0.82} stroke={p.accent} strokeOpacity={0.1} strokeWidth={1} />
    </>
  );
}

function archiveGeometry(rng: Rng, p: ProjectPalette, density: number): React.ReactNode {
  // Tall thin columns with one light slot — stacks in a deep archive.
  const cols = Math.round(11 * density) + 3;
  const slot = Math.floor(between(rng, cols * 0.3, cols * 0.7));
  const colW = VB_W / cols;
  return (
    <>
      {Array.from({ length: cols }, (_, i) => {
        const x = i * colW + colW * 0.5;
        const isSlot = i === slot;
        const topY = between(rng, VB_H * 0.04, VB_H * 0.18);
        return (
          <g key={i}>
            <line x1={x} y1={topY} x2={x} y2={VB_H} stroke={p.accent} strokeOpacity={isSlot ? 0.3 : 0.08} strokeWidth={isSlot ? 2 : 1} />
            {isSlot && <rect x={x - colW * 0.32} y={topY} width={colW * 0.64} height={VB_H} fill={p.glow} fillOpacity={0.05} />}
          </g>
        );
      })}
      {Array.from({ length: Math.round(3 * density) + 1 }, (_, i) => {
        const y = between(rng, VB_H * 0.2, VB_H * 0.8);
        return <line key={`h${i}`} x1={0} y1={y} x2={VB_W} y2={y} stroke={p.accent} strokeOpacity={0.05} strokeWidth={1} />;
      })}
    </>
  );
}

function gridGeometry(rng: Rng, p: ProjectPalette, density: number): React.ReactNode {
  // A structured lattice with one highlighted cluster — shared understanding.
  const step = 90;
  const dots: React.ReactNode[] = [];
  const clusterX = between(rng, VB_W * 0.55, VB_W * 0.8);
  const clusterY = between(rng, VB_H * 0.25, VB_H * 0.6);
  for (let x = step; x < VB_W; x += step) {
    for (let y = step; y < VB_H; y += step) {
      const d = Math.hypot(x - clusterX, y - clusterY);
      const inCluster = d < 190;
      if (!inCluster && rng() > 0.62 * density) continue;
      dots.push(
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={inCluster ? 3 : 1.6}
          fill={inCluster ? p.glow : p.accent}
          fillOpacity={inCluster ? 0.5 : 0.14}
        />
      );
    }
  }
  return (
    <>
      {dots}
      <circle cx={clusterX} cy={clusterY} r={190} fill="none" stroke={p.accent} strokeOpacity={0.18} strokeWidth={1.2} />
    </>
  );
}

function fieldGeometry(rng: Rng, p: ProjectPalette, density: number): React.ReactNode {
  // Nodes along flowing paths — captured moments becoming structure.
  const paths = Math.round(3 * density) + 1;
  return (
    <>
      {Array.from({ length: paths }, (_, i) => {
        const y0 = between(rng, VB_H * 0.2, VB_H * 0.8);
        const c1x = between(rng, VB_W * 0.2, VB_W * 0.4);
        const c1y = y0 + between(rng, -180, 180);
        const c2x = between(rng, VB_W * 0.6, VB_W * 0.8);
        const c2y = y0 + between(rng, -180, 180);
        const y1 = y0 + between(rng, -120, 120);
        const d = `M 0 ${y0} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${VB_W} ${y1}`;
        const nodes = Math.round(between(rng, 3, 6));
        return (
          <g key={i}>
            <path d={d} fill="none" stroke={p.accent} strokeOpacity={0.13} strokeWidth={1.2} />
            {Array.from({ length: nodes }, (_, j) => {
              // Sample points roughly along the curve via parameter t
              const t = (j + 1) / (nodes + 1);
              const x = VB_W * t;
              const y = y0 + (y1 - y0) * t + Math.sin(t * Math.PI) * (c1y - y0) * 0.5;
              return <circle key={j} cx={x} cy={y} r={between(rng, 2.5, 5)} fill={p.glow} fillOpacity={0.4} />;
            })}
          </g>
        );
      })}
    </>
  );
}

function strataGeometry(rng: Rng, p: ProjectPalette, density: number): React.ReactNode {
  // Layered offset bands — process strata, sedimented and ordered.
  const bands = Math.round(6 * density) + 3;
  const bandH = VB_H / (bands + 2);
  return (
    <>
      {Array.from({ length: bands }, (_, i) => {
        const y = bandH * (i + 1.5);
        const inset = between(rng, 0, VB_W * 0.22);
        const fromLeft = rng() > 0.5;
        const x = fromLeft ? 0 : inset;
        const w = VB_W - inset;
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={bandH * 0.55} rx={4} fill={p.glow} fillOpacity={0.025} />
            <line x1={x} y1={y} x2={x + w} y2={y} stroke={p.accent} strokeOpacity={0.13} strokeWidth={1} />
          </g>
        );
      })}
    </>
  );
}

const GENERATORS: Record<EnvironmentArchetype, (rng: Rng, p: ProjectPalette, d: number) => React.ReactNode> = {
  editorial: editorialGeometry,
  vault: vaultGeometry,
  archive: archiveGeometry,
  grid: gridGeometry,
  field: fieldGeometry,
  strata: strataGeometry,
};

/* ------------------------------------------------------------------------- */

const ProjectEnvironment: React.FC<ProjectEnvironmentProps> = ({
  seed,
  palette,
  archetype,
  variant = 'hero',
  className = '',
  parallax,
}) => {
  const density = DENSITY[variant];

  const geometry = useMemo(
    () => GENERATORS[archetype](createRng(`${seed}-geometry`), palette, density),
    [seed, archetype, palette, density]
  );

  const lights = useMemo(() => {
    const rng = createRng(`${seed}-light`);
    const count = variant === 'hero' ? 2 : 1;
    return Array.from({ length: count }, (_, i) => ({
      left: `${between(rng, 5, 70)}%`,
      top: `${between(rng, -10, 45)}%`,
      size: between(rng, 34, 55),
      opacity: i === 0 ? 0.32 : 0.18,
    }));
  }, [seed, variant]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`} aria-hidden="true">
      {/* 1 — base wash */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 30% 18%, ${palette.base} 0%, transparent 62%), linear-gradient(180deg, ${palette.ambient} 0%, #121212 100%)`,
        }}
      />

      {/* 2 — architectural geometry (parallax target) */}
      <motion.div className="absolute inset-[-8%]" style={{ willChange: parallax ? 'transform' : undefined, ...parallax?.geometry }}>
        <svg className="w-full h-full" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid slice">
          {geometry}
        </svg>
      </motion.div>

      {/* 3 — volumetric light (parallax target, pre-blurred, never animated blur) */}
      <motion.div className="absolute inset-[-8%]" style={{ willChange: parallax ? 'transform' : undefined, ...parallax?.light }}>
        {lights.map((l, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: l.left,
              top: l.top,
              width: `${l.size}vmax`,
              height: `${l.size}vmax`,
              background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`,
              opacity: l.opacity,
              filter: 'blur(24px)',
            }}
          />
        ))}
      </motion.div>

      {/* 4 — film grain */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${GRAIN_DATA_URI}")`,
          backgroundSize: '180px 180px',
          opacity: 0.05,
          mixBlendMode: 'overlay',
        }}
      />

      {/* 5 — vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 100% at 50% 45%, transparent 55%, rgba(18,18,18,0.85) 100%)' }}
      />
    </div>
  );
};

export default ProjectEnvironment;
