import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionTemplate } from 'framer-motion';
import { audioEngine } from '../utils/audioEngine';

/**
 * CINEMATIC SEQUENCE — IMAX Edition
 * The Moment of Beauty. The orbital emergence.
 * Faster triggers, same emotional depth.
 */
export const CinematicSequence: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const inViewRef = useRef<HTMLDivElement>(null);
    const inView = useInView(inViewRef, { once: true, margin: '-20%' });
    const soundTriggered = useRef(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Orbital system — appears earlier (was 0.25, now 0.15)
    const orbOpacity = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.75], [0, 0, 0.45, 1]);
    const orbScale   = useTransform(scrollYProgress, [0, 0.45, 0.75],        [0.85, 0.95, 1]);

    // Star point — central glow
    const starOpacity = useTransform(scrollYProgress, [0.25, 0.5, 0.9], [0, 1, 1]);

    // Text reveal — faster (was [0.5, 0.68], now [0.42, 0.56])
    const textOpacity = useTransform(scrollYProgress, [0.42, 0.56, 0.90], [0, 1, 1]);
    const textY       = useTransform(scrollYProgress, [0.42, 0.56], [60, 0]);
    const textBlurPx  = useTransform(scrollYProgress, [0.42, 0.56], [10, 0]);
    const textFilter  = useMotionTemplate`blur(${textBlurPx}px)`;

    // Sub text (faster)
    const subOpacity = useTransform(scrollYProgress, [0.56, 0.68], [0, 1]);

    // Sound on inView
    const triggerSound = useCallback(() => {
        if (!soundTriggered.current) {
            soundTriggered.current = true;
            try { audioEngine.playCinematicMoment?.(); } catch { /* optional */ }
        }
    }, []);

    useEffect(() => {
        if (inView) triggerSound();
    }, [inView, triggerSound]);

    return (
        <div
            ref={containerRef}
            style={{ position: 'relative', minHeight: '150vh', background: 'var(--c-void)' }}
            className="grain"
        >
            <div ref={inViewRef} style={{ position: 'absolute', top: '30%' }} aria-hidden="true" />

            <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                {/* ── ORBITAL SYSTEM ── */}
                <motion.div
                    style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: orbOpacity, scale: orbScale,
                    }}
                >
                    {/* Ring 1 — 1200px, 200s */}
                    <div style={{ position: 'absolute', width: 1200, height: 1200, borderRadius: '50%', border: '0.5px solid rgba(124,58,237,0.12)', animation: 'cinOrbit1 200s linear infinite' }} />
                    {/* Ring 2 — 880px, 150s counter */}
                    <div style={{ position: 'absolute', width: 880, height: 880, borderRadius: '50%', border: '0.5px solid rgba(139,92,246,0.18)', animation: 'cinOrbit2 150s linear infinite' }} />
                    {/* Ring 3 — 580px, 100s */}
                    <div style={{ position: 'absolute', width: 580, height: 580, borderRadius: '50%', border: '1px solid rgba(124,58,237,0.15)', animation: 'cinOrbit1 100s linear infinite' }} />
                    {/* Ring 4 — 360px, 75s counter */}
                    <div style={{ position: 'absolute', width: 360, height: 360, borderRadius: '50%', border: '1px solid rgba(6,182,212,0.1)', animation: 'cinOrbit2 75s linear infinite' }} />

                    {/* Central glow */}
                    <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)' }} />

                    {/* Star point */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            width: 4, height: 4, borderRadius: '50%',
                            background: 'rgba(139,92,246,0.9)',
                            opacity: starOpacity,
                            boxShadow: '0 0 12px 4px rgba(139,92,246,0.5), 0 0 40px rgba(139,92,246,0.2)',
                        }}
                        animate={{
                            boxShadow: [
                                '0 0 8px 3px rgba(139,92,246,0.3)',
                                '0 0 20px 6px rgba(139,92,246,0.7)',
                                '0 0 8px 3px rgba(139,92,246,0.3)',
                            ],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>

                {/* Ambient atmospheric radial */}
                <motion.div
                    style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(100,50,200,0.055) 0%, transparent 70%)',
                        opacity: orbOpacity,
                    }}
                />

                {/* ── TEXT ── */}
                <motion.div
                    style={{
                        position: 'relative', zIndex: 10,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                        padding: '0 1.5rem',
                        opacity: textOpacity,
                        y: textY,
                        filter: textFilter,
                    }}
                >
                    {/* Thin line above */}
                    <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, rgba(139,92,246,0.4))', marginBottom: '2rem' }} />

                    <h2
                        style={{
                            fontFamily: "'Satoshi','Inter',sans-serif",
                            fontWeight: 300,
                            fontSize: 'clamp(2rem,5vw,4.5rem)',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.12,
                            color: '#ffffff',
                            margin: '0 0 1.5rem',
                        }}
                    >
                        BUILT TO LEAVE
                        <br />
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #F0F2F8 0%, #C4B5FD 45%, #7C3AED 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                fontWeight: 600,
                            }}
                        >
                            A SIGNAL.
                        </span>
                    </h2>

                    {/* Sub-line */}
                    <motion.p
                        style={{
                            fontFamily: "'Satoshi','Inter',sans-serif",
                            fontWeight: 300,
                            fontSize: '0.8rem',
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            color: 'rgba(240,242,248,0.25)',
                            margin: 0,
                            opacity: subOpacity,
                        }}
                    >
                        DESIGNED TO OUTLAST.
                    </motion.p>
                </motion.div>
            </div>

            {/* Keyframes */}
            <style>{`
                @keyframes cinOrbit1 {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes cinOrbit2 {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(-360deg); }
                }
            `}</style>
        </div>
    );
};