import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BrainCircuit,
  Code,
  Bot,
  GraduationCap,
  FileText,
  Wrench,
  Linkedin,
} from 'lucide-react';
import Navbar from '../components/Navbar';

const trajectory = [
  {
    period: '2025 – Present',
    role: 'AI Engineer',
    company: 'KPMG Brazil — Tax Transformation',
    icon: BrainCircuit,
    color: 'indigo',
    hex: '#4F46E5',
    desc: 'I design and ship production GenAI systems in regulated tax and compliance environments. Stack: Python, Django REST, CrewAI, RAG architecture, Azure App Service, OpenAI APIs, Microsoft Copilot Studio, Power Platform.',
    highlights: [
      'Built a legal/tax semantic search engine with 94% validated accuracy using agentic orchestration',
      '30–80% execution-time reductions across AI and automation initiatives',
      '1,600+ professionals trained on responsible AI adoption',
    ],
  },
  {
    period: '2023 – Present',
    role: 'Software Engineer (AI-Focused)',
    company: 'Revisa Master — Side Project',
    icon: Bot,
    color: 'coral',
    hex: '#F97316',
    desc: 'GenAI side project for academic consulting workflows. Stack: Python, Django, CrewAI, PostgreSQL/pgvector, scoped retrieval, validation layers.',
    highlights: [
      'Multi-agent academic analysis system around 5 evaluation pillars',
      'Reduced first-pass document analysis from ~6 hours to ~15 minutes',
      'Automated PDF report generation with citation grounding',
    ],
  },
  {
    period: '2021 – 2023',
    role: 'Web and Operations Developer',
    company: 'Garden São Paulo',
    icon: Wrench,
    color: 'teal',
    hex: '#06B6D4',
    desc: "Supported the company's digital structuring through web solutions, operational automation, and internal tools for commercial and administrative processes.",
    highlights: [
      "Built the company's first institutional website — supported 120%+ revenue growth",
      'Implemented CRM integrations and automated quotation and inventory control workflows',
      'Developed customer service automation flows',
    ],
  },
  {
    period: '2023 – 2026 (in progress)',
    role: 'Technologist Degree',
    company: 'Faculty of Technology of Praia Grande — Systems Analysis & Development',
    icon: GraduationCap,
    color: 'indigo',
    hex: '#4F46E5',
    desc: 'Technology-focused degree covering software engineering, systems architecture, databases, and applied AI — the theoretical foundation under the practical work.',
    highlights: [
      'Programming logic, data structures, and algorithms',
      'Database design, SQL, and systems architecture',
      'Web development, APIs, and applied AI',
    ],
  },
];

