
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
    showIntro?: boolean;
}

export const Hero = ({ showIntro = false }: HeroProps) => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

    // Cinematic delay offsets — after loading screen exits
    const baseDelay = showIntro ? 0.3 : 0;

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-anvora-black">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Cinematic Gradient Base — fades in */}
                <motion.div
                    className="absolute inset-0 bg-gradient-hero"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 1.5, delay: baseDelay, ease: "easeOut" }}
                />

                {/* Moving Light Beams */}
                <motion.div
                    className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full blur-[150px]"
                    style={{ background: "hsl(243 80% 55% / 0.1)" }}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0, 0.3, 0.5, 0.3],
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: baseDelay }}
                />
                <motion.div
                    className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px]"
                    style={{ background: "hsl(42 92% 55% / 0.05)" }}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0, 0.2, 0.4, 0.2],
                        scale: [1, 1.1, 1],
                        x: [0, -20, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: baseDelay }}
                />

                {/* Grid Overlay */}
                <motion.div
                    className="absolute inset-0 opacity-0"
                    animate={{ opacity: 0.03 }}
                    transition={{ duration: 2, delay: baseDelay + 0.5 }}
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '100px 100px'
                    }}
                />

                {/* Enhanced Particles */}
                <motion.div style={{ y: y1 }} className="absolute inset-0">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white rounded-full"
                            style={{
                                width: Math.random() * 2 + 1 + 'px',
                                height: Math.random() * 2 + 1 + 'px',
                                top: Math.random() * 100 + '%',
                                left: Math.random() * 100 + '%',
                                filter: `blur(${Math.random() * 1}px)`
                            }}
                            animate={{
                                y: [0, Math.random() * -100 - 50],
                                opacity: [0, 0.5, 0]
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                ease: "linear",
                                delay: baseDelay + 1 + Math.random() * 10
                            }}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Content — Camera push-forward feel via scale */}
            <motion.div
                className="relative z-10 text-center px-4 max-w-5xl mx-auto"
                style={{ opacity, scale }}
                initial={{ scale: 1.06, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.8, delay: baseDelay, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="mb-8 flex items-center justify-center gap-4">
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 80, opacity: 1 }}
                        transition={{ duration: 1.5, delay: baseDelay + 0.5, ease: "easeOut" }}
                        className="h-[1px] bg-gradient-to-r from-transparent via-anvora-gold to-transparent"
                    />
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: "0.5em" }}
                        animate={{ opacity: 1, letterSpacing: "0.3em" }}
                        transition={{ duration: 1.5, delay: baseDelay + 0.5, ease: "easeOut" }}
                        className="text-anvora-gold text-xs md:text-sm font-medium uppercase tracking-[0.3em]"
                    >
                        Welcome to the Future
                    </motion.span>
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 80, opacity: 1 }}
                        transition={{ duration: 1.5, delay: baseDelay + 0.5, ease: "easeOut" }}
                        className="h-[1px] bg-gradient-to-r from-transparent via-anvora-gold to-transparent"
                    />
                </div>

                {/* Phase 2 — Headline with blur-to-sharp reveal */}
                <motion.h1
                    className="text-4xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.9] tracking-tighter mb-8"
                    style={{ color: "hsl(0 0% 100%)" }}
                    initial={{ y: 8, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, delay: baseDelay + 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    {"Build Bold.".split("").map((char, i) => (
                        <motion.span
                            key={`a-${i}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: baseDelay + 0.6 + i * 0.03, duration: 0.3 }}
                        >
                            {char}
                        </motion.span>
                    ))}
                    <br />
                    <span className="text-gradient-cinematic relative inline-block">
                        {"Rise Digital.".split("").map((char, i) => (
                            <motion.span
                                key={`b-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: baseDelay + 0.9 + i * 0.03, duration: 0.3 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                        <motion.div
                            className="absolute -inset-1 blur-xl rounded-full"
                            style={{ background: "hsl(243 80% 55% / 0.2)" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: baseDelay + 1.5, duration: 1 }}
                        />
                    </span>
                </motion.h1>

                {/* Phase 3 — Subtext */}
                <motion.p
                    className="text-lg md:text-2xl max-w-3xl mx-auto mb-16 font-light leading-relaxed"
                    style={{ color: "hsl(0 0% 100% / 0.55)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: baseDelay + 1.2, ease: "easeOut" }}
                >
                    We engineer digital presence. <br />
                    <span style={{ color: "hsl(0 0% 100% / 0.7)" }}>Not templates. Not noise. Real impact.</span> <br />
                    Built for those who refuse to be ignored.
                </motion.p>

                {/* Phase 4 — CTA */}
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: baseDelay + 1.6, ease: "easeOut" }}
                >
                    <motion.a
                        href="https://wa.me/+918778848565?text=Hi%20Anvora,%20I%20want%20to%20start%20my%20project"
                        target="_blank"
                        rel="noreferrer"
                        className="group relative px-10 py-5 bg-white rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-4 overflow-hidden"
                        style={{
                            color: "hsl(var(--anvora-black))",
                            boxShadow: "0 0 30px rgba(255,255,255,0.1)"
                        }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 50px rgba(255,255,255,0.3)"
                        }}
                    >
                        <span className="relative z-10">Start Your Project</span>
                        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12" />
                    </motion.a>

                    {/* Single glow pulse on CTA after entry */}
                    <motion.div
                        className="absolute -inset-2 rounded-full pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ delay: baseDelay + 2.0, duration: 1.2, ease: "easeOut" }}
                        style={{ boxShadow: "0 0 40px 10px hsl(0 0% 100% / 0.15)" }}
                    />
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: baseDelay + 2.2, duration: 1 }}
            >
                <div className="w-[1px] h-24 relative overflow-hidden" style={{ background: "hsl(0 0% 100% / 0.08)" }}>
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/2 bg-anvora-gold"
                        animate={{ y: [0, 96, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </section>
    );
};
