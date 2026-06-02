export default function Footer() {
    return (
        <footer className="relative bg-void border-t border-[rgba(255,255,255,0.05)] pt-20 pb-10 overflow-hidden grain">
            {/* Minimal Background Effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] blur-[120px] pointer-events-none" style={{ background: 'rgba(124,58,237,0.05)' }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        <div className="flex items-center gap-3 group" data-magnetic>
                            <img
                                src="/logo-removebg-preview.png"
                                alt="Anvora"
                                className="h-10 w-auto opacity-90 grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="flex flex-col -gap-0.5">
                                <span className="font-display font-bold text-lg tracking-[0.12em] uppercase leading-none text-white">
                                    ANVORA
                                </span>
                                <span className="font-body text-[9px] tracking-[0.2em] uppercase leading-none text-dim-cin">
                                    CINEMATIC PERCEPTION HOUSE
                                </span>
                            </div>
                        </div>
                        <p className="font-body font-light text-muted-cin max-w-sm text-sm leading-relaxed">
                            We do not build websites. We engineer authority. Some signals never fade — we architect digital presence built to command trust and visibility.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-4">
                        <span className="font-body text-[10px] tracking-[0.2em] font-medium text-white uppercase mb-2">Systems</span>
                        {[
                            { label: 'Signal Matrix', href: '#signals' },
                            { label: 'Student Hub', href: '#student-hub' },
                            { label: 'Business Hub', href: '#business-hub' },
                            { label: 'Build Process', href: '#process' }
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="font-body font-light text-sm text-muted-cin hover:text-white transition-colors duration-300 w-fit"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Connect */}
                    <div className="flex flex-col gap-4">
                        <span className="font-body text-[10px] tracking-[0.2em] font-medium text-white uppercase mb-2">Network</span>
                        {[
                            { name: 'Instagram', href: 'https://instagram.com' },
                            { name: 'LinkedIn', href: 'https://linkedin.com' },
                            { name: 'WhatsApp Initiate', href: 'https://wa.me/+918778848565?text=Hi%20Anvora,%20I\'m%20looking%20to%20collaborate.' }
                        ].map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-body font-light text-sm text-muted-cin hover:text-white transition-colors duration-300 w-fit"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[rgba(255,255,255,0.05)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-body text-[10px] tracking-[0.1em] text-dim-cin uppercase">
                        © {new Date().getFullYear()} Anvora. Some signals never fade.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="font-body text-[10px] tracking-[0.1em] text-dim-cin hover:text-white uppercase transition-colors">Privacy</a>
                        <a href="#" className="font-body text-[10px] tracking-[0.1em] text-dim-cin hover:text-white uppercase transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
