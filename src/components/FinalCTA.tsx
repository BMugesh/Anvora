import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const CTA_LINK =
  'https://wa.me/+918778848565?text=Hi%20Anvora,%20I%20am%20ready%20to%20begin%20an%20authority%20build';

const ORBITAL_RINGS = [
  { size: 900, border: 'rgba(167,139,250,0.04)', duration: 180 },
  { size: 640, border: 'rgba(124,58,237,0.06)', duration: 130 },
  { size: 420, border: 'rgba(167,139,250,0.05)', duration: 95 },
];

export const FinalCTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [bracketsVisible, setBracketsVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  // Question appears faster
  const questionOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.18, 0.45],
    [0, 0, 1]
  );
  const questionY = useTransform(scrollYProgress, [0.10, 0.32], [50, 0]);

  // Button appears faster
  const buttonOpacity = useTransform(scrollYProgress, [0.40, 0.60], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.40, 0.60], [25, 0]);

  // Atmospheric glow — more visible
  const glowOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.35, 0.75],
    [0, 0.055, 0.10]
  );

  // Orbital rings
  const ringsOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 0.10]);

  const handleHoverStart = () => {
    setIsHovered(true);
    setBracketsVisible(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    setBracketsVisible(false);
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '150vh',
        backgroundColor: 'var(--c-void, #050816)',
      }}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          opacity: 0.022,
        }}
      />

      {/* Atmospheric glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ opacity: glowOpacity }}
      >
        <div
          style={{
            width: '80vw',
            height: '80vw',
            maxWidth: '900px',
            maxHeight: '900px',
            background:
              'radial-gradient(circle, rgba(124,58,237,1) 0%, rgba(124,58,237,0.3) 30%, transparent 70%)',
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
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sticky top-0 h-screen">
        {/* Question */}
        <motion.div
          style={{ opacity: questionOpacity, y: questionY }}
          className="mb-14"
        >
          <p
            className="font-body uppercase mb-4 tracking-[0.3em]"
            style={{ fontSize: '9px', color: 'rgba(167,139,250,0.5)' }}
          >
            The Question
          </p>
          <h2
            className="font-display font-black text-white leading-none tracking-tight uppercase"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              textShadow:
                '0 0 120px rgba(124,58,237,0.3), 0 0 240px rgba(124,58,237,0.1)',
            }}
          >
            ARE YOU READY
            <br />
            <span
              style={{
                background:
                  'linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #c4b5fd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              TO BE SEEN?
            </span>
          </h2>
        </motion.div>

        {/* Button */}
        <motion.div style={{ opacity: buttonOpacity, y: buttonY }}>
          <a
            href={CTA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
            style={{ display: 'inline-block' }}
          >
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              {/* Button illumination */}
              <motion.div
                className="absolute inset-0 rounded-sm pointer-events-none"
                animate={{
                  opacity: isHovered ? 1 : 0,
                  boxShadow: isHovered
                    ? '0 0 60px rgba(124,58,237,0.5), 0 0 120px rgba(124,58,237,0.2)'
                    : '0 0 0px rgba(124,58,237,0)',
                }}
                transition={{ duration: 0.6 }}
              />

              {/* Left bracket */}
              <motion.span
                className="absolute left-0 top-0 bottom-0 flex items-center"
                animate={{
                  x: bracketsVisible ? -12 : 0,
                  opacity: bracketsVisible ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: '1rem',
                  color: 'rgba(167,139,250,0.7)',
                  fontFamily: 'monospace',
                  paddingLeft: '4px',
                }}
              >
                [
              </motion.span>

              {/* Button core */}
              <div
                className="relative font-body font-semibold uppercase text-white px-10 py-4 rounded-sm"
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  background: isHovered
                    ? 'linear-gradient(135deg, rgba(124,58,237,0.9) 0%, rgba(139,92,246,0.9) 100%)'
                    : 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  transition: 'background 0.6s ease',
                  backdropFilter: 'blur(10px)',
                }}
              >
                ENTER AUTHORITY BUILD
              </div>

              {/* Right bracket */}
              <motion.span
                className="absolute right-0 top-0 bottom-0 flex items-center"
                animate={{
                  x: bracketsVisible ? 12 : 0,
                  opacity: bracketsVisible ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: '1rem',
                  color: 'rgba(167,139,250,0.7)',
                  fontFamily: 'monospace',
                  paddingRight: '4px',
                }}
              >
                ]
              </motion.span>
            </motion.div>
          </a>

          {/* Sub note */}
          <p
            className="font-body mt-6"
            style={{
              fontSize: '9px',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.2)',
              textTransform: 'uppercase',
            }}
          >
            No templates. No compromise. Full authority.
          </p>
        </motion.div>

        {/* Final signature */}
        <motion.div
          className="absolute bottom-12 left-0 right-0 flex justify-center"
          style={{ opacity: buttonOpacity }}
        >
          <p
            className="font-body uppercase"
            style={{
              fontSize: '8px',
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.12)',
            }}
          >
            ANVORA · CINEMATIC PERCEPTION HOUSE
          </p>
        </motion.div>
      </div>
    </section>
  );
};
