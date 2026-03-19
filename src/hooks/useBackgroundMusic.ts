import { useState, useCallback, useRef, useEffect } from 'react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export function useBackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);

  const generateAndPlay = useCallback(async () => {
    if (isLoading) return;

    // If already generated, just toggle
    if (urlRef.current && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/elevenlabs-music`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          body: JSON.stringify({
            prompt: "Gentle birthday music box melody, soft piano, dreamy cute celebration, warm cozy lo-fi ambient, sweet pastel atmosphere, magical eighteenth birthday feeling, tender and joyful",
            duration: 30,
          }),
        }
      );

      if (!response.ok) throw new Error('Music generation failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      urlRef.current = url;

      const audio = new Audio(url);
      audio.loop = true;
      audio.volume = 0.3;
      audioRef.current = audio;
      setIsReady(true);

      audio.onended = () => {
        // Loop is set, but just in case
        audio.currentTime = 0;
        audio.play();
      };

      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error('Background music error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const toggle = useCallback(() => {
    if (!audioRef.current) {
      generateAndPlay();
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying, generateAndPlay]);

  const setVolume = useCallback((vol: number) => {
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  return { isPlaying, isLoading, isReady, toggle, generateAndPlay, setVolume };
}
