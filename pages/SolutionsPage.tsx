
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Target, Zap, ChevronRight, Layers, Brain, Lightbulb, Users } from 'lucide-react';
import { solutions } from '../data/content';
import { Solution } from '../types';
import BorderBeam from '../components/BorderBeam';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import { track } from '../lib/analytics';

const SolutionsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'engineering' | 'AI Adoption'>('all');
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);

  const filteredSolutions = filter === 'all'
    ? solutions
    : solutions.filter(s => s.category === filter);

  const counts = {
    all: solutions.length,
    engineering: solutions.filter(s => s.category === 'engineering').length,
    'AI Adoption': solutions.filter(s => s.category === 'AI Adoption').length,
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
            <span className="text-charcoal/40 font-black uppercase tracking-[0.4em] text-[10px]">Case Studies</span>
            <div className="hidden md:block flex-1 h-[1px] bg-charcoal/10" />
            <div className="flex bg-charcoal/10 p-1 rounded-full border border-charcoal/15 self-start md:self-auto isolate">
              {(['all', 'engineering', 'AI Adoption'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => { setFilter(type); track('case-filter', { filter: type }); }}
                  className={`relative isolate px-3 md:px-4 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.18em] transition-all flex items-center gap-1 md:gap-1.5 whitespace-nowrap ${
                    filter === type ? 'text-white' : 'text-charcoal/80 hover:text-charcoal'
                  }`}
                >
                  {filter === type && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-charcoal rounded-full -z-10 shadow-md"
                    />
                  )}
                  <span>{type}</span>
                  <span className={`text-[8px] md:text-[9px] font-black tabular-nums ${filter === type ? 'text-white/60' : 'text-charcoal/50'}`}>
                    {counts[type]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredSolutions.map((sol) => (
                <motion.div
                  key={sol.id}
                  layoutId={sol.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => { setSelectedSolution(sol); track('project-open', { project: sol.id }); }}
                  whileHover={{ y: -8 }}
                  className="group relative cursor-pointer bg-charcoal rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-charcoal/20 transition-all duration-500"
                >
                <BorderBeam color={sol.category === 'engineering' ? '#06B6D4' : '#F97316'} duration={4} />
                
                <div className="aspect-[16/10] relative overflow-hidden">
                  <motion.img
                    src={sol.image}
                    srcSet={sol.imageSrcSet}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    alt={`${sol.title} — solution overview`}
                    width={960}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />
                  {/* Click affordance — visible on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-5 py-2 bg-charcoal/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white border border-white/20">
                      Click to expand
                    </span>
                  </div>
                  <div className={`absolute top-6 right-6 backdrop-blur-xl px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 ${
                    sol.category === 'engineering' ? 'bg-teal/10 text-teal' : 'bg-coral/10 text-coral'
                  }`}>
                    {sol.category}
                  </div>
                </div>

                <div className="p-10 relative">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {sol.techTags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-white/30 border border-white/10 px-2 py-1 rounded-lg bg-white/5">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-black mb-3 group-hover:text-white transition-colors leading-tight">{sol.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5 italic">{sol.painPoint}</p>
                  <div className={`flex items-center gap-3 font-black text-[11px] uppercase tracking-widest bg-white/5 self-start px-4 py-2 rounded-full border border-white/10 mb-6 ${
                     sol.category === 'engineering' ? 'text-teal' : 'text-coral'
                  }`}>
                    <Target size={14} />
                    <span>{sol.impactMetric}</span>
                  </div>
                  {/* CTA */}
                  <div className={`flex items-center gap-3 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    sol.category === 'engineering' ? 'text-teal' : 'text-coral'
                  }`}>
                    <span>View Case Study</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* Accent line */}
                <div className={`absolute bottom-0 left-0 w-full h-1.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 ease-out ${
                   sol.category === 'engineering' ? 'bg-gradient-to-r from-teal to-indigo' : 'bg-gradient-to-r from-coral to-indigo'
                }`} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        </div>
      </section>

      {/* Expanded System Modal */}
      <AnimatePresence>
        {selectedSolution && (
          <motion.div 
            key="modal-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSolution(null)}
              className="absolute inset-0 bg-charcoal/95 backdrop-blur-3xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="relative w-full max-w-6xl bg-[#1a1a1a] border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row h-[90vh] md:h-auto md:max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedSolution(null)}
                className="absolute top-8 right-8 z-20 p-4 bg-white/5 hover:bg-coral hover:text-white rounded-full border border-white/10 transition-all backdrop-blur-xl"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-[40%] overflow-hidden h-48 md:h-auto relative shrink-0">
                <img
                  src={selectedSolution.image}
                  srcSet={selectedSolution.imageSrcSet}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  alt=""
                  width={960}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1a1a1a]/50 to-[#1a1a1a] hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent md:hidden" />
              </div>

              <div className="w-full md:w-[60%] p-8 md:p-16 overflow-y-auto custom-scrollbar flex flex-col">
                <div className={`flex items-center gap-3 font-black uppercase tracking-[0.3em] text-[10px] mb-8 shrink-0 ${
                  selectedSolution.category === 'engineering' ? 'text-teal' : 'text-coral'
                }`}>
                  <Zap size={14} fill="currentColor" />
                  <span>Case Study</span>
                  <span className="text-white/20">·</span>
                  <span className="text-white/40">{selectedSolution.category}</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-[1.1] tracking-tighter shrink-0">
                  {selectedSolution.title}
                </h2>

                <div className="max-w-none mb-12 shrink-0">
                  <p className="text-white/60 leading-relaxed text-lg md:text-xl font-medium italic border-l-4 border-white/10 pl-6">
                    "{selectedSolution.quote}"
                  </p>
                </div>

                <div className="grid gap-12 mb-12">
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-[0.2em] text-white/30 mb-4 flex items-center gap-3">
                      <Brain size={16} /> Context & Problem
                    </h4>
                    <p className="text-white/80 leading-relaxed whitespace-pre-line">
                      <span className="text-white/40 block text-sm mb-2 uppercase tracking-wider font-bold">Context</span>
                      {selectedSolution.context}
                      <span className="text-white/40 block text-sm mb-2 mt-4 uppercase tracking-wider font-bold">The Problem</span>
                      {selectedSolution.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-black text-xs uppercase tracking-[0.2em] text-white/30 mb-4 flex items-center gap-3">
                      <Layers size={16} /> Solution Design
                    </h4>
                    <p className="text-white/80 leading-relaxed whitespace-pre-line">
                      {selectedSolution.solution}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                      <h4 className="font-black text-xs uppercase tracking-[0.2em] text-white/30 mb-4 flex items-center gap-2">
                        <Users size={14} /> My Role
                      </h4>
                      <p className="text-sm text-white/70 leading-relaxed">
                        {selectedSolution.role}
                      </p>
                    </div>
                    <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                      <h4 className="font-black text-xs uppercase tracking-[0.2em] text-white/30 mb-4 flex items-center gap-2">
                         <Lightbulb size={14} /> Key Insight
                      </h4>
                      <p className={`text-sm font-bold leading-relaxed ${
                         selectedSolution.category === 'engineering' ? 'text-teal' : 'text-coral'
                      }`}>
                        {selectedSolution.insight}
                      </p>
                    </div>
                  </div>
                </div>
                  
                <div className="bg-white/[0.03] rounded-3xl p-8 border border-white/5 shrink-0">
                  <h4 className="font-black text-xs uppercase tracking-[0.3em] text-white/30 mb-6 flex items-center gap-4">
                    <div className="w-8 h-[1px] bg-white/10" />
                    Strategic Highlights
                  </h4>
                  <div className="grid gap-4">
                    {selectedSolution.highlights.map((text, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <ChevronRight size={16} className={`mt-1 flex-shrink-0 ${
                          selectedSolution.category === 'engineering' ? 'text-teal' : 'text-coral'
                        }`} />
                        <p className="text-sm text-white/80 font-bold">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SolutionsPage;
