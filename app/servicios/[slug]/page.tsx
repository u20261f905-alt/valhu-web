'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  slug: string;
  orden: number;
  imagen: string;
  tags: string[];
  categoria: string;
  activo: boolean;
}

export default function ServicioPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [servicio, setServicio] = useState<Servicio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchServicio();
  }, [slug]);

  const fetchServicio = async () => {
    try {
      const { data, error } = await supabase
        .from('servicios')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setServicio(data);
    } catch (error) {
      console.error('Error fetching servicio:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-24">Cargando...</div>;
  }

  if (!servicio) {
    return (
      <div className="text-center py-24">
        <p className="text-[18px] text-[#525866] mb-6">Servicio no encontrado</p>
        <Link href="/" className="text-[#0066CC] hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full">
      {/* HEADER DEL SERVICIO */}
      <section className="w-full py-[60px] bg-gradient-to-r from-[#EFF8FD] to-[#F5F6F9]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-8">
          <Link href="/" className="text-[#0066CC] hover:underline mb-6 inline-block">
            ← Volver
          </Link>
          
          <h1 className="text-[48px] md:text-[56px] font-bold text-[#141821] mb-4">
            {servicio.nombre}
          </h1>
          
          <p className="text-[18px] text-[#525866] mb-8 max-w-[700px]">
            {servicio.descripcion}
          </p>

          <div className="flex flex-wrap gap-3">
            {servicio.tags.map((tag, idx) => (
              <span key={idx} className="px-4 py-2 bg-white text-[#0066CC] border border-[#D0D5DD] rounded-[8px] text-[14px]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGEN PRINCIPAL */}
      <section className="w-full py-[40px]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-8">
          <div className="relative w-full h-[400px] md:h-[600px] rounded-[16px] overflow-hidden">
            <Image
              src={servicio.imagen}
              alt={servicio.nombre}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section className="w-full py-[60px] bg-[#F5F6F9]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* CONTENIDO IZQUIERDO */}
            <div className="lg:col-span-2">
              <h2 className="text-[32px] font-bold text-[#141821] mb-6">
                Sobre este servicio
              </h2>
              
              <p className="text-[16px] text-[#525866] mb-6 leading-[1.8]">
                {servicio.descripcion}
              </p>

              <h3 className="text-[24px] font-bold text-[#141821] mb-4 mt-12">
                ¿Por qué elegirnos?
              </h3>
              
              <ul className="space-y-4">
                {[
                  'Experiencia comprobada en proyectos similares',
                  'Equipo especializado y dedicado',
                  'Resultados medibles y ROI positivo',
                  'Soporte continuo y optimización',
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-[16px] text-[#525866]">
                    <span className="text-[#0066CC] font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* SIDEBAR DERECHO */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[16px] p-8 sticky top-20">
                <h3 className="text-[20px] font-bold text-[#141821] mb-4">
                  {servicio.categoria}
                </h3>
                
                <p className="text-[14px] text-[#525866] mb-6">
                  Categoría de servicio especializado
                </p>

                <button className="w-full px-6 py-3 bg-[#0066CC] text-white font-bold rounded-[8px] hover:bg-[#0052A3] transition-colors mb-4">
                  Solicitar consulta
                </button>

                <Link
                  href="/"
                  className="w-full block text-center px-6 py-3 border border-[#D0D5DD] text-[#141821] font-bold rounded-[8px] hover:bg-[#F5F6F9] transition-colors"
                >
                  Ver otros servicios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
