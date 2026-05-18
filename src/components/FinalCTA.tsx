import { motion } from 'framer-motion';

export const FinalCTA = () => {
    return (
        <section id="contact" className="relative py-40 overflow-hidden flex items-center justify-center grain" style={{ background: 'var(--c-void)' }}>
            
            {/* Ambient lighting */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, rgba(124,58,237,0.1) 0%, transparent 70%)' }}
            />
            
            {/* Bottom edge glow */}
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }} />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[400px] blur-[100px] pointer-events-none" style={{ background: 'rgba(124,58,237,0.1)' }} />

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="font-display font-extrabold tracking-tight leading-[0.92] mb-8 text-white uppercase" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}>
                        BEGIN AN<br />
                        <span className="text-grad-cinematic">AUTHORITY BUILD</span>
                    </h2>
                    
                    <p className="font-body font-light text-muted-cin max-w-xl mx-auto mb-16 text-lg">
                        You're not looking for a website. You're looking for an unfair advantage. Tell us your intent, and we'll engineer the system.
                    </p>

                    <div className="flex flex-col items-center gap-8 relative z-10">
                        {/* Outer rotating glow ring behind button */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] pointer-events-none opacity-20">
                            <div className="w-full h-full rounded-full border border-violet border-t-transparent animate-spin-slow" />
                        </div>
                        
                        <a
                            href="https://wa.me/+918778848565?text=Hi%20Anvora,%20I%20am%20ready%20to%20begin%20an%20authority%20build"
                            target="_blank"
                            rel="noreferrer"
                            className="relative overflow-hidden group flex items-center justify-center px-12 py-5 bg-white text-black font-display font-bold text-sm tracking-[0.15em] uppercase rounded-sm transition-all duration-500 hover:scale-105 hover:text-white"
                            data-magnetic
                        >
                            <span className="relative z-10">Initiate Sequence</span>
                            <div className="absolute inset-0 bg-violet translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                            <div className="absolute inset-0 shadow-[0_0_40px_rgba(255,255,255,0.4)] group-hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] transition-shadow duration-500" />
                        </a>
                        
                        <span className="font-body text-[9px] tracking-[0.3em] uppercase text-dim-cin">
                            Global Edge Deployment // Systems Active
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
