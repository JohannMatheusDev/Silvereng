"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ALL_PROJECTS = [
    { 
        id: 1, 
        image: "/Comercial_S1_Superpao.jpg", 
        category: "comercial", 
        label: "Reforma Concluída", 
        title: "Superpão Saldanha Comercial", 
        area: "Escala Comercial", 
        local: "R. Saldanha Marinho, 973, Santa Cruz, Guarapuava - PR",
        ano: "2019",
        descricao: "A Silvereng auxiliou nas reformas estruturais e estéticas do Superpão Saldanha enquanto a loja permaneceu em pleno funcionamento. A obra foi cuidadosamente planejada para minimizar o transtorno aos clientes. Os serviços realizados incluíram melhorias na estrutura, sistemas hidráulicos e elétricos, cobertura e pavimentação."
    },
    { 
        id: 2, 
        image: "/Comercial_S3_Superpao.png", 
        category: "comercial",
        label: "Concluída",
        title: "Comercial Superpão Morro Alto", 
        area: "Grande Porte", 
        local: "Morro Alto, Guarapuava - PR",
        ano: "2019",
        descricao: "A reforma e reestruturação do Superpão Morro Alto foi uma obra executada com velocidade máxima em tempo recorde de aproximadamente 5 meses. Este projeto apresentou um grande desafio logístico devido ao porte monumental da obra e à alta qualidade de construção exigida pelo grupo."
    },
    { 
        id: 3, 
        image: "/Comercial_S4_Hangar.jpeg", 
        category: "comercial", 
        label: "Concluída", 
        title: "Hangar Aeroporto", 
        area: "Escala Executiva", 
        local: "Aeroporto Regional Tancredo Thomas de Faria, Guarapuava - PR",
        ano: "2019",
        descricao: "Construído pela Silvereng, o Hangar do Aeroporto de Guarapuava combina perfeitamente estilo industrial brutalista e funcionalidade pura. O espaço conta com piso de concreto polido de alta resistência para tráfego pesado de aeronaves e fechamento metálico rígido."
    },
    { 
        id: 4, 
        image: "/Casa_SE1.png", 
        category: "residencial", 
        label: "Concluída", 
        title: "Casa de Alto Padrão - Centro", 
        area: "Aprox. 220 m²", 
        local: "R. Vicente Machado, 276 - Centro, Guarapuava - PR",
        ano: "2020",
        descricao: "Esta luxuosa residência no núcleo central de Guarapuava passou por uma revitalização estrutural profunda, incluindo a fundição de uma laje totalmente nova e reforços em pilares. A fachada ganhou linhas contemporâneas com acabamentos de alto padrão."
    },
    { 
        id: 5, 
        image: "/sobrado_santa_cruz_1.png",
        category: "residencial", 
        label: "Concluída", 
        title: "Sobrado Santa Cruz 1", 
        area: "Alto Padrão", 
        local: "Bairro Santa Cruz, Guarapuava - PR",
        ano: "2020",
        descricao: "Incorporação de sobrado residencial unifamiliar contemporâneo focado em volumetria geométrica marcante. O projeto prioriza a integração funcional de ambientes sociais e otimização completa da área útil do terreno."
    },
    { 
        id: 6, 
        image: "/sobrado_cila_2.png",
        category: "residencial", 
        label: "Concluída", 
        title: "Sobrado Cila 1", 
        area: "Alto Padrão", 
        local: "Bairro Cidades dos Lagos, Guarapuava - PR",
        ano: "2020",
        descricao: "Residência executada sob engenharia de vãos livres para amplitude de área social. Projeto arquitetônico moderno que valoriza a entrada de iluminação natural e eficiência térmica entre os pavimentos."
    },
    { 
        id: 7, 
        image: "/Casa_SE2.jpeg", 
        category: "residencial",
        label: "Concluída", 
        title: "Casa Santa Cruz", 
        area: "Aprox. 110 m²", 
        local: "Rua Frei Caneca, 3034, Santa Cruz, Guarapuava - PR",
        ano: "2021",
        descricao: "Imóvel residencial com alto padrão de acabamento. A planta inteligente contempla suíte master, salas de jantar/TV com pé-direito alto imponente, cozinha gourmet integrada para recepções e garagem estruturada para dois veículos."
    },
    { 
        id: 8, 
        image: "Sobrado_LD48.png", 
        category: "residencial", 
        label: "Concluída", 
        title: "Sobrado LD48", 
        area: "Alto Padrão", 
        local: "Guarapuava - PR",
        ano: "2021",
        descricao: "Engenharia residencial focada em minimalismo e sustentabilidade de materiais. Estrutura executada com alto rigor técnico para garantir isolamento acústico eficiente e acabamentos finos de alta durabilidade."
    },
    { 
        id: 9, 
        image: "/Edificio_Aureum_Park.jpg",
        category: "residencial", 
        label: "Concluída", 
        title: "Aureum Park Residence",
        area: "Alto Padrão", 
        local: "Rua Ivaiporã, Boqueirão, Guarapuava - PR",
        ano: "2022",
        descricao: "Situado em frente à Lagoa Dourada no nobre bairro Boqueirão, o Aureum Park se destaca pela imponência estrutural. O edifício oferece plantas de 2 e 3 dormitórios com acabamento premium, elevador integrado, playground e salão de festas privativo."
    },
    { 
        id: 10, 
        image: "/gf1911.jpg", 
        category: "residencial",
        label: "Concluída",
        title: "Sobrado GF1911", 
        area: "300 m²", 
        local: "Condomínio Grand Forest Spa e Resort, Alto da XV, Guarapuava - PR",
        ano: "2023",
        descricao: "Sobrado monumental com 300 metros quadrados em condomínio fechado de luxo. A residência conta com arquitetura contemporânea rica em iluminação, dispondo de 3 suítes amplas, escritório privativo, área gourmet estruturada e garagem para até 6 carros."
    },
    { 
        id: 11, 
        image: "Comercial_Santa_Felicidade.png", 
        category: "comercial", 
        label: "Concluída", 
        title: "Comercial Santa Felicidade", 
        area: "Escala Comercial", 
        local: "Bairro Santa Felicidade, Guarapuava - PR",
        ano: "2023",
        descricao: "Ponto comercial estratégico projetado para flexibilidade de layouts empresariais e lojas de varejo. Engenharia focada em pavimentação reforçada, acessibilidade completa e otimização de fachadas institucionais."
    },
    { 
        id: 12, 
        image: "Comercial_Tatuquara.png", 
        category: "comercial", 
        label: "Concluída", 
        title: "Comercial Tatuquara", 
        area: "Escala Comercial", 
        local: "Guarapuava - PR",
        ano: "2023",
        descricao: "Instalação comercial de grande porte voltada para eficiência logística e operacional. A Silvereng aplicou soluções ágeis de fundação e cobertura termoacústica industrial para garantir o conforto térmico e redução de custos."
    },
    { 
        id: 13, 
        image: "/sobrado_santa_cruz_2.png",
        category: "residencial", 
        label: "Concluída", 
        title: "Sobrado Santa Cruz 2", 
        area: "Alto Padrão", 
        local: "Bairro Santa Cruz, Guarapuava - PR",
        ano: "2023",
        descricao: "Segunda fase de sobrados residenciais de alto padrão no bairro Santa Cruz. Design atualizado com acabamentos em brises contemporâneos, suítes integradas a varandas e área gourmet integrada aos fundos do lote."
    },
    { 
        id: 14, 
        image: "/gf0906.png",
        category: "residencial",
        label: "Concluída",
        title: "Sobrado GF0906",
        area: "220,93 m²", 
        local: "Condomínio Grand Forest Spa e Resort, Alto da XV, Guarapuava - PR",
        ano: "2023",
        descricao: "Residência de alto padrão destacada pelos detalhes elegantes em madeira e concreto na fachada. Possui cozinha integrada com espaço gourmet, suítes confortáveis com closet, sala em mezanino e uma área externa de lazer com jacuzzi."
    },
    { 
        id: 15, 
        image: "/gf1221.png", 
        category: "residencial",
        label: "Concluída",
        title: "Residência 1221", 
        area: "Alto Padrão", 
        local: "Condomínio Grand Forest Spa e Resort, Alto da XV, Guarapuava - PR",
        ano: "2024",
        descricao: "Residência de altíssimo padrão projetada com 3 pavimentos imponentes. Combina beleza e funcionalidade em ambientes sociais totalmente integrados, 4 suítes luxuosas, acabamentos automatizados e piscina externa conectada ao paisagismo."
    },
    { 
        id: 16, 
        image: "/dona_izmenia_residence.png", 
        category: "residencial", 
        label: "Em Execução", 
        title: "Dona Izmênia Residence", 
        area: "28,79 m² a 58,00 m²", 
        local: "Av. Dr. Aragão de Mattos Leão Filho, n°425, Dos Estados, Guarapuava - PR",
        ano: "2024",
        descricao: "Edifício residencial moderno e sofisticado de 7 andares. Oferece studios práticos e apartamentos de 2 dormitórios com sacadas iluminadas por LED e guarda-corpo em vidro. Estrutura com coworking e academia. Previsão de entrega: Dezembro de 2027."
    },
    { 
        id: 17, 
        image: "/dona_kika.png", 
        category: "residencial", 
        label: "Em Execução", 
        title: "Dona Kika Residence", 
        area: "A partir de 28,40 m²", 
        local: "Rua Eng. Antônio Rebouças, 1155, Santa Cruz, Guarapuava-PR",
        ano: "2024",
        descricao: "Empreendimento vertical focado em studios inteligentes e acabamento refinado de gesso e piso laminado. Localização privilegiada ao lado do Parque do Lago, contando com lareira externa (fireplace), playground e elevador. Previsão de entrega: Outubro de 2026."
    },
    { 
        id: 18, 
        image: "/gf0821.jpg", 
        category: "residencial",
        label: "Concluída",
        title: "Sobrado GF0821",
        area: "205,38 m²", 
        local: "Condomínio Grand Forest Spa e Resort, Alto da XV, Guarapuava - PR",
        ano: "2024",
        descricao: "Residência de alto padrão com arquitetura contemporânea e linhas retas sofisticadas de 205,38 m². Oferece escritório privativo, salas integradas com conceito aberto, 3 suítes confortáveis (sendo uma master com closet) e um jardim interno planejado."
    },
    { 
        id: 19, 
        image: "/Casa_Moderna.jpg",
        category: "residencial", 
        label: "Concluída", 
        title: "Sobrado Cila 2 (Casa Moderna)", 
        area: "315,24 m²", 
        local: "Rua n°1, 142, Cidade dos Lagos, Guarapuava - PR",
        ano: "2025",
        descricao: "Casa moderna com 315,24 m², destacando-se pelo design imponente com fachada em concreto aparente, madeira e panos de vidro. O térreo conta com ambientes de convivência totalmente integrados e o pavimento superior oferece três suítes amplas."
    },
    { 
        id: 20, 
        image: "sobrado_tramonto.png",
        category: "residencial", 
        label: "Concluída", 
        title: "Sobrado Tramonto", 
        area: "Alto Padrão", 
        local: "Guarapuava - PR",
        ano: "2025",
        descricao: "Projeto residencial sob conceito contemporâneo focado na captura da luz solar do entardecer. Estrutura monumental com grandes aberturas em vidro temperado, pé-direito duplo e área gourmet externa integrada à piscina."
    }
];


