import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const StoryScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── ACT 1: DIAGNOSIS ─────────────────────────────────────────────────────
  const p0Opacity = useTransform(scrollYProgress, [0.00, 0.03, 0.06, 0.08], [0, 1, 1, 0]);
  const p1Opacity = useTransform(scrollYProgress, [0.10, 0.13, 0.16, 0.18], [0, 1, 1, 0]);
  const p2Opacity = useTransform(scrollYProgress, [0.20, 0.23, 0.26, 0.28], [0, 1, 1, 0]);

  // ── SIGNAL DEGRADATION grid glitch ───────────────────────────────────────
  const gridGlitch = useTransform(scrollYProgress, [0.0, 0.05, 0.29, 0.30], [0, 0.08, 0.08, 0]);

  // ── ACT 1.5: SIGNAL DEGRADATION ──────────────────────────────────────────
  const p3Opacity = useTransform(scrollYProgress, [0.30, 0.33, 0.38, 0.41], [0, 1, 1, 0]);
  const p4Opacity = useTransform(scrollYProgress, [0.43, 0.46, 0.52, 0.55], [0, 1, 1, 0]);

  // ── ACT 2: HUMAN EMOTION ─────────────────────────────────────────────────
  const p5Opacity = useTransform(scrollYProgress, [0.57, 0.60, 0.67, 0.70], [0, 1, 1, 0]);
  const p5Y = useTransform(scrollYProgress, [0.57, 0.60], [40, 0]);

  // ── ACT 3: REVELATION ────────────────────────────────────────────────────
  const gridOpacity = useTransform(scrollYProgress, [0.72, 0.77, 0.96, 1.0], [0, 0.3, 0.3, 0]);
  const bgOpacity   = useTransform(scrollYProgress, [0.72, 0.77, 0.96, 1.0], [0, 0.04, 0.04, 0]);

  const s0Opacity = useTransform(scrollYProgress, [0.74, 0.79], [0, 1]);
  const s0Y       = useTransform(scrollYProgress, [0.74, 0.79], [50, 0]);

  const s1Opacity = useTransform(scrollYProgress, [0.81, 0.86], [0, 1]);
  const s1Y       = useTransform(scrollYProgress, [0.81, 0.86], [50, 0]);

  const s2Opacity = useTransform(scrollYProgress, [0.88, 0.93], [0, 1]);
  const s2Y       = useTransform(scrollYProgress, [0.88, 0.93], [50, 0]);

  const bigWordStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display, "Satoshi", sans-serif)',
    fontWeight: 300,
    fontSize: 'clamp(5rem, 14vw, 12rem)',
    letterSpacing: '0.06em',
    color: '#ffffff',
    opacity: 0.3,
    lineHeight: 1,
    userSelect: 'none',
  };

  const signalTextStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body, "Satoshi", sans-serif)',
    color: 'rgba(248,250,252,0.4)',
    fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
  };

  const signalTextBrightStyle: React.CSSProperties = {
    ...signalTextStyle,
    color: 'rgba(248,250,252,0.8)',
  };

  const act2Style: React.CSSProperties = {
    fontFamily: 'var(--font-display, "Satoshi", sans-serif)',
    fontWeight: 300,
    color: '#ffffff',
    fontSize: 'clamp(1.8rem, 4.5vw, 4rem)',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    textAlign: 'center' as const,
  };

  const act3Style: React.CSSProperties = {
    fontFamily: 'var(--font-display, "Satoshi", sans-serif)',
    fontWeight: 600,
    fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)',
    letterSpacing: '-0.025em',
    color: '#ffffff',
    lineHeight: 1.05,
  };

  return (
    <div
      ref={containerRef}
      className="relative grain"
      style={{ height: '900vh', background: 'var(--c-void)' }}
    >
      {/* ── STICKY VIEWPORT ──────────────────────────────────────────── */}
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* ── SCANLINE OVERLAY (Act 1) ─────────────────────────────── */}
        <motion.div
          aria-hidden="true"
          style={{
            opacity: gridGlitch,
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)',
            backgroundSize: '100% 4px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* ── GLITCH GRID (Act 1) ──────────────────────────────────── */}
        <motion.div
          aria-hidden="true"
          style={{
            opacity: gridGlitch,
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* ── ACT 3: BG GLOW ───────────────────────────────────────── */}
        <motion.div
          aria-hidden="true"
          style={{
            opacity: bgOpacity,
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* ── ACT 3: GRID OVERLAY ──────────────────────────────────── */}
        <motion.div
          aria-hidden="true"
          style={{
            opacity: gridOpacity,
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
            maskImage:
              'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* ── CONTENT LAYER ────────────────────────────────────────── */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ zIndex: 2 }}
        >
          {/* ─── ACT 1: STATIC ─────────────────────────────────── */}
          <motion.div
            style={{ opacity: p0Opacity, position: 'absolute' }}
          >
            <span style={bigWordStyle}>STATIC</span>
          </motion.div>

          {/* ─── ACT 1: BORING ─────────────────────────────────── */}
          <motion.div
            style={{ opacity: p1Opacity, position: 'absolute' }}
          >
            <span style={bigWordStyle}>BORING</span>
          </motion.div>

          {/* ─── ACT 1: INVISIBLE ──────────────────────────────── */}
          <motion.div
            style={{ opacity: p2Opacity, position: 'absolute' }}
          >
            <span style={bigWordStyle}>INVISIBLE</span>
          </motion.div>

          {/* ─── ACT 1.5: Most websites ────────────────────────── */}
          <motion.div
            style={{
              opacity: p3Opacity,
              position: 'absolute',
              textAlign: 'center',
              padding: '0 2rem',
            }}
          >
            <p style={signalTextStyle}>
              MOST WEBSITES WERE NEVER BUILT TO MATTER.
            </p>
          </motion.div>

          {/* ─── ACT 1.5: Never built to last ──────────────────── */}
          <motion.div
            style={{
              opacity: p4Opacity,
              position: 'absolute',
              textAlign: 'center',
              padding: '0 2rem',
            }}
          >
            <p style={signalTextBrightStyle}>
              THEY WERE NEVER BUILT TO LAST.
            </p>
          </motion.div>

          {/* ─── ACT 2: THE WORLD ONLY REMEMBERS ──────────────── */}
          <motion.div
            style={{
              opacity: p5Opacity,
              y: p5Y,
              position: 'absolute',
              textAlign: 'center',
              padding: '0 2rem',
            }}
          >
            <p style={act2Style}>
              THE WORLD ONLY REMEMBERS
              <br />
              WHAT IT FEELS.
            </p>
          </motion.div>

          {/* ─── ACT 3: THREE-PART REVELATION ─────────────────── */}
          <motion.div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            className="px-8 md:px-20 lg:px-32 gap-6 md:gap-10"
          >
            <motion.div style={{ opacity: s0Opacity, y: s0Y }}>
              <p style={act3Style}>AUTHORITY IS ENGINEERED.</p>
            </motion.div>
            <motion.div style={{ opacity: s1Opacity, y: s1Y }}>
              <p style={act3Style}>PERCEPTION IS DESIGNED.</p>
            </motion.div>
            <motion.div style={{ opacity: s2Opacity, y: s2Y }}>
              <p style={act3Style}>ATTENTION IS EARNED.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
