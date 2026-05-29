import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { audioEngine } from '../utils/audioEngine';

const NAV_ITEMS = [
  { label: 'SYSTEMS', href: '#work' },
  { label: 'BUILD', href: '#process' },
  { label: 'STUDIO', href: '#about' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [initiateHovered, setInitiateHovered] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 4 }}
      style={{
        position: 'fixed',
        top: 24,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        animate={{
          background: scrolled
            ? 'rgba(8,13,26,0.75)'
            : 'rgba(8,13,26,0.15)',
          borderColor: scrolled
            ? 'rgba(255,255,255,0.07)'
            : 'rgba(255,255,255,0.05)',
          boxShadow: scrolled
            ? '0 20px 60px -15px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)'
            : 'none',
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(24px, 4vw, 48px)',
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 9999,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid',
          pointerEvents: 'auto',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          className="group"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            transition: 'opacity 0.3s ease',
          }}
          onMouseEnter={() => audioEngine.playHover()}
        >
          <img
            src="/logo-removebg-preview.png"
            alt="Anvora"
            style={{
              height: 20,
              width: 'auto',
              objectFit: 'contain',
              opacity: 0.5,
              filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.3))',
              transition: 'opacity 0.3s ease, filter 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = '1';
              (e.currentTarget as HTMLImageElement).style.filter =
                'drop-shadow(0 0 12px rgba(139,92,246,0.6))';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = '0.5';
              (e.currentTarget as HTMLImageElement).style.filter =
                'drop-shadow(0 0 8px rgba(139,92,246,0.3))';
            }}
          />
        </a>

        {/* Nav links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(20px, 3vw, 40px)',
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onMouseEnter={() => audioEngine.playHover()}
              onClick={() => audioEngine.playClick()}
              style={{
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: 9,
                letterSpacing: '0.25em',
                color: 'rgba(240,242,248,0.35)',
                textDecoration: 'none',
                fontWeight: 500,
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
              }}
              onMouseEnterCapture={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
              }}
              onMouseLeaveCapture={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  'rgba(240,242,248,0.35)';
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right side CTA — INITIATE */}
        <a
          href="https://wa.me/+918778848565?text=Hi%20Anvora,%20I%20want%20to%20start%20my%20project"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => {
            setInitiateHovered(true);
            audioEngine.playHover();
          }}
          onMouseLeave={() => setInitiateHovered(false)}
          onClick={() => audioEngine.playClick()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          {/* Status dot */}
          <motion.div
            animate={{
              background: initiateHovered
                ? 'rgba(139,92,246,0.9)'
                : 'rgba(139,92,246,0.4)',
              boxShadow: initiateHovered
                ? '0 0 8px rgba(139,92,246,0.8), 0 0 16px rgba(139,92,246,0.3)'
                : 'none',
            }}
            transition={{ duration: 0.25 }}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              flexShrink: 0,
            }}
          />
          <motion.span
            animate={{
              color: initiateHovered ? '#ffffff' : 'rgba(240,242,248,0.35)',
            }}
            transition={{ duration: 0.25 }}
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: 9,
              letterSpacing: '0.25em',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
          >
            INITIATE
          </motion.span>
        </a>
      </motion.div>
    </motion.nav>
  );
};
