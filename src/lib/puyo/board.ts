import type { Board, CurrentPuyo, Rotation } from './types';

export const BOARD_COLS = 6;
export const BOARD_ROWS = 14;    // 内部行数（死亡判定2行含む）
export const VISIBLE_ROWS = 12;  // 表示行数
export const SPAWN_ROW = 1;      // 軸ぷよ出現行（死亡判定ゾーン内）
export const SPAWN_COL = 2;      // 軸ぷよ出現列

export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_ROWS }, () =>
    new Array<null>(BOARD_COLS).fill(null)
  );
}

export function getChildPosition(
  axisRow: number,
  axisCol: number,
  rotation: Rotation
): { row: number; col: number } {
  switch (rotation) {
    case 0: return { row: axisRow - 1, col: axisCol };
    case 1: return { row: axisRow,     col: axisCol + 1 };
    case 2: return { row: axisRow + 1, col: axisCol };
    case 3: return { row: axisRow,     col: axisCol - 1 };
  }
}

export function isValidPosition(
  board: Board,
  axisRow: number,
  axisCol: number,
  rotation: Rotation
): boolean {
  // 軸ぷよの範囲チェック
  if (axisCol < 0 || axisCol >= BOARD_COLS) return false;
  if (axisRow >= BOARD_ROWS) return false;
  if (axisRow >= 0 && board[axisRow][axisCol] !== null) return false;

  // 子ぷよの範囲チェック
  const child = getChildPosition(axisRow, axisCol, rotation);
  if (child.col < 0 || child.col >= BOARD_COLS) return false;
  if (child.row >= BOARD_ROWS) return false;
  if (child.row >= 0 && board[child.row][child.col] !== null) return false;

  return true;
}

export function moveLeft(board: Board, current: CurrentPuyo): CurrentPuyo {
  const { axisRow, axisCol, rotation } = current;
  if (isValidPosition(board, axisRow, axisCol - 1, rotation)) {
    return { ...current, axisCol: axisCol - 1 };
  }
  return current;
}

export function moveRight(board: Board, current: CurrentPuyo): CurrentPuyo {
  const { axisRow, axisCol, rotation } = current;
  if (isValidPosition(board, axisRow, axisCol + 1, rotation)) {
    return { ...current, axisCol: axisCol + 1 };
  }
  return current;
}

// 1マス下へ移動。接地（移動不可）なら null を返す
export function moveDown(board: Board, current: CurrentPuyo): CurrentPuyo | null {
  const { axisRow, axisCol, rotation } = current;
  if (isValidPosition(board, axisRow + 1, axisCol, rotation)) {
    return { ...current, axisRow: axisRow + 1 };
  }
  return null;
}

// 右回転（rotation を +1 mod 4）、壁蹴り込み
export function rotateRight(board: Board, current: CurrentPuyo): CurrentPuyo {
  const { axisRow, axisCol } = current;
  const newRotation = ((current.rotation + 1) % 4) as Rotation;

  // 通常試行
  if (isValidPosition(board, axisRow, axisCol, newRotation)) {
    return { ...current, rotation: newRotation };
  }
  // 壁蹴り: 左1マス
  if (isValidPosition(board, axisRow, axisCol - 1, newRotation)) {
    return { ...current, axisCol: axisCol - 1, rotation: newRotation };
  }
  // 壁蹴り: 右1マス
  if (isValidPosition(board, axisRow, axisCol + 1, newRotation)) {
    return { ...current, axisCol: axisCol + 1, rotation: newRotation };
  }
  // 回転不可
  return current;
}

// 左回転（rotation を -1 mod 4）、壁蹴り込み
export function rotateLeft(board: Board, current: CurrentPuyo): CurrentPuyo {
  const { axisRow, axisCol } = current;
  const newRotation = ((current.rotation + 3) % 4) as Rotation;

  if (isValidPosition(board, axisRow, axisCol, newRotation)) {
    return { ...current, rotation: newRotation };
  }
  if (isValidPosition(board, axisRow, axisCol - 1, newRotation)) {
    return { ...current, axisCol: axisCol - 1, rotation: newRotation };
  }
  if (isValidPosition(board, axisRow, axisCol + 1, newRotation)) {
    return { ...current, axisCol: axisCol + 1, rotation: newRotation };
  }
  return current;
}

// ツモをボードに固定（イミュータブル）
export function placePuyo(board: Board, current: CurrentPuyo): Board {
  const newBoard = board.map(row => [...row]);
  const { axisRow, axisCol, axisColor, childColor, rotation } = current;
  const child = getChildPosition(axisRow, axisCol, rotation);

  if (axisRow >= 0 && axisRow < BOARD_ROWS) {
    newBoard[axisRow][axisCol] = axisColor;
  }
  if (child.row >= 0 && child.row < BOARD_ROWS) {
    newBoard[child.row][child.col] = childColor;
  }
  return newBoard;
}

// 重力落下: 空きセルを埋めるよう上のぷよを下へ詰める
export function applyGravity(board: Board): Board {
  const newBoard = createEmptyBoard();
  for (let col = 0; col < BOARD_COLS; col++) {
    let writeRow = BOARD_ROWS - 1;
    for (let row = BOARD_ROWS - 1; row >= 0; row--) {
      if (board[row][col] !== null) {
        newBoard[writeRow][col] = board[row][col];
        writeRow--;
      }
    }
  }
  return newBoard;
}

// 出現位置（行0-1、列2-3）がふさがれていたらゲームオーバー
export function isGameOver(board: Board): boolean {
  return board[SPAWN_ROW][SPAWN_COL] !== null || board[SPAWN_ROW][SPAWN_COL + 1] !== null;
}
