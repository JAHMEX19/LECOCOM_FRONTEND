export default function LoadingHeader() {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO SKELETON (Mantiene la estructura mientras carga) */}
        <div className="flex items-center gap-3 opacity-40">
          <div className="h-9 w-9 bg-stone-100 rounded-full animate-pulse" />
          <div className="flex flex-col gap-1">
            <div className="h-3 w-20 bg-stone-100 rounded animate-pulse" />
            <div className="h-2 w-10 bg-stone-100 rounded animate-pulse" />
          </div>
        </div>

        {/* INDICADOR DE CARGA ESTILIZADO */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-light">
            Preparando tu <span className="text-[#2897A3] font-medium animate-pulse">bienestar</span>
          </span>
          
          {/* Puntos de carga en Dorado */}
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#B5A447]/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-[#B5A447]/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-[#B5A447] rounded-full animate-bounce"></span>
          </div>
        </div>

      </div>

      {/* BARRA DE PROGRESO INFINITA (Opcional, muy fina al fondo del header) */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden">
        <div className="w-full h-full bg-[#2897A3]/10 absolute"></div>
        <div className="w-1/3 h-full bg-[#2897A3] absolute animate-[loading_2s_infinite_ease-in-out]"></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}} />
    </header>
  );
}