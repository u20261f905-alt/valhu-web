import CarruselImagenes, {
  type Pieza,
} from "@/app/components/CarruselImagenes";

/**
 * Bento/marquee de portafolio de Diseño y Desarrollo Web.
 *
 * Cada tarjeta es una composición ya aplanada (mockups dentro de mockups,
 * texto de apps de terceros): no hay contenido editable que animar por
 * dentro, así que se exporta como una sola imagen, igual que en el diseño.
 */
const PIEZAS: Pieza[] = [
  {
    id: "bento-1",
    image: "/services/diseno-desarrollo-web/bento-1.webp",
    alt: "Portafolio: app deportiva",
  },
  {
    id: "bento-2",
    image: "/services/diseno-desarrollo-web/bento-2.webp",
    alt: "Portafolio: portal inmobiliario",
  },
  {
    id: "bento-3",
    image: "/services/diseno-desarrollo-web/bento-3.webp",
    alt: "Portafolio: apps varias",
  },
  {
    id: "bento-4",
    image: "/services/diseno-desarrollo-web/bento-4.webp",
    alt: "Portafolio: tarjeta de fidelización",
  },
];

export default function PortfolioSlider() {
  return <CarruselImagenes piezas={PIEZAS} />;
}
