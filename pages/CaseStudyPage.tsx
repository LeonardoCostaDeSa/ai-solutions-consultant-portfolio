
import React from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail, Target } from 'lucide-react';
import { solutions } from '../data/content';
import { diagrams } from '../data/diagrams';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import ProjectEnvironment from '../components/environments/ProjectEnvironment';
import FlowDiagram from '../components/diagrams/FlowDiagram';
import { track } from '../lib/analytics';

const SectionHeading: React.FC<{ label: string; accent: string }> = ({ label, accent }) => (
  <div className="flex items-center gap-4 mb-8">
    <span className="w-8 h-[2px] rounded" style={{ backgroundColor: accent }} />
    <h2 className="font-black uppercase tracking-[0.2em] text-xs" style={{ color: accent }}>
      {label}
    </h2>
  </div>
);

const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const solution = solutions.find((s) => s.slug === slug);

  if (!solution) {
    return <Navigate to="/solutions" replace />;
  }

  const { palette } = solution;
  const diagram = diagrams[solution.id];

  const ordered = [...solutions].sort((a, b) => a.order - b.order);
  const idx = ordered.findIndex((s) => s.id === solution.id);
  const prev = ordered[(idx - 1 + ordered.length) % ordered.length];
  const next = ordered[(idx + 1) % ordered.length];

  return (
    <div className="bg-charcoal min-h-screen text-offwhite overflow-x-clip">
      <Seo
        title={`${solution.title} — Case Study · Leonardo Sá`}
        description={`${solution.painPoint} ${solution.impactMetric}. A production case study by Leonardo Sá, AI Engineer.`}
        path={`/solutions/${solution.slug}`}
      />
      <Navbar />

      {/* HERO — full-bleed environment */}
      <header className="relative min-h-screen flex items-end overflow-hidden">
        <ProjectEnvironment seed={solution.id} palette={palette} archetype={solution.archetype} variant="hero" />
        <div className="relative z-10 max-w-5xl mx-auto w-full px-6 pb-20 pt-40">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors mb-10"
            >
              <ArrowLeft size={14} />
              <span>All projects</span>
            </Link>
            <div className="text-xs font-black uppercase tracking-[0.3em] mb-5" style={{ color: palette.accent }}>
              Case study · {solution.category}
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.02] mb-6 max-w-4xl">
              {solution.title}
            </h1>
            <p className="text-lg md:text-2xl text-white/80 font-medium leading-relaxed max-w-3xl mb-8">
              {solution.tagline}
            </p>
            <div
              className="inline-flex items-center gap-3 font-black text-xs uppercase tracking-widest px-5 py-3 rounded-full border"
              style={{ color: palette.accent, borderColor: `${palette.accent}66`, backgroundColor: `${palette.accent}14` }}
            >
              <Target size={14} />
              <span>{solution.impactMetric}</span>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="relative">
        {/* CONTEXT & CONSTRAINTS */}
        <section className="max-w-3xl mx-auto px-6 py-20 md:py-28">
          <SectionHeading label="Context & Constraints" accent={palette.accent} />
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">{solution.context}</p>
          <p className="text-white/70 text-base md:text-lg leading-relaxed">{solution.problem}</p>
          {solution.constraints && solution.constraints.length > 0 && (
            <ul className="mt-10 space-y-3 border-l-2 pl-6" style={{ borderColor: `${palette.accent}55` }}>
              {solution.constraints.map((c, i) => (
                <li key={i} className="text-white/70 text-sm md:text-base leading-relaxed">
                  {c}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* PULL QUOTE */}
        <section className="max-w-4xl mx-auto px-6 py-8 md:py-12">
          <blockquote
            className="text-2xl md:text-4xl font-black tracking-tight leading-snug text-center"
            style={{ color: palette.glow }}
          >
            “{solution.quote}”
          </blockquote>
        </section>

        {/* ARCHITECTURE */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-60">
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(180deg, transparent 0%, ${palette.ambient} 35%, ${palette.ambient} 65%, transparent 100%)` }}
            />
          </div>
          <div className="relative max-w-5xl mx-auto px-6">
            <SectionHeading label="Architecture" accent={palette.accent} />
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-3xl mb-14 whitespace-pre-line">
              {solution.architecture?.overview ?? solution.solution}
            </p>
            {diagram && (
              <div
                className="rounded-3xl border p-6 md:p-10"
                style={{ borderColor: `${palette.accent}33`, backgroundColor: 'rgba(255,255,255,0.015)' }}
              >
                <FlowDiagram data={diagram} palette={palette} />
                <p className="mt-6 text-xs text-white/50 font-medium uppercase tracking-wider text-center">{diagram.title}</p>
              </div>
            )}
          </div>
        </section>

        {/* DECISIONS & TRADE-OFFS — only when interview content exists */}
        {solution.architecture && solution.architecture.decisions.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <SectionHeading label="Decisions & Trade-offs" accent={palette.accent} />
            <div className="grid md:grid-cols-2 gap-5">
              {solution.architecture.decisions.map((d, i) => (
                <div key={i} className="p-7 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h3 className="text-white font-black text-base mb-3">{d.title}</h3>
                  <p className="text-sm font-bold mb-3" style={{ color: palette.accent }}>
                    {d.choice}
                  </p>
                  {d.alternatives && d.alternatives.length > 0 && (
                    <p className="text-white/50 text-xs uppercase tracking-wider font-bold mb-3">
                      Considered: {d.alternatives.join(' · ')}
                    </p>
                  )}
                  <p className="text-white/70 text-sm leading-relaxed">{d.rationale}</p>
                </div>
              ))}
            </div>
            {solution.architecture.tradeoffs.length > 0 && (
              <ul className="mt-10 space-y-3">
                {solution.architecture.tradeoffs.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70 text-sm md:text-base leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: palette.accent }} />
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* MY ROLE */}
        <section className="max-w-3xl mx-auto px-6 py-20 md:py-28">
          <SectionHeading label="My Role" accent={palette.accent} />
          <p className="text-white/80 text-base md:text-lg leading-relaxed">{solution.role}</p>
        </section>

        {/* RESULTS & VALIDATION */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div
            className="absolute inset-0 opacity-50"
            style={{ background: `radial-gradient(90% 70% at 50% 30%, ${palette.base} 0%, transparent 70%)` }}
          />
          <div className="relative max-w-5xl mx-auto px-6">
            <SectionHeading label="Results & Validation" accent={palette.accent} />
            {solution.results && solution.results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12">
                {solution.results.map((r, i) => (
                  <div key={i} className="p-7 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <div className="text-3xl md:text-4xl font-black mb-2" style={{ color: palette.accent }}>
                      {r.metric}
                    </div>
                    <div className="text-white font-bold text-sm">{r.label}</div>
                    {r.detail && <div className="text-white/60 text-xs mt-2 leading-relaxed">{r.detail}</div>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 mb-12">
                {solution.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: palette.accent }} />
                    <p className="text-white/80 text-sm md:text-base font-medium leading-relaxed">{h}</p>
                  </div>
                ))}
              </div>
            )}
            <blockquote
              className="text-white/70 text-base md:text-xl font-medium italic leading-relaxed border-l-4 pl-6 max-w-3xl"
              style={{ borderColor: `${palette.accent}66` }}
            >
              {solution.insight}
            </blockquote>
          </div>
        </section>

        {/* STACK */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <SectionHeading label="Stack" accent={palette.accent} />
          <div className="flex flex-wrap gap-3">
            {solution.techTags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-black uppercase tracking-widest text-white/70 border border-white/15 px-4 py-2 rounded-xl bg-white/[0.03]"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* NEXT / PREV */}
        <nav aria-label="More case studies" className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-5">
          {[
            { sol: prev, dir: 'Previous' as const },
            { sol: next, dir: 'Next' as const },
          ].map(({ sol, dir }) => (
            <Link
              key={dir}
              to={`/solutions/${sol.slug}`}
              onClick={() => track('case-next', { from: solution.id, to: sol.id, dir })}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-10 min-h-[180px] flex flex-col justify-end transition-colors hover:border-white/25 ${
                dir === 'Next' ? 'md:text-right md:items-end' : ''
              }`}
            >
              <ProjectEnvironment seed={sol.id} palette={sol.palette} archetype={sol.archetype} variant="strip" />
              <div className="relative z-10">
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/50 mb-3 group-hover:text-white/80 transition-colors">
                  {dir === 'Previous' && <ArrowLeft size={13} />}
                  <span>{dir} project</span>
                  {dir === 'Next' && <ArrowRight size={13} />}
                </span>
                <span className="text-xl md:text-2xl font-black text-white leading-tight">{sol.title}</span>
              </div>
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 pb-24 md:pb-32 text-center">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-4">
            Building AI that has to work every time?
          </h2>
          <p className="text-white/60 mb-8">I design, ship and operate systems like this one.</p>
          <a
            href="mailto:leonardo@leonardosa.pro"
            data-umami-event="contact-click"
            data-umami-event-location={`case-${solution.id}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo hover:bg-indigo/90 text-white rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-indigo/30 active:scale-95"
          >
            <Mail size={16} />
            <span>Let's talk</span>
          </a>
        </section>
      </main>
    </div>
  );
};

export default CaseStudyPage;
