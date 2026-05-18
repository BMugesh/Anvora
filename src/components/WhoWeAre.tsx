import { useRef } from 'react';
import { motion, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const stats = [
    { label: 'Projects Delivered', value: 3,   suffix: '+' },
    { label: 'Active Builds',      value: 3,   suffix: ''  },
    { label: 'Client Satisfaction', value: 100, suffix: '%' },
];

const AnimatedCounter = ({
    value, suffix, trigger,
}: { value: number; suffix: string; trigger: boolean }) => {
    const mv = useMotionValue(0);
    const spring = useSpring(mv, { damping: 40, stiffness: 80 });
    const rounded = useTransform(spring, (v) => Math.round(v));
    useEffect(() => { if (trigger) mv.set(value); }, [trigger, value, mv]);

    return (
        <span className="font-display font-bold text-4xl md:text-5xl" style={{ color: 'var(--c-white)' }}>
            <motion.span>{rounded}</motion.span>{suffix}
        </span>
    );
};

const pillars = [
    {
        n: '01',
        title: 'Perception Engineering',
        body: 'We shape how people feel the moment they arrive. Every pixel, every pause — intentional.',
    },
    {
        n: '02',
        title: 'Identity Systems',
        body: 'Cohesive visual languages that scale. Not a logo. An architecture of recognition.',
    },
    {
        n: '03',
        title: 'Motion Intelligence',
        body: 'Animation as communication. Every transition carries meaning. Nothing moves by accident.',
    },
];

export const WhoWeAre = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-25%' });

    return (
        <section id="about" className="relative py-32 overflow-hidden grain" style={{ background: 'var(--c-abyss)' }}>
            {/* Subtle side accent */}
            <div
                className="absolute left-0 top-0 bottom-0 w-[1px]"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(124,58,237,0.25) 40%, rgba(124,58,237,0.25) 60%, transparent)' }}
            />

            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-3xl mb-20"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-[1px]" style={{ background: 'var(--c-violet-soft)' }} />
                        <span className="section-label">The Studio</span>
                    </div>
                    <h2
                        className="font-display font-extrabold leading-[0.92] tracking-tight mb-8"
                        style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: 'var(--c-white)' }}
                    >
                        NOT BUILT<br />
                        <span className="text-grad-cinematic">TO BLEND IN.</span>
                    </h2>
                    <p
                        className="font-body font-light leading-relaxed max-w-xl"
                        style={{ fontSize: '1.0625rem', color: 'var(--c-muted)' }}
                    >
                        Late nights. No investors. Just skill and intent. We architect digital authority
                        for startups, creators, and ambitious brands who know presence is everything.
                    </p>
                </motion.div>

                {/* Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-20" style={{ background: 'var(--c-border)' }}>
                    {pillars.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            className="relative p-8 group"
                            style={{ background: 'var(--c-abyss)' }}
                        >
                            {/* Hover accent */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: 'rgba(124,58,237,0.03)' }}
                            />
                            <span
                                className="font-display font-bold text-5xl mb-6 block"
                                style={{ color: 'rgba(124,58,237,0.15)', lineHeight: 1 }}
                            >
                                {p.n}
                            </span>
                            <h3
                                className="font-display font-semibold mb-3"
                                style={{ fontSize: '1.1rem', color: 'var(--c-white)' }}
                            >
                                {p.title}
                            </h3>
                            <p
                                className="font-body font-light leading-relaxed"
                                style={{ fontSize: '0.9375rem', color: 'var(--c-muted)' }}
                            >
                                {p.body}
                            </p>
                            {/* Bottom accent line on hover */}
                            <div
                                className="absolute bottom-0 left-8 right-8 h-[1px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                                style={{ background: 'rgba(124,58,237,0.4)' }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-top-subtle pt-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                            className="flex flex-col gap-1"
                        >
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} trigger={inView} />
                            <p
                                className="font-body text-[11px] tracking-[0.15em] uppercase"
                                style={{ color: 'var(--c-dim)' }}
                            >
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
