import { useMemo } from 'react';
import type { Board, CurrentPuyo, ClearingCells, Cell } from '@/lib/puyo/types';
import { BOARD_ROWS, BOARD_COLS, VISIBLE_ROWS, getChildPosition } from '@/lib/puyo/board';
import { PuyoCell } from './PuyoCell';

interface PuyoBoardProps {
  board: Board;
  currentPuyo: CurrentPuyo | null;
  clearingCells: ClearingCells;
}

const OFFSET = BOARD_ROWS - VISIBLE_ROWS; // = 2

export function PuyoBoard({ board, currentPuyo, clearingCells }: PuyoBoardProps) {
  // currentPuyo をボードにオーバーレイした表示用配列を生成
  const displayBoard = useMemo((): Cell[][] => {
    const base = board.slice(OFFSET).map(row => [...row]);
    if (!currentPuyo) return base;

    const { axisRow, axisCol, axisColor, childColor, rotation } = currentPuyo;
    const child = getChildPosition(axisRow, axisCol, rotation);

    const clamp = (r: number) => r - OFFSET;

    // 軸ぷよ
    if (axisRow >= OFFSET && axisRow < BOARD_ROWS) {
      base[clamp(axisRow)][axisCol] = axisColor;
    }
    // 子ぷよ
    if (child.row >= OFFSET && child.row < BOARD_ROWS) {
      base[clamp(child.row)][child.col] = childColor;
    }
    return base;
  }, [board, currentPuyo]);

  return (
    <div
      className="puyo-board"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${BOARD_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${VISIBLE_ROWS}, 1fr)`,
      }}
    >
      {displayBoard.map((row, r) =>
        row.map((cell, c) => {
          const boardRow = r + OFFSET;
          const key = `${r}-${c}`;
          return (
            <PuyoCell
              key={key}
              color={cell}
              row={boardRow}
              col={c}
              board={board}
              isClearing={clearingCells.has(`${boardRow},${c}`)}
            />
          );
        })
      )}
    </div>
  );
}
