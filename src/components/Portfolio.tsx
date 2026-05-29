import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

const SYSTEMS = [
    {
        id: 'CASE 001',
        title: 'HealthPulse',
        category: 'HEALTHCARE PLATFORM',
        metric: '+240% Engagement',
        desc: 'A complete structural overhaul of a legacy healthcare platform. Engineered a clinical yet inviting interface, focusing on trust signals and patient flow architecture.',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
        status: 'LIVE',
        statusColor: 'rgba(52,211,153,0.9)',
        link: 'https://health-care-eta-liard.vercel.app/',
        tags: ['Identity', 'Motion', 'Architecture'],
    },
    {
        id: 'CASE 002',
        title: 'Akshaya Akademics',
        category: 'INSTITUTIONAL AUTHORITY',
        metric: 'Global Scaling',
        desc: 'An authority-driven admissions portal designed to project elite institutional credibility. Heavy emphasis on typographic hierarchy and calm pacing.',
        image: '/akshaya-logo.png',
        status: 'IN BUILD',
        statusColor: 'rgba(251,191,36,0.9)',
        link: '#',
        tags: ['Perception', 'Identity', 'Systems'],
    },
    {
        id: 'CASE 003',
        title: 'CLASSIFIED',
        category: 'UNDISCLOSED CLIENT',
        metric: 'Confidential',
        desc: 'Access restricted. This build is under active development and protected under our client confidentiality protocol. Signal acquired — system in deployment.',
        image: '',
        status: 'CLASSIFIED',
        statusColor: 'rgba(239,68,68,0.9)',
        link: '#',
        tags: ['Authority', 'Signal', 'System'],
    },
];

