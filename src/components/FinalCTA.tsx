
import { motion } from "framer-motion";

export const FinalCTA = () => {
    return (
        <section id="contact" className="py-32 relative overflow-hidden flex items-center justify-center bg-anvora-black">
            {/* Mesh Background */}
            {/* Mesh Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-anvora-indigo/20 via-black to-anvora-gold/10 opacity-50" />
            <div className="absolute inset-0 z-[1] opacity-[0.05] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
            />

            {/* Spotlight Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-anvora-gold/5 rounded-full blur-[150px] animate-pulse" />

            <motion.div
                className="relative z-10 text-center px-4 md:px-6 max-w-4xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 tracking-tight leading-tight">
                    Ready To Be <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-anvora-gold to-orange-400">
                        Taken Seriously?
                    </span>
                </h2>

                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                    Tell us your idea. We'll engineer the rest.
                </p>

                <div className="flex flex-col items-center gap-6 relative z-10">
                    <motion.div
                        className="absolute inset-0 bg-anvora-gold/20 blur-[50px] rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    <a
                        href="https://wa.me/+918778848565?text=Hi%20Anvora,%20I%20want%20to%20start%20my%20project"
                        target="_blank"
                        rel="noreferrer"
                        className="relative px-12 py-5 bg-white text-anvora-black font-bold text-lg rounded-full overflow-hidden group hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                        <span className="relative z-10">Place Your Order</span>
                        <div className="absolute inset-0 bg-anvora-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Pulse Ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-anvora-gold/0 group-hover:border-anvora-gold/50 group-hover:animate-ping" />
                    </a>
                    <p className="text-sm text-gray-500 font-medium">Fast. Friendly. Professional.</p>
                </div>
            </motion.div>
        </section>
    );
};
