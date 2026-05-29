/**
 * ANVORA AUDIO ENGINE — DIGITAL SOUL EDITION
 * Inspired by: Hans Zimmer / Interstellar ambient sound design
 * Philosophy: Silence is more powerful than noise.
 */
class AudioEngine {
    private ctx: AudioContext | null = null;

    // Drone layer
    private droneOsc: OscillatorNode | null = null;
    private droneOsc2: OscillatorNode | null = null;
    private droneGain: GainNode | null = null;

    // Emotional pad layer
    private padOsc: OscillatorNode | null = null;
    private padGain: GainNode | null = null;

    // Reverb convolver
    private reverb: ConvolverNode | null = null;
    private reverbGain: GainNode | null = null;

    public isInitialized = false;
    public isMuted = true;
    private listeners: ((muted: boolean) => void)[] = [];

    init() {
        if (this.isInitialized) return;
        try {
            const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
            this.ctx = new AudioContextClass();
            this.isInitialized = true;
            this.buildReverb();
            this.startDrone();
            this.startEmotionalPad();
        } catch (e) {
            console.error('Web Audio API not supported', e);
        }
    }

    /**
     * Build a simple impulse-response reverb for spaciousness.
     * Creates that vast, cathedral-like space feeling.
     */
    private buildReverb() {
        if (!this.ctx) return;
        this.reverb = this.ctx.createConvolver();
        this.reverbGain = this.ctx.createGain();
        this.reverbGain.gain.value = 0.35;

        const sampleRate = this.ctx.sampleRate;
        const length = sampleRate * 4; // 4 seconds tail
        const impulse = this.ctx.createBuffer(2, length, sampleRate);

        for (let channel = 0; channel < 2; channel++) {
            const data = impulse.getChannelData(channel);
            for (let i = 0; i < length; i++) {
                // Exponential decay for natural room tail
                data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5);
            }
        }

        this.reverb.buffer = impulse;
        this.reverb.connect(this.reverbGain);
        this.reverbGain.connect(this.ctx.destination);
    }

    /**
     * Deep sub-bass cinematic drone — the heartbeat beneath the silence.
     * 30Hz fundamental with slight detuning for richness.
     */
    private startDrone() {
        if (!this.ctx) return;

        this.droneOsc = this.ctx.createOscillator();
        this.droneOsc.type = 'sine';
        this.droneOsc.frequency.setValueAtTime(28, this.ctx.currentTime);
        // Slow imperceptible frequency drift — like breathing
        this.droneOsc.frequency.linearRampToValueAtTime(31, this.ctx.currentTime + 30);

        this.droneOsc2 = this.ctx.createOscillator();
        this.droneOsc2.type = 'triangle';
        this.droneOsc2.frequency.setValueAtTime(55.5, this.ctx.currentTime); // Octave above + slight detune

        this.droneGain = this.ctx.createGain();
        this.droneGain.gain.setValueAtTime(0, this.ctx.currentTime);

        // Deep sub-bass filter — felt more than heard
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 120;
        filter.Q.value = 1.5;

        this.droneOsc.connect(filter);
        this.droneOsc2.connect(filter);
        filter.connect(this.droneGain);
        this.droneGain.connect(this.ctx.destination);

        // Also feed into reverb for spaciousness
        if (this.reverb) {
            this.droneGain.connect(this.reverb);
        }

        this.droneOsc.start();
        this.droneOsc2.start();
    }

    /**
     * Emotional high pad — the "human" layer above the machine.
     * Inspired by Interstellar's organ textures.
     */
    private startEmotionalPad() {
        if (!this.ctx) return;

        this.padOsc = this.ctx.createOscillator();
        this.padOsc.type = 'sine';
        this.padOsc.frequency.setValueAtTime(220, this.ctx.currentTime); // A3 — warm, emotional

        this.padGain = this.ctx.createGain();
        this.padGain.gain.setValueAtTime(0, this.ctx.currentTime);

        // Bandpass to shape a warm pad texture
        const padFilter = this.ctx.createBiquadFilter();
        padFilter.type = 'bandpass';
        padFilter.frequency.value = 400;
        padFilter.Q.value = 0.5;

        this.padOsc.connect(padFilter);
        padFilter.connect(this.padGain);
        this.padGain.connect(this.ctx.destination);
        if (this.reverb) {
            this.padGain.connect(this.reverb);
        }

        this.padOsc.start();
    }

    subscribe(listener: (muted: boolean) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notifyListeners() {
        this.listeners.forEach(l => l(this.isMuted));
    }

    toggleMute() {
        if (!this.isInitialized) this.init();
        if (!this.ctx || !this.droneGain) return;

        this.isMuted = !this.isMuted;
        this.notifyListeners();

        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        const now = this.ctx.currentTime;

        if (this.isMuted) {
            // Slow fade out — 2 seconds
            this.droneGain.gain.setTargetAtTime(0, now, 0.8);
            if (this.padGain) this.padGain.gain.setTargetAtTime(0, now, 1.2);
        } else {
            // Cinematic slow fade in — drone rises first, then pad
            this.droneGain.gain.setTargetAtTime(0.18, now, 3.5);
            if (this.padGain) this.padGain.gain.setTargetAtTime(0.025, now + 4, 5); // Pad enters late
            this.playSystemStart();
        }
    }

    /**
     * System activation sound — descending tone into the void.
     */
    playSystemStart() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 2.5);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.06, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        if (this.reverb) gain.connect(this.reverb);

        osc.start(now);
        osc.stop(now + 3);
    }

    /**
     * Subtle UI click — barely audible, intentional.
     */
    playClick() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
    }

    /**
     * Hover — a breath of air. Nearly inaudible.
     */
    playHover() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.linearRampToValueAtTime(480, now + 0.12);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.008, now + 0.06);
        gain.gain.linearRampToValueAtTime(0, now + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.2);
    }

    /**
     * Cinematic moment — plays when the "BUILT TO LEAVE A SIGNAL" scene appears.
     * A slow, emotional ascending tone.
     */
    playCinematicMoment() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;

        // Low drone swell
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(40, now);
        osc.frequency.linearRampToValueAtTime(60, now + 8);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.1, now + 4);
        gain.gain.linearRampToValueAtTime(0, now + 10);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        if (this.reverb) gain.connect(this.reverb);

        osc.start(now);
        osc.stop(now + 10);

        // Emotional high note — faint, like a distant star
        const high = this.ctx.createOscillator();
        const highGain = this.ctx.createGain();
        high.type = 'sine';
        high.frequency.setValueAtTime(528, now + 2); // 528Hz — resonant frequency
        high.frequency.linearRampToValueAtTime(440, now + 8);

        highGain.gain.setValueAtTime(0, now + 2);
        highGain.gain.linearRampToValueAtTime(0.018, now + 4);
        highGain.gain.exponentialRampToValueAtTime(0.001, now + 9);

        high.connect(highGain);
        highGain.connect(this.ctx.destination);
        if (this.reverb) highGain.connect(this.reverb);

        high.start(now + 2);
        high.stop(now + 10);
    }
}

export const audioEngine = new AudioEngine();
