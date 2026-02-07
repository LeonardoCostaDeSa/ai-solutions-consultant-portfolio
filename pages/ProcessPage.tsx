
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Download, 
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
import { useNavigate } from 'react-router-dom';
import BorderBeam from '../components/BorderBeam';

// --- DATA ---
const experience = [
  {
    company: "KPMG Brazil",
    role: "AI Solutions Consultant",
    period: "May 2025 – Present",
    desc: "I develop and implement AI and automation solutions for tax transformation, working with Power Platform, Copilot Studio, and custom Python development (CrewAI, multi-agent systems). Key deliverables include agentic workflows for Brazilian Tax Reform, AI chatbots, and automation pipelines that drive 30–80% efficiency gains. I also design and deliver training sessions on AI adoption for cross-functional teams across 5+ areas."
  },
  {
    company: "Caju GameLabs",
    role: "Software Engineer",
    period: "Jul 2024 – Apr 2025",
    desc: "Led a team of three developers building 2D games in Unity/C#. Managed task assignments, delivery schedules, and applied OOP principles for modular architecture. Improved sprint velocity by ~25% through agile implementation (Scrum/Trello)."
  },
  {
    company: "Legislative Assembly of São Paulo",
    role: "Communication Strategist",
    period: "Mar 2023 – Jul 2024",
    desc: "Managed public image and content strategy for Congressman Ricardo França. Produced scripts, social media content, and strategic materials, resulting in 27,000+ new followers in just over a year. Handled crisis management and performance analytics."
  }
];

const education = [
  {
    school: "FATEC Praia Grande",
    degree: "Systems Analysis & Development",
    period: "2023 – 2026 (in progress)",
    desc: "Programming logic, data structures, databases, operating systems, and web development."
  },
  {
    school: "University of São Paulo",
    degree: "BA in Linguistics, Portuguese & French",
    period: "2017 – 2022",
    desc: "Graduated with highest GPA. Published academic article \"The Critique of Reading.\" Awarded merit scholarship for academic exchange."
  }
];

const skills = [
  { category: "AI & Automation", items: ["Multi-Agent Systems", "RPA", "Digital Transformation"], color: "indigo" },
  { category: "Cloud & Platforms", items: ["Azure", "Power Automate", "Copilot Studio", "Excel / VBA"], color: "teal" },
  { category: "Programming", items: ["Python (Django/Flask)", "JavaScript (Node)", "HTML/CSS"], color: "coral" },
  { category: "Data Engineering", items: ["SQL / MySQL", "Data Modeling", "Pandas / NumPy", "Visualization"], color: "indigo" },
  { category: "DevOps", items: ["Git / GitHub", "Linux / Ubuntu", "API REST", "Vercel"], color: "teal" },
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
  { id: 'intro', label: 'Discovery' },
  { id: 'experience', label: 'Trajectory' },
  { id: 'education', label: 'Foundation' },
  { id: 'global', label: 'Global' },
  { id: 'skills', label: 'Arsenal' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'impact', label: 'Impact' },
];

// --- COMPONENTS ---

const SectionLabel: React.FC<{ icon: any, label: string, color?: string }> = ({ icon: Icon, label, color = "white" }) => (
  <div className={`flex items-center gap-3 mb-8 text-${color === 'white' ? 'white/40' : color}`}>
    <div className={`p-2 rounded-lg bg-${color === 'white' ? 'white' : color}/10 border border-${color === 'white' ? 'white' : color}/20`}>
      <Icon size={16} />
    </div>
    <span className="font-black uppercase tracking-[0.2em] text-xs">{label}</span>
  </div>
);

