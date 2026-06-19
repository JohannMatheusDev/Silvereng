"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);


const FRAME_COUNT = 240;

const getFramePath = (index: number): string =>
    `/frames/${String(index).padStart(4, "0")}.jpg`;


interface PortfolioCardProps {
    image: string;
    label: string;
    title: string;
    position: number;
}

function PortfolioCard({ image, label, title, position }: PortfolioCardProps) {
    const baseTransform = position === 1 ? "rotate(-4deg) translateX(10px)" : position === 3 ? "rotate(4deg) translateX(-10px)" : "rotate(0deg)";

    return (
        <div 
            className="group relative w-full aspect-[9/16] bg-black overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-6 hover:shadow-[0_30px_60px_rgba(167,75,28,0.15)]"
            style={{ transform: baseTransform }}
        >
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

            <div className="absolute bottom-0 inset-x-0 p-8 z-20">
                <span className="text-[10px] tracking-[0.3em] uppercase font-bold bg-white text-black px-3 py-1.5 rounded-full w-max mb-4 block transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#C85A24] group-hover:via-[#A74B1C] group-hover:to-[#863710] group-hover:text-white">
                    {label}
                </span>
                
                <h3 className="text-2xl font-bold text-white leading-tight transition-transform duration-500 group-hover:-translate-y-1">
                    {title}
                </h3>
                
                <div className="flex items-center gap-2 mt-4 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                    <div className="w-6 h-px bg-[#A74B1C]" />
                    <span className="text-[11px] tracking-[0.2em] uppercase text-white/60">Ver Detalhes</span>
                </div>
            </div>
        </div>
    );
}


export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const phase1Ref = useRef<HTMLDivElement>(null);
    const phase2Ref = useRef<HTMLDivElement>(null);
    const phase3Ref = useRef<HTMLDivElement>(null);

    
    const metricRef1 = useRef<HTMLSpanElement>(null);
    const metricRef2 = useRef<HTMLSpanElement>(null);

    const framesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef<number>(0);

    
    const [progress, setProgress] = useState(0);
    const [showLoader, setShowLoader] = useState(true);
    const [fadeLoader, setFadeLoader] = useState(false);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const img = framesRef.current[index];
        if (!ctx || !img?.complete || !img.naturalWidth) return;

        const canvasW = canvas.width;
        const canvasH = canvas.height;
        const imgW = img.naturalWidth;
        const imgH = img.naturalHeight;

        const scale = Math.max(canvasW / imgW, canvasH / imgH);
        const drawW = imgW * scale;
        const drawH = imgH * scale;
        const offsetX = (canvasW - drawW) / 2;
        const offsetY = (canvasH - drawH) / 2;

        ctx.clearRect(0, 0, canvasW, canvasH);
        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const setSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(currentFrameRef.current);
        };

        setSize();
        window.addEventListener("resize", setSize, { passive: true });
        return () => window.removeEventListener("resize", setSize);
    }, [renderFrame]);

    
    useEffect(() => {
        const images: HTMLImageElement[] = new Array(FRAME_COUNT);
        let loadedCount = 0;

        const onLoadAny = () => {
            loadedCount++;
            setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));

            if (loadedCount === FRAME_COUNT) {
                framesRef.current = images;
                renderFrame(0);
                
                setTimeout(() => setFadeLoader(true), 400);
                setTimeout(() => setShowLoader(false), 1200);
            }
        };

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.src = getFramePath(i + 1);
            img.onload = onLoadAny;
            img.onerror = onLoadAny;
            images[i] = img;
        }
    }, [renderFrame]);

    // ── ANIMAÇÃO 1: Controle dos Textos do Canvas Hero ──
    useGSAP(
        () => {
            const container = containerRef.current;
            const p1 = phase1Ref.current;
            const p2 = phase2Ref.current;
            const p3 = phase3Ref.current;
            if (!container || !p1 || !p2 || !p3) return;

            gsap.set([p1, p2, p3], { autoAlpha: 0, y: 30 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "+=300%",
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,       
                    anticipatePin: 1,
                    invalidateOnRefresh: true, 
                },
            });

            tl.to(currentFrameRef, {
                current: FRAME_COUNT - 1,
                ease: "none",
                onUpdate() {
                    const idx = Math.round(currentFrameRef.current);
                    renderFrame(idx);
                },
            }, 0);

            tl.to(p1, { autoAlpha: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.02)
              .to(p1, { autoAlpha: 0, y: -30, duration: 0.12, ease: "power2.in" }, 0.28);

            tl.to(p2, { autoAlpha: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.35)
              .to(p2, { autoAlpha: 0, y: -30, duration: 0.12, ease: "power2.in" }, 0.62);

            tl.to(p3, { autoAlpha: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.70);
        },
        { scope: containerRef, dependencies: [renderFrame] }
    );

    // ── ANIMAÇÃO 2: Motores de Contagem Progressiva e Scroll de Seções ──
    useGSAP(() => {
        if (metricRef1.current) {
            gsap.fromTo(metricRef1.current,
                { innerText: "0" },
                {
                    innerText: "6",
                    duration: 1.8,
                    ease: "power2.out",
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: "#metricas",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }

        if (metricRef2.current) {
            gsap.fromTo(metricRef2.current,
                { innerText: "0" },
                {
                    innerText: "71",
                    duration: 2.2,
                    ease: "power2.out",
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: "#metricas",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }

        const sections = ["#historia", "#metricas", "#atuacao", "#portfolio"];
        sections.forEach((id) => {
            gsap.fromTo(`${id} > div`, 
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: id,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    }, []);

    return (
        <div className="flex flex-col w-full bg-white text-black overflow-x-hidden pt-20">

            {/* ── LOADER INTERATIVO COM LOGO DE MARCA REGISTRADA ── */}
            {showLoader && (
                <div 
                    className={`fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        fadeLoader ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
                    }`}
                >
                    <div className="flex flex-col items-center gap-4 select-none animate-in fade-in zoom-in-95 duration-700">
                        <img 
                            src="/logo_silvereng.png"
                            className="h-28 w-auto object-contain" 
                            alt="Logo Silvereng®"
                        />
                        <div className="text-center space-y-2">
                            <h2 className="text-xs font-black tracking-[0.4em] text-black uppercase ml-[0.4em]">
                                SILVERENG<sup className="text-[8px] ml-0.5 font-light tracking-normal normal-case text-black/50">®</sup>
                            </h2>
                            <p className="text-[10px] tracking-[0.2em] font-mono text-black/40">{progress}%</p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 h-[4px] bg-gradient-to-r from-[#C85A24] via-[#A74B1C] to-[#863710] transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
                </div>
            )}

            
            <section
                ref={containerRef}
                className="relative w-full h-screen bg-black overflow-hidden sticky top-0"
            >
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0"
                    style={{ width: "100%", height: "100%" }}  
                    aria-hidden="true"
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)" }}
                    aria-hidden="true"
                />

                <div className="absolute inset-0 max-w-7xl mx-auto px-16 pointer-events-none">
                    <div ref={phase1Ref} className="absolute left-16 top-[55%] -translate-y-1/2 max-w-[550px]" style={{ willChange: "opacity, transform" }}>
                        <div className="w-12 h-[3px] mb-6 bg-gradient-to-r from-[#C85A24] via-[#A74B1C] to-[#863710]" />
                        <p className="text-xs tracking-[0.40em] uppercase mb-3 text-white/60 font-medium">Aureum Park Residence</p>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-white">Vista para a<br /><span className="text-white/40">Lagoa Dourada</span></h1>
                        <p className="text-[11px] tracking-[0.25em] uppercase text-white/30">Bairro Boqueirão &nbsp;/&nbsp; Localização Tranquila e Nobre</p>
                    </div>

                    <div ref={phase2Ref} className="absolute left-16 top-[55%] -translate-y-1/2 max-w-[550px]" style={{ willChange: "opacity, transform" }}>
                        <div className="w-12 h-[3px] mb-6 bg-gradient-to-r from-[#C85A24] via-[#A74B1C] to-[#863710]" />
                        <p className="text-xs tracking-[0.40em] uppercase mb-3 text-white/60 font-medium">Sofisticação de 4 Andares</p>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-white">Plantas de<br /><span className="text-white/40">2 e 3 Dormitórios</span></h1>
                        <p className="text-[11px] tracking-[0.25em] uppercase text-white/30">A partir de 77,69m² &nbsp;/&nbsp; Unidades com Suíte e Sacada</p>
                    </div>

                    <div ref={phase3Ref} className="absolute left-16 top-[55%] -translate-y-1/2 max-w-[550px]" style={{ willChange: "opacity, transform" }}>
                        <div className="w-12 h-[3px] mb-6 bg-gradient-to-r from-[#C85A24] via-[#A74B1C] to-[#863710]" />
                        <p className="text-xs tracking-[0.40em] uppercase mb-3 text-white/60 font-medium">Acabamento Premium</p>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-8 text-white">PRATICIDADE &<br /><span className="text-white/40">ALTO CONFORTO</span></h1>
                        <p className="text-[11px] tracking-[0.25em] uppercase text-white/30 mb-8 block">Salão de Festas, Playground e Elevador Integrado</p>
                        
                        <div className="flex flex-wrap gap-4 pointer-events-auto">
                            <a href="#contato" className="inline-block bg-gradient-to-r from-[#C85A24] via-[#A74B1C] to-[#863710] text-white font-black py-4 px-8 rounded-full text-xs tracking-widest uppercase shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_20px_40px_rgba(167,75,28,0.2)]">
                                Entre em Contato
                            </a>
                            
                            <Link href="/lancamento" className="inline-block bg-transparent border border-white text-white font-black py-4 px-8 rounded-full text-xs tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 active:scale-95">
                                Conhecer Lançamentos
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            
            <section id="historia" className="py-32 bg-black text-white relative z-30 shadow-2xl">
                <div className="max-w-7xl mx-auto px-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-4">
                        <p className="text-xs tracking-[0.40em] uppercase mb-3 text-[#A74B1C] font-black">Corporativo</p>
                        <h2 className="text-4xl font-black tracking-tight mb-6">Nossa<br/>História</h2>
                        <div className="h-1 w-16 bg-gradient-to-r from-[#C85A24] to-[#A74B1C]"></div>
                    </div>
                    <div className="lg:col-span-8 space-y-10">
                        <div className="border-l-2 border-[#A74B1C] pl-6">
                            <h3 className="text-2xl font-light italic text-white/90 leading-relaxed">
                                Onde cada linha estrutural representa uma nova tela com infinitas possibilidades.
                            </h3>
                        </div>
                        <div className="text-base text-white/70 font-light leading-relaxed space-y-6">
                            <p>Fundada em 2020, a SILVERENG<sup className="text-[10px] ml-0.5 font-light text-[#A74B1C]">®</sup> transforma o cenário da construção civil de alto padrão através de projetos inovadores. Nascida da resiliência e do desejo de ir além, somos uma incorporadora guiada pela Inovação, Integridade e Quality, focada em construir o extraordinário e evoluir a cada novo elemento construtivo.</p>
                        </div>
                    </div>
                </div>
            </section>

            
            <section id="metricas" className="py-24 bg-white text-black relative z-30 border-y border-black/5 shadow-sm">
                <div className="max-w-7xl mx-auto px-16 grid grid-cols-1 md:grid-cols-2 gap-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-5xl md:text-7xl font-black text-black tracking-tight select-none">
                            + de <span ref={metricRef1}>6</span>
                        </h3>
                        <p className="text-xs md:text-sm font-black tracking-[0.3em] uppercase text-[#A74B1C] mt-4">
                            Anos de Mercado
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-5xl md:text-7xl font-black text-black tracking-tight select-none">
                            + de <span ref={metricRef2}>71</span> mil m²
                        </h3>
                        <p className="text-xs md:text-sm font-black tracking-[0.3em] uppercase text-[#A74B1C] mt-4">
                            Construídos
                        </p>
                    </div>
                </div>
            </section>

            
            <section id="atuacao" className="py-32 bg-white relative z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-16">
                    <div className="mb-20">
                        <p className="text-xs tracking-[0.40em] uppercase mb-3 text-[#A74B1C] font-black">Expertise</p>
                        <h2 className="text-4xl font-black text-black tracking-tight">Áreas de Atuação</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Residencial Premium", desc: "Casas de altíssimo padrão planejadas sob medida com integração estrutural avançada e acabamento refinado brutalista." },
                            { title: "Obras Comerciais", desc: "Construções corporativas de grande escala focadas em inteligência de execução, prazos rigorosos e gerenciamento ativo." },
                            { title: "Projetos em 3D / BIM", desc: "Planejamento e modelagem tridimensional sob tecnologia de ponta para antecipar gargalos e otimizar custos de fundação." },
                        ].map((item) => (
                            <div key={item.title} className="p-10 bg-[#F4F6F8] rounded-xl border-b-4 border-transparent hover:border-[#A74B1C] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(167,75,28,0.06)]">
                                <h4 className="text-xl font-bold text-black mb-3">{item.title}</h4>
                                <p className="text-sm text-black/70 font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. PORTFÓLIO - DECK DE CARTAS ── */}
            <section id="portfolio" className="py-32 bg-white relative z-30 border-t border-black/5">
                <div className="max-w-7xl mx-auto px-16">
                    <div className="mb-24">
                        <p className="text-xs tracking-[0.40em] uppercase mb-3 text-[#A74B1C] font-black">Portfólio</p>
                        <h2 className="text-4xl font-black text-black tracking-tight">Obras em Destaque</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12">
                        <PortfolioCard 
                            image="/dona_kika.png" 
                            label="Em Execução" 
                            title="Dona Kika Residence"
                            position={1}
                        />
                        <PortfolioCard 
                            image="/dona_izmenia_residence.png" 
                            label="Em Execução" 
                            title="Dona Izmênia Residence"
                            position={2}
                        />
                        <PortfolioCard 
                            image="/gf1911.jpg" 
                            label="Concluída" 
                            title="Sobrado GF1911"
                            position={3}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
  
                        <Link 
                            href="/cronologia" 
                            className="px-8 py-4 bg-black border border-black text-white rounded-full hover:bg-[#A74B1C] hover:border-[#A74B1C] transition-all duration-300 text-xs font-black tracking-widest uppercase shadow-md active:scale-95 flex items-center gap-2"
                        >
                            Ver Portfólio Completo →
                        </Link>

                        <Link 
                            href="/lancamento" 
                            className="px-8 py-4 bg-black border border-black text-white rounded-full hover:bg-[#A74B1C] hover:border-[#A74B1C] transition-all duration-300 text-xs font-black tracking-widest uppercase shadow-md active:scale-95 flex items-center gap-2"
                        >
                            Próximos Lançamentos →
                        </Link>

                    </div>
                </div>
            </section>

            
            <footer id="contato" className="py-24 bg-black text-white relative z-30 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-black tracking-tighter text-white flex items-start">
                            SILVERENG<sup className="text-sm ml-1 font-light tracking-normal">®</sup>
                        </h2>
                        <p className="text-base text-white/70 font-light max-w-sm leading-relaxed">
                            Construindo o futuro com excelência construtiva, engenharia integrada e sofisticação em cada detalhe.
                        </p>
                        <div className="space-y-3 pt-4 text-xs tracking-wider uppercase text-white/40">
                            <p>📍 Guarapuava, PR</p>
                            <p>✉️ contato@silvereng.com.br</p>
                        </div>
                    </div>
                    <FormularioContato />
                </div>
                <div className="max-w-7xl mx-auto px-16 mt-16 pt-8 border-t border-white/5 text-center text-[10px] tracking-[0.2em] uppercase text-white/20">
                    © 2026 Silvereng<sup className="text-[7px] ml-0.5 font-light">®</sup>. Todos os direitos reservados.
                </div>
            </footer>
        </div>
    );
}

function FormularioContato() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (!name.trim() || !email.trim() || !message.trim()) {
            setStatus("error");
            setErrorMessage("Por favor, preencha todos os campos antes de enviar.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus("error");
            setErrorMessage("Por favor, insira um endereço de e-mail válido.");
            return;
        }

        setStatus("loading");
        
        try {
            const response = await fetch("/api/contato", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao processar sua solicitação.");
            }

            setStatus("success");
            setName("");
            setEmail("");
            setMessage("");
        } catch (error: any) {
            setStatus("error");
            setErrorMessage(error.message || "Ocorreu um erro inesperado. Tente novamente.");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full justify-self-end text-center py-16 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-gradient-to-r from-[#C85A24] to-[#A74B1C] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl tracking-[0.10em] uppercase font-bold text-white mb-2">Solicitação Recebida!</h3>
                <p className="text-xs text-white/60 leading-relaxed max-w-xs mx-auto font-light mb-8">
                    Seus dados foram enviados com sucesso via canal encriptado. Nossa equipe entrará em contato em breve.
                </p>
                <button onClick={() => setStatus("idle")} className="text-[10px] tracking-widest uppercase font-bold text-white/40 hover:text-white transition-colors underline decoration-[#A74B1C] underline-offset-4">
                    Enviar nova mensagem
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full justify-self-end">
            <h3 className="text-lg tracking-[0.15em] uppercase font-bold text-white mb-1">Fale Conosco</h3>
            <p className="text-[11px] text-white/40 uppercase tracking-widest mb-6">Inicie seu projeto de alto padrão</p>
            
            <div className="flex flex-col gap-6 pt-2">
                <div className="relative">
                    <input type="text" id="footer-name" value={name} onChange={(e) => setName(e.target.value)} disabled={status === "loading"} placeholder=" " className="peer w-full bg-white/5 border-b border-white/20 p-2 text-xs text-white focus:outline-none focus:border-[#A74B1C] transition-all placeholder-transparent disabled:opacity-40" />
                    <label htmlFor="footer-name" className="absolute left-2 text-[10px] uppercase tracking-wider text-white/60 top-[-14px] transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-2 peer-focus:top-[-14px] peer-focus:text-[10px] peer-focus:text-[#A74B1C]">Seu Nome</label>
                </div>

                <div className="relative">
                    <input type="email" id="footer-email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={status === "loading"} placeholder=" " className="peer w-full bg-white/5 border-b border-white/20 p-2 text-xs text-white focus:outline-none focus:border-[#A74B1C] transition-all placeholder-transparent disabled:opacity-40" />
                    <label htmlFor="footer-email" className="absolute left-2 text-[10px] uppercase tracking-wider text-white/60 top-[-14px] transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-2 peer-focus:top-[-14px] peer-focus:text-[10px] peer-focus:text-[#A74B1C]">Seu E-mail</label>
                </div>

                <div className="relative">
                    <textarea id="footer-msg" rows={2} value={message} onChange={(e) => setMessage(e.target.value)} disabled={status === "loading"} placeholder=" " className="peer w-full bg-white/5 border-b border-white/20 p-2 text-xs text-white focus:outline-none focus:border-[#A74B1C] transition-all placeholder-transparent disabled:opacity-40 resize-none" />
                    <label htmlFor="footer-msg" className="absolute left-2 text-[10px] uppercase tracking-wider text-white/60 top-[-14px] transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-2 peer-focus:top-[-14px] peer-focus:text-[10px] peer-focus:text-[#A74B1C]">Como podemos ajudar?</label>
                </div>

                {status === "error" && (
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider bg-red-500/10 p-2 rounded border border-red-500/20 text-center animate-in fade-in duration-300">
                        {errorMessage}
                    </p>
                )}

                <button type="submit" disabled={status === "loading"} className="w-full bg-gradient-to-r from-[#C85A24] via-[#A74B1C] to-[#863710] text-white font-bold py-3 rounded-lg text-xs tracking-widest uppercase hover:opacity-90 transition-all mt-2 shadow-lg shadow-black/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    {status === "loading" ? "Criptografando..." : "Enviar Mensagem Segura"}
                </button>
            </div>
        </form>
    );
}