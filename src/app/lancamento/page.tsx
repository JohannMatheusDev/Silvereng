"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";


const CONCEPCIONAL_SLIDES = [
    {
        id: "concept-1",
        code: "SILVERENG ",
        title: "EM BREVE",
        type: "",
        local: ""
    },
    {
        id: "concept-2",
        code: "SILVERENG ",
        title: "EM BREVE",
        type: "",
        local: ""
    },
    {
        id: "concept-3",
        code: "SILVERENG ",
        title: "EM BREVE",
        type: "",
        local: ""
    },
    {
        id: "concept-4",
        code: "SILVERENG ",
        title: "EM BREVE",
        type: "",
        local: ""
    }
];

export default function LancamentosPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardContentRef = useRef<HTMLDivElement>(null);

    
    useGSAP(() => {
        if (cardContentRef.current) {
            gsap.fromTo(cardContentRef.current,
                { opacity: 0, x: 40, filter: "blur(8px)" },
                { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
            );
        }
    }, [currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % CONCEPCIONAL_SLIDES.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + CONCEPCIONAL_SLIDES.length) % CONCEPCIONAL_SLIDES.length);
    };

    return (
        <div ref={containerRef} className="w-full h-screen relative bg-[#0A0A0A] text-white overflow-hidden select-none">
            
            
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-[#A74B1C]/5 pointer-events-none" />

            
            <div className="absolute left-24 top-1/2 -translate-y-1/2 max-w-lg hidden lg:block z-10 pointer-events-none">
                <span className="text-[10px] tracking-[0.5em] font-mono text-[#A74B1C] font-black block mb-2">// STATUS DOS ESTUDOS</span>
                <h1 className="text-7xl font-black text-white/5 tracking-tighter leading-none uppercase">
                    PROJETO<br />AUTORAL
                </h1>
            </div>

            
            <button 
                onClick={prevSlide}
                className="absolute left-12 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-300"
                aria-label="Anterior"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button 
                onClick={nextSlide}
                className="absolute right-12 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-300"
                aria-label="Próximo"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            
            <div className="absolute inset-y-0 right-32 flex items-center z-30 pointer-events-none">
                <div 
                    ref={cardContentRef}
                    className="w-[520px] bg-black/40 backdrop-blur-2xl border border-white/10 p-14 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.7)] pointer-events-auto"
                >
                    <span className="text-[9px] tracking-[0.4em] font-mono text-[#A74B1C] font-black uppercase block mb-4">
                        {CONCEPCIONAL_SLIDES[currentSlide].code}
                    </span>
                    
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-wide uppercase mb-3 leading-none">
                        {CONCEPCIONAL_SLIDES[currentSlide].title}
                    </h2>
                    
                    <div className="text-xs tracking-[0.15em] font-light text-white/80 uppercase mb-2">
                        {CONCEPCIONAL_SLIDES[currentSlide].type}
                    </div>

                    <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-10">
                        📍 {CONCEPCIONAL_SLIDES[currentSlide].local}
                    </p>

                    
                    <Link 
                        href="/#contato"
                        className="inline-block text-[10px] tracking-widest uppercase font-black text-white hover:text-[#A74B1C] transition-colors border-b-2 border-white/20 hover:border-[#A74B1C] pb-2"
                    >
                        Solicitar Atendimento Exclusivo →
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3">
                {CONCEPCIONAL_SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`transition-all duration-500 rounded-full h-1.5 ${
                            idx === currentSlide 
                                ? "w-8 bg-white" 
                                : "w-1.5 bg-white/20 hover:bg-white/50"
                        }`}
                        aria-label={`Mudar para index ${idx + 1}`}
                    />
                ))}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[6px] bg-gradient-to-r from-[#C85A24] via-[#A74B1C] to-[#863710] z-50 pointer-events-none" />

        </div>
    );
}