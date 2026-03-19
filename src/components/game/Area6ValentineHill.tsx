import { useState, useCallback, useEffect } from 'react';
import NarrativeText from './NarrativeText';
import { PixelHeart, PixelLantern, PixelCake, PixelCandle, PixelPetal, PixelSparkle, PixelStar, PixelBuba, PixelBubibu, PixelLock, PixelKnife, PixelEnvelope, PixelRibbon, PixelFlower } from './PixelSprites';

interface Props {
  unlocked: boolean;
  lanternsLit: number;
  lanternsNeeded: number;
  wishMade: boolean;
  onLightLantern: () => void;
  onMakeWish: () => void;
  narrationEnabled?: boolean;
  onPlayNarration?: (text: string) => void;
  isNarrationPlaying?: boolean;
  isNarrationLoading?: boolean;
}

const NARRATIVE = "At the very top of the hill, the whole birthday surprise finally comes together. Bubibo has set out flowers, glowing lanterns, sweet treats, and the cutest little cake for Buba's 18th birthday. The sunset turns everything peach and pink while the air feels full of happy nerves, like the world is waiting with him to see her smile.";

const PHOTOS = [
  '/photos/photo1.jpg', '/photos/photo2.jpg', '/photos/photo3.jpg', '/photos/photo4.jpg',
  '/photos/photo5.jpg', '/photos/photo6.jpg', '/photos/photo7.jpg', '/photos/photo8.jpg',
  '/photos/photo9.jpg', '/photos/photo10.jpg',
];

const BIRTHDAY_SONG_LINES = [
  'Happy birthday to you',
  'Happy birthday to you',
  'Happy birthday dear Buba',
  'Happy birthday to you',
];

const PARTY_GIFTS = [
  'Teddy bear',
  'Birthday crown',
  'Star jar',
  'Bracelet',
  'Sweet box',
  'Music box',
  'Flower bundle',
  'Love note',
];

const LOVE_MESSAGE = [
  "Happy 18th Birthday, Buba...",
  "",
  "My dearest Buba,",
  "",
  "Today is all about you, and I wanted this little pixel world to feel like the softest, happiest birthday hug I could make for you.",
  "",
  "You make everything brighter just by being you. Your smile is comforting, your laugh is adorable, and your presence has this sweet way of making the whole world feel lighter.",
  "",
  "Eighteen is such a special number, and I hope this year brings you gentle mornings, exciting surprises, proud little moments, and so many reasons to smile until your cheeks hurt.",
  "",
  "I made this for you because you deserve to feel celebrated in every possible way. Every flower, lantern, star, and spark in this tiny adventure was placed here with you in mind.",
  "",
  "I hope your 18th birthday feels magical from beginning to end, and I hope you always remember how deeply loved, appreciated, and precious you are.",
  "",
  "Keep being soft, funny, beautiful, kind, and wonderfully you.",
  "The world is so much cuter with Buba in it.",
  "",
  "Happy Birthday, my pretty girl.",
  "Happy 18th birthday, Buba. I wish you the sweetest year ever.",
  "",
  "With all my love,",
  "Your Bubibo",
];

function PixelGiftPile({ size = 4 }: { size?: number }) {
  const s = size;
  return (
    <div className="inline-grid" style={{ gridTemplateColumns: `repeat(7, ${s}px)`, gap: 0 }}>
      {[
        ['_','_','_','R','_','_','_'],
        ['_','_','R','R','R','_','_'],
        ['B','B','B','R','B','B','B'],
        ['B','P','B','R','B','P','B'],
        ['B','P','B','R','B','P','B'],
        ['B','B','B','R','B','B','B'],
      ].flat().map((c, i) => (
        <div key={i} style={{
          width: s,
          height: s,
          backgroundColor:
            c === '_' ? 'transparent' :
            c === 'R' ? '#f28c6f' :
            c === 'B' ? '#ffd56b' :
            '#fff4f1'
        }} />
      ))}
    </div>
  );
}

