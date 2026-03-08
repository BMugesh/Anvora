
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
    {
        title: "HealthPulse",
        category: "Healthcare Technology",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
        status: "Live",
        link: "https://health-care-eta-liard.vercel.app/"
    },
    {
        title: "Akshaya Akademics",
        category: "Global Education & Admissions",
        image: "/akshaya-logo.png",
        status: "Under Construction",
        link: "#"
    }
];

export const Portfolio = () => {
    return (
        <section id="work" className="py-24 bg-anvora-black relative overflow-hidden">
            {/* Background Wireframes */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.03] pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slower">
                    <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="4 4" />
                    <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="0.5" fill="none" />
                    <path d="M100 10 L100 190 M10 100 L190 100" stroke="white" strokeWidth="0.5" />
                </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.03] pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-reverse-slower">
                    <rect x="50" y="50" width="100" height="100" stroke="white" strokeWidth="0.5" fill="none" />
                    <rect x="70" y="70" width="60" height="60" stroke="white" strokeWidth="0.5" fill="none" transform="rotate(45 100 100)" />
                </svg>
            </div>
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-anvora-gold text-sm font-medium tracking-[0.3em] uppercase mb-4">
                        Selected Work
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-display font-bold text-white">
                        Proof &gt; Promises
                    </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {projects.map((project, index) => (
                        <a
                            key={index}
                            href={project.link !== '#' ? project.link : undefined}
                            target={project.link !== '#' ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="block"
                        >
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer"
                        >
                            {/* Image Background */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${project.image})` }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end items-start transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${project.status === 'Live' ? 'bg-green-500/20 text-green-400' : 'bg-anvora-gold/20 text-anvora-gold'
                                        }`}>
                                        {project.status}
                                    </span>
                                    <span className="text-gray-400 text-sm">{project.category}</span>
                                </div>
                                <h4 className="text-3xl font-display font-bold text-white mb-4">
                                    {project.title}
                                </h4>

                                <div className="flex items-center gap-2 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    <span>{project.status === 'Live' ? 'Visit Site' : 'Coming Soon'}</span>
                                    <ExternalLink className="w-4 h-4" />
                                </div>
                            </div>

                            {/* Hover Border Glow */}
                            <div className="absolute inset-0 border border-white/10 group-hover:border-anvora-gold/50 rounded-3xl transition-colors duration-500 pointer-events-none" />
                            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_rgba(251,191,36,0.1)] pointer-events-none" />
                        </motion.div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
