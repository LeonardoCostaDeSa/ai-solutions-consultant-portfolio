
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { solutions } from '../data/content';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import FeaturedProjectSection from '../components/journey/FeaturedProjectSection';
import SecondaryProjectIndex from '../components/journey/SecondaryProjectIndex';

/**
 * The projects journey. A quiet dark intro, then three full-viewport chapters
 * — each scroll carries the visitor into that project's environment — and an
 * editorial index of the remaining work. Beauty as evidence of care.
 */

const SolutionsPage: React.FC = () => {
  const ordered = [...solutions].sort((a, b) => a.order - b.order);
  const featured = ordered.filter((s) => s.featured);
  const secondary = ordered.filter((s) => !s.featured);

  return (
    <div className="bg-charcoal min-h-screen text-offwhite overflow-x-clip">
      <Seo
        title="Case Studies — Leonardo Sá · AI Engineer"
        description="Eight AI projects with real, measured results. A review platform in production, 50,000 documents read in 6 hours, and a search engine with 94% validated accuracy."
        path="/solutions"
      />
      <Navbar />

      {/* INTRO */}
      <header className="relative min-h-[72vh] flex items-end px-6 pb-16 md:pb-24 pt-40 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-40" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(90% 70% at 20% 0%, rgba(79,70,229,0.25) 0%, transparent 60%), radial-gradient(70% 60% at 90% 100%, rgba(6,182,212,0.12) 0%, transparent 60%)',
            }}
          />
        </div>
        <div className="max-w-6xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-coral font-black uppercase tracking-[0.4em] text-xs mb-6 block">
              Case studies · 2024–2026
            </span>
            <h1 className="text-5xl md:text-8xl font-black leading-[0.98] tracking-tighter mb-8">
              Selected{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral via-indigo to-teal italic">
                work.
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 font-medium leading-relaxed max-w-2xl mb-12">
              Eight projects with real, measured results. The first three are the ones
              I'm proudest of — scroll to walk through them.
            </p>
            <div className="flex items-center gap-3 text-white/40 text-xs font-black uppercase tracking-widest">
              <ArrowDown size={14} className="animate-bounce" />
              <span>Scroll</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* FEATURED CHAPTERS */}
      {featured.map((sol, i) => (
        <FeaturedProjectSection key={sol.id} solution={sol} index={i} />
      ))}

      {/* INDEX OF THE REST */}
      <SecondaryProjectIndex solutions={secondary} startIndex={featured.length} />
    </div>
  );
};

export default SolutionsPage;
