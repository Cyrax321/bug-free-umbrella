/**
 * Pure CSS pixel art sprites — no emojis!
 * Each sprite is a tiny grid of colored divs for that authentic retro look.
 * Buba and Bubibu use actual character images.
 */

import bubaImg from '@/assets/buba-character.png';
import bubibuImg from '@/assets/bubibu-character.png';

const px = (color: string) => `bg-[${color}]`;

// Reusable pixel grid renderer
function PixelGrid({ grid, size = 3, className = '' }: { grid: string[][]; size?: number; className?: string }) {
  return (
    <div className={`inline-grid ${className}`} style={{ gridTemplateColumns: `repeat(${grid[0].length}, ${size}px)`, gap: 0, imageRendering: 'pixelated' }}>
      {grid.flat().map((color, i) => (
        <div key={i} style={{ width: size, height: size, backgroundColor: color === '_' ? 'transparent' : color }} />
      ))}
    </div>
  );
}

// ---- HEART ----
const HEART_GRID = [
  ['_','#e85d75','#e85d75','_','_','#e85d75','#e85d75','_'],
  ['#e85d75','#f4a0b0','#e85d75','#e85d75','#e85d75','#e85d75','#f4a0b0','#e85d75'],
  ['#e85d75','#e85d75','#e85d75','#e85d75','#e85d75','#e85d75','#e85d75','#e85d75'],
  ['#e85d75','#e85d75','#e85d75','#e85d75','#e85d75','#e85d75','#e85d75','#e85d75'],
  ['_','#e85d75','#e85d75','#e85d75','#e85d75','#e85d75','#e85d75','_'],
  ['_','_','#e85d75','#e85d75','#e85d75','#e85d75','_','_'],
  ['_','_','_','#e85d75','#e85d75','_','_','_'],
  ['_','_','_','_','_','_','_','_'],
];

