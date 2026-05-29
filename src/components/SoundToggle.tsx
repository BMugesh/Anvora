import { useEffect, useState } from 'react';
import { audioEngine } from '../utils/audioEngine';

export const SoundToggle = () => {
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        return audioEngine.subscribe((muted) => setIsMuted(muted));
    }, []);

    return (
        <button
            onClick={() => {
                audioEngine.toggleMute();
                audioEngine.playClick();
            }}
            onMouseEnter={() => audioEngine.playHover()}
            className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-50 flex items-center gap-3 group"
            aria-label="Toggle sound"
            data-magnetic
        >
            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(10,15,28,0.4)] backdrop-blur-md group-hover:border-[rgba(139,92,246,0.3)] group-hover:bg-[rgba(139,92,246,0.1)] transition-all duration-300">
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isMuted ? 'bg-muted-cin' : 'bg-violet shadow-[0_0_8px_rgba(139,92,246,0.8)]'}`} />
            </div>
            <span className="font-body text-[9px] font-medium tracking-[0.25em] uppercase text-muted-cin group-hover:text-white transition-colors duration-300">
                SOUND {isMuted ? 'OFF' : 'ON'}
            </span>
        </button>
    );
};
