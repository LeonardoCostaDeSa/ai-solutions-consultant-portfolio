
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  GitPullRequest, 
  Boxes, 
  ArrowRight, 
  User, 
  Terminal, 
  Code, 
  Play, 
  Video, 
  X, 
  FileText,
  Briefcase,
Shrink,
Brain,
BrainCircuit,
Scale3d,
ChartNoAxesColumnIncreasing
} from 'lucide-react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import DataStreams from '../components/DataStreams';
import BorderBeam from '../components/BorderBeam';
import TechCarousel from '../components/TechCarousel';
import ScrollImageTransition from '../components/ScrollImageTransition';

const KnotSVG = ({ color }: { color: string }) => (
  <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 400 400">
    <motion.path
      d="M100,200 C150,50 250,350 300,200"
      fill="none"
      stroke={color}
      strokeWidth="2"
      animate={{ 
        d: ["M100,200 C150,50 250,350 300,200", "M100,200 C150,350 250,50 300,200", "M100,200 C150,50 250,350 300,200"],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.path
      d="M50,150 C200,50 200,350 350,250"
      fill="none"
      stroke={color}
      strokeWidth="1"
      strokeDasharray="5,5"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
  </svg>
);

const NodesSVG = ({ color }: { color: string }) => (
  <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 400 400">
    {[...Array(6)].map((_, i) => (
      <motion.circle
        key={i}
        cx={100 + (i % 3) * 100}
        cy={100 + Math.floor(i / 3) * 150}
        r="4"
        fill={color}
        animate={{ 
          opacity: [0.2, 1, 0.2],
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
      />
    ))}
    <motion.path
      d="M100,100 L200,100 L200,250 L300,250"
      fill="none"
      stroke={color}
      strokeWidth="1"
      animate={{ strokeDashoffset: [0, 100] }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
    />
  </svg>
);

const Home: React.FC = () => {
  const navigate = useNavigate();
  const aboutRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { amount: 0.3, once: false });
  
  const [popupState, setPopupState] = useState<'hidden' | 'visible' | 'minimized'>('hidden');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasTriggeredOnce, setHasTriggeredOnce] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isAboutInView && !hasTriggeredOnce) {
      timer = setTimeout(() => {
        setPopupState('visible');
        setHasTriggeredOnce(true);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [isAboutInView, hasTriggeredOnce]);

  const portals = [
    {
      id: 'projects',
      title: 'Projects',
      sub: 'Explore architectural deployments, agentic systems, and technical solutions.',
      color: '#F97316', // coral
      twColor: 'coral',
      icon: Briefcase,
      path: '/solutions',
      Background: NodesSVG
    },
    {
      id: 'resume',
      title: 'Resume',
      sub: 'Trace my chronological journey and the methodology behind my success.',
      color: '#06B6D4', // teal
      twColor: 'teal',
      icon: FileText,
      path: '/process',
      Background: KnotSVG
    }
  ];

  return (
    <div className="bg-charcoal min-h-screen relative">
      <Navbar />
      <Hero />
      
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-30">
        <DataStreams />
      </div>

      <ScrollImageTransition />
      
      <section 
        id="about" 
        ref={aboutRef}
        className="py-16 md:py-32 px-6 max-w-7xl mx-auto relative"
      >
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-5"
          >
            <span className="text-indigo font-black uppercase tracking-[0.4em] text-xs mb-4 md:mb-6 block">Leonardo de Sá</span>
            <h2 className="text-4xl md:text-7xl font-black mb-6 md:mb-8 leading-tight tracking-tighter text-white">Who am I?</h2>
            <div className="w-16 md:w-20 h-1 bg-indigo mb-8 md:mb-10" />
            
            <div className="space-y-6 md:space-y-8 text-white/60 text-base md:text-lg font-medium leading-relaxed">
              <div className="space-y-4 md:space-y-6">
                <p>
                  I'm the person teams call when a process is too slow, too manual, or too fragile to scale. 
                </p>
                <p>
                  I design agentic workflows, multi-agent systems, chatbots, automation pipelines, that routinely cut execution time by 30–80%. At KPMG Brazil, I build these solutions for tax transformation and train cross-functional teams to own them. 
                </p>
              </div>
              
              <motion.button 
                whileHover={{ x: 5 }}
                onClick={() => document.getElementById('navigation')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-3 text-white font-black uppercase tracking-widest text-[10px] md:text-xs py-4 px-0 hover:text-indigo transition-colors"
              >
                <span>More about me</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
          >
            {[
              { title: 'Process Architecture', desc: 'Mapping business complexity into executable logic.', icon: Shrink, color: 'teal', hex: '#06B6D4' },
              { title: 'Agentic Systems', desc: 'Building multi-agent workflows that run autonomously.', icon: Code, color: 'indigo', hex: '#4F46E5' },
              { title: 'AI Adoption', desc: 'AI that leaves the slide deck and enters real workflows.', icon: BrainCircuit, color: 'coral', hex: '#F97316' },
              { title: 'Delivery at Scale', desc: 'From proof-of-concept to production.', icon: ChartNoAxesColumnIncreasing, color: 'teal', hex: '#06B6D4' }
            ].map((trait, i) => (
              <div key={i} className="relative p-6 md:p-8 bg-white/[0.02] border border-white/10 rounded-2xl md:rounded-3xl hover:border-white/20 transition-all group backdrop-blur-sm">
                <BorderBeam color={trait.hex} duration={5} />
                <trait.icon className={`text-${trait.color} mb-4 md:mb-6 group-hover:scale-110 transition-transform`} size={28} />
                <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white">{trait.title}</h4>
                <p className="text-white/40 text-xs md:text-sm leading-relaxed">{trait.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

      </section>

      <TechCarousel />
      
      <section id="navigation" className="py-24 md:py-40 px-6 max-w-7xl mx-auto border-t border-white/5 relative">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-teal font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 md:mb-6 block">Discovery Protocol</span>
          <h2 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 leading-tight text-white">Get to know my journey</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {portals.map((portal) => (
            <motion.div
              key={portal.id}
              layoutId={portal.id}
              onClick={() => navigate(portal.path)}
              whileHover={{ y: -10, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`group relative cursor-pointer overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-white/[0.03] border border-white/10 aspect-video md:aspect-[1.3/1] p-6 md:p-12 flex flex-col justify-end transition-colors hover:border-${portal.twColor}/40 backdrop-blur-sm`}
            >
              <BorderBeam color={portal.color} duration={6} />
              <portal.Background color={portal.color} />

              <div className={`absolute inset-0 bg-gradient-to-tr from-${portal.twColor}/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              <div className="relative z-10 w-full">
                <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-${portal.twColor}/10 flex items-center justify-center border border-${portal.twColor}/20 backdrop-blur-xl group-hover:bg-${portal.twColor}/20 group-hover:shadow-2xl group-hover:shadow-${portal.twColor}/20 transition-all flex-shrink-0`}
                  >
                    <portal.icon className={`text-${portal.twColor}`} size={24} />
                  </motion.div>
                  <h3 className="text-2xl md:text-5xl font-black tracking-tight leading-tight text-white">{portal.title}</h3>
                </div>
                
                <p className="text-white/50 text-sm md:text-lg mb-6 md:mb-10 max-w-sm font-medium leading-relaxed">{portal.sub}</p>
                
                <div className="flex items-center gap-3 md:gap-4 font-black uppercase tracking-widest text-[8px] md:text-xs group-hover:gap-6 transition-all text-white">
                  <span>Infiltrate Route</span>
                  <div className={`w-6 md:w-10 h-[1px] bg-${portal.twColor}`} />
                  <ArrowRight size={18} className={`text-${portal.twColor}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
