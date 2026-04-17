'use client';

import { useEffect, useRef } from 'react';
import type { GameState } from '@/lib/puyo/types';
import type { GameAction } from './useGameState';
import { findClearableGroups } from '@/lib/puyo/chain';
import { getFallInterval } from '@/lib/puyo/score';
import { randomPuyoColor } from '@/lib/puyo/utils';

export function useGameLoop(
  state: GameState,
  dispatch: React.Dispatch<GameAction>
): void {
  // stale closure 対策: state の最新値を ref で保持
  const stateRef = useRef(state);
  stateRef.current = state;

  // 通常落下タイマー（phase='playing' のみ）
  useEffect(() => {
    if (state.phase !== 'playing') return;
    const interval = getFallInterval(state.level);
    const id = setInterval(() => dispatch({ type: 'TICK' }), interval);
    return () => clearInterval(id);
  }, [state.phase, state.level, dispatch]);

  // 接地確定 → 即座に SETTLE
  useEffect(() => {
    if (state.phase !== 'settling') return;
    dispatch({ type: 'SETTLE' });
  }, [state.phase, dispatch]);

  // 消去判定 → 即座に CHECK_CHAINS
  useEffect(() => {
    if (state.phase !== 'checking') return;
    dispatch({ type: 'CHECK_CHAINS' });
  }, [state.phase, dispatch]);

  // 消去アニメーション待機 → 300ms後に CLEAR_PUYOS
  useEffect(() => {
    if (state.phase !== 'clearing') return;
    const id = setTimeout(() => {
      const currentState = stateRef.current;
      const groups = findClearableGroups(currentState.board);
      if (groups.length > 0) {
        dispatch({ type: 'CLEAR_PUYOS', groups });
      }
    }, 300);
    return () => clearTimeout(id);
  }, [state.phase, dispatch]);

  // 重力落下アニメーション待機 → 200ms後に APPLY_GRAVITY
  useEffect(() => {
    if (state.phase !== 'dropping') return;
    const id = setTimeout(() => {
      dispatch({ type: 'APPLY_GRAVITY' });
    }, 200);
    return () => clearTimeout(id);
  }, [state.phase, dispatch]);

  // 次のツモ出現（currentPuyo が null で playing のとき）
  useEffect(() => {
    if (state.phase !== 'playing' || state.currentPuyo !== null) return;
    dispatch({
      type: 'SPAWN_NEXT',
      newPair: [randomPuyoColor(), randomPuyoColor()],
    });
  }, [state.phase, state.currentPuyo, dispatch]);
}