const TIMELINE_ERAS = [
    {
        year: "2025",
        milestone: "Arquitetura de Vanguarda",
        tagline: "Consolidação de designs contemporâneos arrojados e engenharia de alto refinamento em condomínios planejados.",
        projectIds: [19, 20]
    },
    {
        year: "2024",
        milestone: "Expansão Vertical Multifamiliar",
        tagline: "Lançamento de grandes empreendimentos residenciais verticais e consolidação de lages corporativas de luxo.",
        projectIds: [15, 16, 17, 18]
    },
    {
        year: "2023",
        milestone: "Alta Performance e Condomínios",
        tagline: "Execução em larga escala de múltiplas residências de luxo com detalhes estruturais complexos em madeira e vidro.",
        projectIds: [10, 11, 12, 13, 14]
    },
    {
        year: "2022",
        milestone: "Visão Panorâmica Imobiliária",
        tagline: "Início do planejamento estratégico frente a localizações nobres e áreas de preservação e lazer urbanas.",
        projectIds: [9]
    },
    {
        year: "2021",
        milestone: "Refinamento Unifamiliar",
        tagline: "Foco total na otimização de plantas residenciais inteligentes de médio e grande porte com acabamento premium.",
        projectIds: [7, 8]
    },
    {
        year: "2020",
        milestone: "Revitalização e Novos Sobrados",
        tagline: "Grandes marcos de reengenharia no núcleo central urbano e introdução da linha autoral de sobrados residenciais.",
        projectIds: [4, 5, 6]
    },
    {
        year: "2019",
        milestone: "Fundações e Escala Comercial",
        tagline: "Nascimento das operações e execução de grandes desafios logísticos de engenharia para infraestruturas comerciais e aeroportuárias.",
        projectIds: [1, 2, 3]
    }
];

