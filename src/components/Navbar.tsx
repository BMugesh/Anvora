import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const NAV_ITEMS = [
    { label: 'Protocol', href: '#process' },
    { label: 'Systems',  href: '#work' },
    { label: 'Studio',   href: '#about' },
    { label: 'Contact',  href: '#contact' },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsScrolled(latest > 60);
    });

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
                    isScrolled
                        ? 'glass border-bottom-subtle py-4'
                        : 'bg-transparent py-6'
                }`}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 3.5 }}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-3 group" data-magnetic>
                        <div className="relative">
                            <img
                                src="/logo-removebg-preview.png"
                                alt="Anvora"
                                className="h-9 w-auto transition-all duration-300 group-hover:opacity-90"
                                style={{ filter: 'drop-shadow(0 0 10px rgba(139,92,246,0.4))' }}
                            />
                        </div>
                        <div className="hidden sm:flex flex-col -gap-0.5">
                            <span
                                className="font-display font-bold text-sm tracking-[0.12em] uppercase leading-none"
                                style={{ color: 'var(--c-white)' }}
                            >
                                ANVORA
                            </span>
                            <span
                                className="font-body text-[9px] tracking-[0.2em] uppercase leading-none"
                                style={{ color: 'var(--c-dim)' }}
                            >
                                WEB ARCHITECTURE STUDIO
                            </span>
                        </div>
                    </a>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="relative font-body text-[11px] font-medium tracking-[0.14em] uppercase transition-colors duration-200 group"
                                style={{ color: 'var(--c-muted)' }}
                                data-magnetic
                            >
                                <span className="group-hover:text-white transition-colors duration-200">
                                    {item.label}
                                </span>
                                <span
                                    className="absolute -bottom-1 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-300"
                                    style={{ background: 'var(--c-violet-soft)' }}
                                />
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    <a
                        href="https://wa.me/+918778848565?text=Hi%20Anvora,%20I%20want%20to%20start%20my%20project"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden md:inline-flex btn-primary text-[11px] py-2.5 px-5"
                        data-magnetic
                    >
                        Initiate Project
                    </a>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`block w-5 h-[1px] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`}
                            style={{ background: 'var(--c-white)' }}
                        />
                        <span
                            className={`block w-5 h-[1px] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
                            style={{ background: 'var(--c-white)' }}
                        />
                        <span
                            className={`block w-5 h-[1px] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}
                            style={{ background: 'var(--c-white)' }}
                        />
                    </button>
                </div>

                {/* Mobile menu */}
                <motion.div
                    initial={false}
                    animate={{ height: mobileOpen ? 'auto' : 0, opacity: mobileOpen ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="md:hidden overflow-hidden glass border-top-subtle"
                >
                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="font-body text-sm tracking-[0.14em] uppercase py-2 border-bottom-subtle"
                                style={{ color: 'var(--c-muted)' }}
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href="https://wa.me/+918778848565?text=Hi%20Anvora,%20I%20want%20to%20start%20my%20project"
                            target="_blank"
                            rel="noreferrer"
                            className="btn-primary text-center mt-2"
                        >
                            Initiate Project
                        </a>
                    </div>
                </motion.div>
            </motion.nav>
        </>
    );
};
