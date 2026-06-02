import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      q: 'Why do students need an interactive portfolio website?',
      a: 'Resumes are static text files. Recruiters spend an average of 6 seconds scanning them. An interactive portfolio website is a digital authority system. It displays actual visual builds, clickable links, responsive code consoles, and high-end animations, immediately demonstrating that you are an elite builder who takes their career seriously.',
    },
    {
      q: 'How long does a standard build take to deploy?',
      a: 'Student Pocket and Starter builds are delivered in 3 to 5 business days. Student Pro and Startup Launch packages require 5 to 7 business days, while Custom Cinematic and AI Systems require 10 to 14 days depending on custom API hooks, automation logic, and database architectures.',
    },
    {
      q: 'Can I fully customize the visual direction?',
      a: 'Yes, completely. We provide 5 unique visual archetypes as structural foundations. You select the base direction (e.g., Monospace Tech, Futuristic Cinematic, Minimal Elite, Corporate Authority), and we bespoke-engineer all typography, palettes, spacing, copy, and visual assets specifically around your identity.',
    },
    {
      q: 'Do you provide hosting and custom domain support?',
      a: 'Absolutely. We deploy and host all student builds on ultra-fast, premium global edge servers for free (no monthly hosting fees). If you have a custom domain (e.g., yourname.com), we configure all DNS entries, SSL certificates, cache structures, and cold email setups for free under our Starter and Pro builds.',
    },
    {
      q: 'Can early-stage startups request custom integrations?',
      a: 'Yes. Our Business Hub is designed explicitly for startups, SaaS products, local services, and boutique brands. We construct automated WhatsApp client routers, custom booking pipelines, payment triggers, email automation, and secure database storage backends.',
    },
    {
      q: 'Do you build custom AI solutions?',
      a: 'Yes. Under the AI Systems package, we design custom OpenAI or Anthropic API-driven chatbots pre-trained on your specific business data, automated client verification pipelines, interactive dashboards, and complete CRM database sync workflows.',
    },
    {
      q: 'How do project payments work?',
      a: 'All our builds are strictly flat, one-time fees. We require a 50% upfront deposit to initiate your design architecture and layout configuration, and the remaining 50% only after the site is fully built, tested, and deployed to your satisfaction. No hidden subscriptions or ongoing charges.',
    },
  ];

  return (
    <section
      id="faq"
      className="relative py-28 bg-[#050816] grain border-bottom-subtle overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="section-label mb-3 block">Frequently Asked Questions</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight uppercase leading-none">
            FREQUENTLY <span className="text-grad-violet">ASKED.</span>
          </h2>
          <p className="font-body font-light text-muted-cin text-xs md:text-sm max-w-lg mx-auto mt-4">
            Everything you need to know about our design system, engineering workflow, prices, and deployment protocols.
          </p>
        </div>

        {/* Accordion List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="card-imax p-6 md:p-10 rounded-xl"
          style={{
            background: 'linear-gradient(180deg, rgba(14,20,34,0.7) 0%, rgba(8,13,26,0.95) 100%)',
          }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className="border-b border-white/5 last:border-b-0 py-2"
              >
                <AccordionTrigger
                  className="text-left font-display font-bold text-sm md:text-base text-white/90 hover:text-white hover:no-underline transition-colors py-4"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-violet-soft font-semibold">
                      0{index + 1}
                    </span>
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  className="font-body font-light text-muted-cin text-xs md:text-sm leading-relaxed pb-6 pt-2 pl-7 border-l border-violet-500/10 mt-1"
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Support notice */}
        <div className="flex items-center justify-center gap-2 mt-12 text-dim-cin font-body text-xs">
          <HelpCircle className="w-4 h-4 text-violet-500" />
          <span>Still have a specialized inquiry? Contact us via WhatsApp for immediate support.</span>
        </div>
      </div>
    </section>
  );
};
