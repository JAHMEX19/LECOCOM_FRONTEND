import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getServiciosClients } from "../api/LeCocomApi";
import LoadingHeader from "../components/LoadingHeader";
import ServiceCard from "../components/ServiceCard";

export default function ServiciosView() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");

  const { data, isLoading, isError, isRefetching } = useQuery({
    queryKey: ["serviciosclients"],
    queryFn: getServiciosClients,
    staleTime: 0, // Fuerza a que los datos se consideren "viejos" inmediatamente
    refetchOnMount: "always", // Refresca cada vez que entras a la vista
    refetchOnWindowFocus: true // Refresca si vuelves de otra pestaña
  });

  if (isLoading) return <LoadingHeader />;
  if (isError) return <p className="text-center py-10 text-stone-500">Error al cargar el catálogo.</p>;

  const serviciosActivos = data?.filter((s) => s.enabled) || [];
  const categorias = ["todos", ...new Set(serviciosActivos.map((s) => s.group))];
  const serviciosFiltrados = categoriaSeleccionada === "todos" 
    ? serviciosActivos 
    : serviciosActivos.filter(s => s.group === categoriaSeleccionada);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Indicador de actualización en progreso */}
      {isRefetching && (
        <div className="fixed top-24 right-8 bg-white/80 border border-[#2897A3]/20 px-4 py-1 rounded-full shadow-sm z-50">
           <p className="text-[9px] text-[#2897A3] font-bold animate-pulse uppercase tracking-widest">Sincronizando...</p>
        </div>
      )}

      <header className="text-center mb-8">
        <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#B5A447] font-bold mb-3">Experiencias Le Cocom</h2>
        <h1 className="text-4xl font-light text-stone-800 tracking-tight">
          Nuestra <span className="font-serif italic text-[#2897A3]">Selección</span>
        </h1>
        <div className="mt-4 w-12 h-[1px] bg-stone-300 mx-auto"></div>
      </header>

      <nav className="flex flex-wrap justify-center gap-4 mb-16">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all duration-300 border ${
              categoriaSeleccionada === cat
                ? "bg-[#2897A3] border-[#2897A3] text-white shadow-lg shadow-[#2897A3]/20"
                : "bg-transparent border-stone-200 text-stone-400 hover:border-[#B5A447]/50 hover:text-[#B5A447]"
            }`}
          >
            {cat === "todos" ? "Ver Todo" : cat}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {serviciosFiltrados.map((servicio) => (
          <ServiceCard key={servicio.handle} servicio={servicio} />
        ))}
      </div>
    </div>
  );
}