function PixelMusicNote({ size = 3 }: { size?: number }) {
  const s = size;
  return (
    <div className="inline-grid" style={{ gridTemplateColumns: `repeat(4, ${s}px)`, gap: 0 }}>
      {[
        ['_','_','N','N'],
        ['_','_','N','N'],
        ['_','_','N','_'],
        ['_','_','N','_'],
        ['_','N','N','_'],
        ['N','N','_','_'],
        ['N','N','_','_'],
      ].flat().map((c, i) => (
        <div key={i} style={{ width: s, height: s, backgroundColor: c === 'N' ? '#5ea8e8' : 'transparent' }} />
      ))}
    </div>
  );
}

export default function Area6ValentineHill({ unlocked, lanternsLit, lanternsNeeded, wishMade, onLightLantern, onMakeWish, narrationEnabled, onPlayNarration, isNarrationPlaying, isNarrationLoading }: Props) {
  const [cakeCut, setCakeCut] = useState(false);
  const [cuttingAnimation, setCuttingAnimation] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageLines, setMessageLines] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<number[]>([]);
  const [confetti, setConfetti] = useState<number[]>([]);

  const allLanternsLit = lanternsLit >= lanternsNeeded;

  const handleCutCake = useCallback(() => {
    setCuttingAnimation(true);
    setTimeout(() => {
      setCakeCut(true);
      setCuttingAnimation(false);
      // Launch confetti
      setConfetti(Array.from({ length: 30 }, (_, i) => i));
      // Start floating hearts
      const heartInterval = setInterval(() => {
        setFloatingHearts(prev => [...prev, Date.now()]);
      }, 400);
      setTimeout(() => {
        clearInterval(heartInterval);
        onMakeWish();
        setTimeout(() => setShowMessage(true), 800);
      }, 2000);
    }, 600);
  }, [onMakeWish]);

  // Typewriter effect for love message lines
  useEffect(() => {
    if (!showMessage) return;
    if (messageLines >= LOVE_MESSAGE.length) return;
    const timer = setTimeout(() => {
      setMessageLines(prev => prev + 1);
    }, 300);
    return () => clearTimeout(timer);
  }, [showMessage, messageLines]);

  if (!unlocked) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, hsl(258 58% 88%), hsl(31 100% 87%))' }}>
        <div className="font-pixel text-[8px] text-muted-foreground/40 animate-pulse-glow flex items-center gap-2">
          <PixelLock size={3} /> Sync the hearts above to continue...
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16" style={{ background: 'linear-gradient(180deg, hsl(40 100% 90%), hsl(24 100% 84%), hsl(344 63% 87%))' }}>
      {/* Sunset sky overlay */}
      <div className="absolute top-0 inset-x-0 h-1/3 opacity-45" style={{ background: 'linear-gradient(180deg, hsl(48 100% 81%), hsl(24 94% 74%), transparent)' }} />

      {/* Falling petals background */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={`petal-${i}`} className="absolute animate-petal pointer-events-none" style={{ left: `${5 + Math.random() * 90}%`, top: '-20px', animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 3}s` }}>
          <PixelPetal size={2} />
        </div>
      ))}

      {/* Confetti explosion */}
      {confetti.map((_, i) => (
        <div key={`confetti-${i}`} className="absolute animate-confetti pointer-events-none z-30"
          style={{ left: `${30 + Math.random() * 40}%`, top: `${30 + Math.random() * 20}%`, animationDelay: `${Math.random() * 0.5}s` }}>
          {[<PixelHeart key="h" size={2} />, <PixelSparkle key="sp" size={2} />, <PixelStar key="st" size={2} />, <PixelPetal key="p" size={2} />, <PixelRibbon key="r" size={2} />][i % 5]}
        </div>
      ))}

      {/* Floating celebration hearts */}
      {floatingHearts.map((id, i) => (
        <div key={id} className="absolute animate-love-float pointer-events-none z-20"
          style={{ left: `${20 + Math.random() * 60}%`, bottom: '30%', animationDelay: `${i * 0.1}s` }}>
          <PixelHeart size={3} />
        </div>
      ))}

      {/* Narrative */}
      <NarrativeText text={NARRATIVE} visible={true} className="relative z-10 mb-8" narrationEnabled={narrationEnabled} onPlayNarration={onPlayNarration} isNarrationPlaying={isNarrationPlaying} isNarrationLoading={isNarrationLoading} />

      {/* Pixel lanterns */}
      <div className="flex gap-4 mb-8 relative z-10">
        {Array.from({ length: lanternsNeeded }).map((_, i) => (
          <button key={i} onClick={() => { if (i <= lanternsLit) onLightLantern(); }} disabled={i < lanternsLit}
            className={`transition-all duration-500 ${i < lanternsLit ? 'animate-flicker' : i === lanternsLit ? 'opacity-60 cursor-pointer active:scale-125' : 'opacity-20'}`}>
            <PixelLantern size={5} lit={i < lanternsLit} />
          </button>
        ))}
      </div>

      {!allLanternsLit && (
        <div className="font-pixel text-[8px] text-pixel-gold relative z-10 flex items-center gap-1">
          <PixelLantern size={2} lit /> Light the lanterns: {lanternsLit}/{lanternsNeeded}
        </div>
      )}

      {/* === CAKE CUTTING SCENE === */}
      {allLanternsLit && !wishMade && (
        <div className="relative z-10 flex flex-col items-center animate-slide-up">
          {/* Characters around cake */}
          <div className="flex items-end justify-center gap-6 mb-4">
            <div className="animate-bounce-gentle"><PixelBubibu size={5} /></div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-1">
                <PixelCandle size={3} className="animate-flicker" />
                <div className="animate-flicker" style={{ animationDelay: '0.3s' }}><PixelCandle size={3} /></div>
                <div className="animate-flicker" style={{ animationDelay: '0.6s' }}><PixelCandle size={3} /></div>
              </div>
              <div className={cuttingAnimation ? 'animate-cake-slice' : ''}><PixelCake size={5} /></div>
            </div>
            <div className="animate-bounce-gentle" style={{ animationDelay: '0.5s' }}><PixelBuba size={5} /></div>
          </div>

          {/* Knife + Cut button */}
          {!cakeCut && (
            <button onClick={handleCutCake} className="font-pixel text-xs bg-primary text-primary-foreground px-8 py-4 rounded-lg pixel-border glow-pink active:scale-95 transition-transform animate-pulse-glow flex items-center gap-2 mt-4">
              <PixelKnife size={3} /> Cut Buba's Cake <PixelHeart size={2} />
            </button>
          )}
          {cakeCut && !showMessage && (
            <div className="mt-4 flex flex-col items-center gap-4">
              <div className="font-pixel text-[9px] text-pixel-gold glow-text animate-pulse-glow flex items-center gap-2">
                <PixelSparkle size={3} /> Cake cut! Birthday song time... <PixelSparkle size={3} />
              </div>
              <div className="bg-card/75 backdrop-blur-sm rounded-2xl pixel-border-sm px-5 py-4 w-full max-w-xs">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="animate-float"><PixelMusicNote size={2} /></div>
                  <div className="animate-bounce-gentle"><PixelMusicNote size={3} /></div>
                  <div className="animate-float" style={{ animationDelay: '0.3s' }}><PixelMusicNote size={2} /></div>
                </div>
                {BIRTHDAY_SONG_LINES.map((line, i) => (
                  <p key={line} className="font-pixel text-[7px] text-center text-foreground/80 mb-2 animate-slide-up" style={{ animationDelay: `${i * 0.2}s` }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* === BIRTHDAY LETTER & CELEBRATION === */}
      {wishMade && (
        <div className="relative z-10 w-full max-w-sm flex flex-col items-center animate-slide-up mt-6">
          {/* Photos blinking in hearts */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {PHOTOS.map((photo, i) => (
              <div key={i} className="relative animate-photo-heart" style={{ animationDelay: `${i * 0.2}s` }}>
                {/* Heart-shaped photo frame using clip-path */}
                <div className="w-14 h-14 relative overflow-hidden rounded-lg" style={{
                  clipPath: 'polygon(50% 100%, 0% 35%, 5% 15%, 25% 0%, 50% 15%, 75% 0%, 95% 15%, 100% 35%)',
                }}>
                  <img src={photo} alt="" className="w-full h-full object-cover animate-photo-blink" style={{ animationDelay: `${i * 0.5}s` }} />
                </div>
                {/* Tiny sparkles around */}
                <div className="absolute -top-1 -right-1 animate-sparkle" style={{ animationDelay: `${i * 0.3}s` }}>
                  <PixelSparkle size={1} />
                </div>
              </div>
            ))}
          </div>

          {/* Envelope opening */}
          <div className="mb-4 animate-heartbeat"><PixelEnvelope size={5} /></div>

          {/* Big birthday message */}
          {showMessage && (
            <div className="animate-letter-unfold bg-card/80 backdrop-blur-sm rounded-lg pixel-border p-6 w-full">
              <div className="flex justify-center mb-4">
                <PixelHeart size={6} className="animate-heartbeat" />
              </div>
              {LOVE_MESSAGE.slice(0, messageLines).map((line, i) => (
                <p key={i} className={`font-pixel leading-relaxed mb-1 text-center ${
                  i === 0 ? 'text-[10px] text-pixel-gold glow-text' :
                  i === 2 ? 'text-[9px] text-pixel-pink' :
                  line.includes('Happy 18th birthday, Buba') ? 'text-[10px] text-pixel-pink glow-text animate-pulse-glow' :
                  line.includes('Your Bubibo') ? 'text-[9px] text-pixel-peach' :
                  line === '' ? 'h-2' :
                  'text-[7px] text-foreground/80'
                }`}>
                  {line}
                </p>
              ))}
              {messageLines >= LOVE_MESSAGE.length && (
                <>
                  {/* Final celebration */}
                  <div className="flex justify-center gap-3 mt-6 mb-4">
                    <div className="animate-bounce-gentle"><PixelBubibu size={5} /></div>
                    <div className="animate-heartbeat"><PixelHeart size={5} /></div>
                    <div className="animate-bounce-gentle" style={{ animationDelay: '0.3s' }}><PixelBuba size={5} /></div>
                  </div>

                  {/* Flowers & decorations */}
                  <div className="flex justify-center gap-2 mb-4">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                        {i % 2 === 0 ? <PixelFlower size={3} /> : <PixelPetal size={3} />}
                      </div>
                    ))}
                  </div>

                  <div className="bg-card/70 rounded-2xl pixel-border-sm p-4 mb-4">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <PixelMusicNote size={2} />
                      <p className="font-pixel text-[8px] text-pixel-sky">Birthday Party Chorus</p>
                      <PixelMusicNote size={2} />
                    </div>
                    {BIRTHDAY_SONG_LINES.map((line, i) => (
                      <p key={`${line}-${i}`} className="font-pixel text-[6px] text-center text-foreground/75 mb-2">
                        {line}
                      </p>
                    ))}
                  </div>

                  <div className="bg-card/70 rounded-2xl pixel-border-sm p-4 mb-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <PixelRibbon size={2} />
                      <p className="font-pixel text-[8px] text-pixel-peach">A mountain of gifts for Buba</p>
                      <PixelRibbon size={2} />
                    </div>
                    <div className="grid grid-cols-4 gap-3 justify-items-center">
                      {PARTY_GIFTS.map((gift, i) => (
                        <div key={gift} className="flex flex-col items-center gap-1 animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
                          <div className={i % 2 === 0 ? 'animate-bounce-gentle' : 'animate-float'}>
                            <PixelGiftPile size={3} />
                          </div>
                          <span className="font-pixel text-[5px] text-center text-foreground/70 leading-tight">{gift}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row of tiny hearts */}
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="animate-heartbeat" style={{ animationDelay: `${i * 0.15}s` }}>
                        <PixelHeart size={2} />
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="text-center mt-6">
                    <p className="font-pixel text-[8px] text-pixel-peach mb-2">Next level: Buba's happiest year yet.</p>
                    <div className="flex justify-center gap-1 items-center">
                      <PixelStar size={2} className="animate-sparkle" />
                      <span className="font-pixel text-[6px] text-muted-foreground/60">Made with love by Bubibo</span>
                      <PixelHeart size={1} />
                      <div className="animate-sparkle" style={{ animationDelay: '0.5s' }}><PixelStar size={2} /></div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
