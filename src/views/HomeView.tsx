import {
  SparklesIcon,
  HeartIcon,
  SunIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function HomeView() {
  return (
    <div className="space-y-24 pb-24 bg-[#FCFAF8] text-stone-800">
      {/* 1. HERO SECTION: Tipografía maximizada */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1600"
            alt="Atmósfera relajante de Spa Le Cocom"
            className="w-full h-full object-cover animate-[slow-zoom_30s_linear_infinite]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 text-center space-y-8 px-6 max-w-5xl">
          <div className="inline-block px-8 py-3 border border-white/40 rounded-full backdrop-blur-md">
            <p className="text-sm md:text-base uppercase tracking-[0.5em] text-white font-semibold">
              Bienvenido al Santuario
            </p>
          </div>
          {/* Título más grande: de text-5xl a 6xl y de 8xl a 9xl en pantallas grandes */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-[1.1]">
            Renace en <br />
            <span className="font-serif italic text-[#D4C363]">
              Le Cocom Spa
            </span>
          </h1>
          {/* Párrafo descriptivo: Subido a text-xl / 2xl */}
          <p className="max-w-3xl mx-auto text-white/90 text-xl md:text-2xl font-light leading-relaxed">
            Un espacio de paz diseñado para restaurar su cuerpo y serenar su
            mente.
          </p>
          <div className="pt-8">
            <Link
              to="/servicios"
              className="
                    inline-block
                    bg-[#2897A3] text-white 
                    px-10 py-5      /* Botón más grande */
                    md:px-14 md:py-6 
                    rounded-full 
                    text-sm md:text-base 
                    uppercase tracking-[0.25em] font-black 
                    hover:bg-[#D4C363] 
                    transition-all duration-300 
                    shadow-2xl 
                    transform 
                    active:scale-95 
                    hover:scale-105
                  "
            >
              Explorar Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* 2. LA PROMESA: Cards con textos más robustos */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {[
            {
              icon: <SparklesIcon className="h-10 w-10 text-[#B5A447]" />,
              title: "Renovación Total",
              desc: "Tratamientos exclusivos para restaurar la luminosidad de su piel y vitalidad interior.",
            },
            {
              icon: <HeartIcon className="h-10 w-10 text-[#2897A3]" />,
              title: "Cuidado Holístico",
              desc: "Armonizamos su bienestar físico y emocional con aromas y sonidos naturales.",
            },
            {
              icon: <SunIcon className="h-10 w-10 text-[#B5A447]" />,
              title: "Santuario Privado",
              desc: "Espacios íntimos diseñados bajo estándares de lujo para su absoluta tranquilidad.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="space-y-6 text-center p-8 rounded-[2.5rem] hover:bg-white hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-500"
            >
              <div className="h-24 w-24 mx-auto bg-white rounded-full flex items-center justify-center border border-stone-100 shadow-md">
                {item.icon}
              </div>
              <h3 className="text-xl uppercase tracking-widest font-black text-stone-800">
                {item.title}
              </h3>
              {/* Texto descriptivo más legible: text-lg */}
              <p className="text-stone-600 text-lg leading-relaxed italic font-medium">
                "{item.desc}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EXPERIENCIAS DESTACADAS: Títulos y pies de foto ampliados */}
      <section className="bg-white py-24 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <span className="text-base uppercase tracking-[0.4em] text-[#B5A447] font-black">
                Experiencias de Firma
              </span>
              <h2 className="text-5xl md:text-6xl font-light text-stone-800 tracking-tight">
                Nuestros Tratamientos{" "}
                <span className="font-serif italic text-[#2897A3]">
                  Estrella
                </span>
              </h2>
            </div>
            <Link
              to="/servicios"
              className="text-base font-black uppercase tracking-[0.2em] text-stone-600 hover:text-[#2897A3] transition-colors flex items-center gap-3 group"
            >
              Ver catálogo completo
              <ArrowRightIcon className="h-6 w-6 group-hover:translate-x-3 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Ritual 1 */}
            <div className="relative h-[550px] rounded-[3rem] overflow-hidden group shadow-2xl bg-stone-200">
              <img
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1000"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Masaje Signature"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/30 to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12 space-y-4">
                <h4 className="text-white text-4xl font-light">
                  Masaje relajante
                </h4>
                <p className="text-white/80 text-base uppercase tracking-[0.3em] font-bold">
                  60 Minutos de Armonía Total
                </p>
              </div>
            </div>

            {/* Ritual 2 */}
            <div className="relative h-[550px] rounded-[3rem] overflow-hidden group shadow-2xl bg-stone-200">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1000"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Facial Oro"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/30 to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12 space-y-4">
                <h4 className="text-white text-4xl font-light">
                  Facial antienvejecimiento
                </h4>
                <p className="text-white/80 text-base uppercase tracking-[0.3em] font-bold">
                  Cuidado Dérmico Avanzado
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FRASE FINAL: Impacto visual máximo */}
      <section className="max-w-5xl mx-auto px-6 text-center py-20">
        <p className="text-stone-400 font-serif text-4xl md:text-5xl lg:text-6xl italic leading-relaxed">
          "Donde el alma encuentra su reflejo en la serenidad."
        </p>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `,
        }}
      />
    </div>
  );
}