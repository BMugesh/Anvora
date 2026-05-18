import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

interface HeroProps {
    showIntro?: boolean;
}

// Cinematic orbital SVG
const OrbitalCore = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Outermost ring */}
        <motion.div
            className="absolute w-[480px] h-[480px] rounded-full"
            style={{ border: '1px solid rgba(124,58,237,0.1)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
            {/* Ring node */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                style={{ background: 'rgba(139,92,246,0.6)', boxShadow: '0 0 10px rgba(139,92,246,0.8)' }}
            />
        </motion.div>

        {/* Middle ring */}
        <motion.div
            className="absolute w-[340px] h-[340px] rounded-full"
            style={{ border: '1px solid rgba(6,182,212,0.08)' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
            <div
                className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                style={{ background: 'rgba(6,182,212,0.5)', boxShadow: '0 0 8px rgba(6,182,212,0.7)' }}
            />
        </motion.div>

        {/* Inner ring */}
        <motion.div
            className="absolute w-[220px] h-[220px] rounded-full"
            style={{ border: '1px solid rgba(124,58,237,0.12)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full"
                style={{ background: 'rgba(139,92,246,0.7)' }}
            />
        </motion.div>

        {/* Core sphere */}
        <motion.div
            className="relative w-28 h-28 rounded-full"
            style={{
                background: 'radial-gradient(circle at 35% 35%, rgba(139,92,246,0.3), rgba(124,58,237,0.08) 60%, transparent)',
                border: '1px solid rgba(139,92,246,0.2)',
                boxShadow: '0 0 60px rgba(124,58,237,0.15), inset 0 0 30px rgba(124,58,237,0.08)',
            }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
            {/* Equator line */}
            <div
                className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2"
                style={{ background: 'rgba(139,92,246,0.15)' }}
            />
            {/* Meridian */}
            <div
                className="absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2"
                style={{ background: 'rgba(6,182,212,0.1)' }}
            />
            {/* Core dot */}
            <div
                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{ background: 'rgba(139,92,246,0.8)', boxShadow: '0 0 20px rgba(139,92,246,0.6)' }}
            />
        </motion.div>

        {/* Signal grid lines */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <motion.div
                key={i}
                className="absolute"
                style={{
                    width: '1px',
                    height: '240px',
                    background: 'linear-gradient(to bottom, transparent, rgba(124,58,237,0.06) 40%, rgba(124,58,237,0.06) 60%, transparent)',
                    transform: `rotate(${deg}deg)`,
                    transformOrigin: 'center',
                }}
            />
        ))}

        {/* Ambient glow */}
        <div
            className="absolute w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(124,58,237,0.06)' }}
        />
    </div>
);

export const Hero = ({ showIntro = false }: HeroProps) => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const y       = useTransform(scrollYProgress, [0, 1],   [0, 120]);

    const d = showIntro ? 0.3 : 0;

    const stagger = (extra: number) => ({
        initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        transition: { duration: 1.1, delay: d + extra, ease: [0.22, 1, 0.36, 1] as const },
    });

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full flex items-center overflow-hidden"
            style={{ background: 'var(--c-void)' }}
        >
            {/* Noise */}
            <div className="noise-overlay" />

            {/* Radial ambient */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 70% 55% at 65% 50%, rgba(124,58,237,0.07) 0%, transparent 70%)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: d }}
            />

            {/* Fine grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                    opacity: 0.4,
                    maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
                }}
            />

            {/* Content */}
            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-24 pb-16"
                style={{ opacity, y }}
            >
                {/* Left — Typography */}
                <div className="flex flex-col gap-8">
                    {/* Studio label */}
                    <motion.div {...stagger(0)} className="flex items-center gap-3">
                        <div className="w-8 h-[1px]" style={{ background: 'var(--c-violet-soft)' }} />
                        <span className="section-label">Cinematic Web Architecture Studio</span>
                    </motion.div>

                    {/* Headline */}
                    <div className="overflow-hidden">
                        <motion.h1
                            className="font-display font-extrabold leading-[0.92] tracking-tight"
                            style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: d + 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span style={{ color: 'var(--c-white)' }}>WE ENGINEER</span>
                            <br />
                            <span
                                className="text-grad-cinematic"
                                style={{ display: 'inline-block' }}
                            >
                                DIGITAL
                            </span>
                            <br />
                            <span style={{ color: 'var(--c-white)' }}>AUTHORITY.</span>
                        </motion.h1>
                    </div>

                    {/* Sub */}
                    <motion.p
                        {...stagger(0.5)}
                        className="font-body font-light leading-relaxed max-w-md"
                        style={{ fontSize: '1.0625rem', color: 'var(--c-muted)' }}
                    >
                        Cinematic websites and identity systems for startups, creators,
                        and brands that refuse to blend in.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        {...stagger(0.7)}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <a
                            href="https://wa.me/+918778848565?text=Hi%20Anvora,%20I%20want%20to%20start%20my%20project"
                            target="_blank"
                            rel="noreferrer"
                            className="btn-primary group"
                            data-magnetic
                        >
                            Initiate Project
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                        <a href="#work" className="btn-ghost" data-magnetic>
                            View Systems
                        </a>
                    </motion.div>

                    {/* Metrics row */}
                    <motion.div
                        {...stagger(0.9)}
                        className="flex items-center gap-8 pt-4 border-top-subtle"
                    >
                        {[
                            { n: '3+',   l: 'Projects Delivered' },
                            { n: '100%', l: 'Client Satisfaction' },
                            { n: '∞',    l: 'Digital Authority' },
                        ].map(({ n, l }) => (
                            <div key={l} className="flex flex-col gap-0.5">
                                <span
                                    className="font-display font-bold text-xl"
                                    style={{ color: 'var(--c-white)' }}
                                >
                                    {n}
                                </span>
                                <span
                                    className="font-body text-[10px] tracking-[0.12em] uppercase"
                                    style={{ color: 'var(--c-dim)' }}
                                >
                                    {l}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right — 3D Orbital */}
                <motion.div
                    className="relative w-full aspect-square max-w-lg mx-auto lg:mx-0 lg:ml-auto"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: d + 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <OrbitalCore />

                    {/* Corner frame decoration */}
                    {[
                        'top-0 left-0 border-t border-l',
                        'top-0 right-0 border-t border-r',
                        'bottom-0 left-0 border-b border-l',
                        'bottom-0 right-0 border-b border-r',
                    ].map((cls, i) => (
                        <motion.div
                            key={i}
                            className={`absolute w-6 h-6 ${cls}`}
                            style={{ borderColor: 'rgba(124,58,237,0.25)' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: d + 0.8 + i * 0.1, duration: 0.6 }}
                        />
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: d + 2, duration: 1 }}
            >
                <div
                    className="w-[1px] h-16 relative overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/3 rounded-full"
                        style={{ background: 'var(--c-violet-soft)' }}
                        animate={{ y: [0, 64, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
                <span
                    className="font-body text-[9px] tracking-[0.3em] uppercase"
                    style={{ color: 'var(--c-dim)' }}
                >
                    SCROLL
                </span>
            </motion.div>
        </section>
    );
};
