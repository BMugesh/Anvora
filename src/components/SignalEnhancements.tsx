import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const SignalEnhancements: React.FC = () => {
  const enhancements = [
    {
      name: 'Resume Redesign',
      price: '₹499',
      desc: 'Complete structural overhaul of your standard resume. Reformatted into a clean, modern, single-page professional ATS-friendly layout.',
      whatsapp: 'Hi ANVORA, I want to add the Resume Redesign (₹499) to my package.',
    },
    {
      name: 'LinkedIn Optimization',
      price: '₹799',
      desc: 'Bespoke branding of your LinkedIn profile. Custom banner design, high-end copy curation, headline architecting, and project structuring.',
      whatsapp: 'Hi ANVORA, I want to add the LinkedIn Optimization (₹799) to my package.',
    },
    {
      name: 'Hosting Setup & Config',
      price: '₹999',
      desc: 'Deployment assistance on ultra-fast, premium servers. We configure your CDNs, SSL certificates, cache structures, and deployment pipelines.',
      whatsapp: 'Hi ANVORA, I want to add the Hosting Setup (₹999) to my package.',
    },
    {
      name: 'Custom Domain Support',
      price: '₹999',
      desc: 'Assistance buying and mapping custom domains (e.g. yourname.com), managing custom DNS records, MX records, and establishing cold email routing.',
      whatsapp: 'Hi ANVORA, I want to add the Custom Domain Support (₹999) to my package.',
    },
    {
      name: 'AI Chatbot Integration',
      price: '₹1,999',
      desc: 'Add a custom intelligent AI assistant to your site, pre-trained on your projects/resume to answer recruiter questions 24/7.',
      whatsapp: 'Hi ANVORA, I want to add the AI Chatbot (₹1,999) to my package.',
    },
    {
      name: 'SEO Authority Basics',
      price: '₹1,499',
      desc: 'On-page SEO structuring. Custom meta tags, schema markup, OpenGraph assets, and index mapping so your name appears first on Google search.',
      whatsapp: 'Hi ANVORA, I want to add the SEO Authority Basics (₹1,499) to my package.',
    },
    {
      name: 'Portfolio Copywriting',
      price: '₹799',
      desc: 'Elite storytelling copy for your about pages, project timelines, and taglines. We refine your case studies into professional, punchy statements.',
      whatsapp: 'Hi ANVORA, I want to add the Portfolio Copywriting (₹799) to my package.',
    },
  ];

  return (
    <section
      id="enhancements"
      className="relative py-24 bg-space grain border-bottom-subtle overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-3 block">Signal Enhancements</span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight uppercase leading-none">
            SIGNAL <span className="text-grad-violet">ENHANCEMENTS.</span>
          </h2>
          <p className="font-body font-light text-muted-cin text-xs md:text-sm max-w-xl mx-auto mt-4">
            Accelerate your presence with modular add-ons. Fully integrated into any of your active portfolio, brand, or business system builds.
          </p>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {enhancements.map((enh, i) => (
            <motion.div
              key={enh.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-imax p-6 rounded-lg flex flex-col justify-between group h-full relative"
              style={{
                background: 'rgba(19, 25, 41, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
              }}
            >
              {/* Subtle radial glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at 10% 10%, rgba(139,92,246,0.06), transparent 50%)',
                }}
              />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-violet-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="font-body text-[8px] font-bold tracking-[0.2em] uppercase">
                      ADD-ON 0{i + 1}
                    </span>
                  </div>
                  <span className="font-display font-black text-lg text-white">
                    {enh.price}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-white tracking-tight uppercase group-hover:text-grad-white transition-colors duration-300">
                  {enh.name}
                </h3>
                <p className="font-body font-light text-muted-cin text-xs leading-relaxed mt-2 mb-6">
                  {enh.desc}
                </p>
              </div>

              <motion.a
                href={`https://wa.me/+918778848565?text=${encodeURIComponent(enh.whatsapp)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98 }}
                onClick={() => audioEngine.playClick()}
                onMouseEnter={() => audioEngine.playHover()}
                className="flex items-center justify-between w-full font-body text-[9px] tracking-[0.25em] text-white/40 group-hover:text-white transition-colors pt-4 border-t border-white/5"
              >
                <span>INTEGRATE ADD-ON</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
