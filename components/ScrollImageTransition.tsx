
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ScrollImageTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Use a spring for smoother horizontal movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Opacity: fades in, stays visible, then fades out
  const opacity = useTransform(smoothProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  
  // Scale: subtle growth as you scroll
  const scale = useTransform(smoothProgress, [0.1, 0.9], [0.85, 1.05]);
  
  // Horizontal movement: "walks" from left to right - reduced range for better mobile containment
  const x = useTransform(smoothProgress, [0, 1], ["-40vw", "40vw"]);
  
  // Subtle vertical float
  const y = useTransform(smoothProgress, [0, 1], [30, -30]);

  // Rotation for a dynamic feel
  const rotate = useTransform(smoothProgress, [0, 1], [-5, 5]);

  return (
    <div ref={containerRef} className="h-[80vh] md:h-[100vh] relative flex items-center justify-center overflow-hidden pointer-events-none -my-10 md:-my-20">
      <motion.div 
        style={{ opacity, scale, x, y, rotate }}
        className="relative w-[70vw] max-w-sm md:max-w-md lg:max-w-lg aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.8)] z-20"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal z-10 opacity-60" />
        
        <img 
          src="/img/foto_principal.jpg" 
          alt="Architect of Systems" 
          className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
        />
        
        {/* Floating label overlay inside the card */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20"
        >
          <span className="text-teal font-black uppercase tracking-[0.5em] text-[7px] md:text-[14px] mb-2 block">AI Solutions Consultant</span>
          <div className="h-[1px] w-8 md:w-12 bg-teal mb-3 md:mb-4" />
          <p className="text-white/40 text-[8px] md:text-[16px] font-bold uppercase tracking-widest">Leonardo Sá</p>
        </motion.div>
      </motion.div>

      {/* Dynamic Background flare that follows the image slightly or stays centered */}
      <motion.div 
        style={{ 
          opacity: useTransform(smoothProgress, [0.3, 0.5, 0.7], [0, 0.4, 0]),
          x: useTransform(smoothProgress, [0, 1], ["-15vw", "15vw"]) 
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo/10 blur-[80px] md:blur-[120px] rounded-full -z-10"
      />
      
      {/* Decorative vertical line */}
      <div className="absolute inset-y-0 left-1/2 w-[1px] bg-white/[0.03] -z-20" />
    </div>
  );
};

export default ScrollImageTransition;
