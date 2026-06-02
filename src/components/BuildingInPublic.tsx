import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Hammer, Instagram, Linkedin, GitCommit, Layout, ShieldAlert, Code, Compass, Activity } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface JournalItem {
  category: string;
  title: string;
  desc: string;
  gitHash?: string;
  accent: string;
  icon: React.ComponentType<any>;
  cssArt: React.ReactNode;
}

export const BuildingInPublic: React.FC = () => {
  const items: JournalItem[] = [
    {
      category: 'DESIGN EVOLUTION',
      title: 'Figma Coordinates: Space Voids',
      desc: 'Orchestrating nested orbital ring components (800px, 550px, 320px radius) to calibrate background visual gravity. Aligning satoshi typography clamps to avoid screen clipping.',
      gitHash: 'figma-x840_y920',
      accent: 'rgba(139, 92, 246, 0.25)',
      icon: Layout,
      cssArt: (
        <div className="absolute inset-0 flex flex-col justify-between p-3 bg-[#0c0824] overflow-hidden font-mono text-[5.5px] text-violet-300">
          <div className="flex items-center justify-between border-b border-violet-500/20 pb-1">
            <span className="font-bold">// FIGMA_SPACE_PACING</span>
            <span className="text-[5px] text-white/30">LOCKED</span>
          </div>
          {/* Mock Vector coordinate grids */}
          <div className="relative w-full h-16 border border-dashed border-violet-500/20 rounded flex items-center justify-center">
            <div className="absolute w-12 h-12 rounded-full border border-violet-500/30 border-dashed animate-spin-slow"></div>
            <div className="absolute w-8 h-8 rounded-full border border-cyan-500/20 border-dashed"></div>
            <div className="text-[5px] text-violet-400 font-bold bg-black/40 px-1 rounded">R_RING: 550px</div>
            <div className="absolute top-1 left-2 text-white/20">X: 420.2</div>
            <div className="absolute bottom-1 right-2 text-white/20">Y: 968.4</div>
          </div>
          <div className="text-white/40 leading-none">FRAME_DIMENSION: 1440px * 900px</div>
        </div>
      ),
    },
    {
      category: 'BEFORE VS AFTER',
      title: 'The Visual Transformation Matrix',
      desc: 'Deconstructing a cluttered, multi-colored legacy student portfolio. Rebuilding it with single-line grids, dark Void (#050816) background layers, and elite satoshi font tokens.',
      gitHash: 'commit [d8b72c4]',
      accent: 'rgba(34, 197, 94, 0.2)',
      icon: Compass,
      cssArt: (
        <div className="absolute inset-0 flex flex-col justify-center p-3 bg-[#0e1422] overflow-hidden font-mono text-[5.5px]">
          <div className="flex gap-2 mb-2.5 items-center">
            <span className="text-red-400 font-bold">LEGACY:</span>
            <div className="h-1.5 w-16 bg-red-400/20 rounded"></div>
            <span className="text-white/20">#FF5555</span>
          </div>
          <div className="w-full h-[0.5px] bg-red-500/10 mb-4"></div>
          <div className="flex gap-2 items-center">
            <span className="text-emerald-400 font-bold">REBUILT:</span>
            <div className="h-1.5 w-24 bg-emerald-400/20 rounded"></div>
            <span className="text-white/20">#050816</span>
          </div>
          <div className="w-full h-1 bg-gradient-to-r from-emerald-500/40 via-violet-500/30 to-transparent rounded mt-1"></div>
        </div>
      ),
    },
    {
      category: 'STARTUP DESIGN AUDITS',
      title: 'Erasing DM Booking Friction',
      desc: 'Auditing a boutique startup page. Replaced fragmented Instagram catalog DMs and manual GPay verification prompts with direct automated WhatsApp booking pipelines.',
      gitHash: 'audit-apex_clinic',
      accent: 'rgba(6, 182, 212, 0.25)',
      icon: ShieldAlert,
      cssArt: (
        <div className="absolute inset-0 flex flex-col justify-between p-3.5 bg-[#0a1224] overflow-hidden font-mono text-[5.5px]">
          <div className="flex justify-between items-center text-cyan-400">
            <span>[AUDIT_FLOW]</span>
            <span>VERIFIED</span>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center py-1">
            <div className="w-9 h-9 rounded-full bg-cyan-500/5 border border-cyan-500/35 flex flex-col items-center justify-center text-cyan-400 font-bold leading-none">
              <span className="text-[8px]">98%</span>
              <span className="text-[4px] text-white/30 tracking-tighter">SUCCESS</span>
            </div>
          </div>
          <div className="flex justify-between text-white/30 border-t border-cyan-500/10 pt-1">
            <span>INPUT: DMs</span>
            <span>OUTPUT: WHATSAPP</span>
          </div>
        </div>
      ),
    },
    {
      category: 'CODE BEHIND THE BUILD',
      title: 'Damping Snappy Lenis Scroll',
      desc: 'Tuning inertia damping formulas inside React useEffect hooks. Calibrating scroll velocity lerp variables to yield snappier above-the-fold parallax rendering on trackpads.',
      gitHash: 'commit [c7b12e0]',
      accent: 'rgba(236, 72, 153, 0.25)',
      icon: Code,
      cssArt: (
        <div className="absolute inset-0 p-3 bg-[#020617] font-mono text-[5px] text-emerald-400 overflow-hidden space-y-1">
          <div className="flex items-center justify-between border-b border-white/5 pb-1 mb-1.5 text-white/30">
            <span>react-scroll-damp.ts</span>
            <span className="text-emerald-500/50">OK</span>
          </div>
          <p className="text-white/30">useEffect(() =&gt; &#123;</p>
          <p className="pl-2">&gt; const lenis = new Lenis(&#123;</p>
          <p className="pl-4 text-cyan-400">duration: 1.2,</p>
          <p className="pl-4 text-cyan-400">easing: (t) =&gt; Math.min(1, ...)</p>
          <p className="pl-2">&gt; &#125;);</p>
          <div className="w-1 h-2.5 bg-emerald-400 inline-block animate-pulse"></div>
        </div>
      ),
    },
    {
      category: 'STUDENT VISIBILITY PROBLEMS',
      title: 'Cracking the 6-Second Glance',
      desc: 'Analyzing how recruiters scan applications. Standard text resumes are ignored due to formatting fatigue. We architect monospace code consoles that physically trap recruiter attention.',
      gitHash: 'recruit-telemetry',
      accent: 'rgba(245, 158, 11, 0.25)',
      icon: Hammer,
      cssArt: (
        <div className="absolute inset-0 flex flex-col justify-between p-3.5 bg-[#1a0f05] border border-amber-500/20 rounded-md overflow-hidden font-mono text-[5.5px]">
          <div className="flex items-center gap-1 text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>RECRUITER_ATTENTION_GRID</span>
          </div>
          <div className="space-y-1.5 py-2">
            <div className="flex justify-between items-center text-[5px]">
              <span className="text-white/40">TEXT RESUME SCROLL:</span>
              <span className="text-red-400 font-bold">6.2 SECS</span>
            </div>
            <div className="flex justify-between items-center text-[5px]">
              <span className="text-white/40">ANVORA CONSOLE TIME:</span>
              <span className="text-emerald-400 font-bold">148 SECS</span>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-red-500 to-emerald-400 rounded"></div>
        </div>
      ),
    },
    {
      category: 'MOTION EXPERIMENTS',
      title: 'Vector Spring Inertia Tuning',
      desc: 'Calibrating numerical spring physics coefficients (`stiffness: 120`, `damping: 40`) for portfolio statistic counters. Making numbers decelerate with satisfying organic pacing.',
      gitHash: 'commit [a1e7b4c]',
      accent: 'rgba(6, 182, 212, 0.25)',
      icon: Activity,
      cssArt: (
        <div className="absolute inset-0 flex flex-col justify-between p-3 bg-[#05111a] border border-cyan-500/20 rounded-md overflow-hidden font-mono text-[5.5px] text-cyan-300">
          <div className="flex justify-between items-center border-b border-cyan-500/10 pb-1">
            <span>// SPRING_INERTIA</span>
            <span>ACTIVE</span>
          </div>
          {/* Simulated spring wave graphics */}
          <div className="relative w-full h-12 flex items-center">
            <svg className="w-full h-8 stroke-cyan-400" viewBox="0 0 100 30" fill="none">
              <path d="M0,15 C20,-5 30,35 45,15 C55,5 65,22 75,15 C85,12 90,17 100,15" strokeWidth="1" />
            </svg>
            <div className="absolute top-1 right-2 text-cyan-500/40 text-[4.5px]">DAMP: 40</div>
            <div className="absolute bottom-1 left-2 text-cyan-500/40 text-[4.5px]">STIFF: 120</div>
          </div>
          <span className="text-white/30 text-[4.5px]">STABLE COUNT DELIVERED: OK</span>
        </div>
      ),
    },
  ];

  return (
    <section
      id="process"
      className="relative py-28 bg-[#050816] grain border-bottom-subtle overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="section-label mb-3 block">Tactile Studio Journal</span>
            <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white tracking-tight uppercase leading-none">
              BUILDING <span className="text-grad-violet">IN PUBLIC.</span>
            </h2>
            <p className="font-body font-light text-muted-cin text-sm md:text-base max-w-lg mt-6 leading-relaxed">
              We design and construct out in the open. Explore our actual artboards, figma vector margins, IDE setup, scroll mathematics, and git commits that bring our systems to life.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.98 }}
              onClick={() => audioEngine.playClick()}
              className="flex items-center gap-2 px-5 py-2.5 rounded border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all text-white/70 hover:text-white"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
              <span className="font-body text-[9px] tracking-[0.2em] uppercase">INSTAGRAM JOURNAL</span>
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.98 }}
              onClick={() => audioEngine.playClick()}
              className="flex items-center gap-2 px-5 py-2.5 rounded border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all text-white/70 hover:text-white"
            >
              <Linkedin className="w-4 h-4 text-cyan-400" />
              <span className="font-body text-[9px] tracking-[0.2em] uppercase">LINKEDIN COMMITS</span>
            </motion.a>
          </div>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => {
            const SectionIcon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="card-imax p-6 rounded-xl flex flex-col gap-6 justify-between group h-full relative"
                style={{
                  background: 'linear-gradient(180deg, rgba(14,20,34,0.7) 0%, rgba(8,13,26,0.9) 100%)',
                }}
              >
                {/* Accent glow corner */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 10% 10%, ${item.accent}12, transparent 50%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* CSS Art Side */}
                  <div className="relative w-full aspect-[16/10] bg-black/40 rounded-lg border border-[rgba(255,255,255,0.06)] overflow-hidden flex-shrink-0">
                    {item.cssArt}
                  </div>

                  {/* Header row */}
                  <div className="flex items-center justify-between mt-5 mb-4">
                    <span
                      className="font-body text-[8px] font-bold tracking-[0.2em] px-2.5 py-0.5 rounded-sm border"
                      style={{
                        borderColor: item.accent,
                        color: item.category === 'BEFORE VS AFTER' ? '#34d399' : item.category === 'DESIGN EVOLUTION' ? '#a78bfa' : item.category === 'STARTUP DESIGN AUDITS' ? '#22d3ee' : item.category === 'CODE BEHIND THE BUILD' ? '#ec4899' : item.category === 'STUDENT VISIBILITY PROBLEMS' ? '#f59e0b' : '#06b6d4',
                        background: `${item.accent}05`,
                      }}
                    >
                      {item.category}
                    </span>
                    {item.gitHash && (
                      <span className="font-mono text-[7px] tracking-[0.1em] text-dim-cin flex items-center gap-1">
                        <GitCommit className="w-2.5 h-2.5 text-violet-soft" />
                        {item.gitHash}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-extrabold text-base text-white tracking-tight uppercase group-hover:text-grad-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-body font-light text-muted-cin text-xs leading-relaxed mt-2.5">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-6 font-body text-[8px] tracking-[0.2em] text-white/30 group-hover:text-white/60 transition-colors border-t border-white/5 pt-4">
                  <Eye className="w-3 h-3" />
                  <span>TRANSPARENT SYSTEM DEVELOPMENT LOG</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
