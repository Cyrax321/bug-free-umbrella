import { useState, useCallback, useMemo } from 'react';
import NarrativeText from './NarrativeText';
import { PixelHeart, PixelMoon, PixelWindow, PixelBed, PixelBubibu, PixelRaindrop, PixelStar } from './PixelSprites';

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

const NARRATIVE = "The night before Anya's 18th birthday feels extra sparkly somehow. Bubibo sits by his window with a sleepy smile, planning the cutest little surprise he can. The moonlight drips across the room like silver ribbon while he whispers, 'Tomorrow has to feel like a hug she can step into.' Tiny glowing hearts begin floating around him, as if the night itself wants to help.";

export default function Area1Bedroom({ heartsCollected, heartsNeeded, complete, onCollectHeart, narrationEnabled, onPlayNarration, isNarrationPlaying, isNarrationLoading }: Props) {
  const [tapped, setTapped] = useState<Set<number>>(new Set());

  const hearts = useMemo(() =>
    Array.from({ length: heartsNeeded + 2 }).map((_, i) => ({
      id: i,
      x: 15 + Math.random() * 70,
      y: 20 + Math.random() * 50,
      delay: Math.random() * 3,
      size: Math.random() > 0.5 ? 3 : 4,
    })), [heartsNeeded]);

  const handleTap = useCallback((id: number) => {
    if (tapped.has(id) || complete) return;
    setTapped(s => new Set(s).add(id));
    onCollectHeart();
  }, [tapped, complete, onCollectHeart]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16"
      style={{ background: 'linear-gradient(180deg, hsl(206 92% 88%), hsl(253 82% 87%), hsl(344 90% 90%))' }}>
      {/* Pixel raindrops */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={`rain-${i}`} className="absolute animate-rain pointer-events-none"
          style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s`, animationDuration: `${1 + Math.random()}s` }}>
          <PixelRaindrop />
        </div>
      ))}

      {/* Pixel window with moon */}
      <div className="relative mb-6">
        <PixelWindow size={8} />
        <div className="absolute top-2 right-3 animate-pulse-glow">
          <PixelMoon size={3} />
        </div>
      </div>

      {/* Pixel bed with Bubibu sleeping */}
      <div className="relative mb-6">
        <PixelBed size={5} />
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <PixelBubibu size={3} />
        </div>
        <div className="font-pixel text-[7px] text-muted-foreground mt-1 text-center">Bubibo's room</div>
      </div>

      <NarrativeText text={NARRATIVE} visible={true} narrationEnabled={narrationEnabled} onPlayNarration={onPlayNarration} isNarrationPlaying={isNarrationPlaying} isNarrationLoading={isNarrationLoading} />

      {/* Collectible pixel hearts */}
      <div className="relative w-full h-48 mt-6">
        {hearts.map(h => (
          <button key={h.id} onClick={() => handleTap(h.id)} disabled={tapped.has(h.id)}
            className={`absolute transition-all duration-300 select-none ${tapped.has(h.id) ? 'opacity-0 scale-0' : 'animate-float-slow active:scale-150 cursor-pointer'}`}
            style={{ left: `${h.x}%`, top: `${h.y}%`, animationDelay: `${h.delay}s` }}>
            <PixelHeart size={h.size} />
          </button>
        ))}
      </div>

      <div className="font-pixel text-[8px] text-pixel-pink mt-4 flex items-center gap-2">
        {complete ? (
          <>
            <PixelStar size={2} /> Path lit! Scroll down... <PixelStar size={2} />
          </>
        ) : (
          <>
            <PixelHeart size={2} /> {heartsCollected}/{heartsNeeded} birthday sparks
          </>
        )}
      </div>

      {complete && (
        <div className="mt-8 flex flex-col items-center gap-2 animate-slide-up">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-pixel-pink animate-pulse-glow" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
          <span className="font-pixel text-[8px] text-pixel-pink/60 mt-2">
            <div className="animate-bounce-gentle"><PixelHeart size={2} /></div>
          </span>
        </div>
      )}
    </section>
  );
}
