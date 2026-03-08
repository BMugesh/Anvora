
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

import { BrandLogo } from './ui/BrandLogo';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-anvora-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 3.5 }} // Delay to match loading screen
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Anvora Logo" className="h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(79,70,229,0.6)]" />
                    <BrandLogo />
                </div>

                {/* Desktop Links (Hidden on mobile for now, can expand later) */}
                <div className="hidden md:flex items-center gap-8">
                    {['Process', 'Work', 'About', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-gray-400 hover:text-anvora-gold transition-colors relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-anvora-gold transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </div>

                {/* CTA Button */}
                <a
                    href="https://wa.me/+918778848565?text=Hi%20Anvora,%20I%20want%20to%20start%20my%20project"
                    target="_blank"
                    rel="noreferrer"
                    className="hidden md:block px-6 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-anvora-gold/50 text-white text-sm font-medium transition-all duration-300"
                >
                    Start Project
                </a>
            </div>
        </motion.nav>
    );
};
