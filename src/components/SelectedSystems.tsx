import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  Cpu, ShieldCheck, Sparkles, ArrowUpRight,
  CheckCircle, Clock, Lock, ExternalLink, X, AlertTriangle,
  Activity, Zap, GitCommit, FileText, RefreshCw, BarChart2, Radio
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectStatus = 'COMPLETED' | 'IN_PROGRESS' | 'INTERNAL' | 'FLAGSHIP';

interface Project {
  id: string;
  title: string;
  category: string;
  status: ProjectStatus;
  desc: string;
  stack: string[];
  result: string;
  capabilities: string[];
  liveUrl?: string;
  whatsappText: string;
  cssArt: React.ReactNode;
  progress?: number;
  progressLabel?: string;
  modulesCount?: string;
  lastUpdated: string;
}

// ─── Status Config ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<ProjectStatus, {
  label: string;
  color: string;
  bg: string;
  border: string;
  Icon: React.ComponentType<{ className?: string }>;
  glow: string;
}> = {
  COMPLETED: {
    label: 'COMPLETED SYSTEM',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    Icon: CheckCircle,
    glow: 'rgba(16,185,129,0.15)',
  },
  IN_PROGRESS: {
    label: 'CURRENTLY ENGINEERING',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    Icon: Clock,
    glow: 'rgba(245,158,11,0.12)',
  },
  FLAGSHIP: {
    label: 'FLAGSHIP AI SYSTEM',
    color: 'text-violet-300',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    Icon: Sparkles,
    glow: 'rgba(139,92,246,0.2)',
  },
  INTERNAL: {
    label: 'INTERNAL SYSTEM',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    Icon: Lock,
    glow: 'rgba(6,182,212,0.12)',
  },
};

// ─── Status Badge Component ─────────────────────────────────────────────────────

const StatusBadge: React.FC<{ status: ProjectStatus }> = ({ status }) => {
  const cfg = STATUS_CONFIG[status];
  const { Icon } = cfg;
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[8px] font-mono font-bold tracking-[0.15em] uppercase ${cfg.color} ${cfg.bg} ${cfg.border}`}>
      <Icon className="w-2.5 h-2.5" />
      {cfg.label}
      <span className={`w-1 h-1 rounded-full ml-0.5 animate-pulse ${
        status === 'COMPLETED' ? 'bg-emerald-400' :
        status === 'IN_PROGRESS' ? 'bg-amber-400' :
        status === 'FLAGSHIP' ? 'bg-violet-400' : 'bg-cyan-400'
      }`} />
    </div>
  );
};

// ─── Fallback Modal ────────────────────────────────────────────────────────────

const UnavailableModal: React.FC<{ title: string; onClose: () => void }> = ({ title, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] flex items-center justify-center p-6"
    style={{ background: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(12px)' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-w-sm w-full rounded-2xl border p-8 text-center"
      style={{
        background: 'linear-gradient(135deg, rgba(14,20,38,0.95) 0%, rgba(8,12,26,0.98) 100%)',
        borderColor: 'rgba(255,255,255,0.08)',
        boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-5">
        <AlertTriangle className="w-5 h-5 text-amber-400" />
      </div>

      <h3 className="font-display font-bold text-lg text-white mb-2 uppercase tracking-tight">
        System currently unavailable.
      </h3>
      <p className="font-body text-muted-cin text-xs leading-relaxed mb-6">
        Please contact ANVORA for access or staging telemetry walkthroughs.
      </p>

      <a
        href={`https://wa.me/+918778848565?text=${encodeURIComponent(`Hi ANVORA, I'd like a live walkthrough of the ${title} system.`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp flex items-center justify-center gap-2 w-full py-3 font-bold text-sm"
        onClick={() => audioEngine.playClick()}
      >
        REQUEST TELEMETRY ACCESS
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </motion.div>
  </motion.div>
);

// ─── Blueprint / Follow Progress Modal ─────────────────────────────────────────

const BlueprintModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const commits = [
    { hash: 'a3f91b2', msg: 'feat: implement student enrollment flow', time: '2h ago', status: 'done' },
    { hash: 'c8d4e17', msg: 'feat: responsive grid layout system', time: '5h ago', status: 'done' },
    { hash: '7b2f394', msg: 'wip: admission portal UI architecture', time: '1d ago', status: 'active' },
    { hash: 'e5a1d83', msg: 'todo: SEO optimization + meta system', time: 'queued', status: 'pending' },
    { hash: '9f3c156', msg: 'todo: CMS integration for course listing', time: 'queued', status: 'pending' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
      style={{ background: 'rgba(5,8,22,0.9)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-2xl w-full rounded-2xl border overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(12,18,34,0.98) 0%, rgba(8,12,26,0.99) 100%)',
          borderColor: 'rgba(245,158,11,0.2)',
          boxShadow: '0 40px 80px -20px rgba(0,0,0,0.9), 0 0 60px rgba(245,158,11,0.05)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(245,158,11,0.15)' }}>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60 animate-pulse" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
            </div>
            <span className="font-mono text-[9px] tracking-[0.2em] text-amber-400/60 uppercase">
              BLUEPRINT_TELEMETRY // {project.title.toUpperCase()}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-amber-400 font-bold uppercase tracking-wider">
                COMPLETION: {project.progress}%
              </span>
              <span className="text-white/40">
                MODULES: {project.modulesCount}
              </span>
            </div>
            {[
              { label: 'UI Architecture', value: 85 },
              { label: 'Backend Integration & Verification', value: 65 },
              { label: 'CMS & Typographic Structure', value: 80 },
              { label: 'QA Testing & Telemetry Audit', value: 55 },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[8px] text-white/50">{item.label}</span>
                  <span className="font-mono text-[8px] text-amber-400">{item.value}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, rgba(245,158,11,0.8), rgba(251,191,36,0.6))' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <span className="font-mono text-[8px] tracking-[0.2em] text-white/30 uppercase block">GIT STATUS LOG</span>
            {commits.map((c) => (
              <div key={c.hash} className="flex items-start gap-3 group/commit">
                <div className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${
                  c.status === 'done' ? 'bg-emerald-400' :
                  c.status === 'active' ? 'bg-amber-400 animate-pulse' :
                  'bg-white/20'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[7px] text-violet-400/70">[{c.hash}]</span>
                    <span className="font-mono text-[7px] text-white/50 truncate">{c.msg}</span>
                  </div>
                </div>
                <span className="font-mono text-[6px] text-white/20 flex-shrink-0">{c.time}</span>
              </div>
            ))}
          </div>

          <a
            href={`https://wa.me/+918778848565?text=${encodeURIComponent(`Hi ANVORA, I want to follow progress on ${project.title}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded border font-body font-bold text-[10px] tracking-[0.2em] uppercase transition-all duration-300"
            style={{
              borderColor: 'rgba(245,158,11,0.3)',
              color: 'rgba(245,158,11,0.9)',
              background: 'rgba(245,158,11,0.05)',
            }}
            onClick={() => audioEngine.playClick()}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.12)';
              audioEngine.playHover();
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.05)';
            }}
          >
            <Zap className="w-3 h-3" />
            FOLLOW PROGRESS
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Click Ripple Overlay ──────────────────────────────────────────────────────

const ClickRipple: React.FC<{ active: boolean; x: number; y: number }> = ({ active, x, y }) => (
  <AnimatePresence>
    {active && (
      <motion.span
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 4, opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute rounded-full bg-white/25 pointer-events-none"
        style={{
          left: x - 10,
          top: y - 10,
          width: 20,
          height: 20,
          transform: 'translate(-50%, -50%)',
        }}
      />
    )}
  </AnimatePresence>
);

// ─── Interactive Card Wrapper ──────────────────────────────────────────────────

const ClickableCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  hoverGlowColor?: string;
}> = ({ children, className = '', style = {}, onClick, hoverGlowColor = 'rgba(139,92,246,0.15)' }) => {
  const [ripple, setRipple] = useState({ active: false, x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ active: true, x, y });
    audioEngine.playClick();
  };

  useEffect(() => {
    if (ripple.active) {
      const timer = setTimeout(() => setRipple(prev => ({ ...prev, active: false })), 600);
      return () => clearTimeout(timer);
    }
  }, [ripple.active]);

  return (
    <motion.div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.995 }}
      className={`card-imax relative overflow-hidden cursor-pointer group ${className}`}
      style={{
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        ...style,
      }}
      onMouseEnter={() => audioEngine.playHover()}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${hoverGlowColor}, transparent 40%)`
        }}
      />
      <ClickRipple active={ripple.active} x={ripple.x} y={ripple.y} />
      {children}
    </motion.div>
  );
};

// ─── Live Count-Up Animation Hook ──────────────────────────────────────────────

function useCountUp(target: number, duration: number = 1000, trigger: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const end = target;
    if (start === end) return;

    let totalMiliseconds = duration;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export const SelectedSystems: React.FC = () => {
  const [verifyState, setVerifyState] = useState<'idle' | 'scanning' | 'validating' | 'cross_referencing' | 'success'>('idle');
  const [blueprintProject, setBlueprintProject] = useState<Project | null>(null);
  const [unavailableTitle, setUnavailableTitle] = useState<string | null>(null);
  const [akshayaHovered, setAkshayaHovered] = useState(false);

  // Counter animation triggers
  const akshayaPercentage = useCountUp(72, 1200, akshayaHovered);
  const akshayaModules = useCountUp(9, 1200, akshayaHovered);

  const triggerVerificationFlow = () => {
    if (verifyState !== 'idle') return;
    audioEngine.playClick();
    setVerifyState('scanning');

    setTimeout(() => {
      setVerifyState('validating');
      audioEngine.playClick();
    }, 1500);

    setTimeout(() => {
      setVerifyState('cross_referencing');
      audioEngine.playClick();
    }, 3000);

    setTimeout(() => {
      setVerifyState('success');
      audioEngine.playClick();
    }, 4500);

    setTimeout(() => {
      setVerifyState('idle');
    }, 8500);
  };

  const healthPulseProject: Project = {
    id: 'healthpulse',
    title: 'HealthPulse',
    category: 'HEALTHCARE PLATFORM',
    status: 'COMPLETED',
    desc: 'HealthPulse is a modern healthcare digital platform engineered to provide a premium patient-facing experience through responsive interfaces, trust-focused design systems and healthcare-oriented user journeys.',
    stack: ['React', 'Framer Motion', 'HSL Navy', 'Bespoke UI'],
    result: '+240% Recruiter / User Engagement',
    capabilities: ['Patient Experience UX', 'Healthcare Interface', 'Modern Clinical Brand'],
    liveUrl: 'https://health-care-eta-liard.vercel.app/',
    whatsappText: 'Hi ANVORA, I want to explore case designs similar to the HealthPulse platform.',
    lastUpdated: 'June 2026',
    progress: 100,
    cssArt: (
      <div className="absolute inset-0 flex flex-col justify-between p-4 bg-[#08121e] border border-emerald-500/25 rounded-md overflow-hidden text-emerald-400 font-sans transition-all duration-500 group-hover:scale-105">
        <div className="flex justify-between items-center border-b border-emerald-500/10 pb-2">
          <span className="text-[6px] tracking-widest font-bold font-mono">HEALTHPULSE_SYS // INTEL</span>
          <span className="flex items-center gap-1 text-[5px] text-emerald-400 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse group-hover:scale-125 transition-transform" />
            ONLINE
          </span>
        </div>
        <div className="relative w-full h-12 flex items-center justify-center">
          <svg className="w-full h-8 stroke-emerald-400 transition-all duration-300" viewBox="0 0 100 30" fill="none">
            <path
              d="M0,15 L35,15 L38,5 L42,25 L45,15 L48,15 L51,10 L54,20 L57,15 L100,15"
              strokeWidth="1.2"
              className="transition-all duration-300 group-hover:stroke-emerald-300 group-hover:stroke-[1.8px]"
              style={{
                strokeDasharray: '200',
                strokeDashoffset: '0',
                animation: verifyState !== 'idle' ? 'none' : 'ekg-draw 2.5s linear infinite',
              }}
            />
          </svg>
        </div>
        <div className="flex justify-between items-center text-[5px] text-white/30 border-t border-emerald-500/10 pt-2">
          <span className="font-mono">PATIENTS: 14,840 ACTIVE</span>
          <span className="text-emerald-300 font-bold uppercase tracking-wider font-mono">VERIFIED ARCH ✓</span>
        </div>
      </div>
    ),
  };

  const akshayaProject: Project = {
    id: 'akshaya',
    title: 'Akshaya Akademics',
    category: 'EDUCATIONAL AUTHORITY',
    status: 'IN_PROGRESS',
    desc: 'An elite admissions and academic branding portal engineered to project trust and absolute institutional credibility for ambitious institutions.',
    stack: ['React', 'Satoshi Font', 'CSS Grids', 'Static CDNs'],
    result: 'Global Admissions Scaling',
    capabilities: ['Student Management UI', 'Elite Academic Branding', 'Zero-Latency Presence'],
    whatsappText: 'Hi ANVORA, I want to discuss architectural plans similar to Akshaya Akademics.',
    lastUpdated: 'June 2026',
    progress: 72,
    modulesCount: '9 / 12',
    progressLabel: 'Interaction Optimization',
    cssArt: (
      <div className="absolute inset-0 flex flex-col justify-between p-4 bg-[#0c0d12] border border-amber-500/20 rounded-md overflow-hidden font-mono text-amber-300 transition-all duration-500">
        <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[5px] text-white/20">
          <span>AKSHAYA_ACADEMICS</span>
          <span className="text-amber-400 animate-pulse font-bold">ENGINEERING_WIP</span>
        </div>
        {/* Dynamic scanning grid grid art */}
        <div className="relative flex-grow flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
          <motion.div
            className="absolute top-0 left-0 w-full h-[1px] bg-amber-400/40"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          />
          <div className="flex flex-col items-center gap-1 z-10">
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-[5px] text-amber-400/60 tracking-widest font-mono uppercase">
              NODE_STREAM: ONLINE
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center text-[5.5px] text-amber-400 font-bold border-t border-white/5 pt-2">
          <span>SYSTEM completion: 72%</span>
          <span>PHASE: DEV_STG</span>
        </div>
      </div>
    ),
  };

  const internalProject: Project = {
    id: 'internal',
    title: 'ANVORA Motion Lab',
    category: 'PROPRIETARY ENVIRONMENT',
    status: 'INTERNAL',
    desc: 'Our own customized high-gravity brand framework designed to hold viewer attention, trigger tactile audio feedback, and optimize leads.',
    stack: ['React', 'Lenis Scroll', 'Tailwind', 'Bespoke Audio'],
    result: '99.8% Perfect Lead Routing',
    capabilities: ['Extreme Motion Pacing', 'Authority Architecture', 'High-Frequency Lead Capture'],
    whatsappText: 'Hi ANVORA, I want to build a completely bespoke custom system from scratch.',
    lastUpdated: 'June 2026',
    cssArt: (
      <div className="absolute inset-0 flex flex-col justify-between p-4 bg-[#050816] border border-cyan-500/20 rounded-md overflow-hidden relative">
        <div className="absolute inset-0 opacity-15 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border border-cyan-500/20 animate-spin" style={{ animationDuration: '25s' }} />
          <div className="w-12 h-12 rounded-full border border-violet-400/20 animate-spin absolute" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        </div>
        <div className="flex justify-between items-center text-[5px] text-white/20 relative z-10 font-mono">
          <span>ANVORA_MOTION_LAB</span>
          <span>v4.6</span>
        </div>
        <div className="text-center py-2 relative z-10 flex flex-col items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mb-1 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
          <span className="font-display font-black text-[7px] text-white tracking-widest uppercase">MOTION_FIELD</span>
        </div>
        <div className="flex justify-between text-[4.5px] text-white/40 relative z-10 font-mono">
          <span>ENGINE: TACTILE.JS</span>
          <span>FPS: 120.0</span>
        </div>
      </div>
    ),
  };

  const handleCompletedSystemAction = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playClick();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="selected-systems"
      className="relative py-28 bg-[#080d1a] grain border-bottom-subtle overflow-hidden"
    >
      <div
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 65%)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.02) 0%, transparent 65%)',
          transform: 'translate(50%, 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="section-label mb-3 block">Bespoke Engineering Showcase</span>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white tracking-tight uppercase leading-none">
            SELECTED SYSTEMS & <span className="text-grad-violet">ACTIVE ENGINEERING.</span>
          </h2>
          <p className="font-body font-light text-muted-cin text-sm md:text-base max-w-2xl mx-auto mt-6">
            Here is a living ecosystem of systems, products, experiments and AI infrastructure actively engineered and deployed by ANVORA.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            FLAGSHIP SYSTEMS — VerifyAI Spotlight (Largest)
        ══════════════════════════════════════════════════════════════ */}
        <div className="mb-8">
          <ClickableCard
            hoverGlowColor="rgba(139, 92, 246, 0.18)"
            className="p-8 md:p-12 rounded-2xl border-active relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(14,24,48,0.9) 0%, rgba(5,8,22,0.98) 100%)',
              boxShadow: '0 0 80px rgba(139, 92, 246, 0.18)',
            }}
          >
            {/* Ambient backglows */}
            <div
              className="absolute -right-20 -top-20 w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 60%)' }}
            />
            <div
              className="absolute -left-10 -bottom-10 w-[300px] h-[300px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)' }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Visual Art Side (Neural grid demo) */}
              <div className="relative w-full aspect-[16/10] bg-black/60 rounded-xl border border-violet-500/25 overflow-hidden flex flex-col justify-between p-6">
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                    backgroundSize: '15px 15px',
                  }}
                />

                <div className="flex justify-between items-center border-b border-violet-500/10 pb-3 relative z-10">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Cpu className="w-4 h-4 animate-spin-slow" />
                    <span className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase">VERIFYAI_CORE_SYSTEM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[8px] text-white/40 uppercase">INFRASTRUCTURE: ONLINE</span>
                  </div>
                </div>

                {/* Interactive validation demonstration */}
                <div className="flex flex-col items-center justify-center flex-grow py-4 relative z-10">
                  <AnimatePresence mode="wait">
                    {verifyState === 'idle' ? (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center gap-3 cursor-pointer group/verify"
                        onClick={triggerVerificationFlow}
                      >
                        <div className="w-14 h-14 rounded-full border border-violet-500/30 flex items-center justify-center bg-violet-500/5 group-hover/verify:border-violet-500 group-hover/verify:bg-violet-500/10 transition-all duration-300">
                          <ShieldCheck className="w-6 h-6 text-violet-400" />
                        </div>
                        <span className="font-mono text-[8px] text-violet-300 tracking-[0.15em] font-bold bg-violet-500/10 px-3 py-1 rounded border border-violet-500/20 group-hover/verify:border-violet-500/40 transition-colors uppercase">
                          ▶ CLICK TO INITIATE VALIDATION
                        </span>
                      </motion.div>
                    ) : verifyState === 'scanning' ? (
                      <motion.div
                        key="scanning"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center gap-3"
                      >
                        <div className="w-14 h-14 rounded-full border border-cyan-500/40 flex items-center justify-center bg-cyan-500/5 relative overflow-hidden">
                          <div
                            className="absolute left-0 w-full h-[2px] bg-cyan-400"
                            style={{ animation: 'scan-v 1s linear infinite' }}
                          />
                          <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
                        </div>
                        <span className="font-mono text-[8px] text-cyan-300 tracking-[0.15em] font-bold bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/20 animate-pulse uppercase">
                          Scanning...
                        </span>
                      </motion.div>
                    ) : verifyState === 'validating' ? (
                      <motion.div
                        key="validating"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center gap-3"
                      >
                        <div className="w-14 h-14 rounded-full border border-amber-500/40 flex items-center justify-center bg-amber-500/5 relative overflow-hidden">
                          <RefreshCw className="w-6 h-6 text-amber-400 animate-spin" />
                        </div>
                        <span className="font-mono text-[8px] text-amber-300 tracking-[0.15em] font-bold bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 animate-pulse uppercase">
                          Validating...
                        </span>
                      </motion.div>
                    ) : verifyState === 'cross_referencing' ? (
                      <motion.div
                        key="cross_referencing"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center gap-3"
                      >
                        <div className="w-14 h-14 rounded-full border border-violet-500/40 flex items-center justify-center bg-violet-500/5 relative overflow-hidden">
                          <Activity className="w-6 h-6 text-violet-400 animate-pulse" />
                        </div>
                        <span className="font-mono text-[8px] text-violet-300 tracking-[0.15em] font-bold bg-violet-500/10 px-3 py-1 rounded border border-violet-500/20 animate-pulse uppercase">
                          Cross-Referencing...
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center gap-3"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="w-14 h-14 rounded-full border border-emerald-500/40 flex items-center justify-center bg-emerald-500/10 shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                        >
                          <ShieldCheck className="w-6 h-6 text-emerald-400" />
                        </motion.div>
                        <span className="font-mono text-[8px] text-emerald-400 tracking-[0.15em] font-bold bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20 uppercase">
                          Verified. Trust Score: 100%
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-center text-[7px] text-white/40 border-t border-violet-500/10 pt-3 relative z-10">
                  <span className="font-mono flex items-center gap-1">
                    <Activity className="w-2.5 h-2.5" />
                    FRAUD DETECTION: ACTIVE
                  </span>
                  <span className="font-mono">JWT_SIG: b7d1e8c4</span>
                </div>
              </div>

              {/* Description Side */}
              <div className="flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <StatusBadge status="FLAGSHIP" />
                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                      LAST UPDATED: June 2026
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-black text-4xl md:text-5xl text-white tracking-tight uppercase leading-none">
                      VERIFYAI
                    </h3>
                    <div className="flex items-center gap-2">
                      <GitCommit className="w-3 h-3 text-violet-400/60" />
                      <span className="font-mono text-[7px] text-violet-400/60 tracking-widest">commit [v2.4.1] · production</span>
                    </div>
                  </div>

                  <p className="font-body font-light text-muted-cin text-sm leading-relaxed max-w-lg">
                    A next-generation document validation platform designed to verify academic credentials, student certificates, institutional records, and digital identities using automated verification workflows and intelligent fraud-detection pipelines.
                  </p>

                  <div className="space-y-3 pt-2">
                    <span className="font-body text-[9px] tracking-[0.15em] text-dim-cin font-bold uppercase block">
                      ENGINEERED CAPABILITIES:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Student Certificate Validation',
                        'Academic Record Verification',
                        'Bespoke Fraud Detection Grids',
                        'Institutional Trust Systems',
                        'Automated Verification Pipelines',
                      ].map((cap) => (
                        <div key={cap} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-soft flex-shrink-0 animate-pulse" />
                          <span className="font-body text-xs text-white/80 font-medium">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-6">
                  {['React', 'Rust WASM', 'Framer Motion', 'Neural Grids'].map(t => (
                    <span key={t} className="font-mono text-[8px] tracking-[0.1em] text-dim-cin border border-white/5 px-2 py-0.5 rounded-[2px] bg-white/[0.02]">
                      {t}
                    </span>
                  ))}
                </div>

                <motion.a
                  href={`https://wa.me/+918778848565?text=${encodeURIComponent("Hi ANVORA, I'm interested in AI trust systems like VerifyAI.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => audioEngine.playClick()}
                  onMouseEnter={() => audioEngine.playHover()}
                  className="btn-whatsapp flex items-center justify-center gap-3 w-full sm:w-fit px-8 py-3.5 mt-8 text-center font-bold relative overflow-hidden"
                >
                  <span>DISCUSS AI TRUST SYSTEM</span>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </ClickableCard>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            SECOND ROW — HealthPulse & Akshaya Akademics
        ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* HealthPulse (Second Largest - 2/3 Width) */}
          <div className="lg:col-span-2">
            <ClickableCard
              hoverGlowColor="rgba(16, 185, 129, 0.12)"
              className="p-8 rounded-xl flex flex-col justify-between h-full relative overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, rgba(14,20,34,0.7) 0%, rgba(8,13,26,0.9) 100%)',
                boxShadow: '0 0 40px rgba(16, 185, 129, 0.05)',
              }}
              onClick={() => {
                audioEngine.playClick();
                window.open('https://health-care-eta-liard.vercel.app/', '_blank', 'noopener,noreferrer');
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)' }}
              />

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
                <div className="md:col-span-2">
                  <div className="relative w-full aspect-[16/10] bg-black/40 rounded-lg border border-[rgba(255,255,255,0.06)] overflow-hidden">
                    {healthPulseProject.cssArt}
                  </div>
                </div>
                <div className="md:col-span-3 space-y-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <StatusBadge status="COMPLETED" />
                    <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
                      UPDATED: {healthPulseProject.lastUpdated}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl text-white tracking-tight uppercase group-hover:text-grad-white transition-colors duration-300">
                    {healthPulseProject.title}
                  </h3>

                  <p className="font-body font-light text-muted-cin text-xs leading-relaxed">
                    {healthPulseProject.desc}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    {healthPulseProject.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-400" />
                        <span className="font-body text-[10px] text-white/70 font-semibold uppercase">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-6">
                <div className="flex flex-wrap gap-1.5">
                  {healthPulseProject.stack.map((item) => (
                    <span key={item} className="font-mono text-[7px] tracking-[0.1em] text-dim-cin border border-white/5 px-2 py-0.5 rounded-[2px] bg-white/[0.01]">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  <motion.button
                    onClick={(e) => handleCompletedSystemAction(healthPulseProject.liveUrl!, e)}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded border text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
                    style={{
                      borderColor: 'rgba(16,185,129,0.4)',
                      background: 'rgba(16,185,129,0.06)',
                      color: '#34d399',
                    }}
                  >
                    <span>VIEW LIVE SYSTEM</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.button>
                  <motion.button
                    onClick={(e) => handleCompletedSystemAction(healthPulseProject.liveUrl!, e)}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded border border-white/10 hover:border-white/30 text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-300 text-white/80 cursor-pointer"
                  >
                    <span>OPEN PROJECT</span>
                  </motion.button>
                </div>
              </div>
            </ClickableCard>
          </div>

          {/* Akshaya Akademics (Medium - 1/3 Width) */}
          <div className="lg:col-span-1">
            <ClickableCard
              hoverGlowColor="rgba(245, 158, 11, 0.12)"
              className="p-6 rounded-xl flex flex-col justify-between h-full relative overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, rgba(14,20,34,0.7) 0%, rgba(8,13,26,0.9) 100%)',
                boxShadow: '0 0 40px rgba(245, 158, 11, 0.04)',
              }}
              onClick={() => {
                audioEngine.playClick();
                setBlueprintProject(akshayaProject);
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)' }}
              />

              <div className="space-y-4">
                <div className="relative w-full aspect-[16/10] bg-black/40 rounded-lg border border-[rgba(255,255,255,0.06)] overflow-hidden">
                  {akshayaProject.cssArt}
                </div>

                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <StatusBadge status="IN_PROGRESS" />
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
                    UPDATED: {akshayaProject.lastUpdated}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-xl text-white tracking-tight uppercase group-hover:text-grad-white transition-colors duration-300">
                  {akshayaProject.title}
                </h3>

                <p className="font-body font-light text-muted-cin text-xs leading-relaxed">
                  {akshayaProject.desc}
                </p>

                {/* Progress bar displaying telemetry */}
                <div
                  className="p-3.5 rounded border bg-amber-500/5 transition-all duration-300"
                  style={{ borderColor: 'rgba(245,158,11,0.15)' }}
                  onMouseEnter={() => setAkshayaHovered(true)}
                  onMouseLeave={() => setAkshayaHovered(false)}
                >
                  <div className="flex justify-between items-center mb-1 text-[8px] font-mono">
                    <span className="text-white/40">COMPLETION</span>
                    <span className="text-amber-400 font-bold">{akshayaPercentage}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${akshayaPercentage}%` }} />
                  </div>
                  <div className="flex justify-between items-center text-[7px] font-mono text-white/50">
                    <span>MODULES: {akshayaModules} / 12</span>
                    <span>PHASE: DEV_CORE</span>
                  </div>
                </div>

                <p className="font-mono text-[9.5px] text-amber-300/80 leading-relaxed pt-2 border-t border-white/5">
                  &quot;Currently building the future of academic presence.&quot;
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-1">
                  {akshayaProject.stack.map((item) => (
                    <span key={item} className="font-mono text-[7px] tracking-[0.1em] text-dim-cin border border-white/5 px-2 py-0.5 rounded-[2px]">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded border transition-all duration-300 group/btn font-mono text-[9px] tracking-[0.2em]"
                    style={{
                      borderColor: 'rgba(245,158,11,0.25)',
                      background: 'rgba(245,158,11,0.04)',
                      color: '#f59e0b',
                    }}
                  >
                    <span>VIEW DEVELOPMENT STATUS</span>
                    <Clock className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ClickableCard>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            THIRD ROW — ANVORA Motion Lab (Small Showcase)
        ══════════════════════════════════════════════════════════════ */}
        <div>
          <ClickableCard
            hoverGlowColor="rgba(6, 182, 212, 0.1)"
            className="p-5 rounded-xl border border-white/5"
            style={{
              background: 'linear-gradient(135deg, rgba(8,13,26,0.8) 0%, rgba(5,8,18,0.95) 100%)',
            }}
            onClick={() => {
              setUnavailableTitle(internalProject.title);
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5 w-full md:w-auto">
                <div className="relative w-24 h-16 bg-black/40 rounded border border-white/5 overflow-hidden flex-shrink-0">
                  {internalProject.cssArt}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight">
                      {internalProject.title}
                    </h4>
                    <StatusBadge status="INTERNAL" />
                  </div>
                  <p className="font-body text-white/50 text-[11px] max-w-xl">
                    {internalProject.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                <div className="flex items-center gap-4 font-mono text-[9px] text-white/30">
                  <span>LAST UPDATED: {internalProject.lastUpdated}</span>
                  <span>COMPLETION: INTERNAL SYSTEM</span>
                </div>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all text-[9px] font-mono text-cyan-400 tracking-wider"
                >
                  DISCUSS CORE
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </ClickableCard>
        </div>

      </div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {blueprintProject && (
          <BlueprintModal
            project={blueprintProject}
            onClose={() => setBlueprintProject(null)}
          />
        )}
        {unavailableTitle && (
          <UnavailableModal
            title={unavailableTitle}
            onClose={() => setUnavailableTitle(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scan-v {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes ekg-draw {
          to {
            stroke-dashoffset: -400;
          }
        }
      `}</style>
    </section>
  );
};
