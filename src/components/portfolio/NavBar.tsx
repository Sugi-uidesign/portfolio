'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-[0_1px_0_#eeeeee]'
          : 'bg-transparent'
      }`}
      style={{ fontFamily: SERIF }}
    >
      <div className="max-w-[1200px] mx-auto px-8 h-16 flex items-center justify-between">
        <span className="text-sm tracking-[0.1em] text-[#333333]">Portfolio</span>
        <div className="flex items-center gap-6 sm:gap-8">
          <a
            href="#works"
            className="text-sm text-[#888888] hover:text-[#e8a4b8] transition-colors duration-300 hidden sm:block"
          >
            Works
          </a>
          <a
            href="#about"
            className="text-sm text-[#888888] hover:text-[#e8a4b8] transition-colors duration-300 hidden sm:block"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-sm text-[#888888] hover:text-[#e8a4b8] transition-colors duration-300 hidden sm:block"
          >
            Contact
          </a>
          <Link
            href="/puyo"
            className="text-xs px-4 py-2 rounded-full border border-[#dddddd] text-[#888888] hover:border-[#e8a4b8] hover:text-[#e8a4b8] transition-all duration-300"
          >
            Puyo Game
          </Link>
        </div>
      </div>
    </nav>
  );
}
