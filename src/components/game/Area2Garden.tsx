import { useState, useCallback, useMemo } from 'react';
import NarrativeText from './NarrativeText';

interface Props {
  unlocked: boolean;
  petalsCollected: number;
  petalsNeeded: number;
  complete: boolean;
  onCollectPetal: () => void;
  narrationEnabled?: boolean;
  onPlayNarration?: (text: string) => void;
  isNarrationPlaying?: boolean;
  isNarrationLoading?: boolean;
}

const NARRATIVE = "The garden blooms in soft pinks and lavenders, like a painting from a dream Bubibu once had about Buba. Cherry blossom petals drift lazily through the warm breeze, each one carrying a tiny wish. 'If I catch enough petals,' Bubibu thinks, 'maybe they'll weave a path straight to her heart.' The flowers seem to lean closer, whispering, 'She planted these for you, you know... every single one.' 🌸🌿";

export default function Area2Garden({ unlocked, petalsCollected, petalsNeeded, complete, onCollectPetal, narrationEnabled, onPlayNarration, isNarrationPlaying, isNarrationLoading }: Props) {
  const [tapped, setTapped] = useState<Set<number>>(new Set());

  const petals = useMemo(() =>
    Array.from({ length: petalsNeeded + 3 }).map((_, i) => ({
      id: i, x: 5 + Math.random() * 85, y: 10 + Math.random() * 60, delay: Math.random() * 4, size: 16 + Math.random() * 12,
      emoji: ['🌸', '🌺', '💮', '🪷'][Math.floor(Math.random() * 4)],
    })), [petalsNeeded]);

  const handleTap = useCallback((id: number) => {
    if (tapped.has(id) || complete) return;
    setTapped(s => new Set(s).add(id));
    onCollectPetal();
  }, [tapped, complete, onCollectPetal]);

  if (!unlocked) {
    return (
      <section className="relative min-h-[50vh] bg-pixel-garden/20 flex items-center justify-center">
        <div className="font-pixel text-[8px] text-muted-foreground/40 animate-pulse-glow">🔒 Light the path above to continue...</div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16"
      style={{ background: 'linear-gradient(180deg, hsl(270 30% 15%), hsl(330 20% 12%))' }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={`bg-${i}`} className="absolute pointer-events-none animate-petal opacity-40"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 30}%`, fontSize: `${10 + Math.random() * 8}px`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 3}s` }}>🌸</div>
      ))}
      <div className="flex gap-8 mb-6"><span className="text-3xl">🌳</span><span className="text-4xl">🌸</span><span className="text-3xl">🌳</span></div>
      <NarrativeText text={NARRATIVE} visible={true} narrationEnabled={narrationEnabled} onPlayNarration={onPlayNarration} isNarrationPlaying={isNarrationPlaying} isNarrationLoading={isNarrationLoading} />
      <div className="relative w-full h-56 mt-6">
        {petals.map(p => (
          <button key={p.id} onClick={() => handleTap(p.id)} disabled={tapped.has(p.id)}
            className={`absolute transition-all duration-500 select-none ${tapped.has(p.id) ? 'opacity-0 scale-0 -translate-y-10' : 'animate-float cursor-pointer active:scale-125 hover:brightness-125'}`}
            style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: `${p.size}px`, animationDelay: `${p.delay}s` }}>{p.emoji}</button>
        ))}
      </div>
      <div className="flex gap-1 items-center mt-4">
        {Array.from({ length: petalsNeeded }).map((_, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${i < petalsCollected ? 'bg-pixel-pink scale-110 animate-pulse-glow' : 'bg-muted/30'}`} style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
      <div className="font-pixel text-[8px] text-pixel-lavender mt-3">{complete ? '🌿 Heart vines bloom! Continue...' : `🌸 ${petalsCollected}/${petalsNeeded} petals`}</div>
      {complete && <div className="mt-6 text-2xl animate-bounce-gentle">↓</div>}
    </section>
  );
}
