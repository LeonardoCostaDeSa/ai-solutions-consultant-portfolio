
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Target, Zap, ChevronRight, Activity, Layers, Brain, Lightbulb, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { solutions } from '../data/content';
import { Solution } from '../types';
import BorderBeam from '../components/BorderBeam';

const SolutionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'engineering' | 'strategy'>('all');
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);

  const filteredSolutions = filter === 'all' 
    ? solutions 
    : solutions.filter(s => s.category === filter);

  return (
    <div className="bg-charcoal min-h-screen text-offwhite pb-40">
      <nav className="sticky top-0 z-50 p-6 flex justify-between items-center backdrop-blur-xl bg-charcoal/80 border-b border-white/5">
        <button 
          onClick={() => navigate('/')}
          className="group flex items-center gap-3 font-black text-sm uppercase tracking-widest hover:text-coral transition-colors"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform text-coral" />
          <span>Hub</span>
        </button>
        
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
          {(['all', 'engineering', 'AI Adoption'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${
                filter === type ? 'text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {filter === type && (
                <motion.div 
                  layoutId="activeFilter" 
                  className="absolute inset-0 bg-coral rounded-full -z-10 shadow-lg shadow-coral/30"
                />
              )}
              {type}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-24">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <span className="text-coral font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Operational Portfolio // 2024-2025</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
              Deployment <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-indigo italic">Gallery.</span>
            </h1>
            <p className="text-xl text-white/40 font-medium leading-relaxed">
              Curated architectural systems and strategic frameworks. Each node represents a successful conversion of ambiguity into structured value.
            </p>
          </div>
          <div className="flex items-center gap-6 text-white/20 font-black text-xs uppercase tracking-widest">
            <Activity size={16} className="text-coral animate-pulse" />
            <span>Systems Online</span>
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredSolutions.map((sol) => (
              <motion.div
                key={sol.id}
                layoutId={sol.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setSelectedSolution(sol)}
                whileHover={{ y: -8 }}
                className="group relative cursor-pointer bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden hover:border-coral/40 transition-all duration-500"
              >
                <BorderBeam color={sol.category === 'engineering' ? '#06B6D4' : '#F97316'} duration={4} />
                
                <div className="aspect-[16/10] relative overflow-hidden">
                  <motion.img 
                    src={sol.image} 
                    alt={sol.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />
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
                  <h3 className="text-3xl font-black mb-6 group-hover:text-white transition-colors leading-tight">{sol.title}</h3>
                  <div className={`flex items-center gap-3 font-black text-[11px] uppercase tracking-widest bg-white/5 self-start px-4 py-2 rounded-full border border-white/10 ${
                     sol.category === 'engineering' ? 'text-teal' : 'text-coral'
                  }`}>
                    <Target size={14} />
                    <span>{sol.impactMetric}</span>
                  </div>
                </div>

                {/* Aesthetic accent line */}
                <div className={`absolute bottom-0 left-0 w-full h-1.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 ease-out ${
                   sol.category === 'engineering' ? 'bg-gradient-to-r from-teal to-indigo' : 'bg-gradient-to-r from-coral to-indigo'
                }`} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

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
                <img src={selectedSolution.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1a1a1a]/50 to-[#1a1a1a] hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent md:hidden" />
              </div>

              <div className="w-full md:w-[60%] p-8 md:p-16 overflow-y-auto custom-scrollbar flex flex-col">
                <div className={`flex items-center gap-3 font-black uppercase tracking-[0.3em] text-[10px] mb-8 shrink-0 ${
                  selectedSolution.category === 'engineering' ? 'text-teal' : 'text-coral'
                }`}>
                  <Zap size={14} fill="currentColor" />
                  <span>Project Specification</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-[1.1] tracking-tighter shrink-0">
                  {selectedSolution.title}
                </h2>

                <div className="prose prose-invert max-w-none mb-12 shrink-0">
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
