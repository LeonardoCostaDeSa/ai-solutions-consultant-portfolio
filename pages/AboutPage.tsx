import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BrainCircuit,
  Code,
  Bot,
  GraduationCap,
  FileText,
  Award,
  Mail,
  Linkedin,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';

const trajectory = [
  {
    period: '2025 – 2026',
    role: 'AI Solutions Consultant → AI Engineer',
    company: 'KPMG Brazil — Tax Transformation',
    icon: BrainCircuit,
    color: 'indigo',
    hex: '#4F46E5',
    desc: 'I joined as an AI solutions consultant and was promoted to AI Engineer. I built AI systems for tax and compliance teams. In that world, every system must keep records of what it did and protect client data — so I build that in from the start.',
    highlights: [
      'Built a search engine for legal and tax questions — tax professionals validated 94% of its answers',
      'Cut task time by 30–80% on the workflows I automated',
      'Trained 1,600+ professionals to use AI in their daily work',
    ],
  },
  {
    period: '2023 – Present',
    role: 'Co-founder & AI Engineer',
    company: 'Revisa Master',
    icon: Bot,
    color: 'coral',
    hex: '#F97316',
    desc: 'Revisa Master reviews academic manuscripts. I co-founded it, and I am its entire engineering department. I built the review platform end to end and I keep it running. I answer for its uptime, its costs and its output quality — there is no one else to escalate to.',
    highlights: [
      'A review that took an expert six hours now takes fifteen minutes',
      'Built the funnels and landing pages behind ~90% revenue growth in one quarter',
      'Every AI call is traced in production, so I can see what the system did and why',
    ],
  },
  {
    period: '2021 – 2023',
    role: 'Full Stack Developer',
    company: 'Garden São Paulo',
    icon: Code,
    color: 'teal',
    hex: '#06B6D4',
    desc: "Built the company's digital foundation end-to-end — its first institutional website, CRM integrations, and operational automation for commercial and administrative processes.",
    highlights: [
      "Developed the company's first institutional website and digital-presence strategy",
      'Automated quotation generation and inventory-control workflows',
      'Built customer-service automation supporting 120%+ revenue growth in the period',
    ],
  },
  {
    period: '2023 – 2026',
    role: 'Technologist Degree — completed',
    company: 'Faculty of Technology of Praia Grande — Systems Analysis & Development',
    icon: GraduationCap,
    color: 'indigo',
    hex: '#4F46E5',
    desc: 'Full technology degree covering software engineering, systems architecture, databases, and applied AI — completed with a final GPA of 8.8/10. The theoretical foundation under the practical work.',
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
    desc: 'A prototype proves an idea. A running system teaches you what is actually true. So I deploy early and iterate fast.',
  },
  {
    title: 'Multi-agent by default',
    desc: 'I split big problems into small agents. Each agent has one job. That makes the system easier to test, debug and explain.',
  },
  {
    title: 'Build for adoption',
    desc: 'A system nobody uses is a failed system. I teach the team while I build — not after.',
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-charcoal min-h-screen text-offwhite pb-24 overflow-x-clip">
      <Seo
        title="About — Leonardo Sá · AI Engineer"
        description="I started as a top-of-cohort linguist at USP. Today I am an AI engineer and co-founder, and my systems run in production every day."
        path="/about"
      />
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
                  src="/img/profile.webp"
                  alt="Leonardo de Sá"
                  width={256}
                  height={256}
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-indigo font-black uppercase tracking-[0.4em] text-xs block">
                Leonardo Sá
              </span>
            </div>

            {/* Headline */}
            <div className="flex-1">
              <span className="text-teal font-black uppercase tracking-[0.4em] text-xs mb-4 md:mb-6 block">
                AI Engineer · Production Systems
              </span>
              <h1 className="text-4xl md:text-7xl font-black leading-[1.05] tracking-tighter mb-6">
                Engineering AI<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo via-teal to-coral italic">
                  that ships.
                </span>
              </h1>
              <p className="text-base md:text-xl text-white/60 leading-relaxed max-w-xl">
                I build AI systems for teams that answer to regulators. I ship them, I run them, and I stand behind what they output.
              </p>
              <p className="mt-6 text-xs md:text-sm text-white/60 font-bold uppercase tracking-widest">
                Madrid, Spain · from August 2026 · EN / FR / PT / ES
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
            <span className="text-indigo font-black uppercase tracking-[0.4em] text-xs mb-4 block">
              Engineering Trajectory
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-charcoal leading-tight">
              Where I've worked.
            </h2>
            <p className="text-charcoal/60 max-w-2xl mt-4 md:mt-6 text-base md:text-lg leading-relaxed">
              I work on production AI today. Before that: software engineering and a technology degree.
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
                      className="text-xs font-black uppercase tracking-widest mb-2 inline-block px-3 py-1 rounded-lg"
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
          <span className="text-coral font-black uppercase tracking-[0.4em] text-xs mb-4 block">
            Why the foundation matters
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 leading-tight">
            Building production AI is engineering work — not prompting.
          </h2>
          <div className="space-y-6 text-base md:text-lg text-white/70 leading-relaxed">
            <p>
              A demo is easy. A system that runs every day for a regulated team is hard. The difference is engineering: pipelines that don't break, answers you can audit, and checks that catch the model's mistakes before a client sees them.
            </p>
            <p>
              That discipline came from practice. I co-founded a platform and I keep it running in production. I built a company's website, CRM integrations and automations, end to end. I finished a systems degree with an 8.8/10 GPA. The AI gets the headlines. The engineering makes it ship.
            </p>
          </div>

          {/* The pattern of depth — excellence arc */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <Award size={16} className="text-white/60" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-white/60 block mb-2">
                Where the pattern started
              </span>
              <p className="text-sm md:text-base text-white/70 leading-relaxed">
                When something interests me, I go all the way in. In linguistics, that meant graduating{' '}
                <span className="text-white font-bold">top of my cohort at the University of São Paulo (9.2/10 GPA)</span> and earning a{' '}
                <span className="text-white font-bold">merit scholarship to Université Lumière Lyon 2</span> in France. In technology, it means
                a systems degree finished with an 8.8/10 GPA, a promotion at KPMG, and a{' '}
                <a
                  href="https://doi.org/10.5281/zenodo.19930775"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="paper-click"
                  data-umami-event-location="about"
                  className="text-white font-bold underline decoration-indigo decoration-2 underline-offset-4 hover:text-indigo transition-colors"
                >
                  peer-reviewed paper on multi-agent architecture
                </a>
                {' '}— the same architecture I run in production. I changed fields. The standard stayed.
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
            <span className="text-teal font-black uppercase tracking-[0.4em] text-xs mb-4 block">
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
                <p className="text-white/70 text-sm md:text-base leading-relaxed">{p.desc}</p>
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
              href="mailto:leonardo@leonardosa.pro"
              data-umami-event="contact-click"
              data-umami-event-location="about-cta"
              className="inline-flex items-center gap-3 px-8 py-4 bg-indigo hover:bg-indigo/90 text-white rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-indigo/30 active:scale-95"
            >
              <Mail size={16} />
              <span>Let's talk</span>
            </a>
            <a
              href="https://www.linkedin.com/in/leonardocostadesa/"
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="outbound-linkedin"
              data-umami-event-location="about-cta"
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 hover:border-white text-white rounded-full font-black text-sm uppercase tracking-widest transition-all active:scale-95"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>
            <Link
              to="/process"
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 hover:border-white text-white rounded-full font-black text-sm uppercase tracking-widest transition-all active:scale-95"
            >
              <FileText size={16} />
              <span>Resume</span>
            </Link>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 hover:border-white text-white rounded-full font-black text-sm uppercase tracking-widest transition-all active:scale-95"
            >
              <span>Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
