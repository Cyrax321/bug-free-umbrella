import { useState, useCallback } from 'react';

export interface GameState {
  started: boolean;
  soundEnabled: boolean;
  narrationEnabled: boolean;
  area1Complete: boolean;
  area1bComplete: boolean;
  area2Complete: boolean;
  area2bComplete: boolean;
  area3Complete: boolean;
  area3bComplete: boolean;
  area3cComplete: boolean;
  area4Complete: boolean;
  area4bComplete: boolean;
  area5Complete: boolean;
  area5bComplete: boolean;
  area5cComplete: boolean;
  area6Complete: boolean;
  heartsCollected: number;
  giftsWrapped: number;
  petalsCollected: number;
  firefliesCaught: number;
  bridgePieces: number;
  letterComplete: boolean;
  flowersCollected: number;
  housesOpened: number[];
  cardsComplete: boolean;
  heartsSynced: boolean;
  starsCaught: number;
  constellationComplete: boolean;
  lanternsLit: number;
  wishMade: boolean;
}

const initialState: GameState = {
  started: false,
  soundEnabled: true,
  narrationEnabled: false,
  area1Complete: false,
  area1bComplete: false,
  area2Complete: false,
  area2bComplete: false,
  area3Complete: false,
  area3bComplete: false,
  area3cComplete: false,
  area4Complete: false,
  area4bComplete: false,
  area5Complete: false,
  area5bComplete: false,
  area5cComplete: false,
  area6Complete: false,
  heartsCollected: 0,
  giftsWrapped: 0,
  petalsCollected: 0,
  firefliesCaught: 0,
  bridgePieces: 0,
  letterComplete: false,
  flowersCollected: 0,
  housesOpened: [],
  cardsComplete: false,
  heartsSynced: false,
  starsCaught: 0,
  constellationComplete: false,
  lanternsLit: 0,
  wishMade: false,
};

const HEARTS_NEEDED = 5;
const GIFTS_NEEDED = 6;
const PETALS_NEEDED = 8;
const FIREFLIES_NEEDED = 6;
const BRIDGE_PIECES_NEEDED = 4;
const FLOWERS_NEEDED = 7;
const HOUSES_NEEDED = 6;
const STARS_NEEDED = 8;
const LANTERNS_NEEDED = 4;

export function useGameState() {
  const [state, setState] = useState<GameState>(initialState);

  const startGame = useCallback(() => setState(s => ({ ...s, started: true })), []);
  const toggleSound = useCallback(() => setState(s => ({ ...s, soundEnabled: !s.soundEnabled })), []);
  const toggleNarration = useCallback(() => setState(s => ({ ...s, narrationEnabled: !s.narrationEnabled })), []);

  const collectHeart = useCallback(() => {
    setState(s => {
      const heartsCollected = s.heartsCollected + 1;
      return { ...s, heartsCollected, area1Complete: heartsCollected >= HEARTS_NEEDED };
    });
  }, []);

  const wrapGift = useCallback(() => {
    setState(s => {
      const giftsWrapped = s.giftsWrapped + 1;
      return { ...s, giftsWrapped, area1bComplete: giftsWrapped >= GIFTS_NEEDED };
    });
  }, []);

  const collectPetal = useCallback(() => {
    setState(s => {
      const petalsCollected = s.petalsCollected + 1;
      return { ...s, petalsCollected, area2Complete: petalsCollected >= PETALS_NEEDED };
    });
  }, []);

  const catchFirefly = useCallback(() => {
    setState(s => {
      const firefliesCaught = s.firefliesCaught + 1;
      return { ...s, firefliesCaught, area2bComplete: firefliesCaught >= FIREFLIES_NEEDED };
    });
  }, []);

  const addBridgePiece = useCallback(() => {
    setState(s => {
      const bridgePieces = s.bridgePieces + 1;
      return { ...s, bridgePieces, area3Complete: bridgePieces >= BRIDGE_PIECES_NEEDED };
    });
  }, []);

  const completeLetter = useCallback(() => setState(s => ({ ...s, letterComplete: true, area3bComplete: true })), []);

  const collectFlower = useCallback(() => {
    setState(s => {
      const flowersCollected = s.flowersCollected + 1;
      return { ...s, flowersCollected, area3cComplete: flowersCollected >= FLOWERS_NEEDED };
    });
  }, []);

  const openHouse = useCallback((index: number) => {
    setState(s => {
      if (s.housesOpened.includes(index)) return s;
      const housesOpened = [...s.housesOpened, index];
      return { ...s, housesOpened, area4Complete: housesOpened.length >= HOUSES_NEEDED };
    });
  }, []);

  const completeCards = useCallback(() => setState(s => ({ ...s, cardsComplete: true, area4bComplete: true })), []);

  const syncHearts = useCallback(() => setState(s => ({ ...s, heartsSynced: true, area5Complete: true })), []);

  const catchStar = useCallback(() => {
    setState(s => {
      const starsCaught = s.starsCaught + 1;
      return { ...s, starsCaught, area5bComplete: starsCaught >= STARS_NEEDED };
    });
  }, []);

  const completeConstellation = useCallback(() => setState(s => ({ ...s, constellationComplete: true, area5cComplete: true })), []);

  const lightLantern = useCallback(() => {
    setState(s => ({ ...s, lanternsLit: s.lanternsLit + 1 }));
  }, []);

  const makeWish = useCallback(() => setState(s => ({ ...s, wishMade: true, area6Complete: true })), []);

  return {
    state,
    startGame, toggleSound, toggleNarration,
    collectHeart, wrapGift, collectPetal, catchFirefly,
    addBridgePiece, completeLetter, collectFlower,
    openHouse, completeCards, syncHearts,
    catchStar, completeConstellation, lightLantern, makeWish,
    HEARTS_NEEDED, GIFTS_NEEDED, PETALS_NEEDED, FIREFLIES_NEEDED,
    BRIDGE_PIECES_NEEDED, FLOWERS_NEEDED, HOUSES_NEEDED,
    STARS_NEEDED, LANTERNS_NEEDED,
  };
}
