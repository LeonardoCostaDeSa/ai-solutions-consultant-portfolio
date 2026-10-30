import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BrainCircuit,
  Bot,
  Compass,
  Landmark,
  Sprout,
  Megaphone,
  FileText,
  Award,
  Mail,
  Linkedin,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';

const trajectory = [
  {
    period: '2026 – Present',
    role: 'Founder — AI Transformation',
    company: 'MasterTech',
    icon: Compass,
    color: 'indigo',
    hex: '#4F46E5',
    desc: 'I work with leadership and teams to understand the operation, redesign processes, implement AI where it adds value and train the people who use it.',
    highlights: [
      "For a landscaping company, connected the commercial journey (landing page, WhatsApp, email and a custom CRM with invoicing). Every lead is now captured, and the CEO's repetitive quotation and admin work dropped by an estimated 70%.",
    ],
  },
  {
    period: '2025 – 2026',
    role: 'AI Solutions Consultant → AI Solutions Consultant (Mid-level)',
    company: 'KPMG Brazil — Tax Transformation',
    icon: BrainCircuit,
    color: 'coral',
    hex: '#F97316',
    desc: 'I joined to find where AI could change tax and legal work, and was promoted to lead solution delivery and adoption. I worked between partners, business specialists and technology, from business plan to daily use.',
    highlights: [
      'Built the business plan, approvals and IT environment for a Legal document-analysis solution; lawyers validated 98% accuracy on a 10% sample of 50,000+ documents',
      'Trained 1,600+ professionals to use AI in their daily work',
      'Helped turn the Tax Reform methodology into an AI-enabled delivery model (30–60% less effort on covered activities)',
    ],
  },
  {
    period: '2023 – Present',
    role: 'Co-founder — AI & Business Transformation',
    company: 'Revisa Master',
    icon: Bot,
    color: 'teal',
    hex: '#06B6D4',
    desc: 'Revisa Master provides academic review and consulting for graduate students. I lead how the business uses AI and technology.',
    highlights: [
      "Turned the senior reviewer's criteria into a review service: a six-hour first review now takes about fifteen minutes",
      'Built the funnels and landing pages behind ~90% revenue growth in one quarter',
      "Turned consultants' audio notes into client-ready session records",
    ],
  },
  {
    period: '2023 – 2024',
    role: 'Content Strategy & Analytics',
    company: 'Legislative Assembly of São Paulo',
    icon: Landmark,
    color: 'indigo',
    hex: '#4F46E5',
    desc: 'Developed and executed a data-driven digital content strategy for a high-visibility public institution.',
    highlights: [
      'Grew the audience by 27K followers in 12 months',
    ],
  },
  {
    period: '2021 – 2023',
    role: 'Web and Operations Developer',
    company: 'Garden São Paulo',
    icon: Sprout,
    color: 'coral',
    hex: '#F97316',
    desc: "Built the company's digital foundation: first website, digital presence, CRM integrations and automation of commercial and administrative work.",
    highlights: [
      'Led the digital presence strategy, supporting 120%+ revenue growth in the period',
      'Automated quotation generation, inventory control and customer service',
    ],
  },
  {
    period: '2020',
    role: 'Digital Communication Strategist',
    company: 'SFC Consultoria',
    icon: Megaphone,
    color: 'teal',
    hex: '#06B6D4',
    desc: 'Digital marketing for info-product launches in spirituality, immigration, motherhood and personal development.',
    highlights: [
      'Copy and content strategy for social media, websites, blogs and email marketing',
    ],
  },
];

const principles = [
  {
    title: 'Process before tools',
    desc: 'I map how work actually gets done before choosing any technology.',
  },
  {
    title: 'Proportional solutions',
    desc: "Sometimes the answer is an AI agent; sometimes it's a better form or a clearer rule. The solution should fit the problem.",
  },
  {
    title: 'Build for adoption',
    desc: 'A system nobody uses is a failed system. I teach the team while I build — not after.',
  },
  {
    title: 'Agree on what success looks like',
    desc: "Before starting, I agree with the business on how we'll know it worked: time saved, errors caught, people using it.",
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-charcoal min-h-screen text-offwhite pb-24 overflow-x-clip">
      <Seo
        title="About — Leonardo Sá · AI Transformation Specialist"
        description="Six years helping companies and institutions change how they work: first through digital marketing, now through process transformation and AI."
        path="/about"
      />
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen flex items-center pt-32 md:pt-40 pb-16 md:pb-24 px-6">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
          >
            {/* Photo + label */}
            <div className="shrink-0 flex flex-col items-center">
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
              {/* tracking adds trailing space on the last letter — indent-only padding rebalances the optical center */}
              <span className="text-indigo font-black uppercase tracking-[0.4em] text-xs block text-center pl-[0.4em]">
                Leonardo Sá
              </span>
            </div>

            {/* Headline — centered on mobile (stacked under the photo), left-aligned from md up */}
            <div className="flex-1 text-center md:text-left">
              <span className="text-teal font-black uppercase tracking-[0.4em] text-xs mb-4 md:mb-6 block">
                AI Transformation · Process & Adoption
              </span>
              <h1 className="text-4xl md:text-7xl font-black leading-[1.05] tracking-tighter mb-6">
                Changing how work gets done,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo via-teal to-coral italic">
                  with AI.
                </span>
              </h1>
              <p className="text-base md:text-xl text-white/60 leading-relaxed max-w-xl mx-auto md:mx-0">
                For more than six years, I've helped companies and institutions grow and change how they work: first through digital marketing and, since 2023, through process transformation and AI.
              </p>
              <p className="mt-6 text-xs md:text-sm text-white/60 font-bold uppercase tracking-widest">
                Madrid, Spain · EN / FR / PT / ES
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
              Trajectory
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-charcoal leading-tight">
              Where I've worked.
            </h2>
            <p className="text-charcoal/60 max-w-2xl mt-4 md:mt-6 text-base md:text-lg leading-relaxed">
              From digital marketing to AI transformation.
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

      {/* WHY THE MIX MATTERS */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-coral font-black uppercase tracking-[0.4em] text-xs mb-4 block">
            Why the mix matters
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 leading-tight">
            Transformation fails in two places. I've worked on both.
          </h2>
          <div className="space-y-6 text-base md:text-lg text-white/70 leading-relaxed">
            <p>
              AI projects fail when the solution doesn't fit how people actually work, or when it never gets properly built and adopted. My path covers both sides.
            </p>
            <p>
              In digital marketing and content, I learned how people read, decide and change habits. In technology, I earned a systems degree and built and ran real platforms. At KPMG, I brought the two together: business plans, implementation and training at scale.
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
                a systems degree finished with an 8.8/10 GPA, a promotion at KPMG Tax Transformation, and a{' '}
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
              How I work.
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
            Rethinking how your team works with AI?
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
