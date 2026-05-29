import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const PHILOSOPHY_LINES = [
  {
    line: 'Design is not decoration.',
    sub: 'It is the architecture of perception — the silent signal that tells your audience whether you are worth their attention before a single word is read.',
  },
  {
    line: 'Authority is not claimed.',
    sub: 'It is built — through every typographic decision, every transition, every millisecond of interaction that says: this entity operates at a different level.',
  },
  {
    line: 'Your digital presence is your first impression.',
    sub: 'In a world of infinite scroll and short attention, the brands that win are the ones that stop people cold — with presence, not noise.',
  },
  {
    line: 'We do not make websites.',
    sub: 'We engineer authority systems — platforms of perception that shape how markets see you, trust you, and choose you.',
  },
];

interface PhilosophyCardProps {
  line: string;
  sub: string;
  index: number;
}

const PhilosophyCard: React.FC<PhilosophyCardProps> = ({ line, sub, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.80', 'start 0.20'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.65, 1], [0, 0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const lineOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const lineX = useTransform(scrollYProgress, [0.1, 0.4], [-30, 0]);
  const subOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);

  return (
    <motion.div
      ref={cardRef}
      className="relative flex flex-col justify-center px-8 lg:px-20"
      style={{
        minHeight: '50vh',
        opacity,
        y,
        borderLeft: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Index number */}
      <motion.span
        className="font-body uppercase absolute top-6 left-8 lg:left-20"
        style={{
          fontSize: '9px',
          letterSpacing: '0.3em',
          color: 'rgba(167,139,250,0.4)',
          opacity: lineOpacity,
        }}
      >
        0{index + 1}
      </motion.span>

      {/* Main line */}
      <motion.h3
        className="font-display font-bold text-white leading-tight mb-6"
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
          maxWidth: '48rem',
          opacity: lineOpacity,
          x: lineX,
        }}
      >
        {line}
      </motion.h3>

      {/* Sub text */}
      <motion.p
        className="font-body font-light leading-relaxed"
        style={{
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.4)',
          maxWidth: '36rem',
          lineHeight: 1.75,
          opacity: subOpacity,
        }}
      >
        {sub}
      </motion.p>

      {/* Subtle horizontal rule below */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '1px',
          background: 'rgba(255,255,255,0.04)',
          opacity: lineOpacity,
        }}
      />
    </motion.div>
  );
};

export const EmotionalPhilosophy: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden py-12"
      style={{ backgroundColor: 'var(--c-abyss, #080D1A)' }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          opacity: 0.022,
        }}
      />

      {/* Ambient violet glow — left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background:
            'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section label */}
        <div className="px-8 lg:px-20 mb-16">
          <p
            className="font-body uppercase"
            style={{
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: 'rgba(167,139,250,0.6)',
            }}
          >
            Our Philosophy
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col">
          {PHILOSOPHY_LINES.map((item, index) => (
            <PhilosophyCard
              key={index}
              line={item.line}
              sub={item.sub}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
