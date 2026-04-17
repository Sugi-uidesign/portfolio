'use client';

import { useReducer, useEffect } from 'react';
import type { GameState, GameAction, CurrentPuyo, PuyoColor } from '@/lib/puyo/types';
// GameAction is defined in types.ts and re-exported here for consumers
export type { GameAction };
import { createEmptyBoard, moveLeft, moveRight, moveDown, rotateLeft, rotateRight, placePuyo, applyGravity, isGameOver, SPAWN_ROW, SPAWN_COL } from '@/lib/puyo/board';
import { findClearableGroups, clearGroups } from '@/lib/puyo/chain';
import { calculateScore, calculateLevel } from '@/lib/puyo/score';

function createInitialState(): GameState {
  return {
    board: createEmptyBoard(),
    currentPuyo: null,
    nextPuyos: [],
    phase: 'idle',
    score: 0,
    level: 1,
    chainCount: 0,
    clearingCells: new Set(),
    highScore: 0,
  };
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      return {
        ...createInitialState(),
        nextPuyos: action.nextPuyos,
        highScore: state.highScore,
        phase: 'playing',
        currentPuyo: null,
      };
    }

    case 'TICK': {
      if (state.phase !== 'playing' || !state.currentPuyo) return state;
      const next = moveDown(state.board, state.currentPuyo);
      if (next === null) {
        return { ...state, phase: 'settling' };
      }
      return { ...state, currentPuyo: next };
    }

    case 'SETTLE': {
      if (state.phase !== 'settling' || !state.currentPuyo) return state;
      const newBoard = placePuyo(state.board, state.currentPuyo);
      // 接地後は必ず重力を適用してから連鎖チェック（横向き設置で片側が浮くのを防ぐ）
      return { ...state, board: newBoard, currentPuyo: null, phase: 'dropping', chainCount: 0 };
    }

    case 'CHECK_CHAINS': {
      if (state.phase !== 'checking') return state;
      const clearable = findClearableGroups(state.board);
      if (clearable.length > 0) {
        const clearingCells = new Set<string>(
          clearable.flatMap(g => g.cells.map(c => `${c.row},${c.col}`))
        );
        return { ...state, phase: 'clearing', clearingCells };
      }
      // 消去なし: 次のツモ出現 or ゲームオーバー
      if (isGameOver(state.board)) {
        return { ...state, phase: 'gameover' };
      }
      return { ...state, phase: 'playing', chainCount: 0 };
    }

    case 'CLEAR_PUYOS': {
      if (state.phase !== 'clearing') return state;
      const { groups } = action;
      const newBoard = clearGroups(state.board, groups);
      const newChainCount = state.chainCount + 1;
      const colorCount = new Set(groups.map(g => g.color)).size;
      const maxGroupSize = Math.max(...groups.map(g => g.cells.length));
      const clearedCount = groups.reduce((sum, g) => sum + g.cells.length, 0);
      const gained = calculateScore({
        clearedCount,
        chainCount: newChainCount,
        colorCount,
        maxGroupSize,
      });
      const newScore = state.score + gained;
      const newLevel = calculateLevel(newScore);
      const newHighScore = Math.max(state.highScore, newScore);
      return {
        ...state,
        board: newBoard,
        score: newScore,
        level: newLevel,
        highScore: newHighScore,
        chainCount: newChainCount,
        clearingCells: new Set(),
        phase: 'dropping',
      };
    }

    case 'APPLY_GRAVITY': {
      if (state.phase !== 'dropping') return state;
      const newBoard = applyGravity(state.board);
      return { ...state, board: newBoard, phase: 'checking' };
    }

    case 'SPAWN_NEXT': {
      if (state.phase !== 'playing' || state.currentPuyo !== null) return state;
      const [axisColor, childColor] = state.nextPuyos[0];
      const newCurrent: CurrentPuyo = {
        axisRow: SPAWN_ROW,
        axisCol: SPAWN_COL,
        axisColor,
        childColor,
        rotation: 0,
      };
      const remaining = state.nextPuyos.slice(1);
      const newNextPuyos = [...remaining, action.newPair];
      return { ...state, currentPuyo: newCurrent, nextPuyos: newNextPuyos };
    }

    case 'MOVE_LEFT': {
      if (state.phase !== 'playing' || !state.currentPuyo) return state;
      return { ...state, currentPuyo: moveLeft(state.board, state.currentPuyo) };
    }

    case 'MOVE_RIGHT': {
      if (state.phase !== 'playing' || !state.currentPuyo) return state;
      return { ...state, currentPuyo: moveRight(state.board, state.currentPuyo) };
    }

    case 'MOVE_DOWN': {
      if (state.phase !== 'playing' || !state.currentPuyo) return state;
      const next = moveDown(state.board, state.currentPuyo);
      if (next === null) return { ...state, phase: 'settling' };
      return { ...state, currentPuyo: next };
    }

    case 'HARD_DROP': {
      if (state.phase !== 'playing' || !state.currentPuyo) return state;
      let p = state.currentPuyo;
      for (;;) {
        const next = moveDown(state.board, p);
        if (next === null) break;
        p = next;
      }
      return { ...state, currentPuyo: p, phase: 'settling' };
    }

    case 'ROTATE_LEFT': {
      if (state.phase !== 'playing' || !state.currentPuyo) return state;
      return { ...state, currentPuyo: rotateLeft(state.board, state.currentPuyo) };
    }

    case 'ROTATE_RIGHT': {
      if (state.phase !== 'playing' || !state.currentPuyo) return state;
      return { ...state, currentPuyo: rotateRight(state.board, state.currentPuyo) };
    }

    case 'GAME_OVER': {
      return { ...state, phase: 'gameover' };
    }

    case 'LOAD_HIGHSCORE': {
      return { ...state, highScore: Math.max(state.highScore, action.highScore) };
    }

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState);

  // ハイスコアをlocalStorageから読み込む
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('puyo-highscore');
    if (saved) {
      const hs = parseInt(saved, 10);
      if (!isNaN(hs) && hs > 0) {
        dispatch({ type: 'LOAD_HIGHSCORE', highScore: hs });
      }
    }
  }, []);

  // ハイスコアをlocalStorageに保存
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (state.highScore > 0) {
      localStorage.setItem('puyo-highscore', String(state.highScore));
    }
  }, [state.highScore]);

  return { state, dispatch };
}
