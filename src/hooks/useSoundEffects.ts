import { useCallback, useRef } from 'react';

// Romantic musical notes (pentatonic scale in C major - always sounds pleasant)
const NOTES: Record<string, number> = {
  C4: 261.63, D4: 293.66, E4: 329.63, G4: 392.00, A4: 440.00,
  C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880.00,
  C6: 1046.50,
};

type SfxType = 'heartCollect' | 'petalCollect' | 'fireflysCatch' | 'bridgePiece' |
  'wordTap' | 'puzzleComplete' | 'flowerPick' | 'giftWrap' | 'cardFlip' |
  'cardMatch' | 'heartSync' | 'starCatch' | 'constellationConnect' |
  'lanternLight' | 'cakeCut' | 'wishMade' | 'areaComplete';

function getAudioContext(): AudioContext {
  // Reuse a single AudioContext
  if (!(window as any).__sfxCtx) {
    (window as any).__sfxCtx = new AudioContext();
  }
  return (window as any).__sfxCtx;
}

function playTone(ctx: AudioContext, freq: number, startTime: number, duration: number, volume: number, type: OscillatorType = 'sine') {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

function playChime(ctx: AudioContext, notes: number[], spacing: number, duration: number, volume: number, type: OscillatorType = 'sine') {
  const now = ctx.currentTime;
  notes.forEach((freq, i) => {
    playTone(ctx, freq, now + i * spacing, duration, volume, type);
  });
}

// Each SFX is a unique romantic musical pattern
const SFX_PLAYERS: Record<SfxType, () => void> = {
  // Soft ascending sparkle chime ✨
  heartCollect: () => {
    const ctx = getAudioContext();
    playChime(ctx, [NOTES.E5, NOTES.G5, NOTES.A5, NOTES.C6], 0.06, 0.4, 0.15);
  },

  // Gentle breeze whoosh with bell 🌸
  petalCollect: () => {
    const ctx = getAudioContext();
    playChime(ctx, [NOTES.C5, NOTES.E5, NOTES.G5], 0.08, 0.35, 0.12);
  },

  // Twinkling fairy light ✨
  fireflysCatch: () => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    playTone(ctx, NOTES.A5, now, 0.15, 0.1);
    playTone(ctx, NOTES.C6, now + 0.08, 0.2, 0.12);
    playTone(ctx, NOTES.E5, now + 0.15, 0.3, 0.08, 'triangle');
  },

  // Satisfying wooden click 🌉
  bridgePiece: () => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    playTone(ctx, NOTES.G4, now, 0.15, 0.18, 'square');
    playTone(ctx, NOTES.C5, now + 0.1, 0.25, 0.12);
  },

  // Soft paper tap 💌
  wordTap: () => {
    const ctx = getAudioContext();
    playTone(ctx, NOTES.E5, ctx.currentTime, 0.12, 0.1);
  },

  // Triumphant ascending fanfare 🎉
  puzzleComplete: () => {
    const ctx = getAudioContext();
    playChime(ctx, [NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C6, NOTES.E5, NOTES.G5, NOTES.C6], 0.1, 0.5, 0.15);
  },

  // Garden pluck with sparkle 💐
  flowerPick: () => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    playTone(ctx, NOTES.D5, now, 0.2, 0.12, 'triangle');
    playTone(ctx, NOTES.A5, now + 0.1, 0.3, 0.1);
  },

  // Ribbon bow tying 🎁
  giftWrap: () => {
    const ctx = getAudioContext();
    playChime(ctx, [NOTES.G4, NOTES.C5, NOTES.E5], 0.07, 0.3, 0.13, 'triangle');
  },

  // Card whoosh 🃏
  cardFlip: () => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    playTone(ctx, NOTES.D5, now, 0.1, 0.08);
    playTone(ctx, NOTES.G5, now + 0.05, 0.15, 0.06);
  },

  // Matching success ding 🃏✓
  cardMatch: () => {
    const ctx = getAudioContext();
    playChime(ctx, [NOTES.E5, NOTES.G5, NOTES.C6], 0.08, 0.35, 0.14);
  },

  // Two heartbeats merging into one 💓
  heartSync: () => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    // Left heart
    playTone(ctx, NOTES.C4, now, 0.2, 0.12);
    playTone(ctx, NOTES.C4, now + 0.25, 0.15, 0.1);
    // Right heart
    playTone(ctx, NOTES.E4, now + 0.5, 0.2, 0.12);
    playTone(ctx, NOTES.E4, now + 0.75, 0.15, 0.1);
    // Merged
    playChime(ctx, [NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C6], 0.12, 0.6, 0.15);
  },

  // Cosmic twinkle catch ⭐
  starCatch: () => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    playTone(ctx, NOTES.A5, now, 0.15, 0.1, 'triangle');
    playTone(ctx, NOTES.C6, now + 0.06, 0.25, 0.12);
    playTone(ctx, NOTES.G5, now + 0.15, 0.2, 0.08);
  },

  // Star connection sparkle ⭐→⭐
  constellationConnect: () => {
    const ctx = getAudioContext();
    playChime(ctx, [NOTES.E5, NOTES.A5], 0.1, 0.3, 0.1, 'triangle');
  },

  // Warm flame ignite 🏮
  lanternLight: () => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    playTone(ctx, NOTES.D4, now, 0.3, 0.1, 'triangle');
    playTone(ctx, NOTES.A4, now + 0.15, 0.4, 0.12);
    playTone(ctx, NOTES.D5, now + 0.3, 0.3, 0.1);
  },

  // Cake cutting celebration 🎂
  cakeCut: () => {
    const ctx = getAudioContext();
    playChime(ctx, [NOTES.G4, NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C6], 0.08, 0.4, 0.14);
  },

  // Grand magical wish — the most romantic one 💫
  wishMade: () => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    // Ascending dream arpeggio
    const melody = [NOTES.C4, NOTES.E4, NOTES.G4, NOTES.C5, NOTES.E5, NOTES.G5, NOTES.A5, NOTES.C6];
    melody.forEach((freq, i) => {
      playTone(ctx, freq, now + i * 0.12, 0.8, 0.12 + i * 0.005);
      // Harmony layer
      playTone(ctx, freq * 1.5, now + i * 0.12 + 0.03, 0.6, 0.06, 'triangle');
    });
  },

  // Level complete fanfare 🏆
  areaComplete: () => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const melody = [NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C6];
    melody.forEach((freq, i) => {
      playTone(ctx, freq, now + i * 0.15, 0.6, 0.15);
      playTone(ctx, freq * 0.5, now + i * 0.15, 0.5, 0.08, 'triangle');
    });
    // Final shimmer
    playTone(ctx, NOTES.C6, now + 0.7, 1.0, 0.12);
    playTone(ctx, NOTES.G5, now + 0.75, 0.8, 0.08, 'triangle');
  },
};

export function useSoundEffects() {
  const playSfx = useCallback((sfxKey: string) => {
    const player = SFX_PLAYERS[sfxKey as SfxType];
    if (player) {
      try { player(); } catch (e) { /* silent */ }
    }
  }, []);

  const preload = useCallback((_keys: string[]) => {
    // No-op: Web Audio doesn't need preloading
  }, []);

  return { playSfx, preload };
}
