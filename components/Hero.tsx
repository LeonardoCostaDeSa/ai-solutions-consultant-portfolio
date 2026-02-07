
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    const interval = setInterval(() => {
      if (i < text.length) {
        current += text[i];
        setDisplayText(current);
        i++;
      } else {
        clearInterval(interval);
        setComplete(true);
      }
    }, 35);
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
        <motion.h1 
          className="text-4xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-12 tracking-tight text-white selection:bg-teal selection:text-charcoal"
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

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 min-h-[100px]">
          <AnimatePresence>
            {complete && (
              <>
                <motion.button 
                  key="who-am-i"
                  initial={{ opacity: 0, x: -120 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={springConfig}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 0 30px rgba(79,70,229,0.5)",
                    borderColor: "rgba(79,70,229,1)"
                  }}
                  onClick={scrollToAbout}
                  className={buttonClass}
                >
                  Who am I?
                </motion.button>
                
                <motion.button 
                  key="resume"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...springConfig, delay: 0.15 }}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 0 30px rgba(79,70,229,0.5)",
                    borderColor: "rgba(79,70,229,1)"
                  }}
                  onClick={() => navigate('/process')}
                  className={buttonClass}
                >
                  Resume
                </motion.button>

                <motion.button 
                  key="projects"
                  initial={{ opacity: 0, x: 120 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={springConfig}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 0 30px rgba(79,70,229,0.5)",
                    borderColor: "rgba(79,70,229,1)"
                  }}
                  onClick={() => navigate('/solutions')}
                  className={buttonClass}
                >
                  Projects
                </motion.button>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-16 relative overflow-hidden">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-full bg-gradient-to-b from-transparent via-teal to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
