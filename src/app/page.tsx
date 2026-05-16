import Image from 'next/image';
import NavBar from '@/components/portfolio/NavBar';

const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif';
const IMG_BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const works = [
  {
    id: 1,
    title: 'Claude AI',
    category: 'AI Agent',
    description:
      'Anthropic Claude を活用したタスク管理と AI エージェントワークフローの設計・実装',
    tags: ['Claude', 'AI Agent', 'Automation'],
    image: `${IMG_BASE}/image/claude.jpg`,
  },
  {
    id: 2,
    title: 'Google Gemini',
    category: 'Multimodal AI',
    description:
      'Gemini Pro を用いたマルチモーダル対話型 AI アプリケーションの開発',
    tags: ['Gemini', 'Multimodal', 'Google AI'],
    image: `${IMG_BASE}/image/gemini.jpg`,
  },
  {
    id: 3,
    title: 'Puyo Puyo Game',
    category: 'Game Dev',
    description:
      'Next.js + TypeScript による AI ペアプログラミングでのゲーム開発実践',
    tags: ['Next.js', 'TypeScript', 'Game'],
    image: `${IMG_BASE}/image/puyopuyo.jpg`,
  },
  {
    id: 4,
    title: 'Claude Code Dev',
    category: 'Developer Tools',
    description:
      'Claude Code × VS Code による AI ファーストな開発ワークフローの構築',
    tags: ['Claude Code', 'VS Code', 'DX'],
    image: `${IMG_BASE}/image/Antigravity.jpg`,
  },
];

const skills = [
  { label: 'AI Integration', items: ['Claude API', 'Gemini API', 'Claude Code'] },
  { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
  { label: 'Platform', items: ['Vercel', 'GitHub Pages', 'VS Code', 'Git'] },
];

export default function Portfolio() {
  return (
    <main
      className="min-h-screen bg-white text-[#333333]"
      style={{ fontFamily: SERIF }}
    >
      <NavBar />

      {/* ─── Hero ─── */}
      <section className="pt-36 pb-28 text-center px-6">
        <p className="fade-up fade-up-d1 text-xs tracking-[0.25em] text-[#e8a4b8] uppercase mb-8">
          AI Developer
        </p>
        <div
          className="fade-up fade-up-d2 w-10 h-[3px] rounded-full mx-auto mb-10"
          style={{ background: '#e8a4b8' }}
        />
        <h1
          className="fade-up fade-up-d3 text-[32px] sm:text-[42px] font-normal leading-[1.8] text-[#333333] mb-6"
          style={{ letterSpacing: '0.12em' }}
        >
          AI × 開発の<br />実績ポートフォリオ
        </h1>
        <p className="fade-up fade-up-d4 text-[#888888] text-base leading-[2] max-w-xs mx-auto mb-12">
          Claude・Gemini などの最新 AI を活用して構築した
          プロダクトと開発ワークフローの実績集
        </p>
        <a
          href="#works"
          className="fade-up fade-up-d5 inline-block px-9 py-3.5 rounded-full text-sm font-medium text-white bg-[#e8a4b8] hover:bg-[#d48fa3] hover:shadow-[0_10px_30px_rgba(232,164,184,0.4)] transition-all duration-300"
        >
          Works を見る
        </a>
      </section>

      {/* ─── Works ─── */}
      <section id="works" className="py-24 px-6 md:px-10 bg-[#faf9f5]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16">
            <div className="w-10 h-[3px] rounded-full mx-auto mb-6" style={{ background: '#e8a4b8' }} />
            <h2 className="text-2xl font-bold text-[#333333]" style={{ letterSpacing: '0.05em' }}>
              Works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {works.map((work) => (
              <article
                key={work.id}
                className="group bg-white border border-[#eeeeee] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-[11px] font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(255,240,243,0.92)', color: '#e8a4b8' }}
                    >
                      {work.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="text-lg font-bold text-[#333333] mb-2"
                    style={{ letterSpacing: '0.05em' }}
                  >
                    {work.title}
                  </h3>
                  <p className="text-sm text-[#888888] leading-[1.9] mb-5">
                    {work.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold px-3 py-1.5 rounded-full"
                        style={{ background: '#fff0f3', color: '#e8a4b8' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About ─── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="w-10 h-[3px] rounded-full mx-auto mb-6" style={{ background: '#e8a4b8' }} />
          <h2 className="text-2xl font-bold text-[#333333] mb-10" style={{ letterSpacing: '0.05em' }}>
            About
          </h2>
          <p className="text-[#888888] text-base leading-[2.2] mb-16 max-w-md mx-auto">
            Claude Code・Gemini などの AI ツールを活用したアプリケーション開発に取り組むエンジニア。
            プロダクト設計からフロントエンド実装まで、AI の力で開発体験を革新することを目指しています。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {skills.map((skill) => (
              <div key={skill.label}>
                <p
                  className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
                  style={{ color: '#e8a4b8' }}
                >
                  {skill.label}
                </p>
                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="text-sm text-[#888888] leading-[1.6]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" className="py-24 text-center px-6 bg-[#faf9f5]">
        <div className="w-10 h-[3px] rounded-full mx-auto mb-8" style={{ background: '#e8a4b8' }} />
        <h2 className="text-2xl font-bold text-[#333333] mb-4" style={{ letterSpacing: '0.05em' }}>
          Contact
        </h2>
        <p className="text-[#888888] text-sm leading-[1.8] mb-10">
          お仕事のご依頼・ご相談はお気軽にどうぞ
        </p>
        <span className="inline-block px-9 py-3.5 rounded-full text-sm font-medium text-white bg-[#e8a4b8]">
          CONTACT
        </span>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[#eeeeee] py-10 text-center">
        <p className="text-[#888888] text-sm">© 2025 · Built with Claude Code</p>
      </footer>
    </main>
  );
}
