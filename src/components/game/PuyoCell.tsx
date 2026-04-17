import type { CSSProperties } from 'react';
import type { Board, PuyoColor } from '@/lib/puyo/types';
import { getConnectionFlags } from '@/lib/puyo/chain';

interface PuyoCellProps {
  color: PuyoColor;
  row: number;
  col: number;
  board: Board;
  isClearing: boolean;
}

const COLOR_GRADIENT: Record<string, string> = {
  red:     'linear-gradient(135deg, #ff8a80 20%, #e53935 80%)',
  blue:    'linear-gradient(135deg, #82b1ff 20%, #1565c0 80%)',
  green:   'linear-gradient(135deg, #69f0ae 20%, #2e7d32 80%)',
  yellow:  'linear-gradient(135deg, #fff176 20%, #f9a825 80%)',
  purple:  'linear-gradient(135deg, #ce93d8 20%, #6a1b9a 80%)',
  garbage: 'linear-gradient(135deg, #eceff1 20%, #78909c 80%)',
};

export function PuyoCell({ color, row, col, board, isClearing }: PuyoCellProps) {
  if (color === null) {
    return <div className="puyo-empty" />;
  }

  const flags = getConnectionFlags(board, row, col);
  const gradient = COLOR_GRADIENT[color] ?? 'transparent';

  return (
    <div
      className="puyo-cell"
      data-color={color}
      data-top={flags.top ? '1' : '0'}
      data-right={flags.right ? '1' : '0'}
      data-bottom={flags.bottom ? '1' : '0'}
      data-left={flags.left ? '1' : '0'}
      data-clearing={isClearing ? '1' : '0'}
      style={{ '--puyo-gradient': gradient } as CSSProperties}
    />
  );
}
