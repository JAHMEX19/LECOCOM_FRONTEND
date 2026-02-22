import ContadorHooks from "../components/ContadorHooks"

export default function AboutView() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      
      {/* HERO SECTION: La Esencia */}
      <section className="text-center space-y-6">
        <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#B5A447] font-bold">
          Nuestra Historia
        </h2>
        <h1 className="text-4xl md:text-6xl font-light text-stone-800 tracking-tight">
          El arte del <span className="font-serif italic text-[#2897A3]">equilibrio</span> absoluto.
        </h1>
        <p className="max-w-2xl mx-auto text-stone-500 leading-relaxed text-sm tracking-wide">
          Le Cocom Spa nació no como un negocio, sino como un refugio. 
          Un espacio donde el tiempo se detiene y la conexión entre el cuerpo y el alma 
          se vuelve la única prioridad.
        </p>
      </section>

      {/* BLOQUE: EL ORIGEN (Imagen a la izquierda, texto a la derecha) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-[#2897A3]/5 rounded-[3rem] -z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80" 
            alt="Interior Spa" 
            className="rounded-[2.5rem] shadow-2xl shadow-stone-200"
          />
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl text-stone-800 font-light tracking-wide">
            Fundado en el <span className="text-[#B5A447] font-semibold">Corazón de la Calma</span>
          </h3>
          <p className="text-stone-500 text-sm leading-loose">
            Establecido en 2018, Le Cocom surgió de la visión de expertos en cosmetología 
            y medicina holística. Buscábamos fusionar los rituales ancestrales de relajación 
            con la tecnología más avanzada en cuidado dérmico. 
          </p>
          <div className="pt-4">
            <div className="h-[1px] w-12 bg-[#B5A447] mb-4"></div>
            <p className="text-stone-400 text-xs italic">
              "Nuestra misión es devolverte la paz que el mundo exterior intenta arrebatarte."
            </p>
          </div>
        </div>
      </section>

      {/* BLOQUE: FILOSOFÍA (Tarjetas) */}
      <section className="bg-white rounded-[3rem] p-12 md:p-20 shadow-sm border border-stone-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <span className="text-[#2897A3] text-3xl font-serif">01</span>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-stone-700">Pureza</h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Utilizamos solo productos orgánicos y cruelty-free, respetando tu piel y el entorno.
            </p>
          </div>
          <div className="text-center space-y-4">
            <span className="text-[#B5A447] text-3xl font-serif">02</span>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-stone-700">Experiencia</h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Cada terapeuta en Le Cocom ha pasado por más de 500 horas de formación especializada.
            </p>
          </div>
          <div className="text-center space-y-4">
            <span className="text-[#2897A3] text-3xl font-serif">03</span>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-stone-700">Personalización</h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              No creemos en tratamientos genéricos. Cada visita comienza con un diagnóstico único.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER DE LA PÁGINA: Formación */}
      <section className="text-center space-y-10 pb-10">
          <div className="inline-block px-6 py-2 bg-stone-50 rounded-full border border-stone-100">
             <p className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-medium">
                Certificaciones Internacionales & Estándares de Lujo
             </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale">
             {/* Aquí irían logos de marcas de lujo o certificaciones */}
             <span className="font-serif text-xl tracking-tighter">WELLNESS ALLIANCE</span>
             <span className="font-serif text-xl tracking-tighter">SPA EXCELLENCE</span>
             <span className="font-serif text-xl tracking-tighter">HOLISTIC CARE</span>
          </div>
      </section>

      <section className="bg-[#FDFBF9] py-24">    
        <ContadorHooks initialValue={15} />
      </section>
      
    </div>
  )
}