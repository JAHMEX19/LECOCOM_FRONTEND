import { PlusIcon } from "@heroicons/react/24/outline";
import type { Servicio } from "../types";

export default function ServiceCard({ servicio, onClick }: { servicio: Servicio, onClick: () => void }) {
  const imageUrl = servicio.image || "https://images.unsplash.com/photo-1544161515-4508f5ad4c24?q=80&w=1000";

  return (
    <div 
      onClick={onClick}
      className="group relative cursor-pointer rounded-[3rem] transition-all duration-700 hover:shadow-2xl hover:shadow-[#2897A3]/40 hover:-translate-y-2 flex flex-col h-full overflow-hidden bg-stone-900 border border-stone-800"
    >
      {/* Imagen de fondo con opacidad baja para resaltar el texto */}
      <div className="absolute inset-0 z-0">
        <img 
          src={imageUrl} 
          alt={servicio.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/30 to-transparent" />
      </div>

      {/* Contenido: Alineado abajo para tarjetas grandes */}
      <div className="relative z-10 flex-1 flex flex-col p-8 md:p-10 justify-end">
        
        <div className="mb-4">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#D4C363] font-black">
            {servicio.group}
          </span>
        </div>
        
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-tighter leading-none mb-6 group-hover:text-[#2897A3] transition-colors duration-500 line-clamp-2">
          {servicio.name}
        </h3>

        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] tracking-[0.3em] font-bold text-white/30 uppercase mb-1">Ritual</span>
            <span className="text-sm font-medium text-white/70">{servicio.duration} Min</span>
          </div>
          
          <div className="h-14 w-14 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md transition-all duration-700 group-hover:bg-[#2897A3] group-hover:rotate-90">
            <PlusIcon className="h-7 w-7 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}