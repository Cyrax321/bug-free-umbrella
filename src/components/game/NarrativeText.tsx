import { useState, useEffect } from 'react';

interface NarrativeTextProps {
  text: string;
  visible: boolean;
  className?: string;
}

export default function NarrativeText({ text, visible, className = '' }: NarrativeTextProps) {
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
    <div className={`font-pixel text-xs sm:text-sm leading-relaxed text-foreground/90 px-4 py-3 bg-muted/60 rounded-lg pixel-border-sm max-w-xs mx-auto ${className}`}>
      <em>"{displayed}{!done && <span className="inline-block w-2 h-3 bg-pixel-pink ml-0.5" style={{ animation: 'typewriter-cursor 0.8s steps(1) infinite' }} />}"</em>
    </div>
  );
}
