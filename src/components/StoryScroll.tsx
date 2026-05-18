import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PROBLEM_SCENES = [
    {
        headline: 'STATIC.',
        sub: 'It loads. It sits there. It does nothing.',
        accent: 'rgba(239,68,68,0.6)',
    },
    {
        headline: 'BORING.',
        sub: 'Every template looks the same. Nobody remembers you.',
        accent: 'rgba(234,179,8,0.5)',
    },
    {
        headline: 'INVISIBLE.',
        sub: 'Most websites disappear. They don\'t build presence. They vanish.',
        accent: 'rgba(248,250,252,0.25)',
    },
];

const SOLUTION_LINES = [
    { text: 'WE BUILD AUTHORITY.',   delay: 0 },
    { text: 'WE DESIGN PERCEPTION.', delay: 0 },
    { text: 'WE ENGINEER SYSTEMS.',  delay: 0 },
];

export const StoryScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // ── Problem scenes ──────────────────────────────────────
    const p0Opacity = useTransform(scrollYProgress, [0.00, 0.04, 0.10, 0.14], [0, 1, 1, 0]);
    const p1Opacity = useTransform(scrollYProgress, [0.16, 0.20, 0.26, 0.30], [0, 1, 1, 0]);
    const p2Opacity = useTransform(scrollYProgress, [0.32, 0.36, 0.42, 0.46], [0, 1, 1, 0]);

    const p0Scale = useTransform(scrollYProgress, [0.00, 0.14], [0.88, 1.06]);
    const p1Y     = useTransform(scrollYProgress, [0.16, 0.30], [40, -40]);
    const p2Blur  = useTransform(scrollYProgress, [0.32, 0.38, 0.42, 0.46], [8, 0, 0, 8]);

    // ── Transition bar ──────────────────────────────────────
    const transOpacity = useTransform(scrollYProgress, [0.47, 0.52, 0.56, 0.60], [0, 1, 1, 0]);
    const transScaleX  = useTransform(scrollYProgress, [0.47, 0.56], [0, 1]);

    // ── Solution lines ──────────────────────────────────────
    const s0Opacity = useTransform(scrollYProgress, [0.60, 0.65, 0.95, 1.0], [0, 1, 1, 1]);
    const s1Opacity = useTransform(scrollYProgress, [0.68, 0.73, 0.95, 1.0], [0, 1, 1, 1]);
    const s2Opacity = useTransform(scrollYProgress, [0.76, 0.82, 0.95, 1.0], [0, 1, 1, 1]);
    const s0X = useTransform(scrollYProgress, [0.60, 0.68], [-60, 0]);
    const s1X = useTransform(scrollYProgress, [0.68, 0.76], [-60, 0]);
    const s2X = useTransform(scrollYProgress, [0.76, 0.84], [-60, 0]);
    const s2Glow = useTransform(
        scrollYProgress,
        [0.76, 1.0],
        ['0 0 0px rgba(139,92,246,0)', '0 0 80px rgba(139,92,246,0.35)']
    );

    // ── Background ──────────────────────────────────────────
    const bgOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 0.12]);

    return (
        <section
            ref={containerRef}
            className="relative h-[1000vh] grain"
            style={{ background: 'var(--c-void)' }}
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Background violet glow appears in solution phase */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        opacity: bgOpacity,
                        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,1) 0%, transparent 70%)',
                    }}
                />

                {/* Fine grid */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px',
                        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
                    }}
                />

                {/* ── PROBLEM SCENES ────────────────────────────── */}
                {/* Scene 0 */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                    style={{ opacity: p0Opacity, scale: p0Scale }}
                >
                    <p
                        className="font-body text-[10px] tracking-[0.35em] uppercase mb-6"
                        style={{ color: 'rgba(239,68,68,0.5)' }}
                    >
                        THE PROBLEM
                    </p>
                    <h2
                        className="font-display font-black leading-none tracking-tight"
                        style={{
                            fontSize: 'clamp(5rem, 14vw, 14rem)',
                            color: 'rgba(248,250,252,0.9)',
                            letterSpacing: '-0.04em',
                        }}
                    >
                        STATIC.
                    </h2>
                    <p
                        className="font-body font-light mt-6 max-w-sm"
                        style={{ fontSize: '1.0625rem', color: 'var(--c-muted)' }}
                    >
                        It loads. It sits there. It does nothing.
                    </p>
                    {/* Red bar */}
                    <motion.div
                        className="mt-8 h-[2px] rounded-full"
                        style={{
                            background: 'rgba(239,68,68,0.7)',
                            boxShadow: '0 0 20px rgba(239,68,68,0.4)',
                            width: '60px',
                        }}
                    />
                </motion.div>

                {/* Scene 1 */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                    style={{ opacity: p1Opacity, y: p1Y }}
                >
                    <h2
                        className="font-display font-black leading-none tracking-tight"
                        style={{
                            fontSize: 'clamp(5rem, 14vw, 14rem)',
                            color: 'rgba(248,250,252,0.85)',
                            letterSpacing: '-0.04em',
                        }}
                    >
                        BORING.
                    </h2>
                    <p
                        className="font-body font-light mt-6 max-w-sm"
                        style={{ fontSize: '1.0625rem', color: 'var(--c-muted)' }}
                    >
                        Every template looks the same. Nobody remembers you.
                    </p>
                </motion.div>

                {/* Scene 2 */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                    style={{
                        opacity: p2Opacity,
                        filter: p2Blur.get() !== undefined
                            ? `blur(${p2Blur.get()}px)`
                            : undefined,
                    }}
                >
                    <h2
                        className="font-display font-black leading-none tracking-tight"
                        style={{
                            fontSize: 'clamp(4.5rem, 12vw, 12rem)',
                            letterSpacing: '-0.04em',
                            color: 'rgba(248,250,252,0.6)',
                        }}
                    >
                        INVISIBLE.
                    </h2>
                    <p
                        className="font-body font-light mt-6 max-w-md"
                        style={{ fontSize: '1.0625rem', color: 'var(--c-dim)' }}
                    >
                        Most websites don't build presence. They disappear.
                    </p>
                </motion.div>

                {/* ── TRANSITION BAR ──────────────────────────── */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ opacity: transOpacity }}
                >
                    <motion.div
                        className="h-[1px] rounded-full"
                        style={{
                            scaleX: transScaleX,
                            background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.6) 50%, transparent)',
                            width: '50vw',
                            transformOrigin: 'left',
                        }}
                    />
                </motion.div>

                {/* ── SOLUTION LINES ──────────────────────────── */}
                <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-20 gap-4 md:gap-6">
                    {[
                        { o: s0Opacity, x: s0X, text: 'WE BUILD AUTHORITY.', color: 'rgba(248,250,252,0.5)', size: 'clamp(1.75rem, 4.5vw, 4.5rem)' },
                        { o: s1Opacity, x: s1X, text: 'WE DESIGN PERCEPTION.', color: 'rgba(248,250,252,0.75)', size: 'clamp(2rem, 5vw, 5rem)' },
                        { o: s2Opacity, x: s2X, text: 'WE ENGINEER SYSTEMS.', color: 'var(--c-white)', size: 'clamp(2.25rem, 5.5vw, 5.5rem)', glow: s2Glow },
                    ].map(({ o, x, text, color, size, glow }, i) => (
                        <motion.h2
                            key={i}
                            className="font-display font-extrabold leading-none tracking-tight"
                            style={{
                                opacity: o,
                                x,
                                color,
                                fontSize: size,
                                letterSpacing: '-0.03em',
                                textShadow: glow as any,
                            }}
                        >
                            {text}
                        </motion.h2>
                    ))}
                </div>
            </div>
        </section>
    );
};
