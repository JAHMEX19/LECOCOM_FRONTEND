import { SparklesIcon, HeartIcon, SunIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function HomeView() {
  return (
    <div className="space-y-24 pb-24 bg-[#FCFAF8] text-stone-800">
      
      {/* 1. HERO SECTION: Optimización de carga y legibilidad */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1600" 
            alt="Atmósfera relajante de Spa Le Cocom" 
            className="w-full h-full object-cover animate-[slow-zoom_30s_linear_infinite]"
            loading="eager" // La primera imagen debe cargar de inmediato
          />
          {/* Overlay más oscuro para que el texto blanco sea legible para todos */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 text-center space-y-6 px-6 max-w-4xl">
          <div className="inline-block px-6 py-2 border border-white/40 rounded-full backdrop-blur-md">
            <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-white font-medium">
              Bienvenido al Santuario
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-tight">
            Renace en <br />
            <span className="font-serif italic text-[#D4C363]">Le Cocom Spa</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/90 text-lg md:text-xl font-light leading-relaxed">
            Un espacio de paz diseñado para restaurar su cuerpo y serenar su mente.
          </p>
          <div className="pt-6">
        
            <Link to="/servicios" className="bg-[#2897A3] text-white px-12 py-5 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:bg-[#D4C363] transition-all duration-300 shadow-2xl transform hover:scale-125">
              Explorar Servicios
            </Link>
            
          </div>
        </div>
      </section>

      {/* 2. LA PROMESA: Mejor contraste y legibilidad */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {[
            { 
              icon: <SparklesIcon className="h-8 w-8 text-[#B5A447]" />, 
              title: "Renovación Total", 
              desc: "Tratamientos exclusivos para restaurar la luminosidad de su piel y vitalidad interior." 
            },
            { 
              icon: <HeartIcon className="h-8 w-8 text-[#2897A3]" />, 
              title: "Cuidado Holístico", 
              desc: "Armonizamos su bienestar físico y emocional con aromas y sonidos naturales." 
            },
            { 
              icon: <SunIcon className="h-8 w-8 text-[#B5A447]" />, 
              title: "Santuario Privado", 
              desc: "Espacios íntimos diseñados bajo estándares de lujo para su absoluta tranquilidad." 
            }
          ].map((item, idx) => (
            <div key={idx} className="space-y-5 text-center p-6 rounded-2xl hover:bg-white hover:shadow-sm transition-all">
              <div className="h-20 w-20 mx-auto bg-white rounded-full flex items-center justify-center border border-stone-100 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-lg uppercase tracking-widest font-bold text-stone-800">{item.title}</h3>
              <p className="text-stone-600 text-base leading-relaxed italic">
                "{item.desc}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EXPERIENCIAS DESTACADAS: Optimización de imágenes */}
      <section className="bg-white py-24 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <span className="text-sm uppercase tracking-[0.3em] text-[#B5A447] font-bold">Experiencias de Firma</span>
              <h2 className="text-4xl md:text-5xl font-light text-stone-800 tracking-tight">
                Nuestros Tratamientos <span className="font-serif italic text-[#2897A3]">Estrella</span>
              </h2>
            </div>
            <Link to="/servicios" className="text-sm font-bold uppercase tracking-widest text-stone-500 hover:text-[#2897A3] transition-colors flex items-center gap-3 group">
              Ver catálogo completo
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Ritual 1 */}
            <div className="relative h-[450px] rounded-[2rem] overflow-hidden group shadow-2xl bg-stone-200">
              <img 
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1000" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt="Masaje Signature"
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 space-y-3">
                <h4 className="text-white text-3xl font-light">Masaje Le Cocom Signature</h4>
                <p className="text-white/80 text-sm uppercase tracking-[0.2em] font-medium">90 Minutos de Armonía Total</p>
              </div>
            </div>

            {/* Ritual 2 */}
            <div className="relative h-[450px] rounded-[2rem] overflow-hidden group shadow-2xl bg-stone-200">
              <img 
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1000" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt="Facial Oro"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 space-y-3">
                <h4 className="text-white text-3xl font-light">Facial Luminosidad Oro</h4>
                <p className="text-white/80 text-sm uppercase tracking-[0.2em] font-medium">Cuidado Dérmico Avanzado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FRASE FINAL: Más legible */}
      <section className="max-w-4xl mx-auto px-6 text-center py-12">
          <p className="text-stone-400 font-serif text-3xl md:text-4xl italic leading-relaxed">
            "Donde el alma encuentra su reflejo en la serenidad."
          </p>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}} />
    </div>
  );
}