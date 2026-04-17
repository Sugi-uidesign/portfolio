interface ScorePanelProps {
  score: number;
  highScore: number;
  level: number;
  chainCount: number;
}

const CONTROLS = [
  { key: '← / A',  desc: '左移動' },
  { key: '→ / D',  desc: '右移動' },
  { key: '↓ / S',  desc: '高速落下' },
  { key: 'Space',  desc: '即落下' },
  { key: 'Z / Q',  desc: '左回転' },
  { key: 'X / E',  desc: '右回転' },
];

export function ScorePanel({ score, highScore, level, chainCount }: ScorePanelProps) {
  return (
    <div className="flex flex-col gap-3 min-w-[100px]">
      <div className="score-card">
        <p className="score-label">SCORE</p>
        <p className="score-value">{score.toLocaleString()}</p>
      </div>
      <div className="score-card">
        <p className="score-label">BEST</p>
        <p className="score-value text-yellow-500 dark:text-yellow-400">{highScore.toLocaleString()}</p>
      </div>
      <div className="score-card">
        <p className="score-label">LEVEL</p>
        <p className="score-value">{level}</p>
      </div>
      {chainCount > 1 && (
        <div className="score-card bg-orange-100 dark:bg-orange-900/40 border border-orange-300 dark:border-orange-700">
          <p className="score-label text-orange-600 dark:text-orange-400">CHAIN</p>
          <p className="score-value text-orange-600 dark:text-orange-400">{chainCount}×</p>
        </div>
      )}

      {/* 操作一覧 */}
      <div className="score-card mt-1">
        <p className="score-label mb-2">操作方法</p>
        <div className="flex flex-col gap-1">
          {CONTROLS.map(({ key, desc }) => (
            <div key={key} className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono font-semibold bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded px-1 py-0.5 whitespace-nowrap leading-tight">
                {key}
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                {desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
