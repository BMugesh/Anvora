'use client';
import { useEffect, useRef } from 'react';

/**
 * CINEMATIC CURSOR — IMAX Edition
 * Snappier ring response (lerp 0.16 vs 0.12)
 * Scales on interactive elements
 */
export const CinematicCursor = () => {
    const dotRef  = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mouseX = 0, mouseY = 0;
        let ringX  = 0, ringY  = 0;
        let rafId: number;

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (dotRef.current) {
                dotRef.current.style.left = mouseX + 'px';
                dotRef.current.style.top  = mouseY + 'px';
            }
        };

        const animate = () => {
            // 0.16 = snappier ring (was 0.12)
            ringX += (mouseX - ringX) * 0.16;
            ringY += (mouseY - ringY) * 0.16;
            if (ringRef.current) {
                ringRef.current.style.left = ringX + 'px';
                ringRef.current.style.top  = ringY + 'px';
            }
            rafId = requestAnimationFrame(animate);
        };

        const onEnter = () => {
            if (ringRef.current) {
                ringRef.current.style.width = '44px';
                ringRef.current.style.height = '44px';
                ringRef.current.style.borderColor = 'rgba(139,92,246,0.7)';
            }
        };
        const onLeave = () => {
            if (ringRef.current) {
                ringRef.current.style.width = '28px';
                ringRef.current.style.height = '28px';
                ringRef.current.style.borderColor = 'rgba(139,92,246,0.45)';
            }
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        document.querySelectorAll('a, button, [data-magnetic]').forEach(el => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <>
            <div ref={dotRef}  className="cursor-dot"  />
            <div ref={ringRef} className="cursor-ring" />
        </>
    );
};
