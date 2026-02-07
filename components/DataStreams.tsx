
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const GRID_SIZE = 80;

const Pulse: React.FC<{ axis: 'x' | 'y', position: number, delay: number, color: string }> = ({ axis, position, delay, color }) => {
  // Randomize speed slightly to look "natural" yet organized
  const duration = useMemo(() => 4 + Math.random() * 3, []);
  
  return (
    <motion.div
      initial={axis === 'x' ? { x: '-10%', opacity: 0 } : { y: '-10%', opacity: 0 }}
      animate={axis === 'x' 
        ? { x: '110%', opacity: [0, 1, 1, 0] } 
        : { y: '110%', opacity: [0, 1, 1, 0] }
      }
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
      style={{
        position: 'absolute',
        left: axis === 'x' ? 0 : `${position}px`,
        top: axis === 'y' ? 0 : `${position}px`,
        width: axis === 'x' ? '180px' : '3px',
        height: axis === 'y' ? '180px' : '3px',
        zIndex: 5,
        pointerEvents: 'none'
      }}
    >
      <div 
        className="w-full h-full" 
        style={{ 
          background: axis === 'x' 
            ? `linear-gradient(90deg, transparent, ${color}, transparent)` 
            : `linear-gradient(180deg, transparent, ${color}, transparent)`,
          boxShadow: `0 0 20px ${color}, 0 0 40px ${color}44`,
          borderRadius: '999px',
          opacity: 0.8
        }} 
      />
    </motion.div>
  );
};

const DataStreams: React.FC = () => {
  const pulses = useMemo(() => {
    const items = [];
    const colors = ['#4F46E5', '#06B6D4', '#F97316']; // indigo, teal, coral
    
    // Organized horizontal logic streams
    for (let i = 0; i < 15; i++) {
      items.push({
        axis: 'x' as const,
        position: i * GRID_SIZE * 1.5 + 40,
        delay: i * 0.8, // Organized timing
        color: colors[i % colors.length]
      });
    }
    
    // Organized vertical logic streams
    for (let j = 0; j < 15; j++) {
      items.push({
        axis: 'y' as const,
        position: j * GRID_SIZE * 2 + 20,
        delay: j * 1.2, // Offset timing
        color: colors[(j + 1) % colors.length]
      });
    }
    
    return items;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Defined Grid Structure */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
        }} 
      />
      
      {/* Organizing Light Pulses - On top of grid */}
      <div className="absolute inset-0 opacity-80">
        {pulses.map((p, i) => (
          <Pulse key={i} {...p} />
        ))}
      </div>
    </div>
  );
};

export default DataStreams;
