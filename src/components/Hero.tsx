import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { audioEngine } from '../utils/audioEngine';

interface HeroProps {
  showIntro?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ showIntro = false }) => {
  const d = showIntro ? 0.2 : 0;
  const sectionRef = useRef<HTMLElement>(null);
  const [bracketsVisible, setBracketsVisible] = useState(false);

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
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.4,
          pointerEvents: 'none',
          zIndex: 1,
        }}
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
          background: 'radial-gradient(circle, rgba(100,50,200,0.06) 0%, transparent 65%)',
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
            border: '0.5px solid rgba(139,92,246,0.25)',
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
            border: '0.5px solid rgba(124,58,237,0.3)',
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
            border: '1px solid rgba(6,182,212,0.2)',
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
            color: 'rgba(240,242,248,0.2)',
            fontWeight: 500,
            textTransform: 'uppercase',
            margin: '0 0 28px 0',
          }}
        >
          ANVORA
        </motion.p>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(14px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: d + 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 28 }}
        >
          <h1
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(3.5rem, 9vw, 8.5rem)',
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
              fontSize: 'clamp(3.5rem, 9vw, 8.5rem)',
              letterSpacing: '-0.03em',
              margin: 0,
              lineHeight: 1.02,
              background: 'linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.55) 100%)',
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
          transition={{ duration: 0.8, delay: d + 1.8, ease: 'easeOut' }}
          style={{
            fontFamily: "'Satoshi', 'Inter', sans-serif",
            fontSize: '0.9375rem',
            color: 'rgba(240,242,248,0.38)',
            letterSpacing: '0.02em',
            maxWidth: 420,
            margin: '0 auto 32px',
            lineHeight: 1.65,
          }}
        >
          We engineer presence that outlasts the moment.
        </motion.p>

        {/* CTA area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: d + 2.5, ease: 'easeOut' }}
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
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1))',
            }}
          />

          {/* CTA Button */}
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
            {/* Left bracket */}
            <motion.span
              animate={{ opacity: bracketsVisible ? 1 : 0, x: bracketsVisible ? 0 : 6 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: 10,
                color: 'rgba(139,92,246,0.7)',
                marginRight: 4,
                letterSpacing: 0,
                userSelect: 'none',
              }}
            >
              [
            </motion.span>

            <motion.a
              href="#about"
              whileTap={{ scale: 0.97 }}
              onClick={() => audioEngine.playClick()}
              onMouseEnter={() => {
                setBracketsVisible(true);
                audioEngine.playHover();
              }}
              onMouseLeave={() => setBracketsVisible(false)}
              style={{
                display: 'inline-block',
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: 9,
                letterSpacing: '0.28em',
                color: 'rgba(240,242,248,0.7)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                fontWeight: 500,
                padding: '10px 24px',
                border: '0.5px solid rgba(255,255,255,0.1)',
                borderRadius: 2,
                background: 'rgba(139,92,246,0.04)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
              }}
              onMouseEnterCapture={() => {
                setBracketsVisible(true);
              }}
            >
              ENTER SYSTEM
            </motion.a>

            {/* Right bracket */}
            <motion.span
              animate={{ opacity: bracketsVisible ? 1 : 0, x: bracketsVisible ? 0 : -6 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: 10,
                color: 'rgba(139,92,246,0.7)',
                marginLeft: 4,
                letterSpacing: 0,
                userSelect: 'none',
              }}
            >
              ]
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 3.2, duration: 1 }}
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
