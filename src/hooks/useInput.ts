'use client';

import { useEffect, useRef } from 'react';
import type { GamePhase } from '@/lib/puyo/types';
import type { GameAction } from './useGameState';

const SWIPE_THRESHOLD = 30;

export function useInput(
  dispatch: React.Dispatch<GameAction>,
  phase: GamePhase
): {
  touchHandlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
  };
} {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const boardWidthRef = useRef<number>(0);
  const boardLeftRef = useRef<number>(0);

  useEffect(() => {
    if (phase !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          dispatch({ type: 'MOVE_LEFT' });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          dispatch({ type: 'MOVE_RIGHT' });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          dispatch({ type: 'MOVE_DOWN' });
          break;
        case ' ':
          e.preventDefault();
          dispatch({ type: 'HARD_DROP' });
          break;
        case 'z':
        case 'Z':
        case 'q':
        case 'Q':
          dispatch({ type: 'ROTATE_LEFT' });
          break;
        case 'x':
        case 'X':
        case 'e':
        case 'E':
          dispatch({ type: 'ROTATE_RIGHT' });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, dispatch]);

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    // ボードの幅と左端を記録（タップ位置で回転方向を決める）
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    boardWidthRef.current = rect.width;
    boardLeftRef.current = rect.left;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || phase !== 'playing') return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      // 横スワイプ
      if (dx < -SWIPE_THRESHOLD) {
        dispatch({ type: 'MOVE_LEFT' });
      } else if (dx > SWIPE_THRESHOLD) {
        dispatch({ type: 'MOVE_RIGHT' });
      } else {
        // タップ: ボードの左半分で左回転、右半分で右回転
        const tapX = touch.clientX;
        const center = boardLeftRef.current + boardWidthRef.current / 2;
        if (tapX < center) {
          dispatch({ type: 'ROTATE_LEFT' });
        } else {
          dispatch({ type: 'ROTATE_RIGHT' });
        }
      }
    } else {
      // 縦スワイプ
      if (dy > SWIPE_THRESHOLD) {
        dispatch({ type: 'MOVE_DOWN' });
      } else if (dy < -SWIPE_THRESHOLD * 2) {
        dispatch({ type: 'HARD_DROP' });
      }
    }
    touchStartRef.current = null;
  };

  return { touchHandlers: { onTouchStart, onTouchEnd } };
}
