import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Trophy, ArrowRight } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const StudentSection: React.FC = () => {
  const cards = [
    {
      title: 'PLACEMENT PORTFOLIOS',
      subtitle: 'STAND OUT IN HIRING FLOODS',
      desc: 'Showcase your engineering builds, research papers, and technical capabilities in a custom high-performance system. Recruiters spend 6 seconds on a resume — they spend minutes on a cinematic interactive portfolio.',
      cta: 'GET PLACEMENT READY',
      whatsappText: 'Hi ANVORA, I want to get placement ready with a professional portfolio.',
      icon: Trophy,
      glow: 'rgba(124, 58, 237, 0.15)',
    },
    {
      title: 'LINKEDIN IDENTITY',
      subtitle: 'ENGINEER CREDIBILITY',
      desc: 'Not just a profile — an architecture of recognition. We optimize your digital footprint, structure your case studies, and build high-fidelity trust signals that command recruiter outreach.',
      cta: 'BUILD MY PRESENCE',
      whatsappText: 'Hi ANVORA, I want to build a professional LinkedIn brand identity.',
      icon: Shield,
      glow: 'rgba(6, 182, 212, 0.15)',
    },
    {
      title: 'CREATOR & STARTUP MODE',
      subtitle: 'LAUNCH YOUR IDEAS',
      desc: 'Have a SaaS project, web agency, agency idea, or YouTube brand? We architect cinematic landing pages and digital branding that turn visitors into high-value clients and active community members.',
      cta: 'CREATE MY BRAND',
      whatsappText: 'Hi ANVORA, I want to create a premium brand presence for my project.',
      icon: Sparkles,
      glow: 'rgba(236, 72, 153, 0.15)',
    },
  ];

  return (
    <section
      id="student-section"
      className="relative py-28 bg-abyss grain overflow-hidden border-bottom-subtle"
    >
      {/* Background Decorative Glow */}
      <div
        className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.03) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="section-label mb-3 block"
          >
            Digital Soul & Presence
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-extrabold text-4xl md:text-6xl text-white tracking-tight uppercase max-w-4xl mx-auto leading-tight"
          >
            FOR STUDENTS WHO <span className="text-grad-violet">REFUSE TO STAY INVISIBLE.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body font-light text-muted-cin text-sm md:text-base max-w-2xl mx-auto mt-6"
          >
            In a saturated marketplace, your digital presence decides your gravity before anyone reads your resume. We design the vehicle for your ambition.
          </motion.p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="card-imax p-8 rounded-xl flex flex-col justify-between group h-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(14,20,34,0.7) 0%, rgba(8,13,26,0.9) 100%)',
                }}
              >
                {/* Custom Hover Glow Accent */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 10% 10%, ${card.glow}, transparent 55%)`,
                  }}
                />

                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-body text-[9px] tracking-[0.25em] text-violet-soft font-semibold uppercase">
                      {card.subtitle}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-panel border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-active transition-all duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-4 tracking-tight group-hover:text-grad-white transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="font-body font-light text-muted-cin text-sm leading-relaxed mb-12">
                    {card.desc}
                  </p>
                </div>

                {/* WhatsApp Button */}
                <motion.a
                  href={`https://wa.me/+918778848565?text=${encodeURIComponent(card.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => audioEngine.playClick()}
                  onMouseEnter={() => audioEngine.playHover()}
                  className="w-full btn-whatsapp flex items-center justify-center gap-3 py-3 rounded text-center"
                >
                  <span>{card.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
