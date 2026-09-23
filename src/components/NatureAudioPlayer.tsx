import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

/**
 * Procedural soothing fireplace & nature breeze audio synthesizer
 * using native Web Audio API (zero external network dependencies).
 */
export const NatureAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const crackleTimerRef = useRef<number | null>(null);

  const startSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 1. Soft wind / warm air ambient noise (Brownian-ish filtered noise)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // boost volume
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Low pass filter for soft cozy warmth (like evening mountain breeze)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();

      // 2. Subtle periodic wood crackle / embers
      const playCrackle = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const cCtx = audioCtxRef.current;
        const popOsc = cCtx.createOscillator();
        const popGain = cCtx.createGain();

        popOsc.type = 'sine';
        popOsc.frequency.setValueAtTime(200 + Math.random() * 300, cCtx.currentTime);
        popOsc.frequency.exponentialRampToValueAtTime(80, cCtx.currentTime + 0.04);

        popGain.gain.setValueAtTime(0.04 + Math.random() * 0.05, cCtx.currentTime);
        popGain.gain.exponentialRampToValueAtTime(0.0001, cCtx.currentTime + 0.05);

        popOsc.connect(popGain);
        popGain.connect(masterGain);

        popOsc.start();
        popOsc.stop(cCtx.currentTime + 0.06);

        const nextTime = 400 + Math.random() * 1200;
        crackleTimerRef.current = window.setTimeout(playCrackle, nextTime);
      };

      playCrackle();
      setIsPlaying(true);
    } catch {
      // AudioContext policy fallback
      setIsPlaying(false);
    }
  };

  const stopSound = () => {
    if (crackleTimerRef.current) {
      clearTimeout(crackleTimerRef.current);
      crackleTimerRef.current = null;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5);
      setTimeout(() => {
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
      }, 500);
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound();
    }
  };

  useEffect(() => {
    return () => {
      if (crackleTimerRef.current) clearTimeout(crackleTimerRef.current);
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      type="button"
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 border ${
        isPlaying
          ? 'bg-[#E3EBE3] border-[#728A71] text-[#2D3E2C] shadow-sm'
          : 'bg-[#F4EFEA]/80 border-[#DECFC1] text-[#69584D] hover:bg-[#EBE2D7] hover:text-[#382E28]'
      }`}
      title={isPlaying ? 'Wohlfühl-Naturklänge pausieren' : 'Sanfte Naturklänge (Holzfeuer & Wind) abspielen'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#4E614D] animate-pulse" />
          <span className="whitespace-nowrap">Naturklang aktiv</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#8C7A6E]" />
          <span className="whitespace-nowrap">Klang zum Träumen</span>
        </>
      )}
    </button>
  );
};
