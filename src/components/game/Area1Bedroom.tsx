import { useState, useCallback, useMemo } from 'react';
import NarrativeText from './NarrativeText';

interface Props {
  heartsCollected: number;
  heartsNeeded: number;
  complete: boolean;
  onCollectHeart: () => void;
  narrationEnabled?: boolean;
  onPlayNarration?: (text: string) => void;
  isNarrationPlaying?: boolean;
  isNarrationLoading?: boolean;
}

const NARRATIVE = "Outside, the rain sings a gentle lullaby against the cherry blossom petals... Bubibu hugs his little pillow shaped like a heart, watching tiny raindrops race down the window. Each drop reminds him of Buba's giggle. He whispers to the moon, 'I hope she's looking at the same sky tonight...' The stars blink back, as if to say, 'She is, silly. She always is.' 🌸";

export default function Area1Bedroom({ heartsCollected, heartsNeeded, complete, onCollectHeart, narrationEnabled, onPlayNarration, isNarrationPlaying, isNarrationLoading }: Props) {
  const [tapped, setTapped] = useState<Set<number>>(new Set());

  const hearts = useMemo(() =>
    Array.from({ length: heartsNeeded + 2 }).map((_, i) => ({
      id: i,
      x: 15 + Math.random() * 70,
      y: 20 + Math.random() * 50,
      delay: Math.random() * 3,
      size: 20 + Math.random() * 16,
    })), [heartsNeeded]);

  const handleTap = useCallback((id: number) => {
    if (tapped.has(id) || complete) return;
    setTapped(s => new Set(s).add(id));
    onCollectHeart();
  }, [tapped, complete, onCollectHeart]);

  return (
    <section className="relative min-h-screen bg-pixel-night flex flex-col items-center justify-center overflow-hidden px-4 py-16">
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={`rain-${i}`} className="absolute w-[1px] h-4 bg-pixel-sky/30 animate-rain pointer-events-none"
          style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s`, animationDuration: `${1 + Math.random()}s` }} />
      ))}

      <div className="relative w-48 h-36 bg-pixel-night border-4 border-muted/30 rounded-sm mb-8 pixel-border overflow-hidden">
        <div className="absolute inset-2 bg-pixel-sky/10 rounded-sm flex items-center justify-center">
          <span className="font-pixel text-[8px] text-muted-foreground/50">🌙</span>
        </div>
        <div className="absolute top-3 right-4 w-6 h-6 rounded-full bg-pixel-gold/60 animate-pulse-glow" />
      </div>

      <div className="relative w-56 h-20 bg-muted/20 rounded-lg pixel-border-sm mb-6">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">😴</div>
        <div className="font-pixel text-[7px] text-muted-foreground absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">Bubibu's bed</div>
      </div>

      <NarrativeText text={NARRATIVE} visible={true} narrationEnabled={narrationEnabled} onPlayNarration={onPlayNarration} isNarrationPlaying={isNarrationPlaying} isNarrationLoading={isNarrationLoading} />

      <div className="relative w-full h-48 mt-6">
        {hearts.map(h => (
          <button key={h.id} onClick={() => handleTap(h.id)} disabled={tapped.has(h.id)}
            className={`absolute transition-all duration-300 select-none ${tapped.has(h.id) ? 'opacity-0 scale-0' : 'animate-float-slow active:scale-150 cursor-pointer'}`}
            style={{ left: `${h.x}%`, top: `${h.y}%`, fontSize: `${h.size}px`, animationDelay: `${h.delay}s` }}>💗</button>
        ))}
      </div>

      <div className="font-pixel text-[8px] text-pixel-pink mt-4">
        {complete ? '✨ Path lit! Scroll down...' : `💗 ${heartsCollected}/${heartsNeeded} hearts`}
      </div>

      {complete && (
        <div className="mt-8 flex flex-col items-center gap-2 animate-slide-up">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-pixel-pink animate-pulse-glow" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
          <span className="font-pixel text-[8px] text-pixel-pink/60 mt-2">↓</span>
        </div>
      )}
    </section>
  );
}
