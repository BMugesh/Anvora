import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STEPS = [
    {
        num: '01',
        title: 'SIGNAL',
        desc: 'We extract your core intent. No fluff. Just the raw signal of what makes your brand dangerous. We define the narrative architecture.',
    },
    {
        num: '02',
        title: 'STRUCTURE',
        desc: 'Wireframes morph into high-fidelity UI. Engineered for impact. Every interaction is designed to hold attention and project authority.',
    },
    {
        num: '03',
        title: 'DEPLOYMENT',
        desc: 'We launch your system to a global edge network. Fast, secure, and dominant. You don\'t just go live; you take space.',
    },
];

export const HowItWorks = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const yMove = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section
            id="process"
            ref={containerRef}
            className="py-32 relative overflow-hidden grain"
            style={{ background: 'var(--c-void)' }}
        >
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-[1px]" style={{ background: 'var(--c-violet-soft)' }} />
                        <span className="section-label">Architecture Protocol</span>
                    </div>
                    <h2
                        className="font-display font-extrabold leading-[0.92] tracking-tight text-grad-cinematic"
                        style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
                    >
                        THE BUILD
                    </h2>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    {/* Connecting line (desktop) */}
                    <div
                        className="hidden md:block absolute top-[40px] left-8 right-8 h-[1px]"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.2) 10%, rgba(124,58,237,0.2) 90%, transparent)',
                        }}
                    />

                    {STEPS.map((step, i) => (
                        <motion.div
                            key={i}
                            className="relative group pt-6 md:pt-0"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10%' }}
                            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="card-cinematic p-8 h-full flex flex-col relative z-10">
                                {/* Node dot */}
                                <div
                                    className="absolute -top-[5px] md:-top-[45px] left-8 w-[11px] h-[11px] rounded-full z-20 transition-all duration-500"
                                    style={{ background: 'var(--c-void)', border: '2px solid rgba(139,92,246,0.5)' }}
                                />
                                <div
                                    className="absolute -top-[5px] md:-top-[45px] left-8 w-[11px] h-[11px] rounded-full z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150"
                                    style={{ background: 'rgba(124,58,237,0.8)', boxShadow: '0 0 20px rgba(124,58,237,0.6)' }}
                                />

                                {/* Content */}
                                <div className="mb-12">
                                    <span
                                        className="font-body text-[10px] tracking-[0.2em] uppercase block mb-4"
                                        style={{ color: 'var(--c-dim)' }}
                                    >
                                        PHASE {step.num}
                                    </span>
                                    <h3
                                        className="font-display font-bold text-2xl tracking-tight transition-colors duration-300"
                                        style={{ color: 'var(--c-white)' }}
                                    >
                                        <span className="group-hover:text-grad-violet inline-block transition-all duration-300">
                                            {step.title}
                                        </span>
                                    </h3>
                                </div>
                                <p
                                    className="font-body font-light leading-relaxed mt-auto"
                                    style={{ fontSize: '0.9375rem', color: 'var(--c-muted)' }}
                                >
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Cinematic abstract shape */}
            <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-[0.03]"
                style={{ y: yMove }}
            >
                <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slower">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#fff" strokeWidth="0.2" strokeDasharray="1 2" />
                    <rect x="25" y="25" width="50" height="50" fill="none" stroke="#fff" strokeWidth="0.2" transform="rotate(45 50 50)" />
                </svg>
            </motion.div>
        </section>
    );
};
