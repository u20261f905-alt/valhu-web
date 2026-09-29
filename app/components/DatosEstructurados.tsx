/**
 * Inserta los datos estructurados en la página.
 *
 * Es un bloque invisible para quien lee: solo lo consultan Google y demás
 * buscadores para entender de qué trata la página.
 */
export default function DatosEstructurados({ datos }: { datos: unknown }) {
  if (!datos) return null;

  return (
    <script
      type="application/ld+json"
      // El contenido lo generamos nosotros a partir del editor, no viene de
      // fuera. Se escapa el cierre de etiqueta por si algún texto lo
      // contiene.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(datos).replace(/</g, '\\u003c'),
      }}
    />
  );
}
