import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

const ORBITAL_RINGS = [
  { size: 900, border: 'rgba(167,139,250,0.03)', duration: 160 },
  { size: 640, border: 'rgba(124,58,237,0.05)', duration: 110 },
  { size: 420, border: 'rgba(167,139,250,0.04)', duration: 80 },
];

export const FinalCTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeHover, setActiveHover] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  // Scroll triggers
  const questionOpacity = useTransform(scrollYProgress, [0.0, 0.15, 0.45], [0, 0, 1]);
  const questionY = useTransform(scrollYProgress, [0.10, 0.32], [40, 0]);

  const buttonOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.35, 0.55], [20, 0]);

  const glowOpacity = useTransform(scrollYProgress, [0.0, 0.3, 0.7], [0, 0.06, 0.12]);
  const ringsOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 0.12]);

  const ctas = [
    {
      label: 'BUILD MY PORTFOLIO',
      whatsapp: 'Hi ANVORA, I\'m a student looking for a portfolio website.',
      color: '#a78bfa',
      borderGlow: 'rgba(124, 58, 237, 0.4)',
    },
    {
      label: 'LAUNCH MY BRAND',
      whatsapp: 'Hi ANVORA, I want to build a startup website.',
      color: '#22d3ee',
      borderGlow: 'rgba(6, 182, 212, 0.4)',
    },
    {
      label: 'AUTOMATE MY BUSINESS',
      whatsapp: 'Hi ANVORA, I\'m interested in AI automation systems.',
      color: '#34d399',
      borderGlow: 'rgba(34, 197, 94, 0.4)',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '150vh',
        backgroundColor: '#050816',
      }}
    >
      {/* Grain */}
      <div className="noise-overlay" style={{ opacity: 0.3 }} />

      {/* Atmospheric radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ opacity: glowOpacity }}
      >
        <div
          style={{
            width: '80vw',
            height: '80vw',
            maxWidth: '850px',
            maxHeight: '850px',
            background: 'radial-gradient(circle, rgba(124,58,237,0.7) 0%, rgba(6,182,212,0.2) 40%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
      </motion.div>

      {/* Orbital rings */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: ringsOpacity }}
      >
        {ORBITAL_RINGS.map((ring, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: ring.size,
              height: ring.size,
              border: `1px solid ${ring.border}`,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{
              duration: ring.duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </motion.div>

      {/* Content — sticky center */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sticky top-0 h-screen w-full max-w-5xl">
        {/* Question */}
        <motion.div
          style={{ opacity: questionOpacity, y: questionY }}
          className="mb-14"
        >
          <p
            className="font-body uppercase mb-4 tracking-[0.3em] font-semibold"
            style={{ fontSize: '9px', color: 'rgba(167,139,250,0.6)' }}
          >
            Digital Authority Protocol
          </p>
          <h2
            className="font-display font-black text-white leading-tight tracking-tight uppercase"
            style={{
              fontSize: 'clamp(2.2rem, 6.5vw, 5.5rem)',
              textShadow: '0 0 100px rgba(124,58,237,0.25), 0 0 200px rgba(124,58,237,0.08)',
            }}
          >
            ARE YOU READY
            <br />
            <span className="text-grad-cinematic">TO BE SEEN?</span>
          </h2>
          <p className="font-body font-light text-muted-cin text-xs md:text-sm tracking-wide max-w-md mx-auto mt-6">
            The world cannot recognize what it cannot find. Let us engineer your vehicle of gravity and visibility.
          </p>
        </motion.div>

        {/* Buttons Grid */}
        <motion.div
          style={{ opacity: buttonOpacity, y: buttonY }}
          className="w-full flex flex-col items-center gap-6"
        >
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 w-full px-4">
            {ctas.map((cta, i) => {
              const isHovered = activeHover === i;
              return (
                <a
                  key={cta.label}
                  href={`https://wa.me/+918778848565?text=${encodeURIComponent(cta.whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => {
                    setActiveHover(i);
                    audioEngine.playHover();
                  }}
                  onMouseLeave={() => setActiveHover(null)}
                  onClick={() => audioEngine.playClick()}
                  className="relative block w-full sm:w-auto"
                >
                  <motion.div
                    className="relative rounded group overflow-hidden border transition-all duration-300"
                    style={{
                      borderColor: isHovered ? cta.color : 'rgba(255,255,255,0.08)',
                      background: isHovered
                        ? `linear-gradient(135deg, ${cta.color}15 0%, rgba(8,13,26,0.95) 100%)`
                        : 'rgba(19,25,41,0.5)',
                      boxShadow: isHovered ? `0 0 35px ${cta.color}1a` : 'none',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Glowing highlight */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at top left, ${cta.borderGlow}, transparent 60%)`,
                      }}
                    />

                    {/* Bracket effect */}
                    <div className="flex items-center gap-3 px-8 py-4 font-body font-bold text-[10px] tracking-[0.2em] text-white">
                      <span className="text-violet-soft group-hover:scale-110 transition-transform">
                        [
                      </span>
                      <MessageSquare className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                      <span>{cta.label}</span>
                      <span className="text-violet-soft group-hover:scale-110 transition-transform">
                        ]
                      </span>
                    </div>
                  </motion.div>
                </a>
              );
            })}
          </div>

          {/* Sub note */}
          <p className="font-body text-[9px] tracking-[0.2em] text-dim-cin uppercase mt-8">
            Bespoke Engineering. Zero Subscriptions. Pure Gravity.
          </p>
        </motion.div>

        {/* Final signature */}
        <motion.div
          className="absolute bottom-12 left-0 right-0 flex justify-center pointer-events-none"
          style={{ opacity: buttonOpacity }}
        >
          <p className="font-body uppercase text-[8px] tracking-[0.3em] text-white/10">
            ANVORA · CINEMATIC PERCEPTION HOUSE
          </p>
        </motion.div>
      </div>
    </section>
  );
};
