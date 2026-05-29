import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { audioEngine } from '../utils/audioEngine';

// ── Data ────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    num:  '01',
    title: 'SIGNAL',
    desc:  'We uncover what makes you irreplaceable. The raw signal beneath the noise. Identity stripped to its essential frequency.',
  },
  {
    num:  '02',
    title: 'STRUCTURE',
    desc:  'Architecture takes shape. Every interaction engineered for authority. Every motion designed to hold attention without asking for it.',
  },
  {
    num:  '03',
    title: 'PERMANENCE',
    desc:  'We launch to global infrastructure. Fast. Enduring. The kind of presence that accumulates weight over time.',
  },
];

// ── Step Card ────────────────────────────────────────────────────────────────

interface StepCardProps {
  step: (typeof STEPS)[number];
  index: number;
  isLast: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ step, index, isLast }) => {
  return (
    <motion.div
      className="card-imax group flex-none md:flex-1 md:min-w-0"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => {
        try { audioEngine.playTick?.(); } catch { /* audioEngine optional */ }
      }}
      style={{
        position: 'relative',
        padding: '2.5rem 2rem 3rem',
        background: 'var(--c-void, #050816)',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Connecting line (desktop): top horizontal bar except last */}
      {!isLast && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '1px',
            height: '100%',
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Scan sweep on hover */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 0, opacity: 0, originY: 0 }}
        whileHover={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)',
          boxShadow: '0 0 12px rgba(124,58,237,0.4)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* Node dot (shows on hover) */}
      <motion.div
        aria-hidden="true"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: 'backOut' }}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'rgba(124,58,237,1)',
          boxShadow: '0 0 10px rgba(124,58,237,0.8), 0 0 24px rgba(124,58,237,0.4)',
        }}
      />

      {/* Phase label */}
      <p
        style={{
          fontFamily: 'var(--font-body, "Satoshi", sans-serif)',
          fontWeight: 500,
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--c-dim, rgba(255,255,255,0.3))',
          marginBottom: '1.5rem',
        }}
      >
        PHASE {step.num}
      </p>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-display, "Satoshi", sans-serif)',
          fontWeight: 700,
          fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
          letterSpacing: '-0.02em',
          color: '#ffffff',
          marginBottom: '1.25rem',
          transition: 'all 0.3s ease',
        }}
        className="group-hover:text-grad-violet"
      >
        {step.title}
      </h3>

      {/* Body */}
      <p
        style={{
          fontFamily: 'var(--font-body, "Satoshi", sans-serif)',
          fontWeight: 300,
          fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
          lineHeight: 1.75,
          color: 'var(--c-muted, rgba(255,255,255,0.5))',
        }}
        className="font-light text-muted-cin"
      >
        {step.desc}
      </p>

      {/* Hover bg glow */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
};

// ── Main Component ───────────────────────────────────────────────────────────

export const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.4], [20, 0]);
  const headerO = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="grain"
      style={{
        paddingTop:    '7rem',
        paddingBottom: '7rem',
        background:    'var(--c-void, #050816)',
        position:      'relative',
        overflow:      'hidden',
      }}
    >
      {/* Ambient top glow */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          top:        '-10%',
          left:       '50%',
          transform:  'translateX(-50%)',
          width:      '60%',
          height:     '35%',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-8 md:px-16 lg:px-24">

        {/* ── Header ───────────────────────────────────────────────── */}
        <motion.div
          style={{ y: headerY, opacity: headerO }}
          className="mb-16 md:mb-20"
        >
          <p
            style={{
              fontFamily:    'var(--font-body, "Satoshi", sans-serif)',
              fontWeight:    500,
              fontSize:      '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color:         'var(--c-dim, rgba(255,255,255,0.3))',
              marginBottom:  '1.25rem',
            }}
          >
            CLASSIFIED PROTOCOL
          </p>

          <h2
            style={{
              fontFamily:    'var(--font-display, "Satoshi", sans-serif)',
              fontWeight:    700,
              fontSize:      'clamp(2.6rem, 6vw, 6rem)',
              letterSpacing: '-0.03em',
              lineHeight:    1,
              marginBottom:  '1.25rem',
            }}
            className="text-grad-cinematic"
          >
            THE BUILD
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body, "Satoshi", sans-serif)',
              fontWeight: 300,
              fontSize:   'clamp(0.9rem, 1.3vw, 1.05rem)',
              color:      'var(--c-dim, rgba(255,255,255,0.3))',
              letterSpacing: '0.05em',
            }}
          >
            Three phases. One signal. Built to outlast.
          </p>
        </motion.div>

        {/* ── Step Cards ───────────────────────────────────────────── */}
        {/* Desktop: connecting horizontal top line across all cards */}
        <div
          className="hidden md:block"
          aria-hidden="true"
          style={{
            height:     '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 20%, rgba(255,255,255,0.05) 80%, transparent)',
            marginBottom: '-1px',
            position:   'relative',
            zIndex:     1,
          }}
        />

        <div
          style={{
            display:  'flex',
            flexDirection: 'column' as const,
            gap:      '1px',
            background: 'var(--c-border, rgba(255,255,255,0.06))',
          }}
          className="md:flex-row"
        >
          {STEPS.map((step, i) => (
            <StepCard
              key={step.num}
              step={step}
              index={i}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
