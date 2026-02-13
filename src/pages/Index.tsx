import { useRef, useEffect, useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useNarration } from '@/hooks/useNarration';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import StartScreen from '@/components/game/StartScreen';
import Area1Bedroom from '@/components/game/Area1Bedroom';
import Area1bGiftWrapping from '@/components/game/Area1bGiftWrapping';
import Area2Garden from '@/components/game/Area2Garden';
import Area2bFireflyForest from '@/components/game/Area2bFireflyForest';
import Area3Bridge from '@/components/game/Area3Bridge';
import Area3bLoveLetterPuzzle from '@/components/game/Area3bLoveLetterPuzzle';
import Area3cBouquetBuilder from '@/components/game/Area3cBouquetBuilder';
import Area4MemoryTown from '@/components/game/Area4MemoryTown';
import Area4bMemoryCards from '@/components/game/Area4bMemoryCards';
import Area5Temple from '@/components/game/Area5Temple';
import Area5bShootingStars from '@/components/game/Area5bShootingStars';
import Area5cLoveConstellation from '@/components/game/Area5cLoveConstellation';
import Area6ValentineHill from '@/components/game/Area6ValentineHill';
import CelebrationOverlay, { ChocolateRain, RewardsBar } from '@/components/game/CelebrationOverlay';

