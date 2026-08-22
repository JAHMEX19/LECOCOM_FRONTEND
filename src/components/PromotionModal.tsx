import type { Promocion } from "../types";
import { XMarkIcon } from "@heroicons/react/24/outline";

type PromotionModalProps = {
  promo: Promocion;
  onClose: () => void;
};

export default function PromotionModal({ promo, onClose }: PromotionModalProps) {
  const whatsappUrl = `https://wa.me/529381514024?text=${encodeURIComponent(
    `Hola, me gustaría agendar la promoción exclusiva: ${promo.title}`
  )}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Fondo desenfocado */}
      <div 
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={onClose} 
      />

      {/* Contenido Modal con Scroll Interno Habilitado */}
      <div className="relative bg-white w-full max-w-5xl rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in duration-300 my-auto z-10 max-h-[90vh] overflow-y-auto md:overflow-y-visible border border-stone-100">
        
        {/* Botón de cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-3 bg-white/80 hover:bg-[#2897A3] hover:text-white backdrop-blur-xl rounded-full text-stone-600 transition-all duration-300 shadow-md border border-stone-200/50"
          aria-label="Cerrar modal"
        >
          <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* CONTENEDOR DE IMAGEN (Adaptable en móvil) */}
        <div className="md:w-1/2 min-h-[220px] sm:min-h-[300px] md:min-h-[500px] bg-stone-50 flex items-center justify-center p-6 sm:p-10 shrink-0">
          <img 
            src={promo.image} 
            className="w-full h-full object-contain max-h-[350px] sm:max-h-[400px] drop-shadow-xl" 
            alt={promo.title} 
          />
        </div>

        {/* TEXTO Y BOTÓN */}
        <div className="md:w-1/2 p-6 sm:p-10 md:p-14 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-stone-100 overflow-y-auto">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] text-[#D4C363] font-black uppercase block">
                Le Cocom Exclusive
              </span>
              <div className="h-1 w-12 bg-[#2897A3] rounded-full" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-stone-800 tracking-tight leading-tight pt-2 font-serif italic">
                {promo.title}
              </h2>
            </div>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-normal italic">
              {promo.description}
            </p>

            <div className="pt-2 sm:pt-4">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 sm:py-5 bg-[#D4C363] text-stone-950 text-xs sm:text-sm tracking-[0.25em] font-bold uppercase rounded-full hover:bg-stone-900 hover:text-white transition-all duration-500 shadow-xl shadow-[#D4C363]/20 text-center block active:scale-[0.98]"
              >
                Reservar Promoción
              </a>
              
              <p className="text-center mt-3 text-stone-400 text-[10px] uppercase tracking-[0.2em]">
                Sujeto a disponibilidad • Le Cocom Spa
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}