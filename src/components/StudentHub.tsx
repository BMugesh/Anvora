import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info, MessageSquare, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const StudentHub: React.FC = () => {
  const plans = [
    {
      name: 'STUDENT POCKET',
      price: '₹999',
      popular: false,
      tagline: 'Establish raw visibility on a budget.',
      desc: 'For students who need a clean, authoritative single-page platform for project submissions, class presentations, or basic digital resume presence.',
      features: [
        'Single-page modular system architecture',
        'Bespoke visual theme configuration',
        'Optimized for rapid mobile rendering',
        'Digital resume content structure',
        'Free hosting deployment assistance',
        '1 Video / Reel template formatted',
      ],
      whatsappText: 'Hi ANVORA, I want to explore the ₹999 Student Pocket package.',
      btnLabel: 'INITIATE POCKET BUILD',
    },
    {
      name: 'STUDENT STARTER',
      price: '₹1,499',
      popular: true,
      popularBadge: 'MOST CHOSEN BY FINAL YEAR STUDENTS',
      trustLine: 'Designed for placements, internships and recruiter visibility.',
      tagline: 'High-impact placement callback vehicle.',
      desc: 'Bespoke engineered for final-year placement and internship candidates seeking to stand out in hyper-competitive recruiter lists.',
      features: [
        'Premium interactive portfolio layout',
        'Bespoke typography & color architecting',
        'Integrated LinkedIn & GitHub tracking elements',
        'Tactile audio feedback options',
        'Custom interactive code/project showcase console',
        'Basic SEO keyword metadata optimization',
        '2 Premium Reels / personal brand video edits',
        'Free lifetime deployment on ultra-fast edge servers',
      ],
      whatsappText: 'Hi ANVORA, I want to build the ₹1,499 Student Starter system.',
      btnLabel: 'INITIATE STARTER BUILD',
    },
    {
      name: 'STUDENT PRO',
      price: '₹2,999',
      popular: false,
      tagline: 'Full creator & organizational authority.',
      desc: 'Designed for student creators, hackathon veterans, campus clubs, research scholars, college symposiums, or early student startups.',
      features: [
        'Cinematic creator showcase or full multi-page system',
        'Full brand styling guidelines (logos, custom fonts)',
        'Custom interactive ticketing or symposium reservation pages',
        'Advanced hover triggers & micro-interaction assets',
        'Integrated blog, CMS, or dynamic project database',
        '4 Bespoke video/Reel templates formatted',
        'Full custom domain connection support',
        '1 Month post-launch maintenance cycle',
      ],
      whatsappText: 'Hi ANVORA, I am ready to get the ₹2,999 Student Pro system.',
      btnLabel: 'INITIATE PRO BUILD',
    },
  ];

  return (
    <section
      id="student-hub"
      className="relative py-28 bg-[#050816] grain border-bottom-subtle overflow-hidden"
    >
      {/* Glow Backdrops */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.03) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="section-label mb-3 block">Student Hub Packages</span>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white tracking-tight uppercase leading-none">
            THE STUDENT <span className="text-grad-violet">HUB.</span>
          </h2>
          <p className="font-body font-light text-muted-cin text-sm md:text-base max-w-2xl mx-auto mt-6">
            Elite digital identities, bespoke crafted and priced with absolute student accessibility in mind. No monthly retainers, no hidden fees. Just sheer digital authority.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, i) => {
            const isHero = plan.popular;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                className={`card-pricing p-8 relative flex flex-col justify-between h-full transition-all duration-500 ${
                  isHero
                    ? 'border-violet-500/80 glow-violet shadow-[0_0_60px_rgba(139,92,246,0.15)] lg:scale-105 lg:-translate-y-2 z-20'
                    : 'opacity-85 hover:opacity-100'
                }`}
                style={isHero ? {
                  background: 'linear-gradient(180deg, rgba(22, 16, 48, 0.9) 0%, rgba(8, 13, 26, 0.98) 100%)',
                } : undefined}
                animate={isHero ? {
                  y: [0, -6, 0]
                } : undefined}
                transition={isHero ? {
                  duration: 0.6,
                  delay: i * 0.15,
                  y: {
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  }
                } : {
                  duration: 0.6,
                  delay: i * 0.15
                }}
              >
                {/* Popular glow header banner */}
                {isHero && plan.popularBadge && (
                  <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-1/2 z-30">
                    <span className="badge-popular bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-1.5 shadow-[0_0_20px_rgba(139,92,246,0.4)] text-[9px] tracking-[0.18em] font-extrabold flex items-center gap-1.5 rounded-full">
                      <Sparkles className="w-3 h-3 text-white animate-pulse" />
                      {plan.popularBadge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Meta */}
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-body text-[9px] tracking-[0.25em] text-violet-soft font-bold uppercase block">
                      PLAN 0{i + 1}
                    </span>
                    {isHero && (
                      <span className="font-mono text-[8px] tracking-[0.15em] text-emerald-400 font-bold uppercase">
                        // ELITE CHOICE
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="font-body font-light text-xs text-white/50 italic mt-1.5 mb-6">
                    "{plan.tagline}"
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 border-b border-white/5 pb-6 mb-6">
                    <span className="font-display font-black text-4xl md:text-5xl text-white tracking-tight">
                      {plan.price}
                    </span>
                    <span className="font-body text-[10px] text-dim-cin tracking-wider uppercase font-bold">
                      / ONE-TIME FEE
                    </span>
                  </div>

                  {/* Hero Trust Line */}
                  {isHero && plan.trustLine && (
                    <div className="mb-6 p-3 rounded bg-violet-500/10 border border-violet-500/20 text-violet-200 text-xs font-body font-medium leading-relaxed">
                      {plan.trustLine}
                    </div>
                  )}

                  <p className="font-body font-light text-muted-cin text-xs leading-relaxed mb-8">
                    {plan.desc}
                  </p>

                  {/* Features */}
                  <div className="space-y-4 mb-12">
                    <span className="font-body text-[9px] tracking-[0.15em] text-dim-cin font-bold uppercase block">
                      WHAT IS ARCHITECTED:
                    </span>
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="font-body font-light text-xs text-white/80 leading-tight">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <motion.a
                  href={`https://wa.me/+918778848565?text=${encodeURIComponent(plan.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => audioEngine.playClick()}
                  onMouseEnter={() => audioEngine.playHover()}
                  className={`w-full flex items-center justify-center gap-3 py-3.5 rounded text-center font-semibold text-xs tracking-wider transition-all duration-300 ${
                    isHero
                      ? 'btn-whatsapp border-emerald-500/80 bg-emerald-500/15 shadow-[0_0_25px_rgba(34,197,94,0.25)] text-white'
                      : 'border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/5 text-white/70 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{plan.btnLabel}</span>
                </motion.a>
              </motion.div>
            );
          })}
        </div>

        {/* Pricing notice */}
        <div className="flex items-center justify-center gap-2 mt-16 text-dim-cin font-body text-xs">
          <Info className="w-4 h-4 text-violet-500" />
          <span>GST not applicable. Prices represent total out-of-pocket development expenditure.</span>
        </div>
      </div>
    </section>
  );
};
