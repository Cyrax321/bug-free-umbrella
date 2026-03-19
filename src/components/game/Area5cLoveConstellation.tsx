import { useState, useCallback } from 'react';
import NarrativeText from './NarrativeText';
import { PixelHeart, PixelStar, PixelSparkle, PixelMoon, PixelLock } from './PixelSprites';

interface Props {
  unlocked: boolean;
  complete: boolean;
  onComplete: () => void;
  narrationEnabled?: boolean;
  onPlayNarration?: (text: string) => void;
  isNarrationPlaying?: boolean;
  isNarrationLoading?: boolean;
}

const NARRATIVE = "The sky becomes a giant birthday card, and the stars wait for Bubibo to connect them into one glowing shape. Line by line, the constellation turns into a giant heart for Anya, as if the whole night sky decided her 18th deserves its own decoration. It is sweet, a little dramatic, and exactly right.";

// Star positions forming a heart constellation
const CONSTELLATION_STARS = [
  { id: 0, x: 50, y: 85 },  // bottom point
  { id: 1, x: 35, y: 65 },  // left lower
  { id: 2, x: 20, y: 45 },  // left mid
  { id: 3, x: 15, y: 25 },  // left upper
  { id: 4, x: 25, y: 10 },  // left top
  { id: 5, x: 40, y: 20 },  // center-left top
  { id: 6, x: 50, y: 30 },  // center dip
  { id: 7, x: 60, y: 20 },  // center-right top
  { id: 8, x: 75, y: 10 },  // right top
  { id: 9, x: 85, y: 25 },  // right upper
  { id: 10, x: 80, y: 45 }, // right mid
  { id: 11, x: 65, y: 65 }, // right lower
];

// Lines connecting in order to form heart shape
const CONNECTIONS = CONSTELLATION_STARS.map((_, i) => [i, (i + 1) % CONSTELLATION_STARS.length]);

export default function Area5cLoveConstellation({ unlocked, complete, onComplete, narrationEnabled, onPlayNarration, isNarrationPlaying, isNarrationLoading }: Props) {
  const [connected, setConnected] = useState<number[]>([0]); // Start with first star lit
  const [celebrating, setCelebrating] = useState(false);

  const nextStar = connected.length < CONSTELLATION_STARS.length ? connected[connected.length - 1] : -1;
  const expectedNext = nextStar >= 0 ? (nextStar + 1) % CONSTELLATION_STARS.length : -1;

  const handleTapStar = useCallback((id: number) => {
    if (complete || celebrating) return;
    if (id === expectedNext) {
      const newConnected = [...connected, id];
      setConnected(newConnected);
      if (newConnected.length >= CONSTELLATION_STARS.length) {
        setCelebrating(true);
        setTimeout(() => onComplete(), 2000);
      }
    }
  }, [connected, expectedNext, complete, celebrating, onComplete]);

  if (!unlocked) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, hsl(217 97% 78%), hsl(263 83% 81%))' }}>
        <div className="font-pixel text-[8px] text-muted-foreground/40 animate-pulse-glow flex items-center gap-2">
          <PixelLock size={3} /> Match all cards above to continue...
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16"
      style={{ background: 'linear-gradient(180deg, hsl(217 97% 78%), hsl(263 83% 81%), hsl(45 100% 84%))' }}>
      
      {/* Background twinkles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="absolute pointer-events-none animate-sparkle opacity-15"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 4}s`, animationDuration: `${1.5 + Math.random() * 2}s` }}>
          <PixelStar size={1} />
        </div>
      ))}

      <div className="mb-4"><PixelMoon size={4} /></div>
      <NarrativeText text={NARRATIVE} visible={true} narrationEnabled={narrationEnabled} onPlayNarration={onPlayNarration} isNarrationPlaying={isNarrationPlaying} isNarrationLoading={isNarrationLoading} />

      {/* Constellation canvas */}
      <div className="relative w-full max-w-xs h-72 mt-8">
        {/* SVG lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {CONNECTIONS.map(([from, to], i) => {
            const fromStar = CONSTELLATION_STARS[from];
            const toStar = CONSTELLATION_STARS[to];
            const isDrawn = connected.includes(from) && connected.includes(to);
            return (
              <line key={i}
                x1={fromStar.x} y1={fromStar.y}
                x2={toStar.x} y2={toStar.y}
                stroke={isDrawn ? '#e85d75' : '#333'}
                strokeWidth={isDrawn ? 0.8 : 0.3}
                opacity={isDrawn ? 0.8 : 0.2}
                className={isDrawn ? 'transition-all duration-500' : ''}
              />
            );
          })}
        </svg>

        {/* Stars */}
        {CONSTELLATION_STARS.map(star => {
          const isLit = connected.includes(star.id);
          const isNext = star.id === expectedNext;
          return (
            <button key={star.id} onClick={() => handleTapStar(star.id)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                isLit ? 'animate-pulse-glow z-10' : 
                isNext ? 'animate-bounce-gentle cursor-pointer z-10' : 'opacity-30'
              }`}
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              disabled={!isNext}>
              <PixelStar size={isLit ? 3 : isNext ? 3 : 2} />
            </button>
          );
        })}

        {/* Celebration overlay */}
        {celebrating && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-heartbeat">
              <PixelHeart size={8} />
            </div>
          </div>
        )}
      </div>

      <div className="font-pixel text-[8px] text-pixel-gold mt-4 flex items-center gap-1">
        {complete ? (
          <><PixelSparkle size={2} /> Birthday constellation complete! Continue... <PixelSparkle size={2} /></>
        ) : (
          <><PixelStar size={2} /> {connected.length}/{CONSTELLATION_STARS.length} stars connected</>
        )}
      </div>
      {complete && <div className="mt-6 animate-bounce-gentle"><PixelHeart size={3} /></div>}
    </section>
  );
}
