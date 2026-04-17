'use client';

import { useGameState } from '@/hooks/useGameState';
import { useGameLoop } from '@/hooks/useGameLoop';
import { useInput } from '@/hooks/useInput';
import { PuyoBoard } from '@/components/game/PuyoBoard';
import { NextPuyo } from '@/components/game/NextPuyo';
import { ScorePanel } from '@/components/game/ScorePanel';
import { ChainEffect } from '@/components/game/ChainEffect';
import { GameOverlay } from '@/components/game/GameOverlay';
import { generateNextPuyos } from '@/lib/puyo/utils';

export default function Home() {
  const { state, dispatch } = useGameState();
  useGameLoop(state, dispatch);
  const { touchHandlers } = useInput(dispatch, state.phase);

  const handleStart = () => {
    dispatch({
      type: 'START_GAME',
      nextPuyos: generateNextPuyos(3),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h1 className="text-2xl font-black tracking-tight mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent select-none">
        PUYO PUYO
      </h1>

      <div
        className="flex gap-4 items-start"
        {...touchHandlers}
      >
        {/* ゲームボード（左） */}
        <div className="relative">
          <PuyoBoard
            board={state.board}
            currentPuyo={state.currentPuyo}
            clearingCells={state.clearingCells}
          />
          <ChainEffect chainCount={state.chainCount} phase={state.phase} />
          <GameOverlay
            phase={state.phase}
            score={state.score}
            highScore={state.highScore}
            onStart={handleStart}
          />
        </div>

        {/* 右パネル */}
        <div className="flex flex-col gap-4">
          <ScorePanel
            score={state.score}
            highScore={state.highScore}
            level={state.level}
            chainCount={state.chainCount}
          />
          <NextPuyo nextPuyos={state.nextPuyos} />
        </div>
      </div>
    </div>
  );
}
