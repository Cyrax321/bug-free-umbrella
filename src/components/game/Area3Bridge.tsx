import { useState, useCallback, useMemo } from 'react';
import NarrativeText from './NarrativeText';

interface Props {
  unlocked: boolean;
  bridgePieces: number;
  bridgePiecesNeeded: number;
  complete: boolean;
  onAddPiece: () => void;
  narrationEnabled?: boolean;
  onPlayNarration?: (text: string) => void;
  isNarrationPlaying?: boolean;
  isNarrationLoading?: boolean;
}

const NARRATIVE = "Between two gentle hills, a bridge once stood where Buba and Bubibu would meet under the cherry blossoms every spring. The wind scattered its pieces like puzzle hearts across the starlit sky. But love is patient, and love is brave. 'Even if every bridge in the world breaks,' Bubibu says with a smile, 'I'd build a thousand more just to reach you, Buba.' The stars twinkle in agreement. 🌙💫";

export default function Area3Bridge({ unlocked, bridgePieces, bridgePiecesNeeded, complete, onAddPiece, narrationEnabled, onPlayNarration, isNarrationPlaying, isNarrationLoading }: Props) {
  const [placed, setPlaced] = useState<Set<number>>(new Set());

  const pieces = useMemo(() =>
    Array.from({ length: bridgePiecesNeeded }).map((_, i) => ({
      id: i, x: 10 + (i * 20) + Math.random() * 10, y: 60 + Math.random() * 20,
    })), [bridgePiecesNeeded]);

  const handlePlace = useCallback((id: number) => {
    if (placed.has(id) || complete) return;
    setPlaced(s => new Set(s).add(id));
    onAddPiece();
  }, [placed, complete, onAddPiece]);

  if (!unlocked) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, hsl(330 20% 12%), hsl(240 25% 10%))' }}>
        <div className="font-pixel text-[8px] text-muted-foreground/40 animate-pulse-glow">🔒 Collect petals above to continue...</div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16" style={{ background: 'linear-gradient(180deg, hsl(240 25% 10%), hsl(260 20% 8%))' }}>
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={i} className="absolute w-1 h-1 rounded-full bg-foreground/40 animate-sparkle pointer-events-none"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 40}%`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${2 + Math.random() * 2}s` }} />
      ))}
      <NarrativeText text={NARRATIVE} visible={true} className="mb-8" narrationEnabled={narrationEnabled} onPlayNarration={onPlayNarration} isNarrationPlaying={isNarrationPlaying} isNarrationLoading={isNarrationLoading} />
      <div className="relative w-full max-w-xs h-40">
        <div className="absolute left-0 bottom-0 w-16 h-24 bg-muted/30 rounded-t-lg pixel-border-sm" />
        <div className="absolute right-0 bottom-0 w-16 h-24 bg-muted/30 rounded-t-lg pixel-border-sm" />
        <div className="absolute bottom-12 left-16 right-16 h-6 flex">
          {Array.from({ length: bridgePiecesNeeded }).map((_, i) => (
            <div key={i} className={`flex-1 h-full border border-pixel-pink/20 transition-all duration-700 ${i < bridgePieces ? 'bg-pixel-pink/40 pixel-border-sm' : 'bg-transparent border-dashed'}`} style={{ transitionDelay: `${i * 0.15}s` }} />
          ))}
        </div>
        <div className="absolute bottom-0 left-16 right-16 flex justify-center gap-2">
          <span className="text-lg opacity-30">☁️</span><span className="text-sm opacity-20 mt-2">☁️</span>
        </div>
      </div>
      <div className="relative w-full h-32 mt-8">
        {pieces.map(p => (
          <button key={p.id} onClick={() => handlePlace(p.id)} disabled={placed.has(p.id)}
            className={`absolute text-2xl transition-all duration-500 select-none ${placed.has(p.id) ? 'opacity-0 scale-0' : 'animate-bounce-gentle cursor-pointer active:scale-125'}`}
            style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.id * 0.3}s` }}>💝</button>
        ))}
      </div>
      <div className="font-pixel text-[8px] text-pixel-gold mt-4">{complete ? '🌉 Bridge repaired! Continue...' : `💝 Tap hearts to repair: ${bridgePieces}/${bridgePiecesNeeded}`}</div>
      {complete && <div className="mt-6 text-2xl animate-bounce-gentle">↓</div>}
    </section>
  );
}
