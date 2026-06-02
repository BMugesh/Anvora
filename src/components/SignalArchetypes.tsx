import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldAlert, Zap, Compass, Cpu, Layers, ArrowUpRight, Monitor, Smartphone, Play } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface Archetype {
  name: string;
  badge: string;
  tagline: string;
  bestFor: string;
  desc: string;
  icon: React.ComponentType<any>;
  themeGlow: string;
  desktopPreview: React.ReactNode;
  mobilePreview: React.ReactNode;
}

const ArchetypeCard: React.FC<{ arch: Archetype; index: number }> = ({ arch, index }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isSimulating, setIsSimulating] = useState(false);
  const Icon = arch.icon;

  const triggerSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    audioEngine.playClick();
    setTimeout(() => {
      setIsSimulating(false);
    }, 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card-imax p-6 rounded-xl flex flex-col group h-full justify-between"
      style={{
        background: 'linear-gradient(180deg, rgba(19,25,41,0.7) 0%, rgba(8,13,26,0.85) 100%)',
      }}
    >
      {/* Theme Glow Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: arch.themeGlow }}
      />

      <div className="relative z-10">
        {/* Visual Miniature Preview Panel */}
        <div className="relative w-full aspect-[16/10] bg-black/50 rounded-lg border border-[rgba(255,255,255,0.06)] overflow-hidden mb-5">
          {/* Draggable/Toggled view wrapper */}
          <div className="absolute inset-0 p-3">
            <AnimatePresence mode="wait">
              {viewMode === 'desktop' ? (
                <motion.div
                  key="desktop"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full relative"
                >
                  {arch.desktopPreview}
                </motion.div>
              ) : (
                <motion.div
                  key="mobile"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full flex items-center justify-center relative"
                >
                  {arch.mobilePreview}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Simulation Overlay Effect */}
          {isSimulating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-violet-600/10 pointer-events-none flex items-center justify-center backdrop-blur-[1px] z-20"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent animate-scan-v"
                style={{
                  animation: 'scan-v 1.5s linear infinite'
                }}
              />
              <span className="font-mono text-[7px] tracking-[0.2em] text-violet-300 font-bold bg-black/80 px-2.5 py-1 rounded border border-violet-500/30 animate-pulse">
                SIMULATING ENVIRONMENT...
              </span>
            </motion.div>
          )}

          {/* Device and Sim Control Floating Overlay */}
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-30">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('desktop');
                audioEngine.playClick();
              }}
              className={`p-1.5 rounded transition-all ${viewMode === 'desktop' ? 'bg-violet-500/20 border border-violet-500/40 text-white' : 'bg-black/40 border border-white/5 text-white/40 hover:text-white'}`}
              title="Desktop View"
            >
              <Monitor className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('mobile');
                audioEngine.playClick();
              }}
              className={`p-1.5 rounded transition-all ${viewMode === 'mobile' ? 'bg-violet-500/20 border border-violet-500/40 text-white' : 'bg-black/40 border border-white/5 text-white/40 hover:text-white'}`}
              title="Mobile View"
            >
              <Smartphone className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerSimulation();
              }}
              disabled={isSimulating}
              className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-500/40 text-emerald-400 rounded flex items-center gap-1 text-[8px] tracking-[0.1em] font-bold"
            >
              <Play className="w-2 h-2 fill-emerald-400" />
              LIVE TEST
            </button>
          </div>
        </div>

        {/* Badges & Meta */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-body text-[8px] font-bold tracking-[0.2em] text-violet-soft border border-violet-500/25 px-2 py-0.5 rounded-sm">
            {arch.badge}
          </span>
          <span className="font-body text-[8px] tracking-[0.15em] text-dim-cin font-semibold">
            ARCHETYPE 0{index + 1}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="font-display font-extrabold text-lg md:text-xl text-white tracking-tight uppercase group-hover:text-grad-white transition-colors duration-300">
          {arch.name}
        </h3>
        <p className="font-body font-medium text-xs text-white/60 tracking-wide mt-1.5 mb-3 italic">
          "{arch.tagline}"
        </p>

        <p className="font-body font-light text-muted-cin text-xs leading-relaxed mb-6">
          {arch.desc}
        </p>

        {/* Best For Info */}
        <div className="border-t border-white/5 pt-3 mt-4 mb-8">
          <span className="font-body text-[8px] tracking-[0.1em] text-dim-cin uppercase block mb-1">
            Best Suited For:
          </span>
          <span className="font-body text-xs text-white/80 font-medium">
            {arch.bestFor}
          </span>
        </div>
      </div>

      {/* Explore button */}
      <motion.a
        href={`https://wa.me/+918778848565?text=Hi%20Anvora,%20I'm%20interested%20in%20the%20${encodeURIComponent(arch.name)}%20visual%20direction.`}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.98 }}
        onClick={() => audioEngine.playClick()}
        onMouseEnter={() => audioEngine.playHover()}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 group/btn"
      >
        <span className="font-body text-[9px] tracking-[0.2em] text-white/50 group-hover/btn:text-white transition-colors">
          EXPLORE DIRECTION
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover/btn:text-white transition-colors" />
      </motion.a>
    </motion.div>
  );
};

