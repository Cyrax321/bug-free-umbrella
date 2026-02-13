import { Volume2, VolumeX, Mic, MicOff } from 'lucide-react';

interface StartScreenProps {
  soundEnabled: boolean;
  narrationEnabled: boolean;
  onToggleSound: () => void;
  onToggleNarration: () => void;
  onStart: () => void;
}

export default function StartScreen({ soundEnabled, narrationEnabled, onToggleSound, onToggleNarration, onStart }: StartScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* Floating hearts background */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-pixel-pink/30 animate-float-slow select-none pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 20}px`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
          }}
        >
          💖
        </div>
      ))}

      <div className="relative z-10 text-center px-6">
        <h1 className="font-pixel text-pixel-pink text-lg sm:text-2xl glow-text mb-2 leading-relaxed">
          Buba &<br />Bubibu's
        </h1>
        <p className="font-pixel text-pixel-peach text-[10px] sm:text-xs mb-8 tracking-wider">
          Pixel Valentine Adventure
        </p>

        <div className="text-4xl mb-8 animate-heartbeat">💖</div>

        <button
          onClick={onStart}
          className="font-pixel text-xs sm:text-sm bg-primary text-primary-foreground px-8 py-4 rounded-lg pixel-border glow-pink active:scale-95 transition-transform mb-6 hover:brightness-110"
        >
          Begin Journey 💫
        </button>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onToggleSound}
            className="flex items-center gap-2 text-muted-foreground text-[8px] font-pixel px-3 py-2 bg-muted/50 rounded-lg active:scale-95 transition-transform"
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            Sound {soundEnabled ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={onToggleNarration}
            className="flex items-center gap-2 text-muted-foreground text-[8px] font-pixel px-3 py-2 bg-muted/50 rounded-lg active:scale-95 transition-transform"
          >
            {narrationEnabled ? <Mic size={14} /> : <MicOff size={14} />}
            Voice {narrationEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
}
