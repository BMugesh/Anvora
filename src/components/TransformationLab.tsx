import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X, Check, ArrowLeftRight, Trophy, TrendingUp, Calendar } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface SliderProps {
  beforeTitle: string;
  afterTitle: string;
  beforeContent: React.ReactNode;
  afterContent: React.ReactNode;
}

const DraggableSlider: React.FC<SliderProps> = ({
  beforeTitle,
  afterTitle,
  beforeContent,
  afterContent,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    handleMove(e.clientX);
    audioEngine.playClick();
  };

  const onTouchStart = () => {
    isDragging.current = true;
    audioEngine.playClick();
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      handleMove(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="slider-track relative w-full h-[380px] md:h-[420px] rounded-xl border border-[rgba(255,255,255,0.06)] overflow-hidden cursor-ew-resize bg-abyss select-none"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* Background/After Layer (Right Side - Polished ANVORA design) */}
      <div className="absolute inset-0 w-full h-full p-6 bg-gradient-to-br from-[#100d24] via-[#080d1a] to-[#040812] z-10">
        <div className="absolute top-4 right-4 z-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-body text-[8px] tracking-[0.2em] font-bold px-3 py-1 rounded">
          {afterTitle}
        </div>
        <div className="w-full h-full flex flex-col justify-between relative z-10">
          {afterContent}
        </div>
      </div>

      {/* Foreground/Before Layer (Left Side - Muted Legacy design) clipped */}
      <div
        className="absolute inset-0 w-full h-full p-6 bg-gradient-to-br from-[#1f2025] to-[#121316] z-20 pointer-events-none"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        }}
      >
        <div className="absolute top-4 left-4 z-20 bg-red-500/10 border border-red-500/20 text-red-400 font-body text-[8px] tracking-[0.2em] font-bold px-3 py-1 rounded">
          {beforeTitle}
        </div>
        <div className="w-full h-full flex flex-col justify-between relative z-10">
          {beforeContent}
        </div>
      </div>

      {/* Slider Divider Thumb Line */}
      <div
        className="slider-thumb"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="slider-thumb-handle">
          <ArrowLeftRight className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
    </div>
  );
};

