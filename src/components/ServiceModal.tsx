import { XMarkIcon } from "@heroicons/react/24/outline";
import { ClockIcon, SparklesIcon } from "@heroicons/react/16/solid";
import type { Servicio } from "../types";

type ServiceModalProps = {
  servicio: Servicio;
  onClose: () => void;
};

export default function ServiceModal({ servicio, onClose }: ServiceModalProps) {
  const imageUrl = servicio.image || "https://images.unsplash.com/photo-1544161515-4508f5ad4c24?q=80&w=1000";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Fondo con desenfoque profundo */}
      <div 
        className="fixed inset-0 bg-stone-950/90 backdrop-blur-xl animate-in fade-in duration-500" 
        onClick={onClose} 
      />

      {/* Contenedor Modal con scroll interno para pantallas pequeñas */}
      <div className="relative bg-white w-full max-w-6xl rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in duration-300 border border-white/10 my-auto z-10 max-h-[90vh] overflow-y-auto md:overflow-y-visible">
        
        {/* Botón de cerrar flotante */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3.5 bg-stone-900/60 hover:bg-[#2897A3] text-white backdrop-blur-xl rounded-full transition-all duration-300 shadow-xl border border-white/10"
          aria-label="Cerrar modal"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* LADO IZQUIERDO: Imagen */}
        <div className="md:w-5/12 relative min-h-[350px] md:min-h-[500px] flex flex-col justify-end overflow-hidden shrink-0">
          <img 
            src={imageUrl} 
            className="absolute inset-0 w-full h-full object-cover" 
            alt={servicio.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
          
          <div className="relative z-10 m-6 p-6 sm:p-8 bg-black/60 backdrop-blur-xl rounded-[2rem] border border-white/10 text-center">
            <div className="mb-4 w-12 h-12 sm:w-16 sm:h-16 bg-[#D4C363]/20 border border-[#D4C363]/30 rounded-2xl mx-auto flex items-center justify-center text-[#D4C363]">
              <SparklesIcon className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <span className="text-[10px] sm:text-xs tracking-[0.5em] text-[#D4C363] font-black uppercase mb-2 block">
              {servicio.group}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif italic text-white tracking-tight mb-4 leading-tight">
              {servicio.name}
            </h2>
            <div className="inline-flex items-center gap-3 py-2.5 px-5 bg-white rounded-full text-stone-900 font-bold text-[10px] sm:text-xs uppercase tracking-widest shadow-xl">
              <ClockIcon className="h-4 w-4 text-[#2897A3]" />
              {servicio.duration} Minutos
            </div>
          </div>
        </div>

        {/* LADO DERECHO: Información Detallada */}
        <div className="md:w-7/12 p-8 sm:p-12 md:p-16 flex flex-col justify-between bg-white overflow-y-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs sm:text-sm uppercase tracking-[0.5em] text-[#2897A3] font-black flex items-center gap-3">
                <span className="h-[2px] w-10 bg-[#2897A3]" />
                La Experiencia
              </h3>
              <p className="text-stone-600 text-lg sm:text-xl md:text-2xl leading-[1.8] font-light italic">
                {servicio.description || "Un viaje sensorial diseñado meticulosamente para restaurar la paz interior y revitalizar cada sentido en nuestro santuario privado."}
              </p>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => window.location.href = `https://wa.me/529381514024?text=Hola,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20el%20servicio:%20${encodeURIComponent(servicio.name)}`}
                className="w-full py-5 sm:py-6 bg-stone-900 text-white text-xs sm:text-sm tracking-[0.3em] font-bold uppercase rounded-[1.5rem] sm:rounded-[2rem] hover:bg-[#D4C363] hover:text-stone-950 transition-all duration-500 shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 group"
              >
                <span>Reservar Servicio</span>
                <div className="h-[1px] w-6 bg-white/40 group-hover:bg-stone-950 group-hover:w-10 transition-all" />
              </button>
              
              <p className="text-center mt-4 text-stone-400 text-[10px] uppercase tracking-[0.2em]">
                Sujeto a disponibilidad • Le Cocom Spa
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}