const ProcessPage: React.FC = () => {
  const navigate = useNavigate();
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
    <div className="bg-charcoal min-h-screen text-offwhite selection:bg-indigo selection:text-white pb-32">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Navigation Bar (Top) */}
      <nav className="sticky top-0 z-50 p-6 flex justify-between items-center backdrop-blur-xl bg-charcoal/80 border-b border-white/5">
        <div className="flex items-center gap-8">
          <div className="font-black text-lg tracking-tighter">LEONARDO<span className="text-indigo">.SA</span></div>
          <div className="hidden md:flex gap-6">
            <button onClick={() => navigate('/')} className="text-xs font-bold text-white/60 hover:text-white uppercase tracking-widest transition-colors">Who am I?</button>
            <button onClick={() => navigate('/solutions')} className="text-xs font-bold text-white/60 hover:text-white uppercase tracking-widest transition-colors">Projects</button>
            <button className="text-xs font-bold text-white bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">Resume</button>
          </div>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="group flex items-center gap-2 font-bold text-sm text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Back Home</span>
        </button>
      </nav>

      {/* Left Sidebar Navigation (Desktop Only) */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-6">
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
                className={`text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
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
          <span className="text-indigo font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Discovery Protocol</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter">
                Resume
              </h1>
              <p className="text-xl text-white/40 max-w-xl leading-relaxed">
                This page traces my professional path — from linguistics to AI engineering. If you need a concise version for your records, download my CV below.
              </p>
            </div>
            <button className="group flex items-center gap-3 px-8 py-4 bg-indigo hover:bg-indigo/90 text-white rounded-full font-bold transition-all shadow-lg shadow-indigo/20 active:scale-95 whitespace-nowrap">
              <Download size={18} />
              <span>Download CV</span>
            </button>
          </div>
        </motion.div>

        {/* SECTION 2: EXPERIENCE */}
        <section id="experience" className="mb-24 scroll-mt-32">
          <SectionLabel icon={Briefcase} label="Trajectory // Experience" color="indigo" />
          
          <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-16 pl-8 md:pl-12">
            {experience.map((job, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] md:-left-[59px] top-2 w-5 h-5 rounded-full bg-charcoal border-2 border-indigo shadow-[0_0_10px_rgba(79,70,229,0.4)]" />
                
                <h3 className="text-2xl font-black text-white mb-1">{job.role}</h3>
                <div className="flex flex-wrap gap-2 md:gap-4 items-center text-sm font-bold text-white/40 mb-4 uppercase tracking-wider">
                  <span className="text-indigo">{job.company}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span>{job.period}</span>
                </div>
                <p className="text-white/60 leading-relaxed max-w-3xl border-l-2 border-white/5 pl-4">
                  {job.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 3: EDUCATION */}
        <section id="education" className="mb-24 scroll-mt-32">
          <SectionLabel icon={GraduationCap} label="Foundation // Education" color="teal" />
          
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group p-8 bg-white/[0.02] border border-white/10 hover:border-teal/30 rounded-3xl transition-all"
              >
                <h3 className="text-xl font-black text-white mb-2 group-hover:text-teal transition-colors">{edu.school}</h3>
                <p className="text-white/60 font-bold text-sm mb-4">{edu.degree}</p>
                <div className="text-xs font-black uppercase tracking-widest text-teal/80 mb-6 bg-teal/10 inline-block px-3 py-1 rounded-lg">
                  {edu.period}
                </div>
                <p className="text-sm text-white/40 leading-relaxed">
                  {edu.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 4: INTERNATIONAL */}
        <section id="global" className="mb-24 scroll-mt-32">
          <SectionLabel icon={Globe} label="Global // Exchange" color="white" />
          
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

        {/* SECTION 5: SKILLS */}
        <section id="skills" className="mb-24 scroll-mt-32">
          <SectionLabel icon={Cpu} label="Arsenal // Skills" color="coral" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors"
              >
                <h4 className={`text-${skillGroup.color} font-black uppercase tracking-widest text-xs mb-4 pb-4 border-b border-white/5`}>
                  {skillGroup.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white/5 text-white/70 text-xs font-bold rounded-lg border border-white/5 hover:border-white/20 hover:text-white transition-all">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 6 & 7: CERTS & LANGUAGES */}
        <div id="credentials" className="grid md:grid-cols-12 gap-10 mb-24 scroll-mt-32">
          <section className="md:col-span-8">
            <SectionLabel icon={CheckCircle2} label="Credentials // Certifications" color="indigo" />
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-12 px-6 py-4 border-b border-white/10 bg-white/[0.02] text-[10px] font-black uppercase tracking-widest text-white/30">
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
          </section>
          
          <section className="md:col-span-4">
            <SectionLabel icon={Languages} label="Fluency // Languages" color="teal" />
            <div className="space-y-4">
              {[
                { lang: "Portuguese", level: "Native", code: "PT" },
                { lang: "English", level: "Fluent", code: "EN" },
                { lang: "French", level: "Fluent", code: "FR" }
              ].map((l, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center text-[10px] font-black text-teal">
                      {l.code}
                    </div>
                    <span className="font-bold text-white">{l.lang}</span>
                  </div>
                  <span className="text-xs font-bold text-white/40 uppercase tracking-wider">{l.level}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SECTION 8: VOLUNTEERING */}
        <section id="impact" className="mb-24 scroll-mt-32">
          <SectionLabel icon={HeartHandshake} label="Impact // Volunteering" color="coral" />
          
          <div className="grid md:grid-cols-3 gap-6">
            {volunteering.map((vol, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative p-6 border-l-2 border-white/10 hover:border-coral transition-colors bg-gradient-to-r from-white/[0.02] to-transparent"
              >
                <div className="text-coral font-black uppercase tracking-widest text-[10px] mb-2">{vol.period}</div>
                <h3 className="text-lg font-bold text-white mb-1">{vol.role}</h3>
                <div className="text-sm font-bold text-white/40 mb-4">{vol.org}</div>
                <p className="text-xs leading-relaxed text-white/60">
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
