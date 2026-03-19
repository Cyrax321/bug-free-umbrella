import { useState } from 'react';
import NarrativeText from './NarrativeText';
import { PixelLantern, PixelHouse, PixelCamera, PixelHeart, PixelLock } from './PixelSprites';

interface Props {
  unlocked: boolean;
  housesOpened: number[];
  housesNeeded: number;
  complete: boolean;
  onOpenHouse: (index: number) => void;
  narrationEnabled?: boolean;
  onPlayNarration?: (text: string) => void;
  isNarrationPlaying?: boolean;
  isNarrationLoading?: boolean;
}

const PHOTOS = [
  '/photos/photo1.jpg', '/photos/photo2.jpg', '/photos/photo3.jpg', '/photos/photo4.jpg',
  '/photos/photo5.jpg', '/photos/photo6.jpg', '/photos/photo7.jpg', '/photos/photo8.jpg',
  '/photos/photo9.jpg', '/photos/photo10.jpg', '/photos/photo1.jpg', '/photos/photo2.jpg',
];

const CAPTIONS = [
  "Memory unlocked", "Buba's smile makes every day softer", "Tiny moments with you feel huge",
  "Every photo of you belongs in a treasure box", "You make ordinary days feel sparkly",
  "Eighteen looks lovely on you already", "Sunshine follows you everywhere, Buba", "You turn memories into favorite places",
  "Your laugh could power this whole town", "This day was always meant to celebrate you", "So many sweet moments, one sweet girl", "The world looks cuter with you in it",
];

const HOUSE_COLORS = [
  'bg-pixel-pink/20', 'bg-pixel-lavender/20', 'bg-pixel-peach/20', 'bg-pixel-gold/20',
  'bg-pixel-sky/20', 'bg-pixel-pink/15', 'bg-pixel-lavender/15', 'bg-pixel-peach/15',
  'bg-pixel-gold/15', 'bg-pixel-sky/15', 'bg-pixel-pink/25', 'bg-pixel-lavender/25',
];

const NARRATIVE = "Memory Town is where Bubibo keeps all the little moments that remind him of Buba. Each tiny house glows with a photo, a laugh, or a soft feeling he never wanted to forget. He lights them one by one until the whole street shines like a scrapbook made just for her 18th birthday.";

export default function Area4MemoryTown({ unlocked, housesOpened, housesNeeded, complete, onOpenHouse, narrationEnabled, onPlayNarration, isNarrationPlaying, isNarrationLoading }: Props) {
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);

  if (!unlocked) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, hsl(211 90% 84%), hsl(277 80% 86%))' }}>
        <div className="font-pixel text-[8px] text-muted-foreground/40 animate-pulse-glow flex items-center gap-2">
          <PixelLock size={3} /> Repair the bridge above to continue...
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden px-4 py-16" style={{ background: 'linear-gradient(180deg, hsl(207 92% 84%), hsl(278 78% 86%), hsl(339 89% 88%))' }}>
      <div className="flex gap-6 mb-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`transition-all duration-700 ${i < housesOpened.length ? 'opacity-100 animate-flicker' : 'opacity-20'}`}>
            <PixelLantern size={4} lit={i < housesOpened.length} />
          </div>
        ))}
      </div>
      <NarrativeText text={NARRATIVE} visible={true} className="mb-6" narrationEnabled={narrationEnabled} onPlayNarration={onPlayNarration} isNarrationPlaying={isNarrationPlaying} isNarrationLoading={isNarrationLoading} />
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
        {Array.from({ length: 12 }).map((_, i) => (
          <button key={i} onClick={() => { onOpenHouse(i); setSelectedHouse(i); }}
            className={`relative aspect-square rounded-lg pixel-border-sm flex flex-col items-center justify-center gap-1 transition-all duration-300 active:scale-95 ${HOUSE_COLORS[i]} ${housesOpened.includes(i) ? 'ring-2 ring-pixel-gold/50' : 'hover:brightness-125'}`}>
            <PixelHouse size={3} opened={housesOpened.includes(i)} />
            <span className="font-pixel text-[6px] text-muted-foreground">
              {housesOpened.includes(i) ? <PixelHeart size={1} /> : `#${i + 1}`}
            </span>
          </button>
        ))}
      </div>
      {selectedHouse !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-6" onClick={() => setSelectedHouse(null)}>
          <div className="bg-card rounded-lg pixel-border p-4 max-w-xs w-full animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="aspect-square rounded-lg pixel-border-sm overflow-hidden mb-3">
              <img src={PHOTOS[selectedHouse]} alt={`Memory #${selectedHouse + 1}`} className="w-full h-full object-cover" />
            </div>
            <p className="font-pixel text-[8px] text-pixel-pink text-center leading-relaxed">{CAPTIONS[selectedHouse]}</p>
            <button onClick={() => setSelectedHouse(null)} className="mt-4 w-full font-pixel text-[8px] bg-primary/20 text-foreground py-2 rounded-lg active:scale-95 transition-transform flex items-center justify-center gap-1">
              Close <PixelHeart size={1} />
            </button>
          </div>
        </div>
      )}
      <div className="font-pixel text-[8px] text-pixel-peach mt-6 flex items-center gap-1">
        {complete ? (
          <><PixelLantern size={2} lit /> All memory lanterns lit! Continue...</>
        ) : (
          <><PixelHouse size={2} /> {housesOpened.length}/{housesNeeded} houses opened</>
        )}
      </div>
      {complete && <div className="mt-6 animate-bounce-gentle"><PixelHeart size={3} /></div>}
    </section>
  );
}
