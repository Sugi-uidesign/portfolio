import type { PuyoColor } from './types';

const PUYO_COLORS: Exclude<PuyoColor, null | 'garbage'>[] = [
  'red', 'blue', 'green', 'yellow', 'purple',
];

export function randomPuyoColor(): Exclude<PuyoColor, null | 'garbage'> {
  return PUYO_COLORS[Math.floor(Math.random() * PUYO_COLORS.length)];
}

// ゲーム開始時に使用するNEXTぷよのペアを生成
export function generateNextPuyos(count: number): Array<[PuyoColor, PuyoColor]> {
  return Array.from({ length: count }, () => [randomPuyoColor(), randomPuyoColor()]);
}