export const SignalArchetypes: React.FC = () => {
  const archetypes: Archetype[] = [
    {
      name: 'CORPORATE AUTHORITY',
      badge: 'ELITE PRO',
      tagline: 'Precision. Authority. Structure.',
      bestFor: 'Placement Students, Consultants, Professionals',
      desc: 'Deep navy palettes, perfectly ordered grids, heavy typography, and clinical structure. Designed with experience timelines and credentials to establish maximum recruiter trust.',
      icon: Compass,
      themeGlow: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 60%)',
      desktopPreview: (
        <div className="w-full h-full flex flex-col justify-between p-3.5 bg-[#0a1128] border border-emerald-500/20 rounded-md overflow-hidden font-sans text-white/80">
          <div className="flex items-center justify-between border-b border-emerald-500/10 pb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="font-mono text-[7px] tracking-wider text-emerald-400 font-bold">ROHIT_SEN_SYSTEM</span>
            </div>
            <div className="flex gap-2 text-[5px] tracking-widest text-white/40 uppercase">
              <span>Home</span>
              <span>Resume</span>
              <span>Certs</span>
            </div>
          </div>
          <div className="space-y-2 py-2">
            <span className="text-[6px] tracking-widest text-emerald-400 font-bold uppercase">EXPERIENCE TIMELINE:</span>
            <div className="border-l border-emerald-500/20 pl-2 space-y-1.5">
              <div className="relative">
                <div className="absolute -left-[11px] top-1 w-1.5 h-1.5 rounded-full bg-emerald-400 border border-[#0a1128]"></div>
                <div className="text-[7px] font-bold text-white leading-none">R&amp;D Software Engineer @ Apex Corp</div>
                <div className="text-[5px] text-white/40">2024 - Present · Lead Systems design</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center border-t border-emerald-500/10 pt-2 text-[5px] text-white/30">
            <span>CERTIFICATION: AWS CREDENTIAL V1</span>
            <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-[2px] font-bold">VERIFIED</span>
          </div>
        </div>
      ),
      mobilePreview: (
        <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#0a1128] border border-emerald-500/25 rounded-lg overflow-hidden text-[5px] text-white/70">
          <div className="flex items-center gap-1 border-b border-white/5 pb-1 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span className="font-bold font-mono text-[5px]">ROHIT_SEN.SYS</span>
          </div>
          <div className="space-y-1.5 flex-1 py-1">
            <div className="h-3 w-16 bg-white/5 rounded border border-white/5 flex items-center justify-center text-white/80 font-bold">AWS ARCHITECT</div>
            <p className="text-[4px] leading-tight text-white/40">Full structural cloud and document systems designed to scale recruiter workflows.</p>
          </div>
          <div className="w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-center py-0.5 rounded-[1px]">
            DOWNLOAD SYSTEM RESUME
          </div>
        </div>
      ),
    },
    {
      name: 'FUTURISTIC CINEMATIC',
      badge: 'SIGNATURE',
      tagline: 'Gravity. Ambient Glow. IMAX Motion.',
      bestFor: 'Founders, Startups, Premium Brands, AI Products',
      desc: 'Our flagship aesthetic. Void backgrounds, violet orbital rings, radial glowing matrices, responsive parallax scroll, and immersive storytelling environments.',
      icon: Layers,
      themeGlow: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.12) 0%, transparent 60%)',
      desktopPreview: (
        <div className="w-full h-full flex flex-col justify-center items-center bg-[#050816] border border-violet-500/20 rounded-md overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border border-violet-500 animate-spin-slow"></div>
            <div className="w-16 h-16 rounded-full border border-cyan-500 animate-spin-slower"></div>
          </div>
          <div className="relative z-10 flex flex-col items-center text-center gap-1.5 p-2">
            <span className="font-body text-[5px] tracking-[0.3em] text-cyan-400 font-bold uppercase">AI STARTUP INTERACTIVE</span>
            <h4 className="font-display font-black text-[9px] tracking-tight leading-none text-white max-w-xs uppercase">
              NEXT-GEN / SYSTEMS
            </h4>
            <div className="h-[1.5px] w-8 bg-gradient-to-r from-violet-500 to-cyan-400 rounded mt-0.5"></div>
            <p className="text-[5px] text-white/30 max-w-[120px] leading-relaxed mt-1">We engineer cognitive web assets that command perception grids.</p>
          </div>
          <div className="absolute bottom-2 left-2 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-violet-400 animate-pulse"></span>
            <span className="text-[4px] text-white/20 uppercase font-mono">SIGNAL_ACTIVE</span>
          </div>
        </div>
      ),
      mobilePreview: (
        <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#050816] border border-violet-500/25 rounded-lg overflow-hidden text-center text-[5px] relative">
          <div className="absolute inset-0 opacity-5 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border border-violet-500 animate-spin-slow"></div>
          </div>
          <span className="font-body text-[4px] tracking-[0.2em] text-cyan-400 font-bold uppercase mt-1">APEX_SYS</span>
          <div className="flex-1 flex flex-col items-center justify-center py-2 gap-1 relative z-10">
            <div className="w-6 h-6 rounded-full border border-violet-500/30 flex items-center justify-center bg-violet-500/5">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping"></div>
            </div>
            <span className="text-[5px] font-bold text-white uppercase">NEURAL INTERACTIVE</span>
          </div>
          <div className="bg-violet-600/10 border border-violet-500/20 text-violet-300 font-bold py-0.5 rounded-[1px]">
            ENTER CLOUD INTEL
          </div>
        </div>
      ),
    },
    {
      name: 'CREATOR MODE',
      badge: 'HIGH-FREQUENCY',
      tagline: 'Vibrant. Dynamic. Audience First.',
      bestFor: 'Creators, Influencers, YouTubers, Personal Brands',
      desc: 'Bold gradients, rapid interactive transitions, floating card layouts, social integrations, and high-impact media highlights designed to command and hold attention.',
      icon: Zap,
      themeGlow: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.1) 0%, transparent 60%)',
      desktopPreview: (
        <div className="w-full h-full flex flex-col justify-between p-3 bg-[#140b24] border border-pink-500/20 rounded-md overflow-hidden">
          <div className="flex items-center justify-between border-b border-pink-500/10 pb-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 flex items-center justify-center text-[5px] text-white font-bold font-mono">A</div>
              <span className="font-body text-[6px] tracking-wider text-pink-400 font-semibold">ANIKET_CREATOR</span>
            </div>
            <div className="px-1.5 py-0.5 bg-pink-500/10 text-pink-400 text-[4px] rounded font-bold uppercase tracking-widest">
              150K+ REACH
            </div>
          </div>
          {/* Image carousel mock */}
          <div className="grid grid-cols-3 gap-2 py-1.5">
            <div className="aspect-video bg-black/40 rounded border border-pink-500/10 flex flex-col justify-end p-1">
              <div className="h-1.5 w-6 bg-pink-500/40 rounded mb-0.5"></div>
              <div className="h-1 w-full bg-white/20 rounded"></div>
            </div>
            <div className="aspect-video bg-black/40 rounded border border-pink-500/10 flex flex-col justify-end p-1">
              <div className="h-1.5 w-6 bg-pink-500/40 rounded mb-0.5"></div>
              <div className="h-1 w-full bg-white/20 rounded"></div>
            </div>
            <div className="aspect-video bg-black/40 rounded border border-pink-500/10 flex flex-col justify-end p-1">
              <div className="h-1.5 w-6 bg-pink-500/40 rounded mb-0.5"></div>
              <div className="h-1 w-full bg-white/20 rounded"></div>
            </div>
          </div>
          <div className="flex justify-between items-center text-[5px] text-white/30 border-t border-pink-500/10 pt-1.5">
            <span>TOOLKIT: FIGMA, AFTER EFFECTS</span>
            <span className="text-pink-400 font-bold uppercase tracking-widest hover:underline cursor-pointer">YOUTUBE →</span>
          </div>
        </div>
      ),
      mobilePreview: (
        <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#140b24] border border-pink-500/25 rounded-lg overflow-hidden text-[5px] text-white/70">
          <div className="flex items-center gap-1.5 border-b border-pink-500/10 pb-1 mb-1">
            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 flex items-center justify-center text-[4px] font-bold">A</div>
            <span className="font-semibold font-mono text-[4px]">ANIKET.CREATIVE</span>
          </div>
          <div className="space-y-1.5 flex-1 py-1">
            <div className="w-full aspect-video bg-black/50 border border-pink-500/10 rounded flex items-center justify-center relative">
              <div className="w-3 h-3 rounded-full bg-pink-500/20 border border-pink-500/50 flex items-center justify-center">
                <Play className="w-1.5 h-1.5 fill-pink-400 text-pink-400" />
              </div>
            </div>
            <div className="h-1.5 w-12 bg-white/20 rounded"></div>
            <div className="h-1.5 w-16 bg-white/10 rounded"></div>
          </div>
          <div className="w-full bg-pink-500/15 border border-pink-500/30 text-pink-400 font-bold text-center py-0.5 rounded-[1px] uppercase tracking-widest text-[4px]">
            ACCESS DESIGN TOOLKIT
          </div>
        </div>
      ),
    },
    {
      name: 'MINIMAL ELITE',
      badge: 'LUXURY CLASS',
      tagline: 'Whisper, don\'t scream. Pure design.',
      bestFor: 'Researchers, Designers, Premium Personal Brands',
      desc: 'Generous white space, fine-lined borders, strict monochrome layouts, and elite typographic hierarchies. Built for those whose work demands absolute premium clarity.',
      icon: Compass,
      themeGlow: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.04) 0%, transparent 60%)',
      desktopPreview: (
        <div className="w-full h-full flex flex-col justify-between p-3.5 bg-[#0a0a0c] border border-white/10 rounded-md overflow-hidden font-mono text-white/80">
          <div className="flex justify-between items-center text-[5px] text-white/30 border-b border-white/5 pb-2">
            <span>KABIR_DESIGNS</span>
            <span>METADATA // 2026</span>
          </div>
          <div className="space-y-2 py-4">
            <h4 className="font-display font-light text-[10px] tracking-tight leading-tight text-white uppercase">
              REDEFINING BRAND IDENTITY FOR RESEARCH LABS.
            </h4>
            <div className="h-[0.5px] w-full bg-white/10"></div>
          </div>
          <div className="flex justify-between items-center text-[5px] text-white/40">
            <span>RESEARCHER PORTFOLIO</span>
            <span className="tracking-widest uppercase">CASE STUDY 01 &rarr;</span>
          </div>
        </div>
      ),
      mobilePreview: (
        <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#0a0a0c] border border-white/15 rounded-lg overflow-hidden text-[5px] font-mono text-white/60">
          <div className="flex justify-between items-center border-b border-white/5 pb-1 mb-1.5">
            <span>K.D</span>
            <span className="text-white/20">26/</span>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-2 py-2">
            <div className="h-4 w-full bg-white/5 border border-white/5 flex items-center px-1 font-display text-[6px] tracking-tighter text-white font-light uppercase">
              STUDIO PORTFOLIO
            </div>
            <p className="text-[4px] leading-tight text-white/30">Generous spacing, strict typography, extreme structural layout.</p>
          </div>
          <div className="border border-white/10 text-white font-medium text-center py-0.5 rounded-[1px] uppercase tracking-widest text-[4px]">
            VIEW CASE STUDY
          </div>
        </div>
      ),
    },
    {
      name: 'TECH ENGINEER',
      badge: 'HIGH-GRAVITY',
      tagline: 'Terminal Aesthetics. Matrix Grids.',
      bestFor: 'Developers, AI Engineers, Hackathon Builders',
      desc: 'Grid architectures, monospace terminal blocks, live git status styling, active terminal blocks, and custom keyboard interaction cues. Raw technological gravity.',
      icon: Terminal,
      themeGlow: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.1) 0%, transparent 60%)',
      desktopPreview: (
        <div className="w-full h-full flex flex-col p-3 bg-[#020617] border border-cyan-500/20 rounded-md font-mono text-[5.5px] text-cyan-400 overflow-hidden">
          <div className="flex items-center gap-1 border-b border-cyan-500/10 pb-1.5 mb-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/80"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></div>
            <span className="text-[5px] text-cyan-500/40 ml-1.5 uppercase font-bold tracking-wider">BASH - DEPLOY_PORTFOLIO.SH</span>
          </div>
          <div className="space-y-1">
            <p className="text-cyan-400">$ git clone https://github.com/mugi/system.git</p>
            <p className="text-white/40">&gt; unpacking repository items...</p>
            <p className="text-emerald-400 font-bold">✓ 38 artifacts unpacked. git status: [ACTIVE]</p>
            <p className="text-cyan-400">$ node server.js --port 3000</p>
            <p className="text-yellow-400">&gt;&gt; server loaded at port:3000</p>
          </div>
        </div>
      ),
      mobilePreview: (
        <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#020617] border border-cyan-500/25 rounded-lg overflow-hidden text-[4.5px] font-mono text-cyan-400">
          <div className="flex items-center gap-1 border-b border-cyan-500/10 pb-1.5 mb-1.5">
            <div className="w-1 h-1 rounded-full bg-cyan-400 animate-ping"></div>
            <span className="text-[4px] font-bold">MUGI_DEV.CONSOLE</span>
          </div>
          <div className="space-y-1.5 flex-1 py-1">
            <p className="text-white/60">$ node -v</p>
            <p className="text-cyan-300">v18.16.0</p>
            <p className="text-white/60">$ npm run build</p>
            <p className="text-emerald-400 font-bold">✓ built in 140ms</p>
          </div>
          <div className="w-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold text-center py-0.5 rounded-[1px] uppercase text-[4px] tracking-widest">
            LAUNCH LOCALHOST
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="signals"
      className="relative py-28 bg-void grain border-bottom-subtle overflow-hidden"
    >
      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.02) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="section-label mb-3 block">Design Matrix</span>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white tracking-tight uppercase leading-none">
            EVERY SIGNAL TELLS <span className="text-grad-violet">A DIFFERENT STORY.</span>
          </h2>
          <p className="font-body font-light text-muted-cin text-sm md:text-base max-w-2xl mx-auto mt-6">
            We don't build generic templates. Select a design archetype as your foundation. Toggle between desktop and mobile previews, test them live, and watch your visual strategy take shape.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {archetypes.map((arch, i) => (
            <ArchetypeCard key={arch.name} arch={arch} index={i} />
          ))}

          {/* Archetype 6: Special Custom Customization CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="card-imax p-6 rounded-xl flex flex-col justify-between group h-full border-active"
            style={{
              background: 'linear-gradient(180deg, rgba(124,58,237,0.06) 0%, rgba(8,13,26,0.95) 100%)',
            }}
          >
            {/* Custom glowing matrix */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 90% 90%, rgba(6, 182, 212, 0.15), transparent 60%)',
              }}
            />

            <div>
              {/* CSS Art - Hologram Question Mark */}
              <div className="relative w-full aspect-[16/10] bg-black/40 rounded-lg border border-violet-500/20 overflow-hidden mb-6 flex items-center justify-center">
                <div className="absolute w-24 h-24 rounded-full border border-violet-500/10 animate-ping"></div>
                <ShieldAlert className="w-10 h-10 text-violet-400 animate-pulse glow-violet-text" />
              </div>

              {/* Title & Tagline */}
              <span className="font-body text-[8px] font-bold tracking-[0.2em] text-cyan-400 border border-cyan-500/25 px-2 py-0.5 rounded-sm mb-4 inline-block">
                BESPOKE SIGNALS
              </span>
              <h3 className="font-display font-extrabold text-lg md:text-xl text-white tracking-tight uppercase group-hover:text-grad-white transition-colors duration-300">
                CUSTOM SIGNAL
              </h3>
              <p className="font-body font-medium text-xs text-cyan-400/80 tracking-wide mt-1.5 mb-3 italic">
                "Zero constraints. Pure imagination."
              </p>
              <p className="font-body font-light text-muted-cin text-xs leading-relaxed mb-6">
                Have a completely distinct vision? An architectural aesthetic you saw somewhere, or an entirely custom motion system? We will design and engineer a world-class presence from absolute scratch.
              </p>
            </div>

            <motion.a
              href="https://wa.me/+918778848565?text=Hi%20Anvora,%20I%20have%20a%20custom%20vision%20I%20want%20to%20engineer%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.98 }}
              onClick={() => audioEngine.playClick()}
              onMouseEnter={() => audioEngine.playHover()}
              className="w-full btn-whatsapp flex items-center justify-center gap-3 py-3 rounded text-center"
            >
              <span>ENGINEER CUSTOM SYSTEM</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Embedded CSS animation for scanning laser line */}
      <style>{`
        @keyframes scan-v {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};
