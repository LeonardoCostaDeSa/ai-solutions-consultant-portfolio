
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Target } from 'lucide-react';
import { solutions } from '../data/content';
import BorderBeam from '../components/BorderBeam';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import ProjectEnvironment from '../components/environments/ProjectEnvironment';
import { track } from '../lib/analytics';

const MotionLink = motion.create(Link);

const SolutionsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'engineering' | 'AI Adoption'>('all');

  const ordered = [...solutions].sort((a, b) => a.order - b.order);
  const filteredSolutions = filter === 'all' ? ordered : ordered.filter((s) => s.category === filter);

  const counts = {
    all: solutions.length,
    engineering: solutions.filter((s) => s.category === 'engineering').length,
    'AI Adoption': solutions.filter((s) => s.category === 'AI Adoption').length,
  };

  return (
    <div className="bg-charcoal min-h-screen text-offwhite overflow-x-clip">
      <Seo
        title="Case Studies — Leonardo Sá · AI Engineer"
        description="Production GenAI case studies with validated metrics: 94% accuracy legal/tax search, 50,000 documents analyzed in 6 hours, a production multi-agent review platform, and AI adoption at 1,600+ scale."
        path="/solutions"
      />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <span className="text-coral font-black uppercase tracking-[0.4em] text-xs mb-6 block">Case studies · 2024–2026</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
              Selected <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-indigo italic">work.</span>
            </h1>
            <p className="text-xl text-white/60 font-medium leading-relaxed">
              Production systems and adoption programs with validated metrics — built for environments where errors are expensive.
            </p>
          </div>
        </motion.div>
      </div>

      {/* LIGHT SECTION — cards grid */}
      <section className="relative bg-offwhite py-20 md:py-28 px-6">
        <div className="w-full h-1 bg-gradient-to-r from-coral via-indigo to-teal absolute top-0 left-0" />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10 md:mb-14">
            <span className="text-charcoal/40 font-black uppercase tracking-[0.4em] text-xs">Case Studies</span>
            <div className="hidden md:block flex-1 h-[1px] bg-charcoal/10" />
            <div className="flex bg-charcoal/10 p-1.5 rounded-full border border-charcoal/15 self-start md:self-auto isolate max-w-full overflow-x-auto no-scrollbar gap-1">
              {(['all', 'engineering', 'AI Adoption'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => { setFilter(type); track('case-filter', { filter: type }); }}
                  className={`relative isolate px-4 md:px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    filter === type ? 'text-white' : 'text-charcoal/80 hover:text-charcoal'
                  }`}
                >
                  {filter === type && (
                    <motion.div layoutId="activeFilter" className="absolute inset-0 bg-charcoal rounded-full -z-10 shadow-md" />
                  )}
                  <span>{type}</span>
                  <span className={`text-xs font-black tabular-nums ${filter === type ? 'text-white/60' : 'text-charcoal/50'}`}>
                    {counts[type]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <AnimatePresence mode="popLayout">
              {filteredSolutions.map((sol) => (
                <MotionLink
                  key={sol.id}
                  to={`/solutions/${sol.slug}`}
                  layoutId={sol.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => track('case-open', { project: sol.id, from: 'grid' })}
                  whileHover={{ y: -8 }}
                  aria-label={`Open case study: ${sol.title}`}
                  className="group relative cursor-pointer bg-charcoal rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-charcoal/20 transition-all duration-500 block"
                >
                  <BorderBeam color={sol.palette.accent} duration={4} />

                  <div className="aspect-[16/10] relative overflow-hidden">
                    <ProjectEnvironment seed={sol.id} palette={sol.palette} archetype={sol.archetype} variant="card" />
                  </div>

                  <div className="p-10 relative">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {sol.techTags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-black uppercase tracking-widest text-white/50 border border-white/10 px-2 py-1 rounded-lg bg-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl font-black mb-3 group-hover:text-white transition-colors leading-tight">{sol.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-5 italic">{sol.painPoint}</p>
                    <div
                      className="flex items-center gap-3 font-black text-xs uppercase tracking-widest bg-white/5 self-start px-4 py-2 rounded-full border border-white/10 mb-6"
                      style={{ color: sol.palette.accent }}
                    >
                      <Target size={14} />
                      <span>{sol.impactMetric}</span>
                    </div>
                    <div
                      className="flex items-center gap-3 font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: sol.palette.accent }}
                    >
                      <span>Read Case Study</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 w-full h-1.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 ease-out"
                    style={{ background: `linear-gradient(90deg, ${sol.palette.accent}, #4F46E5)` }}
                  />
                </MotionLink>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
