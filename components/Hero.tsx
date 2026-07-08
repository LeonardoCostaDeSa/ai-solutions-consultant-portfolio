
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DataStreams from './DataStreams';

const MotionLink = motion.create(Link);

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const buttonClass = "px-8 md:px-10 py-4 md:py-5 bg-transparent border border-white/20 hover:bg-indigo hover:border-indigo text-white rounded-full font-bold text-base md:text-lg transition-all duration-300 backdrop-blur-sm flex-grow sm:flex-grow-0 active:scale-95 z-10";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20 md:py-24">
      {/* Background Stack */}
      <div className="absolute inset-0 -z-10 bg-charcoal overflow-hidden">
        {/* Base Layer: Ambient Blobs (Lower Opacity to not drown out pulses) */}
        <div className="absolute inset-0 opacity-15">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: ['-5%', '5%', '-5%'],
              y: ['-5%', '5%', '-5%'],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo blur-[200px] rounded-full"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              x: ['5%', '-5%', '5%'],
              y: ['5%', '-5%', '5%'],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-teal blur-[200px] rounded-full"
          />
        </div>

        {/* Active Layer: Neural Organized Pulses (On top of blobs) */}
        <DataStreams />
      </div>

      <div className="max-w-5xl text-center relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="w-8 h-[1px] bg-indigo" />
          <span className="text-xs font-black uppercase tracking-[0.4em] text-white/60">
            AI Engineer
          </span>
          <span className="w-8 h-[1px] bg-indigo" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white mb-8"
        >
          I design, ship and operate GenAI systems{' '}
          <span className="text-indigo" style={{ textShadow: '0 0 20px rgba(79,70,229,0.4)' }}>
            where errors are expensive.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-base md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-12"
        >
          I build AI systems for tax, legal, compliance and education teams.
          Every system I ship can show where its answers come from — and proves it with audit trails.
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <motion.a
            href="mailto:leonardo@leonardosa.pro"
            data-umami-event="contact-click"
            data-umami-event-location="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{
              boxShadow: "0 0 40px rgba(79,70,229,0.7)",
            }}
            className="px-8 md:px-10 py-4 md:py-5 bg-indigo hover:bg-indigo/90 text-white rounded-full font-black text-base md:text-lg transition-all duration-300 flex-grow sm:flex-grow-0 active:scale-95 z-10 tracking-wide shadow-lg shadow-indigo/30 text-center"
          >
            Let's talk
          </motion.a>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{
              boxShadow: "0 0 30px rgba(79,70,229,0.5)",
              borderColor: "rgba(79,70,229,1)"
            }}
            onClick={scrollToAbout}
            className={buttonClass}
          >
            About me
          </motion.button>

          <MotionLink
            to="/solutions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            whileHover={{
              boxShadow: "0 0 30px rgba(79,70,229,0.5)",
              borderColor: "rgba(79,70,229,1)"
            }}
            className={buttonClass + ' text-center'}
          >
            Projects
          </MotionLink>

          <MotionLink
            to="/process"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{
              boxShadow: "0 0 30px rgba(79,70,229,0.5)",
              borderColor: "rgba(79,70,229,1)"
            }}
            className={buttonClass + ' text-center'}
          >
            Resume
          </MotionLink>
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/40 text-xs font-bold uppercase tracking-widest"
        >
          <span>KPMG</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>University of São Paulo</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Université Lumière Lyon 2</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Peer-reviewed author</span>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
