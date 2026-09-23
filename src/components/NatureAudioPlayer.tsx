import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Waves } from 'lucide-react';

/**
 * Procedural soothing ocean waves (Meeresrauschen) sound synthesizer
 * using native Web Audio API (zero external network dependencies).
 */
export const NatureAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const lfoTimerRef = useRef<number | null>(null);

  const startSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Generate brownian noise buffer for deep soothing water mass
      const bufferSize = ctx.sampleRate * 4;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.03 * white) / 1.03;
        lastOut = output[i];
        output[i] *= 3.0;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // Filter to shape water texture
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, ctx.currentTime);
      filter.Q.setValueAtTime(2.0, ctx.currentTime);

      // Wave swell gain node
      const swellGain = ctx.createGain();
      swellGain.gain.setValueAtTime(0.15, ctx.currentTime);

      noiseSource.connect(filter);
      filter.connect(swellGain);
      swellGain.connect(masterGain);
      noiseSource.start();

      // 2. Slow periodic wave swell (LFO emulation via Web Audio parameter ramps)
      let isRising = true;
      const waveCycle = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const now = ctx.currentTime;
        if (isRising) {
          // Wave breaks and rushes onto the shore (3 to 4 seconds)
          const swellDuration = 3.2;
          swellGain.gain.cancelScheduledValues(now);
          swellGain.gain.linearRampToValueAtTime(0.9, now + swellDuration);

          filter.frequency.cancelScheduledValues(now);
          filter.frequency.exponentialRampToValueAtTime(650, now + swellDuration);

          isRising = false;
          lfoTimerRef.current = window.setTimeout(waveCycle, swellDuration * 1000);
        } else {
          // Wave recedes slowly into the sea (4 to 5 seconds)
          const recedeDuration = 4.2;
          swellGain.gain.cancelScheduledValues(now);
          swellGain.gain.linearRampToValueAtTime(0.12, now + recedeDuration);

          filter.frequency.cancelScheduledValues(now);
          filter.frequency.exponentialRampToValueAtTime(220, now + recedeDuration);

          isRising = true;
          lfoTimerRef.current = window.setTimeout(waveCycle, recedeDuration * 1000);
        }
      };

      waveCycle();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const stopSound = () => {
    if (lfoTimerRef.current) {
      clearTimeout(lfoTimerRef.current);
      lfoTimerRef.current = null;
    }
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6);
      setTimeout(() => {
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
      }, 600);
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
      if (lfoTimerRef.current) clearTimeout(lfoTimerRef.current);
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      type="button"
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 border cursor-pointer ${
        isPlaying
          ? 'bg-[#E3EBE3] border-[#728A71] text-[#2D3E2C] shadow-sm'
          : 'bg-[#F4EFEA]/80 border-[#DECFC1] text-[#69584D] hover:bg-[#EBE2D7] hover:text-[#382E28]'
      }`}
      title={isPlaying ? 'Meeresrauschen pausieren' : 'Sanftes Meeresrauschen abspielen'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#4E614D] animate-pulse" />
          <span className="whitespace-nowrap">Meeresrauschen aktiv</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#8C7A6E]" />
          <span className="whitespace-nowrap">Meeresrauschen</span>
        </>
      )}
    </button>
  );
};
