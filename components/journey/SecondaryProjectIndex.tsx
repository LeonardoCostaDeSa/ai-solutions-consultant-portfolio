
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Solution } from '../../types';
import ProjectEnvironment from '../environments/ProjectEnvironment';
import { track } from '../../lib/analytics';

/**
 * Editorial index for the non-featured projects: numbered rows, each carrying
 * a narrow strip of its project environment. The whole row is a link.
 */

interface SecondaryProjectIndexProps {
  solutions: Solution[];
  /** Numbering continues after the featured chapters. */
  startIndex: number;
}

const SecondaryProjectIndex: React.FC<SecondaryProjectIndexProps> = ({ solutions, startIndex }) => (
  <section className="relative max-w-6xl mx-auto px-6 py-24 md:py-36" aria-label="More projects">
    <div className="flex items-center gap-4 mb-14">
      <span className="w-8 h-[2px] bg-white/30 rounded" />
      <h2 className="font-black uppercase tracking-[0.2em] text-xs text-white/60">More projects</h2>
    </div>

    <ol className="divide-y divide-white/10 border-y border-white/10">
      {solutions.map((sol, i) => {
        const number = String(startIndex + i + 1).padStart(2, '0');
        return (
          <li key={sol.id}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to={`/solutions/${sol.slug}`}
                onClick={() => track('case-open', { project: sol.id, from: 'index' })}
                className="group grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto_220px] items-center gap-x-6 gap-y-3 py-8 md:py-9 transition-colors hover:bg-white/[0.03] px-3 md:px-5 -mx-3 md:-mx-5"
              >
                <span className="text-2xl md:text-3xl font-black tabular-nums" style={{ color: `${sol.palette.accent}66` }}>
                  {number}
                </span>

                <span className="min-w-0">
                  <span className="block text-xl md:text-2xl font-black text-white leading-tight group-hover:underline decoration-2 underline-offset-4" style={{ textDecorationColor: sol.palette.accent }}>
                    {sol.title}
                  </span>
                  <span className="block text-sm md:text-base text-white/70 leading-relaxed mt-2 max-w-2xl">{sol.tagline}</span>
                  <span className="block text-xs md:text-sm text-white/45 leading-relaxed mt-2 max-w-2xl">{sol.painPoint}</span>
                </span>

                <span
                  className="hidden md:inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest whitespace-nowrap"
                  style={{ color: sol.palette.accent }}
                >
                  <span>{sol.impactMetric}</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>

                <span className="relative hidden md:block h-20 rounded-2xl overflow-hidden border border-white/10">
                  <ProjectEnvironment seed={sol.id} palette={sol.palette} archetype={sol.archetype} variant="strip" />
                </span>

                {/* Mobile metric line */}
                <span className="col-span-2 md:hidden inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest" style={{ color: sol.palette.accent }}>
                  <span>{sol.impactMetric}</span>
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          </li>
        );
      })}
    </ol>
  </section>
);

export default SecondaryProjectIndex;
