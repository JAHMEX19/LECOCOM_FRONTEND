import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getServiciosClients } from "../api/LeCocomApi";
import LoadingHeader from "../components/LoadingHeader";
import ServiceCard from "../components/ServiceCard";
import ServiceModal from "../components/ServiceModal";
import type { Servicio } from "../types";

export default function ServiciosView() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [selectedService, setSelectedService] = useState<Servicio | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["serviciosclients"],
    queryFn: getServiciosClients,
    staleTime: 60000,
  });

  if (isLoading) return <LoadingHeader />;
  if (isError) return (
    <div className="py-60 text-center font-serif italic text-3xl text-stone-400">
      Ocurrió un error al conectar con el santuario.
    </div>
  );

  const serviciosActivos = data?.filter((s) => s.enabled) || [];
  const categorias = ["todos", ...new Set(serviciosActivos.map((s) => s.group))];
  const serviciosFiltrados = categoriaSeleccionada === "todos" 
    ? serviciosActivos 
    : serviciosActivos.filter(s => s.group === categoriaSeleccionada);

  return (
    /* Eliminamos max-w-7xl para usar el ancho de 1600px definido en el main del Header */
    <div className="w-full space-y-32">
      
      {/* HEADER DE SECCIÓN: Escalado para impacto visual */}
      <header className="text-center space-y-10 animate-in fade-in slide-in-from-top-10 duration-1000">
        <div className="flex justify-center items-center gap-6 mb-2">
          <div className="h-[1px] w-16 bg-stone-200" />
          <span className="text-[13px] tracking-[0.8em] text-[#B5A447] font-black uppercase">
            Experiencias
          </span>
          <div className="h-[1px] w-16 bg-stone-200" />
        </div>
        
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-light text-stone-800 tracking-tighter leading-[0.9]">
          Nuestra <span className="font-serif italic text-[#2897A3]">Selección</span>
        </h1>
        
        <p className="max-w-3xl mx-auto text-stone-400 text-xl md:text-2xl font-light italic leading-relaxed">
          "Un catálogo de terapias diseñadas para restaurar tu equilibrio interior y armonía absoluta."
        </p>
      </header>

      {/* FILTROS: Normalizados con text-[12px] y tracking alto */}
      <nav className="flex flex-wrap justify-center gap-5">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={`px-12 py-5 rounded-full text-[12px] uppercase tracking-[0.4em] font-black transition-all duration-700 border shadow-sm ${
              categoriaSeleccionada === cat
                ? "bg-stone-900 border-stone-900 text-white shadow-2xl scale-110"
                : "bg-white border-stone-100 text-stone-400 hover:border-[#B5A447] hover:text-[#B5A447] hover:shadow-md"
            }`}
          >
            {cat === "todos" ? "Ver Todo" : cat}
          </button>
        ))}
      </nav>

      {/* GRID BENTO: Ajustado a 5 columnas (XL) con mayor espacio (gap-10) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 auto-rows-[400px]">
        {serviciosFiltrados.map((servicio, index) => {
          const isHuge = index % 10 === 0;
          const isWide = index % 10 === 3 || index % 10 === 7;

          return (
            <div 
              key={servicio.handle}
              className={`
                ${isHuge ? "lg:col-span-2 lg:row-span-2" : ""}
                ${isWide ? "lg:col-span-2 lg:row-span-1" : "lg:col-span-1"}
                transition-all duration-1000 animate-in zoom-in-95
              `}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <ServiceCard 
                servicio={servicio} 
                onClick={() => setSelectedService(servicio)} 
              />
            </div>
          );
        })}
      </div>

      {/* Mensaje de "Sin resultados" normalizado */}
      {serviciosFiltrados.length === 0 && (
        <div className="text-center py-40">
          <p className="text-stone-300 font-serif text-3xl italic">
            No se encontraron rituales en esta categoría.
          </p>
        </div>
      )}

      {selectedService && (
        <ServiceModal servicio={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </div>
  );
}