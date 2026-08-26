import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Valhu Group | Agencia de Innovación & UX Design",
  description: "Sumérgete en nuestro mundo de tecnología, marketing e innovación.",
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
      </body>
    </html>
  );
}