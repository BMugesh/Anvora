import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, ShieldCheck, Sparkles, ArrowUpRight,
  CheckCircle, Clock, Lock, ExternalLink, X, AlertTriangle,
  Activity, Zap, GitCommit
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
  liveUrl?: string;         // real URL — opens directly
  whatsappText: string;
  cssArt: React.ReactNode;
  progress?: number;        // 0-100 for IN_PROGRESS
  progressLabel?: string;
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
    label: 'SYSTEM LIVE',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    Icon: CheckCircle,
    glow: 'rgba(16,185,129,0.15)',
  },
  IN_PROGRESS: {
    label: 'IN DEVELOPMENT',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    Icon: Clock,
    glow: 'rgba(245,158,11,0.12)',
  },
  FLAGSHIP: {
    label: 'FEATURED INTEL',
    color: 'text-violet-300',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    Icon: Sparkles,
    glow: 'rgba(139,92,246,0.2)',
  },
  INTERNAL: {
    label: 'INTERNAL BUILD',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    Icon: Lock,
    glow: 'rgba(6,182,212,0.12)',
  },
};

// ─── Broken-link fallback modal ─────────────────────────────────────────────

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
        {title}
      </h3>
      <p className="font-body text-muted-cin text-xs leading-relaxed mb-6">
        This system is currently undergoing infrastructure maintenance or is in a private staging environment.
        Reach out directly to request a live walkthrough.
      </p>

      <a
        href={`https://wa.me/+918778848565?text=${encodeURIComponent(`Hi ANVORA, I'd like a live walkthrough of the ${title} system.`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp flex items-center justify-center gap-2 w-full py-3 font-bold text-sm"
        onClick={() => audioEngine.playClick()}
      >
        REQUEST LIVE DEMO
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </motion.div>
  </motion.div>
);

