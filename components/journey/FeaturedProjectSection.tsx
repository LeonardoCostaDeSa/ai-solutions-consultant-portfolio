
import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Target } from 'lucide-react';
import type { Solution } from '../../types';
import ProjectEnvironment from '../environments/ProjectEnvironment';
import { useHydrated } from '../../lib/useHydrated';
import { track } from '../../lib/analytics';

/**
 * One full-viewport immersive chapter of the projects journey.
 *
 * The outer section is tall (260vh); the inner viewport is sticky, so the
 * visitor "dwells" inside the project's environment while scroll progress
 * drives a quiet choreography: parallax on the environment layers, the title
 * revealing, metric and tags settling in, and a dim on exit. Transform and
 * opacity only — nothing that triggers layout or repaints gradients.
 *
 * Without JS (static HTML) or with prefers-reduced-motion, the section
 * renders as a fully composed, non-pinned viewport — every word readable.
 */

interface FeaturedProjectSectionProps {
  solution: Solution;
  index: number;
}

const FeaturedProjectSection: React.FC<FeaturedProjectSectionProps> = ({ solution, index }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const hydrated = useHydrated();
  const reducedMotion = useReducedMotion();
  const active = hydrated && !reducedMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Environment parallax — geometry drifts faster than light (depth).
  const geometryY = useTransform(progress, [0, 1], ['0vh', '-14vh']);
  const lightY = useTransform(progress, [0, 1], ['0vh', '-7vh']);

  // Content choreography.
  const titleY = useTransform(progress, [0.04, 0.2], ['48px', '0px']);
  const titleClip = useTransform(progress, [0.04, 0.2], ['inset(0 0 100% 0)', 'inset(0 0 0% 0)']);
  const taglineOpacity = useTransform(progress, [0.14, 0.26], [0, 1]);
  const taglineY = useTransform(progress, [0.14, 0.26], ['24px', '0px']);
  const metaOpacity = useTransform(progress, [0.22, 0.34], [0, 1]);
  const ctaOpacity = useTransform(progress, [0.3, 0.42], [0, 1]);
  const exitDim = useTransform(progress, [0.82, 1], [1, 0.3]);

  const { palette } = solution;
  const number = String(index + 1).padStart(2, '0');

  return (
    <section
      ref={sectionRef}
      className={active ? 'relative h-[260vh]' : 'relative'}
      aria-label={`Featured project: ${solution.title}`}
    >
      <div className={active ? 'sticky top-0 h-screen overflow-hidden' : 'relative min-h-screen overflow-hidden'}>
        <ProjectEnvironment
          seed={solution.id}
          palette={palette}
          archetype={solution.archetype}
          variant="hero"
          parallax={active ? { geometry: { y: geometryY }, light: { y: lightY } } : undefined}
        />

        <motion.div
          className="relative z-10 h-full min-h-screen flex items-center"
          style={active ? { opacity: exitDim } : undefined}
          onViewportEnter={() => track('case-section-view', { project: solution.id })}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="max-w-6xl mx-auto w-full px-6 py-24">
            {/* Chapter number + category */}
            <div className="flex items-center gap-5 mb-8">
              <span className="text-5xl md:text-6xl font-black tabular-nums" style={{ color: `${palette.accent}55` }}>
                {number}
              </span>
              <div className="h-[1px] w-14" style={{ backgroundColor: `${palette.accent}66` }} />
              <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: palette.accent }}>
                {solution.category}
              </span>
            </div>

            {/* Title — clip reveal */}
            <motion.h2
              className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.02] text-white mb-6 max-w-4xl"
              style={active ? { y: titleY, clipPath: titleClip } : undefined}
            >
              {solution.title}
            </motion.h2>

            <motion.p
              className="text-lg md:text-2xl text-white/80 font-medium leading-relaxed max-w-2xl mb-10"
              style={active ? { opacity: taglineOpacity, y: taglineY } : undefined}
            >
              {solution.tagline}
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4 mb-12"
              style={active ? { opacity: metaOpacity } : undefined}
            >
              <span
                className="inline-flex items-center gap-3 font-black text-xs uppercase tracking-widest px-5 py-3 rounded-full border"
                style={{ color: palette.accent, borderColor: `${palette.accent}66`, backgroundColor: `${palette.accent}14` }}
              >
                <Target size={14} />
                <span>{solution.impactMetric}</span>
              </span>
              <span className="flex flex-wrap gap-2">
                {solution.techTags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-black uppercase tracking-widest text-white/60 border border-white/15 px-3 py-2 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            </motion.div>

            <motion.div style={active ? { opacity: ctaOpacity } : undefined}>
              <Link
                to={`/solutions/${solution.slug}`}
                onClick={() => track('case-open', { project: solution.id, from: 'featured' })}
                className="group inline-flex items-center gap-4 text-sm md:text-base font-black uppercase tracking-widest text-white hover:text-white transition-colors"
              >
                <span
                  className="border-b-2 pb-1 transition-colors"
                  style={{ borderColor: palette.accent }}
                >
                  Read the case study
                </span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" style={{ color: palette.accent }} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjectSection;
