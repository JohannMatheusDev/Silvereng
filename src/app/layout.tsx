import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import CookieBanner from "@/components/CookieBanner"; 
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppBtn from "@/components/WhatsAppBtn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Silvereng | Construtora",
  description: "Projetos e Obras com foco em excelência e alto padrão.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      
      <body className={`${inter.className} bg-background text-textDark min-h-screen flex flex-col`}>
        
        
        <Header />
        
        
        <main className="flex-grow">
          {children}
        </main>
        

        <Footer />
        
        
        <WhatsAppBtn />
        
        
        <CookieBanner />
        
      </body>
    </html>
  );
}