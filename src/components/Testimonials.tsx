import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, TrendingUp, Calendar, AlertTriangle, ArrowRight, ShieldCheck, Quote } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface CaseStudy {
  client: string;
  category: string;
  problem: string;
  solution: string;
  outcome: string;
  metric: string;
  metricLabel: string;
  icon: React.ComponentType<any>;
  color: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    client: 'ROHIT SEN (CS STUDENT)',
    category: 'PLACEMENT PORTFOLIO',
    problem: 'Muted, static PDF resume template resulting in low recruiter callback visibility (<0.5% response rate) under thousands of generic applications.',
    solution: 'Interactive high-performance Personal Brand System with integrated monospace timeline consoles, custom sound toggles, and live project credentials.',
    outcome: '3 high-stakes internship and final-round placement interview callbacks secured within 2 weeks of system deployment.',
    metric: '240%',
    metricLabel: 'RESPONSE VELOCITY SURGE',
    icon: Trophy,
    color: '#a78bfa',
  },
  {
    client: 'APEX CLINIC (FOUNDERS)',
    category: 'CINEMATIC STARTUP WEBSITE',
    problem: 'Instagram-only business operations. Manual payment verification loops, highly fragmented booking flows, and zero search engine authority.',
    solution: ' Breathtaking Cinematic Brand Platform featuring automated lead capture, integrated WhatsApp scheduling pipelines, and full local SEO indexing.',
    outcome: 'Inbound booking leads surged by 180% in the first week. Manual operations reduced to zero, capturing continuous organic search intent.',
    metric: '180%',
    metricLabel: 'LEAD ROUTING GAIN',
    icon: TrendingUp,
    color: '#22d3ee',
  },
  {
    client: 'NEXUS SYMPOSIUM (CAMPUS)',
    category: 'INTERACTIVE EVENT PLATFORM',
    problem: 'Static paper flyers and pamphlet brochures. Untracked registrations, chaotic paper ticket booking, and no measurable sponsor footprint.',
    solution: 'Interactive event ticketing terminal with real-time RSVP telemetry dashboard tracking registration velocity and high-visibility sponsor logo grids.',
    outcome: 'Completed 650+ event registrations inside 48 hours. Achieved maximum sponsor satisfaction through transparent impressions telemetry.',
    metric: '650+',
    metricLabel: 'RSVPS SECURED IN 48H',
    icon: Calendar,
    color: '#ec4899',
  },
];

export const ImpactSignals: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setIndex((p) => (p + 1) % CASE_STUDIES.length);
    }, 7000);
    return () => clearInterval(iv);
  }, []);

  const currentCase = CASE_STUDIES[index];
  const IconComponent = currentCase.icon;

  return (
    <section
      id="impact"
      className="relative py-28 bg-[#050816] grain border-bottom-subtle overflow-hidden"
    >
      {/* Background glow matrix */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.02) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="section-label mb-3 block">Mini Case Studies</span>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white tracking-tight uppercase leading-none">
            SIGNALS THAT <span className="text-grad-violet">CREATED IMPACT.</span>
          </h2>
          <p className="font-body font-light text-muted-cin text-sm md:text-base max-w-2xl mx-auto mt-6">
            We prove authority through raw diagnostic results. Explore our active digital transformations, showing how low-visibility profiles converted into high-impact systems.
          </p>
        </div>

        {/* Diagnostic Case Study Matrix */}
        <div className="max-w-5xl mx-auto min-h-[480px] md:min-h-[400px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="card-imax p-8 md:p-12 rounded-xl flex flex-col justify-between w-full h-full relative"
              style={{
                background: 'linear-gradient(180deg, rgba(14,20,34,0.8) 0%, rgba(8,13,26,0.95) 100%)',
                borderColor: `${currentCase.color}35`,
              }}
            >
              {/* Corner Ambient Glow overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 10% 10%, ${currentCase.color}08, transparent 40%)`,
                }}
              />

              <div>
                {/* Top snapshot row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-6 mb-8 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-panel border border-[rgba(255,255,255,0.06)] flex items-center justify-center">
                      <IconComponent className="w-4 h-4" style={{ color: currentCase.color }} />
                    </div>
                    <div>
                      <span className="font-body text-[8px] font-bold tracking-[0.25em] text-violet-soft uppercase block">
                        {currentCase.category}
                      </span>
                      <h3 className="font-display font-extrabold text-base text-white tracking-wide mt-0.5">
                        {currentCase.client}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-row items-baseline gap-2">
                    <span className="font-display font-black text-3xl md:text-4xl tracking-tighter" style={{ color: currentCase.color }}>
                      {currentCase.metric}
                    </span>
                    <span className="font-body text-[8px] tracking-[0.1em] text-white/50 font-bold uppercase">
                      {currentCase.metricLabel}
                    </span>
                  </div>
                </div>

                {/* Main 3-Column Diagnostic Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-2">
                  {/* Problem */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-red-400 font-body text-[9px] tracking-[0.15em] font-bold uppercase">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>THE PROBLEM</span>
                    </div>
                    <p className="font-body font-light text-muted-cin text-xs leading-relaxed pl-1.5 border-l border-red-500/20">
                      {currentCase.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-violet-soft font-body text-[9px] tracking-[0.15em] font-bold uppercase">
                      <Quote className="w-3.5 h-3.5" />
                      <span>THE SOLUTION</span>
                    </div>
                    <p className="font-body font-light text-muted-cin text-xs leading-relaxed pl-1.5 border-l border-violet-500/20">
                      {currentCase.solution}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-body text-[9px] tracking-[0.15em] font-bold uppercase">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>THE OUTCOME</span>
                    </div>
                    <p className="font-body font-medium text-white/90 text-xs leading-relaxed pl-1.5 border-l border-emerald-500/20">
                      {currentCase.outcome}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer timeline pagination */}
              <div className="flex justify-between items-center border-t border-white/5 pt-6 mt-8">
                <span className="font-mono text-[8px] tracking-[0.15em] text-dim-cin font-bold">
                  // EXPERIMENT RECORD 0{index + 1}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-body text-[8px] text-white/30 uppercase tracking-widest font-semibold mr-2">SECURE SIGNAL</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel indicators row */}
        <div className="flex justify-center gap-3 mt-12">
          {CASE_STUDIES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIndex(i);
                audioEngine.playClick();
              }}
              aria-label={`Go to case study ${i + 1}`}
              className="focus:outline-none"
              style={{
                width: 36,
                height: 1.5,
                background: i === index ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                padding: '6px 0',
                cursor: 'pointer',
                boxSizing: 'content-box',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Supporting old imports just in case
export { ImpactSignals as Testimonials };
