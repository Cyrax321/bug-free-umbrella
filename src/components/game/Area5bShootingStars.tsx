import { useState, useCallback, useEffect, useRef } from 'react';
import NarrativeText from './NarrativeText';
import { PixelStar, PixelHeart, PixelSparkle, PixelMoon, PixelLock } from './PixelSprites';

interface Props {
  unlocked: boolean;
  starsCaught: number;
  starsNeeded: number;
  complete: boolean;
  onCatchStar: () => void;
  narrationEnabled?: boolean;
  onPlayNarration?: (text: string) => void;
  isNarrationPlaying?: boolean;
  isNarrationLoading?: boolean;
}

const NARRATIVE = "Above the hill, birthday stars start darting across the sky like glowing candles with tails. Bubibo reaches for them one by one, collecting wishes he wants to tuck into Anya's celebration. Each star feels like a tiny promise that her 18th year will be bright, gentle, and full of joy.";

interface FallingStar {
  id: number;
  x: number;
  startY: number;
  speed: number;
  size: number;
}

export default function Area5bShootingStars({ unlocked, starsCaught, starsNeeded, complete, onCatchStar, narrationEnabled, onPlayNarration, isNarrationPlaying, isNarrationLoading }: Props) {
  const [stars, setStars] = useState<FallingStar[]>([]);
  const [caught, setCaught] = useState<Set<number>>(new Set());
  const nextId = useRef(0);

  // Spawn stars periodically
  useEffect(() => {
    if (complete || !unlocked) return;
    const interval = setInterval(() => {
      setStars(prev => {
        // Remove old stars (off-screen)
        const filtered = prev.filter(s => !caught.has(s.id)).slice(-12);
        const newStar: FallingStar = {
          id: nextId.current++,
          x: 5 + Math.random() * 85,
          startY: -5,
          speed: 2 + Math.random() * 3,
          size: 2 + Math.floor(Math.random() * 2),
        };
        return [...filtered, newStar];
      });
    }, 900);
    return () => clearInterval(interval);
  }, [complete, unlocked, caught]);

  // Animate stars falling
  useEffect(() => {
    if (complete) return;
    const anim = setInterval(() => {
      setStars(prev => prev.map(s => ({ ...s, startY: s.startY + s.speed })).filter(s => s.startY < 105));
    }, 100);
    return () => clearInterval(anim);
  }, [complete]);

  const handleCatch = useCallback((id: number) => {
    if (caught.has(id) || complete) return;
    setCaught(s => new Set(s).add(id));
    onCatchStar();
  }, [caught, complete, onCatchStar]);

  if (!unlocked) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, hsl(214 96% 79%), hsl(258 81% 79%))' }}>
        <div className="font-pixel text-[8px] text-muted-foreground/40 animate-pulse-glow flex items-center gap-2">
          <PixelLock size={3} /> Sync hearts above to continue...
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16"
      style={{ background: 'linear-gradient(180deg, hsl(214 96% 79%), hsl(258 81% 79%), hsl(337 87% 83%))' }}>
      
      {/* Moon */}
      <div className="mb-4 animate-pulse-glow"><PixelMoon size={4} /></div>

      <NarrativeText text={NARRATIVE} visible={true} narrationEnabled={narrationEnabled} onPlayNarration={onPlayNarration} isNarrationPlaying={isNarrationPlaying} isNarrationLoading={isNarrationLoading} />

      {/* Star field */}
      <div className="relative w-full h-72 mt-6 overflow-hidden rounded-lg bg-background/20">
        {/* Background twinkles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`bg-${i}`} className="absolute animate-sparkle pointer-events-none opacity-30"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }}>
            <PixelStar size={1} />
          </div>
        ))}

        {/* Falling stars */}
        {stars.filter(s => !caught.has(s.id)).map(s => (
          <button key={s.id} onClick={() => handleCatch(s.id)}
            className="absolute transition-none select-none cursor-pointer active:scale-150 z-10"
            style={{ left: `${s.x}%`, top: `${s.startY}%` }}>
            <div className="animate-sparkle" style={{ animationDuration: '0.5s' }}>
              <PixelStar size={s.size} />
            </div>
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="flex gap-1.5 items-center mt-4">
        {Array.from({ length: starsNeeded }).map((_, i) => (
          <div key={i} className={`transition-all duration-500 ${i < starsCaught ? 'animate-pulse-glow' : 'opacity-20'}`}>
            <PixelStar size={2} />
          </div>
        ))}
      </div>
      <div className="font-pixel text-[8px] text-pixel-gold mt-3 flex items-center gap-1">
        {complete ? (
          <><PixelSparkle size={2} /> Birthday wishes collected! Continue... <PixelSparkle size={2} /></>
        ) : (
          <><PixelStar size={2} /> {starsCaught}/{starsNeeded} stars caught</>
        )}
      </div>
      {complete && <div className="mt-6 animate-bounce-gentle"><PixelHeart size={3} /></div>}
    </section>
  );
}
