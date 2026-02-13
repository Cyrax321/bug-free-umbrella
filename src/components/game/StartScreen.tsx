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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(330 30% 12%), hsl(340 25% 8%), hsl(270 20% 10%))' }}>
      
      {/* Cherry blossom petals falling */}
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={`petal-${i}`}
          className="absolute pointer-events-none animate-petal select-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${-5 + Math.random() * 20}%`,
            fontSize: `${8 + Math.random() * 14}px`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
            opacity: 0.4 + Math.random() * 0.3,
          }}
        >
          🌸
        </div>
      ))}

      {/* Floating hearts */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-pixel-pink/20 animate-float-slow select-none pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${10 + Math.random() * 16}px`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
          }}
        >
          💖
        </div>
      ))}

      <div className="relative z-10 text-center px-6">
        {/* Pixel characters */}
        <div className="flex items-center justify-center gap-6 mb-4">
          <div className="text-3xl animate-bounce-gentle">🧑‍💻</div>
          <div className="text-2xl animate-heartbeat">💖</div>
          <div className="text-3xl animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>👩</div>
        </div>
        
        <h1 className="font-pixel text-pixel-pink text-base sm:text-xl glow-text mb-1 leading-loose">
          Buba &<br />Bubibu's
        </h1>
        <p className="font-pixel text-pixel-peach text-[8px] sm:text-[10px] mb-2 tracking-wider">
          🌸 Pixel Valentine Adventure 🌸
        </p>
        <p className="font-body text-muted-foreground text-xs mb-8 max-w-[200px] mx-auto italic">
          A cherry blossom love story told in pixels...
        </p>

        <div className="text-3xl mb-6 animate-heartbeat">🌸💖🌸</div>

        <button
          onClick={onStart}
          className="font-pixel text-[10px] sm:text-xs bg-primary text-primary-foreground px-8 py-4 rounded-lg pixel-border glow-pink active:scale-95 transition-transform mb-6 hover:brightness-110"
        >
          Begin Journey 🌸
        </button>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onToggleSound}
            className="flex items-center gap-1.5 text-muted-foreground text-[7px] font-pixel px-3 py-2 bg-muted/50 rounded-lg active:scale-95 transition-transform"
          >
            {soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
            Sound {soundEnabled ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={onToggleNarration}
            className="flex items-center gap-1.5 text-muted-foreground text-[7px] font-pixel px-3 py-2 bg-muted/50 rounded-lg active:scale-95 transition-transform"
          >
            {narrationEnabled ? <Mic size={12} /> : <MicOff size={12} />}
            Voice {narrationEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
}