export const TransformationLab: React.FC = () => {
  const transformations = [
    {
      title: 'PLACEMENT RESUME EVOLUTION',
      desc: 'How Rohit Sen transformed his standard template resume into a high-visibility recruiter magnet.',
      icon: Trophy,
      beforeTitle: 'BEFORE: RAW PDF RESUME',
      afterTitle: 'AFTER: ANVORA EXPERIENCE',
      beforeContent: (
        <div className="h-full bg-white text-slate-800 p-4 rounded border border-slate-300 font-sans shadow-inner text-left flex flex-col justify-between select-none pt-12">
          <div>
            <div className="text-center border-b border-slate-200 pb-2 mb-3">
              <h4 className="font-bold text-sm tracking-wide text-slate-900">ROHIT SEN</h4>
              <p className="text-[7px] text-slate-500 font-mono">rohit.sen@email.com | +91 98765 43210</p>
            </div>
            <div className="space-y-2 text-[7px] leading-relaxed">
              <div>
                <h5 className="font-bold text-slate-900 border-b border-slate-100 pb-0.5 mb-1 text-[7.5px] uppercase">Education</h5>
                <p className="text-slate-600 font-medium">B.Tech in Computer Science — CGPA: 7.8</p>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 border-b border-slate-100 pb-0.5 mb-1 text-[7.5px] uppercase">Technical Projects</h5>
                <ul className="list-disc pl-3.5 space-y-0.5 text-slate-600">
                  <li>Built a web application using standard templates and generic database.</li>
                  <li>Implemented a basic script to parse CSV log data files.</li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 border-b border-slate-100 pb-0.5 mb-1 text-[7.5px] uppercase">Skills</h5>
                <p className="text-slate-600">HTML, CSS, JavaScript, MySQL, Basic Git</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-[6px] text-slate-400">
            <span>Glanced in 6.0 seconds</span>
            <span className="font-bold text-red-500 font-mono">RESPONSE RATE: &lt; 0.5%</span>
          </div>
        </div>
      ),
      afterContent: (
        <div className="h-full flex flex-col justify-between text-left font-sans select-none relative overflow-hidden pt-12">
          {/* Glassmorphic header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-violet-600 border border-violet-400/40 flex items-center justify-center font-bold text-[8px] text-white shadow-[0_0_10px_rgba(139,92,246,0.6)] animate-pulse">
                RS
              </div>
              <div>
                <h4 className="font-display font-bold text-[10px] text-white tracking-wide uppercase leading-none">ROHIT SEN</h4>
                <span className="text-[6.5px] text-violet-400 font-semibold font-mono tracking-wider">SOFTWARE ARCHITECT</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[6px] text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              3 CALLBACKS
            </div>
          </div>

          {/* Dashboard grid layout */}
          <div className="grid grid-cols-2 gap-3.5 my-2">
            <div className="bg-white/[0.02] border border-white/5 p-2 rounded space-y-1">
              <span className="text-[6px] text-white/40 uppercase font-mono block">System Stats</span>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-extrabold text-white font-display">+240%</span>
                <span className="text-[5.5px] text-emerald-400 font-bold uppercase font-mono">CALLBACKS</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-2 rounded space-y-1.5 flex flex-col justify-between">
              <span className="text-[6px] text-white/40 uppercase font-mono block">Terminal Console</span>
              <div className="space-y-0.5 font-mono text-[4.5px] text-violet-300">
                <div>$ node build.js</div>
                <div className="text-cyan-400">✓ 99.8% Perf Index</div>
                <div className="text-emerald-400">✓ Signal permanent</div>
              </div>
            </div>
          </div>

          {/* Active build highlights */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[8.5px] text-white/80 font-medium">
              <Check className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />
              <span>LinkedIn &amp; GitHub automated sync integrations</span>
            </div>
            <div className="flex items-center gap-1.5 text-[8.5px] text-white/80 font-medium">
              <Check className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />
              <span>Monospace interactive console component</span>
            </div>
          </div>

          <div className="border-t border-white/5 pt-2 flex items-center justify-between text-[7px] text-white/40 font-mono">
            <span>SYSTEM: STABLE_V4</span>
            <span className="text-emerald-400 font-bold">OUTCOME: 3 INTERVIEWS IN 2 WEEKS</span>
          </div>
        </div>
      ),
    },
    {
      title: 'LOCAL STARTUP OVERHAUL',
      desc: 'Witness a boutique student business launch from fragmented Instagram DMs into a structured authority brand.',
      icon: TrendingUp,
      beforeTitle: 'BEFORE: DMs ONLY FOR SALES',
      afterTitle: 'AFTER: CINEMATIC LAUNCHPAD',
      beforeContent: (
        <div className="h-full bg-slate-950 text-white p-4 rounded border border-slate-800 font-sans text-left flex flex-col justify-between select-none pt-12">
          <div>
            <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-0.5">
                  <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-[7px] font-bold text-white">AP</div>
                </div>
                <div>
                  <h4 className="font-bold text-[9px] leading-none">@apex.clinic</h4>
                  <span className="text-[6.5px] text-slate-500 font-mono">Instagram Shop</span>
                </div>
              </div>
              <div className="bg-blue-500 px-2 py-0.5 rounded text-[6px] font-semibold">Message</div>
            </div>
            <div className="flex items-center gap-4 text-[7px] mb-3 text-slate-400">
              <span><strong>14</strong> Posts</span>
              <span><strong>102</strong> Followers</span>
              <span><strong>42</strong> Following</span>
            </div>
            <div className="space-y-2">
              <p className="text-[7.5px] text-slate-200 leading-tight">
                ✨ Handcrafted wellness and skin care plans.<br />
                📩 <strong>DM US TO ORDER</strong> — Shipping worldwide.
              </p>
              <div className="grid grid-cols-3 gap-1 pt-1 opacity-30">
                <div className="aspect-square bg-slate-800 rounded-sm" />
                <div className="aspect-square bg-slate-800 rounded-sm" />
                <div className="aspect-square bg-slate-800 rounded-sm" />
              </div>
            </div>
          </div>
          <div className="border-t border-slate-900 pt-2 flex items-center justify-between text-[6px] text-slate-500 font-mono">
            <span>MANUAL TRANSACTIONS</span>
            <span className="text-red-500 font-bold uppercase">CONVERSION: &lt; 2%</span>
          </div>
        </div>
      ),
      afterContent: (
        <div className="h-full flex flex-col justify-between text-left font-sans select-none relative overflow-hidden pt-12">
          {/* Cinematic Navbar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center font-black text-[9px] text-cyan-400">
                AC
              </div>
              <h4 className="font-display font-extrabold text-[10px] text-white tracking-widest uppercase">APEX CLINIC</h4>
            </div>
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
          </div>

          {/* Diagnostic console mockup */}
          <div className="bg-gradient-to-r from-cyan-500/5 to-violet-500/5 border border-cyan-500/10 p-3 rounded-lg my-2 space-y-2">
            <div className="flex justify-between items-center text-[7px] font-mono text-cyan-300">
              <span>LEADS ROUTING INTERFACE</span>
              <span>AUTOMATED ✓</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-0.5">
                <span className="text-[5.5px] text-white/40 uppercase font-mono block">Inquiry Velocity</span>
                <span className="text-xs font-black text-white font-display">+180%</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[5.5px] text-white/40 uppercase font-mono block">WhatsApp Sync</span>
                <span className="text-xs font-black text-emerald-400 font-mono">CONNECTED</span>
              </div>
            </div>
          </div>

          {/* Active build highlights */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[8.5px] text-white/80 font-medium">
              <Check className="w-2.5 h-2.5 text-cyan-400 flex-shrink-0" />
              <span>100% automated client inquiry routing system</span>
            </div>
            <div className="flex items-center gap-1.5 text-[8.5px] text-white/80 font-medium">
              <Check className="w-2.5 h-2.5 text-cyan-400 flex-shrink-0" />
              <span>Direct WhatsApp booking pipelines (no friction)</span>
            </div>
          </div>

          <div className="border-t border-white/5 pt-2 flex items-center justify-between text-[7px] text-white/40 font-mono">
            <span>SYSTEM: APEX_V2</span>
            <span className="text-emerald-400 font-bold">OUTCOME: INQUIRIES UP 1.8X</span>
          </div>
        </div>
      ),
    },
    {
      title: 'SYMPOSIUM PLATFORM EVOLUTION',
      desc: 'How a student organization transitioned paper pamphlets and posters into a high-visibility event experience.',
      icon: Calendar,
      beforeTitle: 'BEFORE: PAPER BROCHURES',
      afterTitle: 'AFTER: TICKETING TELEMETRY',
      beforeContent: (
        <div className="h-full bg-stone-100 text-stone-800 p-4 rounded border border-stone-300 font-serif text-left flex flex-col justify-between select-none pt-12">
          <div>
            <div className="text-center border-2 border-double border-stone-400 p-2 mb-3">
              <h4 className="font-bold text-xs tracking-wider text-stone-900 uppercase">NEXUS 2026</h4>
              <p className="text-[6.5px] text-stone-500 italic mt-0.5">Annual Cognitive Tech Symposium</p>
            </div>
            <div className="space-y-2 text-[7px] leading-relaxed font-sans">
              <div>
                <p className="font-bold text-stone-900 border-b border-stone-200 pb-0.5 mb-1 text-[7px] uppercase">EVENT DETAILS</p>
                <p className="text-stone-600">Venue: Seminar Hall 2 | Date: Jan 15 | Time: 9:00 AM</p>
              </div>
              <div>
                <p className="font-bold text-stone-900 border-b border-stone-200 pb-0.5 mb-1 text-[7px] uppercase">SCHEDULE</p>
                <p className="text-stone-600 leading-tight">
                  09:00 AM - Registration &amp; Opening<br />
                  10:00 AM - AI &amp; Ethics Panel Guest Talk
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-200 pt-2 flex items-center justify-between text-[6px] text-stone-400 font-sans">
            <span>Static Printed Media</span>
            <span className="text-red-500 font-bold uppercase font-mono">RSVP TRACKING: NONE</span>
          </div>
        </div>
      ),
      afterContent: (
        <div className="h-full flex flex-col justify-between text-left font-sans select-none relative overflow-hidden pt-12">
          {/* Telemetry header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-violet-500/20 border border-violet-400/30 flex items-center justify-center font-bold text-[8.5px] text-violet-400">
                N
              </div>
              <h4 className="font-display font-extrabold text-[10px] text-white tracking-widest uppercase">NEXUS EVENT CORE</h4>
            </div>
            <div className="flex items-center gap-1 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded text-[5px] text-violet-300 font-mono">
              <span className="w-1 h-1 bg-violet-400 rounded-full animate-pulse" />
              02 : 14 : 55 M
            </div>
          </div>

          {/* Registration progress bar panel */}
          <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg my-2 space-y-2">
            <div className="flex justify-between items-center text-[7px] font-mono text-white/40">
              <span>REGISTRATION VELOCITY</span>
              <span className="text-emerald-400 font-bold">85% CAPACITY</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-500 to-emerald-400 rounded-full" style={{ width: '85%' }} />
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[8.5px] text-white/80 font-medium">
              <Check className="w-2.5 h-2.5 text-violet-400 flex-shrink-0" />
              <span>Interactive ticketing and instant RSVP workflows</span>
            </div>
            <div className="flex items-center gap-1.5 text-[8.5px] text-white/80 font-medium">
              <Check className="w-2.5 h-2.5 text-violet-400 flex-shrink-0" />
              <span>Live interactive symposium schedules &amp; maps</span>
            </div>
          </div>

          <div className="border-t border-white/5 pt-2 flex items-center justify-between text-[7px] text-white/40 font-mono">
            <span>SYSTEM: NEXUS_CORE</span>
            <span className="text-emerald-400 font-bold">OUTCOME: REGISTER SURGE</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="transformations"
      className="relative py-28 bg-space grain border-bottom-subtle overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="section-label mb-3 block">Transformation Lab 2.0</span>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white tracking-tight uppercase max-w-4xl mx-auto leading-tight">
            BEFORE THEY WERE INVISIBLE. <span className="text-grad-violet">AFTER THEY BECAME UNMISSABLE.</span>
          </h2>
          <p className="font-body font-light text-muted-cin text-sm md:text-base max-w-2xl mx-auto mt-6">
            Witness our physical design shifts. Drag the interactive sliders below to compare standard, low-trust assets with the high-gravity digital authority systems we engineer.
          </p>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {transformations.map((trans, i) => {
            const SectionIcon = trans.icon;
            return (
              <motion.div
                key={trans.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="space-y-4 flex flex-col justify-between"
              >
                <div className="flex flex-col gap-1 px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-panel border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-violet-soft">
                      <SectionIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-body text-[8px] font-bold tracking-[0.2em] text-violet-soft uppercase">
                      CASE SNAPSHOT 0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mt-2">
                    {trans.title}
                  </h3>
                  <p className="font-body font-light text-[11px] text-muted-cin leading-relaxed mb-2 min-h-[32px]">
                    {trans.desc}
                  </p>
                </div>

                {/* Draggable slider container */}
                <DraggableSlider
                  beforeTitle={trans.beforeTitle}
                  afterTitle={trans.afterTitle}
                  beforeContent={trans.beforeContent}
                  afterContent={trans.afterContent}
                />

                <div className="text-[8px] text-center text-dim-cin font-body tracking-[0.1em] pt-1 animate-pulse">
                  &larr; SLIDE OR TAP HORIZONTALLY &rarr;
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