// ─── Blueprint In-Development Modal ────────────────────────────────────────────

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
        {/* Header bar */}
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
          {/* Progress bars */}
          <div className="space-y-3">
            <span className="font-mono text-[8px] tracking-[0.2em] text-amber-400/80 uppercase block">
              BUILD PROGRESS // PHASE 2 OF 4
            </span>
            {[
              { label: 'UI Architecture', value: 85 },
              { label: 'Backend Integration', value: 40 },
              { label: 'CMS & Content Pipeline', value: 20 },
              { label: 'QA & Deployment', value: 5 },
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

          {/* Git-style commit log */}
          <div className="space-y-2 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <span className="font-mono text-[8px] tracking-[0.2em] text-white/30 uppercase block">GIT LOG // RECENT COMMITS</span>
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

          {/* Notify CTA */}
          <a
            href={`https://wa.me/+918778848565?text=${encodeURIComponent(`Hi ANVORA, I'm interested in the ${project.title} system — when will it launch?`)}`}
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
            NOTIFY ME ON LAUNCH
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Status Badge Component ─────────────────────────────────────────────────────

const StatusBadge: React.FC<{ status: ProjectStatus }> = ({ status }) => {
  const cfg = STATUS_CONFIG[status];
  const { Icon } = cfg;
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[7px] font-mono font-bold tracking-[0.15em] uppercase ${cfg.color} ${cfg.bg} ${cfg.border}`}>
      <Icon className="w-2.5 h-2.5" />
      {cfg.label}
      {status === 'COMPLETED' && (
        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
      )}
      {status === 'IN_PROGRESS' && (
        <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse ml-0.5" />
      )}
    </div>
  );
};


// ─── Main Component ───────────────────────────────────────────────────────────

export const SelectedSystems: React.FC = () => {
  const [verifyStep, setVerifyStep] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [blueprintProject, setBlueprintProject] = useState<Project | null>(null);
  const [unavailableTitle, setUnavailableTitle] = useState<string | null>(null);

  const triggerVerificationMock = () => {
    if (verifyStep !== 'idle') return;
    setVerifyStep('scanning');
    audioEngine.playClick();
    setTimeout(() => {
      setVerifyStep('success');
      audioEngine.playClick();
      setTimeout(() => setVerifyStep('idle'), 3000);
    }, 2000);
  };

  const projects: Project[] = [
    {
      id: 'healthpulse',
      title: 'HealthPulse',
      category: 'HEALTHCARE PLATFORM',
      status: 'COMPLETED',
      desc: 'A clinical yet highly inviting patient-facing platform. Overhauled a legacy administrative structure into a responsive diagnostic dashboard with real-time telemetry.',
      stack: ['React', 'Framer Motion', 'HSL Navy', 'Bespoke UI'],
      result: '+240% Recruiter / User Engagement',
      capabilities: ['Patient Experience UX', 'Healthcare Interface', 'Modern Clinical Brand'],
      liveUrl: 'https://healthpulse.anvora.in',  // replace with real URL when available
      whatsappText: 'Hi ANVORA, I want to explore case designs similar to the HealthPulse platform.',
      progress: 100,
      cssArt: (
        <div className="absolute inset-0 flex flex-col justify-between p-4 bg-[#08121e] border border-emerald-500/20 rounded-md overflow-hidden text-emerald-400 font-sans">
          <div className="flex justify-between items-center border-b border-emerald-500/10 pb-2">
            <span className="text-[6px] tracking-widest font-bold">HEALTHPULSE_SYS</span>
            <span className="flex items-center gap-1 text-[5px] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>
          <div className="relative w-full h-12 flex items-center justify-center">
            <svg className="w-full h-8 stroke-emerald-400" viewBox="0 0 100 30" fill="none">
              <path d="M0,15 L35,15 L38,5 L42,25 L45,15 L48,15 L51,10 L54,20 L57,15 L100,15" strokeWidth="1.2" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-full h-[1px] bg-emerald-400/10 animate-pulse" style={{ top: '50%' }} />
            </div>
          </div>
          <div className="flex justify-between items-center text-[5px] text-white/30 border-t border-emerald-500/10 pt-2">
            <span>PATIENTS: 14,840 ACTIVE</span>
            <span className="text-emerald-300 font-bold uppercase tracking-wider">DEPLOYED ✓</span>
          </div>
        </div>
      ),
    },
    {
      id: 'akshaya',
      title: 'Akshaya Akademics',
      category: 'EDUCATIONAL AUTHORITY',
      status: 'IN_PROGRESS',
      desc: 'An elite admissions and academic branding portal engineered to project trust and absolute institutional credibility for ambitious institutions.',
      stack: ['React', 'Satoshi Font', 'CSS Grids', 'Static CDNs'],
      result: 'Global Admissions Scaling',
      capabilities: ['Student Management UI', 'Elite Academic Branding', 'Zero-Latency Presence'],
      whatsappText: 'Hi ANVORA, I want to discuss architectural plans similar to Akshaya Akademics.',
      progress: 45,
      progressLabel: 'Phase 2 of 4 — UI Architecture',
      cssArt: (
        <div className="absolute inset-0 flex flex-col justify-between p-4 bg-[#0c0d12] border border-amber-500/20 rounded-md overflow-hidden font-mono text-amber-300">
          <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[5px] text-white/20">
            <span>AKSHAYA_ACADEMICS</span>
            <span className="text-amber-400 animate-pulse">BUILD_2.1</span>
          </div>
          <div className="space-y-1.5 py-1 text-[5px] text-white/80">
            <div className="space-y-1">
              {[85, 40, 20].map((w, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="h-1 rounded-full bg-amber-400/60" style={{ width: `${w}%` }} />
                  <span className="text-[4px] text-amber-400/50">{w}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center text-[5.5px] text-amber-400 font-bold border-t border-white/5 pt-2">
            <span>⚡ BUILDING...</span>
            <span className="text-amber-300">ETA: Q3 2025</span>
          </div>
        </div>
      ),
    },
    {
      id: 'internal',
      title: 'ANVORA Internal Systems',
      category: 'PROPRIETARY ENVIRONMENT',
      status: 'INTERNAL',
      desc: 'Our own customized high-gravity brand framework designed to hold viewer attention, trigger tactile audio feedback, and optimize leads.',
      stack: ['React', 'Lenis Scroll', 'Tailwind', 'Bespoke Audio'],
      result: '99.8% Perfect Lead Routing',
      capabilities: ['Extreme Motion Pacing', 'Authority Architecture', 'High-Frequency Lead Capture'],
      whatsappText: 'Hi ANVORA, I want to build a completely bespoke custom system from scratch.',
      cssArt: (
        <div className="absolute inset-0 flex flex-col justify-between p-4 bg-[#050816] border border-violet-500/30 rounded-md overflow-hidden relative">
          <div className="absolute inset-0 opacity-15 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border border-violet-500 animate-spin" style={{ animationDuration: '20s' }} />
            <div className="w-12 h-12 rounded-full border border-cyan-400 animate-spin absolute" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
          </div>
          <div className="flex justify-between items-center text-[5px] text-white/20 relative z-10">
            <span>ANVORA_INTERNAL_CORE</span>
            <span>v4.6</span>
          </div>
          <div className="text-center py-2 relative z-10 flex flex-col items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mb-1 shadow-[0_0_6px_rgba(139,92,246,0.8)]" />
            <span className="font-display font-black text-[7px] text-white tracking-widest uppercase">GRAVITY_MATRIX</span>
          </div>
          <div className="flex justify-between text-[4.5px] text-white/40 relative z-10">
            <span>SOUND: Tactile.js</span>
            <span>SCROLL: Lenis.ts</span>
          </div>
        </div>
      ),
    },
  ];

  const handleProjectAction = (proj: Project, e: React.MouseEvent) => {
    audioEngine.playClick();
    if (proj.status === 'IN_PROGRESS') {
      e.preventDefault();
      setBlueprintProject(proj);
    } else if (!proj.liveUrl && proj.status !== 'COMPLETED') {
      e.preventDefault();
      setUnavailableTitle(proj.title);
    }
    // COMPLETED with liveUrl — let native <a> handle it
  };

  return (
    <section
      id="selected-systems"
      className="relative py-28 bg-[#080d1a] grain border-bottom-subtle overflow-hidden"
    >
      {/* Background ambient radial glows */}
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
            SELECTED <span className="text-grad-violet">SYSTEMS.</span>
          </h2>
          <p className="font-body font-light text-muted-cin text-sm md:text-base max-w-2xl mx-auto mt-6">
            We don't build standard layouts. We build high-caliber, secure digital assets engineered for real innovators, ambitious founders, and educational institutions.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            FLAGSHIP — VerifyAI Spotlight
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="card-imax p-8 md:p-12 rounded-2xl border-active mb-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(14,24,48,0.9) 0%, rgba(5,8,22,0.98) 100%)',
            boxShadow: '0 0 80px rgba(139, 92, 246, 0.18)',
          }}
        >
          {/* Accent glow */}
          <div
            className="absolute -right-20 -top-20 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 60%)' }}
          />
          <div
            className="absolute -left-10 -bottom-10 w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual Art Side */}
            <div className="relative w-full aspect-[16/10] bg-black/60 rounded-xl border border-violet-500/25 overflow-hidden flex flex-col justify-between p-6">
              {/* Grid overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                  backgroundSize: '15px 15px',
                }}
              />

              <div className="flex justify-between items-center border-b border-violet-500/10 pb-3 relative z-10">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Cpu className="w-4 h-4" style={{ animation: 'spin 8s linear infinite' }} />
                  <span className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase">VERIFYAI_CORE_SYSTEM</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[8px] text-white/40 uppercase">INFRASTRUCTURE: ONLINE</span>
                </div>
              </div>

              {/* Interactive Verification Widget */}
              <div className="flex flex-col items-center justify-center flex-grow py-4 relative z-10">
                <AnimatePresence mode="wait">
                  {verifyStep === 'idle' ? (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center gap-3 cursor-pointer group/verify"
                      onClick={triggerVerificationMock}
                    >
                      <div className="w-14 h-14 rounded-full border border-violet-500/30 flex items-center justify-center bg-violet-500/5 group-hover/verify:border-violet-500 group-hover/verify:bg-violet-500/10 transition-all duration-300">
                        <ShieldCheck className="w-6 h-6 text-violet-400" />
                      </div>
                      <span className="font-mono text-[8px] text-violet-300 tracking-[0.15em] font-bold bg-violet-500/10 px-3 py-1 rounded border border-violet-500/20 group-hover/verify:border-violet-500/40 transition-colors uppercase">
                        ▶ CLICK TO INITIATE VALIDATION
                      </span>
                    </motion.div>
                  ) : verifyStep === 'scanning' ? (
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
                        SCANNING DOCUMENT HASH MATRIX...
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
                        ✓ CREDENTIAL VALIDATED // 100% SECURE
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom readouts */}
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
                  <span className="font-body text-[8px] font-bold tracking-[0.2em] text-cyan-400/70 uppercase">
                    AI-Powered Trust Infrastructure
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
                  A next-generation document validation platform that verifies academic credentials, student certificates, institutional records, and digital identities using automated verification workflows and intelligent fraud-detection pipelines.
                </p>

                {/* Capabilities */}
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

              {/* CTA */}
              <motion.a
                href={`https://wa.me/+918778848565?text=${encodeURIComponent("Hi ANVORA, I'm interested in AI trust systems like VerifyAI.")}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => audioEngine.playClick()}
                onMouseEnter={() => audioEngine.playHover()}
                className="btn-whatsapp flex items-center justify-center gap-3 w-full sm:w-fit px-8 py-3.5 mt-8 text-center font-bold"
              >
                <span>DISCUSS AI TRUST SYSTEM</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            Grid — Three Other Systems
        ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {projects.map((proj, i) => {
            const statusCfg = STATUS_CONFIG[proj.status];
            const isCompleted = proj.status === 'COMPLETED';
            const isInProgress = proj.status === 'IN_PROGRESS';

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="card-imax p-6 rounded-xl flex flex-col justify-between group h-full relative overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, rgba(14,20,34,0.7) 0%, rgba(8,13,26,0.9) 100%)',
                  boxShadow: `0 0 0 1px rgba(255,255,255,0.04), inset 0 0 40px ${statusCfg.glow}`,
                }}
                whileHover={{
                  boxShadow: `0 0 0 1px rgba(255,255,255,0.07), 0 20px 60px -20px ${statusCfg.glow}, inset 0 0 60px ${statusCfg.glow}`,
                }}
              >
                {/* Status glow accent top */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] opacity-60"
                  style={{ background: `linear-gradient(90deg, transparent, ${isCompleted ? 'rgba(16,185,129,0.4)' : isInProgress ? 'rgba(245,158,11,0.4)' : 'rgba(6,182,212,0.3)'}, transparent)` }}
                />

                <div>
                  {/* Miniature CSS Mockup */}
                  <div className="relative w-full aspect-[16/10] bg-black/40 rounded-lg border border-[rgba(255,255,255,0.06)] overflow-hidden mb-5">
                    {proj.cssArt}
                  </div>

                  {/* Status + Category Row */}
                  <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                    <StatusBadge status={proj.status} />
                    <span className="font-body text-[7px] font-bold tracking-[0.18em] text-white/30 uppercase">
                      {proj.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-extrabold text-xl text-white tracking-tight uppercase group-hover:text-grad-white transition-colors duration-300 mb-2">
                    {proj.title}
                  </h3>
                  <p className="font-body font-light text-muted-cin text-xs leading-relaxed mb-5">
                    {proj.desc}
                  </p>

                  {/* Progress bar for IN_PROGRESS */}
                  {isInProgress && proj.progress !== undefined && (
                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-mono text-[7px] text-amber-400/70">{proj.progressLabel}</span>
                        <span className="font-mono text-[7px] text-amber-400">{proj.progress}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, rgba(245,158,11,0.8), rgba(251,191,36,0.5))' }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${proj.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Capabilities */}
                  <div className="space-y-1.5 border-t border-white/5 pt-4 mb-5">
                    {proj.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-1.5">
                        <span className={`w-1 h-1 rounded-full ${isCompleted ? 'bg-emerald-400' : isInProgress ? 'bg-amber-400' : 'bg-cyan-400'}`} />
                        <span className="font-body text-[10px] text-white/70 font-semibold uppercase">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {proj.stack.map((item) => (
                      <span key={item} className="font-mono text-[7px] tracking-[0.1em] text-dim-cin border border-white/5 px-2 py-0.5 rounded-[2px]">
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Action button — smart per status */}
                  {isCompleted && proj.liveUrl ? (
                    <motion.a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => audioEngine.playClick()}
                      onMouseEnter={() => audioEngine.playHover()}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded border transition-all duration-300 group/btn"
                      style={{
                        borderColor: 'rgba(16,185,129,0.3)',
                        background: 'rgba(16,185,129,0.05)',
                      }}
                    >
                      <span className="font-body text-[9px] tracking-[0.2em] text-emerald-400/70 group-hover/btn:text-emerald-300 transition-colors flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                        VIEW LIVE SYSTEM
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-400/50 group-hover/btn:text-emerald-300 transition-colors" />
                    </motion.a>
                  ) : isInProgress ? (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        audioEngine.playClick();
                        setBlueprintProject(proj);
                      }}
                      onMouseEnter={() => audioEngine.playHover()}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded border transition-all duration-300 group/btn cursor-pointer"
                      style={{
                        borderColor: 'rgba(245,158,11,0.25)',
                        background: 'rgba(245,158,11,0.04)',
                      }}
                    >
                      <span className="font-body text-[9px] tracking-[0.2em] text-amber-400/70 group-hover/btn:text-amber-300 transition-colors flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                        VIEW BUILD STATUS
                      </span>
                      <Clock className="w-3.5 h-3.5 text-amber-400/50 group-hover/btn:text-amber-300 transition-colors" />
                    </motion.button>
                  ) : (
                    <motion.a
                      href={`https://wa.me/+918778848565?text=${encodeURIComponent(proj.whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => audioEngine.playClick()}
                      onMouseEnter={() => audioEngine.playHover()}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 group/btn"
                    >
                      <span className="font-body text-[9px] tracking-[0.2em] text-white/50 group-hover/btn:text-white transition-colors">
                        DISCUSS SYSTEM
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover/btn:text-white transition-colors" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Verification scanning keyframe ── */}
      <style>{`
        @keyframes scan-v {
          0%   { top: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

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
    </section>
  );
};
