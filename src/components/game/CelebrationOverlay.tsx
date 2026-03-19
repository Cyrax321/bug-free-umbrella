import { useState, useEffect, useCallback } from 'react';
import { PixelHeart, PixelChocoHeart, PixelChocolate, PixelDiamond, PixelCrown, PixelPopper, PixelRose, PixelRing, PixelSparkle, PixelStar, PixelPetal, PixelRibbon, PixelFlower } from './PixelSprites';

// Reward messages that pop up during gameplay
const REWARD_MESSAGES = [
  "You're amazing!",
  "Birthday magic!",
  "Buba would smile!",
  "Cute surprise!",
  "Party level UP!",
  "Sparkle power!",
  "Sweet moment!",
  "Pure magic!",
  "Birthday win!",
  "So adorable!",
  "Beautiful!",
  "Adorable!",
  "Joy grows!",
  "Keep going!",
  "So sweet!",
  "Dreamy!",
];

// Random reward item component
function RewardItem({ type, size = 3 }: { type: number; size?: number }) {
  const items = [
    <PixelHeart size={size} />,
    <PixelChocoHeart size={size} />,
    <PixelChocolate size={size} />,
    <PixelDiamond size={size} />,
    <PixelCrown size={size} />,
    <PixelPopper size={size} />,
    <PixelRose size={size} />,
    <PixelRing size={size} />,
    <PixelSparkle size={size} />,
    <PixelStar size={size} />,
    <PixelPetal size={size} />,
    <PixelRibbon size={size} />,
    <PixelFlower size={size} />,
  ];
  return items[type % items.length];
}

interface Particle {
  id: number;
  x: number;
  y: number;
  type: number;
  size: number;
  animation: string;
}

interface RewardPopup {
  id: number;
  message: string;
  x: number;
  y: number;
}

interface Props {
  triggerCount: number; // Increment this to trigger celebrations
  intensity?: 'light' | 'medium' | 'heavy' | 'mega';
}

export default function CelebrationOverlay({ triggerCount, intensity = 'medium' }: Props) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [rewards, setRewards] = useState<RewardPopup[]>([]);

  const particleCounts = { light: 8, medium: 15, heavy: 25, mega: 40 };
  const count = particleCounts[intensity];

  useEffect(() => {
    if (triggerCount <= 0) return;

    // Spawn particles
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: 10 + Math.random() * 80,
      y: 20 + Math.random() * 60,
      type: Math.floor(Math.random() * 13),
      size: 2 + Math.floor(Math.random() * 3),
      animation: ['animate-confetti', 'animate-love-float', 'animate-celebration'][Math.floor(Math.random() * 3)],
    }));
    setParticles(prev => [...prev, ...newParticles]);

    // Spawn reward message
    const msg: RewardPopup = {
      id: Date.now(),
      message: REWARD_MESSAGES[Math.floor(Math.random() * REWARD_MESSAGES.length)],
      x: 20 + Math.random() * 60,
      y: 30 + Math.random() * 30,
    };
    setRewards(prev => [...prev, msg]);

    // Cleanup after animation
    const timeout = setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      setRewards(prev => prev.filter(r => r.id !== msg.id));
    }, 2500);

    return () => clearTimeout(timeout);
  }, [triggerCount]);

  if (particles.length === 0 && rewards.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Confetti / love particles */}
      {particles.map(p => (
        <div key={p.id} className={`absolute ${p.animation}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}>
          <RewardItem type={p.type} size={p.size} />
        </div>
      ))}

      {/* Reward messages */}
      {rewards.map(r => (
        <div key={r.id} className="absolute animate-reward-popup"
          style={{ left: `${r.x}%`, top: `${r.y}%`, transform: 'translate(-50%, -50%)' }}>
          <div className="bg-pixel-pink/90 text-primary-foreground font-pixel text-[8px] px-3 py-2 rounded-lg pixel-border-sm whitespace-nowrap flex items-center gap-1">
            <PixelHeart size={2} />
            {r.message}
            <PixelSparkle size={2} />
          </div>
        </div>
      ))}
    </div>
  );
}

// Chocolate rain component - constant background effect
export function ChocolateRain({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="absolute animate-choco-rain"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-30px',
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
          }}>
          {i % 3 === 0 ? <PixelChocoHeart size={2} /> :
           i % 3 === 1 ? <PixelChocolate size={2} /> :
           <PixelHeart size={2} />}
        </div>
      ))}
    </div>
  );
}

// Floating rewards bar showing collected items
export function RewardsBar({ hearts, gifts, flowers, stars }: { hearts: number; gifts: number; flowers: number; stars: number }) {
  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 flex gap-3 bg-card/80 backdrop-blur-sm rounded-full px-4 py-1.5 pixel-border-sm">
      <div className="flex items-center gap-1">
        <PixelHeart size={2} />
        <span className="font-pixel text-[6px] text-pixel-pink">{hearts}</span>
      </div>
      <div className="flex items-center gap-1">
        <PixelChocoHeart size={2} />
        <span className="font-pixel text-[6px] text-pixel-peach">{gifts}</span>
      </div>
      <div className="flex items-center gap-1">
        <PixelFlower size={2} />
        <span className="font-pixel text-[6px] text-pixel-lavender">{flowers}</span>
      </div>
      <div className="flex items-center gap-1">
        <PixelStar size={2} />
        <span className="font-pixel text-[6px] text-pixel-gold">{stars}</span>
      </div>
    </div>
  );
}