export const Portfolio: React.FC = () => {
    return (
        <section id="work" className="grain" style={{ padding: '7rem 0', background: 'var(--c-abyss)', position: 'relative', overflow: 'hidden' }}>
            {/* Scanning lines */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.012,
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)',
                }}
            />

            <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative" style={{ zIndex: 1 }}>
                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        display: 'flex', flexDirection: 'column', gap: '1.25rem',
                        marginBottom: '5rem', paddingBottom: '2rem',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}
                >
                    <p style={{ fontFamily: "'Satoshi','Inter',sans-serif", fontWeight: 500, fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
                        Digital Transformation Archive
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <h2
                            style={{ fontFamily: "'Satoshi','Inter',sans-serif", fontWeight: 700, fontSize: 'clamp(2.5rem,6vw,5.5rem)', letterSpacing: '-0.03em', lineHeight: 1, margin: 0, color: '#ffffff' }}
                        >
                            SELECTED<br />SYSTEMS
                        </h2>
                        <p style={{ fontFamily: "'Satoshi','Inter',sans-serif", fontWeight: 300, fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', maxWidth: '32ch', lineHeight: 1.7, margin: 0 }}>
                            These are not templates. Engineered authority systems designed to reshape perception and dominate their markets.
                        </p>
                    </div>
                </motion.div>

                {/* ── Projects ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
                    {SYSTEMS.map((sys, i) => (
                        <motion.div
                            key={sys.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-12%' }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="group"
                            style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', alignItems: 'center' }}
                        >
                            {/* Image + Data — alternate layout */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '2.5rem', alignItems: 'center' }}>

                                {/* Image side */}
                                <div style={{ order: i % 2 !== 0 ? 2 : 1 }}>
                                    <a
                                        href={sys.link !== '#' ? sys.link : undefined}
                                        target={sys.link !== '#' ? '_blank' : undefined}
                                        rel="noopener noreferrer"
                                        style={{ display: 'block', position: 'relative', aspectRatio: '16/10', overflow: 'hidden', cursor: sys.link !== '#' ? 'pointer' : 'default' }}
                                        onMouseEnter={() => audioEngine.playHover()}
                                    >
                                        {/* Image or grid placeholder for CLASSIFIED */}
                                        {sys.image ? (
                                            <div
                                                className="group-hover:scale-[1.04]"
                                                style={{
                                                    position: 'absolute', inset: 0,
                                                    backgroundImage: `url(${sys.image})`,
                                                    backgroundSize: 'cover', backgroundPosition: 'center',
                                                    filter: 'grayscale(50%) contrast(1.15)',
                                                    transition: 'transform 1.2s cubic-bezier(0.22,1,0.36,1)',
                                                }}
                                            />
                                        ) : (
                                            <div style={{
                                                position: 'absolute', inset: 0,
                                                background: 'var(--c-panel)',
                                                backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
                                                backgroundSize: '48px 48px',
                                            }} />
                                        )}

                                        {/* Vignette */}
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top right, rgba(8,13,26,0.75), transparent)', pointerEvents: 'none' }} />

                                        {/* Hover violet overlay */}
                                        <div
                                            className="opacity-0 group-hover:opacity-100"
                                            style={{ position: 'absolute', inset: 0, background: 'rgba(124,58,237,0.18)', mixBlendMode: 'overlay', transition: 'opacity 0.6s', pointerEvents: 'none' }}
                                        />

                                        {/* Status badge */}
                                        <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'center', gap: 6, backdropFilter: 'blur(8px)', background: 'rgba(5,8,22,0.7)', border: '1px solid rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: 2 }}>
                                            <span style={{ width: 4, height: 4, borderRadius: '50%', background: sys.statusColor, flexShrink: 0 }} />
                                            <span style={{ fontFamily: "'Satoshi','Inter',sans-serif", fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: sys.statusColor, fontWeight: 500 }}>{sys.status}</span>
                                        </div>

                                        {/* Center badge on hover */}
                                        <div
                                            className="opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                                            style={{
                                                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                                                width: 80, height: 80, borderRadius: '50%',
                                                background: 'rgba(8,13,26,0.7)', backdropFilter: 'blur(12px)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                transition: 'opacity 0.4s, transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                                            }}
                                        >
                                            <span style={{ fontFamily: "'Satoshi','Inter',sans-serif", fontSize: 8, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', textAlign: 'center' }}>
                                                {sys.status === 'CLASSIFIED' ? 'REDACTED' : sys.link !== '#' ? 'ACCESS\nFILE' : 'LOCKED'}
                                            </span>
                                        </div>
                                    </a>
                                </div>

                                {/* Data side */}
                                <div style={{ order: i % 2 !== 0 ? 1 : 2, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <p style={{ fontFamily: "'Satoshi','Inter',sans-serif", fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', margin: 0 }}>{sys.id}</p>
                                    <p style={{ fontFamily: "'Satoshi','Inter',sans-serif", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--c-violet-soft)', margin: 0 }}>{sys.category}</p>

                                    <h3
                                        className="group-hover:text-grad-cinematic"
                                        style={{ fontFamily: "'Satoshi','Inter',sans-serif", fontWeight: 700, fontSize: 'clamp(2rem,4vw,3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05, color: '#fff', margin: 0, transition: 'all 0.3s' }}
                                    >
                                        {sys.title}
                                    </h3>

                                    {/* Tags */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {sys.tags.map(tag => (
                                            <span key={tag} style={{ fontFamily: "'Satoshi','Inter',sans-serif", fontSize: 8, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)', padding: '3px 8px', borderRadius: 2 }}>{tag}</span>
                                        ))}
                                    </div>

                                    <div style={{ width: 32, height: 1, background: 'rgba(124,58,237,0.4)' }} />

                                    <p style={{ fontFamily: "'Satoshi','Inter',sans-serif", fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                                        {sys.desc}
                                    </p>

                                    {/* CTA */}
                                    {sys.status !== 'CLASSIFIED' && sys.link !== '#' && (
                                        <a
                                            href={sys.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onMouseEnter={() => audioEngine.playHover()}
                                            onClick={() => audioEngine.playClick()}
                                            className="group/link"
                                            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', marginTop: '0.5rem' }}
                                        >
                                            <span style={{ fontFamily: "'Satoshi','Inter',sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', fontWeight: 600, position: 'relative' }}>
                                                ACCESS FILE
                                                <span className="absolute -bottom-1 left-0 w-full h-px bg-violet-500 origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300" />
                                            </span>
                                            <ArrowUpRight size={14} style={{ color: '#fff', transition: 'all 0.25s' }} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-violet-400" />
                                        </a>
                                    )}
                                    {sys.status === 'CLASSIFIED' && (
                                        <p style={{ fontFamily: "'Satoshi','Inter',sans-serif", fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(239,68,68,0.5)', margin: 0 }}>
                                            ▒ ACCESS RESTRICTED
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
