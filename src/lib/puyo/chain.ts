import type { Board, ConnectedGroup, ConnectionFlags } from './types';
import { BOARD_ROWS, BOARD_COLS } from './board';

const DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]] as const;

// BFSで同色連結グループをすべて検出（garbage は対象外）
export function findConnectedGroups(board: Board): ConnectedGroup[] {
  const visited = Array.from({ length: BOARD_ROWS }, () =>
    new Array<boolean>(BOARD_COLS).fill(false)
  );
  const groups: ConnectedGroup[] = [];

  for (let row = 0; row < BOARD_ROWS; row++) {
    for (let col = 0; col < BOARD_COLS; col++) {
      const color = board[row][col];
      if (visited[row][col] || color === null || color === 'garbage') {
        visited[row][col] = true;
        continue;
      }

      const cells: Array<{ row: number; col: number }> = [];
      const queue: Array<{ row: number; col: number }> = [{ row, col }];
      visited[row][col] = true;

      while (queue.length > 0) {
        const current = queue.shift()!;
        cells.push(current);
        for (const [dr, dc] of DIRECTIONS) {
          const nr = current.row + dr;
          const nc = current.col + dc;
          if (
            nr >= 0 && nr < BOARD_ROWS &&
            nc >= 0 && nc < BOARD_COLS &&
            !visited[nr][nc] &&
            board[nr][nc] === color
          ) {
            visited[nr][nc] = true;
            queue.push({ row: nr, col: nc });
          }
        }
      }
      groups.push({ color, cells });
    }
  }
  return groups;
}

// 消去対象グループを返す（4つ以上連結のみ）
export function findClearableGroups(board: Board): ConnectedGroup[] {
  return findConnectedGroups(board).filter(g => g.cells.length >= 4);
}

// 消去を適用した新しいボードを返す
export function clearGroups(board: Board, groups: ConnectedGroup[]): Board {
  const newBoard = board.map(row => [...row]);
  for (const group of groups) {
    for (const { row, col } of group.cells) {
      newBoard[row][col] = null;
    }
  }
  return newBoard;
}

// 指定セルの隣接同色フラグを計算（くっつき表現用）
export function getConnectionFlags(
  board: Board,
  row: number,
  col: number
): ConnectionFlags {
  const color = board[row][col];
  if (color === null || color === 'garbage') {
    return { top: false, right: false, bottom: false, left: false };
  }
  return {
    top:    row > 0               && board[row - 1][col] === color,
    right:  col < BOARD_COLS - 1  && board[row][col + 1] === color,
    bottom: row < BOARD_ROWS - 1  && board[row + 1][col] === color,
    left:   col > 0               && board[row][col - 1] === color,
  };
}
