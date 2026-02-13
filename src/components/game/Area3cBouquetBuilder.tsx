import { useState, useCallback, useMemo } from 'react';
import NarrativeText from './NarrativeText';
import { PixelHeart, PixelFlower, PixelPetal, PixelSparkle, PixelLock } from './PixelSprites';

interface Props {
  unlocked: boolean;
  complete: boolean;
  flowersCollected: number;
  flowersNeeded: number;
  onCollectFlower: () => void;
  narrationEnabled?: boolean;
  onPlayNarration?: (text: string) => void;
  isNarrationPlaying?: boolean;
  isNarrationLoading?: boolean;
}

const NARRATIVE = "In the enchanted meadow beyond the bridge, the most beautiful flowers in the world bloom only when touched by true love. Bubibu kneels down, gently picking each one for Buba's bouquet. Pink roses for passion, lavender for devotion, white lilies for purity, and cherry blossoms for everlasting love. 'The prettiest bouquet for the prettiest girl in the whole universe,' he says, blushing.";

const FLOWER_TYPES = [
  { name: 'Pink Rose', colors: ['#e85d75', '#f4a0b0', '#fde4ec'] },
  { name: 'Lavender', colors: ['#b8a9c9', '#d4c4e0', '#e8ddf0'] },
  { name: 'White Lily', colors: ['#f0f0f0', '#ffffff', '#fafafa'] },
  { name: 'Cherry Blossom', colors: ['#f7c4d0', '#fde4ec', '#fff0f5'] },
  { name: 'Sunflower', colors: ['#ffd966', '#f39c12', '#fff3b0'] },
  { name: 'Forget-me-not', colors: ['#87ceeb', '#5dade2', '#aed6f1'] },
  { name: 'Red Rose', colors: ['#c0392b', '#e74c3c', '#f1948a'] },
  { name: 'Daisy', colors: ['#ffffff', '#ffd966', '#fffbe6'] },
];

// Pixel flower with custom colors
function CustomPixelFlower({ colors, size = 3 }: { colors: string[]; size?: number }) {
  const s = size;
  const [outer, mid, inner] = colors;
  return (
    <div className="inline-grid" style={{ gridTemplateColumns: `repeat(5, ${s}px)`, gap: 0 }}>
      {[
        ['_', outer, '_', outer, '_'],
        [outer, mid, inner, mid, outer],
        ['_', outer, '_', outer, '_'],
        ['_', '_', '#5a8f3c', '_', '_'],
        ['_', '_', '#5a8f3c', '_', '_'],
      ].flat().map((c, i) => (
        <div key={i} style={{ width: s, height: s, backgroundColor: c === '_' ? 'transparent' : c }} />
      ))}
    </div>
  );
}

export default function Area3cBouquetBuilder({ unlocked, complete, flowersCollected, flowersNeeded, onCollectFlower, narrationEnabled, onPlayNarration, isNarrationPlaying, isNarrationLoading }: Props) {
  const [picked, setPicked] = useState<Set<number>>(new Set());

  const positions = useMemo(() =>
    Array.from({ length: flowersNeeded + 2 }).map((_, i) => ({
      id: i, x: 5 + Math.random() * 80, y: 10 + Math.random() * 65,
      type: i % FLOWER_TYPES.length,
      sway: Math.random() * 3,
    })), [flowersNeeded]);

  const handlePick = useCallback((id: number) => {
    if (picked.has(id) || complete) return;
    setPicked(s => new Set(s).add(id));
    onCollectFlower();
  }, [picked, complete, onCollectFlower]);

  if (!unlocked) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, hsl(120 15% 10%), hsl(150 20% 8%))' }}>
        <div className="font-pixel text-[8px] text-muted-foreground/40 animate-pulse-glow flex items-center gap-2">
          <PixelLock size={3} /> Complete the puzzle above to continue...
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16"
      style={{ background: 'linear-gradient(180deg, hsl(120 15% 10%), hsl(150 20% 12%), hsl(130 15% 8%))' }}>
      
      {/* Background petals */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="absolute pointer-events-none animate-petal opacity-30"
          style={{ left: `${Math.random() * 100}%`, top: '-10px', animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s` }}>
          <PixelPetal size={2} />
        </div>
      ))}

      <NarrativeText text={NARRATIVE} visible={true} narrationEnabled={narrationEnabled} onPlayNarration={onPlayNarration} isNarrationPlaying={isNarrationPlaying} isNarrationLoading={isNarrationLoading} />

      {/* Bouquet preview */}
      <div className="mt-6 flex flex-col items-center">
        <div className="font-pixel text-[7px] text-pixel-pink mb-2">Buba's Bouquet</div>
        <div className="flex flex-wrap gap-1 justify-center bg-muted/20 rounded-lg px-4 py-3 pixel-border-sm min-h-[50px] min-w-[120px]">
          {Array.from(picked).map(id => {
            const type = positions.find(p => p.id === id)?.type ?? 0;
            return (
              <div key={id} className="animate-slide-up">
                <CustomPixelFlower colors={FLOWER_TYPES[type].colors} size={3} />
              </div>
            );
          })}
          {picked.size === 0 && (
            <span className="font-pixel text-[6px] text-muted-foreground/40">Pick flowers below...</span>
          )}
        </div>
      </div>

      {/* Flower meadow */}
      <div className="relative w-full h-64 mt-6">
        {positions.map(p => (
          <button key={p.id} onClick={() => handlePick(p.id)} disabled={picked.has(p.id)}
            className={`absolute transition-all duration-500 select-none ${picked.has(p.id) ? 'opacity-0 scale-0 -translate-y-8' : 'cursor-pointer active:scale-125 animate-float'}`}
            style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.sway}s` }}>
            <CustomPixelFlower colors={FLOWER_TYPES[p.type].colors} size={4} />
          </button>
        ))}
      </div>

      <div className="font-pixel text-[8px] text-pixel-pink mt-4 flex items-center gap-1">
        {complete ? (
          <><PixelFlower size={2} /> Beautiful bouquet complete! Continue... <PixelFlower size={2} /></>
        ) : (
          <><PixelFlower size={2} /> {flowersCollected}/{flowersNeeded} flowers picked</>
        )}
      </div>
      {complete && (
        <div className="mt-6 flex items-center gap-2 animate-bounce-gentle">
          <PixelHeart size={3} />
          <PixelFlower size={3} />
          <PixelHeart size={3} />
        </div>
      )}
    </section>
  );
}
