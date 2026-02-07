
import React from 'react';
import { motion } from 'framer-motion';

interface BorderBeamProps {
  color?: string;
  duration?: number;
  borderWidth?: number;
}

const BorderBeam: React.FC<BorderBeamProps> = ({ 
  color = "#4F46E5", 
  duration = 4,
  borderWidth = 2
}) => {
  return (
    <div className="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div 
        className="absolute inset-0 rounded-[inherit]"
        style={{ 
          padding: borderWidth,
          maskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
          maskClip: 'content-box, padding-box',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-150%] origin-center"
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, transparent 60%, ${color} 80%, #06B6D4 95%, ${color} 100%)`,
          }}
        />
      </div>
      {/* Subtle outer glow that follows the beam */}
      <div 
        className="absolute inset-0 rounded-[inherit] opacity-20 blur-md"
        style={{ 
          padding: borderWidth,
          maskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
          maskClip: 'content-box, padding-box',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-150%] origin-center"
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, transparent 60%, ${color} 80%, #06B6D4 95%, ${color} 100%)`,
          }}
        />
      </div>
    </div>
  );
};

export default BorderBeam;
