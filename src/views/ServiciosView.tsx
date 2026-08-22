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
    <div className="w-full py-40 text-center font-serif italic text-2xl sm:text-3xl text-stone-400">
      Ocurrió un error al conectar con el santuario.
    </div>
  );

  const serviciosActivos = data?.filter((s) => s.enabled) || [];
  const categorias = ["todos", ...new Set(serviciosActivos.map((s) => s.group))];
  const serviciosFiltrados = categoriaSeleccionada === "todos" 
    ? serviciosActivos 
    : serviciosActivos.filter(s => s.group === categoriaSeleccionada);

  return (
    <div className="w-full bg-[#FCFAF8] text-stone-800 overflow-x-hidden space-y-20 sm:space-y-28 py-12 sm:py-20 px-6 sm:px-12 lg:px-20">
      
      {/* 1. HEADER DE SECCIÓN */}
      <header className="text-center space-y-6 sm:space-y-8 animate-fadeIn max-w-7xl mx-auto">
        
        {/* BADGE ENCERRADO IGUAL QUE EN ABOUT US */}
        <div className="inline-block px-6 py-2.5 sm:px-8 sm:py-3 border border-stone-200 bg-white/60 backdrop-blur-md rounded-full shadow-sm">
          <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-[#D4C363] font-bold">
            Experiencias & Rituales
          </p>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-stone-800 tracking-tight leading-[1.1]">
          Nuestra <span className="font-serif italic text-[#2897A3] font-normal">Selección</span>
        </h1>

        <p className="max-w-5xl mx-auto text-stone-700 text-xl sm:text-2xl md:text-3xl font-light italic leading-relaxed tracking-wide drop-shadow-sm">
          "Un catálogo de terapias diseñadas para restaurar tu equilibrio interior y armonía absoluta."
        </p>
      </header>

      {/* 2. FILTROS DE CATEGORÍA */}
      <nav className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 max-w-6xl mx-auto">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={`px-8 py-3.5 sm:px-10 sm:py-4 rounded-full text-xs sm:text-sm uppercase tracking-[0.25em] font-bold transition-all duration-500 border ${
              categoriaSeleccionada === cat
                ? "bg-stone-900 border-stone-900 text-white shadow-xl scale-105"
                : "bg-white border-stone-200/80 text-stone-500 hover:border-[#D4C363] hover:text-stone-900 hover:shadow-md"
            }`}
          >
            {cat === "todos" ? "Ver Todo" : cat}
          </button>
        ))}
      </nav>

      {/* 3. GRID BENTO RESPONSIVO */}
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-10 auto-rows-[380px] sm:auto-rows-[420px]">
        {serviciosFiltrados.map((servicio, index) => {
          const isHuge = index % 10 === 0;
          const isWide = index % 10 === 3 || index % 10 === 7;

          return (
            <div 
              key={servicio.handle}
              className={`
                ${isHuge ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
                ${isWide ? "sm:col-span-2 lg:col-span-2 lg:row-span-1" : "col-span-1"}
                transition-all duration-700 hover:-translate-y-1
              `}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <ServiceCard 
                servicio={servicio} 
                onClick={() => setSelectedService(servicio)} 
              />
            </div>
          );
        })}
      </div>

      {/* 4. MENSAJE SIN RESULTADOS */}
      {serviciosFiltrados.length === 0 && (
        <div className="text-center py-32 bg-white rounded-[3rem] border border-stone-200/60 shadow-sm max-w-4xl mx-auto">
          <p className="text-stone-500 font-serif text-2xl sm:text-3xl italic">
            No se encontraron rituales en esta categoría.
          </p>
        </div>
      )}

      {/* MODAL DE SERVICIO */}
      {selectedService && (
        <ServiceModal servicio={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </div>
  );
}