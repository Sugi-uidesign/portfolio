import type { ScoreData } from './types';

// 連鎖ボーナス（インデックス = 連鎖数 - 1）
const CHAIN_BONUS = [0, 8, 16, 32, 64, 96, 128, 160, 192, 224, 256, 288];

// 色ボーナス
const COLOR_BONUS: Record<number, number> = { 1: 0, 2: 3, 3: 6, 4: 12, 5: 24 };

function getConnectionBonus(size: number): number {
  if (size <= 4) return 0;
  if (size >= 10) return 10;
  return size - 3; // 5=2, 6=3, 7=4, 8=5, 9=6
}

export function calculateScore(data: ScoreData): number {
  const { clearedCount, chainCount, colorCount, maxGroupSize } = data;
  if (clearedCount === 0) return 0;

  const chainBonus = CHAIN_BONUS[Math.min(chainCount - 1, CHAIN_BONUS.length - 1)] ?? 288;
  const colorBonus = COLOR_BONUS[Math.min(colorCount, 5)] ?? 24;
  const connBonus = getConnectionBonus(maxGroupSize);

  const bonus = chainBonus + colorBonus + connBonus;
  return clearedCount * 10 * Math.max(bonus, 1);
}

export function calculateLevel(score: number): number {
  return Math.min(10, Math.floor(score / 1000) + 1);
}

export function getFallInterval(level: number): number {
  return Math.max(100, 800 - (level - 1) * 70);
}