const Index = () => {
  const g = useGameState();
  const { state } = g;
  const { playNarration, isPlaying: isNarrationPlaying, isLoading: isNarrationLoading } = useNarration();
  const bgMusic = useBackgroundMusic();
  const sfx = useSoundEffects();
  const [celebrationCount, setCelebrationCount] = useState(0);
  const [celebrationIntensity, setCelebrationIntensity] = useState<'light' | 'medium' | 'heavy' | 'mega'>('light');

  const np = {
    narrationEnabled: state.narrationEnabled,
    onPlayNarration: playNarration,
    isNarrationPlaying,
    isNarrationLoading,
  };

  // Trigger celebration with intensity
  const celebrate = (intensity: 'light' | 'medium' | 'heavy' | 'mega' = 'light') => {
    setCelebrationIntensity(intensity);
    setCelebrationCount(c => c + 1);
  };

  // Wrap game actions with SFX + celebrations
  const withSfxAndCelebration = (action: (...args: any[]) => void, sfxKey: string, intensity: 'light' | 'medium' | 'heavy' | 'mega' = 'light') => {
    return (...args: any[]) => {
      action(...args);
      if (state.soundEnabled) sfx.playSfx(sfxKey);
      celebrate(intensity);
    };
  };

  const refs = {
    a1b: useRef<HTMLDivElement>(null),
    a2: useRef<HTMLDivElement>(null),
    a2b: useRef<HTMLDivElement>(null),
    a3: useRef<HTMLDivElement>(null),
    a3b: useRef<HTMLDivElement>(null),
    a3c: useRef<HTMLDivElement>(null),
    a4: useRef<HTMLDivElement>(null),
    a4b: useRef<HTMLDivElement>(null),
    a5: useRef<HTMLDivElement>(null),
    a5b: useRef<HTMLDivElement>(null),
    a5c: useRef<HTMLDivElement>(null),
    a6: useRef<HTMLDivElement>(null),
  };

  // Auto-scroll + heavy celebration on area complete
  const scrollAndCelebrate = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    if (state.soundEnabled) sfx.playSfx('areaComplete');
    celebrate('heavy');
  };

  useEffect(() => { if (state.area1Complete) scrollAndCelebrate(refs.a1b); }, [state.area1Complete]);
  useEffect(() => { if (state.area1bComplete) scrollAndCelebrate(refs.a2); }, [state.area1bComplete]);
  useEffect(() => { if (state.area2Complete) scrollAndCelebrate(refs.a2b); }, [state.area2Complete]);
  useEffect(() => { if (state.area2bComplete) scrollAndCelebrate(refs.a3); }, [state.area2bComplete]);
  useEffect(() => { if (state.area3Complete) scrollAndCelebrate(refs.a3b); }, [state.area3Complete]);
  useEffect(() => { if (state.area3bComplete) scrollAndCelebrate(refs.a3c); }, [state.area3bComplete]);
  useEffect(() => { if (state.area3cComplete) scrollAndCelebrate(refs.a4); }, [state.area3cComplete]);
  useEffect(() => { if (state.area4Complete) scrollAndCelebrate(refs.a4b); }, [state.area4Complete]);
  useEffect(() => { if (state.area4bComplete) scrollAndCelebrate(refs.a5); }, [state.area4bComplete]);
  useEffect(() => { if (state.area5Complete) scrollAndCelebrate(refs.a5b); }, [state.area5Complete]);
  useEffect(() => { if (state.area5bComplete) scrollAndCelebrate(refs.a5c); }, [state.area5bComplete]);
  useEffect(() => { if (state.area5cComplete) scrollAndCelebrate(refs.a6); }, [state.area5cComplete]);
  // Mega celebration for final wish
  useEffect(() => { if (state.wishMade) celebrate('mega'); }, [state.wishMade]);

  // Preload SFX
  useEffect(() => {
    if (state.started && state.soundEnabled) {
      sfx.preload(['heartCollect', 'areaComplete']);
    }
  }, [state.started]);

  // Total rewards for the bar
  const totalHearts = state.heartsCollected;
  const totalGifts = state.giftsWrapped;
  const totalFlowers = state.flowersCollected;
  const totalStars = state.starsCaught;

  if (!state.started) {
    return (
      <StartScreen
        soundEnabled={state.soundEnabled} narrationEnabled={state.narrationEnabled}
        onToggleSound={g.toggleSound} onToggleNarration={g.toggleNarration}
        onStart={() => { g.startGame(); if (state.soundEnabled) bgMusic.generateAndPlay(); }}
        musicPlaying={bgMusic.isPlaying} musicLoading={bgMusic.isLoading} onToggleMusic={bgMusic.toggle}
      />
    );
  }

  return (
    <main className="w-full overflow-x-hidden">
      {/* Rewards HUD */}
      <RewardsBar hearts={totalHearts} gifts={totalGifts} flowers={totalFlowers} stars={totalStars} />

      {/* Celebration particles */}
      <CelebrationOverlay triggerCount={celebrationCount} intensity={celebrationIntensity} />

      {/* Chocolate rain during gift wrapping and final areas */}
      <ChocolateRain active={state.area1Complete && !state.area1bComplete} />
      <ChocolateRain active={state.wishMade} />

      <Area1Bedroom heartsCollected={state.heartsCollected} heartsNeeded={g.HEARTS_NEEDED} complete={state.area1Complete} onCollectHeart={withSfxAndCelebration(g.collectHeart, 'heartCollect', 'light')} {...np} />
      <div ref={refs.a1b}>
        <Area1bGiftWrapping unlocked={state.area1Complete} giftsWrapped={state.giftsWrapped} giftsNeeded={g.GIFTS_NEEDED} complete={state.area1bComplete} onWrapGift={withSfxAndCelebration(g.wrapGift, 'giftWrap', 'medium')} {...np} />
      </div>
      <div ref={refs.a2}>
        <Area2Garden unlocked={state.area1bComplete} petalsCollected={state.petalsCollected} petalsNeeded={g.PETALS_NEEDED} complete={state.area2Complete} onCollectPetal={withSfxAndCelebration(g.collectPetal, 'petalCollect', 'light')} {...np} />
      </div>
      <div ref={refs.a2b}>
        <Area2bFireflyForest unlocked={state.area2Complete} firefliesCaught={state.firefliesCaught} firefliesNeeded={g.FIREFLIES_NEEDED} complete={state.area2bComplete} onCatchFirefly={withSfxAndCelebration(g.catchFirefly, 'fireflysCatch', 'light')} {...np} />
      </div>
      <div ref={refs.a3}>
        <Area3Bridge unlocked={state.area2bComplete} bridgePieces={state.bridgePieces} bridgePiecesNeeded={g.BRIDGE_PIECES_NEEDED} complete={state.area3Complete} onAddPiece={withSfxAndCelebration(g.addBridgePiece, 'bridgePiece', 'medium')} {...np} />
      </div>
      <div ref={refs.a3b}>
        <Area3bLoveLetterPuzzle unlocked={state.area3Complete} complete={state.area3bComplete} onComplete={withSfxAndCelebration(g.completeLetter, 'puzzleComplete', 'heavy')} {...np} />
      </div>
      <div ref={refs.a3c}>
        <Area3cBouquetBuilder unlocked={state.area3bComplete} flowersCollected={state.flowersCollected} flowersNeeded={g.FLOWERS_NEEDED} complete={state.area3cComplete} onCollectFlower={withSfxAndCelebration(g.collectFlower, 'flowerPick', 'light')} {...np} />
      </div>
      <div ref={refs.a4}>
        <Area4MemoryTown unlocked={state.area3cComplete} housesOpened={state.housesOpened} housesNeeded={g.HOUSES_NEEDED} onOpenHouse={(i) => { g.openHouse(i); if (state.soundEnabled) sfx.playSfx('heartCollect'); celebrate('medium'); }} complete={state.area4Complete} {...np} />
      </div>
      <div ref={refs.a4b}>
        <Area4bMemoryCards unlocked={state.area4Complete} complete={state.area4bComplete} onComplete={withSfxAndCelebration(g.completeCards, 'puzzleComplete', 'heavy')} {...np} />
      </div>
      <div ref={refs.a5}>
        <Area5Temple unlocked={state.area4bComplete} complete={state.area5Complete} onSync={withSfxAndCelebration(g.syncHearts, 'heartSync', 'heavy')} {...np} />
      </div>
      <div ref={refs.a5b}>
        <Area5bShootingStars unlocked={state.area5Complete} starsCaught={state.starsCaught} starsNeeded={g.STARS_NEEDED} complete={state.area5bComplete} onCatchStar={withSfxAndCelebration(g.catchStar, 'starCatch', 'light')} {...np} />
      </div>
      <div ref={refs.a5c}>
        <Area5cLoveConstellation unlocked={state.area5bComplete} complete={state.area5cComplete} onComplete={withSfxAndCelebration(g.completeConstellation, 'puzzleComplete', 'heavy')} {...np} />
      </div>
      <div ref={refs.a6}>
        <Area6ValentineHill unlocked={state.area5cComplete} lanternsLit={state.lanternsLit} lanternsNeeded={g.LANTERNS_NEEDED} wishMade={state.wishMade} onLightLantern={withSfxAndCelebration(g.lightLantern, 'lanternLight', 'medium')} onMakeWish={withSfxAndCelebration(g.makeWish, 'wishMade', 'mega')} {...np} />
      </div>
    </main>
  );
};

export default Index;
