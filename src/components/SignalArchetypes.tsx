import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, ShieldAlert, Zap, Compass, Cpu, Layers, ArrowUpRight, 
  Monitor, Smartphone, Play, Radio, Palette, Database, TrendingUp, 
  Award, Activity, FileText, Youtube, Instagram, Code, LineChart, Sliders,
  ChevronDown
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface ArchetypeExample {
  id: string;
  label: string;
  simulationText: string;
  desktopPreview: React.ReactNode;
  mobilePreview: React.ReactNode;
}

interface Archetype {
  name: string;
  badge: string;
  tagline: string;
  bestFor: string;
  desc: string;
  icon: React.ComponentType<any>;
  themeGlow: string;
  examples: ArchetypeExample[];
}

interface ArchetypeCardProps {
  arch: Archetype;
  index: number;
  isExpanded: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const ArchetypeCard: React.FC<ArchetypeCardProps> = ({ 
  arch, 
  index, 
  isExpanded, 
  onMouseEnter, 
  onMouseLeave, 
  onClick 
}) => {
  const [activeExampleId, setActiveExampleId] = useState(arch.examples[0].id);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isSimulating, setIsSimulating] = useState(false);
  const Icon = arch.icon;

  const currentExample = arch.examples.find((ex) => ex.id === activeExampleId) || arch.examples[0];

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
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`card-imax p-6 rounded-xl flex flex-col group justify-between relative overflow-hidden cursor-pointer transition-all duration-300 ${
        isExpanded ? 'border-violet-500/50 glow-violet shadow-[0_0_30px_rgba(139,92,246,0.1)] z-20' : 'border border-white/5 opacity-85 hover:opacity-100'
      }`}
      style={{
        background: 'linear-gradient(180deg, rgba(19,25,41,0.7) 0%, rgba(8,13,26,0.85) 100%)',
      }}
    >
      {/* Theme Glow Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: arch.themeGlow }}
      />

      <div className="relative z-10 w-full">
        {/* Badges & Meta */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-body text-[8px] font-bold tracking-[0.2em] text-violet-soft border border-violet-500/25 px-2 py-0.5 rounded-sm">
            {arch.badge}
          </span>
          <span className="font-body text-[8px] tracking-[0.15em] text-dim-cin font-semibold">
            ARCHETYPE 0{index + 1}
          </span>
        </div>

        {/* Header with Icon */}
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg text-violet-400 group-hover:text-white transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-base md:text-lg text-white tracking-tight uppercase group-hover:text-grad-white transition-colors duration-300">
              {arch.name}
            </h3>
            <p className="font-body font-medium text-[11px] text-white/60 tracking-wide mt-0.5 italic">
              "{arch.tagline}"
            </p>
          </div>
        </div>

        {/* Interactive toggle instruction */}
        <div className="flex items-center justify-between text-[8px] font-mono text-violet-400/80 mb-4 bg-violet-500/5 py-2 px-3 rounded border border-violet-500/10">
          <span>{isExpanded ? '[ CLICK TO COLLAPSE ]' : '[ CLICK OR HOVER TO REVEAL PREVIEW ]'}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-violet-400' : 'animate-bounce'}`} />
        </div>

        {/* Expandable Preview & Details Area */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden w-full"
            >
              {/* Visual Miniature Preview Panel */}
              <div className="relative w-full aspect-[16/10] bg-black/50 rounded-lg border border-[rgba(255,255,255,0.06)] overflow-hidden mb-5 mt-2">
                
                {/* Example Switcher Tabs at the top */}
                <div className="absolute top-2 left-2 right-2 flex gap-1 z-30 overflow-x-auto scrollbar-none pb-1">
                  {arch.examples.map((ex) => (
                    <button
                      key={ex.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveExampleId(ex.id);
                        audioEngine.playClick();
                      }}
                      className={`px-2 py-0.5 rounded-[2px] text-[7px] font-mono tracking-wider transition-all uppercase border whitespace-nowrap ${
                        activeExampleId === ex.id
                          ? 'bg-violet-500/25 border-violet-500/50 text-white'
                          : 'bg-black/60 border-white/5 text-white/40 hover:text-white/80'
                      }`}
                    >
                      {ex.label}
                    </button>
                  ))}
                </div>

                {/* Draggable/Toggled view wrapper */}
                <div className="absolute inset-0 p-3 pt-9">
                  <AnimatePresence mode="wait">
                    {viewMode === 'desktop' ? (
                      <motion.div
                        key={`${activeExampleId}-desktop`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full relative"
                      >
                        {currentExample.desktopPreview}
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`${activeExampleId}-mobile`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full flex items-center justify-center relative"
                      >
                        {currentExample.mobilePreview}
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
                      {currentExample.simulationText}
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
                    <Monitor className="w-3.5 h-3.5" />
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
                    <Smartphone className="w-3.5 h-3.5" />
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

              {/* Description */}
              <p className="font-body font-light text-muted-cin text-xs leading-relaxed mb-4">
                {arch.desc}
              </p>

              {/* Best For Info */}
              <div className="border-t border-white/5 pt-3 mb-6">
                <span className="font-body text-[8px] tracking-[0.1em] text-dim-cin uppercase block mb-1">
                  Best Suited For:
                </span>
                <span className="font-body text-xs text-white/80 font-medium">
                  {arch.bestFor}
                </span>
              </div>

              {/* Explore button */}
              <motion.a
                href={`https://wa.me/+918778848565?text=Hi%20Anvora,%20I'm%20interested%20in%20the%20${encodeURIComponent(arch.name)}%20visual%20direction%20for%20a%20${encodeURIComponent(currentExample.label)}.`}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  audioEngine.playClick();
                }}
                onMouseEnter={() => audioEngine.playHover()}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 group/btn"
              >
                <span className="font-body text-[9px] tracking-[0.2em] text-white/50 group-hover/btn:text-white transition-colors">
                  EXPLORE DIRECTION ({currentExample.label})
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover/btn:text-white transition-colors" />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const SignalArchetypes: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const archetypes: Archetype[] = [
    {
      name: 'CORPORATE AUTHORITY',
      badge: 'ELITE PRO',
      tagline: 'Precision. Authority. Structure.',
      bestFor: 'Placement Students, Consultants, Professionals',
      desc: 'Deep navy palettes, perfectly ordered grids, heavy typography, and clinical structure. Designed with experience timelines and credentials to establish maximum recruiter trust.',
      icon: Compass,
      themeGlow: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 60%)',
      examples: [
        {
          id: 'student',
          label: 'Placement Student',
          simulationText: 'COMPILING CREDENTIALS TIMELINE...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col justify-between p-3 bg-[#0a1128] border border-emerald-500/20 rounded-md overflow-hidden font-sans text-white/80">
              <div className="flex items-center justify-between border-b border-emerald-500/10 pb-1.5">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span className="font-mono text-[6px] tracking-wider text-emerald-400 font-bold">ROHIT_SEN_SYSTEM</span>
                </div>
                <div className="flex gap-2 text-[5px] tracking-widest text-white/40 uppercase font-mono">
                  <span>Resume</span>
                  <span>Certs</span>
                </div>
              </div>
              <div className="space-y-1.5 py-1">
                <span className="text-[5px] tracking-widest text-emerald-400 font-bold uppercase font-mono">EXPERIENCE TIMELINE:</span>
                <div className="border-l border-emerald-500/20 pl-2 space-y-1">
                  <div className="relative">
                    <div className="absolute -left-[11px] top-1 w-1 h-1 rounded-full bg-emerald-400 border border-[#0a1128]"></div>
                    <div className="text-[6px] font-bold text-white leading-none">R&amp;D Software Engineer @ Apex Corp</div>
                    <div className="text-[4px] text-white/40 font-mono">2024 - Present · Systems Design</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-emerald-500/10 pt-1.5 text-[5px] text-white/30">
                <span>CERT: AWS CLOUD ARCHITECT</span>
                <span className="px-1 py-0.2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-[2px] font-bold font-mono">VERIFIED</span>
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#0a1128] border border-emerald-500/25 rounded-lg overflow-hidden text-[5px] text-white/70">
              <div className="flex items-center gap-1 border-b border-white/5 pb-1 mb-1">
                <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                <span className="font-bold font-mono text-[5px]">ROHIT_SEN.SYS</span>
              </div>
              <div className="space-y-1 flex-1 py-0.5">
                <div className="h-3 w-16 bg-white/5 rounded border border-white/5 flex items-center justify-center text-white/80 font-bold font-mono text-[4.5px]">AWS ARCHITECT</div>
                <p className="text-[4px] leading-tight text-white/40">Full structural cloud and document systems designed to scale recruiter workflows.</p>
              </div>
              <div className="w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-center py-0.5 rounded-[1px] text-[4.5px] font-mono">
                DOWNLOAD SYSTEM
              </div>
            </div>
          )
        },
        {
          id: 'consultant',
          label: 'Consultant',
          simulationText: 'AUDITING CONVERSION METRICS...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col justify-between p-3 bg-[#0f172a] border border-emerald-500/20 rounded-md overflow-hidden font-sans text-white/80">
              <div className="flex items-center justify-between border-b border-emerald-500/10 pb-1.5">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 text-emerald-400" />
                  <span className="font-mono text-[6px] tracking-wider text-white font-bold">JENKINS_STRATEGY</span>
                </div>
                <span className="text-[5px] text-emerald-400 font-mono">KPI AUDIT: ONLINE</span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-1">
                <div className="bg-white/5 border border-white/5 rounded p-1">
                  <span className="text-[4px] text-white/40 block">CLIENT GROWTH</span>
                  <span className="text-[8px] font-bold text-emerald-400">+48.2%</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded p-1">
                  <span className="text-[4px] text-white/40 block">SYSTEMS AUDIT</span>
                  <span className="text-[8px] font-bold text-white">COMPLETE</span>
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-emerald-500/10 pt-1.5 text-[5px] text-white/30">
                <span>SECTOR: MID-MARKET M&amp;A</span>
                <span className="text-emerald-400 font-bold font-mono">12+ CASE STUDIES</span>
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#0f172a] border border-emerald-500/25 rounded-lg overflow-hidden text-[5px] text-white/70">
              <div className="flex items-center gap-1 border-b border-white/5 pb-1">
                <TrendingUp className="w-2 h-2 text-emerald-400" />
                <span className="font-bold font-mono text-[4.5px]">JENKINS.SYS</span>
              </div>
              <div className="flex-1 py-1 space-y-1">
                <div className="text-[6px] font-bold text-emerald-400 leading-none">+48.2% SCALE</div>
                <p className="text-[3.8px] leading-tight text-white/40">Architecting scalable operational strategies for founders.</p>
              </div>
              <div className="w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-center py-0.5 rounded-[1px] text-[4.5px] font-mono">
                REQUEST AUDIT
              </div>
            </div>
          )
        },
        {
          id: 'professional',
          label: 'Professional',
          simulationText: 'VERIFYING MEDICAL BOARD RECORD...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col justify-between p-3 bg-[#111827] border border-emerald-500/20 rounded-md overflow-hidden font-sans text-white/80">
              <div className="flex items-center justify-between border-b border-emerald-500/10 pb-1.5">
                <div className="flex items-center gap-1">
                  <Award className="w-2.5 h-2.5 text-emerald-400" />
                  <span className="font-mono text-[6px] tracking-wider text-white font-bold">DR_MEHTA_CLINICAL</span>
                </div>
                <span className="text-[5px] text-white/30 font-mono">V4.6</span>
              </div>
              <div className="space-y-1.5 py-1">
                <div className="text-[7px] font-bold text-white">Board Certified Director @ Metro Health</div>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-white/5 border border-white/5 rounded-[2px] px-1 text-[4px] text-white/50">ONCOLOGY</span>
                  <span className="bg-white/5 border border-white/5 rounded-[2px] px-1 text-[4px] text-white/50">RESEARCH</span>
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-emerald-500/10 pt-1.5 text-[5px] text-white/30">
                <span>LIC# 2489-A2</span>
                <span className="text-emerald-400 font-bold font-mono">✓ BOARD VERIFIED</span>
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#111827] border border-emerald-500/25 rounded-lg overflow-hidden text-[5px] text-white/70">
              <div className="flex items-center justify-between border-b border-white/5 pb-1">
                <span className="font-bold font-mono text-[4.5px]">DR. MEHTA</span>
                <span className="text-[4px] text-emerald-400">BOARD PASS</span>
              </div>
              <div className="flex-1 py-1.5 space-y-1">
                <p className="text-[4px] leading-tight text-white/40">Clinical records, academic board credentials and publications timeline.</p>
              </div>
              <div className="w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-center py-0.5 rounded-[1px] text-[4.5px] font-mono">
                VERIFY CREDENTIALS
              </div>
            </div>
          )
        }
      ]
    },
    {
      name: 'FUTURISTIC CINEMATIC',
      badge: 'SIGNATURE',
      tagline: 'Gravity. Ambient Glow. IMAX Motion.',
      bestFor: 'Founders, Startups, Premium Brands, AI Products',
      desc: 'Our flagship aesthetic. Void backgrounds, violet orbital rings, radial glowing matrices, responsive parallax scroll, and immersive storytelling environments.',
      icon: Layers,
      themeGlow: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.12) 0%, transparent 60%)',
      examples: [
        {
          id: 'startup',
          label: 'Founder / Startup',
          simulationText: 'LAUNCHING NEURAL STARTUP SITE...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col justify-center items-center bg-[#050816] border border-violet-500/20 rounded-md overflow-hidden relative">
              <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full border border-violet-500 animate-spin-slow"></div>
                <div className="w-12 h-12 rounded-full border border-cyan-500 animate-spin-slower"></div>
              </div>
              <div className="relative z-10 flex flex-col items-center text-center gap-1 p-2">
                <span className="font-body text-[5px] tracking-[0.3em] text-cyan-400 font-bold uppercase">AI STARTUP INTERACTIVE</span>
                <h4 className="font-display font-black text-[8px] tracking-tight leading-none text-white uppercase">
                  NEXUS_SYSTEMS
                </h4>
                <p className="text-[4.5px] text-white/30 max-w-[120px] leading-relaxed mt-0.5">We engineer cognitive web assets that command perception grids.</p>
              </div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-violet-400 animate-pulse"></span>
                <span className="text-[4px] text-white/20 uppercase font-mono">SIGNAL_ACTIVE</span>
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#050816] border border-violet-500/25 rounded-lg overflow-hidden text-center text-[5px] relative">
              <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full border border-violet-500 animate-spin-slow"></div>
              </div>
              <span className="font-body text-[4px] tracking-[0.2em] text-cyan-400 font-bold uppercase">APEX_SYS</span>
              <div className="flex-1 flex flex-col items-center justify-center py-1 gap-1 relative z-10">
                <div className="w-5 h-5 rounded-full border border-violet-500/30 flex items-center justify-center bg-violet-500/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping"></div>
                </div>
                <span className="text-[4.5px] font-bold text-white uppercase">NEURAL INTERACTIVE</span>
              </div>
              <div className="bg-violet-600/10 border border-violet-500/20 text-violet-300 font-bold py-0.5 rounded-[1px] font-mono text-[4px]">
                ENTER INTEL
              </div>
            </div>
          )
        },
        {
          id: 'brand',
          label: 'Premium Brand',
          simulationText: 'CALIBRATING KRONOS SECOND SWEEP...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col justify-between p-3.5 bg-[#050505] border border-violet-500/20 rounded-md overflow-hidden relative">
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-20 h-20 border border-white/5 rounded-full flex items-center justify-center">
                {/* Radial Clock Bezel Mock */}
                <div className="w-14 h-14 border border-violet-500/20 rounded-full flex items-center justify-center">
                  <div className="w-[1px] h-6 bg-gradient-to-t from-transparent to-violet-400 origin-bottom transform rotate-[45deg] animate-spin" style={{ animationDuration: '6s' }} />
                </div>
              </div>
              <div className="relative z-10 max-w-[90px] space-y-1">
                <span className="text-[4px] text-white/30 uppercase tracking-widest block font-mono">SERIES VIII</span>
                <div className="text-[8px] font-bold text-white uppercase leading-none">KRONOS TIMEPIECE</div>
                <p className="text-[4px] text-white/40 leading-normal">Mechanical precision engineered with IMAX visual motion.</p>
              </div>
              <div className="text-[4.5px] text-white/20 font-mono">
                COORDINATES: SWEEP 4.2Hz
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#050505] border border-violet-500/25 rounded-lg overflow-hidden text-[5px] relative">
              <div className="flex-1 flex flex-col items-center justify-center gap-1.5">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center relative">
                  <div className="absolute inset-1 border border-violet-500/25 rounded-full"></div>
                  <div className="w-0.5 h-4 bg-violet-400 origin-bottom transform rotate-[90deg]"></div>
                </div>
                <span className="text-[5px] font-bold text-white uppercase tracking-wider">KRONOS CHRONO</span>
              </div>
              <div className="w-full bg-white/5 border border-white/10 text-white font-bold text-center py-0.5 rounded-[1px] font-mono text-[4px] tracking-wider">
                RESERVE TIMEPIECE
              </div>
            </div>
          )
        },
        {
          id: 'aiproduct',
          label: 'AI Product',
          simulationText: 'EXECUTING COGNITIVE FLOW PATH...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col justify-between p-3 bg-[#0c0d19] border border-violet-500/20 rounded-md overflow-hidden relative">
              <div className="flex justify-between items-center border-b border-violet-500/10 pb-1.5">
                <span className="font-mono text-[5px] text-violet-300 font-bold uppercase tracking-wider">VERIFY_AI_SPOTLIGHT</span>
                <span className="text-[4.5px] text-emerald-400 font-mono">SECURE</span>
              </div>
              <div className="py-2 space-y-1.5">
                <div className="flex justify-between items-center text-[5px] text-white/50 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                  <span>DOCUMENT SCHEMA CHECK</span>
                  <span className="text-emerald-400 font-bold">100% VALID</span>
                </div>
                <div className="flex justify-between items-center text-[5px] text-white/50 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                  <span>COGNITIVE SIGNATURE</span>
                  <span className="text-violet-400 font-bold">VERIFIED</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-[5px] text-white/30 font-mono">
                <span>NEURAL FLOW INTEGRITY</span>
                <span className="text-white/80 font-bold">SCORE: 99.8%</span>
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#0c0d19] border border-violet-500/25 rounded-lg overflow-hidden text-[5px]">
              <div className="flex justify-between items-center border-b border-white/5 pb-1">
                <span className="font-bold font-mono text-[4.5px]">V_AI.SYS</span>
                <span className="text-[4.5px] text-violet-400 animate-pulse">SCANNING</span>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center gap-1.5 py-1">
                <Activity className="w-5 h-5 text-violet-400 animate-pulse" />
                <span className="text-[4.5px] font-bold text-white/80 uppercase">VERIFICATION ENGINE</span>
              </div>
              <div className="w-full bg-violet-600/15 border border-violet-500/30 text-violet-300 font-bold text-center py-0.5 rounded-[1px] text-[4px] font-mono">
                VALIDATE CERTIFICATE
              </div>
            </div>
          )
        }
      ]
    },
    {
      name: 'CREATOR MODE',
      badge: 'HIGH-FREQUENCY',
      tagline: 'Vibrant. Dynamic. Audience First.',
      bestFor: 'Creators, Influencers, YouTubers, Personal Brands',
      desc: 'Bold gradients, rapid interactive transitions, floating card layouts, social integrations, and high-impact media highlights designed to command and hold attention.',
      icon: Zap,
      themeGlow: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.1) 0%, transparent 60%)',
      examples: [
        {
          id: 'creator',
          label: 'Creator Portfolio',
          simulationText: 'SYNCING YOUTUBE CONTENT GRAPH...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col justify-between p-3 bg-[#140b24] border border-pink-500/20 rounded-md overflow-hidden font-sans text-white/80">
              <div className="flex items-center justify-between border-b border-pink-500/10 pb-1.5">
                <div className="flex items-center gap-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 flex items-center justify-center text-[4.5px] text-white font-bold font-mono">A</div>
                  <span className="font-body text-[5.5px] tracking-wider text-pink-400 font-semibold">ANIKET_CREATOR</span>
                </div>
                <div className="px-1.5 py-0.5 bg-pink-500/10 text-pink-400 text-[4px] rounded font-bold uppercase tracking-widest font-mono">
                  150K+ REACH
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5 py-1.5">
                <div className="aspect-video bg-black/40 rounded border border-pink-500/10 flex flex-col justify-end p-0.5">
                  <div className="h-1 w-4 bg-pink-500/40 rounded mb-0.5"></div>
                  <div className="h-0.8 w-full bg-white/20 rounded"></div>
                </div>
                <div className="aspect-video bg-black/40 rounded border border-pink-500/10 flex flex-col justify-end p-0.5">
                  <div className="h-1 w-4 bg-pink-500/40 rounded mb-0.5"></div>
                  <div className="h-0.8 w-full bg-white/20 rounded"></div>
                </div>
                <div className="aspect-video bg-black/40 rounded border border-pink-500/10 flex flex-col justify-end p-0.5">
                  <div className="h-1 w-4 bg-pink-500/40 rounded mb-0.5"></div>
                  <div className="h-0.8 w-full bg-white/20 rounded"></div>
                </div>
              </div>
              <div className="flex justify-between items-center text-[5px] text-white/30 border-t border-pink-500/10 pt-1.5 font-mono">
                <span>TOOLKIT: FIGMA &amp; PREMIERE</span>
                <span className="text-pink-400 font-bold uppercase tracking-widest">YOUTUBE &rarr;</span>
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#140b24] border border-pink-500/25 rounded-lg overflow-hidden text-[5px] text-white/70">
              <div className="flex items-center gap-1.5 border-b border-pink-500/10 pb-1 mb-1">
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 flex items-center justify-center text-[4px] font-bold">A</div>
                <span className="font-semibold font-mono text-[4px]">ANIKET.CREATIVE</span>
              </div>
              <div className="space-y-1 flex-1 py-1">
                <div className="w-full aspect-video bg-black/50 border border-pink-500/10 rounded flex items-center justify-center relative">
                  <div className="w-3 h-3 rounded-full bg-pink-500/20 border border-pink-500/50 flex items-center justify-center">
                    <Play className="w-1.5 h-1.5 fill-pink-400 text-pink-400" />
                  </div>
                </div>
                <div className="h-1.5 w-12 bg-white/20 rounded"></div>
              </div>
              <div className="w-full bg-pink-500/15 border border-pink-500/30 text-pink-400 font-bold text-center py-0.5 rounded-[1px] uppercase tracking-widest text-[4px] font-mono">
                PORTFOLIO
              </div>
            </div>
          )
        },
        {
          id: 'influencer',
          label: 'Influencer Hub',
          simulationText: 'LOADING INSTAGRAM LIVE STYLES...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col justify-between p-3 bg-[#1e1124] border border-pink-500/20 rounded-md overflow-hidden font-sans text-white/80">
              <div className="flex items-center justify-between border-b border-pink-500/10 pb-1.5">
                <div className="flex items-center gap-1">
                  <Instagram className="w-2.5 h-2.5 text-pink-400" />
                  <span className="font-mono text-[5.5px] text-white font-semibold">ESTRELLA_STUDIO</span>
                </div>
                <span className="text-[4px] text-pink-300 bg-pink-500/10 px-1 rounded uppercase font-mono">ACTIVE COLLABS</span>
              </div>
              <div className="grid grid-cols-4 gap-1 py-2">
                <div className="aspect-square bg-pink-900/20 border border-pink-500/10 rounded"></div>
                <div className="aspect-square bg-pink-900/20 border border-pink-500/10 rounded"></div>
                <div className="aspect-square bg-pink-900/20 border border-pink-500/10 rounded"></div>
                <div className="aspect-square bg-pink-900/20 border border-pink-500/10 rounded"></div>
              </div>
              <div className="flex justify-between items-center text-[5px] text-white/30 border-t border-pink-500/10 pt-1.5 font-mono">
                <span>SYNC STATE: ACTIVE</span>
                <span className="text-pink-400 font-bold">EXPLORE LOOKS</span>
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#1e1124] border border-pink-500/25 rounded-lg overflow-hidden text-[5px] text-white/70">
              <div className="flex justify-between items-center border-b border-pink-500/10 pb-1">
                <span className="font-mono text-[4.5px]">ESTRELLA.SYS</span>
                <Instagram className="w-2.5 h-2.5 text-pink-400" />
              </div>
              <div className="flex-1 py-1.5 space-y-1">
                <div className="h-5 w-full bg-white/5 border border-white/5 rounded flex items-center justify-center text-[4.5px] text-white/80 font-bold font-mono">SUMMER COLLECTION</div>
                <p className="text-[3.8px] leading-tight text-white/30">Swipeable design looks, interactive fashion catalogs.</p>
              </div>
              <div className="w-full bg-pink-500/15 border border-pink-500/30 text-pink-400 font-bold text-center py-0.5 rounded-[1px] text-[4px] font-mono">
                SHOP COLLECTIONS
              </div>
            </div>
          )
        },
        {
          id: 'youtuber',
          label: 'YouTuber Media',
          simulationText: 'CONNECTING TWITCH STREAM...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col justify-between p-3 bg-[#180b1e] border border-pink-500/20 rounded-md overflow-hidden">
              <div className="flex items-center justify-between border-b border-pink-500/10 pb-1.5">
                <div className="flex items-center gap-1">
                  <Youtube className="w-3 h-3 text-pink-400" />
                  <span className="font-mono text-[6px] tracking-wider text-white font-bold">CRITIC_LIVE</span>
                </div>
                <span className="text-[5px] text-pink-400 font-mono bg-pink-500/15 px-1 py-0.2 rounded uppercase animate-pulse">STREAM ONLINE</span>
              </div>
              <div className="space-y-1.5 py-1.5">
                <div className="h-6 w-full bg-black/50 border border-pink-500/10 rounded flex items-center justify-between px-2 text-[5px]">
                  <span className="text-white/60 font-mono">CURRENTLY PLAYING: BUILD REVIEW</span>
                  <span className="text-pink-400 font-bold font-mono">1.2K WATCHING</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-[5px] text-white/30 border-t border-pink-500/10 pt-1.5 font-mono">
                <span>SUBS: 240K+</span>
                <span className="text-pink-400 font-bold uppercase tracking-widest">SUBSCRIBE &rarr;</span>
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#180b1e] border border-pink-500/25 rounded-lg overflow-hidden text-[5px] text-white/70">
              <div className="flex justify-between items-center border-b border-pink-500/10 pb-1">
                <span className="font-bold font-mono text-[4.5px]">CRITIC.SYS</span>
                <Youtube className="w-2.5 h-2.5 text-pink-400" />
              </div>
              <div className="flex-1 py-2 flex flex-col justify-center gap-1">
                <div className="h-6 w-full bg-black/60 rounded flex items-center justify-center text-[4px] font-bold text-pink-400 animate-pulse">LIVE VIDEO</div>
                <div className="h-1.5 w-14 bg-white/20 rounded"></div>
              </div>
              <div className="w-full bg-pink-500/15 border border-pink-500/30 text-pink-400 font-bold text-center py-0.5 rounded-[1px] text-[4.5px] font-mono">
                WATCH STREAM
              </div>
            </div>
          )
        }
      ]
    },
    {
      name: 'MINIMAL ELITE',
      badge: 'LUXURY CLASS',
      tagline: 'Whisper, don\'t scream. Pure design.',
      bestFor: 'Researchers, Designers, Premium Personal Brands',
      desc: 'Generous white space, fine-lined borders, strict monochrome layouts, and elite typographic hierarchies. Built for those whose work demands absolute premium clarity.',
      icon: Compass,
      themeGlow: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.04) 0%, transparent 60%)',
      examples: [
        {
          id: 'researcher',
          label: 'Researcher Index',
          simulationText: 'INDEXING RESEARCH ARCHIVE...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col justify-between p-3.5 bg-[#0a0a0c] border border-white/10 rounded-md overflow-hidden font-mono text-white/80">
              <div className="flex justify-between items-center text-[5px] text-white/30 border-b border-white/5 pb-2">
                <span>DR_ALICE_LABS</span>
                <span>METADATA // 2026</span>
              </div>
              <div className="space-y-1 py-1.5">
                <span className="text-[4px] text-white/20 block uppercase tracking-widest font-mono">PUBLICATIONS INDEX</span>
                <div className="space-y-0.8 text-[5px] leading-tight text-white/70">
                  <p>01/ QUANTUM PERCEPTION SCALES.PDF</p>
                  <p>02/ NEURAL SYSTEMS GRIDS AND BRAND.PDF</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-[5px] text-white/40 border-t border-white/5 pt-1.5">
                <span>DOCUMENTS: 8 ARCHIVES</span>
                <span className="tracking-widest uppercase text-white/80">INDEX &rarr;</span>
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#0a0a0c] border border-white/15 rounded-lg overflow-hidden text-[5px] font-mono text-white/60">
              <div className="flex justify-between items-center border-b border-white/5 pb-1 mb-1">
                <span>DR. A</span>
                <span className="text-white/20">26/</span>
              </div>
              <div className="flex-1 py-1.5 space-y-1">
                <div className="h-4 w-full bg-white/5 border border-white/5 flex items-center px-1 font-display text-[5.5px] tracking-tighter text-white font-light uppercase">
                  PUBLICATIONS ARCHIVE
                </div>
                <p className="text-[3.8px] leading-tight text-white/30">Index of academic quantum structures and digital perceptions.</p>
              </div>
              <div className="border border-white/10 text-white font-medium text-center py-0.5 rounded-[1px] uppercase tracking-widest text-[4px]">
                DOWNLOAD PDF
              </div>
            </div>
          )
        },
        {
          id: 'designer',
          label: 'Designer Portfolio',
          simulationText: 'STRUCTURING GRID ALIGNMENTS...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col justify-between p-3.5 bg-[#050505] border border-white/10 rounded-md overflow-hidden font-mono text-white/80">
              <div className="flex justify-between items-center text-[5px] text-white/30 border-b border-white/5 pb-2">
                <span>KABIR_ARCHITECTURE</span>
                <span>TOKYO // NEW YORK</span>
              </div>
              <div className="space-y-1 py-2">
                <h4 className="font-display font-light text-[9px] tracking-tight leading-tight text-white uppercase">
                  REDEFINING BRAND IDENTITY FOR COGNITIVE LABS.
                </h4>
                <div className="h-[0.5px] w-full bg-white/10"></div>
              </div>
              <div className="flex justify-between items-center text-[5px] text-white/40">
                <span>DESIGN WORKSPACE</span>
                <span className="tracking-widest uppercase text-white/80">CASE STUDY 01 &rarr;</span>
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#050505] border border-white/15 rounded-lg overflow-hidden text-[5px] font-mono text-white/60">
              <div className="flex justify-between items-center border-b border-white/5 pb-1 mb-1">
                <span>K.D</span>
                <span className="text-white/20">26/</span>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-1.5 py-1">
                <div className="h-4 w-full bg-white/5 border border-white/5 flex items-center px-1 font-display text-[6px] tracking-tighter text-white font-light uppercase">
                  STUDIO WORK
                </div>
                <p className="text-[3.8px] leading-tight text-white/30">Generous spacing, strict typography, extreme structural layout.</p>
              </div>
              <div className="border border-white/10 text-white font-medium text-center py-0.5 rounded-[1px] uppercase tracking-widest text-[4px]">
                VIEW CASE STUDY
              </div>
            </div>
          )
        },
        {
          id: 'brandbrand',
          label: 'Personal Brand',
          simulationText: 'CALCULATING FUND PERFORMANCE...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col justify-between p-3.5 bg-[#0e0e0e] border border-white/10 rounded-md overflow-hidden font-mono text-white/80">
              <div className="flex justify-between items-center text-[5px] text-white/30 border-b border-white/5 pb-2">
                <span>AURELIA_PARTNERS</span>
                <span>ASSET MANAGEMENT</span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-1">
                <div>
                  <span className="text-[4px] text-white/30 block">PORTFOLIO AUM</span>
                  <span className="text-[8px] font-light text-white font-sans">$240.2M</span>
                </div>
                <div>
                  <span className="text-[4px] text-white/30 block">NET ANNUALLY</span>
                  <span className="text-[8px] font-light text-white font-sans">+22.4%</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-[5px] text-white/40 border-t border-white/5 pt-1.5">
                <span>PARTNER INQUIRY</span>
                <span className="tracking-widest uppercase text-white/80">SECURE CONSOLE &rarr;</span>
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#0e0e0e] border border-white/15 rounded-lg overflow-hidden text-[5px] font-mono text-white/60">
              <div className="flex justify-between items-center border-b border-white/5 pb-1">
                <span>AURELIA</span>
                <span className="text-white/20">EST.18</span>
              </div>
              <div className="flex-1 py-1.5 space-y-1">
                <div className="text-[6px] font-light text-white font-sans">$240.2M AUM</div>
                <p className="text-[3.8px] leading-tight text-white/30">Private capital allocations, boutique portfolio indices.</p>
              </div>
              <div className="border border-white/10 text-white font-medium text-center py-0.5 rounded-[1px] uppercase tracking-widest text-[4px]">
                REQUEST ACCESS
              </div>
            </div>
          )
        }
      ]
    },
    {
      name: 'TECH ENGINEER',
      badge: 'HIGH-GRAVITY',
      tagline: 'Terminal Aesthetics. Matrix Grids.',
      bestFor: 'Developers, AI Engineers, Hackathon Builders',
      desc: 'Grid architectures, monospace terminal blocks, live git status styling, active terminal blocks, and custom keyboard interaction cues. Raw technological gravity.',
      icon: Terminal,
      themeGlow: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.1) 0%, transparent 60%)',
      examples: [
        {
          id: 'developer',
          label: 'Developer System',
          simulationText: 'RUNNING DEPLOYMENT SCRIPT...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col p-3 bg-[#020617] border border-cyan-500/20 rounded-md font-mono text-[5.5px] text-cyan-400 overflow-hidden">
              <div className="flex items-center gap-1 border-b border-cyan-500/10 pb-1.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/80"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></div>
                <span className="text-[5px] text-cyan-500/40 ml-1.5 uppercase font-bold tracking-wider">BASH - DEPLOY_PORTFOLIO.SH</span>
              </div>
              <div className="space-y-0.8 flex-1">
                <p className="text-cyan-400">$ git clone https://github.com/mugi/system.git</p>
                <p className="text-white/40">&gt; unpacking repository...</p>
                <p className="text-emerald-400 font-bold">✓ 38 artifacts unpacked. status: [ACTIVE]</p>
                <p className="text-cyan-400">$ node server.js --port 3000</p>
                <p className="text-yellow-400">&gt;&gt; server loaded at port:3000</p>
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#020617] border border-cyan-500/25 rounded-lg overflow-hidden text-[4.5px] font-mono text-cyan-400">
              <div className="flex items-center gap-1 border-b border-cyan-500/10 pb-1 mb-1">
                <div className="w-1.5 h-1.5 text-cyan-400 animate-pulse" />
                <span className="text-[4px] font-bold">MUGI_DEV.CONSOLE</span>
              </div>
              <div className="space-y-1 flex-1 py-1">
                <p className="text-white/60">$ node -v</p>
                <p className="text-cyan-300">v18.16.0</p>
                <p className="text-white/60">$ npm run build</p>
                <p className="text-emerald-400 font-bold">✓ built in 140ms</p>
              </div>
              <div className="w-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold text-center py-0.5 rounded-[1px] uppercase text-[4px] tracking-widest">
                LAUNCH LOCAL
              </div>
            </div>
          )
        },
        {
          id: 'aiengineer',
          label: 'AI Engineer',
          simulationText: 'EVALUATING MODEL LOSS RATE...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col p-3 bg-[#090514] border border-cyan-500/20 rounded-md font-mono text-[5.5px] text-cyan-400 overflow-hidden">
              <div className="flex items-center justify-between border-b border-cyan-500/10 pb-1.5 mb-2">
                <div className="flex items-center gap-1.5">
                  <Database className="w-2.5 h-2.5 text-cyan-400" />
                  <span className="text-[5px] text-white uppercase font-bold tracking-wider">COGNITIVE_NODE_TRAINING</span>
                </div>
                <span className="text-[4.5px] text-cyan-500/40 font-mono">v4.6</span>
              </div>
              <div className="space-y-0.8 flex-1">
                <p className="text-white/60">&gt; Loading tensor parameters...</p>
                <p className="text-cyan-400">Epoch: 42/100 | Step: 12400/30000</p>
                <p className="text-emerald-400 font-bold">✓ Current Loss: 0.0482 (learning_rate: 1e-5)</p>
                <p className="text-white/30">&gt;&gt; Generating validation tokens...</p>
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#090514] border border-cyan-500/25 rounded-lg overflow-hidden text-[4.5px] font-mono text-cyan-400">
              <div className="flex items-center justify-between border-b border-cyan-500/10 pb-1">
                <span className="font-bold font-mono text-[4px]">AI_TRAIN.SYS</span>
                <span className="text-cyan-400 font-bold">42%</span>
              </div>
              <div className="flex-1 py-1 space-y-1">
                <p className="text-white/50">Loss: 0.0482</p>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-cyan-500 h-full w-[42%]"></div>
                </div>
                <p className="text-[3.8px] leading-tight text-white/30">Node mesh backpropagation evaluation.</p>
              </div>
              <div className="w-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold text-center py-0.5 rounded-[1px] uppercase text-[4px] tracking-widest">
                EVALUATE LOSS
              </div>
            </div>
          )
        },
        {
          id: 'hackathon',
          label: 'Hackathon Builder',
          simulationText: 'BUILDING PRODUCTION BUNDLE...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col p-3 bg-[#022c22]/20 border border-cyan-500/20 rounded-md font-mono text-[5.5px] text-cyan-400 overflow-hidden">
              <div className="flex items-center justify-between border-b border-cyan-500/10 pb-1.5 mb-2">
                <div className="flex items-center gap-1.5">
                  <Code className="w-2.5 h-2.5 text-cyan-400" />
                  <span className="text-[5px] text-white uppercase font-bold tracking-wider">MVP_LAUNCHER_V1</span>
                </div>
                <span className="text-[4.5px] text-emerald-400">SYNCED</span>
              </div>
              <div className="space-y-0.8 flex-1">
                <p className="text-white/60">&gt; running automated validation tests...</p>
                <p className="text-emerald-400 font-bold">✓ Test 1 (Database Connections): PASS</p>
                <p className="text-emerald-400 font-bold">✓ Test 2 (OAuth Authentication): PASS</p>
                <p className="text-cyan-400">&gt; deploying bundle to production server Vercel...</p>
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#022c22]/20 border border-cyan-500/25 rounded-lg overflow-hidden text-[4.5px] font-mono text-cyan-400">
              <div className="flex justify-between items-center border-cyan-500/10 pb-1">
                <span className="font-bold font-mono text-[4px]">FAST_MVP</span>
                <span className="text-emerald-400 font-bold">DEPLOYED</span>
              </div>
              <div className="flex-1 py-1 space-y-1">
                <p className="text-[4.2px] text-white/50">Tests: 12 / 12 PASS</p>
                <p className="text-[3.8px] leading-tight text-white/30">Immediate rapid architecture, built under 12 hours.</p>
              </div>
              <div className="w-full bg-cyan-500/15 border border-cyan-500/35 text-cyan-300 font-bold text-center py-0.5 rounded-[1px] uppercase text-[4px] tracking-widest">
                LAUNCH PRODUCTION
              </div>
            </div>
          )
        }
      ]
    },
    {
      name: 'CUSTOM SIGNAL',
      badge: 'BESPOKE SIGNALS',
      tagline: 'Zero constraints. Pure imagination.',
      bestFor: 'Innovators with highly unique concepts',
      desc: 'Have a completely distinct vision? An architectural aesthetic you saw somewhere, or an entirely custom motion system? We will design and engineer a world-class presence from absolute scratch.',
      icon: Palette,
      themeGlow: 'radial-gradient(circle at center, rgba(167, 139, 250, 0.1) 0%, transparent 60%)',
      examples: [
        {
          id: 'bespoke',
          label: 'Bespoke Engine',
          simulationText: 'INITIALIZING CUSTOM GRID...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col justify-between p-3.5 bg-[#050816] border border-violet-500/20 rounded-md overflow-hidden relative">
              <div className="absolute inset-0 opacity-15 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full border border-violet-500/30 animate-spin-slow"></div>
                <div className="w-12 h-12 rounded-full border border-cyan-500/20 animate-spin-slower absolute"></div>
              </div>
              <div className="flex items-center justify-between border-b border-violet-500/10 pb-1.5 relative z-10">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></div>
                  <span className="font-mono text-[6px] tracking-wider text-violet-300 font-bold">CUSTOM_WORKSPACE //</span>
                </div>
                <span className="text-[5px] text-white/30 font-mono">v4.6</span>
              </div>
              <div className="text-center py-2 relative z-10 flex flex-col items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)] mb-0.5" />
                <span className="font-display font-black text-[6.5px] text-white tracking-widest uppercase">BESPOKE_ENGINE</span>
                <span className="text-[4px] text-white/40 font-mono">COMPILING FREQUENCY...</span>
              </div>
              <div className="flex justify-between items-center text-[5px] text-white/30 border-t border-violet-500/10 pt-1.5 relative z-10 font-mono">
                <span>SOUND: tactile.js</span>
                <span className="text-violet-300 font-bold uppercase tracking-widest animate-pulse">INIT SYSTEM &rarr;</span>
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#050816] border border-violet-500/25 rounded-lg overflow-hidden text-[5px] text-white/70 relative">
              <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full border border-violet-500 animate-spin-slow"></div>
              </div>
              <div className="flex items-center gap-1 border-b border-violet-500/10 pb-1 mb-1 relative z-10">
                <Radio className="w-2.5 h-2.5 text-violet-400 animate-pulse" />
                <span className="font-bold font-mono text-[4.5px]">BESPOKE.SYS</span>
              </div>
              <div className="space-y-1 flex-1 py-1 relative z-10 flex flex-col justify-center items-center">
                <div className="h-3 w-full bg-white/5 border border-white/5 flex items-center justify-center font-display text-[5.5px] tracking-tighter text-white font-light uppercase">
                  CUSTOM SIGNAL
                </div>
                <p className="text-[3.8px] leading-tight text-white/30 text-center">Bespoke concepts compiled from absolute scratch.</p>
              </div>
              <div className="w-full bg-violet-500/15 border border-violet-500/30 text-violet-300 font-bold text-center py-0.5 rounded-[1px] uppercase tracking-widest text-[4px] relative z-10 font-mono">
                LAUNCH CREATION
              </div>
            </div>
          )
        },
        {
          id: 'tactile',
          label: 'Tactile Interface',
          simulationText: 'TUNING SYNTHESIZER NODES...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col justify-between p-3 bg-[#0d091a] border border-violet-500/20 rounded-md overflow-hidden relative font-sans text-white/80">
              <div className="flex items-center justify-between border-b border-violet-500/10 pb-1.5">
                <div className="flex items-center gap-1">
                  <Sliders className="w-2.5 h-2.5 text-violet-400" />
                  <span className="font-mono text-[6px] text-white font-semibold">SYNTH_MATRIX</span>
                </div>
                <span className="text-[4.5px] text-violet-400 font-mono">TUNE: ACTIVE</span>
              </div>
              <div className="py-2 flex items-center justify-center">
                {/* Simulated tactile sequencer grid */}
                <div className="grid grid-cols-6 gap-1 w-full max-w-[140px]">
                  <div className="h-3 bg-violet-500/35 border border-violet-500/50 rounded-[1px]"></div>
                  <div className="h-3 bg-white/5 border border-white/5 rounded-[1px]"></div>
                  <div className="h-3 bg-violet-500/35 border border-violet-500/50 rounded-[1px]"></div>
                  <div className="h-3 bg-white/5 border border-white/5 rounded-[1px]"></div>
                  <div className="h-3 bg-white/5 border border-white/5 rounded-[1px]"></div>
                  <div className="h-3 bg-violet-500/35 border border-violet-500/50 rounded-[1px]"></div>
                </div>
              </div>
              <div className="flex justify-between items-center text-[5px] text-white/30 border-t border-violet-500/10 pt-1.5 font-mono">
                <span>WAVE: SAWTOOTH</span>
                <span className="text-violet-400 font-bold uppercase">FREQ: 240Hz</span>
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#0d091a] border border-violet-500/25 rounded-lg overflow-hidden text-[5px] text-white/70">
              <div className="flex justify-between items-center border-b border-white/5 pb-1">
                <Sliders className="w-2 h-2 text-violet-400" />
                <span className="font-bold font-mono text-[4.5px]">SYNTH.SYS</span>
              </div>
              <div className="flex-1 py-1.5 space-y-1">
                <div className="flex gap-1 justify-center">
                  <div className="w-1 bg-violet-400 h-4 animate-pulse"></div>
                  <div className="w-1 bg-violet-400 h-6 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 bg-violet-400 h-3 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <div className="w-1 bg-violet-400 h-5 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                </div>
                <p className="text-[3.8px] leading-tight text-white/30 text-center">Interactive wave generator interfaces.</p>
              </div>
              <div className="w-full bg-violet-500/15 border border-violet-500/30 text-violet-300 font-bold text-center py-0.5 rounded-[1px] text-[4.5px] font-mono">
                SIMULATE TOUCH
              </div>
            </div>
          )
        },
        {
          id: 'motion',
          label: 'Motion Experiment',
          simulationText: 'SIMULATING CANVAS VECTOR FLOW...',
          desktopPreview: (
            <div className="w-full h-full flex flex-col justify-between p-3 bg-[#0a121c] border border-violet-500/20 rounded-md overflow-hidden relative">
              <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
                {/* Coordinates grid */}
                <div className="w-full h-full" style={{ 
                  backgroundImage: 'radial-gradient(circle, rgba(6,182,212,0.15) 1px, transparent 1px)', 
                  backgroundSize: '12px 12px' 
                }}></div>
              </div>
              <div className="flex items-center justify-between border-b border-violet-500/10 pb-1.5 relative z-10 font-sans text-white/80">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-2.5 h-2.5 text-cyan-400" />
                  <span className="font-mono text-[6px] text-white font-bold">MOTION_LAB</span>
                </div>
                <span className="text-[5px] text-cyan-400 font-mono">FPS: 60</span>
              </div>
              <div className="text-center py-1.5 relative z-10">
                <span className="font-mono text-[7px] text-white/60 tracking-wider">VECTOR FIELDS ACTIVE</span>
                <div className="text-[4px] text-cyan-400/80 font-mono">X: 124.25 | Y: 320.08 | Z: -4.01</div>
              </div>
              <div className="flex justify-between items-center text-[5px] text-white/30 border-t border-violet-500/10 pt-1.5 relative z-10 font-mono">
                <span>CANVAS LOOP: RUNNING</span>
                <span className="text-cyan-400 font-bold uppercase animate-pulse">RENDER NODE</span>
              </div>
            </div>
          ),
          mobilePreview: (
            <div className="w-[110px] h-full flex flex-col justify-between p-2.5 bg-[#0a121c] border border-violet-500/25 rounded-lg overflow-hidden text-[5px] text-white/70">
              <div className="flex justify-between items-center border-b border-white/5 pb-1">
                <span className="font-mono text-[4px]">MLAB.SYS</span>
                <span className="text-cyan-400 font-bold font-mono">60 FPS</span>
              </div>
              <div className="flex-1 py-1.5 space-y-1 flex flex-col justify-center items-center font-sans text-white/80">
                <span className="text-[5px] font-bold text-white uppercase">PHYSICS RENDERER</span>
                <p className="text-[3.8px] leading-tight text-white/30 text-center">Interactive particles rendering pipeline.</p>
              </div>
              <div className="w-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold text-center py-0.5 rounded-[1px] text-[4.5px] font-mono">
                ACCELERATE PHYSICS
              </div>
            </div>
          )
        }
      ]
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {archetypes.map((arch, i) => {
            const isExpanded = hoveredIndex === i || clickedIndex === i;
            return (
              <ArchetypeCard
                key={arch.name}
                arch={arch}
                index={i}
                isExpanded={isExpanded}
                onMouseEnter={() => {
                  setHoveredIndex(i);
                  audioEngine.playHover();
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  setClickedIndex(clickedIndex === i ? null : i);
                  audioEngine.playClick();
                }}
              />
            );
          })}
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
