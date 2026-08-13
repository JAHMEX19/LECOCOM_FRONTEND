import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPromotions } from "../api/LeCocomApi";
import LoadingHeader from "../components/LoadingHeader";
import { SparklesIcon, XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Navigate } from "react-router-dom";
import type { Promocion } from "../types";

// --- COMPONENTE INTERNO: MODAL DE DETALLES (NORMALIZADO) ---
type PromotionModalProps = {
  promo: Promocion;
  onClose: () => void;
};

function PromotionModal({ promo, onClose }: PromotionModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={onClose} 
      />

      <div className="relative bg-white w-full max-w-6xl rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-50 p-2.5 bg-stone-100/80 hover:bg-[#2897A3] hover:text-white backdrop-blur-xl rounded-full text-stone-500 transition-all duration-300"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="md:w-1/2 h-[400px] md:h-[700px] bg-stone-50 flex items-center justify-center p-8 md:p-12">
          <img 
            src={promo.image} 
            className="w-full h-full object-contain drop-shadow-2xl" 
            alt={promo.title} 
          />
        </div>

        <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-white">
          <div className="space-y-3 mb-10">
            <span className="text-[12px] tracking-[0.6em] text-[#B5A447] font-black uppercase block">
              Le Cocom Exclusive
            </span>
            <div className="h-1 w-12 bg-[#2897A3]" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-10 tracking-tighter leading-tight font-serif italic">
            {promo.title}
          </h2>

          <p className="text-stone-500 text-base md:text-lg leading-loose font-light mb-12 italic">
            {promo.description}
          </p>

          <button 
            onClick={() => window.location.href = 'https://wa.me/tu-numero-aqui'}
            className="w-full py-6 bg-stone-900 text-white text-[12px] tracking-[0.4em] font-black uppercase rounded-full hover:bg-[#2897A3] transition-all duration-700 shadow-2xl shadow-stone-200 active:scale-95"
          >
            Reservar Ahora
          </button>
        </div>
      </div>
    </div>
  );
}

// --- VISTA PRINCIPAL (NORMALIZADA A 1600PX) ---
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
    /* max-w-[1600px] para empalmar con Header y Servicios */
    <div className="min-h-screen bg-transparent py-12 px-2 selection:bg-[#2897A3]/10">
      
      {/* HEADER DE LA SECCIÓN ESCALADO */}
      <header className="max-w-[1600px] mx-auto text-center mb-28 space-y-8">
        <div className="flex justify-center items-center gap-4">
          <div className="h-[1px] w-12 bg-stone-200" />
          <span className="text-[12px] tracking-[0.8em] text-[#B5A447] font-black uppercase">
            Experiencias 
          </span>
          <div className="h-[1px] w-12 bg-stone-200" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-light text-stone-800 tracking-tighter leading-none">
          Promociones <span className="font-serif italic text-[#2897A3]">Lifestyle</span>
        </h1>
        
        <p className="max-w-3xl mx-auto text-stone-400 text-xl md:text-2xl font-light italic leading-relaxed">
          "Descubre beneficios exclusivos diseñados para elevar tu bienestar y armonía integral."
        </p>
      </header>

      {/* GRID DE PROMOCIONES - Bento Style (Opcional) o Grid Refinado */}
      <main className="max-w-[1600px] mx-auto">
        {activePromotions.length === 0 ? (
          <div className="text-center py-40 border border-dashed border-stone-200 rounded-[4rem] bg-white/30 animate-pulse">
            <p className="text-stone-300 text-[12px] tracking-[0.5em] uppercase font-black">
              Próximamente nuevas experiencias
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {activePromotions.map((promo: Promocion, index) => (
              <article 
                key={promo.handle} 
                onClick={() => setSelectedPromo(promo)}
                className="group cursor-pointer bg-white rounded-[3.5rem] overflow-hidden border border-stone-100 shadow-sm 
                           hover:scale-[1.02] hover:shadow-2xl hover:shadow-stone-200/60 
                           transition-all duration-700 ease-out flex flex-col h-full animate-in fade-in slide-in-from-bottom-10"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* IMAGEN ESCALADA */}
                <div className="relative h-96 overflow-hidden bg-stone-50">
                  <img 
                    src={promo.image} 
                    alt={promo.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute top-10 right-10 z-20">
                    <div className="bg-white/90 backdrop-blur-xl p-3 rounded-full shadow-lg group-hover:bg-[#2897A3] transition-colors duration-500">
                      <SparklesIcon className="h-5 w-5 text-[#2897A3] group-hover:text-white" />
                    </div>
                  </div>
                </div>

                {/* CONTENIDO TARJETA ESCALADO */}
                <div className="p-12 flex flex-col flex-grow text-center items-center justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-light text-stone-800 mb-6 tracking-tight group-hover:text-[#2897A3] transition-colors duration-500">
                      {promo.title}
                    </h2>
                    <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-10 font-light italic line-clamp-3">
                      {promo.description}
                    </p>
                  </div>
                  
                  <div className="w-full pt-8 border-t border-stone-50 flex items-center justify-between">
                    <span className="text-[11px] tracking-[0.4em] font-black text-stone-400 uppercase group-hover:text-[#B5A447] transition-all duration-300">
                      Descubrir más
                    </span>
                    <div className="h-14 w-14 rounded-full border border-stone-100 flex items-center justify-center group-hover:bg-stone-900 group-hover:border-stone-900 transition-all duration-700">
                      <PlusIcon className="h-6 w-6 text-stone-300 group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* RENDERIZADO DEL MODAL */}
      {selectedPromo && (
        <PromotionModal 
          promo={selectedPromo} 
          onClose={() => setSelectedPromo(null)} 
        />
      )}
    </div>
  );
}