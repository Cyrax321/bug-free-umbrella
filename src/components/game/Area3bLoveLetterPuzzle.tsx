import { useState, useCallback } from 'react';
import NarrativeText from './NarrativeText';
import { PixelHeart, PixelEnvelope, PixelSparkle, PixelLock } from './PixelSprites';

interface Props {
  unlocked: boolean;
  complete: boolean;
  onComplete: () => void;
  narrationEnabled?: boolean;
  onPlayNarration?: (text: string) => void;
  isNarrationPlaying?: boolean;
  isNarrationLoading?: boolean;
}

const NARRATIVE = "The sweetest parts of Bubibo's birthday letter for Anya have floated into the air and landed out of order. He chases the words around, laughing at the mess, then asks for help putting them back together. 'Her 18th message has to sound perfect,' he says. 'No scrambled feelings allowed.'";

const SENTENCES = [
  { scrambled: ['birthday', 'eighteenth', 'happy', 'Anya'], correct: 'happy eighteenth birthday Anya' },
  { scrambled: ['light', 'you', 'every', 'room', 'up'], correct: 'you light up every room' },
  { scrambled: ['day', 'your', 'today', 'is', 'magic'], correct: 'today is your magic day' },
];

export default function Area3bLoveLetterPuzzle({ unlocked, complete, onComplete, narrationEnabled, onPlayNarration, isNarrationPlaying, isNarrationLoading }: Props) {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([...SENTENCES[0].scrambled].sort(() => Math.random() - 0.5));
  const [shake, setShake] = useState(false);
  const [solved, setSolved] = useState<number[]>([]);

  const handleWordTap = useCallback((word: string, index: number) => {
    const newSelected = [...selectedWords, word];
    const newAvailable = availableWords.filter((_, i) => i !== index);
    setSelectedWords(newSelected);
    setAvailableWords(newAvailable);

    // Check if sentence is complete
    if (newAvailable.length === 0) {
      const result = newSelected.join(' ');
      if (result === SENTENCES[currentSentence].correct) {
        const newSolved = [...solved, currentSentence];
        setSolved(newSolved);
        if (currentSentence + 1 < SENTENCES.length) {
          setTimeout(() => {
            setCurrentSentence(currentSentence + 1);
            setSelectedWords([]);
            setAvailableWords([...SENTENCES[currentSentence + 1].scrambled].sort(() => Math.random() - 0.5));
          }, 800);
        } else {
          setTimeout(() => onComplete(), 1000);
        }
      } else {
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setSelectedWords([]);
          setAvailableWords([...SENTENCES[currentSentence].scrambled].sort(() => Math.random() - 0.5));
        }, 600);
      }
    }
  }, [selectedWords, availableWords, currentSentence, solved, onComplete]);

  const handleUndo = useCallback(() => {
    if (selectedWords.length === 0) return;
    const lastWord = selectedWords[selectedWords.length - 1];
    setSelectedWords(selectedWords.slice(0, -1));
    setAvailableWords([...availableWords, lastWord]);
  }, [selectedWords, availableWords]);

  if (!unlocked) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, hsl(255 83% 86%), hsl(340 87% 88%))' }}>
        <div className="font-pixel text-[8px] text-muted-foreground/40 animate-pulse-glow flex items-center gap-2">
          <PixelLock size={3} /> Repair the bridge above to continue...
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16"
      style={{ background: 'linear-gradient(180deg, hsl(266 84% 85%), hsl(343 90% 87%), hsl(41 100% 89%))' }}>
      
      <div className="mb-4 animate-float"><PixelEnvelope size={5} /></div>

      <NarrativeText text={NARRATIVE} visible={true} narrationEnabled={narrationEnabled} onPlayNarration={onPlayNarration} isNarrationPlaying={isNarrationPlaying} isNarrationLoading={isNarrationLoading} />

      {/* Solved sentences */}
      <div className="mt-6 space-y-2 w-full max-w-xs">
        {solved.map((si, i) => (
          <div key={i} className="font-pixel text-[8px] text-pixel-pink text-center bg-pixel-pink/10 px-3 py-2 rounded-lg pixel-border-sm animate-slide-up flex items-center justify-center gap-1">
            <PixelHeart size={1} /> {SENTENCES[si].correct} <PixelHeart size={1} />
          </div>
        ))}
      </div>

      {/* Current puzzle */}
      {!complete && (
        <div className="mt-6 w-full max-w-xs">
          <div className="font-pixel text-[7px] text-muted-foreground text-center mb-3">
            Sentence {currentSentence + 1}/{SENTENCES.length}
          </div>

          {/* Answer area */}
          <div className={`min-h-[44px] bg-muted/30 rounded-lg pixel-border-sm p-3 mb-4 flex flex-wrap gap-2 items-center justify-center ${shake ? 'animate-shake' : ''}`}>
            {selectedWords.length === 0 ? (
              <span className="font-pixel text-[7px] text-muted-foreground/40">Tap words in order...</span>
            ) : (
              selectedWords.map((w, i) => (
                <span key={i} className="font-pixel text-[9px] text-pixel-peach bg-pixel-peach/15 px-2 py-1 rounded">{w}</span>
              ))
            )}
          </div>

          {/* Available words */}
          <div className="flex flex-wrap gap-2 justify-center">
            {availableWords.map((word, i) => (
              <button key={`${word}-${i}`} onClick={() => handleWordTap(word, i)}
                className="font-pixel text-[9px] bg-pixel-lavender/20 text-foreground px-3 py-2 rounded-lg pixel-border-sm active:scale-90 transition-transform hover:bg-pixel-lavender/30">
                {word}
              </button>
            ))}
          </div>

          {selectedWords.length > 0 && (
            <button onClick={handleUndo} className="mt-3 mx-auto block font-pixel text-[7px] text-muted-foreground active:scale-95 transition-transform">
              ↩ Undo
            </button>
          )}
        </div>
      )}

      {complete && (
        <div className="mt-6 text-center animate-slide-up flex flex-col items-center">
          <div className="font-pixel text-[8px] text-pixel-gold flex items-center gap-1">
            <PixelSparkle size={2} /> Birthday letter complete! Continue... <PixelSparkle size={2} />
          </div>
          <div className="mt-4 animate-bounce-gentle"><PixelHeart size={3} /></div>
        </div>
      )}
    </section>
  );
}
