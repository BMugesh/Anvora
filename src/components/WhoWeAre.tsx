import React, { useRef, useEffect } from 'react';
import {
  motion,
  useInView,
  useSpring,
  useMotionValue,
  useTransform,
} from 'framer-motion';

// ── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { label: 'Signals Sent',        value: 3,   suffix: '+' },
  { label: 'Active Builds',       value: 3,   suffix: ''  },
  { label: 'Presence Delivered',  value: 100, suffix: '%' },
];

const pillars = [
  {
    n: '01',
    title: 'Perception Engineering',
    body: 'We shape how the world feels you before it reads you. Every pixel, every pause, every silence — deliberate.',
  },
  {
    n: '02',
    title: 'Identity Systems',
    body: 'Not a logo. An architecture of recognition. Visual languages built to outlast trends and accumulate gravity.',
  },
  {
    n: '03',
    title: 'Motion Intelligence',
    body: 'Motion as emotion. Nothing moves by accident. Every transition carries meaning, every stillness carries weight.',
  },
];

// ── Animated Counter ─────────────────────────────────────────────────────────

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  isActive: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix, isActive }) => {
  const motionVal = useMotionValue(0);
  const spring    = useSpring(motionVal, { stiffness: 120, damping: 40 });
  const display   = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (isActive) {
      motionVal.set(value);
    }
  }, [isActive, value, motionVal]);

  return (
    <motion.span
      style={{
        fontFamily: 'var(--font-display, "Satoshi", sans-serif)',
        fontWeight: 700,
        fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
        letterSpacing: '-0.03em',
        color: '#ffffff',
        lineHeight: 1,
      }}
    >
      {display}
    </motion.span>
  );
};

// ── Main Component ───────────────────────────────────────────────────────────

export const WhoWeAre: React.FC = () => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const pillarsRef  = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });
  const statsInView   = useInView(statsRef,   { once: true, margin: '-5% 0px'  });
  const pillarsInView = useInView(pillarsRef,  { once: true, margin: '-5% 0px'  });

  const fadeUp = (delay = 0) => ({
    initial:   { opacity: 0, y: 32 },
    animate:   sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
    transition: {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ background: 'var(--c-abyss, #080D1A)' }}
      className="relative py-28 overflow-hidden"
    >
      {/* ── Left accent line ───────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1px',
          height: '100%',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(124,58,237,0.5) 30%, rgba(124,58,237,0.5) 70%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-8 md:px-16 lg:px-24">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-20">
          <motion.p
            {...fadeUp(0)}
            style={{
              fontFamily: 'var(--font-body, "Satoshi", sans-serif)',
              fontWeight: 500,
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--c-dim, rgba(255,255,255,0.35))',
              marginBottom: '1.25rem',
            }}
          >
            The Philosophy
          </motion.p>

          <motion.h2
            {...fadeUp(0.08)}
            style={{
              fontFamily: 'var(--font-display, "Satoshi", sans-serif)',
              fontWeight: 700,
              fontSize: 'clamp(2.6rem, 6vw, 6rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: '1.75rem',
            }}
            className="text-grad-cinematic"
          >
            NOT BUILT
            <br />
            TO BLEND IN.
          </motion.h2>

          <motion.p
            {...fadeUp(0.14)}
            style={{
              fontFamily: 'var(--font-body, "Satoshi", sans-serif)',
              fontWeight: 300,
              fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
              lineHeight: 1.75,
              color: 'var(--c-muted, rgba(255,255,255,0.55))',
              maxWidth: '52ch',
            }}
          >
            Some signals never fade. We architect digital presence for those who
            understand that lasting authority is not claimed — it is built, layer
            by layer, with intent.
          </motion.p>
        </div>

        {/* ── Pillar Grid ────────────────────────────────────────────── */}
        <div ref={pillarsRef}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1px',
              background: 'var(--c-border, rgba(255,255,255,0.06))',
              marginBottom: '5rem',
            }}
          >
            {pillars.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 28 }}
                animate={
                  pillarsInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 28 }
                }
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="card-imax group"
                style={{
                  position: 'relative',
                  padding: '2.5rem 2rem 2rem',
                  background: 'var(--c-abyss, #08080f)',
                  cursor: 'default',
                  transition: 'background 0.3s ease',
                  overflow: 'hidden',
                }}
                whileHover={{ backgroundColor: 'rgba(124,58,237,0.04)' } as Record<string, unknown>}
              >
                {/* Huge faint number */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-0.5rem',
                    right: '1rem',
                    fontFamily: 'var(--font-display, "Satoshi", sans-serif)',
                    fontWeight: 700,
                    fontSize: 'clamp(5rem, 10vw, 8rem)',
                    color: 'rgba(124,58,237,0.12)',
                    lineHeight: 1,
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  {p.n}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display, "Satoshi", sans-serif)',
                    fontWeight: 600,
                    fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                    letterSpacing: '-0.01em',
                    color: '#ffffff',
                    marginBottom: '0.85rem',
                    position: 'relative',
                  }}
                >
                  {p.title}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontFamily: 'var(--font-body, "Satoshi", sans-serif)',
                    fontWeight: 300,
                    fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                    lineHeight: 1.7,
                    color: 'var(--c-muted, rgba(255,255,255,0.5))',
                    position: 'relative',
                  }}
                >
                  {p.body}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '1px',
                    width: '100%',
                    background:
                      'linear-gradient(90deg, rgba(124,58,237,0.8), rgba(167,139,250,0.4), transparent)',
                    scaleX: 0,
                    originX: 0,
                  }}
                  whileHover={{ scaleX: 1 } as Record<string, unknown>}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Stats ──────────────────────────────────────────────────── */}
        <div ref={statsRef}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '2px',
              background: 'var(--c-border, rgba(255,255,255,0.06))',
            }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  statsInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  padding: '2rem 1.75rem',
                  background: 'var(--c-abyss, #08080f)',
                }}
              >
                <AnimatedCounter
                  value={s.value}
                  suffix={s.suffix}
                  isActive={statsInView}
                />
                <p
                  style={{
                    fontFamily: 'var(--font-body, "Satoshi", sans-serif)',
                    fontWeight: 400,
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--c-dim, rgba(255,255,255,0.35))',
                    marginTop: '0.5rem',
                  }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
