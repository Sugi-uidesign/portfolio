import type { GamePhase } from '@/lib/puyo/types';

interface GameOverlayProps {
  phase: GamePhase;
  score: number;
  highScore: number;
  onStart: () => void;
}

export function GameOverlay({ phase, score, highScore, onStart }: GameOverlayProps) {
  if (phase !== 'idle' && phase !== 'gameover') return null;

  return (
    <div className="game-overlay">
      {phase === 'idle' ? (
        <div className="overlay-content">
          <h1 className="overlay-title">ぷよぷよ</h1>
          <p className="text-zinc-400 text-sm mb-6">落ちものパズルゲーム</p>
          <button className="start-button" onClick={onStart}>
            ゲームスタート
          </button>
          <div className="mt-8 text-left">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">操作方法</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-zinc-300">
              <span>← / A</span><span>左移動</span>
              <span>→ / D</span><span>右移動</span>
              <span>↓ / S</span><span>高速落下</span>
              <span>Space</span><span>即時落下</span>
              <span>Z / Q</span><span>左回転</span>
              <span>X / E</span><span>右回転</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="overlay-content">
          <h2 className="overlay-title text-red-400">GAME OVER</h2>
          <div className="mb-6 space-y-2 text-center">
            <p className="text-2xl font-bold text-white font-mono">{score.toLocaleString()}</p>
            <p className="text-sm text-zinc-400">
              ベスト: <span className="text-yellow-400 font-mono">{highScore.toLocaleString()}</span>
            </p>
          </div>
          <button className="start-button" onClick={onStart}>
            もう一度
          </button>
        </div>
      )}
    </div>
  );
}
