import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const SYSTEMS = [
    {
        title: "HealthPulse",
        metric: "+240% Engagement",
        desc: "A complete structural overhaul of a legacy healthcare platform. We engineered a clinical yet inviting interface, focusing on trust signals and patient flow.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
        status: "LIVE",
        link: "https://health-care-eta-liard.vercel.app/"
    },
    {
        title: "Akshaya Akademics",
        metric: "Global Scaling",
        desc: "An authority-driven admissions portal designed to project elite institutional credibility. Heavy emphasis on typographic hierarchy and calm pacing.",
        image: "/akshaya-logo.png",
        status: "IN BUILD",
        link: "#"
    }
];

export const Portfolio = () => {
    return (
        <section id="work" className="py-32 bg-abyss relative overflow-hidden grain">
            {/* Fine horizontal scanning lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-bottom-subtle pb-8"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-[1px]" style={{ background: 'var(--c-violet-soft)' }} />
                            <span className="section-label">Selected Systems</span>
                        </div>
                        <h2
                            className="font-display font-extrabold leading-[0.92] tracking-tight"
                            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--c-white)' }}
                        >
                            DIGITAL<br />TRANSFORMATIONS
                        </h2>
                    </div>
                    <p className="font-body font-light text-muted-cin max-w-sm text-sm">
                        These are not templates. They are engineered authority systems designed to reshape perception and dominate their respective markets.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-32">
                    {SYSTEMS.map((sys, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-15%" }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            className="group flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
                        >
                            {/* Image side (left on even, right on odd) */}
                            <div className={`w-full lg:w-[55%] ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                                <a
                                    href={sys.link !== '#' ? sys.link : undefined}
                                    target={sys.link !== '#' ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    className="block relative aspect-[4/3] w-full overflow-hidden rounded-sm cursor-none"
                                    data-magnetic
                                >
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                                        style={{ backgroundImage: `url(${sys.image})`, filter: 'grayscale(60%) contrast(1.1)' }}
                                    />
                                    {/* Vignette */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent opacity-80" />
                                    {/* Hover tint */}
                                    <div className="absolute inset-0 bg-[rgba(124,58,237,0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />
                                    
                                    {/* View badge */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full glass-sm flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none">
                                        <span className="font-body text-[10px] tracking-[0.2em] font-medium text-white uppercase">
                                            {sys.link !== '#' ? 'Explore' : 'Locked'}
                                        </span>
                                    </div>
                                </a>
                            </div>

                            {/* Data side */}
                            <div className={`w-full lg:w-[45%] flex flex-col ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="font-body text-[10px] tracking-[0.2em] uppercase text-violet font-semibold border border-[rgba(139,92,246,0.3)] px-3 py-1 rounded-full">
                                        {sys.status}
                                    </span>
                                    <div className="h-[1px] flex-1" style={{ background: 'var(--c-border)' }} />
                                    <span className="font-body text-[10px] tracking-[0.1em] text-cyan-cin font-medium">
                                        {sys.metric}
                                    </span>
                                </div>

                                <h3 className="font-display font-bold text-4xl lg:text-5xl tracking-tight mb-6 text-white group-hover:text-grad-violet transition-colors duration-500">
                                    {sys.title}
                                </h3>

                                <p className="font-body font-light text-muted-cin text-base leading-relaxed mb-10">
                                    {sys.desc}
                                </p>

                                {sys.link !== '#' && (
                                    <a
                                        href={sys.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 text-white font-body text-xs tracking-[0.15em] uppercase font-semibold group/link"
                                        data-magnetic
                                    >
                                        <span className="relative">
                                            View System Architecture
                                            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-violet origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300" />
                                        </span>
                                        <ArrowUpRight className="w-4 h-4 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-hover/link:text-violet transition-all duration-300" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
