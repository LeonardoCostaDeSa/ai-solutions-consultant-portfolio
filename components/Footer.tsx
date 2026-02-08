
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-4"
        >
          Ready to scale?
        </motion.h2>
        
        <motion.a 
          href="mailto:leonardo@leonardosa.pro"
          className="text-2xl sm:text-4xl md:text-6xl font-bold text-white relative inline-block group break-all"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
        >
          leonardo@leonardosa.pro
          <span className="absolute -bottom-2 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
        </motion.a>

        <div className="flex justify-center gap-8 mt-16">
          {[
            { Icon: Linkedin, href: "https://www.linkedin.com/in/leonardocostadesa/" },
            { Icon: Github, href: "https://github.com/leonardocostadesa" },
          ].map((social, idx) => (
            <motion.a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <social.Icon size={24} />
            </motion.a>
          ))}
        </div>

        <p className="mt-20 text-white/40 text-sm font-medium">
          &copy; {new Date().getFullYear()} AI Solutions Consultant. Built for the future.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
