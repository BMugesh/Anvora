import { useEffect, useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
    onComplete: () => void;
}

const PHASES = [
    'INITIALIZING DIGITAL PRESENCE',
    'CALIBRATING AUTHORITY',
    'LOADING CINEMATIC SYSTEMS',
    'SYSTEM READY',
];

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
    const [phase, setPhase] = useState(0);
    const [progress, setProgress] = useState(0);
    const [exiting, setExiting] = useState(false);
    const completedRef = useRef(false);

    const handleEnd = useCallback(() => {
        if (completedRef.current) return;
        completedRef.current = true;
        setExiting(true);
        setTimeout(onComplete, 900);
    }, [onComplete]);

    // Progress animation
    useEffect(() => {
        const duration = 3200;
        const start = performance.now();
        let raf: number;

        const tick = (now: number) => {
            const pct = Math.min((now - start) / duration, 1);
            setProgress(pct);
            if (pct < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                setTimeout(handleEnd, 400);
            }
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [handleEnd]);

    // Phase text cycling
    useEffect(() => {
        const intervals = [0, 900, 1800, 2700];
        const timers = intervals.map((delay, i) =>
            setTimeout(() => setPhase(i), delay)
        );
        return () => timers.forEach(clearTimeout);
    }, []);

    // Hard cap
    useEffect(() => {
        const cap = setTimeout(handleEnd, 6000);
        return () => clearTimeout(cap);
    }, [handleEnd]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: '#050816' }}
            initial={{ opacity: 1 }}
            animate={{ opacity: exiting ? 0 : 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Noise grain */}
            <div className="noise-overlay" />

            {/* Background radial glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)',
                }}
            />

            {/* Orbital rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    className="absolute w-[400px] h-[400px] rounded-full"
                    style={{ border: '1px solid rgba(124,58,237,0.08)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                    className="absolute w-[280px] h-[280px] rounded-full"
                    style={{ border: '1px solid rgba(139,92,246,0.12)' }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                    className="absolute w-[180px] h-[180px] rounded-full"
                    style={{ border: '1px solid rgba(6,182,212,0.08)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                />
            </div>

            {/* Center content */}
            <div className="relative z-10 flex flex-col items-center gap-10">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                >
                    <div
                        className="absolute inset-0 rounded-full blur-3xl scale-150"
                        style={{ background: 'rgba(124,58,237,0.18)' }}
                    />
                    <img
                        src="/logo-removebg-preview.png"
                        alt="Anvora"
                        className="relative z-10 h-16 w-auto"
                        style={{ filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.6))' }}
                    />
                </motion.div>

                {/* Pulsing status text */}
                <div className="relative h-5 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={phase}
                            initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className="absolute text-[10px] font-body font-medium tracking-[0.3em] uppercase"
                            style={{ color: 'rgba(139,92,246,0.7)' }}
                        >
                            {PHASES[phase]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Progress bar */}
                <div className="w-48 h-[1px] bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{
                            width: `${progress * 100}%`,
                            background: 'linear-gradient(90deg, #7C3AED, #8B5CF6, #06B6D4)',
                        }}
                        transition={{ duration: 0.1 }}
                    />
                    {/* Shimmer */}
                    <motion.div
                        className="absolute top-0 h-full w-8 blur-sm"
                        style={{
                            left: `${Math.max(0, progress * 100 - 16)}%`,
                            background: 'rgba(139,92,246,0.6)',
                        }}
                    />
                </div>

                {/* Percentage */}
                <motion.span
                    className="text-[10px] font-body tracking-widest"
                    style={{ color: 'rgba(248,250,252,0.2)' }}
                >
                    {Math.round(progress * 100)}%
                </motion.span>
            </div>

            {/* Corner decorations */}
            {[
                { top: '2rem', left: '2rem', borderTop: true, borderLeft: true },
                { top: '2rem', right: '2rem', borderTop: true, borderRight: true },
                { bottom: '2rem', left: '2rem', borderBottom: true, borderLeft: true },
                { bottom: '2rem', right: '2rem', borderBottom: true, borderRight: true },
            ].map((pos, i) => (
                <motion.div
                    key={i}
                    className="absolute w-8 h-8 pointer-events-none"
                    style={{
                        ...pos,
                        borderWidth: '1px',
                        borderColor: 'rgba(124,58,237,0.25)',
                        borderStyle: 'solid',
                        borderTopWidth: pos.borderTop ? undefined : '0',
                        borderBottomWidth: pos.borderBottom ? undefined : '0',
                        borderLeftWidth: pos.borderLeft ? undefined : '0',
                        borderRightWidth: pos.borderRight ? undefined : '0',
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                />
            ))}

            {/* Studio ID bottom */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.8, duration: 1 }}
            >
                <p
                    className="text-[9px] tracking-[0.4em] uppercase font-body"
                    style={{ color: 'rgba(248,250,252,0.35)' }}
                >
                    ANVORA · CINEMATIC WEB ARCHITECTURE STUDIO
                </p>
            </motion.div>
        </motion.div>
    );
};
