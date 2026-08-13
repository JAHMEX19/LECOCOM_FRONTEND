import type { Promocion } from "../types";
import { XMarkIcon } from "@heroicons/react/24/outline";

type PromotionModalProps = {
  promo: Promocion;
  onClose: () => void;
};

export default function PromotionModal({ promo, onClose }: PromotionModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Fondo desenfocado */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={onClose} 
      />

      {/* Contenido Blanco */}
      <div className="relative bg-white w-full max-w-6xl rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in duration-300">
        
        {/* Botón de cerrar con mejor contraste */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 z-50 p-2 bg-stone-100/80 hover:bg-[#2897A3] hover:text-white backdrop-blur-xl rounded-full text-stone-500 transition-all duration-300 shadow-sm"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        {/* CONTENEDOR DE IMAGEN MODIFICADO */}
        <div className="md:w-1/2 h-[350px] md:h-[650px] bg-stone-50 flex items-center justify-center p-4 md:p-8">
          <img 
            src={promo.image} 
            className="w-full h-full object-contain drop-shadow-xl" // Usamos object-contain para verla completa
            alt={promo.title} 
          />
        </div>

        {/* Texto */}
        <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white border-l border-stone-50">
          <div className="space-y-2 mb-8">
            <span className="text-[10px] tracking-[0.5em] text-[#B5A447] font-bold uppercase block">
                Le Cocom Exclusive
            </span>
            <div className="h-0.5 w-8 bg-[#2897A3]" />
          </div>

          <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-8 tracking-tight leading-tight">
            {promo.title}
          </h2>

          <p className="text-stone-500 text-[14px] leading-loose font-light mb-12 italic">
            {promo.description}
          </p>

          <button 
            className="w-full py-5 bg-stone-900 text-white text-[11px] tracking-[0.4em] font-bold uppercase rounded-full hover:bg-[#2897A3] transition-all duration-700 shadow-xl shadow-stone-200 active:scale-95"
          >
            Reservar Ahora
          </button>
        </div>
      </div>
    </div>
  );
}