import { useState, useCallback } from 'react';
import NarrativeText from './NarrativeText';

interface Props {
  unlocked: boolean;
  lanternsLit: number;
  lanternsNeeded: number;
  wishMade: boolean;
  onLightLantern: () => void;
  onMakeWish: () => void;
}

export default function Area6ValentineHill({ unlocked, lanternsLit, lanternsNeeded, wishMade, onLightLantern, onMakeWish }: Props) {
  const [celebrationActive, setCelebrationActive] = useState(false);

  const handleWish = useCallback(() => {
    setCelebrationActive(true);
    setTimeout(() => onMakeWish(), 500);
  }, [onMakeWish]);

  const allLanternsLit = lanternsLit >= lanternsNeeded;

  if (!unlocked) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center"
        style={{ background: 'linear-gradient(180deg, hsl(280 25% 10%), hsl(15 30% 15%))' }}>
        <div className="font-pixel text-[8px] text-muted-foreground/40 animate-pulse-glow">
          🔒 Sync the hearts above to continue...
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16"
      style={{ background: 'linear-gradient(180deg, hsl(15 40% 20%), hsl(340 50% 30%), hsl(15 60% 40%))' }}>

      {/* Sunset sky */}
      <div className="absolute top-0 inset-x-0 h-1/3 opacity-60"
        style={{ background: 'linear-gradient(180deg, hsl(340 60% 45%), hsl(20 70% 50%), transparent)' }} />

      {/* Celebration particles */}
      {(celebrationActive || wishMade) && Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-celebration pointer-events-none"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${30 + Math.random() * 40}%`,
            fontSize: `${14 + Math.random() * 16}px`,
            animationDelay: `${Math.random() * 1}s`,
          }}
        >
          {['💖', '✨', '💫', '🌟', '💗', '🎆'][Math.floor(Math.random() * 6)]}
        </div>
      ))}

      <NarrativeText
        text="Bubibu made a wish. And it was always the same — Buba, right here, next to him."
        visible={true}
        className="relative z-10 mb-8"
      />

      {/* Lanterns path */}
      <div className="flex gap-4 mb-8 relative z-10">
        {Array.from({ length: lanternsNeeded }).map((_, i) => (
          <button
            key={i}
            onClick={() => { if (i <= lanternsLit) onLightLantern(); }}
            disabled={i < lanternsLit}
            className={`text-2xl transition-all duration-500 ${
              i < lanternsLit
                ? 'animate-flicker'
                : i === lanternsLit
                ? 'opacity-60 cursor-pointer active:scale-125'
                : 'opacity-20'
            }`}
          >
            {i < lanternsLit ? '🏮' : '🔲'}
          </button>
        ))}
      </div>

      {/* Picnic setup */}
      <div className="relative z-10 text-center mb-6">
        <div className="flex items-end justify-center gap-2 mb-2">
          <span className="text-xl">🌸</span>
          <span className="text-2xl">🎂</span>
          <span className="text-xl">🌸</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-sm animate-flicker">🕯️</span>
          <div className="w-24 h-8 bg-pixel-peach/20 rounded-lg pixel-border-sm" />
          <span className="text-sm animate-flicker" style={{ animationDelay: '0.5s' }}>🕯️</span>
        </div>
      </div>

      {/* Make wish button */}
      {allLanternsLit && !wishMade && (
        <button
          onClick={handleWish}
          className="relative z-10 font-pixel text-xs bg-primary text-primary-foreground px-8 py-4 rounded-lg pixel-border glow-pink active:scale-95 transition-transform animate-pulse-glow"
        >
          Make Our Wish 💫
        </button>
      )}

      {!allLanternsLit && (
        <div className="font-pixel text-[8px] text-pixel-gold relative z-10">
          🏮 Light the lanterns: {lanternsLit}/{lanternsNeeded}
        </div>
      )}

      {/* Final message */}
      {wishMade && (
        <div className="relative z-10 text-center animate-slide-up mt-6">
          <div className="text-5xl animate-heartbeat mb-4">💖</div>
          <p className="font-pixel text-[9px] text-pixel-pink leading-relaxed glow-text mb-2">
            Wish saved.
          </p>
          <p className="font-pixel text-[8px] text-pixel-peach leading-relaxed">
            Next level: Buba & Bubibu, together.
          </p>
          <p className="font-pixel text-lg mt-4">💖</p>

          <div className="mt-8 font-pixel text-[7px] text-muted-foreground/60">
            Made with love by Bubibu 💕
          </div>
        </div>
      )}
    </section>
  );
}
