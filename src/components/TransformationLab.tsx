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
      <div className="absolute inset-0 w-full h-full p-6 bg-gradient-to-br from-[#100d24] via-[#080d1a] to-[#040812]">
        <div className="absolute top-4 right-4 z-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-body text-[8px] tracking-[0.2em] font-bold px-3 py-1 rounded">
          {afterTitle}
        </div>
        <div className="w-full h-full flex flex-col justify-between relative z-10">
          {afterContent}
        </div>
      </div>

      {/* Foreground/Before Layer (Left Side - Muted Legacy design) clipped */}
      <div
        className="absolute inset-0 w-full h-full p-6 bg-gradient-to-br from-[#1f2025] to-[#121316] z-10 pointer-events-none"
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
        <div className="h-full flex flex-col justify-between pt-6">
          <div className="space-y-3">
            <h4 className="font-mono text-[9px] text-red-400/80">CLASS: "STANDARD_TEMPLATE_04"</h4>
            <div className="h-4 w-36 bg-white/10 rounded"></div>
            <div className="h-2 w-full bg-white/5 rounded"></div>
            <div className="h-2 w-5/6 bg-white/5 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span>Standard 6-second recruiter glance</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span>No interaction and zero sound signals</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span>Buried under 12,000 PDF resume files</span>
            </div>
          </div>
          <div className="text-[8px] tracking-widest text-white/30 uppercase mt-4">
            RESPONSE RATE: &lt; 0.5%
          </div>
        </div>
      ),
      afterContent: (
        <div className="h-full flex flex-col justify-between pt-6">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-violet-400 animate-pulse" />
              <h4 className="font-mono text-[9px] text-violet-400 font-bold">IDENTITY: INTERACTIVE PORTFOLIO</h4>
            </div>
            <h3 className="font-display font-extrabold text-xl text-white tracking-tight uppercase leading-none">
              ROHIT SEN <span className="text-grad-violet">/ R&amp;D BUILDER</span>
            </h3>
            <div className="h-2 w-5/6 bg-white/10 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-white/85 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>240% recruiter callback rate surge</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/85 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Monospace interactive console component</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/85 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>LinkedIn &amp; GitHub automated sync integrations</span>
            </div>
          </div>
          <div className="text-[8px] tracking-widest text-emerald-400 font-bold uppercase mt-4">
            OUTCOME: 3 INTERVIEW CALLS IN 2 WEEKS
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
        <div className="h-full flex flex-col justify-between pt-6">
          <div className="space-y-3">
            <h4 className="font-mono text-[9px] text-red-400/80">CLASS: "UNSTRUCTURED_SOCIAL"</h4>
            <div className="h-4 w-32 bg-white/10 rounded"></div>
            <div className="h-2 w-full bg-white/5 rounded"></div>
            <div className="h-2 w-2/3 bg-white/5 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span>Customers must DM to view catalog</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span>High visual friction, unverified transactions</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span>0% search engine footprint</span>
            </div>
          </div>
          <div className="text-[8px] tracking-widest text-white/30 uppercase mt-4">
            CONVERSION RATE: ESTIMATED &lt; 2%
          </div>
        </div>
      ),
      afterContent: (
        <div className="h-full flex flex-col justify-between pt-6">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-violet-400 animate-pulse" />
              <h4 className="font-mono text-[9px] text-violet-400 font-bold">IDENTITY: CINEMATIC STARTUP WEBSITE</h4>
            </div>
            <h3 className="font-display font-extrabold text-xl text-white tracking-tight uppercase leading-none">
              APEX CLINIC <span className="text-grad-violet">/ SYSTEMS</span>
            </h3>
            <div className="h-2 w-11/12 bg-white/10 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-white/85 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>100% automated client inquiry routing</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/85 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Direct WhatsApp automated pipelines</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/85 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Premium brand elements with local SEO mapping</span>
            </div>
          </div>
          <div className="text-[8px] tracking-widest text-emerald-400 font-bold uppercase mt-4">
            OUTCOME: INQUIRIES INCREASED BY 180%
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
        <div className="h-full flex flex-col justify-between pt-6">
          <div className="space-y-3">
            <h4 className="font-mono text-[9px] text-red-400/80">CLASS: "STATIC_PHYSICAL_POSTER"</h4>
            <div className="h-4 w-36 bg-white/10 rounded"></div>
            <div className="h-2 w-full bg-white/5 rounded"></div>
            <div className="h-2 w-3/4 bg-white/5 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span>Paper handouts, easily lost or ignored</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span>Zero telemetry on registration velocity</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span>No sponsors visibility or feedback assets</span>
            </div>
          </div>
          <div className="text-[8px] tracking-widest text-white/30 uppercase mt-4">
            Spectator Loop: Inactive / Fragmented
          </div>
        </div>
      ),
      afterContent: (
        <div className="h-full flex flex-col justify-between pt-6">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-violet-400 animate-pulse" />
              <h4 className="font-mono text-[9px] text-violet-400 font-bold">IDENTITY: INTERACTIVE EVENT PLATFORM</h4>
            </div>
            <h3 className="font-display font-extrabold text-xl text-white tracking-tight uppercase leading-none">
              NEXUS 2026 <span className="text-grad-violet">/ COGNITIVE</span>
            </h3>
            <div className="h-2 w-full bg-white/10 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-white/85 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Interactive ticketing and instant RSVP workflows</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/85 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Dedicated sponsor showcase with click telemetry</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/85 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Live interactive symposium schedules &amp; maps</span>
            </div>
          </div>
          <div className="text-[8px] tracking-widest text-emerald-400 font-bold uppercase mt-4">
            OUTCOME: REGISTRATION VELOCITY &amp; SPONSOR VISIBILITY SURGE
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
