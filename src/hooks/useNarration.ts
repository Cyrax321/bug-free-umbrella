import { useState, useCallback, useRef } from 'react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export function useNarration() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cacheRef = useRef<Map<string, string>>(new Map());

  const playNarration = useCallback(async (text: string) => {
    if (isPlaying || isLoading) return;

    // Check cache
    const cached = cacheRef.current.get(text);
    if (cached) {
      const audio = new Audio(cached);
      audioRef.current = audio;
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      await audio.play();
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) throw new Error('TTS failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      cacheRef.current.set(text, url);

      const audio = new Audio(url);
      audioRef.current = audio;
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      await audio.play();
    } catch (err) {
      console.error('Narration error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, isLoading]);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  return { playNarration, stop, isPlaying, isLoading };
}
