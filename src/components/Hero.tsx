import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { audioEngine } from '../utils/audioEngine';

interface HeroProps {
  showIntro?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ showIntro = false }) => {
  const d = showIntro ? 0.2 : 0;
  const sectionRef = useRef<HTMLElement>(null);
  const [bracketsVisible1, setBracketsVisible1] = useState(false);
  const [bracketsVisible2, setBracketsVisible2] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, -40]);

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        background: '#050816',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Noise overlay */}
      <div
        className="noise-overlay"
        style={{ opacity: 0.4 }}
      />

      {/* Radial ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Orbital rings system */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        {/* Ring 1 — 800px, 80s spin */}
        <div
          style={{
            position: 'absolute',
            width: 800,
            height: 800,
            borderRadius: '50%',
            border: '0.5px solid rgba(139,92,246,0.2)',
            opacity: 0.1,
            animation: 'hero-spin1 80s linear infinite',
          }}
        />
        {/* Ring 2 — 550px, 60s counter-spin */}
        <div
          style={{
            position: 'absolute',
            width: 550,
            height: 550,
            borderRadius: '50%',
            border: '0.5px solid rgba(124,58,237,0.25)',
            opacity: 0.1,
            animation: 'hero-spin2 60s linear infinite',
          }}
        />
        {/* Ring 3 — 320px, 40s spin */}
        <div
          style={{
            position: 'absolute',
            width: 320,
            height: 320,
            borderRadius: '50%',
            border: '1px solid rgba(6,182,212,0.15)',
            opacity: 0.1,
            animation: 'hero-spin1 40s linear infinite',
          }}
        />
      </div>

      {/* Main content — scroll-linked */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 0,
          opacity: contentOpacity,
          y: contentY,
          padding: '0 24px',
          maxWidth: 960,
        }}
      >
        {/* Studio signal label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: d + 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Satoshi', 'Inter', sans-serif",
            fontSize: 9,
            letterSpacing: '0.5em',
            color: 'rgba(240,242,248,0.3)',
            fontWeight: 500,
            textTransform: 'uppercase',
            margin: '0 0 24px 0',
          }}
        >
          ANVORA · STUDIO SIGNAL
        </motion.p>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(14px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: d + 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 24 }}
        >
          <h1
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(3.2rem, 8.5vw, 8rem)',
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.02,
            }}
          >
            DIGITAL AUTHORITY
          </h1>
          <h1
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(3.2rem, 8.5vw, 8rem)',
              letterSpacing: '-0.03em',
              margin: 0,
              lineHeight: 1.02,
              background: 'linear-gradient(90deg, #ffffff 0%, rgba(139,92,246,0.6) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ARCHITECTED.
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: d + 1.6, ease: 'easeOut' }}
          style={{
            fontFamily: "'Satoshi', 'Inter', sans-serif",
            fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
            color: 'rgba(240,242,248,0.48)',
            letterSpacing: '0.01em',
            maxWidth: 680,
            margin: '0 auto 20px',
            lineHeight: 1.65,
          }}
        >
          Premium portfolios, startup websites, AI systems & digital branding designed to command trust and visibility for ambitious students and founders.
        </motion.p>

        {/* Micro Trust Price Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: d + 2.0, ease: 'easeOut' }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            borderRadius: 9999,
            background: 'rgba(139, 92, 246, 0.08)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            marginBottom: 36,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#8B5CF6', boxShadow: '0 0 8px #8B5CF6' }}></span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'rgba(255, 255, 255, 0.85)',
              textTransform: 'uppercase',
            }}
          >
            Systems Starting from ₹999
          </span>
        </motion.div>

        {/* Dual CTAs area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: d + 2.4, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {/* Thin vertical line */}
          <div
            style={{
              width: 1,
              height: 32,
              background: 'linear-gradient(to bottom, transparent, rgba(139,92,246,0.2))',
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 18,
            }}
          >
            {/* Primary CTA: BUILD MY IDENTITY */}
            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              <motion.span
                animate={{ opacity: bracketsVisible1 ? 1 : 0, x: bracketsVisible1 ? 0 : 6 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: 10,
                  color: '#22c55e',
                  marginRight: 4,
                  userSelect: 'none',
                }}
              >
                [
              </motion.span>

              <motion.a
                href="https://wa.me/+918778848565?text=Hi%20Anvora,%20I%20want%20to%20build%20my%20digital%20authority."
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.97 }}
                onClick={() => audioEngine.playClick()}
                onMouseEnter={() => {
                  setBracketsVisible1(true);
                  audioEngine.playHover();
                }}
                onMouseLeave={() => setBracketsVisible1(false)}
                style={{
                  display: 'inline-block',
                  fontFamily: "'Satoshi', 'Inter', sans-serif",
                  fontSize: 9,
                  letterSpacing: '0.25em',
                  color: '#ffffff',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  padding: '12px 28px',
                  border: '1px solid rgba(34, 197, 94, 0.4)',
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.06) 0%, rgba(139,92,246,0.04) 100%)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(34,197,94,0.05)',
                }}
              >
                BUILD MY IDENTITY
              </motion.a>

              <motion.span
                animate={{ opacity: bracketsVisible1 ? 1 : 0, x: bracketsVisible1 ? 0 : -6 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: 10,
                  color: '#22c55e',
                  marginLeft: 4,
                  userSelect: 'none',
                }}
              >
                ]
              </motion.span>
            </div>

            {/* Secondary CTA: VIEW SYSTEMS */}
            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              <motion.span
                animate={{ opacity: bracketsVisible2 ? 1 : 0, x: bracketsVisible2 ? 0 : 6 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: 10,
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginRight: 4,
                  userSelect: 'none',
                }}
              >
                [
              </motion.span>

              <motion.a
                href="#signals"
                whileTap={{ scale: 0.97 }}
                onClick={() => audioEngine.playClick()}
                onMouseEnter={() => {
                  setBracketsVisible2(true);
                  audioEngine.playHover();
                }}
                onMouseLeave={() => setBracketsVisible2(false)}
                style={{
                  display: 'inline-block',
                  fontFamily: "'Satoshi', 'Inter', sans-serif",
                  fontSize: 9,
                  letterSpacing: '0.25em',
                  color: 'rgba(240,242,248,0.5)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  padding: '12px 28px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.01)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                VIEW SYSTEMS
              </motion.a>

              <motion.span
                animate={{ opacity: bracketsVisible2 ? 1 : 0, x: bracketsVisible2 ? 0 : -6 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: 10,
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginLeft: 4,
                  userSelect: 'none',
                }}
              >
                ]
              </motion.span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 3.0, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <p
          style={{
            fontFamily: "'Satoshi', 'Inter', sans-serif",
            fontSize: 7,
            letterSpacing: '0.25em',
            color: 'rgba(240,242,248,0.18)',
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          SCROLL
        </p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1,
            height: 24,
            background: 'linear-gradient(to bottom, rgba(139,92,246,0.5), transparent)',
          }}
        />
      </motion.div>

      {/* Keyframes */}
      <style>{`
        @keyframes hero-spin1 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes hero-spin2 {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  );
};
