'use client';
import { useEffect, useRef } from 'react';

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
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            if (ringRef.current) {
                ringRef.current.style.left = ringX + 'px';
                ringRef.current.style.top  = ringY + 'px';
            }
            rafId = requestAnimationFrame(animate);
        };

        const onEnter = () => {
            if (ringRef.current) ringRef.current.style.transform = 'translate(-50%,-50%) scale(1.8)';
        };
        const onLeave = () => {
            if (ringRef.current) ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
        };

        window.addEventListener('mousemove', onMove);
        document.querySelectorAll('a,button,[data-magnetic]').forEach(el => {
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
