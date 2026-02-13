import { useState, useCallback } from 'react';
import NarrativeText from './NarrativeText';
import { PixelHeart, PixelLantern, PixelCake, PixelCandle, PixelPetal, PixelSparkle, PixelStar, PixelBuba, PixelBubibu, PixelLock } from './PixelSprites';

interface Props {
  unlocked: boolean;
  lanternsLit: number;
  lanternsNeeded: number;
  wishMade: boolean;
  onLightLantern: () => void;
  onMakeWish: () => void;
  narrationEnabled?: boolean;
  onPlayNarration?: (text: string) => void;
  isNarrationPlaying?: boolean;
  isNarrationLoading?: boolean;
}

const NARRATIVE = "At the very top of Valentine Hill, where the sunset paints the sky in shades of strawberry and peach, a tiny picnic blanket waits under a canopy of cherry blossoms. Bubibu has arranged everything perfectly — flowers picked from the garden, a little cake with heart-shaped candles, and two cups of warm cocoa. He closes his eyes and makes the same wish he's made a thousand times before: 'Buba, right here, next to me... forever and always.' The cherry petals dance in the golden light, and somewhere, Buba smiles.";

export default function Area6ValentineHill({ unlocked, lanternsLit, lanternsNeeded, wishMade, onLightLantern, onMakeWish, narrationEnabled, onPlayNarration, isNarrationPlaying, isNarrationLoading }: Props) {
  const [celebrationActive, setCelebrationActive] = useState(false);

  const handleWish = useCallback(() => {
    setCelebrationActive(true);
    setTimeout(() => onMakeWish(), 500);
  }, [onMakeWish]);

  const allLanternsLit = lanternsLit >= lanternsNeeded;

  if (!unlocked) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, hsl(280 25% 10%), hsl(15 30% 15%))' }}>
        <div className="font-pixel text-[8px] text-muted-foreground/40 animate-pulse-glow flex items-center gap-2">
          <PixelLock size={3} /> Sync the hearts above to continue...
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16" style={{ background: 'linear-gradient(180deg, hsl(15 40% 20%), hsl(340 50% 30%), hsl(15 60% 40%))' }}>
      <div className="absolute top-0 inset-x-0 h-1/3 opacity-60" style={{ background: 'linear-gradient(180deg, hsl(340 60% 45%), hsl(20 70% 50%), transparent)' }} />
      
      {/* Celebration pixel effects */}
      {(celebrationActive || wishMade) && Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="absolute animate-celebration pointer-events-none"
          style={{ left: `${20 + Math.random() * 60}%`, top: `${30 + Math.random() * 40}%`, animationDelay: `${Math.random()}s` }}>
          {[<PixelHeart key="h" size={3} />, <PixelSparkle key="sp" size={3} />, <PixelStar key="st" size={3} />, <PixelPetal key="p" size={3} />][Math.floor(Math.random() * 4)]}
        </div>
      ))}
      
      <NarrativeText text={NARRATIVE} visible={true} className="relative z-10 mb-8" narrationEnabled={narrationEnabled} onPlayNarration={onPlayNarration} isNarrationPlaying={isNarrationPlaying} isNarrationLoading={isNarrationLoading} />
      
      {/* Pixel lanterns */}
      <div className="flex gap-4 mb-8 relative z-10">
        {Array.from({ length: lanternsNeeded }).map((_, i) => (
          <button key={i} onClick={() => { if (i <= lanternsLit) onLightLantern(); }} disabled={i < lanternsLit}
            className={`transition-all duration-500 ${i < lanternsLit ? 'animate-flicker' : i === lanternsLit ? 'opacity-60 cursor-pointer active:scale-125' : 'opacity-20'}`}>
            <PixelLantern size={5} lit={i < lanternsLit} />
          </button>
        ))}
      </div>
      
      {/* Pixel picnic scene */}
      <div className="relative z-10 text-center mb-6 flex flex-col items-center">
        <div className="flex items-end justify-center gap-2 mb-2">
          <PixelPetal size={3} />
          <PixelCake size={4} />
          <PixelPetal size={3} />
        </div>
        <div className="flex items-center justify-center gap-1">
          <PixelCandle size={3} className="animate-flicker" />
          <div className="w-24 h-8 bg-pixel-peach/20 rounded-lg pixel-border-sm" />
          <div style={{ animationDelay: '0.5s' }} className="animate-flicker"><PixelCandle size={3} /></div>
        </div>
      </div>
      
      {allLanternsLit && !wishMade && (
        <button onClick={handleWish} className="relative z-10 font-pixel text-xs bg-primary text-primary-foreground px-8 py-4 rounded-lg pixel-border glow-pink active:scale-95 transition-transform animate-pulse-glow flex items-center gap-2">
          Make Our Wish <PixelSparkle size={3} />
        </button>
      )}
      {!allLanternsLit && (
        <div className="font-pixel text-[8px] text-pixel-gold relative z-10 flex items-center gap-1">
          <PixelLantern size={2} lit /> Light the lanterns: {lanternsLit}/{lanternsNeeded}
        </div>
      )}
      {wishMade && (
        <div className="relative z-10 text-center animate-slide-up mt-6 flex flex-col items-center">
          <div className="animate-heartbeat mb-4"><PixelHeart size={8} /></div>
          <p className="font-pixel text-[9px] text-pixel-pink leading-relaxed glow-text mb-2">Wish saved.</p>
          <p className="font-pixel text-[8px] text-pixel-peach leading-relaxed">Next level: Buba & Bubibu, together.</p>
          <div className="mt-4 flex gap-3">
            <PixelBubibu size={4} />
            <PixelHeart size={3} className="animate-heartbeat" />
            <PixelBuba size={4} />
          </div>
          <div className="mt-8 font-pixel text-[7px] text-muted-foreground/60 flex items-center gap-1">
            Made with love by Bubibu <PixelHeart size={1} />
          </div>
        </div>
      )}
    </section>
  );
}