export function PixelHeart({ size = 3, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={HEART_GRID} size={size} className={className} />;
}

// ---- CHERRY BLOSSOM PETAL ----
const PETAL_GRID = [
  ['_','_','#f7c4d0','_','_'],
  ['_','#f7c4d0','#fde4ec','#f7c4d0','_'],
  ['#f7c4d0','#fde4ec','#fde4ec','#fde4ec','#f7c4d0'],
  ['_','#f7c4d0','#fde4ec','#f7c4d0','_'],
  ['_','_','#f7c4d0','_','_'],
];

export function PixelPetal({ size = 3, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={PETAL_GRID} size={size} className={className} />;
}

// ---- CHERRY BLOSSOM TREE ----
const TREE_GRID = [
  ['_','_','#f7c4d0','#f7c4d0','#f7c4d0','_','_'],
  ['_','#f7c4d0','#fde4ec','#fde4ec','#fde4ec','#f7c4d0','_'],
  ['#f7c4d0','#fde4ec','#fde4ec','#fde4ec','#fde4ec','#fde4ec','#f7c4d0'],
  ['#f7c4d0','#fde4ec','#f7c4d0','#fde4ec','#f7c4d0','#fde4ec','#f7c4d0'],
  ['_','#f7c4d0','#fde4ec','#fde4ec','#fde4ec','#f7c4d0','_'],
  ['_','_','_','#8B6914','_','_','_'],
  ['_','_','_','#8B6914','_','_','_'],
  ['_','_','_','#8B6914','_','_','_'],
];

export function PixelTree({ size = 4, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={TREE_GRID} size={size} className={className} />;
}

// ---- STAR ----
const STAR_GRID = [
  ['_','_','#ffd966','_','_'],
  ['_','#ffd966','#fff3b0','#ffd966','_'],
  ['#ffd966','#fff3b0','#fff3b0','#fff3b0','#ffd966'],
  ['_','#ffd966','#fff3b0','#ffd966','_'],
  ['_','_','#ffd966','_','_'],
];

export function PixelStar({ size = 2, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={STAR_GRID} size={size} className={className} />;
}

// ---- MOON ----
const MOON_GRID = [
  ['_','_','#ffd966','#ffd966','_'],
  ['_','#ffd966','#fff3b0','_','_'],
  ['#ffd966','#fff3b0','_','_','_'],
  ['#ffd966','#fff3b0','_','_','_'],
  ['_','#ffd966','#fff3b0','_','_'],
  ['_','_','#ffd966','#ffd966','_'],
];

export function PixelMoon({ size = 3, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={MOON_GRID} size={size} className={className} />;
}

// ---- LANTERN ----
const LANTERN_GRID = [
  ['_','_','#c0392b','_','_'],
  ['_','#e74c3c','#e74c3c','#e74c3c','_'],
  ['#e74c3c','#f39c12','#f39c12','#f39c12','#e74c3c'],
  ['#e74c3c','#f39c12','#ffd966','#f39c12','#e74c3c'],
  ['#e74c3c','#f39c12','#f39c12','#f39c12','#e74c3c'],
  ['_','#e74c3c','#e74c3c','#e74c3c','_'],
  ['_','_','#c0392b','_','_'],
];

export function PixelLantern({ size = 4, className = '', lit = false }: { size?: number; className?: string; lit?: boolean }) {
  const grid = lit ? LANTERN_GRID : LANTERN_GRID.map(row => row.map(c => c === '#ffd966' || c === '#f39c12' ? '#555' : c === '#e74c3c' ? '#444' : c === '#c0392b' ? '#333' : c));
  return <PixelGrid grid={grid} size={size} className={className} />;
}

// ---- LOCK ----
const LOCK_GRID = [
  ['_','#888','#888','#888','_'],
  ['#888','_','_','_','#888'],
  ['#888','_','_','_','#888'],
  ['#aaa','#aaa','#aaa','#aaa','#aaa'],
  ['#aaa','#aaa','#666','#aaa','#aaa'],
  ['#aaa','#aaa','#666','#aaa','#aaa'],
  ['#aaa','#aaa','#aaa','#aaa','#aaa'],
];

export function PixelLock({ size = 3, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={LOCK_GRID} size={size} className={className} />;
}

// ---- HOUSE ----
const HOUSE_GRID = [
  ['_','_','_','#e85d75','_','_','_'],
  ['_','_','#e85d75','#e85d75','#e85d75','_','_'],
  ['_','#e85d75','#e85d75','#e85d75','#e85d75','#e85d75','_'],
  ['#d4a76a','#d4a76a','#d4a76a','#d4a76a','#d4a76a','#d4a76a','#d4a76a'],
  ['#d4a76a','#87ceeb','#d4a76a','#8B6914','#d4a76a','#87ceeb','#d4a76a'],
  ['#d4a76a','#87ceeb','#d4a76a','#8B6914','#d4a76a','#87ceeb','#d4a76a'],
  ['#d4a76a','#d4a76a','#d4a76a','#8B6914','#d4a76a','#d4a76a','#d4a76a'],
];

export function PixelHouse({ size = 4, className = '', opened = false }: { size?: number; className?: string; opened?: boolean }) {
  const grid = opened
    ? HOUSE_GRID.map(row => row.map(c => c === '#8B6914' ? '#ffd966' : c)) // lit door
    : HOUSE_GRID;
  return <PixelGrid grid={grid} size={size} className={className} />;
}

// ---- TEMPLE ----
const TEMPLE_GRID = [
  ['_','_','#b8a9c9','#b8a9c9','#b8a9c9','_','_'],
  ['_','#b8a9c9','#d4c4e0','#d4c4e0','#d4c4e0','#b8a9c9','_'],
  ['#b8a9c9','#d4c4e0','#d4c4e0','#d4c4e0','#d4c4e0','#d4c4e0','#b8a9c9'],
  ['#c0c0c0','#c0c0c0','#c0c0c0','#c0c0c0','#c0c0c0','#c0c0c0','#c0c0c0'],
  ['#c0c0c0','_','#c0c0c0','#ffd966','#c0c0c0','_','#c0c0c0'],
  ['#c0c0c0','_','#c0c0c0','#ffd966','#c0c0c0','_','#c0c0c0'],
];

export function PixelTemple({ size = 5, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={TEMPLE_GRID} size={size} className={className} />;
}

// ---- CAKE ----
const CAKE_GRID = [
  ['_','_','#ffd966','_','_','#ffd966','_','_'],
  ['_','_','#f39c12','_','_','#f39c12','_','_'],
  ['_','#f7c4d0','#f7c4d0','#f7c4d0','#f7c4d0','#f7c4d0','#f7c4d0','_'],
  ['#fde4ec','#fde4ec','#e85d75','#fde4ec','#e85d75','#fde4ec','#fde4ec','#fde4ec'],
  ['#d4a76a','#d4a76a','#d4a76a','#d4a76a','#d4a76a','#d4a76a','#d4a76a','#d4a76a'],
  ['#c49a6c','#c49a6c','#c49a6c','#c49a6c','#c49a6c','#c49a6c','#c49a6c','#c49a6c'],
];

export function PixelCake({ size = 4, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={CAKE_GRID} size={size} className={className} />;
}

// ---- BRIDGE PIECE ----
const BRIDGE_PIECE_GRID = [
  ['#8B6914','#a67c24','#8B6914'],
  ['#a67c24','#c49a3c','#a67c24'],
  ['#8B6914','#a67c24','#8B6914'],
];

export function PixelBridgePiece({ size = 5, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={BRIDGE_PIECE_GRID} size={size} className={className} />;
}

// ---- CLOUD ----
const CLOUD_GRID = [
  ['_','_','#e0e0e0','#e0e0e0','_','_'],
  ['_','#e0e0e0','#f5f5f5','#f5f5f5','#e0e0e0','_'],
  ['#e0e0e0','#f5f5f5','#f5f5f5','#f5f5f5','#f5f5f5','#e0e0e0'],
];

export function PixelCloud({ size = 3, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={CLOUD_GRID} size={size} className={className} />;
}

// ---- CAMERA / PHOTO ----
const CAMERA_GRID = [
  ['_','_','#666','#666','_','_'],
  ['#888','#888','#888','#888','#888','#888'],
  ['#888','_','#87ceeb','#87ceeb','_','#888'],
  ['#888','#87ceeb','#fff','#fff','#87ceeb','#888'],
  ['#888','_','#87ceeb','#87ceeb','_','#888'],
  ['#888','#888','#888','#888','#888','#888'],
];

export function PixelCamera({ size = 4, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={CAMERA_GRID} size={size} className={className} />;
}

// ---- CANDLE ----
const CANDLE_GRID = [
  ['_','#ffd966','_'],
  ['_','#f39c12','_'],
  ['#fde4ec','#fde4ec','#fde4ec'],
  ['#fde4ec','#fde4ec','#fde4ec'],
  ['#fde4ec','#fde4ec','#fde4ec'],
];

export function PixelCandle({ size = 3, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={CANDLE_GRID} size={size} className={className} />;
}

// ---- SPARKLE ----
const SPARKLE_GRID = [
  ['_','#ffd966','_'],
  ['#ffd966','#fff','#ffd966'],
  ['_','#ffd966','_'],
];

export function PixelSparkle({ size = 2, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={SPARKLE_GRID} size={size} className={className} />;
}

// ---- ARROW DOWN ----
const ARROW_GRID = [
  ['_','_','#e85d75','_','_'],
  ['_','_','#e85d75','_','_'],
  ['#e85d75','_','#e85d75','_','#e85d75'],
  ['_','#e85d75','#e85d75','#e85d75','_'],
  ['_','_','#e85d75','_','_'],
];

export function PixelArrowDown({ size = 4, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={ARROW_GRID} size={size} className={className} />;
}

// ---- BUBA (kawaii chibi girl) ----
export function PixelBuba({ size = 3, className = '' }: { size?: number; className?: string }) {
  const w = size * 24;
  return <img src={bubaImg} alt="Buba" className={`inline-block ${className}`} style={{ width: w, height: 'auto' }} />;
}

// ---- BUBIBU (kawaii chibi boy) ----
export function PixelBubibu({ size = 3, className = '' }: { size?: number; className?: string }) {
  const w = size * 24;
  return <img src={bubibuImg} alt="Bubibu" className={`inline-block ${className}`} style={{ width: w, height: 'auto' }} />;
}

// ---- RAINDROP ----
export function PixelRaindrop({ className = '' }: { className?: string }) {
  return <div className={`w-[2px] h-4 bg-pixel-sky/40 ${className}`} style={{ imageRendering: 'pixelated' }} />;
}

// ---- FLOWER ----
const FLOWER_GRID = [
  ['_','#f7c4d0','_','#f7c4d0','_'],
  ['#f7c4d0','#ffd966','#ffd966','#ffd966','#f7c4d0'],
  ['_','#f7c4d0','_','#f7c4d0','_'],
  ['_','_','#5a8f3c','_','_'],
  ['_','_','#5a8f3c','_','_'],
];

export function PixelFlower({ size = 3, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={FLOWER_GRID} size={size} className={className} />;
}

// ---- BED ----
const BED_GRID = [
  ['_','_','_','_','_','_','_','_','_','_'],
  ['_','#4a3728','_','_','_','_','_','_','#4a3728','_'],
  ['#c49a6c','#c49a6c','#c49a6c','#c49a6c','#c49a6c','#c49a6c','#c49a6c','#c49a6c','#c49a6c','#c49a6c'],
  ['#c49a6c','#f7c4d0','#f7c4d0','#f7c4d0','#f7c4d0','#f7c4d0','#f7c4d0','#f7c4d0','#f7c4d0','#c49a6c'],
  ['#c49a6c','#fde4ec','#fde4ec','#fde4ec','#fde4ec','#fde4ec','#fde4ec','#fde4ec','#fde4ec','#c49a6c'],
];

export function PixelBed({ size = 4, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={BED_GRID} size={size} className={className} />;
}

// ---- WINDOW ----
const WINDOW_GRID = [
  ['#6b5b4a','#6b5b4a','#6b5b4a','#6b5b4a','#6b5b4a','#6b5b4a'],
  ['#6b5b4a','#2c3e7a','#2c3e7a','#6b5b4a','#2c3e7a','#6b5b4a'],
  ['#6b5b4a','#2c3e7a','#ffd966','#6b5b4a','#2c3e7a','#6b5b4a'],
  ['#6b5b4a','#2c3e7a','#2c3e7a','#6b5b4a','#2c3e7a','#6b5b4a'],
  ['#6b5b4a','#6b5b4a','#6b5b4a','#6b5b4a','#6b5b4a','#6b5b4a'],
];

export function PixelWindow({ size = 6, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={WINDOW_GRID} size={size} className={className} />;
}

// ---- KNIFE (for cake cutting) ----
const KNIFE_GRID = [
  ['_','_','_','_','#ccc'],
  ['_','_','_','#ccc','#eee'],
  ['_','_','#ccc','#eee','_'],
  ['_','#8B6914','#ccc','_','_'],
  ['#8B6914','#a67c24','_','_','_'],
  ['#8B6914','_','_','_','_'],
];

export function PixelKnife({ size = 3, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={KNIFE_GRID} size={size} className={className} />;
}

// ---- ENVELOPE ----
const ENVELOPE_GRID = [
  ['#e85d75','_','_','_','_','_','#e85d75'],
  ['_','#e85d75','_','_','_','#e85d75','_'],
  ['#f7c4d0','_','#e85d75','_','#e85d75','_','#f7c4d0'],
  ['#f7c4d0','#f7c4d0','_','#e85d75','_','#f7c4d0','#f7c4d0'],
  ['#f7c4d0','#f7c4d0','#f7c4d0','#f7c4d0','#f7c4d0','#f7c4d0','#f7c4d0'],
];

export function PixelEnvelope({ size = 4, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={ENVELOPE_GRID} size={size} className={className} />;
}

// ---- RIBBON ----
const RIBBON_GRID = [
  ['#e85d75','_','_','_','#e85d75'],
  ['_','#e85d75','_','#e85d75','_'],
  ['_','_','#ffd966','_','_'],
  ['_','#e85d75','_','#e85d75','_'],
  ['#e85d75','_','_','_','#e85d75'],
];

export function PixelRibbon({ size = 3, className = '' }: { size?: number; className?: string }) {
  return <PixelGrid grid={RIBBON_GRID} size={size} className={className} />;
}
