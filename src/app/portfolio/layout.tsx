import { Noto_Serif_JP } from "next/font/google";

const notoSerifJP = Noto_Serif_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={notoSerifJP.variable}
      style={{ fontFamily: 'var(--font-noto-serif-jp), "Hiragino Mincho ProN", "Yu Mincho", serif' }}
    >
      {children}
    </div>
  );
}
