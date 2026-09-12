import type { Metadata } from "next";

import "./globals.css";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Valhu Group | Agencia de Innovación & UX Design",
  description:
    "Sumérgete en nuestro mundo de tecnología, marketing e innovación.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased bg-[#EFF8FD] text-[#141821]">
       <Navbar />
        {children}
       <Footer />

       <div className="bottom-page-blur" aria-hidden="true">
        <div className="blur-layer blur-layer-1" />
        <div className="blur-layer blur-layer-2" />
        <div className="blur-layer blur-layer-3" />
        <div className="blur-layer blur-layer-4" />
       </div>
      </body>
    </html>
  );
}