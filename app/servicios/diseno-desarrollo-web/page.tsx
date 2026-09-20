import WebDesignBanner from './components/WebDesignBanner';
import PortfolioSlider from './components/PortfolioSlider';
import ServicesShowcase from './components/ServicesShowcase';
import Cta from '@/app/components/Cta';
import Faq from '@/app/components/Faq';

export default function DisenoDesarrolloWebPage() {
  return (
    <main className="w-full">
      <WebDesignBanner />
      <PortfolioSlider />
      <ServicesShowcase />
      <Cta />
      <Faq />
    </main>
  );
}
