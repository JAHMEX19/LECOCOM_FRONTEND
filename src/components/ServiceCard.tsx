import { ClockIcon, SparklesIcon } from "@heroicons/react/16/solid";
import type { Servicio } from "../types";


export default function ServiceCard({ servicio }: { servicio: Servicio }) {
  return (
    <div className="group relative bg-white border border-stone-100 p-8 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:shadow-stone-200/50 hover:-translate-y-2 flex flex-col h-full">
      
      {/* Icono decorativo según categoría */}
      <div className="mb-6 w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center text-[#2897A3] group-hover:bg-[#2897A3] group-hover:text-white transition-colors duration-500">
        <SparklesIcon className="h-6 w-6" />
      </div>

      <div className="flex-1">
        <p className="text-[9px] uppercase tracking-[0.2em] text-[#B5A447] font-bold mb-2">
          {servicio.group}
        </p>
        <h3 className="text-xl font-bold text-stone-800 mb-3 group-hover:text-[#2897A3] transition-colors">
          {servicio.name}
        </h3>
        <p className="text-sm text-stone-500 leading-relaxed font-light">
          {servicio.description || "Una experiencia única diseñada para tu bienestar y relajación." }
        </p>
      </div>

      {/* Footer de la tarjeta con info técnica */}
      <div className="mt-8 pt-6 border-t border-stone-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center text-stone-400">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span className="text-[11px] font-bold">{servicio.duration} min</span>
          </div>
          {/*<div className="flex items-center text-stone-600">
            <BanknotesIcon className="h-4 w-4 mr-1 text-[#2897A3]" />
            <span className="text-sm font-bold">${servicio.price}</span>
          </div>*/}
        </div>

        <button className="text-[10px] uppercase tracking-widest font-bold text-[#B5A447] hover:text-[#2897A3] transition-colors">
          Reservar →
        </button>
      </div>
    </div>
  )
}
