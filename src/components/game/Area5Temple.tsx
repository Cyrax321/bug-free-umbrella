import { useState, useEffect, useCallback } from 'react';
import NarrativeText from './NarrativeText';
import { PixelHeart, PixelTemple, PixelSparkle, PixelBuba, PixelBubibu, PixelLock } from './PixelSprites';

interface Props {
  unlocked: boolean;
  complete: boolean;
  onSync: () => void;
  narrationEnabled?: boolean;
  onPlayNarration?: (text: string) => void;
  isNarrationPlaying?: boolean;
  isNarrationLoading?: boolean;
}

const NARRATIVE = "At the Birthday Beat Pavilion, two glowing hearts pulse beneath a shower of sparkles. One shines for Buba, the other for Bubibo, and when their rhythm lines up, the final part of the celebration can begin. It feels less like magic and more like the universe clapping along for her big day.";

export default function Area5Temple({ unlocked, complete, onSync, narrationEnabled, onPlayNarration, isNarrationPlaying, isNarrationLoading }: Props) {
  const [leftPhase, setLeftPhase] = useState(0);
  const [rightPhase, setRightPhase] = useState(0);
  const [taps, setTaps] = useState(0);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (complete) return;
    const interval = setInterval(() => setLeftPhase(p => (p + 1) % 100), 60);
    return () => clearInterval(interval);
  }, [complete]);

  useEffect(() => {
    if (complete) return;
    const speed = Math.max(30, 80 - taps * 8);
    const interval = setInterval(() => setRightPhase(p => (p + 1) % 100), speed);
    return () => clearInterval(interval);
  }, [taps, complete]);

  const handleTap = useCallback(() => {
    if (complete) return;
    const newTaps = taps + 1;
    setTaps(newTaps);
    if (newTaps >= 7) { setSyncing(true); setTimeout(() => onSync(), 1500); }
  }, [taps, complete, onSync]);

  const leftScale = 1 + 0.2 * Math.sin(leftPhase * 0.15);
  const rightScale = 1 + 0.2 * Math.sin(rightPhase * 0.15);

  if (!unlocked) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, hsl(205 95% 83%), hsl(267 85% 85%))' }}>
        <div className="font-pixel text-[8px] text-muted-foreground/40 animate-pulse-glow flex items-center gap-2">
          <PixelLock size={3} /> Open houses above to continue...
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16" style={{ background: 'linear-gradient(180deg, hsl(203 95% 82%), hsl(267 85% 85%), hsl(45 100% 87%))' }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="absolute pointer-events-none animate-float-slow opacity-20"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 4}s` }}>
          <PixelHeart size={2} />
        </div>
      ))}
      <div className="relative mb-6 flex flex-col items-center">
        <PixelTemple size={6} />
        <div className="font-pixel text-[8px] text-pixel-lavender text-center mt-2">Birthday Beat Pavilion</div>
      </div>
      <NarrativeText text={NARRATIVE} visible={true} className="mb-8" narrationEnabled={narrationEnabled} onPlayNarration={onPlayNarration} isNarrationPlaying={isNarrationPlaying} isNarrationLoading={isNarrationLoading} />
      <div className="flex items-center gap-12 mb-8">
        <div className="text-center flex flex-col items-center">
          <div className="transition-transform" style={{ transform: `scale(${complete || syncing ? 1 : leftScale})` }}>
            <PixelHeart size={5} />
          </div>
          <span className="font-pixel text-[6px] text-pixel-pink mt-1 block">Buba</span>
          <div className="mt-1"><PixelBuba size={3} /></div>
        </div>
        <div className={`transition-all duration-500 ${complete || syncing ? 'animate-pulse-glow' : 'opacity-40'}`}>
          {complete || syncing ? <PixelSparkle size={4} /> : <span className="font-pixel text-[8px] text-muted-foreground">...</span>}
        </div>
        <div className="text-center flex flex-col items-center">
          <div className="transition-transform" style={{ transform: `scale(${complete || syncing ? 1 : rightScale})` }}>
            <PixelHeart size={5} />
          </div>
          <span className="font-pixel text-[6px] text-pixel-pink mt-1 block">Bubibo</span>
          <div className="mt-1"><PixelBubibu size={3} /></div>
        </div>
      </div>
      {!complete && (
        <button onClick={handleTap} disabled={syncing} className="font-pixel text-[9px] bg-pixel-lavender/30 text-foreground px-6 py-3 rounded-lg pixel-border-sm active:scale-95 transition-all hover:bg-pixel-lavender/40 flex items-center gap-2">
          {syncing ? (
            <><PixelSparkle size={2} /> Syncing...</>
          ) : (
            <><PixelHeart size={2} /> Tap to sync ({Math.min(taps, 7)}/7)</>
          )}
        </button>
      )}
      {complete && (
        <div className="text-center animate-slide-up flex flex-col items-center">
          <div className="font-pixel text-[8px] text-pixel-gold mb-4 flex items-center gap-1">
            <PixelSparkle size={2} /> Birthday beats synchronized! The gates open... <PixelSparkle size={2} />
          </div>
          <div className="flex gap-2 animate-heartbeat">
            <PixelHeart size={4} />
            <PixelHeart size={4} />
          </div>
          <div className="mt-6 animate-bounce-gentle"><PixelHeart size={3} /></div>
        </div>
      )}
    </section>
  );
}
