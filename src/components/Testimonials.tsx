import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
    {
        quote: "Anvora didn't build us a website. They engineered our presence.",
        author: 'Sarah Jenkins',
        role: 'CEO, Horizon Ventures',
    },
    {
        quote: "I was skeptical about cinematic design until I saw the first draft. It felt like watching a film about my own business.",
        author: 'David Chen',
        role: 'Founder, Chen Dynamics',
    },
    {
        quote: "Fast. Precise. Impossible to ignore. If you want to stand out, this is where you start.",
        author: 'Marcus Reid',
        role: 'Creative Director, 1M+ Reach',
    },
];

export const Testimonials: React.FC = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const iv = setInterval(() => setIndex((p) => (p + 1) % TESTIMONIALS.length), 5000);
        return () => clearInterval(iv);
    }, []);

    return (
        <section
            className="grain"
            style={{
                padding: '8rem 0',
                background: 'var(--c-void)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Ambient glow */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: 600, height: 600, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 65%)',
                    pointerEvents: 'none',
                }}
            />

            <div
                style={{
                    maxWidth: '56rem',
                    margin: '0 auto',
                    padding: '0 1.5rem',
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                }}
            >
                {/* Quote area */}
                <div style={{ position: 'relative', minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            style={{ position: 'absolute', width: '100%' }}
                        >
                            {/* Decorative quote mark */}
                            <span
                                style={{
                                    display: 'block',
                                    fontFamily: 'Georgia, serif',
                                    fontSize: '3rem',
                                    lineHeight: 1,
                                    color: 'rgba(139,92,246,0.35)',
                                    marginBottom: '0.75rem',
                                    userSelect: 'none',
                                }}
                                aria-hidden="true"
                            >
                                ❝
                            </span>

                            {/* Quote text */}
                            <h3
                                style={{
                                    fontFamily: "'Satoshi','Inter',sans-serif",
                                    fontWeight: 300,
                                    fontSize: 'clamp(1.4rem,3.5vw,2.8rem)',
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1.3,
                                    color: '#ffffff',
                                    margin: '0 0 2rem',
                                }}
                            >
                                {TESTIMONIALS[index].quote}
                            </h3>

                            {/* Author */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                <span style={{ fontFamily: "'Satoshi','Inter',sans-serif", fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ffffff' }}>
                                    {TESTIMONIALS[index].author}
                                </span>
                                <span style={{ fontFamily: "'Satoshi','Inter',sans-serif", fontWeight: 400, fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                                    {TESTIMONIALS[index].role}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: '2.5rem' }}>
                    {TESTIMONIALS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                            style={{
                                width: 28,
                                height: 1.5,
                                background: i === index ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.1)',
                                border: 'none',
                                padding: '6px 0',
                                cursor: 'pointer',
                                boxSizing: 'content-box',
                                transition: 'background 0.3s',
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
