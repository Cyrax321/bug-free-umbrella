import { useState, useCallback } from 'react';
import NarrativeText from './NarrativeText';
import { PixelHeart, PixelRibbon, PixelSparkle, PixelStar, PixelLock } from './PixelSprites';

interface Props {
  unlocked: boolean;
  complete: boolean;
  giftsWrapped: number;
  giftsNeeded: number;
  onWrapGift: () => void;
  narrationEnabled?: boolean;
  onPlayNarration?: (text: string) => void;
  isNarrationPlaying?: boolean;
  isNarrationLoading?: boolean;
}

const NARRATIVE = "Bubibo sneaks into a tiny wrapping room where pastel boxes, ribbons, and glittery paper are stacked in cheerful little towers. He picks out presents for Anya one by one, making sure every bow is neat and every detail feels soft and special. 'If her smile gets even bigger with each gift,' he says, grinning to himself, 'then I am doing this right.'";

const GIFT_NAMES = [
  { name: 'Teddy Bear', icon: '🧸', color: 'bg-pixel-peach/30' },
  { name: 'Birthday Tiara', icon: '👑', color: 'bg-pixel-pink/30' },
  { name: 'Star Jar', icon: '✨', color: 'bg-pixel-gold/30' },
  { name: 'Charm Bracelet', icon: '💎', color: 'bg-pixel-lavender/30' },
  { name: 'Sweet Treats', icon: '🍫', color: 'bg-pixel-peach/20' },
  { name: 'Music Box', icon: '🎵', color: 'bg-pixel-sky/30' },
  { name: 'Birthday Letter', icon: '💌', color: 'bg-pixel-pink/25' },
  { name: 'Flower Crown', icon: '🌸', color: 'bg-pixel-lavender/25' },
];

// Pixel gift box sprite
function PixelGiftBox({ size = 4, wrapped = false }: { size?: number; wrapped?: boolean }) {
  const s = size;
  return (
    <div className="inline-grid" style={{ gridTemplateColumns: `repeat(7, ${s}px)`, gap: 0 }}>
      {[
        ['_','_','_','R','_','_','_'],
        ['_','_','R','R','R','_','_'],
        ['B','B','B','R','B','B','B'],
        ['B','P','B','R','B','P','B'],
        ['B','P','B','R','B','P','B'],
        ['B','B','B','R','B','B','B'],
      ].flat().map((c, i) => (
        <div key={i} style={{
          width: s, height: s,
          backgroundColor: c === '_' ? 'transparent' :
            c === 'R' ? (wrapped ? '#e85d75' : '#555') :
            c === 'B' ? (wrapped ? '#f7c4d0' : '#444') :
            c === 'P' ? (wrapped ? '#fde4ec' : '#333') : 'transparent'
        }} />
      ))}
    </div>
  );
}

export default function Area1bGiftWrapping({ unlocked, complete, giftsWrapped, giftsNeeded, onWrapGift, narrationEnabled, onPlayNarration, isNarrationPlaying, isNarrationLoading }: Props) {
  const [wrapping, setWrapping] = useState<number | null>(null);
  const [ribbonTaps, setRibbonTaps] = useState(0);
  const TAPS_PER_GIFT = 3;

  const handleTapRibbon = useCallback(() => {
    if (complete) return;
    const newTaps = ribbonTaps + 1;
    setRibbonTaps(newTaps);
    if (newTaps >= TAPS_PER_GIFT) {
      setRibbonTaps(0);
      setWrapping(giftsWrapped);
      setTimeout(() => {
        onWrapGift();
        setWrapping(null);
      }, 600);
    }
  }, [ribbonTaps, giftsWrapped, complete, onWrapGift]);

  if (!unlocked) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, hsl(38 100% 92%), hsl(24 100% 86%))' }}>
        <div className="font-pixel text-[8px] text-muted-foreground/40 animate-pulse-glow flex items-center gap-2">
          <PixelLock size={3} /> Light the path above to continue...
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16"
      style={{ background: 'linear-gradient(180deg, hsl(44 100% 90%), hsl(28 100% 84%), hsl(345 88% 86%))' }}>
      
      {/* Floating ribbons background */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="absolute pointer-events-none animate-float-slow opacity-20"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 4}s` }}>
          <PixelRibbon size={2} />
        </div>
      ))}

      <NarrativeText text={NARRATIVE} visible={true} narrationEnabled={narrationEnabled} onPlayNarration={onPlayNarration} isNarrationPlaying={isNarrationPlaying} isNarrationLoading={isNarrationLoading} />

      {/* Gift shelf */}
      <div className="grid grid-cols-4 gap-2 mt-8 w-full max-w-xs">
        {GIFT_NAMES.slice(0, giftsNeeded).map((gift, i) => (
          <div key={i} className={`flex flex-col items-center p-2 rounded-lg pixel-border-sm transition-all duration-500 ${
            i < giftsWrapped ? 'bg-pixel-pink/20 ring-1 ring-pixel-gold/30' : 
            i === giftsWrapped ? 'bg-muted/30 animate-pulse-glow' : 'bg-muted/15 opacity-50'
          }`}>
            <div className={i === wrapping ? 'animate-celebration' : i < giftsWrapped ? 'animate-bounce-gentle' : ''}>
              <PixelGiftBox size={3} wrapped={i < giftsWrapped} />
            </div>
            <span className="font-pixel text-[5px] text-muted-foreground mt-1 text-center leading-tight">{gift.name}</span>
            {i < giftsWrapped && (
              <div className="mt-0.5"><PixelHeart size={1} /></div>
            )}
          </div>
        ))}
      </div>

      {/* Wrapping station */}
      {!complete && giftsWrapped < giftsNeeded && (
        <div className="mt-8 flex flex-col items-center">
          <div className="font-pixel text-[7px] text-pixel-peach mb-3">
            Wrapping: {GIFT_NAMES[giftsWrapped]?.name}
          </div>
          
          {/* Ribbon tap progress */}
          <div className="flex gap-2 mb-4">
            {Array.from({ length: TAPS_PER_GIFT }).map((_, i) => (
              <div key={i} className={`transition-all duration-300 ${i < ribbonTaps ? 'animate-pulse-glow' : 'opacity-30'}`}>
                <PixelRibbon size={3} />
              </div>
            ))}
          </div>

          <button onClick={handleTapRibbon}
            className="font-pixel text-[9px] bg-pixel-pink/30 text-foreground px-6 py-3 rounded-lg pixel-border-sm active:scale-90 transition-transform hover:bg-pixel-pink/40 flex items-center gap-2">
            <PixelRibbon size={2} /> Tie Ribbon <PixelHeart size={2} />
          </button>
        </div>
      )}

      <div className="font-pixel text-[8px] text-pixel-pink mt-6 flex items-center gap-1">
        {complete ? (
          <><PixelSparkle size={2} /> All birthday gifts are ready! Continue... <PixelSparkle size={2} /></>
        ) : (
          <><PixelGiftBox size={2} wrapped /> {giftsWrapped}/{giftsNeeded} gifts wrapped</>
        )}
      </div>
      {complete && <div className="mt-6 animate-bounce-gentle"><PixelHeart size={3} /></div>}
    </section>
  );
}
