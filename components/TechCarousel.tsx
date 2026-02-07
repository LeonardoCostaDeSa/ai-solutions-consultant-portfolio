
import React from 'react';
import { motion } from 'framer-motion';

const techStack = [
  { name: 'Python', color: '#3776AB' },
  { name: 'CrewAI', color: '#FF4B4B' },
  { name: 'Django', color: '#092E20' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'Power Platform', color: '#0078D4' },
  { name: 'Python', color: '#3776AB' },
  { name: 'CrewAI', color: '#FF4B4B' },
  { name: 'Django', color: '#092E20' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'Power Platform', color: '#0078D4' },
];

const TechCarousel: React.FC = () => {
  return (
    <div className="py-20 bg-charcoal/50 border-y border-white/5 relative overflow-hidden group">
      {/* Decorative Gradients for side fading */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-charcoal to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-charcoal to-transparent z-10" />

      <motion.div 
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...techStack, ...techStack].map((tech, idx) => (
          <div 
            key={idx}
            className="flex items-center gap-4 px-8 py-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 backdrop-blur-sm"
          >
            <div 
              className="w-3 h-3 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.3)]"
              style={{ backgroundColor: tech.color }}
            />
            <span className="text-xl font-black uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechCarousel;
