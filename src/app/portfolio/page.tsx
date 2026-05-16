import Image from "next/image";

const works = [
  {
    id: 1,
    title: "Claude AI",
    description: "Anthropic Claude を活用したタスク管理 & ワークフロー自動化",
    tags: ["Claude", "AI Agent", "Automation"],
    image: "/image/claude.jpg",
  },
  {
    id: 2,
    title: "Google Gemini",
    description: "Gemini Pro を用いたマルチモーダル AI アプリケーション",
    tags: ["Gemini", "Multimodal", "Google AI"],
    image: "/image/gemini.jpg",
  },
  {
    id: 3,
    title: "Puyo Puyo Game",
    description: "Next.js + TypeScript で構築した AI 支援ゲーム開発の成果物",
    tags: ["Next.js", "TypeScript", "Game"],
    image: "/image/puyopuyo.jpg",
  },
  {
    id: 4,
    title: "Claude Code Dev",
    description: "VS Code × Claude Code による AI ペアプログラミング開発環境",
    tags: ["Claude Code", "VS Code", "DX"],
    image: "/image/Antigravity.jpg",
  },
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white text-[#333333]">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white z-50 border-b border-[#eeeeee]">
        <div className="max-w-[1200px] mx-auto px-10 h-16 flex items-center justify-between">
          <span className="text-sm tracking-[0.05em] text-[#333333]">Portfolio</span>
          <div className="flex gap-8">
            <a
              href="#works"
              className="text-sm text-[#888888] hover:text-[#e8a4b8] transition-colors duration-300"
            >
              Works
            </a>
            <a
              href="#contact"
              className="text-sm text-[#888888] hover:text-[#e8a4b8] transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-20 text-center px-6">
        <div
          className="w-12 h-[3px] rounded-full mx-auto mb-10"
          style={{ background: "#e8a4b8" }}
        />
        <h1
          className="text-[32px] font-normal leading-[1.8] text-[#333333] mb-5"
          style={{ letterSpacing: "0.15em" }}
        >
          AI Development Portfolio
        </h1>
        <p className="text-[#888888] text-base leading-[1.8] max-w-sm mx-auto">
          Claude・Gemini などの最新 AI を活用して構築した
          プロダクトと開発ワークフローの実績集
        </p>
      </section>

      {/* Works Grid */}
      <section id="works" className="pb-24 px-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-2 sm:grid-cols-1">
          {works.map((work) => (
            <article
              key={work.id}
              className="group bg-[#fafafa] border border-[#eeeeee] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
            >
              {/* Image */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2
                  className="text-lg font-bold leading-[1.5] text-[#333333] mb-2"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {work.title}
                </h2>
                <p className="text-sm text-[#888888] leading-[1.8] mb-5">
                  {work.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold px-4 py-1.5 rounded-full"
                      style={{ background: "#fff0f3", color: "#e8a4b8" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-20 text-center px-6 bg-[#faf9f5]"
      >
        <div
          className="w-10 h-[3px] rounded-full mx-auto mb-8"
          style={{ background: "#e8a4b8" }}
        />
        <h2
          className="text-2xl font-bold text-[#333333] mb-4"
          style={{ letterSpacing: "0.05em" }}
        >
          Contact
        </h2>
        <p className="text-[#888888] text-sm leading-[1.8] mb-8">
          お仕事のご依頼・ご相談はこちらからお気軽にどうぞ
        </p>
        <a
          href="mailto:sugi.libero@gmail.com"
          className="inline-block px-8 py-3 rounded-full text-sm font-medium text-white bg-[#e8a4b8] hover:bg-[#d48fa3] hover:shadow-[0_10px_30px_rgba(232,164,184,0.4)] transition-all duration-300"
        >
          sugi.libero@gmail.com
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#eeeeee] py-10 text-center text-[#888888] text-sm">
        © 2025 · Built with Claude Code
      </footer>
    </main>
  );
}
