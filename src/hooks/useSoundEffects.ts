import { useCallback, useRef } from 'react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Pre-defined sound effect prompts for each game action
const SFX_PROMPTS: Record<string, { prompt: string; duration: number }> = {
  heartCollect: { prompt: "Cute magical sparkle chime, soft warm tinkle, pixel game collect item, sweet and gentle", duration: 1 },
  petalCollect: { prompt: "Soft breeze petal flutter, gentle whoosh with tiny bell, dreamy nature sound", duration: 1 },
  fireflysCatch: { prompt: "Tiny magical glow catch, soft fairy dust sparkle, warm buzzing light captured", duration: 1 },
  bridgePiece: { prompt: "Wooden plank placed, satisfying click clunk, building construction pixel game", duration: 1 },
  wordTap: { prompt: "Soft paper tap, gentle page turn, writing quill scratch, cozy", duration: 0.5 },
  puzzleComplete: { prompt: "Triumphant fanfare chime, magical success sparkle, achievement unlocked, sweet celebration jingle", duration: 2 },
  flowerPick: { prompt: "Gentle pluck from garden, soft nature pop, flower stem snap with sparkle", duration: 1 },
  giftWrap: { prompt: "Ribbon tying bow, wrapping paper rustle, gift box closing, satisfying", duration: 1 },
  cardFlip: { prompt: "Card flip turn over, soft whoosh, playing card reveal", duration: 0.5 },
  cardMatch: { prompt: "Matching pair success chime, cute sparkle ding, pixel game correct answer", duration: 1 },
  heartSync: { prompt: "Two heartbeats synchronizing into one, warm pulsing glow, magical harmony", duration: 2 },
  starCatch: { prompt: "Shooting star caught, cosmic sparkle grab, magical twinkle catch", duration: 1 },
  constellationConnect: { prompt: "Star connection beam, cosmic line drawing, gentle electric hum with sparkle", duration: 1 },
  lanternLight: { prompt: "Lantern flame ignite, warm candle light up, soft fire crackle glow", duration: 1 },
  cakeCut: { prompt: "Cake cutting slice, knife through soft sponge, celebration moment", duration: 1.5 },
  wishMade: { prompt: "Magical wish granted, dreamy sparkle explosion, fairy dust celebration, warm and joyful", duration: 3 },
  areaComplete: { prompt: "Level complete jingle, achievement unlocked fanfare, sweet victory chime, pixel game success", duration: 2 },
};

export function useSoundEffects() {
  const cacheRef = useRef<Map<string, string>>(new Map());
  const playingRef = useRef<Set<string>>(new Set());

  const playSfx = useCallback(async (sfxKey: string) => {
    // Don't play same SFX simultaneously
    if (playingRef.current.has(sfxKey)) return;

    const sfxDef = SFX_PROMPTS[sfxKey];
    if (!sfxDef) return;

    // Check cache first
    const cached = cacheRef.current.get(sfxKey);
    if (cached) {
      try {
        const audio = new Audio(cached);
        audio.volume = 0.5;
        playingRef.current.add(sfxKey);
        audio.onended = () => playingRef.current.delete(sfxKey);
        audio.onerror = () => playingRef.current.delete(sfxKey);
        await audio.play();
      } catch (e) {
        playingRef.current.delete(sfxKey);
      }
      return;
    }

    // Generate via edge function
    try {
      playingRef.current.add(sfxKey);
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/elevenlabs-sfx`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          body: JSON.stringify({ prompt: sfxDef.prompt, duration: sfxDef.duration }),
        }
      );

      if (!response.ok) {
        playingRef.current.delete(sfxKey);
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      cacheRef.current.set(sfxKey, url);

      const audio = new Audio(url);
      audio.volume = 0.5;
      audio.onended = () => playingRef.current.delete(sfxKey);
      audio.onerror = () => playingRef.current.delete(sfxKey);
      await audio.play();
    } catch (e) {
      console.error('SFX error:', e);
      playingRef.current.delete(sfxKey);
    }
  }, []);

  // Pre-generate commonly used SFX in background
  const preload = useCallback(async (keys: string[]) => {
    for (const key of keys) {
      if (cacheRef.current.has(key)) continue;
      const sfxDef = SFX_PROMPTS[key];
      if (!sfxDef) continue;
      try {
        const response = await fetch(
          `${SUPABASE_URL}/functions/v1/elevenlabs-sfx`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
            body: JSON.stringify({ prompt: sfxDef.prompt, duration: sfxDef.duration }),
          }
        );
        if (response.ok) {
          const blob = await response.blob();
          cacheRef.current.set(key, URL.createObjectURL(blob));
        }
      } catch (e) {
        // silent fail on preload
      }
    }
  }, []);

  return { playSfx, preload };
}
