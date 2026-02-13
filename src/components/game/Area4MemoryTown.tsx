import { useState } from 'react';
import NarrativeText from './NarrativeText';

interface Props {
  unlocked: boolean;
  housesOpened: number[];
  housesNeeded: number;
  complete: boolean;
  onOpenHouse: (index: number) => void;
  narrationEnabled?: boolean;
  onPlayNarration?: (text: string) => void;
  isNarrationPlaying?: boolean;
  isNarrationLoading?: boolean;
}

const CAPTIONS = [
  "Memory unlocked 💕", "She smiled, and his world got brighter", "Same sky, same heart 🌙",
  "Distance means nothing when love is everything", "Every moment with you is my favorite ✨",
  "Two hearts, one story 💖", "You are my sunshine, Buba ☀️", "Together is our favorite place to be",
  "Love grows here 🌱", "My best adventure is you", "Forever starts with us 💫", "You make everything beautiful",
];

const HOUSE_COLORS = [
  'bg-pixel-pink/20', 'bg-pixel-lavender/20', 'bg-pixel-peach/20', 'bg-pixel-gold/20',
  'bg-pixel-sky/20', 'bg-pixel-pink/15', 'bg-pixel-lavender/15', 'bg-pixel-peach/15',
  'bg-pixel-gold/15', 'bg-pixel-sky/15', 'bg-pixel-pink/25', 'bg-pixel-lavender/25',
];

const NARRATIVE = "Welcome to the coziest little village in the world, where every tiny house holds a precious memory of Buba and Bubibu. Paper lanterns sway gently along the cobblestone path, and the sweet scent of cherry blossoms fills the evening air. 'Do you remember this one?' Bubibu asks the moon. 'That was the day she laughed so hard she got hiccups, and I fell in love all over again.' Each door hides a treasure. 🏮🌸";

export default function Area4MemoryTown({ unlocked, housesOpened, housesNeeded, complete, onOpenHouse, narrationEnabled, onPlayNarration, isNarrationPlaying, isNarrationLoading }: Props) {
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);

  if (!unlocked) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, hsl(260 20% 8%), hsl(330 15% 10%))' }}>
        <div className="font-pixel text-[8px] text-muted-foreground/40 animate-pulse-glow">🔒 Repair the bridge above to continue...</div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden px-4 py-16" style={{ background: 'linear-gradient(180deg, hsl(260 20% 8%), hsl(330 15% 10%), hsl(260 15% 10%))' }}>
      <div className="flex gap-6 mb-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`text-lg transition-all duration-700 ${i < housesOpened.length ? 'opacity-100 animate-flicker' : 'opacity-20'}`}>🏮</div>
        ))}
      </div>
      <NarrativeText text={NARRATIVE} visible={true} className="mb-6" narrationEnabled={narrationEnabled} onPlayNarration={onPlayNarration} isNarrationPlaying={isNarrationPlaying} isNarrationLoading={isNarrationLoading} />
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
        {Array.from({ length: 12 }).map((_, i) => (
          <button key={i} onClick={() => { onOpenHouse(i); setSelectedHouse(i); }}
            className={`relative aspect-square rounded-lg pixel-border-sm flex flex-col items-center justify-center gap-1 transition-all duration-300 active:scale-95 ${HOUSE_COLORS[i]} ${housesOpened.includes(i) ? 'ring-2 ring-pixel-gold/50' : 'hover:brightness-125'}`}>
            <span className="text-xl">{housesOpened.includes(i) ? '🏠' : '🏚️'}</span>
            <span className="font-pixel text-[6px] text-muted-foreground">{housesOpened.includes(i) ? '💕' : `#${i + 1}`}</span>
          </button>
        ))}
      </div>
      {selectedHouse !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-6" onClick={() => setSelectedHouse(null)}>
          <div className="bg-card rounded-lg pixel-border p-4 max-w-xs w-full animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="aspect-square bg-muted/30 rounded-lg pixel-border-sm flex items-center justify-center mb-3">
              <div className="text-center"><span className="text-4xl block mb-2">📸</span><span className="font-pixel text-[7px] text-muted-foreground">Photo #{selectedHouse + 1}</span></div>
            </div>
            <p className="font-pixel text-[8px] text-pixel-pink text-center leading-relaxed">{CAPTIONS[selectedHouse]}</p>
            <button onClick={() => setSelectedHouse(null)} className="mt-4 w-full font-pixel text-[8px] bg-primary/20 text-foreground py-2 rounded-lg active:scale-95 transition-transform">Close 💖</button>
          </div>
        </div>
      )}
      <div className="font-pixel text-[8px] text-pixel-peach mt-6">{complete ? '🏮 All lanterns lit! Continue...' : `🏠 ${housesOpened.length}/${housesNeeded} houses opened`}</div>
      {complete && <div className="mt-6 text-2xl animate-bounce-gentle">↓</div>}
    </section>
  );
}
