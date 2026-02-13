import { useState, useCallback, useMemo } from 'react';
import NarrativeText from './NarrativeText';

interface Props {
  unlocked: boolean;
  petalsCollected: number;
  petalsNeeded: number;
  complete: boolean;
  onCollectPetal: () => void;
}

export default function Area2Garden({ unlocked, petalsCollected, petalsNeeded, complete, onCollectPetal }: Props) {
  const [tapped, setTapped] = useState<Set<number>>(new Set());

  const petals = useMemo(() =>
    Array.from({ length: petalsNeeded + 3 }).map((_, i) => ({
      id: i,
      x: 5 + Math.random() * 85,
      y: 10 + Math.random() * 60,
      delay: Math.random() * 4,
      size: 16 + Math.random() * 12,
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
        <div className="font-pixel text-[8px] text-muted-foreground/40 animate-pulse-glow">
          🔒 Light the path above to continue...
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16"
      style={{ background: 'linear-gradient(180deg, hsl(270 30% 15%), hsl(330 20% 12%))' }}>
      
      {/* Drifting petals background */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`bg-petal-${i}`}
          className="absolute pointer-events-none animate-petal opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 30}%`,
            fontSize: `${10 + Math.random() * 8}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
          }}
        >
          🌸
        </div>
      ))}

      {/* Trees */}
      <div className="flex gap-8 mb-6">
        <span className="text-3xl">🌳</span>
        <span className="text-4xl">🌸</span>
        <span className="text-3xl">🌳</span>
      </div>

      <NarrativeText
        text="Every petal that falls reminds him of her laugh."
        visible={true}
      />

      {/* Petals to collect */}
      <div className="relative w-full h-56 mt-6">
        {petals.map(p => (
          <button
            key={p.id}
            onClick={() => handleTap(p.id)}
            disabled={tapped.has(p.id)}
            className={`absolute transition-all duration-500 select-none ${
              tapped.has(p.id)
                ? 'opacity-0 scale-0 -translate-y-10'
                : 'animate-float cursor-pointer active:scale-125 hover:brightness-125'
            }`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}px`,
              animationDelay: `${p.delay}s`,
            }}
          >
            {p.emoji}
          </button>
        ))}
      </div>

      {/* Heart vine progress */}
      <div className="flex gap-1 items-center mt-4">
        {Array.from({ length: petalsNeeded }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              i < petalsCollected ? 'bg-pixel-pink scale-110 animate-pulse-glow' : 'bg-muted/30'
            }`}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

      <div className="font-pixel text-[8px] text-pixel-lavender mt-3">
        {complete ? '🌿 Heart vines bloom! Continue...' : `🌸 ${petalsCollected}/${petalsNeeded} petals`}
      </div>

      {complete && (
        <div className="mt-6 text-2xl animate-bounce-gentle">↓</div>
      )}
    </section>
  );
}
