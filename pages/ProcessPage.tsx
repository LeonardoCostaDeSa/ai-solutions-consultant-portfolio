
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Globe,
  Cpu,
  Award,
  Languages,
  HeartHandshake,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import BorderBeam from '../components/BorderBeam';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';

// --- DATA ---
const experience = [
  {
    company: "KPMG Brazil",
    role: "AI Solutions Consultant → AI Engineer",
    period: "May 2025 – Present",
    tag: "Promoted",
    accentColor: "indigo",
    accentHex: "#4F46E5",
    desc: "Designing production GenAI workflows in a highly regulated tax/compliance environment — RAG, multi-agent orchestration, traceability, auditability, and secure AI adoption. Joined as an AI solutions consultant; promoted to AI Engineer.",
    highlights: [
      "Built a legal/tax semantic search engine with 94% validated accuracy using agentic orchestration",
      "Delivered 30–80% execution-time reductions across AI and automation initiatives",
      "Trained 1,600+ professionals on responsible AI adoption across KPMG's Tax practice"
    ]
  },
  {
    company: "Revisa Master",
    role: "Co-founder & AI Engineer",
    period: "2023 – Present",
    tag: "Founder",
    accentColor: "coral",
    accentHex: "#F97316",
    desc: "Academic-services company where I own engineering end-to-end: a production multi-agent review platform (Python, Django, CrewAI, PostgreSQL/pgvector, Celery, Docker) with Langfuse tracing and Sentry monitoring in production.",
    highlights: [
      "Cut first-pass expert document analysis from ~6 hours to ~15 minutes",
      "Built the funnels and landing pages behind ~90% monthly revenue growth in one quarter",
      "Automated PDF diagnostic reports across 5 evaluation pillars with citation grounding"
    ]
  },
  {
    company: "Garden São Paulo",
    role: "Full Stack Developer",
    period: "Dec 2021 – Mar 2023",
    tag: null,
    accentColor: "teal",
    accentHex: "#06B6D4",
    desc: "Built the company's digital foundation: first institutional website, CRM integrations, and operational automation for commercial and administrative processes.",
    highlights: [
      "Developed the company's first institutional website and digital-presence strategy",
      "Automated quotation generation and inventory-control workflows",
      "Customer-service automation supporting 120%+ revenue growth in the period"
    ]
  }
];

const education = [
  {
    school: "Faculty of Technology of Praia Grande",
    degree: "Systems Analysis & Development",
    period: "2023 – 2026",
    desc: "Completed with a final GPA of 8.8/10. Programming logic, data structures, databases, operating systems, and web development."
  },
  {
    school: "University of São Paulo",
    degree: "BA in Linguistics, Portuguese & French",
    period: "2017 – 2022",
    desc: "Graduated top of cohort with a 9.2/10 GPA. Published academic article \"The Critique of Reading.\" Awarded merit scholarship for academic exchange."
  }
];

const skills = [
  { category: "AI & Automation", items: ["Multi-Agent Systems", "RPA", "Digital Transformation"], color: "indigo" },
  { category: "Cloud & Platforms", items: ["Azure", "Power Automate", "Copilot Studio"], color: "teal" },
  { category: "Programming", items: ["Python (Django/FastAPI)", "JavaScript (React, Next, Node)"], color: "coral" },
  { category: "Data Engineering", items: ["SQL / MySQL", "Data Modeling", "Pandas / NumPy", "Visualization"], color: "indigo" },
  { category: "DevOps", items: ["Git / GitHub", "Docker", "Linux / Ubuntu", "API REST"], color: "teal" },
  { category: "Soft Skills", items: ["Communication", "Critical Thinking", "Problem Solving", "Leadership"], color: "coral" }
];

const certs = [
  { name: "Network Technician Career Path", inst: "Cisco", year: "2025" },
  { name: "Generative AI: Fundamentals", inst: "University of Michigan", year: "2025" },
  { name: "Python Programming with OOP", inst: "Alura", year: "2024" },
  { name: "UX/UI: Fundamentals", inst: "USP", year: "2022" },
  { name: "Storytelling and Influencing", inst: "Macquarie University", year: "2020" },
];

