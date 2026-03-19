import { useState, useCallback, useMemo, useEffect } from 'react';
import NarrativeText from './NarrativeText';
import { PixelTree, PixelHeart, PixelStar, PixelLock } from './PixelSprites';

interface Props {
  unlocked: boolean;
  firefliesCaught: number;
  firefliesNeeded: number;
  complete: boolean;
  onCatchFirefly: () => void;
  narrationEnabled?: boolean;
  onPlayNarration?: (text: string) => void;
  isNarrationPlaying?: boolean;
  isNarrationLoading?: boolean;
}

const NARRATIVE = "Beyond the garden, a firefly forest wakes up in little golden blinks. Bubibo laughs softly as he catches the lights one by one, because each glowing speck will become part of Anya's birthday lantern trail. The trees hum around him, turning the whole forest into a secret helper for the surprise.";

// Firefly pixel sprite
function PixelFirefly({ size = 3 }: { size?: number }) {
  const s = size;
  return (
    <div className="relative">
      <div className="rounded-full animate-pulse-glow" style={{
        width: s * 4, height: s * 4,
        background: 'radial-gradient(circle, #ffd966, #f39c12 60%, transparent 80%)',
        boxShadow: '0 0 8px #ffd966, 0 0 16px #f39c1266',
      }} />
    </div>
  );
}

export default function Area2bFireflyForest({ unlocked, firefliesCaught, firefliesNeeded, complete, onCatchFirefly, narrationEnabled, onPlayNarration, isNarrationPlaying, isNarrationLoading }: Props) {
  const [caught, setCaught] = useState<Set<number>>(new Set());
  const [positions, setPositions] = useState<{ id: number; x: number; y: number }[]>([]);

  // Randomize firefly positions and re-randomize periodically
  const totalFireflies = firefliesNeeded + 4;
  
  useEffect(() => {
    const gen = () => Array.from({ length: totalFireflies }, (_, i) => ({
      id: i, x: 5 + Math.random() * 85, y: 5 + Math.random() * 75,
    }));
    setPositions(gen());
    const interval = setInterval(() => {
      setPositions(prev => prev.map(p => caught.has(p.id) ? p : {
        ...p, x: Math.max(5, Math.min(85, p.x + (Math.random() - 0.5) * 20)),
        y: Math.max(5, Math.min(75, p.y + (Math.random() - 0.5) * 15)),
      }));
    }, 1800);
    return () => clearInterval(interval);
  }, [totalFireflies, caught]);

  const handleCatch = useCallback((id: number) => {
    if (caught.has(id) || complete) return;
    setCaught(s => new Set(s).add(id));
    onCatchFirefly();
  }, [caught, complete, onCatchFirefly]);

  if (!unlocked) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, hsl(176 44% 78%), hsl(205 74% 72%))' }}>
        <div className="font-pixel text-[8px] text-muted-foreground/40 animate-pulse-glow flex items-center gap-2">
          <PixelLock size={3} /> Collect petals above to continue...
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16"
      style={{ background: 'linear-gradient(180deg, hsl(173 44% 76%), hsl(201 70% 69%), hsl(219 53% 60%))' }}>
      
      {/* Dark forest trees */}
      <div className="flex gap-10 mb-4 opacity-40">
        <PixelTree size={5} />
        <PixelTree size={6} />
        <PixelTree size={5} />
      </div>

      <NarrativeText text={NARRATIVE} visible={true} narrationEnabled={narrationEnabled} onPlayNarration={onPlayNarration} isNarrationPlaying={isNarrationPlaying} isNarrationLoading={isNarrationLoading} />

      {/* Firefly catching area */}
      <div className="relative w-full h-64 mt-6">
        {positions.map(p => (
          <button key={p.id} onClick={() => handleCatch(p.id)} disabled={caught.has(p.id)}
            className={`absolute transition-all duration-1000 ease-in-out select-none ${caught.has(p.id) ? 'opacity-0 scale-0' : 'cursor-pointer active:scale-150'}`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <PixelFirefly size={3} />
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="flex gap-1.5 items-center mt-4">
        {Array.from({ length: firefliesNeeded }).map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full transition-all duration-500 ${i < firefliesCaught ? 'bg-pixel-gold animate-pulse-glow' : 'bg-muted/20'}`}
            style={{ boxShadow: i < firefliesCaught ? '0 0 6px #ffd966' : 'none' }} />
        ))}
      </div>
      <div className="font-pixel text-[8px] text-pixel-gold mt-3 flex items-center gap-1">
        {complete ? (
          <><PixelStar size={2} /> Lantern lights collected! Continue... <PixelStar size={2} /></>
        ) : (
          <><PixelStar size={2} /> {firefliesCaught}/{firefliesNeeded} fireflies</>
        )}
      </div>
      {complete && <div className="mt-6 animate-bounce-gentle"><PixelHeart size={3} /></div>}
    </section>
  );
}
