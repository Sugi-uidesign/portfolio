import type { GamePhase } from '@/lib/puyo/types';

interface ChainEffectProps {
  chainCount: number;
  phase: GamePhase;
}

const CHAIN_LABELS = ['', '', '2連鎖!', '3連鎖!!', '4連鎖!!!', '5連鎖!!!!'];

export function ChainEffect({ chainCount, phase }: ChainEffectProps) {
  if (phase !== 'clearing' || chainCount < 2) return null;

  const label = chainCount < CHAIN_LABELS.length
    ? CHAIN_LABELS[chainCount]
    : `${chainCount}連鎖!!!!!`;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <div
        key={chainCount}
        className="chain-effect"
        style={{
          fontSize: `${Math.min(2 + chainCount * 0.3, 4)}rem`,
          fontWeight: 900,
          letterSpacing: '-0.02em',
          textShadow: '0 2px 12px rgba(0,0,0,0.5)',
          background: 'linear-gradient(135deg, #ffd700, #ff6b35)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {label}
      </div>
    </div>
  );
}
