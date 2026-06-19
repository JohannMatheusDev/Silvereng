"use client";

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#F4F6F8] text-[#0B1F3A] h-20 px-16 z-50 shadow-sm border-b border-[#0B1F3A]/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
        
          {/* ── LOGO OFICIAL INTERATIVA COM MARCA REGISTRADA ── */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/logo_silvereng.png"
              className="h-12 w-auto object-contain     
                        transition-transform duration-300 
                        group-hover:scale-105 
                        group-hover:[filter:invert(33%)_sepia(87%)_saturate(1171%)_hue-rotate(345deg)_brightness(87%)_contrast(92%)]" 
              alt="Logo Silvereng®"
            />
            <span className="text-sm tracking-[0.35em] uppercase font-black text-[#0B1F3A] transition-colors duration-300 group-hover:text-[#A74B1C]">
              SILVERENG<sup className="text-[8px] ml-0.5 font-light tracking-normal">®</sup>
            </span>
          </Link>

        
        <nav className="hidden md:flex gap-8 font-bold text-xs tracking-[0.2em] uppercase items-center">
          
          <Link href="/" className="relative py-2 transition-colors duration-300 hover:text-[#A74B1C]
                       after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#A74B1C] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300">
            Início
          </Link>

          <Link href="/#historia" className="relative py-2 transition-colors duration-300 hover:text-[#A74B1C]
                       after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#A74B1C] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300">
            História
          </Link>

          <Link href="/lancamento" className="relative py-2 transition-colors duration-300 hover:text-[#A74B1C]
                       after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#A74B1C] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300">
              Lançamentos
          </Link>
          
          <Link href="/cronologia" className="relative py-2 transition-colors duration-300 hover:text-[#A74B1C]
                 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#A74B1C] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300">
            Portfólio
          </Link>

          
          <Link 
            href="/#contato" 
            className="ml-4 px-5 py-2.5 bg-[#A74B1C] border border-[#A74B1C] text-[#F4F6F8] rounded 
                      font-black shadow-sm transition-all duration-300 
                      hover:bg-[#C85A24] hover:border-[#C85A24] hover:shadow-[0_10px_20px_rgba(167,75,28,0.2)]
                      active:scale-95"
          >
            Contato
          </Link>
          
        </nav>
      </div>
    </header>
  );
}