import { useState, useEffect, useCallback } from 'react';
import NarrativeText from './NarrativeText';

interface Props {
  unlocked: boolean;
  complete: boolean;
  onSync: () => void;
  narrationEnabled?: boolean;
  onPlayNarration?: (text: string) => void;
  isNarrationPlaying?: boolean;
  isNarrationLoading?: boolean;
}

const NARRATIVE = "Two hearts, miles apart... beating for the same thing.";

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
      <section className="relative min-h-[50vh] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, hsl(260 15% 10%), hsl(270 20% 12%))' }}>
        <div className="font-pixel text-[8px] text-muted-foreground/40 animate-pulse-glow">🔒 Open houses above to continue...</div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16" style={{ background: 'linear-gradient(180deg, hsl(270 20% 12%), hsl(280 25% 10%))' }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="absolute text-pixel-lavender/20 pointer-events-none animate-float-slow"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, fontSize: `${12 + Math.random() * 10}px`, animationDelay: `${Math.random() * 4}s` }}>♡</div>
      ))}
      <div className="relative mb-6"><div className="text-4xl mb-2 text-center">🏛️</div><div className="font-pixel text-[8px] text-pixel-lavender text-center">Heart Sync Temple</div></div>
      <NarrativeText text={NARRATIVE} visible={true} className="mb-8" narrationEnabled={narrationEnabled} onPlayNarration={onPlayNarration} isNarrationPlaying={isNarrationPlaying} isNarrationLoading={isNarrationLoading} />
      <div className="flex items-center gap-12 mb-8">
        <div className="text-center">
          <div className="text-4xl transition-transform" style={{ transform: `scale(${complete || syncing ? 1 : leftScale})` }}>💖</div>
          <span className="font-pixel text-[6px] text-pixel-pink mt-1 block">Buba</span>
        </div>
        <div className={`font-pixel text-[8px] transition-all duration-500 ${complete || syncing ? 'text-pixel-gold animate-pulse-glow' : 'text-muted-foreground/40'}`}>{complete || syncing ? '💫' : '...'}</div>
        <div className="text-center">
          <div className="text-4xl transition-transform" style={{ transform: `scale(${complete || syncing ? 1 : rightScale})` }}>💖</div>
          <span className="font-pixel text-[6px] text-pixel-pink mt-1 block">Bubibu</span>
        </div>
      </div>
      {!complete && (
        <button onClick={handleTap} disabled={syncing} className="font-pixel text-[9px] bg-pixel-lavender/30 text-foreground px-6 py-3 rounded-lg pixel-border-sm active:scale-95 transition-all hover:bg-pixel-lavender/40">
          {syncing ? '💫 Syncing...' : `Tap to sync 💗 (${Math.min(taps, 7)}/7)`}
        </button>
      )}
      {complete && (
        <div className="text-center animate-slide-up">
          <div className="font-pixel text-[8px] text-pixel-gold mb-4">✨ Hearts synchronized! The temple gates open...</div>
          <div className="text-3xl animate-heartbeat">💖💖</div>
          <div className="mt-6 text-2xl animate-bounce-gentle">↓</div>
        </div>
      )}
    </section>
  );
}
