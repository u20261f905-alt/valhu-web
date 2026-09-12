import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Cta from './components/Cta';
import Faq from './components/Faq';
import ScrollTilt from './components/ScrollTilt';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#EFF8FD]">
      <Hero />
      <Services />
      <About />
      <Faq />

      {/* El banner entra inclinado, se endereza al pasar por el centro
          de la pantalla y se vuelve a inclinar al salir por arriba.
          Ángulos moderados para que no se sienta tambaleante. */}
      <ScrollTilt from={16} to={-10} perspective={1100}>
        <Cta />
      </ScrollTilt>
    </main>
  );
}
