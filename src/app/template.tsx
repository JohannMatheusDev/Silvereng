"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Template({ children }: { children: React.ReactNode }) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(curtainRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
    })
    .fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out",
        // CORREÇÃO CRÍTICA: Remove o transform do elemento pai após a animação acabar
        clearProps: "transform", 
      },
      "-=0.4"
    );
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#F4F6F8]">
      {/* 🛠️ CORREÇÃO: Cortina de Transição alterada para Preto Absoluto (Estilo Cinema) */}
      <div 
        ref={curtainRef} 
        className="fixed inset-0 bg-black z-[9999] pointer-events-none"
        style={{ transform: "translateY(0%)" }}
      />
      
      {/* Container de Conteúdo */}
      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </div>
  );
}