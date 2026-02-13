import { useRef, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useNarration } from '@/hooks/useNarration';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
import StartScreen from '@/components/game/StartScreen';
import Area1Bedroom from '@/components/game/Area1Bedroom';
import Area2Garden from '@/components/game/Area2Garden';
import Area3Bridge from '@/components/game/Area3Bridge';
import Area4MemoryTown from '@/components/game/Area4MemoryTown';
import Area5Temple from '@/components/game/Area5Temple';
import Area6ValentineHill from '@/components/game/Area6ValentineHill';

const Index = () => {
  const {
    state,
    startGame,
    toggleSound,
    toggleNarration,
    collectHeart,
    collectPetal,
    addBridgePiece,
    openHouse,
    syncHearts,
    lightLantern,
    makeWish,
    HEARTS_NEEDED,
    PETALS_NEEDED,
    BRIDGE_PIECES_NEEDED,
    HOUSES_NEEDED,
    LANTERNS_NEEDED,
  } = useGameState();

  const { playNarration, isPlaying: isNarrationPlaying, isLoading: isNarrationLoading } = useNarration();
  const bgMusic = useBackgroundMusic();

  const narrationProps = {
    narrationEnabled: state.narrationEnabled,
    onPlayNarration: playNarration,
    isNarrationPlaying,
    isNarrationLoading,
  };

  const area2Ref = useRef<HTMLDivElement>(null);
  const area3Ref = useRef<HTMLDivElement>(null);
  const area4Ref = useRef<HTMLDivElement>(null);
  const area5Ref = useRef<HTMLDivElement>(null);
  const area6Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.area1Complete) area2Ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.area1Complete]);
  useEffect(() => {
    if (state.area2Complete) area3Ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.area2Complete]);
  useEffect(() => {
    if (state.area3Complete) area4Ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.area3Complete]);
  useEffect(() => {
    if (state.area4Complete) area5Ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.area4Complete]);
  useEffect(() => {
    if (state.area5Complete) area6Ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.area5Complete]);

  if (!state.started) {
    return (
      <StartScreen
        soundEnabled={state.soundEnabled}
        narrationEnabled={state.narrationEnabled}
        onToggleSound={toggleSound}
        onToggleNarration={toggleNarration}
        onStart={() => {
          startGame();
          if (state.soundEnabled) bgMusic.generateAndPlay();
        }}
        musicPlaying={bgMusic.isPlaying}
        musicLoading={bgMusic.isLoading}
        onToggleMusic={bgMusic.toggle}
      />
    );
  }

  return (
    <main className="w-full overflow-x-hidden">
      <Area1Bedroom
        heartsCollected={state.heartsCollected}
        heartsNeeded={HEARTS_NEEDED}
        complete={state.area1Complete}
        onCollectHeart={collectHeart}
        {...narrationProps}
      />
      <div ref={area2Ref}>
        <Area2Garden
          unlocked={state.area1Complete}
          petalsCollected={state.petalsCollected}
          petalsNeeded={PETALS_NEEDED}
          complete={state.area2Complete}
          onCollectPetal={collectPetal}
          {...narrationProps}
        />
      </div>
      <div ref={area3Ref}>
        <Area3Bridge
          unlocked={state.area2Complete}
          bridgePieces={state.bridgePieces}
          bridgePiecesNeeded={BRIDGE_PIECES_NEEDED}
          complete={state.area3Complete}
          onAddPiece={addBridgePiece}
          {...narrationProps}
        />
      </div>
      <div ref={area4Ref}>
        <Area4MemoryTown
          unlocked={state.area3Complete}
          housesOpened={state.housesOpened}
          housesNeeded={HOUSES_NEEDED}
          complete={state.area4Complete}
          onOpenHouse={openHouse}
          {...narrationProps}
        />
      </div>
      <div ref={area5Ref}>
        <Area5Temple
          unlocked={state.area4Complete}
          complete={state.area5Complete}
          onSync={syncHearts}
          {...narrationProps}
        />
      </div>
      <div ref={area6Ref}>
        <Area6ValentineHill
          unlocked={state.area5Complete}
          lanternsLit={state.lanternsLit}
          lanternsNeeded={LANTERNS_NEEDED}
          wishMade={state.wishMade}
          onLightLantern={lightLantern}
          onMakeWish={makeWish}
          {...narrationProps}
        />
      </div>
    </main>
  );
};

export default Index;
