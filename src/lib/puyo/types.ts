export type PuyoColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'garbage' | null;

export type Cell = PuyoColor;

// [14行][6列] — 上2行は死亡判定ゾーン（非表示）
export type Board = Cell[][];

// 0=子が上, 1=子が右, 2=子が下, 3=子が左
export type Rotation = 0 | 1 | 2 | 3;

export interface CurrentPuyo {
  axisRow: number;
  axisCol: number;
  axisColor: PuyoColor;
  childColor: PuyoColor;
  rotation: Rotation;
}

export type GamePhase =
  | 'idle'
  | 'playing'
  | 'settling'
  | 'checking'
  | 'clearing'
  | 'dropping'
  | 'gameover';

export interface ConnectedGroup {
  color: PuyoColor;
  cells: Array<{ row: number; col: number }>;
}

// "row,col" 形式のキーで消去中セルを管理
export type ClearingCells = Set<string>;

export interface GameState {
  board: Board;
  currentPuyo: CurrentPuyo | null;
  nextPuyos: Array<[PuyoColor, PuyoColor]>;
  phase: GamePhase;
  score: number;
  level: number;
  chainCount: number;
  clearingCells: ClearingCells;
  highScore: number;
}

export interface ConnectionFlags {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

export interface ScoreData {
  clearedCount: number;
  chainCount: number;
  colorCount: number;
  maxGroupSize: number;
}

export type GameAction =
  | { type: 'START_GAME'; nextPuyos: Array<[PuyoColor, PuyoColor]> }
  | { type: 'MOVE_LEFT' }
  | { type: 'MOVE_RIGHT' }
  | { type: 'MOVE_DOWN' }
  | { type: 'HARD_DROP' }
  | { type: 'ROTATE_LEFT' }
  | { type: 'ROTATE_RIGHT' }
  | { type: 'TICK' }
  | { type: 'SETTLE' }
  | { type: 'CHECK_CHAINS' }
  | { type: 'CLEAR_PUYOS'; groups: ConnectedGroup[] }
  | { type: 'APPLY_GRAVITY' }
  | { type: 'SPAWN_NEXT'; newPair: [PuyoColor, PuyoColor] }
  | { type: 'GAME_OVER' }
  | { type: 'LOAD_HIGHSCORE'; highScore: number };
