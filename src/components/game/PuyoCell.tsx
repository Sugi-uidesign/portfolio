import type { CSSProperties } from 'react';
import type { Board, PuyoColor } from '@/lib/puyo/types';
import { getConnectionFlags } from '@/lib/puyo/chain';

interface PuyoCellProps {
  color: PuyoColor;
  row: number;
  col: number;
  board: Board;
  isClearing: boolean;
}

const COLOR_GRADIENT: Record<string, string> = {
  red:     'linear-gradient(135deg, #ff8a80 20%, #e53935 80%)',
  blue:    'linear-gradient(135deg, #82b1ff 20%, #1565c0 80%)',
  green:   'linear-gradient(135deg, #69f0ae 20%, #2e7d32 80%)',
  yellow:  'linear-gradient(135deg, #fff176 20%, #f9a825 80%)',
  purple:  'linear-gradient(135deg, #ce93d8 20%, #6a1b9a 80%)',
  garbage: 'linear-gradient(135deg, #eceff1 20%, #78909c 80%)',
};

// 色ごとの表情 SVG（viewBox="0 0 100 100"）
const FACES: Record<string, React.ReactElement> = {
  // 赤: 強気・元気。眉をしかめ気味に、キリッとした目
  red: (
    <svg viewBox="0 0 100 100" className="puyo-face" aria-hidden>
      {/* 眉毛（内側が下がった怒り眉） */}
      <line x1="22" y1="30" x2="42" y2="37" stroke="#5a0000" strokeWidth="5" strokeLinecap="round"/>
      <line x1="58" y1="37" x2="78" y2="30" stroke="#5a0000" strokeWidth="5" strokeLinecap="round"/>
      {/* 目 */}
      <ellipse cx="35" cy="48" rx="9" ry="10" fill="#3a0000"/>
      <ellipse cx="65" cy="48" rx="9" ry="10" fill="#3a0000"/>
      {/* ハイライト */}
      <ellipse cx="31" cy="44" rx="3.5" ry="3.5" fill="white"/>
      <ellipse cx="61" cy="44" rx="3.5" ry="3.5" fill="white"/>
      {/* 口（小さなニヤリ） */}
      <path d="M 38 66 Q 50 73 62 66" stroke="#5a0000" strokeWidth="4" fill="none" strokeLinecap="round"/>
    </svg>
  ),

  // 青: クール・冷静。細めた目、無表情気味
  blue: (
    <svg viewBox="0 0 100 100" className="puyo-face" aria-hidden>
      {/* 眉毛（フラット） */}
      <line x1="22" y1="34" x2="44" y2="34" stroke="#003060" strokeWidth="4.5" strokeLinecap="round"/>
      <line x1="56" y1="34" x2="78" y2="34" stroke="#003060" strokeWidth="4.5" strokeLinecap="round"/>
      {/* 目（半目：上が直線） */}
      <path d="M 26 45 Q 35 55 44 45" fill="#003060"/>
      <path d="M 56 45 Q 65 55 74 45" fill="#003060"/>
      {/* ハイライト */}
      <ellipse cx="31" cy="47" rx="3" ry="2.5" fill="white"/>
      <ellipse cx="61" cy="47" rx="3" ry="2.5" fill="white"/>
      {/* 口（ほぼ直線、微かな笑み） */}
      <path d="M 38 65 Q 50 68 62 65" stroke="#003060" strokeWidth="4" fill="none" strokeLinecap="round"/>
    </svg>
  ),

  // 緑: 明るい・ハッピー。大きな目、満面の笑み
  green: (
    <svg viewBox="0 0 100 100" className="puyo-face" aria-hidden>
      {/* 眉毛（アーチ型） */}
      <path d="M 22 32 Q 35 24 44 32" stroke="#004020" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M 56 32 Q 65 24 78 32" stroke="#004020" strokeWidth="5" fill="none" strokeLinecap="round"/>
      {/* 目（大きな丸） */}
      <ellipse cx="35" cy="47" rx="10" ry="11" fill="#004020"/>
      <ellipse cx="65" cy="47" rx="10" ry="11" fill="#004020"/>
      {/* ハイライト */}
      <ellipse cx="30" cy="43" rx="4" ry="4" fill="white"/>
      <ellipse cx="60" cy="43" rx="4" ry="4" fill="white"/>
      {/* 口（大きな笑顔） */}
      <path d="M 34 64 Q 50 78 66 64" stroke="#004020" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),

  // 黄: 驚き・陽気。目を丸くして眉を上げた表情
  yellow: (
    <svg viewBox="0 0 100 100" className="puyo-face" aria-hidden>
      {/* 眉毛（高く上げた） */}
      <path d="M 22 27 Q 33 20 44 27" stroke="#5a3a00" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M 56 27 Q 67 20 78 27" stroke="#5a3a00" strokeWidth="5" fill="none" strokeLinecap="round"/>
      {/* 目（丸く大きい） */}
      <ellipse cx="35" cy="48" rx="10" ry="11" fill="#5a3a00"/>
      <ellipse cx="65" cy="48" rx="10" ry="11" fill="#5a3a00"/>
      {/* ハイライト（大きめ） */}
      <ellipse cx="30" cy="43" rx="4.5" ry="4.5" fill="white"/>
      <ellipse cx="60" cy="43" rx="4.5" ry="4.5" fill="white"/>
      {/* 口（驚いたO口） */}
      <ellipse cx="50" cy="68" rx="7" ry="6" fill="#5a3a00"/>
    </svg>
  ),

  // 紫: ミステリアス・眠そう。とろんとした目
  purple: (
    <svg viewBox="0 0 100 100" className="puyo-face" aria-hidden>
      {/* 眉毛（外側が下がった） */}
      <path d="M 22 33 Q 33 30 44 35" stroke="#2a005a" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M 56 35 Q 67 30 78 33" stroke="#2a005a" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      {/* 目（上まぶたが重い半目） */}
      <ellipse cx="35" cy="49" rx="9" ry="10" fill="#2a005a"/>
      <ellipse cx="65" cy="49" rx="9" ry="10" fill="#2a005a"/>
      {/* まぶた（上半分を覆う） */}
      <rect x="26" y="40" width="18" height="9" rx="2" fill="#9b59b6"/>
      <rect x="56" y="40" width="18" height="9" rx="2" fill="#9b59b6"/>
      {/* ハイライト */}
      <ellipse cx="31" cy="50" rx="3" ry="2.5" fill="white"/>
      <ellipse cx="61" cy="50" rx="3" ry="2.5" fill="white"/>
      {/* 口（ちょっと不敵な笑み） */}
      <path d="M 38 66 Q 50 72 62 66" stroke="#2a005a" strokeWidth="4" fill="none" strokeLinecap="round"/>
    </svg>
  ),

  // おじゃまぷよ: × 目
  garbage: (
    <svg viewBox="0 0 100 100" className="puyo-face" aria-hidden>
      <line x1="27" y1="40" x2="41" y2="54" stroke="#333" strokeWidth="5" strokeLinecap="round"/>
      <line x1="41" y1="40" x2="27" y2="54" stroke="#333" strokeWidth="5" strokeLinecap="round"/>
      <line x1="59" y1="40" x2="73" y2="54" stroke="#333" strokeWidth="5" strokeLinecap="round"/>
      <line x1="73" y1="40" x2="59" y2="54" stroke="#333" strokeWidth="5" strokeLinecap="round"/>
      <line x1="38" y1="66" x2="62" y2="66" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  ),
};

export function PuyoCell({ color, row, col, board, isClearing }: PuyoCellProps) {
  if (color === null) {
    return <div className="puyo-empty" />;
  }

  const flags = getConnectionFlags(board, row, col);
  const gradient = COLOR_GRADIENT[color] ?? 'transparent';
  const face = FACES[color];

  return (
    <div
      className="puyo-cell"
      data-color={color}
      data-top={flags.top ? '1' : '0'}
      data-right={flags.right ? '1' : '0'}
      data-bottom={flags.bottom ? '1' : '0'}
      data-left={flags.left ? '1' : '0'}
      data-clearing={isClearing ? '1' : '0'}
      style={{ '--puyo-gradient': gradient } as CSSProperties}
    >
      {face}
    </div>
  );
}