const principles = [
  {
    title: 'Production-first',
    desc: 'I architect for the live system, not the demo. The work that survives contact with real users is the work that matters.',
  },
  {
    title: 'Ship to learn',
    desc: 'Prototypes are cheap; running systems generate signal. The fastest path to a great system is a deployed one — then iterate fast.',
  },
  {
    title: 'Multi-agent by default',
    desc: 'Decompose complex reasoning into specialized agents with clear contracts. Easier to test, debug, evolve, and explain.',
  },
  {
    title: 'Build for adoption',
    desc: 'A deployed system nobody uses is a failed system. Enablement ships alongside the code, not as a phase after it.',
  },
];

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-charcoal min-h-screen text-offwhite pb-24 overflow-x-clip">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
          >
            {/* Photo + label */}
            <div className="shrink-0">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-indigo shadow-2xl shadow-indigo/30 mb-4">
                <img
                  src="/img/foto%20de%20perfil.webp"
                  alt="Leonardo de Sá"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-indigo font-black uppercase tracking-[0.4em] text-[10px] block">
                Leonardo Sá
              </span>
            </div>

            {/* Headline */}
            <div className="flex-1">
              <span className="text-teal font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 md:mb-6 block">
                AI Engineer · Production Systems
              </span>
              <h1 className="text-4xl md:text-7xl font-black leading-[1.05] tracking-tighter mb-6">
                Engineering AI<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo via-teal to-coral italic">
                  that ships.
                </span>
              </h1>
              <p className="text-base md:text-xl text-white/60 leading-relaxed max-w-xl">
                I build production GenAI systems for regulated environments — RAG pipelines, multi-agent orchestration, enterprise integrations — with the engineering rigor that compliance demands.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRAJECTORY — LIGHT SECTION */}
      <section className="relative isolate py-20 md:py-28 px-6">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen bg-offwhite -z-10" />

        <div className="max-w-5xl mx-auto">
          <div className="mb-12 md:mb-16">
            <span className="text-indigo font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
              Engineering Trajectory
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-charcoal leading-tight">
              Tech-first, end-to-end.
            </h2>
            <p className="text-charcoal/60 max-w-2xl mt-4 md:mt-6 text-base md:text-lg leading-relaxed">
              My professional path is built on engineering — production AI work today, stacked on real software experience and a technology degree underneath.
            </p>
          </div>

          <div className="space-y-6">
            {trajectory.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative p-6 md:p-8 bg-[#1a1a1a] rounded-3xl border border-white/5 hover:border-white/15 transition-all overflow-hidden grid md:grid-cols-12 gap-6"
              >
                {/* Accent line */}
                <div className="absolute left-0 top-8 bottom-8 w-[3px] rounded-r" style={{ backgroundColor: step.hex }} />

                {/* Left: icon + period + role + company */}
                <div className="md:col-span-4 flex md:flex-col gap-4 md:gap-3 items-start">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${step.hex}1A`, border: `1px solid ${step.hex}40` }}
                  >
                    <step.icon size={20} style={{ color: step.hex }} />
                  </div>
                  <div>
                    <div
                      className="text-[10px] font-black uppercase tracking-widest mb-2 inline-block px-3 py-1 rounded-lg"
                      style={{ color: step.hex, backgroundColor: `${step.hex}1A` }}
                    >
                      {step.period}
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-white leading-tight">
                      {step.role}
                    </h3>
                    <div className="text-xs md:text-sm font-bold text-white/50 mt-1">
                      {step.company}
                    </div>
                  </div>
                </div>

                {/* Right: description + highlights */}
                <div className="md:col-span-8">
                  <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4">
                    {step.desc}
                  </p>
                  <ul className="space-y-2">
                    {step.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: step.hex }} />
                        <span className="text-sm text-white/70 font-medium leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY THE TECH FOUNDATION MATTERS */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-coral font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
            Why the foundation matters
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 leading-tight">
            Building production AI is engineering work — not prompting.
          </h2>
          <div className="space-y-6 text-base md:text-lg text-white/70 leading-relaxed">
            <p>
              The shift from "interesting prototype" to "system that runs in production for regulated workflows" lives entirely in the engineering: data pipelines that don't break, retrieval that's auditable, agents whose handoffs are traceable, validation layers that catch what the model gets wrong, and governance baked in instead of bolted on.
            </p>
            <p>
              That's why I lean on the engineering background. A side project in CrewAI, a 3-person Unity team, a tech degree in progress — none of it is glamorous, but it's where the discipline comes from. The AI part is what gets the headlines; the engineering is what makes it ship.
            </p>
          </div>

          {/* Linguistics mention — small footnote-style block */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <Wrench size={16} className="text-white/40" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">
                A useful side input
              </span>
              <p className="text-sm md:text-base text-white/50 leading-relaxed">
                Before engineering I studied <span className="text-white/70 font-bold">Linguistics &amp; French at USP</span> (highest GPA in cohort, exchange at University Lumière Lyon 2). It's not the main story — but the systems-thinking habit it built quietly informs how I architect prompts, evaluate agent outputs, and reason about ambiguity in language. A useful side input, not the headline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES — LIGHT SECTION */}
      <section className="relative isolate py-20 md:py-28 px-6">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen bg-offwhite -z-10" />

        <div className="max-w-5xl mx-auto">
          <div className="mb-12 md:mb-16">
            <span className="text-teal font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
              How I work
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-charcoal leading-tight">
              Four principles I won't compromise on.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {principles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 md:p-8 bg-[#1a1a1a] rounded-2xl border border-white/5 hover:border-white/15 transition-all"
              >
                <h3 className="text-lg md:text-xl font-black text-white mb-2">{p.title}</h3>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-tight">
            Need someone who ships production AI?
          </h2>
          <p className="text-white/50 mb-10 text-base md:text-lg">
            Let's talk.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/leonardocostadesa/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-indigo hover:bg-indigo/90 text-white rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-indigo/30 active:scale-95"
            >
              <Linkedin size={16} />
              <span>Hire Me</span>
            </a>
            <button
              onClick={() => navigate('/process')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 hover:border-white text-white rounded-full font-black text-sm uppercase tracking-widest transition-all active:scale-95"
            >
              <FileText size={16} />
              <span>Resume</span>
            </button>
            <button
              onClick={() => navigate('/solutions')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 hover:border-white text-white rounded-full font-black text-sm uppercase tracking-widest transition-all active:scale-95"
            >
              <span>Projects</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