const volunteering = [
  {
    org: "Instituto Joule",
    role: "Career Mentor",
    period: "Sep – Oct 2025",
    desc: "Guided an early-career AI researcher in healthcare technology through KPMG's affiliated program. Conducted 3-session structured mentorship covering career planning, values mapping, and professional branding."
  },
  {
    org: "ETEC de Itaquera",
    role: "Film Club Project Lead",
    period: "Mar – Dec 2019",
    desc: "Led a project empowering high school students to create and manage film clubs. Provided training in film curation, event organization, critical discussion facilitation, and promotional campaigns."
  },
  {
    org: "FFLCH-USP",
    role: "Volunteer Portuguese Teacher",
    period: "Mar – Dec 2018",
    desc: "Taught Portuguese to students preparing for university entrance exams at USP's community prep course. Developed lesson plans, provided individualized guidance, and created supplementary materials."
  }
];

// --- NAVIGATION SECTIONS ---
const navItems = [
  { id: 'intro', label: 'Overview' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'global', label: 'International' },
  { id: 'skills', label: 'Skills' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'impact', label: 'Volunteering' },
];

// --- COMPONENTS ---

// Static class lookup — build-time Tailwind can't see interpolated class names
const sectionLabelClasses: Record<string, { text: string; box: string }> = {
  white: { text: 'text-white/40', box: 'bg-white/10 border-white/20' },
  indigo: { text: 'text-indigo', box: 'bg-indigo/10 border-indigo/20' },
  teal: { text: 'text-teal', box: 'bg-teal/10 border-teal/20' },
  coral: { text: 'text-coral', box: 'bg-coral/10 border-coral/20' },
};

const accentText: Record<string, string> = {
  indigo: 'text-indigo',
  teal: 'text-teal',
  coral: 'text-coral',
};

const accentHoverText: Record<string, string> = {
  indigo: 'group-hover:text-indigo',
  teal: 'group-hover:text-teal',
  coral: 'group-hover:text-coral',
};

const SectionLabel: React.FC<{ icon: any, label: string, color?: string }> = ({ icon: Icon, label, color = "white" }) => (
  <div className={`flex items-center gap-3 mb-8 ${sectionLabelClasses[color].text}`}>
    <div className={`p-2 rounded-lg border ${sectionLabelClasses[color].box}`}>
      <Icon size={16} />
    </div>
    <span className="font-black uppercase tracking-[0.2em] text-xs">{label}</span>
  </div>
);

const ProcessPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300; // Offset for better triggering
      
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-charcoal min-h-screen text-offwhite selection:bg-indigo selection:text-white pb-32 overflow-x-clip">
      <Seo
        title="Resume — Leonardo Sá · AI Engineer"
        description="AI Engineer at KPMG Brazil (promoted from AI Solutions Consultant), co-founder of Revisa Master. Systems Analysis & Development (GPA 8.8/10), BA Linguistics at USP, peer-reviewed author on multi-agent architecture."
        path="/process"
      />
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <Navbar />

      {/* Left Sidebar Navigation (Desktop Only) */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-6 mix-blend-difference">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group flex items-center gap-4 text-left"
            >
              <div 
                className={`h-[1px] transition-all duration-300 ${isActive ? 'w-8 bg-indigo' : 'w-4 bg-white/20 group-hover:bg-white/40'}`} 
              />
              <span 
                className={`text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  isActive ? 'text-indigo translate-x-1' : 'text-white/20 group-hover:text-white/60'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
        {/* Decorative Line */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent -z-10" />
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-20">
        
        {/* SECTION 1: HEADER */}
        <motion.div
          id="intro"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 border-b border-white/10 pb-16"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter">
                Resume
              </h1>
              <p className="text-xl text-white/60 max-w-xl leading-relaxed">
                This page traces my professional path — from linguistics to AI engineering.
              </p>
            </div>
          </div>
        </motion.div>

        {/* SECTION 2: EXPERIENCE */}
        <section id="experience" className="mb-24 scroll-mt-32">
          <SectionLabel icon={Briefcase} label="Experience" color="indigo" />

          <div className="space-y-6">
            {experience.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative p-8 bg-white/[0.02] rounded-3xl border-l-4 border border-white/5 hover:bg-white/[0.04] transition-all`}
                style={{ borderLeftColor: job.accentHex }}
              >
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-2xl font-black text-white">{job.role}</h3>
                      {job.tag && (
                        <span
                          className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-widest border"
                          style={{
                            color: job.accentHex,
                            backgroundColor: `${job.accentHex}1A`,
                            borderColor: `${job.accentHex}40`,
                          }}
                        >
                          {job.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider flex-wrap">
                      <span style={{ color: job.accentHex }}>{job.company}</span>
                      <span className="w-1 h-1 bg-white/20 rounded-full" />
                      <span className="text-white/40">{job.period}</span>
                    </div>
                  </div>
                </div>

                <p className="text-white/70 leading-relaxed mb-5 max-w-3xl text-sm">
                  {job.desc}
                </p>

                {/* Highlights */}
                <div className="space-y-2">
                  {job.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: job.accentHex }} />
                      <span className="text-sm text-white/70 font-medium leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 3: EDUCATION — LIGHT */}
        <section id="education" className="relative isolate scroll-mt-32 py-20 md:py-28 mb-0">
          {/* Full-width light background */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen bg-offwhite -z-10" />

          <SectionLabel icon={GraduationCap} label="Education" color="teal" />

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, idx) => {
              const accent = idx === 0 ? { hex: '#06B6D4', name: 'teal' } : { hex: '#4F46E5', name: 'indigo' };
              return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative p-8 rounded-3xl border border-white/5 hover:border-white/15 transition-all overflow-hidden bg-[#1a1a1a]"
              >
                {/* Subtle accent line on the left edge */}
                <div className="absolute left-0 top-8 bottom-8 w-[3px] rounded-r" style={{ backgroundColor: accent.hex }} />

                <h3 className={`text-xl font-black text-white mb-2 ${accentHoverText[accent.name]} transition-colors`}>{edu.school}</h3>
                <p className="text-white/60 font-bold text-sm mb-4">{edu.degree}</p>
                <div
                  className="text-xs font-black uppercase tracking-widest mb-6 inline-block px-3 py-1 rounded-lg"
                  style={{ color: accent.hex, backgroundColor: `${accent.hex}1A` }}
                >
                  {edu.period}
                </div>
                <p className="text-sm text-white/70 leading-relaxed">
                  {edu.desc}
                </p>
              </motion.div>
            )})}
          </div>
        </section>

        {/* SECTION 4: INTERNATIONAL */}
        <section id="global" className="pt-20 md:pt-28 mb-24 scroll-mt-32">
          <SectionLabel icon={Globe} label="International Experience" color="white" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#06B6D4]/10 to-charcoal border border-white/10 p-8 md:p-12 group"
          >
            <BorderBeam color="#06B6D4" duration={8} />
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0 100 L100 0 L100 100 Z" fill="url(#grad1)" />
                 <defs>
                   <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" style={{stopColor: '#06B6D4', stopOpacity: 1}} />
                     <stop offset="100%" style={{stopColor: 'transparent', stopOpacity: 0}} />
                   </linearGradient>
                 </defs>
               </svg>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                  <span className="text-teal font-black uppercase tracking-widest text-xs">University Lumière Lyon 2</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-6">Academic Exchange</h3>
                <p className="text-lg text-white/70 max-w-xl leading-relaxed mb-6">
                  Full academic and cultural immersion in France. Studied linguistics at native-level French proficiency.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/20 border border-teal/30 rounded-lg text-teal font-bold text-xs uppercase tracking-wider">
                  <Award size={14} />
                  <span>Merit Scholarship Recipient</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-6xl font-black text-white/5 md:text-white/10">2022</div>
                <div className="text-white/40 font-bold uppercase tracking-widest text-xs mt-2">Lyon, France</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 5: SKILLS — LIGHT */}
        <section id="skills" className="relative isolate scroll-mt-32 py-20 md:py-28 mb-0">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen bg-offwhite -z-10" />

          <SectionLabel icon={Cpu} label="Skills" color="coral" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, idx) => {
              const hex = skillGroup.color === 'indigo' ? '#4F46E5' : skillGroup.color === 'teal' ? '#06B6D4' : '#F97316';
              return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="relative p-6 rounded-2xl border border-white/5 hover:border-white/15 transition-colors overflow-hidden bg-[#1a1a1a]"
              >
                {/* Subtle accent line at the top */}
                <div className="absolute top-0 left-6 right-6 h-[2px] rounded-b" style={{ backgroundColor: hex }} />

                <h4 className={`${accentText[skillGroup.color]} font-black uppercase tracking-widest text-xs mb-4 pb-4 border-b border-white/10`}>
                  {skillGroup.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white/5 text-white/80 text-xs font-bold rounded-lg border border-white/10 hover:border-white/30 hover:text-white transition-all">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )})}
          </div>
        </section>

        {/* SECTION 6 & 7: CERTS & LANGUAGES */}
        <div id="credentials" className="grid md:grid-cols-12 gap-10 pt-20 md:pt-28 mb-24 scroll-mt-32">
          <section className="md:col-span-8">
            <SectionLabel icon={CheckCircle2} label="Certifications & Publications" color="indigo" />
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-12 px-6 py-4 border-b border-white/10 bg-white/[0.02] text-xs font-black uppercase tracking-widest text-white/30">
                <div className="col-span-6">Course</div>
                <div className="col-span-4">Institution</div>
                <div className="col-span-2 text-right">Year</div>
              </div>
              {certs.map((cert, idx) => (
                <div key={idx} className="grid grid-cols-12 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors items-center">
                  <div className="col-span-6 font-bold text-white text-sm pr-4">{cert.name}</div>
                  <div className="col-span-4 text-white/50 text-xs">{cert.inst}</div>
                  <div className="col-span-2 text-white/30 text-xs font-mono text-right">{cert.year}</div>
                </div>
              ))}
            </div>

            {/* Publication */}
            <a
              href="https://doi.org/10.5281/zenodo.19930775"
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="paper-click"
              data-umami-event-location="resume"
              className="group mt-6 flex items-start justify-between gap-6 p-6 bg-indigo/5 border border-indigo/20 hover:border-indigo/50 rounded-3xl transition-all"
            >
              <div>
                <div className="text-indigo font-black uppercase tracking-widest text-xs mb-2">
                  Peer-reviewed publication · 2026
                </div>
                <h3 className="text-white font-bold text-sm md:text-base leading-snug mb-1">
                  "As arquiteturas distribuídas e integração de agentes inteligentes" — distributed architectures and intelligent-agent integration
                </h3>
                <p className="text-white/50 text-xs leading-relaxed">
                  Multi-agent systems, LLM integration and the Model Context Protocol. Revista Processando o Saber (eISSN 2179-5150), Vol. 18, n. 01 — the same architecture I operate in production.
                </p>
              </div>
              <ExternalLink size={18} className="text-white/30 group-hover:text-indigo transition-colors shrink-0 mt-1" />
            </a>
          </section>
          
          <section className="md:col-span-4">
            <SectionLabel icon={Languages} label="Languages" color="teal" />
            <div className="space-y-4">
              {[
                { lang: "Portuguese", level: "Native", code: "PT" },
                { lang: "English", level: "Fluent", code: "EN" },
                { lang: "French", level: "Fluent", code: "FR" },
                { lang: "Spanish", level: "Intermediate", code: "ES" }
              ].map((l, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center text-xs font-black text-teal">
                      {l.code}
                    </div>
                    <span className="font-bold text-white">{l.lang}</span>
                  </div>
                  <span className="text-xs font-bold text-white/60 uppercase tracking-wider">{l.level}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SECTION 8: VOLUNTEERING */}
        <section id="impact" className="mb-24 scroll-mt-32">
          <SectionLabel icon={HeartHandshake} label="Volunteering" color="coral" />
          
          <div className="grid md:grid-cols-3 gap-6">
            {volunteering.map((vol, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative p-6 border-l-2 border-white/10 hover:border-coral transition-colors bg-gradient-to-r from-white/[0.02] to-transparent"
              >
                <div className="text-coral font-black uppercase tracking-widest text-xs mb-2">{vol.period}</div>
                <h3 className="text-lg font-bold text-white mb-1">{vol.role}</h3>
                <div className="text-sm font-bold text-white/60 mb-4">{vol.org}</div>
                <p className="text-xs leading-relaxed text-white/70">
                  {vol.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProcessPage;
