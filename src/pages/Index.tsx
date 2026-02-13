import { useRef, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useNarration } from '@/hooks/useNarration';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
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

const Index = () => {
  const g = useGameState();
  const { state } = g;
  const { playNarration, isPlaying: isNarrationPlaying, isLoading: isNarrationLoading } = useNarration();
  const bgMusic = useBackgroundMusic();

  const np = {
    narrationEnabled: state.narrationEnabled,
    onPlayNarration: playNarration,
    isNarrationPlaying,
    isNarrationLoading,
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

  // Auto-scroll on area completion
  useEffect(() => { if (state.area1Complete) refs.a1b.current?.scrollIntoView({ behavior: 'smooth' }); }, [state.area1Complete]);
  useEffect(() => { if (state.area1bComplete) refs.a2.current?.scrollIntoView({ behavior: 'smooth' }); }, [state.area1bComplete]);
  useEffect(() => { if (state.area2Complete) refs.a2b.current?.scrollIntoView({ behavior: 'smooth' }); }, [state.area2Complete]);
  useEffect(() => { if (state.area2bComplete) refs.a3.current?.scrollIntoView({ behavior: 'smooth' }); }, [state.area2bComplete]);
  useEffect(() => { if (state.area3Complete) refs.a3b.current?.scrollIntoView({ behavior: 'smooth' }); }, [state.area3Complete]);
  useEffect(() => { if (state.area3bComplete) refs.a3c.current?.scrollIntoView({ behavior: 'smooth' }); }, [state.area3bComplete]);
  useEffect(() => { if (state.area3cComplete) refs.a4.current?.scrollIntoView({ behavior: 'smooth' }); }, [state.area3cComplete]);
  useEffect(() => { if (state.area4Complete) refs.a4b.current?.scrollIntoView({ behavior: 'smooth' }); }, [state.area4Complete]);
  useEffect(() => { if (state.area4bComplete) refs.a5.current?.scrollIntoView({ behavior: 'smooth' }); }, [state.area4bComplete]);
  useEffect(() => { if (state.area5Complete) refs.a5b.current?.scrollIntoView({ behavior: 'smooth' }); }, [state.area5Complete]);
  useEffect(() => { if (state.area5bComplete) refs.a5c.current?.scrollIntoView({ behavior: 'smooth' }); }, [state.area5bComplete]);
  useEffect(() => { if (state.area5cComplete) refs.a6.current?.scrollIntoView({ behavior: 'smooth' }); }, [state.area5cComplete]);

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
      <Area1Bedroom heartsCollected={state.heartsCollected} heartsNeeded={g.HEARTS_NEEDED} complete={state.area1Complete} onCollectHeart={g.collectHeart} {...np} />
      <div ref={refs.a1b}>
        <Area1bGiftWrapping unlocked={state.area1Complete} giftsWrapped={state.giftsWrapped} giftsNeeded={g.GIFTS_NEEDED} complete={state.area1bComplete} onWrapGift={g.wrapGift} {...np} />
      </div>
      <div ref={refs.a2}>
        <Area2Garden unlocked={state.area1bComplete} petalsCollected={state.petalsCollected} petalsNeeded={g.PETALS_NEEDED} complete={state.area2Complete} onCollectPetal={g.collectPetal} {...np} />
      </div>
      <div ref={refs.a2b}>
        <Area2bFireflyForest unlocked={state.area2Complete} firefliesCaught={state.firefliesCaught} firefliesNeeded={g.FIREFLIES_NEEDED} complete={state.area2bComplete} onCatchFirefly={g.catchFirefly} {...np} />
      </div>
      <div ref={refs.a3}>
        <Area3Bridge unlocked={state.area2bComplete} bridgePieces={state.bridgePieces} bridgePiecesNeeded={g.BRIDGE_PIECES_NEEDED} complete={state.area3Complete} onAddPiece={g.addBridgePiece} {...np} />
      </div>
      <div ref={refs.a3b}>
        <Area3bLoveLetterPuzzle unlocked={state.area3Complete} complete={state.area3bComplete} onComplete={g.completeLetter} {...np} />
      </div>
      <div ref={refs.a3c}>
        <Area3cBouquetBuilder unlocked={state.area3bComplete} flowersCollected={state.flowersCollected} flowersNeeded={g.FLOWERS_NEEDED} complete={state.area3cComplete} onCollectFlower={g.collectFlower} {...np} />
      </div>
      <div ref={refs.a4}>
        <Area4MemoryTown unlocked={state.area3cComplete} housesOpened={state.housesOpened} housesNeeded={g.HOUSES_NEEDED} complete={state.area4Complete} onOpenHouse={g.openHouse} {...np} />
      </div>
      <div ref={refs.a4b}>
        <Area4bMemoryCards unlocked={state.area4Complete} complete={state.area4bComplete} onComplete={g.completeCards} {...np} />
      </div>
      <div ref={refs.a5}>
        <Area5Temple unlocked={state.area4bComplete} complete={state.area5Complete} onSync={g.syncHearts} {...np} />
      </div>
      <div ref={refs.a5b}>
        <Area5bShootingStars unlocked={state.area5Complete} starsCaught={state.starsCaught} starsNeeded={g.STARS_NEEDED} complete={state.area5bComplete} onCatchStar={g.catchStar} {...np} />
      </div>
      <div ref={refs.a5c}>
        <Area5cLoveConstellation unlocked={state.area5bComplete} complete={state.area5cComplete} onComplete={g.completeConstellation} {...np} />
      </div>
      <div ref={refs.a6}>
        <Area6ValentineHill unlocked={state.area5cComplete} lanternsLit={state.lanternsLit} lanternsNeeded={g.LANTERNS_NEEDED} wishMade={state.wishMade} onLightLantern={g.lightLantern} onMakeWish={g.makeWish} {...np} />
      </div>
    </main>
  );
};

export default Index;
