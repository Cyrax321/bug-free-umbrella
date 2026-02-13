import { useState, useEffect } from 'react';
import { Volume2, Loader2 } from 'lucide-react';

interface NarrativeTextProps {
  text: string;
  visible: boolean;
  className?: string;
  narrationEnabled?: boolean;
  onPlayNarration?: (text: string) => void;
  isNarrationPlaying?: boolean;
  isNarrationLoading?: boolean;
}

export default function NarrativeText({ text, visible, className = '', narrationEnabled, onPlayNarration, isNarrationPlaying, isNarrationLoading }: NarrativeTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!visible) { setDisplayed(''); setDone(false); return; }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, 40);
    return () => clearInterval(interval);
  }, [text, visible]);

  if (!visible) return null;

  return (
    <div className={`relative font-pixel text-xs sm:text-sm leading-relaxed text-foreground/90 px-4 py-3 bg-muted/60 rounded-lg pixel-border-sm max-w-xs mx-auto ${className}`}>
      <em>"{displayed}{!done && <span className="inline-block w-2 h-3 bg-pixel-pink ml-0.5" style={{ animation: 'typewriter-cursor 0.8s steps(1) infinite' }} />}"</em>
      {done && narrationEnabled && onPlayNarration && (
        <button
          onClick={() => onPlayNarration(text)}
          disabled={isNarrationPlaying || isNarrationLoading}
          className="absolute -bottom-3 right-2 bg-pixel-pink/80 text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center active:scale-90 transition-transform"
        >
          {isNarrationLoading ? <Loader2 size={14} className="animate-spin" /> : <Volume2 size={14} />}
        </button>
      )}
    </div>
  );
}
