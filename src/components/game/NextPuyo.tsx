import type { CSSProperties } from 'react';
import type { PuyoColor } from '@/lib/puyo/types';

interface NextPuyoProps {
  nextPuyos: Array<[PuyoColor, PuyoColor]>;
}

const COLOR_GRADIENT: Record<string, string> = {
  red:     'linear-gradient(135deg, #ff8a80 20%, #e53935 80%)',
  blue:    'linear-gradient(135deg, #82b1ff 20%, #1565c0 80%)',
  green:   'linear-gradient(135deg, #69f0ae 20%, #2e7d32 80%)',
  yellow:  'linear-gradient(135deg, #fff176 20%, #f9a825 80%)',
  purple:  'linear-gradient(135deg, #ce93d8 20%, #6a1b9a 80%)',
  garbage: 'linear-gradient(135deg, #eceff1 20%, #78909c 80%)',
};

function MiniPuyo({ color, size = 28 }: { color: PuyoColor; size?: number }) {
  if (!color) return <div style={{ width: size, height: size }} />;
  const gradient = COLOR_GRADIENT[color] ?? 'transparent';
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: gradient,
        boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.4)',
        '--puyo-gradient': gradient,
      } as CSSProperties}
    />
  );
}

export function NextPuyo({ nextPuyos }: NextPuyoProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">NEXT</p>
      {nextPuyos.slice(0, 2).map(([axisColor, childColor], i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl p-2"
          style={{ opacity: i === 0 ? 1 : 0.6, transform: i === 0 ? 'scale(1)' : 'scale(0.8)', transformOrigin: 'top center' }}
        >
          {/* 子ぷよが上 */}
          <MiniPuyo color={childColor} size={i === 0 ? 28 : 22} />
          {/* 軸ぷよが下 */}
          <MiniPuyo color={axisColor} size={i === 0 ? 28 : 22} />
        </div>
      ))}
    </div>
  );
}
