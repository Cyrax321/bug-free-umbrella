import { useState, useCallback } from 'react';

export interface GameState {
  started: boolean;
  soundEnabled: boolean;
  narrationEnabled: boolean;
  area1Complete: boolean;
  area2Complete: boolean;
  area3Complete: boolean;
  area4Complete: boolean;
  area5Complete: boolean;
  area6Complete: boolean;
  heartsCollected: number;
  petalsCollected: number;
  bridgePieces: number;
  housesOpened: number[];
  heartsSynced: boolean;
  lanternsLit: number;
  wishMade: boolean;
}

const initialState: GameState = {
  started: false,
  soundEnabled: true,
  narrationEnabled: true,
  area1Complete: false,
  area2Complete: false,
  area3Complete: false,
  area4Complete: false,
  area5Complete: false,
  area6Complete: false,
  heartsCollected: 0,
  petalsCollected: 0,
  bridgePieces: 0,
  housesOpened: [],
  heartsSynced: false,
  lanternsLit: 0,
  wishMade: false,
};

const HEARTS_NEEDED = 5;
const PETALS_NEEDED = 8;
const BRIDGE_PIECES_NEEDED = 4;
const HOUSES_NEEDED = 6;
const LANTERNS_NEEDED = 4;

export function useGameState() {
  const [state, setState] = useState<GameState>(initialState);

  const startGame = useCallback(() => {
    setState(s => ({ ...s, started: true }));
  }, []);

  const toggleSound = useCallback(() => {
    setState(s => ({ ...s, soundEnabled: !s.soundEnabled }));
  }, []);

  const toggleNarration = useCallback(() => {
    setState(s => ({ ...s, narrationEnabled: !s.narrationEnabled }));
  }, []);

  const collectHeart = useCallback(() => {
    setState(s => {
      const heartsCollected = s.heartsCollected + 1;
      return {
        ...s,
        heartsCollected,
        area1Complete: heartsCollected >= HEARTS_NEEDED,
      };
    });
  }, []);

  const collectPetal = useCallback(() => {
    setState(s => {
      const petalsCollected = s.petalsCollected + 1;
      return {
        ...s,
        petalsCollected,
        area2Complete: petalsCollected >= PETALS_NEEDED,
      };
    });
  }, []);

  const addBridgePiece = useCallback(() => {
    setState(s => {
      const bridgePieces = s.bridgePieces + 1;
      return {
        ...s,
        bridgePieces,
        area3Complete: bridgePieces >= BRIDGE_PIECES_NEEDED,
      };
    });
  }, []);

  const openHouse = useCallback((index: number) => {
    setState(s => {
      if (s.housesOpened.includes(index)) return s;
      const housesOpened = [...s.housesOpened, index];
      return {
        ...s,
        housesOpened,
        area4Complete: housesOpened.length >= HOUSES_NEEDED,
      };
    });
  }, []);

  const syncHearts = useCallback(() => {
    setState(s => ({ ...s, heartsSynced: true, area5Complete: true }));
  }, []);

  const lightLantern = useCallback(() => {
    setState(s => {
      const lanternsLit = s.lanternsLit + 1;
      return { ...s, lanternsLit };
    });
  }, []);

  const makeWish = useCallback(() => {
    setState(s => ({ ...s, wishMade: true, area6Complete: true }));
  }, []);

  return {
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
  };
}
