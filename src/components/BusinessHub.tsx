import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info, Sparkles, Building } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const BusinessHub: React.FC = () => {
  const plans = [
    {
      name: 'STARTUP LAUNCH',
      price: '₹11,999',
      popular: false,
      tagline: 'Establish institutional authority.',
      desc: 'Bespoke engineered for founders, local startups, and independent consultants looking to establish serious credibility, index on Google search, and route traffic into WhatsApp leads.',
      features: [
        'Custom high-performance business landing page',
        'Dynamic identity branding & color calibration',
        'Complete local SEO setup & Google indexing',
        'WhatsApp direct client booking system',
        'Lead capture form & database storage integration',
        'Optimized responsive layouts for mobile & desktop',
        'Full setup of hosting infrastructure & domain configurations',
      ],
      whatsappText: 'Hi ANVORA, I want to discuss the ₹11,999 Startup Launch system for my business.',
      btnLabel: 'INITIATE BUSINESS BUILD',
    },
    {
      name: 'PREMIUM CINEMATIC BUILD',
      price: '₹24,999+',
      popular: true,
      popularBadge: 'SIGNATURE SYSTEM // MOST PREMIUM',
      tagline: 'World-class interactive luxury.',
      desc: 'For brands and boutique creative studios that understand digital presence is an investment in brand equity. Built to capture attention, trigger tactile sounds, and inspire immediate awe.',
      features: [
        'IMAX storytelling structure (multi-page options)',
        'Bespoke cinematic animation layers (Framer Motion)',
        'Tactile hardware interface & sound design calibration',
        'Elite copy curation & custom typography orchestration',
        'Premium performance engineering (95+ Core Web Vitals)',
        'Vignettes, radial glows, and interactive motion elements',
        'Full system domain assistance & continuous deployment',
        '2 Months post-launch priority support & maintenance',
      ],
      whatsappText: 'Hi ANVORA, I want to discuss the ₹24,999+ Premium Cinematic build for my brand.',
      btnLabel: 'INITIATE CINEMATIC BUILD',
    },
    {
      name: 'AI SYSTEMS',
      price: '₹39,999+',
      popular: false,
      tagline: 'Complete automated intelligence.',
      desc: 'For businesses looking to solve operational bottlenecks, automate support, and deploy custom intelligence pipelines that run 24/7.',
      features: [
        'Custom AI support chatbots (GPT-4 / Claude API models)',
        'Automated user verification & database workflows',
        'Secure dashboard backend structures (Supabase/Firebase)',
        'CRM/Slack/Email API lead notification setups',
        'Auto-compiling PDF generators or reporting dashboards',
        'Ultimate performance scaling for high traffic loads',
        'Full security encryption & API usage management',
        '3 Months training, technical support & maintenance',
      ],
      whatsappText: 'Hi ANVORA, I want to discuss the ₹39,999+ AI Systems integration for my business.',
      btnLabel: 'INITIATE AI INTELLIGENCE',
    },
  ];

  return (
    <section
      id="business-hub"
      className="relative py-28 bg-[#080d1a] grain border-bottom-subtle overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        className="absolute top-1/2 right-1/4 w-[750px] h-[750px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.02) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="section-label mb-3 block">Corporate & Startup Solutions</span>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white tracking-tight uppercase leading-none">
            THE BUSINESS <span className="text-grad-violet">HUB.</span>
          </h2>
          <p className="font-body font-light text-muted-cin text-sm md:text-base max-w-2xl mx-auto mt-6">
            We don't build generic corporate websites. We engineer high-performance platforms, automated customer pathways, and custom AI systems designed to command absolute digital authority.
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
                    ? 'border-cyan-500/80 glow-cyan shadow-[0_0_60px_rgba(6,182,212,0.15)] lg:scale-105 lg:-translate-y-2 z-20'
                    : 'opacity-85 hover:opacity-100'
                }`}
                style={isHero ? {
                  background: 'linear-gradient(180deg, rgba(10, 24, 48, 0.9) 0%, rgba(8, 13, 26, 0.98) 100%)',
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
                {/* Popular gold/purple gradient header banner */}
                {isHero && plan.popularBadge && (
                  <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-1/2 z-30">
                    <span className="badge-popular bg-gradient-to-r from-amber-400 via-violet-600 to-cyan-500 px-5 py-1.5 shadow-[0_0_30px_rgba(139,92,246,0.55)] text-[9px] tracking-[0.2em] font-black flex items-center gap-1.5 rounded-full border border-amber-400/20">
                      <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                      {plan.popularBadge}
                    </span>
                  </div>
                )}

                {/* Custom Background Orbit Ring for Premium Hero */}
                {isHero && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 overflow-hidden">
                    <div className="w-[300px] h-[300px] rounded-full border border-violet-500/30 animate-spin-slow"></div>
                    <div className="w-[200px] h-[200px] rounded-full border border-cyan-500/20 animate-spin-slower absolute"></div>
                  </div>
                )}

                <div className="relative z-10">
                  {/* Meta */}
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-body text-[9px] tracking-[0.25em] text-cyan-400 font-bold uppercase block">
                      ENTERPRISE SYSTEM 0{i + 1}
                    </span>
                    {isHero && (
                      <span className="font-mono text-[8px] tracking-[0.15em] text-amber-400 font-bold uppercase">
                        // FLAGSHIP ARCHITECTURE
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
                      / BASE BUILD FEE
                    </span>
                  </div>

                  <p className="font-body font-light text-muted-cin text-xs leading-relaxed mb-8">
                    {plan.desc}
                  </p>

                  {/* Features */}
                  <div className="space-y-4 mb-12">
                    <span className="font-body text-[9px] tracking-[0.15em] text-dim-cin font-bold uppercase block">
                      ENGINEERED PROTOCOLS:
                    </span>
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3">
                        <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
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
                  onMouseEnter={() => {
                    audioEngine.playHover();
                  }}
                  className={`w-full flex items-center justify-center gap-3 py-3.5 rounded text-center font-semibold text-xs tracking-wider transition-all duration-300 relative z-10 ${
                    isHero
                      ? 'btn-whatsapp border-cyan-500/80 bg-cyan-500/15 shadow-[0_0_25px_rgba(6,182,212,0.25)] text-white'
                      : 'border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/5 text-white/70 hover:text-white'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>{plan.btnLabel}</span>
                </motion.a>
              </motion.div>
            );
          })}
        </div>

        {/* Pricing notice */}
        <div className="flex items-center justify-center gap-2 mt-16 text-dim-cin font-body text-xs">
          <Info className="w-4 h-4 text-cyan-500" />
          <span>GST not applicable. Prices represent total out-of-pocket development expenditure.</span>
        </div>
      </div>
    </section>
  );
};
