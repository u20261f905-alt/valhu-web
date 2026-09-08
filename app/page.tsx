import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Faq from './components/Faq';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#EFF8FD]">
      <Hero />
      <Services />
      <About />
      <Faq />
    </main>
  );
} 