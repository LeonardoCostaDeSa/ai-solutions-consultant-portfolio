
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DataStreams from './DataStreams';

const Hero: React.FC = () => {
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();
  const text = "Bridging messy human problems with intelligent, structured systems.";
  const [displayText, setDisplayText] = useState("");
  
  const beforeText = "Bridging messy human problems with ";
  const highlightText = "intelligent";
  const afterText = ", structured systems.";

  useEffect(() => {
    let current = "";
    let i = 0;
    const stepMs = Math.max(1, Math.floor(1000 / text.length));
    const interval = setInterval(() => {
      if (i < text.length) {
        current += text[i];
        setDisplayText(current);
        i++;
      } else {
        clearInterval(interval);
        setComplete(true);
      }
    }, stepMs);
    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const buttonClass = "px-8 md:px-10 py-4 md:py-5 bg-transparent border border-white/20 hover:bg-indigo hover:border-indigo text-white rounded-full font-bold text-base md:text-lg transition-all duration-300 backdrop-blur-sm flex-grow sm:flex-grow-0 active:scale-95 z-10";

  const springConfig = {
    type: "spring" as const,
    stiffness: 80,
    damping: 18,
    mass: 1
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
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
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="w-8 h-[1px] bg-indigo" />
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/60">
            AI Engineer
          </span>
          <span className="w-8 h-[1px] bg-indigo" />
        </motion.div>

        <div className="grid mb-12">
          {/* Layout sizer — invisible full text reserves the final dimensions */}
          <h1
            aria-hidden
            className="text-4xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight invisible col-start-1 row-start-1 select-none pointer-events-none"
          >
            {beforeText}{highlightText}{afterText}
          </h1>

          {/* Visible typing animation — overlays in the same grid cell */}
          <motion.h1
            className="text-4xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight text-white selection:bg-teal selection:text-charcoal col-start-1 row-start-1"
          >
            <span>{displayText.slice(0, beforeText.length)}</span>
            <motion.span
              animate={{
                color: complete ? '#4F46E5' : '#FFFFFF',
                textShadow: complete ? '0 0 20px rgba(79,70,229,0.4)' : '0 0 0px rgba(0,0,0,0)'
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {displayText.slice(beforeText.length, beforeText.length + highlightText.length)}
            </motion.span>
            <span>{displayText.slice(beforeText.length + highlightText.length)}</span>

            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-1.5 h-12 md:h-20 bg-indigo ml-2 align-middle"
            />
          </motion.h1>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 min-h-[100px]">
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
            Who am I?
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            whileHover={{
              boxShadow: "0 0 30px rgba(79,70,229,0.5)",
              borderColor: "rgba(79,70,229,1)"
            }}
            onClick={() => navigate('/process')}
            className={buttonClass}
          >
            Resume
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{
              boxShadow: "0 0 30px rgba(79,70,229,0.5)",
              borderColor: "rgba(79,70,229,1)"
            }}
            onClick={() => navigate('/solutions')}
            className={buttonClass}
          >
            Projects
          </motion.button>

          <motion.a
            href="https://www.linkedin.com/in/leonardocostadesa/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            whileHover={{
              boxShadow: "0 0 40px rgba(79,70,229,0.7)",
            }}
            className="px-8 md:px-10 py-4 md:py-5 bg-indigo hover:bg-indigo/90 text-white rounded-full font-black text-base md:text-lg transition-all duration-300 flex-grow sm:flex-grow-0 active:scale-95 z-10 tracking-wide shadow-lg shadow-indigo/30"
          >
            Hire Me
          </motion.a>
        </div>
      </div>

    </section>
  );
};

export default Hero;
