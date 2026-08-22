import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPromotions } from "../api/LeCocomApi";
import LoadingHeader from "../components/LoadingHeader";
import { SparklesIcon, XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Navigate } from "react-router-dom";
import type { Promocion } from "../types";

// --- COMPONENTE INTERNO: MODAL DE DETALLES DE PROMOCIÓN ---
type PromotionModalProps = {
  promo: Promocion;
  onClose: () => void;
};

function PromotionModal({ promo, onClose }: PromotionModalProps) {
  const whatsappUrl = `https://wa.me/529381514024?text=${encodeURIComponent(
    `Hola, me gustaría agendar la promoción exclusiva: ${promo.title}`
  )}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-md animate-fadeIn" 
        onClick={onClose} 
      />

      <div className="relative bg-white w-full max-w-5xl rounded-[3rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fadeIn z-10 max-h-[90vh] overflow-y-auto md:overflow-y-visible">
        {/* Botón Cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 bg-white/80 hover:bg-[#2897A3] hover:text-white backdrop-blur-md rounded-full text-stone-600 transition-all duration-300 shadow-md"
          aria-label="Cerrar modal"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Imagen Modal */}
        <div className="md:w-1/2 bg-stone-50 flex items-center justify-center p-8 sm:p-12 min-h-[300px] md:min-h-[500px]">
          <img 
            src={promo.image} 
            className="w-full h-full object-contain max-h-[400px] drop-shadow-xl" 
            alt={promo.title} 
          />
        </div>

        {/* Contenido Modal */}
        <div className="md:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-between bg-white space-y-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4C363] font-black block">
              Beneficio Exclusivo
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-stone-800 tracking-tight leading-tight font-serif italic">
              {promo.title}
            </h2>
            <div className="h-1 w-16 bg-[#2897A3] rounded-full" />
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-normal pt-2">
              {promo.description}
            </p>
          </div>

          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-5 bg-[#D4C363] text-stone-950 text-xs sm:text-sm tracking-[0.25em] font-bold uppercase rounded-full hover:bg-stone-900 hover:text-white transition-all duration-500 shadow-xl shadow-[#D4C363]/20 text-center block"
          >
            Reservar Promoción
          </a>
        </div>
      </div>
    </div>
  );
}

// --- VISTA PRINCIPAL ---
export default function PromotionsView() {
  const [selectedPromo, setSelectedPromo] = useState<Promocion | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["promotions-public"],
    queryFn: getPromotions,
  });

  const activePromotions = data?.filter(promo => promo.enabled) || [];

  if (isLoading) return <LoadingHeader />;
  if (isError) return <Navigate to="/" />;

  return (
    <div className="w-full bg-[#FCFAF8] text-stone-800 overflow-x-hidden space-y-20 sm:space-y-28 py-12 sm:py-20 px-6 sm:px-12 lg:px-20 min-h-screen">
      
      {/* 1. HEADER DE SECCIÓN */}
      <header className="text-center space-y-6 sm:space-y-8 animate-fadeIn max-w-7xl mx-auto">
        
        {/* BADGE ENCERRADO */}
        <div className="inline-block px-6 py-2.5 sm:px-8 sm:py-3 border border-stone-200 bg-white/60 backdrop-blur-md rounded-full shadow-sm">
          <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-[#D4C363] font-bold">
            Beneficios Exclusivos
          </p>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-stone-800 tracking-tight leading-[1.1]">
          Promociones <span className="font-serif italic text-[#2897A3] font-normal">Lifestyle</span>
        </h1>

        <p className="max-w-5xl mx-auto text-stone-700 text-xl sm:text-2xl md:text-3xl font-light italic leading-relaxed tracking-wide drop-shadow-sm">
          "Descubre beneficios exclusivos diseñados para elevar tu bienestar y armonía integral."
        </p>
      </header>

      {/* 2. GRID DE PROMOCIONES */}
      <main className="w-full max-w-[1600px] mx-auto">
        {activePromotions.length === 0 ? (
          <div className="text-center py-32 border border-stone-200/80 rounded-[3rem] bg-white shadow-sm max-w-4xl mx-auto space-y-3">
            <p className="text-stone-500 font-serif text-2xl sm:text-3xl italic">
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
                {/* IMAGEN DE TARJETA */}
                <div className="relative h-80 sm:h-96 overflow-hidden bg-stone-50">
                  <img 
                    src={promo.image} 
                    alt={promo.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                  <div className="absolute top-6 right-6 z-20">
                    <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-md group-hover:bg-[#2897A3] transition-colors duration-500">
                      <SparklesIcon className="h-5 w-5 text-[#2897A3] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>

                {/* CONTENIDO TARJETA */}
                <div className="p-8 sm:p-10 flex flex-col flex-grow text-center items-center justify-between space-y-6">
                  <div className="space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-light text-stone-800 tracking-tight group-hover:text-[#2897A3] transition-colors duration-300">
                      {promo.title}
                    </h2>
                    <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-normal italic line-clamp-3">
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