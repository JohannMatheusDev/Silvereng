"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // ── LOG DE DIAGNÓSTICO NO NAVEGADOR ──
    console.log("⚡ [Silvereng] CookieBanner foi montado com sucesso no DOM!");
    
    const consent = localStorage.getItem("cookie_consent_silvereng");
    console.log("📝 [Silvereng] Status do consentimento no LocalStorage:", consent);

    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 left-6 md:left-auto md:w-[380px] bg-neutral-950 border border-[#A74B1C]/30 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[99999] flex flex-col gap-4 text-white">
      <div className="space-y-1">
        <h4 className="text-xs font-black tracking-[0.2em] uppercase text-white flex items-center gap-1.5">
          🍪 Controle de Privacidade
        </h4>
        <p className="text-[11px] leading-relaxed text-white/60 font-light">
          Nós utilizamos cookies e tecnologias semelhantes para melhorar a sua experiência e analisar o tráfego do site de acordo com a nossa Política de Privacidade.
        </p>
      </div>
      
      <div className="flex items-center justify-end gap-3 pt-1">
        <button 
          onClick={() => {
            localStorage.setItem("cookie_consent_silvereng", "declined");
            setShowBanner(false);
          }}
          className="text-[10px] tracking-widest uppercase font-bold text-white/40 hover:text-white transition-colors"
        >
          Recusar
        </button>
        
        <button 
          onClick={() => {
            localStorage.setItem("cookie_consent_silvereng", "accepted");
            setShowBanner(false);
          }}
          className="bg-gradient-to-r from-[#C85A24] to-[#A74B1C] text-white font-black py-2.5 px-5 rounded-lg text-[10px] tracking-widest uppercase shadow-md hover:opacity-90 transition-all active:scale-95"
        >
          Aceitar Cookies
        </button>
      </div>
    </div>
  );
}