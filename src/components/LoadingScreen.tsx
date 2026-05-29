import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const PHASES = [
  'ENTERING THE VOID',
  'CALIBRATING SIGNAL',
  'BUILDING PRESENCE',
  'SYSTEM ONLINE',
];

const TOTAL_DURATION = 3200;
const COMPLETE_DELAY = 400;
const HARD_CAP = 6000;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const startTime = useRef<number>(Date.now());
  const rafRef = useRef<number | null>(null);
  const hardCapRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completeRef = useRef(false);

  const triggerComplete = () => {
    if (completeRef.current) return;
    completeRef.current = true;
    setExiting(true);
    setTimeout(() => {
      onComplete();
    }, COMPLETE_DELAY);
  };

  useEffect(() => {
    hardCapRef.current = setTimeout(triggerComplete, HARD_CAP);

    const animate = () => {
      const elapsed = Date.now() - startTime.current;
      const raw = Math.min(elapsed / TOTAL_DURATION, 1);
      // easeInOutCubic
      const eased =
        raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
      const pct = Math.round(eased * 100);
      setProgress(pct);

      const phaseAt = Math.floor(raw * PHASES.length);
      setPhaseIndex(Math.min(phaseAt, PHASES.length - 1));

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(triggerComplete, COMPLETE_DELAY);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (hardCapRef.current !== null) clearTimeout(hardCapRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#050816',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            fontFamily: "'Satoshi', 'Inter', sans-serif",
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

          {/* Corner decorations */}
          {/* Top-left */}
          <div style={{ position: 'absolute', top: 24, left: 24, zIndex: 3 }}>
            <div style={{ width: 20, height: 1, background: 'rgba(139,92,246,0.4)' }} />
            <div style={{ width: 1, height: 20, background: 'rgba(139,92,246,0.4)', marginTop: -1 }} />
          </div>
          {/* Top-right */}
          <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ width: 20, height: 1, background: 'rgba(139,92,246,0.4)' }} />
            <div style={{ width: 1, height: 20, background: 'rgba(139,92,246,0.4)', marginTop: -1 }} />
          </div>
          {/* Bottom-left */}
          <div style={{ position: 'absolute', bottom: 24, left: 24, zIndex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div style={{ width: 1, height: 20, background: 'rgba(139,92,246,0.4)' }} />
            <div style={{ width: 20, height: 1, background: 'rgba(139,92,246,0.4)', marginTop: -1 }} />
          </div>
          {/* Bottom-right */}
          <div style={{ position: 'absolute', bottom: 24, right: 24, zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <div style={{ width: 1, height: 20, background: 'rgba(139,92,246,0.4)', alignSelf: 'flex-end' }} />
            <div style={{ width: 20, height: 1, background: 'rgba(139,92,246,0.4)', marginTop: -1 }} />
          </div>

          {/* Orbital rings */}
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
            {/* Ring 1 — 30s spin */}
            <div
              style={{
                position: 'absolute',
                width: 520,
                height: 520,
                borderRadius: '50%',
                border: '0.5px solid rgba(139,92,246,0.2)',
                animation: 'ls-spin1 30s linear infinite',
              }}
            />
            {/* Ring 2 — 20s counter-spin */}
            <div
              style={{
                position: 'absolute',
                width: 360,
                height: 360,
                borderRadius: '50%',
                border: '0.5px solid rgba(124,58,237,0.25)',
                animation: 'ls-spin2 20s linear infinite',
              }}
            />
            {/* Ring 3 — 15s spin */}
            <div
              style={{
                position: 'absolute',
                width: 220,
                height: 220,
                borderRadius: '50%',
                border: '1px solid rgba(6,182,212,0.15)',
                animation: 'ls-spin1 15s linear infinite',
              }}
            />
          </div>

          {/* Radial ambient glow */}
          <div
            style={{
              position: 'absolute',
              width: 600,
              height: 600,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(100,50,200,0.08) 0%, transparent 70%)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />

          {/* Main content */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 32,
            }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(20px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: 90,
                height: 90,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/logo-removebg-preview.png"
                alt="Anvora"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 18px rgba(139,92,246,0.65)) drop-shadow(0 0 40px rgba(139,92,246,0.3))',
                }}
              />
            </motion.div>

            {/* Phase text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={phaseIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                style={{
                  fontFamily: "'Satoshi', 'Inter', sans-serif",
                  fontSize: 9,
                  letterSpacing: '0.3em',
                  color: 'rgba(240,242,248,0.35)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  margin: 0,
                  minWidth: 240,
                  textAlign: 'center',
                }}
              >
                {PHASES[phaseIndex]}
              </motion.p>
            </AnimatePresence>

            {/* Progress bar */}
            <div
              style={{
                width: 240,
                height: 1,
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 1,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, rgba(139,92,246,0.6), rgba(124,58,237,0.9))',
                  boxShadow: '0 0 8px rgba(139,92,246,0.5)',
                  borderRadius: 1,
                  transition: 'width 80ms linear',
                }}
              />
            </div>

            {/* Progress number */}
            <p
              style={{
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: 8,
                letterSpacing: '0.2em',
                color: 'rgba(240,242,248,0.15)',
                margin: '-20px 0 0 0',
                fontWeight: 400,
              }}
            >
              {String(progress).padStart(3, '0')}%
            </p>
          </div>

          {/* Bottom label */}
          <p
            style={{
              position: 'absolute',
              bottom: 28,
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: 8,
              letterSpacing: '0.28em',
              color: 'rgba(240,242,248,0.08)',
              margin: 0,
              whiteSpace: 'nowrap',
              zIndex: 5,
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            ANVORA · CINEMATIC PERCEPTION HOUSE
          </p>

          {/* Keyframes injected via style tag */}
          <style>{`
            @keyframes ls-spin1 {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes ls-spin2 {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }
          `}</style>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
