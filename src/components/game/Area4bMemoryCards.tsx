import { useState, useCallback, useEffect } from 'react';
import NarrativeText from './NarrativeText';
import { PixelHeart, PixelPetal, PixelStar, PixelSparkle, PixelFlower, PixelMoon, PixelLock } from './PixelSprites';

interface Props {
  unlocked: boolean;
  complete: boolean;
  onComplete: () => void;
  narrationEnabled?: boolean;
  onPlayNarration?: (text: string) => void;
  isNarrationPlaying?: boolean;
  isNarrationLoading?: boolean;
}

const NARRATIVE = "In a soft little clearing, a birthday memory game waits on a blanket of petals. Every matching pair unlocks another detail of the surprise Bubibo has been preparing for Anya. The cards shimmer like they are just as excited as he is.";

type CardSymbol = 'heart' | 'petal' | 'star' | 'sparkle' | 'flower' | 'moon';
const SYMBOLS: CardSymbol[] = ['heart', 'petal', 'star', 'sparkle', 'flower', 'moon'];

function CardIcon({ symbol, size = 3 }: { symbol: CardSymbol; size?: number }) {
  switch (symbol) {
    case 'heart': return <PixelHeart size={size} />;
    case 'petal': return <PixelPetal size={size} />;
    case 'star': return <PixelStar size={size} />;
    case 'sparkle': return <PixelSparkle size={size} />;
    case 'flower': return <PixelFlower size={size} />;
    case 'moon': return <PixelMoon size={size} />;
  }
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Area4bMemoryCards({ unlocked, complete, onComplete, narrationEnabled, onPlayNarration, isNarrationPlaying, isNarrationLoading }: Props) {
  const [cards] = useState(() => {
    const pairs = SYMBOLS.flatMap((s, i) => [{ id: i * 2, symbol: s }, { id: i * 2 + 1, symbol: s }]);
    return shuffleArray(pairs);
  });
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [checking, setChecking] = useState(false);

  const handleFlip = useCallback((id: number) => {
    if (checking || matched.has(id) || flipped.includes(id) || complete) return;
    
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setChecking(true);
      const [first, second] = newFlipped;
      const card1 = cards.find(c => c.id === first)!;
      const card2 = cards.find(c => c.id === second)!;

      if (card1.symbol === card2.symbol) {
        setTimeout(() => {
          const newMatched = new Set(matched);
          newMatched.add(first);
          newMatched.add(second);
          setMatched(newMatched);
          setFlipped([]);
          setChecking(false);
          if (newMatched.size === cards.length) {
            setTimeout(() => onComplete(), 600);
          }
        }, 500);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setChecking(false);
        }, 800);
      }
    }
  }, [flipped, matched, checking, cards, complete, onComplete]);

  if (!unlocked) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, hsl(340 88% 88%), hsl(263 82% 86%))' }}>
        <div className="font-pixel text-[8px] text-muted-foreground/40 animate-pulse-glow flex items-center gap-2">
          <PixelLock size={3} /> Open houses above to continue...
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16"
      style={{ background: 'linear-gradient(180deg, hsl(267 81% 85%), hsl(338 92% 87%), hsl(47 100% 88%))' }}>
      
      <NarrativeText text={NARRATIVE} visible={true} narrationEnabled={narrationEnabled} onPlayNarration={onPlayNarration} isNarrationPlaying={isNarrationPlaying} isNarrationLoading={isNarrationLoading} />

      {/* Card grid */}
      <div className="grid grid-cols-4 gap-2 mt-8 w-full max-w-xs">
        {cards.map(card => {
          const isFlipped = flipped.includes(card.id) || matched.has(card.id);
          const isMatched = matched.has(card.id);
          return (
            <button key={card.id} onClick={() => handleFlip(card.id)}
              className={`aspect-square rounded-lg pixel-border-sm flex items-center justify-center transition-all duration-300 ${
                isMatched ? 'bg-pixel-pink/20 scale-95 ring-1 ring-pixel-gold/40' :
                isFlipped ? 'bg-pixel-lavender/20' :
                'bg-muted/30 hover:bg-muted/40 active:scale-90 cursor-pointer'
              }`}>
              {isFlipped ? (
                <div className={isMatched ? 'animate-pulse-glow' : 'animate-slide-up'}>
                  <CardIcon symbol={card.symbol} size={3} />
                </div>
              ) : (
                <span className="font-pixel text-[10px] text-muted-foreground/40">?</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="font-pixel text-[8px] text-pixel-lavender mt-6 flex items-center gap-1">
        {complete ? (
          <><PixelSparkle size={2} /> All birthday pairs matched! Continue... <PixelSparkle size={2} /></>
        ) : (
          <><PixelHeart size={2} /> {matched.size / 2}/{SYMBOLS.length} pairs matched</>
        )}
      </div>
      {complete && <div className="mt-6 animate-bounce-gentle"><PixelHeart size={3} /></div>}
    </section>
  );
}