export default function CronologiaPortfolioPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<typeof ALL_PROJECTS[0] | null>(null);

    useGSAP(() => {
        const blocks = document.querySelectorAll(".project-block");
        blocks.forEach((block) => {
            gsap.fromTo(block,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: block,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen bg-[#F4F6F8] text-black pt-32 pb-32 px-16 relative">
            <div className="max-w-7xl mx-auto">
                
                {/* ── CABEÇALHO DA GALERIA CRONOLÓGICA UNIFICADA ── */}
                <div className="mb-24">
                    <Link href="/" className="text-xs font-bold tracking-widest uppercase text-[#A74B1C] hover:underline mb-4 block w-max">
                        ← Voltar para Início
                    </Link>
                    <p className="text-xs tracking-[0.40em] uppercase mb-3 text-[#A74B1C] font-bold">Portfólio Histórico</p>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-black uppercase">Trajetória Construtiva</h1>
                    <p className="text-sm text-black/60 font-light max-w-xl leading-relaxed">
                        Nossa história contada através das nossas estruturas. Navegue de forma contínua pela evolução das nossas linhas e pelo acervo completo de obras assinadas pela Silvereng<sup className="text-[9px] font-normal tracking-normal text-[#A74B1C]">®</sup>.
                    </p>
                </div>

                {/* ── ESPINHA DORSAL DA LINHA DO TEMPO ── */}
                <div className="relative space-y-32 before:absolute before:inset-y-0 before:left-0 md:before:left-[30%] before:w-px before:bg-black/10">
                    
                    {TIMELINE_ERAS.map((era) => {
                        const eraProjects = ALL_PROJECTS.filter(p => era.projectIds.includes(p.id));

                        return (
                            <div key={era.year} className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
                                
                                {/* COLUNA ESQUERDA: O Ano e Manifesto Fixo (Sticky) */}
                                <div className="md:col-span-4 md:sticky md:top-32 pr-4 z-10 bg-[#F4F6F8] md:bg-transparent py-4 md:py-0">
                                    <div className="flex items-baseline gap-4 md:flex-col md:gap-1">
                                        <span className="text-6xl md:text-7xl font-black tracking-tighter text-black leading-none">
                                            {era.year}
                                        </span>
                                        <h3 className="text-md font-black tracking-tight text-[#A74B1C] uppercase mt-2">
                                            {era.milestone}
                                        </h3>
                                    </div>
                                    <p className="text-xs text-black/50 font-light mt-4 leading-relaxed max-w-xs">
                                        {era.tagline}
                                    </p>
                                </div>

                                {/* COLUNA DIREITA: Portfólio de Obras Monumentais */}
                                <div className="md:col-span-8 pl-4 md:pl-0 space-y-12">
                                    {eraProjects.map((projeto) => (
                                        <div 
                                            key={projeto.id} 
                                            className="project-block bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden group hover:shadow-[0_30px_60px_rgba(167,75,28,0.05)] transition-all duration-700"
                                        >
                                            {/* Imagem da Obra em Escala Cinema (Com Fallback para Imagens Ausentes) */}
                                            <div className="w-full aspect-[16/9] bg-black overflow-hidden relative">
                                                {projeto.image ? (
                                                    <div 
                                                        className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                                                        style={{ backgroundImage: `url('${projeto.image}')` }}
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center p-6 border-b border-white/5">
                                                        <span className="text-[9px] tracking-[0.3em] uppercase text-white/30 font-semibold text-center">
                                                            Acervo fotográfico em atualização
                                                        </span>
                                                    </div>
                                                )}
                                                <span className="absolute bottom-6 left-6 text-[10px] tracking-widest uppercase font-black bg-black text-white px-4 py-2 rounded shadow-md">
                                                    {projeto.label}
                                                </span>
                                            </div>

                                            {/* Dados Técnicos Rápidos */}
                                            <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                <div className="space-y-2">
                                                    <h4 className="text-2xl font-black text-black tracking-tight uppercase">
                                                        {projeto.title}
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2 pt-1">
                                                        <span className="text-[9px] tracking-wider uppercase bg-[#F4F6F8] border border-black/5 text-black/50 px-3 py-1 rounded-full font-medium">
                                                            📐 {projeto.area}
                                                        </span>
                                                        <span className="text-[9px] tracking-wider uppercase bg-[#F4F6F8] border border-black/5 text-black/50 px-3 py-1 rounded-full font-medium">
                                                            📍 {projeto.local.split(',')[2] || projeto.local.split(',')[0] || "Guarapuava"}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Disparador do Modal Oficial */}
                                                <button 
                                                    onClick={() => setSelectedProject(projeto)}
                                                    className="text-xs tracking-widest uppercase font-black text-[#A74B1C] hover:text-[#C85A24] transition-colors border-b border-transparent hover:border-[#A74B1C] pb-0.5 self-start md:self-center shrink-0"
                                                >
                                                    Ver Detalhes →
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        );
                    })}

                </div>
            </div>

            {/* ── MODAL IMERSIVO TOTALMENTE INTEGRADO (IDÊNTICO AO PORTFÓLIO) ── */}
            {selectedProject && (
                <div 
                    className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity duration-300"
                    onClick={() => setSelectedProject(null)}
                >
                    <div 
                        className="bg-[#F4F6F8] w-full max-w-5xl h-[90vh] md:h-auto rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 right-4 z-50 bg-black text-white font-bold w-10 h-10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-[#C85A24] hover:to-[#A74B1C] transition-all shadow-lg"
                        >
                            ✕
                        </button>

                        {/* Imagem no Modal */}
                        <div className="w-full md:w-1/2 h-80 md:h-[650px] bg-[#F4F6F8] flex items-center justify-center p-4 relative">
                            {selectedProject.image ? (
                                <img 
                                    src={selectedProject.image} 
                                    className="max-w-full max-h-full object-contain select-none rounded-lg" 
                                    alt={selectedProject.title}
                                />
                            ) : (
                                <div className="w-full h-full bg-neutral-950 rounded-xl flex items-center justify-center border border-black/10 shadow-inner">
                                    <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-semibold text-center px-6">
                                        Galeria em atualização
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Coluna do Conteúdo Técnico */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto max-h-[calc(90vh-20rem)] md:max-h-[650px]">
                            <span className="text-[10px] tracking-[0.3em] uppercase font-black text-[#A74B1C] mb-2 block">
                                Ficha Técnica Institucional
                            </span>
                            <h2 className="text-3xl font-black text-black tracking-tight leading-tight mb-6">
                                {selectedProject.title}
                            </h2>

                            <div className="space-y-6 text-sm text-black/80 font-light">
                                <p className="leading-relaxed text-justify font-sans">
                                    {selectedProject.descricao}
                                </p>

                                <hr className="border-black/10" />

                                <div className="grid grid-cols-1 gap-y-4 text-xs uppercase tracking-wider font-bold text-black/60">
                                    <div>
                                        <span className="text-[9px] font-light text-black/50 block normal-case font-sans">Endereço Completo</span>
                                        <span className="text-black normal-case font-sans font-normal text-xs">{selectedProject.local}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 text-xs uppercase tracking-wider font-bold text-black/60">
                                    <div>
                                        <span className="text-[9px] font-light text-black/50 block">Área</span>
                                        <span className="text-black text-xs">{selectedProject.area}</span>
                                    </div>
                                    <div>
                                        <span className="text-[9px] font-light text-black/50 block">Ano</span>
                                        <span className="text-black text-xs">{selectedProject.ano}</span>
                                    </div>
                                    <div>
                                        <span className="text-[9px] font-light text-black/50 block">Status</span>
                                        <span className="text-[#A74B1C] text-xs">{selectedProject.label}</span>
                                    </div>
                                </div>

                                <hr className="border-black/10" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="fixed bottom-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#C85A24] via-[#A74B1C] to-[#863710] z-50 pointer-events-none" />
        </div>
    );
}