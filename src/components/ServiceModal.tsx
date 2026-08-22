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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Fondo con desenfoque profundo */}
      <div 
        className="absolute inset-0 bg-stone-950/90 backdrop-blur-xl animate-in fade-in duration-500" 
        onClick={onClose} 
      />

      <div className="relative bg-white w-full max-w-6xl rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in duration-300 border border-white/10">
        
        {/* Botón de cerrar flotante y minimalista */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-50 p-4 bg-stone-900/50 hover:bg-[#2897A3] text-white backdrop-blur-xl rounded-full transition-all duration-300 shadow-xl border border-white/10"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* LADO IZQUIERDO: Imagen con Panel de Título "Glass" */}
        <div className="md:w-5/12 relative min-h-[450px] flex flex-col justify-end overflow-hidden">
          <img 
            src={imageUrl} 
            className="absolute inset-0 w-full h-full object-cover" 
            alt={servicio.name}
          />
          
          {/* Overlay de contraste para la imagen */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent" />
          
          {/* Panel de Título Encajonado (Glassmorphism) */}
          <div className="relative z-10 m-6 p-8 bg-black/60 backdrop-blur-xl rounded-[2.5rem] border border-white/10 text-center">
            <div className="mb-6 w-16 h-16 bg-[#D4C363]/20 border border-[#D4C363]/30 rounded-2xl mx-auto flex items-center justify-center text-[#D4C363]">
              <SparklesIcon className="h-8 w-8" />
            </div>
            <span className="text-xs tracking-[0.6em] text-[#D4C363] font-black uppercase mb-3 block">
              {servicio.group}
            </span>
            <h2 className="text-4xl font-serif italic text-white tracking-tight mb-6 leading-tight">
              {servicio.name}
            </h2>
            <div className="inline-flex items-center gap-4 py-3 px-6 bg-white rounded-full text-stone-900 font-black text-[11px] uppercase tracking-widest shadow-xl">
              <ClockIcon className="h-4 w-4 text-[#2897A3]" />
              {servicio.duration} Minutos
            </div>
          </div>
        </div>

        {/* LADO DERECHO: Información Detallada */}
        <div className="md:w-7/12 p-12 md:p-20 flex flex-col justify-center bg-white">
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-sm uppercase tracking-[0.6em] text-[#2897A3] font-black flex items-center gap-4">
                <span className="h-[2px] w-12 bg-[#2897A3]" />
                La Experiencia
              </h3>
              {/* Texto más grande, con mejor interlineado e itálica elegante */}
              <p className="text-stone-600 text-xl md:text-2xl leading-[1.8] font-light italic">
                {servicio.description || "Un viaje sensorial diseñado meticulosamente para restaurar la paz interior y revitalizar cada sentido en nuestro santuario privado."}
              </p>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => window.location.href = `https://wa.me/529381514024?text=Hola,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20sus%20servicios%20${servicio.name}`}
                className="w-full py-7 bg-stone-900 text-white text-sm tracking-[0.4em] font-black uppercase rounded-[2rem] hover:bg-[#D4C363] transition-all duration-700 shadow-2xl shadow-stone-300 active:scale-[0.97] flex items-center justify-center gap-4 group"
              >
                <span>Reservar</span>
                <div className="h-[1px] w-8 bg-white/30 group-hover:w-12 transition-all" />
              </button>
              
              <p className="text-center mt-6 text-stone-400 text-[10px] uppercase tracking-[0.2em]">
                Sujeto a disponibilidad • Le Cocom Spa
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}