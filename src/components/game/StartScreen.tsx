import { Volume2, VolumeX, Mic, MicOff, Music, Loader2 } from 'lucide-react';
import { PixelBuba, PixelBubibu, PixelHeart, PixelPetal, PixelStar } from './PixelSprites';

interface StartScreenProps {
  soundEnabled: boolean;
  narrationEnabled: boolean;
  onToggleSound: () => void;
  onToggleNarration: () => void;
  onStart: () => void;
  musicPlaying: boolean;
  musicLoading: boolean;
  onToggleMusic: () => void;
}

export default function StartScreen({ soundEnabled, narrationEnabled, onToggleSound, onToggleNarration, onStart, musicPlaying, musicLoading, onToggleMusic }: StartScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(330 30% 12%), hsl(340 25% 8%), hsl(270 20% 10%))' }}>
      
      {/* Pixel cherry blossom petals falling */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`petal-${i}`}
          className="absolute pointer-events-none animate-petal select-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${-5 + Math.random() * 20}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
            opacity: 0.4 + Math.random() * 0.3,
            transform: `scale(${0.6 + Math.random() * 0.6})`,
          }}
        >
          <PixelPetal size={3} />
        </div>
      ))}

      {/* Floating pixel hearts */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute opacity-20 animate-float-slow select-none pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
            transform: `scale(${0.5 + Math.random() * 0.8})`,
          }}
        >
          <PixelHeart size={2} />
        </div>
      ))}

      <div className="relative z-10 text-center px-6">
        {/* Pixel characters */}
        <div className="flex items-center justify-center gap-6 mb-4">
          <div className="animate-bounce-gentle"><PixelBubibu size={5} /></div>
          <div className="animate-heartbeat"><PixelHeart size={4} /></div>
          <div className="animate-bounce-gentle" style={{ animationDelay: '0.5s' }}><PixelBuba size={5} /></div>
        </div>
        
        <h1 className="font-pixel text-pixel-pink text-base sm:text-xl glow-text mb-1 leading-loose">
          Buba &<br />Bubibu's
        </h1>
        <p className="font-pixel text-pixel-peach text-[8px] sm:text-[10px] mb-2 tracking-wider flex items-center justify-center gap-2">
          <PixelPetal size={2} /> Pixel Valentine Adventure <PixelPetal size={2} />
        </p>
        <p className="font-body text-muted-foreground text-xs mb-8 max-w-[200px] mx-auto italic">
          A cherry blossom love story told in pixels...
        </p>

        <div className="flex items-center justify-center gap-3 mb-6">
          <PixelPetal size={3} />
          <div className="animate-heartbeat"><PixelHeart size={4} /></div>
          <PixelPetal size={3} />
        </div>

        <button
          onClick={onStart}
          className="font-pixel text-[10px] sm:text-xs bg-primary text-primary-foreground px-8 py-4 rounded-lg pixel-border glow-pink active:scale-95 transition-transform mb-6 hover:brightness-110"
        >
          Begin Journey
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
          <button
            onClick={onToggleMusic}
            className="flex items-center gap-1.5 text-muted-foreground text-[7px] font-pixel px-3 py-2 bg-muted/50 rounded-lg active:scale-95 transition-transform"
          >
            {musicLoading ? <Loader2 size={12} className="animate-spin" /> : <Music size={12} />}
            Music {musicPlaying ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
}
