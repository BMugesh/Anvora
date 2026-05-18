import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const TESTIMONIALS = [
    {
        quote: "Anvora didn’t just build a website. They engineered a digital identity that fundamentally changed how clients perceive us. The ROI was immediate.",
        author: "Sarah Jenkins",
        role: "CEO, Horizon Ventures"
    },
    {
        quote: "I was skeptical about 'cinematic' web design until I saw the first draft. It felt like watching a movie trailer for my own business.",
        author: "David Chen",
        role: "Founder, Chen Dynamics"
    },
    {
        quote: "Fast. Professional. And insanely good at what they do. If you want to stand out, you need Anvora.",
        author: "Marcus Aurelius",
        role: "Influencer, 1M+ Followers"
    }
];

export const Testimonials = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-40 bg-void relative overflow-hidden flex items-center justify-center grain">
            {/* Ambient center glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, rgba(124,58,237,0.05) 0%, transparent 60%)' }}
            />

            <div className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center">
                <div className="mb-12">
                    <span className="font-body text-[10px] tracking-[0.3em] uppercase text-violet border border-[rgba(139,92,246,0.2)] px-4 py-2 rounded-full inline-block">
                        Client Perception
                    </span>
                </div>

                <div className="relative h-[280px] md:h-[200px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute w-full"
                        >
                            <h3 className="font-display font-medium text-2xl md:text-4xl leading-tight md:leading-snug tracking-tight text-white mb-10 max-w-3xl mx-auto">
                                "{TESTIMONIALS[index].quote}"
                            </h3>
                            <div className="flex flex-col items-center gap-1">
                                <span className="font-display font-bold text-sm tracking-wide text-white uppercase">
                                    {TESTIMONIALS[index].author}
                                </span>
                                <span className="font-body text-[10px] tracking-[0.1em] text-muted-cin uppercase">
                                    {TESTIMONIALS[index].role}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-3 mt-12">
                    {TESTIMONIALS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className="relative py-2 group"
                            data-magnetic
                            aria-label={`Go to testimonial ${i + 1}`}
                        >
                            <div className={`w-12 h-[2px] transition-all duration-500 rounded-full ${
                                i === index ? 'bg-violet' : 'bg-[rgba(255,255,255,0.1)] group-hover:bg-[rgba(255,255,255,0.3)]'
                            }`} />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};
