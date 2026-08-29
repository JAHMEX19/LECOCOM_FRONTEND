import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPromotions } from "../api/LeCocomApi";
import LoadingHeader from "../components/LoadingHeader";
import { SparklesIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Navigate } from "react-router-dom";
import type { Promocion } from "../types";
import PromotionModal from "../components/PromotionModal";

export default function PromotionsView() {
  const [selectedPromo, setSelectedPromo] = useState<Promocion | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["promotions-public"],
    queryFn: getPromotions,
  });

  const activePromotions = data?.filter((promo) => promo.enabled) || [];

  if (isLoading) return <LoadingHeader />;
  if (isError) return <Navigate to="/" replace />;

  return (
    <div className="w-full bg-[#FCFAF8] text-stone-800 overflow-x-hidden space-y-16 sm:space-y-24 py-12 sm:py-20 px-6 sm:px-12 lg:px-20 min-h-screen">
      
      {/* 1. HEADER DE SECCIÓN */}
      <header className="text-center space-y-6 sm:space-y-8 animate-fadeIn max-w-7xl mx-auto">
        
        {/* BADGE ENCERRADO */}
        <div className="inline-block px-6 py-2.5 sm:px-8 sm:py-3 border border-stone-200/80 bg-white/70 backdrop-blur-md rounded-full shadow-sm">
          <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-[#D4C363] font-bold">
            Beneficios Exclusivos
          </p>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-stone-900 tracking-tight leading-[1.1]">
          Promociones <span className="font-serif italic text-[#2897A3] font-normal">Lifestyle</span>
        </h1>

        <p className="max-w-4xl mx-auto text-stone-600 text-lg sm:text-2xl md:text-3xl font-light italic leading-relaxed tracking-wide">
          "Descubre beneficios exclusivos diseñados meticulosamente para elevar tu bienestar y armonía integral."
        </p>
      </header>

      {/* 2. GRID DE PROMOCIONES */}
      <main className="w-full max-w-[1600px] mx-auto">
        {activePromotions.length === 0 ? (
          <div className="text-center py-28 px-6 border border-stone-200/80 rounded-[3rem] bg-white shadow-sm max-w-3xl mx-auto space-y-3">
            <p className="text-stone-700 font-serif text-2xl sm:text-3xl italic">
              Próximamente nuevas experiencias
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4C363] font-bold">
              Mantente atento a nuestros canales oficiales
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {activePromotions.map((promo: Promocion, index) => (
              <article 
                key={promo.handle} 
                onClick={() => setSelectedPromo(promo)}
                className="group cursor-pointer bg-white rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-stone-200/70 shadow-sm 
                           hover:-translate-y-2 hover:shadow-2xl hover:shadow-stone-300/40 
                           transition-all duration-500 flex flex-col justify-between h-full animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* IMAGEN DE TARJETA CON OVERLAY DE HIGHLIGHT */}
                <div className="relative h-72 sm:h-88 md:h-96 overflow-hidden bg-stone-50 shrink-0">
                  <img 
                    src={promo.image} 
                    alt={promo.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute top-6 right-6 z-20">
                    <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-full shadow-md group-hover:bg-[#2897A3] transition-colors duration-500">
                      <SparklesIcon className="h-5 w-5 text-[#2897A3] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>

                {/* CONTENIDO DE LA TARJETA */}
                <div className="p-8 sm:p-10 flex flex-col flex-grow text-center items-center justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4C363] font-bold">
                      Le Cocom Exclusive
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif italic text-stone-800 tracking-tight group-hover:text-[#2897A3] transition-colors duration-300 leading-snug">
                      {promo.title}
                    </h2>
                    <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal italic line-clamp-3">
                      "{promo.description}"
                    </p>
                  </div>

                  <div className="w-full pt-6 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.25em] font-bold text-stone-500 group-hover:text-[#D4C363] transition-colors">
                      Descubrir Más
                    </span>
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-stone-900 group-hover:border-stone-900 transition-all duration-500">
                      <PlusIcon className="h-5 w-5 text-stone-500 group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* MODAL DETALLES */}
      {selectedPromo && (
        <PromotionModal 
          promo={selectedPromo} 
          onClose={() => setSelectedPromo(null)} 
        />
      )}
    </div>
  );
}