import { SparklesIcon, HeartIcon, SunIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function HomeView() {
  return (
    <div className="space-y-24 pb-24">
      
      {/* 1. HERO SECTION: EL IMPACTO INICIAL */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Imagen de Fondo con Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80" 
            alt="Spa Atmosphere" 
            className="w-full h-full object-cover scale-105 animate-[slow-zoom_20s_infinite]"
          />
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 text-center space-y-8 px-4">
          <div className="inline-block px-4 py-1 border border-white/30 rounded-full backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[0.6em] text-white/90 font-light">
              Bienvenido al Santuario
            </p>
          </div>
          <h1 className="text-5xl md:text-8xl font-light text-white tracking-tighter leading-none">
            Renace en <br />
            <span className="font-serif italic text-[#B5A447]">Le Cocom Spa</span>
          </h1>
          <p className="max-w-xl mx-auto text-white/70 text-sm md:text-lg font-light tracking-wide leading-relaxed">
            Un espacio donde el tiempo se detiene y tu bienestar se convierte en nuestra única obra de arte.
          </p>
          <div className="pt-8">
            <button className="bg-white text-stone-800 px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#2897A3] hover:text-white transition-all duration-500 shadow-xl">
              Explorar Servicios
            </button>
          </div>
        </div>
      </section>

      {/* 2. LA PROMESA: TRES PILARES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6 text-center group">
            <div className="h-16 w-16 mx-auto bg-stone-50 rounded-3xl flex items-center justify-center border border-stone-100 group-hover:bg-[#2897A3]/10 transition-colors duration-500">
              <SparklesIcon className="h-7 w-7 text-[#B5A447]" />
            </div>
            <h3 className="text-[12px] uppercase tracking-[0.3em] font-bold text-stone-800">Renovación Total</h3>
            <p className="text-stone-400 text-xs leading-loose italic">
              Tratamientos diseñados para restaurar la luminosidad natural de tu piel y tu energía interior.
            </p>
          </div>

          <div className="space-y-6 text-center group">
            <div className="h-16 w-16 mx-auto bg-stone-50 rounded-3xl flex items-center justify-center border border-stone-100 group-hover:bg-[#2897A3]/10 transition-colors duration-500">
              <HeartIcon className="h-7 w-7 text-[#2897A3]" />
            </div>
            <h3 className="text-[12px] uppercase tracking-[0.3em] font-bold text-stone-800">Cuidado Holístico</h3>
            <p className="text-stone-400 text-xs leading-loose italic">
              No solo tratamos el cuerpo; armonizamos tu mente a través de aromas y sonidos ancestrales.
            </p>
          </div>

          <div className="space-y-6 text-center group">
            <div className="h-16 w-16 mx-auto bg-stone-50 rounded-3xl flex items-center justify-center border border-stone-100 group-hover:bg-[#2897A3]/10 transition-colors duration-500">
              <SunIcon className="h-7 w-7 text-[#B5A447]" />
            </div>
            <h3 className="text-[12px] uppercase tracking-[0.3em] font-bold text-stone-800">Santuario Exclusivo</h3>
            <p className="text-stone-400 text-xs leading-loose italic">
              Ambientes privados diseñados bajo estándares de lujo internacional para tu máxima privacidad.
            </p>
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCIAS DESTACADAS */}
      <section className="bg-[#FDFBF9] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#B5A447] font-bold">Experiencias de Firma</span>
              <h2 className="text-3xl md:text-5xl font-light text-stone-800 tracking-tighter">Nuestros Tratamientos <span className="font-serif italic text-[#2897A3]">Estrella</span></h2>
            </div>
            <button className="text-[10px] uppercase tracking-[0.3em] text-stone-400 hover:text-[#2897A3] transition-colors flex items-center gap-3">
              Ver catálogo completo <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ritual 1 */}
            <div className="relative h-[400px] rounded-[3rem] overflow-hidden group cursor-pointer shadow-xl">
              <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Masaje" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 space-y-2">
                <h4 className="text-white text-2xl font-light">Masaje Le Cocom Signature</h4>
                <p className="text-white/60 text-xs uppercase tracking-widest font-medium">90 Minutos de Armonía</p>
              </div>
            </div>

            {/* Ritual 2 */}
            <div className="relative h-[400px] rounded-[3rem] overflow-hidden group cursor-pointer shadow-xl">
              <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Facial" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 space-y-2">
                <h4 className="text-white text-2xl font-light">Facial Luminosidad Oro</h4>
                <p className="text-white/60 text-xs uppercase tracking-widest font-medium">Cuidado Dérmico Avanzado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FRASE FINAL */}
      <section className="max-w-3xl mx-auto px-4 text-center py-10">
          <p className="text-stone-300 font-serif text-3xl italic leading-relaxed">
            "Donde el alma encuentra su reflejo en la serenidad."
          </p>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}} />
    </div>
  );
}