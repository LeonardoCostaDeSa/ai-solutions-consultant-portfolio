
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Code,
  FileText,
  Briefcase,
  Shrink,
  BrainCircuit,
  ChartNoAxesColumnIncreasing
} from 'lucide-react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
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

const MotionLink = motion.create(Link);

// Static class lookup — build-time Tailwind can't see interpolated class names
const accentText: Record<string, string> = {
  indigo: 'text-indigo',
  teal: 'text-teal',
  coral: 'text-coral',
};

const portalClasses: Record<string, {
  hoverBorder: string;
  gradientFrom: string;
  iconBox: string;
  text: string;
  line: string;
}> = {
  coral: {
    hoverBorder: 'hover:border-coral/40',
    gradientFrom: 'from-coral/10',
    iconBox: 'bg-coral/10 border-coral/20 group-hover:bg-coral/20 group-hover:shadow-coral/20',
    text: 'text-coral',
    line: 'bg-coral',
  },
  teal: {
    hoverBorder: 'hover:border-teal/40',
    gradientFrom: 'from-teal/10',
    iconBox: 'bg-teal/10 border-teal/20 group-hover:bg-teal/20 group-hover:shadow-teal/20',
    text: 'text-teal',
    line: 'bg-teal',
  },
};

const Home: React.FC = () => {
  const location = useLocation();

  // Handle "About" clicks from other pages
  useEffect(() => {
    if ((location.state as any)?.scrollTo === 'about') {
      const t = setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
      return () => clearTimeout(t);
    }
  }, [location]);

  const portals = [
    {
      id: 'projects',
      title: 'Projects',
      sub: 'Case studies with real numbers. See how each system works.',
      color: '#F97316', // coral
      twColor: 'coral',
      icon: Briefcase,
      path: '/solutions',
      Background: NodesSVG
    },
    {
      id: 'resume',
      title: 'Resume',
      sub: 'Experience, education, skills and credentials. The full track record in one page.',
      color: '#06B6D4', // teal
      twColor: 'teal',
      icon: FileText,
      path: '/process',
      Background: KnotSVG
    }
  ];

  return (
    <div className="bg-charcoal min-h-screen relative overflow-x-clip">
      <Seo
        title="Leonardo Sá — AI Engineer · Production GenAI"
        description="I build AI systems for tax, legal, compliance and education teams. My systems reached 94% validated accuracy and read every page of 50,000 legal documents."
        path="/"
      />
      <Navbar />
      <Hero />
      
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-30">
        <DataStreams />
      </div>

      <ScrollImageTransition />

      {/* Career Highlights */}
      <section className="py-16 md:py-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10 md:mb-14"
          >
            <span className="text-white/40 font-black uppercase tracking-[0.4em] text-xs">Measured impact</span>
            <div className="flex-1 h-[1px] bg-white/5" />
            <a
              href="mailto:leonardo@leonardosa.pro"
              data-umami-event="contact-click"
              data-umami-event-location="home-metrics"
              className="flex items-center gap-2 px-5 py-2 bg-indigo hover:bg-indigo/90 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-md shadow-indigo/30 active:scale-95"
            >
              <span>Let's talk</span>
              <ArrowRight size={13} />
            </a>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: '1,600+', label: 'Professionals trained', sub: 'to use AI in their daily work', color: 'indigo' },
              { value: '50,000', label: 'Documents read', sub: 'every page of an $8B lawsuit — not a sample', color: 'teal' },
              { value: '30–80%', label: 'Less task time', sub: 'on the tax workflows I automated', color: 'coral' },
              { value: '94%', label: 'Answer accuracy', sub: 'validated by Legal and Corporate teams', color: 'indigo' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 md:p-8 border border-white/5 rounded-2xl md:rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
              >
                <div className={`text-3xl md:text-5xl font-black mb-2 ${accentText[stat.color]} group-hover:scale-105 transition-transform inline-block`}>{stat.value}</div>
                <div className="text-white font-bold text-sm mb-1">{stat.label}</div>
                <div className="text-white/60 text-xs leading-relaxed">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative bg-offwhite"
      >
        {/* Top edge: hard cut from dark to light */}
        <div className="w-full h-1 bg-gradient-to-r from-indigo via-teal to-coral" />

        <div className="py-20 md:py-32 px-6 max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-10 md:mb-14"
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-indigo shadow-lg shadow-indigo/20 flex-shrink-0">
                <img
                  src="/img/profile.webp"
                  alt="Leonardo de Sá"
                  width={256}
                  height={256}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-indigo font-black uppercase tracking-[0.4em] text-xs">Leonardo Sá</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 leading-tight tracking-tighter text-charcoal">
              What I do.
            </h2>
            <div className="w-16 md:w-20 h-1 bg-indigo" />
          </motion.div>

          {/* Pitch + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-12 md:mb-16"
          >
            <p className="text-charcoal/70 text-lg md:text-2xl font-medium leading-relaxed mb-8">
              I build AI systems and run them in production. At KPMG Brazil, my systems cut task time by <span className="text-charcoal font-bold">30–80%</span> on tax and compliance work. At <span className="text-charcoal font-bold">Revisa Master</span>, the company I co-founded, I built the entire review platform and I run it in production. Paying customers use it every day.
            </p>
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 text-charcoal font-black uppercase tracking-widest text-xs py-3 hover:text-indigo transition-colors"
            >
              <span>Read my full story</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* 4 trait cards — horizontal row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
          >
            {[
              { title: 'Process Architecture', desc: 'I turn messy processes into systems that run on their own.', icon: Shrink, color: 'teal', hex: '#06B6D4' },
              { title: 'Multi-Agent Systems', desc: 'I build AI agents that check their answers and cite their sources.', icon: Code, color: 'indigo', hex: '#4F46E5' },
              { title: 'AI Adoption', desc: 'I train teams to use AI in their real work — not in slide decks.', icon: BrainCircuit, color: 'coral', hex: '#F97316' },
              { title: 'Production Delivery', desc: 'I take prototypes to production. They hold up.', icon: ChartNoAxesColumnIncreasing, color: 'teal', hex: '#06B6D4' }
            ].map((trait, i) => (
              <div key={i} className="relative p-5 md:p-6 bg-charcoal border border-charcoal/80 rounded-2xl hover:border-white/20 transition-all group overflow-hidden">
                <BorderBeam color={trait.hex} duration={5} />
                <trait.icon className={`${accentText[trait.color]} mb-3 md:mb-4 group-hover:scale-110 transition-transform`} size={24} />
                <h4 className="text-sm md:text-base font-bold mb-1 md:mb-2 text-white leading-snug">{trait.title}</h4>
                <p className="text-white/60 text-xs leading-relaxed">{trait.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom edge: hard cut back to dark */}
        <div className="w-full h-1 bg-gradient-to-r from-coral via-teal to-indigo" />
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
          <h2 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 leading-tight text-white">Explore the work</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {portals.map((portal) => (
            <MotionLink
              to={portal.path}
              key={portal.id}
              layoutId={portal.id}
              data-umami-event="portal-open"
              data-umami-event-portal={portal.id}
              whileHover={{ y: -10, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`group relative cursor-pointer overflow-hidden rounded-[1.75rem] md:rounded-[2.5rem] bg-white/[0.03] border border-white/10 aspect-[4/3] md:aspect-[1.3/1] p-5 md:p-12 flex flex-col justify-end transition-colors ${portalClasses[portal.twColor].hoverBorder} backdrop-blur-sm`}
            >
              <BorderBeam color={portal.color} duration={6} />
              <portal.Background color={portal.color} />

              <div className={`absolute inset-0 bg-gradient-to-tr ${portalClasses[portal.twColor].gradientFrom} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              <div className="relative z-10 w-full min-w-0">
                <div className="flex items-center gap-3 md:gap-6 mb-3 md:mb-6 min-w-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl flex items-center justify-center border backdrop-blur-xl group-hover:shadow-2xl transition-all flex-shrink-0 ${portalClasses[portal.twColor].iconBox}`}
                  >
                    <portal.icon className={portalClasses[portal.twColor].text} size={20} />
                  </motion.div>
                  <h3 className="text-xl md:text-5xl font-black tracking-tight leading-tight text-white truncate">{portal.title}</h3>
                </div>

                <p className="text-white/50 text-xs md:text-lg mb-5 md:mb-10 max-w-sm font-medium leading-relaxed">{portal.sub}</p>

                <div className="flex items-center gap-3 md:gap-4 font-black uppercase tracking-widest text-xs group-hover:gap-6 transition-all text-white">
                  <span>Open</span>
                  <div className={`w-6 md:w-10 h-[1px] ${portalClasses[portal.twColor].line}`} />
                  <ArrowRight size={16} className={portalClasses[portal.twColor].text} />
                </div>
              </div>
            </MotionLink>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
